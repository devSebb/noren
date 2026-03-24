import { db } from "@/lib/db"
import { customers } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { formatCents } from "@/lib/utils/format"

export default async function AdminCustomersPage() {
  let allCustomers: typeof customers.$inferSelect[] = []
  try {
    allCustomers = await db
      .select()
      .from(customers)
      .orderBy(desc(customers.totalSpentCents))
  } catch {
    // DB not configured
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">{allCustomers.length} customers</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Orders</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Last Order</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {allCustomers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-muted-foreground">
                    No customers yet.
                  </td>
                </tr>
              ) : (
                allCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium">
                        {customer.firstName || customer.lastName
                          ? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim()
                          : "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </td>
                    <td className="p-4 text-muted-foreground">{customer.totalOrders ?? 0}</td>
                    <td className="p-4 text-muted-foreground">
                      {customer.lastOrderAt
                        ? new Date(customer.lastOrderAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-4 text-right font-medium">
                      {formatCents(customer.totalSpentCents ?? 0)}
                    </td>
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
