import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { discountCodes } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { discountCodeSchema } from "@/lib/validators"

export async function GET() {
  try {
    const codes = await db
      .select()
      .from(discountCodes)
      .orderBy(desc(discountCodes.createdAt))

    return NextResponse.json(codes)
  } catch (err) {
    console.error("[Admin Discounts] GET error:", err)
    return NextResponse.json({ error: "Failed to fetch discount codes" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = discountCodeSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid data" },
        { status: 400 }
      )
    }

    const { startsAt, expiresAt, ...rest } = parsed.data

    const [code] = await db
      .insert(discountCodes)
      .values({
        ...rest,
        startsAt: startsAt ? new Date(startsAt) : undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      })
      .returning()

    return NextResponse.json(code, { status: 201 })
  } catch (err: unknown) {
    console.error("[Admin Discounts] POST error:", err)
    const msg = err instanceof Error ? err.message : ""
    if (msg.includes("unique")) {
      return NextResponse.json({ error: "That discount code already exists" }, { status: 409 })
    }
    return NextResponse.json({ error: "Failed to create discount code" }, { status: 500 })
  }
}
