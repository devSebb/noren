import { NextRequest, NextResponse } from "next/server"
import { trackOrderSchema } from "@/lib/validators"
import { db } from "@/lib/db"
import { orders } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = trackOrderSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const { email, orderNumber } = parsed.data

    const [order] = await db
      .select({
        orderNumber: orders.orderNumber,
        status: orders.status,
        fulfillmentStatus: orders.fulfillmentStatus,
        trackingNumber: orders.trackingNumber,
        trackingUrl: orders.trackingUrl,
        carrier: orders.carrier,
        createdAt: orders.createdAt,
        totalCents: orders.totalCents,
      })
      .from(orders)
      .where(
        and(
          eq(orders.email, email),
          eq(orders.orderNumber, orderNumber)
        )
      )
      .limit(1)

    if (!order) {
      return NextResponse.json(
        { error: "Order not found. Please check your email and order number." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
      fulfillmentStatus: order.fulfillmentStatus,
      trackingNumber: order.trackingNumber,
      trackingUrl: order.trackingUrl,
      carrier: order.carrier,
      createdAt: order.createdAt,
      total: order.totalCents,
    })
  } catch (err) {
    console.error("[Track Order] Error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
