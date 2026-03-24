import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders, orderEvents } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { sendShippingNotificationEmail } from "@/lib/email/send"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    // Look up order by Printify order ID or external_id (our order number)
    const [order] = await db
      .select()
      .from(orders)
      .where(
        data.external_id
          ? eq(orders.orderNumber, data.external_id)
          : eq(orders.printifyOrderId, data.order_id)
      )
      .limit(1)

    if (!order) {
      console.warn("[Printify Webhook] Order not found:", data)
      return NextResponse.json({ received: true }) // Acknowledge to prevent retries
    }

    switch (type) {
      case "order:shipping-update": {
        const { carrier, tracking_number, tracking_url } = data

        await db
          .update(orders)
          .set({
            fulfillmentStatus: "shipped",
            carrier: carrier ?? null,
            trackingNumber: tracking_number ?? null,
            trackingUrl: tracking_url ?? null,
            status: "shipped",
            updatedAt: new Date(),
          })
          .where(eq(orders.id, order.id))

        await db.insert(orderEvents).values({
          orderId: order.id,
          eventType: "shipped",
          description: `Order shipped via ${carrier}. Tracking: ${tracking_number}`,
          metadata: { carrier, tracking_number, tracking_url },
        })

        // Send shipping email
        if (tracking_number && tracking_url) {
          try {
            await sendShippingNotificationEmail({
              to: order.email,
              orderNumber: order.orderNumber,
              trackingNumber: tracking_number,
              trackingUrl: tracking_url,
              carrier: carrier ?? "Carrier",
            })
          } catch (err) {
            console.error("[Printify Webhook] Failed to send shipping email:", err)
          }
        }
        break
      }

      case "order:delivery-update": {
        await db
          .update(orders)
          .set({
            fulfillmentStatus: "delivered",
            status: "delivered",
            updatedAt: new Date(),
          })
          .where(eq(orders.id, order.id))

        await db.insert(orderEvents).values({
          orderId: order.id,
          eventType: "delivered",
          description: "Order delivered.",
        })
        break
      }

      case "order:status-update": {
        await db.insert(orderEvents).values({
          orderId: order.id,
          eventType: "printify_status_update",
          description: `Printify status: ${data.status}`,
          metadata: data,
        })
        break
      }

      default:
        console.log(`[Printify Webhook] Unhandled event type: ${type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("[Printify Webhook] Error:", err)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
