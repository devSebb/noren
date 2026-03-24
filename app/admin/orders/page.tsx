import { db } from "@/lib/db"
import { orders } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { formatCents } from "@/lib/utils/format"
import Link from "next/link"

const statusColors: Record<string, string> = {
  pending: "bg-accent/10 text-accent",
  paid: "bg-[#4ade80]/10 text-[#4ade80]",
  shipped: "bg-[#4ade80]/10 text-[#4ade80]",
  delivered: "bg-[#4ade80]/10 text-[#4ade80]",
  cancelled: "bg-primary/10 text-primary",
  refunded: "bg-muted text-muted-foreground",
}

export default async function AdminOrdersPage() {
  let allOrders: typeof orders.$inferSelect[] = []
  try {
    allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(100)
  } catch {
    // DB not configured yet
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">{allOrders.length} orders total</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Order #</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Fulfillment</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground">
                    No orders yet. Your first sale is coming! 🍜
                  </td>
                </tr>
              ) : (
                allOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline font-medium">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="p-4 text-muted-foreground">{order.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status ?? "pending"] ?? ""}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground capitalize">{order.fulfillmentStatus}</td>
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
