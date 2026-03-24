import Link from "next/link"
import { CheckCircle, Package, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Confirmed — NOREN 暖簾",
  robots: { index: false },
}

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams

  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <div className="max-w-xl mx-auto">
        <div className="w-20 h-20 bg-[#4ade80]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#4ade80]" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for your order. We&apos;re getting it printed and on its way to you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <Package className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold mb-1">What happens next?</h3>
            <p className="text-sm text-muted-foreground">
              Your design goes straight to our print partners. Expect a tracking email within 2-3 business days.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <Mail className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold mb-1">Check your email</h3>
            <p className="text-sm text-muted-foreground">
              A confirmation email with your order details has been sent. Check your spam folder if you don&apos;t see it.
            </p>
          </div>
        </div>

        {session_id && (
          <p className="text-xs text-muted-foreground mb-6">
            Order reference: <code className="text-foreground">{session_id.slice(0, 24)}...</code>
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
          >
            Keep Shopping
          </Link>
          <Link
            href="/track-order"
            className="px-8 py-4 border border-border hover:border-muted-foreground text-foreground font-semibold rounded-xl transition-colors"
          >
            Track My Order
          </Link>
        </div>
      </div>
    </div>
  )
}
