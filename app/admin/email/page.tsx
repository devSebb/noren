import { db } from "@/lib/db"
import { emailSubscribers } from "@/lib/db/schema"
import { desc } from "drizzle-orm"

export default async function AdminEmailPage() {
  let subscribers: typeof emailSubscribers.$inferSelect[] = []
  try {
    subscribers = await db
      .select()
      .from(emailSubscribers)
      .orderBy(desc(emailSubscribers.subscribedAt))
  } catch {
    // DB not configured
  }

  const active = subscribers.filter((s) => s.isActive).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Email Subscribers</h1>
          <p className="text-muted-foreground">{active} active · {subscribers.length} total</p>
        </div>
        <a
          href="/api/admin/subscribers/export"
          className="px-4 py-2 border border-border rounded-xl text-sm hover:bg-secondary transition-colors"
        >
          Export CSV
        </a>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Source</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Subscribed</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4 font-medium">{sub.email}</td>
                    <td className="p-4 text-muted-foreground">{sub.firstName ?? "—"}</td>
                    <td className="p-4 text-muted-foreground capitalize">{sub.source ?? "website"}</td>
                    <td className="p-4 text-muted-foreground">
                      {sub.subscribedAt
                        ? new Date(sub.subscribedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sub.isActive
                            ? "bg-[#4ade80]/10 text-[#4ade80]"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {sub.isActive ? "Active" : "Unsubscribed"}
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
