import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { emailSubscribers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const subscribers = await db
      .select()
      .from(emailSubscribers)
      .where(eq(emailSubscribers.isActive, true))
      .orderBy(emailSubscribers.subscribedAt)

    const header = "email,first_name,source,subscribed_at\n"
    const rows = subscribers
      .map((s) => {
        const subscribedAt = s.subscribedAt
          ? new Date(s.subscribedAt).toISOString()
          : ""
        return [
          s.email,
          s.firstName ?? "",
          s.source ?? "website",
          subscribedAt,
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      })
      .join("\n")

    const csv = header + rows

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (err) {
    console.error("[Admin Subscribers] Export error:", err)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}
