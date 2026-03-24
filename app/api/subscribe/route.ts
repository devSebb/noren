import { NextRequest, NextResponse } from "next/server"
import { newsletterSchema } from "@/lib/validators"
import { db } from "@/lib/db"
import { emailSubscribers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { sendWelcomeEmail } from "@/lib/email/send"
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit"

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = checkRateLimit(`subscribe:${ip}`, { limit: 5, windowSeconds: 60 })
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = newsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const { email, firstName, source } = parsed.data

    // Check if already subscribed
    const [existing] = await db
      .select()
      .from(emailSubscribers)
      .where(eq(emailSubscribers.email, email))
      .limit(1)

    if (existing) {
      if (!existing.isActive) {
        // Re-subscribe
        await db
          .update(emailSubscribers)
          .set({ isActive: true, unsubscribedAt: null })
          .where(eq(emailSubscribers.email, email))
        return NextResponse.json({ message: "Welcome back! You've been re-subscribed." })
      }
      return NextResponse.json({ message: "You're already subscribed!" })
    }

    // Insert new subscriber
    await db.insert(emailSubscribers).values({
      email,
      firstName: firstName ?? null,
      source: source ?? "website",
    })

    // Send welcome email with discount code
    try {
      await sendWelcomeEmail({ to: email, discountCode: "SLURP25" })
    } catch (err) {
      console.error("[Email] Failed to send welcome email:", err)
    }

    return NextResponse.json({ message: "You're subscribed! Check your inbox for 25% off." })
  } catch (err) {
    console.error("[Subscribe] Error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
