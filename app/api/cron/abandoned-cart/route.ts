import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cartSessions } from "@/lib/db/schema"
import { eq, and, lt, isNotNull } from "drizzle-orm"
import { sendAbandonedCartEmail } from "@/lib/email/send"

export const runtime = "nodejs"

// Vercel Cron: runs every hour
// Add to vercel.json: { "crons": [{ "path": "/api/cron/abandoned-cart", "schedule": "0 * * * *" }] }

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

    // Find carts abandoned more than 1 hour ago with email, not yet emailed or recovered
    const abandonedCarts = await db
      .select()
      .from(cartSessions)
      .where(
        and(
          isNotNull(cartSessions.email),
          eq(cartSessions.abandonedEmailSent, false),
          eq(cartSessions.recovered, false),
          lt(cartSessions.updatedAt, oneHourAgo)
        )
      )
      .limit(50)

    let sent = 0

    for (const cart of abandonedCarts) {
      if (!cart.email) continue

      try {
        const items = cart.items as Array<{
          name: string
          emoji: string
          price: number
          quantity: number
        }>

        if (!items || items.length === 0) continue

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

        await sendAbandonedCartEmail({
          to: cart.email,
          cartItems: items,
          total,
          cartSessionId: cart.sessionId,
        })

        await db
          .update(cartSessions)
          .set({ abandonedEmailSent: true, updatedAt: new Date() })
          .where(eq(cartSessions.id, cart.id))

        sent++
      } catch (err) {
        console.error(`[Abandoned Cart] Failed to send to ${cart.email}:`, err)
      }
    }

    return NextResponse.json({
      success: true,
      processed: abandonedCarts.length,
      sent,
    })
  } catch (err) {
    console.error("[Abandoned Cart Cron] Error:", err)
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 })
  }
}
