import Stripe from "stripe"
import { stripe } from "./client"
import type { CartItem } from "@/lib/stores/cart-store"

interface CreateCheckoutOptions {
  items: CartItem[]
  discountCode?: string
  discountCents?: number
  customerEmail?: string
  cartSessionId?: string
}

export async function createCheckoutSession({
  items,
  discountCode,
  discountCents = 0,
  customerEmail,
  cartSessionId,
}: CreateCheckoutOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        description: `${item.size} · ${item.color}`,
        images: [item.image.startsWith("/") ? `${baseUrl}${item.image}` : item.image],
        metadata: {
          product_id: String(item.id),
          slug: item.slug,
          size: item.size,
          color: item.color,
          emoji: item.emoji,
        },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = []
  if (discountCents > 0 && discountCode) {
    const coupon = await stripe.coupons.create({
      amount_off: discountCents,
      currency: "usd",
      name: discountCode,
      max_redemptions: 1,
    })
    discounts.push({ coupon: coupon.id })
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    ...(discounts.length > 0 ? { discounts } : {}),
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "NZ"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Standard Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      },
    ],
    customer_email: customerEmail,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
    metadata: {
      discount_code: discountCode ?? "",
      cart_session_id: cartSessionId ?? "",
    },
    payment_intent_data: {
      metadata: {
        discount_code: discountCode ?? "",
      },
    },
  })

  return session
}
