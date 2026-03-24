import { NextRequest, NextResponse } from "next/server"
import { checkoutSchema } from "@/lib/validators"
import { createCheckoutSession } from "@/lib/stripe/checkout"
import { db } from "@/lib/db"
import { discountCodes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit"

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = checkRateLimit(`checkout:${ip}`, { limit: 10, windowSeconds: 60 })
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = checkoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid cart" },
        { status: 400 }
      )
    }

    const { items, discountCode, email, cartSessionId } = parsed.data

    let discountCentsValue = 0

    // Validate discount code if provided
    if (discountCode) {
      const [discount] = await db
        .select()
        .from(discountCodes)
        .where(eq(discountCodes.code, discountCode.toUpperCase()))
        .limit(1)

      if (discount && discount.isActive) {
        const subtotalCents = items.reduce(
          (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
          0
        )
        if (discount.type === "percentage") {
          discountCentsValue = Math.round(subtotalCents * (discount.value / 100))
        } else {
          discountCentsValue = Math.min(discount.value, subtotalCents)
        }
      }
    }

    const session = await createCheckoutSession({
      items,
      discountCode,
      discountCents: discountCentsValue,
      customerEmail: email,
      cartSessionId,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("[Checkout] Error:", err)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
