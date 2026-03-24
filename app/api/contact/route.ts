import { NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validators"
import { resend, EMAIL_FROM_ADDRESS } from "@/lib/email/resend"
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit"

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = checkRateLimit(`contact:${ip}`, { limit: 3, windowSeconds: 60 })
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parsed.data

    await resend.emails.send({
      from: EMAIL_FROM_ADDRESS,
      to: process.env.ADMIN_EMAIL ?? "hello@norenstore.com",
      replyTo: email,
      subject: `[NOREN Contact] ${subject}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({ message: "Message sent successfully" })
  } catch (err) {
    console.error("[Contact] Error:", err)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
