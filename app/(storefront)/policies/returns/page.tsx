import type { Metadata } from "next"

export const metadata: Metadata = { title: "Returns Policy — NOREN 暖簾" }

export default function ReturnsPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Returns & Exchanges</h1>

        <div className="bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-2xl p-6 mb-8">
          <p className="font-bold text-[#4ade80] text-lg mb-1">30-Day Hassle-Free Returns</p>
          <p className="text-muted-foreground">Not happy? We&apos;ll make it right. No questions asked.</p>
        </div>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How to Return</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Email us at <a href="mailto:hello@norenstore.com" className="text-primary">hello@norenstore.com</a> with your order number</li>
              <li>Tell us what you&apos;d like — exchange, store credit, or refund</li>
              <li>We&apos;ll send you a prepaid return label</li>
              <li>Ship it back and your refund/exchange is processed within 3-5 business days of receipt</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Return Conditions</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Items must be returned within 30 days of delivery</li>
              <li>Items must be unworn, unwashed, and in original condition</li>
              <li>Items with clear signs of wear or damage are not eligible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Damaged or Wrong Item</h2>
            <p>If you received a damaged item or the wrong product, we&apos;ll send a replacement immediately at no cost to you. Just email us a photo of the issue.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Questions?</h2>
            <p><a href="/contact" className="text-primary">Contact us</a> and we&apos;ll sort it out.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
