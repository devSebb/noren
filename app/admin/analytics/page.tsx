import { db } from "@/lib/db"
import { orders, products } from "@/lib/db/schema"
import { gte, count, sum, desc, eq } from "drizzle-orm"
import { formatCents } from "@/lib/utils/format"

async function getAnalytics() {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [last30] = await db
      .select({ count: count(), revenue: sum(orders.totalCents) })
      .from(orders)
      .where(gte(orders.createdAt, thirtyDaysAgo))

    const [last7] = await db
      .select({ count: count(), revenue: sum(orders.totalCents) })
      .from(orders)
      .where(gte(orders.createdAt, sevenDaysAgo))

    const [allTime] = await db
      .select({ count: count(), revenue: sum(orders.totalCents) })
      .from(orders)

    const [activeProducts] = await db
      .select({ count: count() })
      .from(products)
      .where(eq(products.isActive, true))

    const recentOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(20)

    return { last30, last7, allTime, activeProducts: activeProducts?.count ?? 0, recentOrders }
  } catch {
    return {
      last30: { count: 0, revenue: 0 },
      last7: { count: 0, revenue: 0 },
      allTime: { count: 0, revenue: 0 },
      activeProducts: 0,
      recentOrders: [],
    }
  }
}

export default async function AdminAnalyticsPage() {
  const stats = await getAnalytics()

  const statCards = [
    {
      label: "Revenue (All Time)",
      value: formatCents(Number(stats.allTime?.revenue ?? 0)),
    },
    {
      label: "Revenue (30 Days)",
      value: formatCents(Number(stats.last30?.revenue ?? 0)),
    },
    {
      label: "Revenue (7 Days)",
      value: formatCents(Number(stats.last7?.revenue ?? 0)),
    },
    {
      label: "Orders (All Time)",
      value: (stats.allTime?.count ?? 0).toLocaleString(),
    },
    {
      label: "Orders (30 Days)",
      value: (stats.last30?.count ?? 0).toLocaleString(),
    },
    {
      label: "Active Products",
      value: stats.activeProducts.toLocaleString(),
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Store performance overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-2xl p-5">
            <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-bold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Order</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4">
                      <a href={`/admin/orders/${order.id}`} className="text-primary hover:underline font-medium">
                        {order.orderNumber}
                      </a>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="p-4 text-muted-foreground">{order.email}</td>
                    <td className="p-4 capitalize text-muted-foreground">{order.status}</td>
                    <td className="p-4 text-right font-medium">{formatCents(order.totalCents)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
