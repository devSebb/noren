import { db } from "@/lib/db"
import { orders, customers, emailSubscribers } from "@/lib/db/schema"
import { eq, gte, count, sum, desc } from "drizzle-orm"
import { formatCents } from "@/lib/utils/format"

async function getStats() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [todayOrders] = await db
      .select({ count: count(), revenue: sum(orders.totalCents) })
      .from(orders)
      .where(gte(orders.createdAt, today))

    const [totalCustomers] = await db.select({ count: count() }).from(customers)
    const [totalSubscribers] = await db.select({ count: count() }).from(emailSubscribers)

    const recentOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(10)

    return {
      todayCount: todayOrders?.count ?? 0,
      todayRevenue: Number(todayOrders?.revenue ?? 0),
      totalCustomers: totalCustomers?.count ?? 0,
      totalSubscribers: totalSubscribers?.count ?? 0,
      recentOrders,
    }
  } catch {
    return {
      todayCount: 0,
      todayRevenue: 0,
      totalCustomers: 0,
      totalSubscribers: 0,
      recentOrders: [],
    }
  }
}

const statusColors: Record<string, string> = {
  pending: "bg-accent/10 text-accent",
  paid: "bg-[#4ade80]/10 text-[#4ade80]",
  shipped: "bg-[#4ade80]/10 text-[#4ade80]",
  delivered: "bg-[#4ade80]/10 text-[#4ade80]",
  cancelled: "bg-primary/10 text-primary",
  refunded: "bg-muted text-muted-foreground",
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Orders", value: stats.todayCount, suffix: "" },
          { label: "Today's Revenue", value: formatCents(stats.todayRevenue), suffix: "" },
          { label: "Total Customers", value: stats.totalCustomers.toLocaleString(), suffix: "" },
          { label: "Email Subscribers", value: stats.totalSubscribers.toLocaleString(), suffix: "" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}{stat.suffix}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-bold">Recent Orders</h2>
          <a href="/admin/orders" className="text-sm text-primary hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Order</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No orders yet. Your first sale is coming! 🍜
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="p-4">
                      <a href={`/admin/orders/${order.id}`} className="text-primary hover:underline font-medium">
                        {order.orderNumber}
                      </a>
                    </td>
                    <td className="p-4 text-muted-foreground">{order.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status ?? "pending"] ?? ""}`}>
                        {order.status}
                      </span>
                    </td>
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
