import { NextRequest, NextResponse } from "next/server"
import { discountValidateSchema } from "@/lib/validators"
import { db } from "@/lib/db"
import { discountCodes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit"

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = checkRateLimit(`discount:${ip}`, { limit: 20, windowSeconds: 60 })
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = discountValidateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const { code, subtotalCents } = parsed.data

    const [discount] = await db
      .select()
      .from(discountCodes)
      .where(eq(discountCodes.code, code))
      .limit(1)

    if (!discount) {
      return NextResponse.json({ error: "Invalid discount code" }, { status: 400 })
    }

    if (!discount.isActive) {
      return NextResponse.json({ error: "This code is no longer active" }, { status: 400 })
    }

    const now = new Date()
    if (discount.expiresAt && discount.expiresAt < now) {
      return NextResponse.json({ error: "This code has expired" }, { status: 400 })
    }

    if (discount.startsAt && discount.startsAt > now) {
      return NextResponse.json({ error: "This code is not yet valid" }, { status: 400 })
    }

    if (discount.maxUses !== null && (discount.timesUsed ?? 0) >= (discount.maxUses ?? 0)) {
      return NextResponse.json({ error: "This code has reached its usage limit" }, { status: 400 })
    }

    if (subtotalCents < (discount.minimumOrderCents ?? 0)) {
      const minOrder = ((discount.minimumOrderCents ?? 0) / 100).toFixed(2)
      return NextResponse.json(
        { error: `This code requires a minimum order of $${minOrder}` },
        { status: 400 }
      )
    }

    // Calculate discount amount
    let discountCentsValue: number
    let label: string

    if (discount.type === "percentage") {
      discountCentsValue = Math.round(subtotalCents * (discount.value / 100))
      label = `${discount.value}% off`
    } else {
      discountCentsValue = Math.min(discount.value, subtotalCents)
      label = `$${(discount.value / 100).toFixed(2)} off`
    }

    return NextResponse.json({
      valid: true,
      code: discount.code,
      type: discount.type,
      value: discount.value,
      discountCents: discountCentsValue,
      label,
    })
  } catch (err) {
    console.error("[Discount Validate] Error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
