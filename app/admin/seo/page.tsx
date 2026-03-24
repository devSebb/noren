import { db } from "@/lib/db"
import { seoSettings } from "@/lib/db/schema"
import { asc } from "drizzle-orm"
import Link from "next/link"

export default async function AdminSEOPage() {
  let settings: typeof seoSettings.$inferSelect[] = []
  try {
    settings = await db
      .select()
      .from(seoSettings)
      .orderBy(asc(seoSettings.pagePath))
  } catch {
    // DB not configured
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">SEO Settings</h1>
          <p className="text-muted-foreground">Per-page SEO overrides</p>
        </div>
        <Link
          href="/admin/seo/new"
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors text-sm"
        >
          + Add Override
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {settings.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <p className="mb-2">No SEO overrides configured.</p>
            <p className="text-xs">Add overrides to customize title, description, and OG images per page.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Page Path</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">No Index</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Updated</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs">{s.pagePath}</td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate">{s.title ?? "—"}</td>
                    <td className="p-4">
                      {s.noIndex ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          No Index
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">Indexed</span>
                      )}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">
                      {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/seo/${s.id}`}
                        className="text-primary hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
