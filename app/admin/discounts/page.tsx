import { db } from "@/lib/db"
import { discountCodes } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { formatCents } from "@/lib/utils/format"
import Link from "next/link"

export default async function AdminDiscountsPage() {
  let allCodes: typeof discountCodes.$inferSelect[] = []
  try {
    allCodes = await db
      .select()
      .from(discountCodes)
      .orderBy(desc(discountCodes.createdAt))
  } catch {
    // DB not configured
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Discount Codes</h1>
          <p className="text-muted-foreground">{allCodes.length} codes</p>
        </div>
        <Link
          href="/admin/discounts/new"
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors text-sm"
        >
          + Create Code
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Code</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Value</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Uses</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Expires</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {allCodes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground">
                    No discount codes yet.
                  </td>
                </tr>
              ) : (
                allCodes.map((code) => (
                  <tr
                    key={code.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4 font-mono font-medium">{code.code}</td>
                    <td className="p-4 text-muted-foreground capitalize">
                      {code.type.replace("_", " ")}
                    </td>
                    <td className="p-4">
                      {code.type === "percentage"
                        ? `${code.value}%`
                        : formatCents(code.value)}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {code.timesUsed ?? 0}
                      {code.maxUses ? ` / ${code.maxUses}` : ""}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {code.expiresAt
                        ? new Date(code.expiresAt).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          code.isActive
                            ? "bg-[#4ade80]/10 text-[#4ade80]"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {code.isActive ? "Active" : "Inactive"}
                      </span>
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
