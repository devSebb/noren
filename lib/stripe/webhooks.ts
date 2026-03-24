import { stripe } from "./client"
import { db } from "@/lib/db"
import {
  orders,
  orderItems,
  orderEvents,
  customers,
  emailSubscribers,
  discountCodes,
  cartSessions,
} from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { createPrintifyOrder } from "@/lib/printify/orders"
import { sendOrderConfirmationEmail } from "@/lib/email/send"
import type Stripe from "stripe"

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `ORD-${timestamp}${random}`
}

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  if (!session.customer_details?.email) {
    throw new Error("No customer email in session")
  }

  const email = session.customer_details.email
  const shipping = session.shipping_details
  const address = shipping?.address

  if (!address) {
    throw new Error("No shipping address in session")
  }

  // Retrieve line items with product data
  const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
    limit: 100,
  })

  const subtotalCents = session.amount_subtotal ?? 0
  const totalCents = session.amount_total ?? 0
  const discountCents = session.total_details?.amount_discount ?? 0
  const shippingCents = session.total_details?.amount_shipping ?? 0
  const taxCents = session.total_details?.amount_tax ?? 0

  const orderNumber = generateOrderNumber()

  // Create order
  const [order] = await db.insert(orders).values({
    orderNumber,
    email,
    status: "paid",
    paymentStatus: "paid",
    fulfillmentStatus: "unfulfilled",
    subtotalCents,
    discountCents,
    shippingCents,
    taxCents,
    totalCents,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId: session.payment_intent as string,
    discountCode: session.metadata?.discount_code || null,
    shippingName: shipping?.name ?? email,
    shippingAddressLine1: address.line1 ?? "",
    shippingAddressLine2: address.line2 ?? null,
    shippingCity: address.city ?? "",
    shippingState: address.state ?? null,
    shippingPostalCode: address.postal_code ?? "",
    shippingCountry: address.country ?? "US",
  }).returning()

  // Create order items
  const itemsToInsert = lineItemsResponse.data.map((lineItem) => {
    const product = lineItem.price?.product as Stripe.Product | null
    const metadata = product?.metadata ?? {}
    const quantity = lineItem.quantity ?? 1
    const unitPriceCents = lineItem.price?.unit_amount ?? 0

    return {
      orderId: order.id,
      title: lineItem.description ?? "Product",
      variantLabel: metadata.size && metadata.color ? `${metadata.color} / ${metadata.size}` : "Standard",
      quantity,
      unitPriceCents,
      totalCents: unitPriceCents * quantity,
      printifyVariantId: metadata.printify_variant_id ?? null,
    }
  })

  await db.insert(orderItems).values(itemsToInsert)

  // Log created event
  await db.insert(orderEvents).values({
    orderId: order.id,
    eventType: "created",
    description: `Order created via Stripe checkout. Payment intent: ${session.payment_intent}`,
  })

  await db.insert(orderEvents).values({
    orderId: order.id,
    eventType: "paid",
    description: `Payment confirmed. Total: $${(totalCents / 100).toFixed(2)}`,
  })

  // Create or update customer
  const [existingCustomer] = await db
    .select()
    .from(customers)
    .where(eq(customers.email, email))
    .limit(1)

  if (existingCustomer) {
    await db
      .update(customers)
      .set({
        totalOrders: sql`${customers.totalOrders} + 1`,
        totalSpentCents: sql`${customers.totalSpentCents} + ${totalCents}`,
        lastOrderAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(customers.email, email))
  } else {
    const nameParts = (shipping?.name ?? "").split(" ")
    await db.insert(customers).values({
      email,
      firstName: nameParts[0] ?? null,
      lastName: nameParts.slice(1).join(" ") || null,
      totalOrders: 1,
      totalSpentCents: totalCents,
      lastOrderAt: new Date(),
    })
  }

  // Mark abandoned cart as recovered
  if (session.metadata?.cart_session_id) {
    await db
      .update(cartSessions)
      .set({ recovered: true, updatedAt: new Date() })
      .where(eq(cartSessions.sessionId, session.metadata.cart_session_id))
  }

  // Increment discount code usage
  if (session.metadata?.discount_code) {
    await db
      .update(discountCodes)
      .set({ timesUsed: sql`${discountCodes.timesUsed} + 1` })
      .where(eq(discountCodes.code, session.metadata.discount_code.toUpperCase()))
  }

  // Trigger Printify fulfillment (non-blocking — log errors but don't fail)
  try {
    await createPrintifyOrder(order, itemsToInsert, {
      name: shipping?.name ?? email,
      address1: address.line1 ?? "",
      address2: address.line2 ?? "",
      city: address.city ?? "",
      state: address.state ?? "",
      zip: address.postal_code ?? "",
      country: address.country ?? "US",
      email,
    })
    await db.insert(orderEvents).values({
      orderId: order.id,
      eventType: "sent_to_printify",
      description: "Order submitted to Printify for fulfillment.",
    })
  } catch (err) {
    console.error("[Printify] Failed to create order:", err)
    await db.insert(orderEvents).values({
      orderId: order.id,
      eventType: "printify_error",
      description: `Failed to send to Printify: ${err instanceof Error ? err.message : "Unknown error"}`,
      metadata: { error: String(err) },
    })
  }

  // Send confirmation email (non-blocking)
  try {
    await sendOrderConfirmationEmail({
      to: email,
      orderNumber,
      items: lineItemsResponse.data.map((item) => ({
        name: item.description ?? "Product",
        quantity: item.quantity ?? 1,
        price: (item.price?.unit_amount ?? 0) / 100,
      })),
      subtotal: subtotalCents / 100,
      discount: discountCents / 100,
      shipping: shippingCents / 100,
      tax: taxCents / 100,
      total: totalCents / 100,
    })
  } catch (err) {
    console.error("[Email] Failed to send order confirmation:", err)
  }

  return order
}

export async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = charge.payment_intent as string
  if (!paymentIntentId) return

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripePaymentIntentId, paymentIntentId))
    .limit(1)

  if (!order) {
    console.warn(`[Stripe Webhook] No order found for payment intent: ${paymentIntentId}`)
    return
  }

  await db
    .update(orders)
    .set({ status: "refunded", paymentStatus: "refunded", updatedAt: new Date() })
    .where(eq(orders.id, order.id))

  await db.insert(orderEvents).values({
    orderId: order.id,
    eventType: "refunded",
    description: `Refund of $${(charge.amount_refunded / 100).toFixed(2)} processed.`,
    metadata: { charge_id: charge.id },
  })
}
