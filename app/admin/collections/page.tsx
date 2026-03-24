import { db } from "@/lib/db"
import { collections } from "@/lib/db/schema"
import { asc } from "drizzle-orm"
import Link from "next/link"

export default async function AdminCollectionsPage() {
  let allCollections: typeof collections.$inferSelect[] = []
  try {
    allCollections = await db
      .select()
      .from(collections)
      .orderBy(asc(collections.position))
  } catch {
    // DB not configured
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Collections</h1>
          <p className="text-muted-foreground">{allCollections.length} collections</p>
        </div>
        <Link
          href="/admin/collections/new"
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors text-sm"
        >
          + Add Collection
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Collection</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Slug</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Position</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCollections.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground">
                    No collections yet.
                  </td>
                </tr>
              ) : (
                allCollections.map((col) => (
                  <tr
                    key={col.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4 font-medium">{col.title}</td>
                    <td className="p-4 text-muted-foreground font-mono text-xs">{col.slug}</td>
                    <td className="p-4 text-muted-foreground">{col.position}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          col.isActive
                            ? "bg-[#4ade80]/10 text-[#4ade80]"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {col.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/collections/${col.id}`}
                        className="text-primary hover:underline text-sm"
                      >
                        Edit
                      </Link>
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
