import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { seoSettings } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const seoSchema = z.object({
  pagePath: z.string().min(1).startsWith("/"),
  title: z.string().max(70).optional(),
  description: z.string().max(160).optional(),
  ogImageUrl: z.string().url().optional().or(z.literal("")),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
})

export async function GET() {
  try {
    const settings = await db.select().from(seoSettings)
    return NextResponse.json(settings)
  } catch (err) {
    console.error("[Admin SEO] GET error:", err)
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = seoSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid data" },
        { status: 400 }
      )
    }

    const [setting] = await db
      .insert(seoSettings)
      .values({
        ...parsed.data,
        ogImageUrl: parsed.data.ogImageUrl || null,
        canonicalUrl: parsed.data.canonicalUrl || null,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: seoSettings.pagePath,
        set: {
          title: parsed.data.title,
          description: parsed.data.description,
          ogImageUrl: parsed.data.ogImageUrl || null,
          canonicalUrl: parsed.data.canonicalUrl || null,
          noIndex: parsed.data.noIndex,
          updatedAt: new Date(),
        },
      })
      .returning()

    return NextResponse.json(setting, { status: 201 })
  } catch (err) {
    console.error("[Admin SEO] POST error:", err)
    return NextResponse.json({ error: "Failed to save SEO settings" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...rest } = body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const parsed = seoSchema.safeParse(rest)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid data" },
        { status: 400 }
      )
    }

    const [updated] = await db
      .update(seoSettings)
      .set({
        ...parsed.data,
        ogImageUrl: parsed.data.ogImageUrl || null,
        canonicalUrl: parsed.data.canonicalUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(seoSettings.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: "SEO setting not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error("[Admin SEO] PUT error:", err)
    return NextResponse.json({ error: "Failed to update SEO settings" }, { status: 500 })
  }
}
