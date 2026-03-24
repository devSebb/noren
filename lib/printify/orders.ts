import { printify } from "./client"
import { PRINTIFY_PRODUCT_MAP } from "./config"
import { db } from "@/lib/db"
import { orders } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { PrintifyOrderPayload, PrintifyOrderResponse } from "./types"

interface ShippingAddress {
  name: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
  email: string
}

interface OrderItemInput {
  orderId: string
  title: string
  variantLabel: string
  quantity: number
  unitPriceCents: number
  totalCents: number
  printifyVariantId?: string | null
}

export async function createPrintifyOrder(
  order: { id: string; orderNumber: string },
  items: OrderItemInput[],
  shipping: ShippingAddress
) {
  const shopId = process.env.PRINTIFY_SHOP_ID
  if (!shopId) throw new Error("Missing PRINTIFY_SHOP_ID")

  const nameParts = shipping.name.split(" ")
  const firstName = nameParts[0] ?? "Customer"
  const lastName = nameParts.slice(1).join(" ") || "."

  // Build line items from the order items
  const lineItems: PrintifyOrderPayload["line_items"] = []

  for (const item of items) {
    // Try to find the Printify config for this product
    // variantLabel is "Color / Size"
    const [color, size] = item.variantLabel.split(" / ").map((s) => s.trim())
    const variantKey = `${color}/${size}`

    // Look for a product config that matches
    let printifyVariantId: number | undefined

    for (const config of PRINTIFY_PRODUCT_MAP) {
      const variantId = config.variantMapping[variantKey]
      if (variantId) {
        printifyVariantId = variantId
        // We need the Printify product ID for this config
        const productId = config.printifyProductId
        if (productId && printifyVariantId) {
          lineItems.push({
            product_id: productId,
            variant_id: printifyVariantId,
            quantity: item.quantity,
          })
        }
        break
      }
    }

    if (!printifyVariantId) {
      console.warn(`[Printify] No variant mapping found for: ${item.title} - ${item.variantLabel}`)
    }
  }

  if (lineItems.length === 0) {
    throw new Error("No Printify line items could be built — check your variant mapping config")
  }

  const payload: PrintifyOrderPayload = {
    external_id: order.orderNumber,
    label: order.orderNumber,
    line_items: lineItems,
    shipping_method: 1, // Standard shipping
    send_shipping_notification: false, // We handle this ourselves
    address_to: {
      first_name: firstName,
      last_name: lastName,
      email: shipping.email,
      country: shipping.country,
      region: shipping.state,
      address1: shipping.address1,
      address2: shipping.address2 ?? "",
      city: shipping.city,
      zip: shipping.zip,
    },
  }

  const response = await printify.post<PrintifyOrderResponse>(
    `/shops/${shopId}/orders.json`,
    payload
  )

  // Save Printify order ID back to our order
  await db
    .update(orders)
    .set({ printifyOrderId: response.id, updatedAt: new Date() })
    .where(eq(orders.id, order.id))

  return response
}
