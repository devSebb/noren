import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders, products, customers, emailSubscribers } from "@/lib/db/schema"
import { gte, count, sum, eq } from "drizzle-orm"

export async function GET() {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [allTime] = await db
      .select({ count: count(), revenue: sum(orders.totalCents) })
      .from(orders)

    const [last30] = await db
      .select({ count: count(), revenue: sum(orders.totalCents) })
      .from(orders)
      .where(gte(orders.createdAt, thirtyDaysAgo))

    const [last7] = await db
      .select({ count: count(), revenue: sum(orders.totalCents) })
      .from(orders)
      .where(gte(orders.createdAt, sevenDaysAgo))

    const [totalCustomers] = await db.select({ count: count() }).from(customers)
    const [totalSubscribers] = await db.select({ count: count() }).from(emailSubscribers)
    const [activeProducts] = await db
      .select({ count: count() })
      .from(products)
      .where(eq(products.isActive, true))

    return NextResponse.json({
      allTime: {
        orders: allTime?.count ?? 0,
        revenue: Number(allTime?.revenue ?? 0),
      },
      last30: {
        orders: last30?.count ?? 0,
        revenue: Number(last30?.revenue ?? 0),
      },
      last7: {
        orders: last7?.count ?? 0,
        revenue: Number(last7?.revenue ?? 0),
      },
      totalCustomers: totalCustomers?.count ?? 0,
      totalSubscribers: totalSubscribers?.count ?? 0,
      activeProducts: activeProducts?.count ?? 0,
    })
  } catch (err) {
    console.error("[Admin Analytics] Error:", err)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
