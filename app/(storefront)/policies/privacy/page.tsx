import type { Metadata } from "next"

export const metadata: Metadata = { title: "Privacy Policy — NOREN 暖簾" }

export default function PrivacyPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8 text-muted-foreground">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="text-sm">Last updated: January 1, 2026</p>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Information We Collect</h2>
          <p>When you place an order or sign up for our newsletter, we collect your name, email address, shipping address, and payment information. Payment data is processed securely by Stripe and we never store your card details.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To process and fulfill your orders</li>
            <li>To send order confirmations and shipping updates</li>
            <li>To send marketing emails if you&apos;ve opted in (you can unsubscribe anytime)</li>
            <li>To improve our products and customer experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Data Sharing</h2>
          <p>We share your shipping information with our print-on-demand partner (Printify) to fulfill your orders. We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Cookies</h2>
          <p>We use cookies to maintain your shopping cart and analyze site traffic. You can disable cookies in your browser settings, though some features may not work correctly.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Your Rights</h2>
          <p>You can request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:hello@norenstore.com" className="text-primary">hello@norenstore.com</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Contact</h2>
          <p>Questions about this policy? Email us at <a href="mailto:hello@norenstore.com" className="text-primary">hello@norenstore.com</a>.</p>
        </section>
      </div>
    </div>
  )
}
