import type { Metadata } from "next"

export const metadata: Metadata = { title: "Terms of Service — NOREN 暖簾" }

export default function TermsPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8 text-muted-foreground">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Terms of Service</h1>
        <p className="text-sm">Last updated: January 1, 2026</p>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Acceptance of Terms</h2>
          <p>By using norenstore.com, you agree to these Terms of Service. If you disagree, please do not use our website.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Products</h2>
          <p>All products are made-to-order and print-on-demand. Colors may vary slightly from screen representations due to monitor calibration and the garment-dye process.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Orders & Payments</h2>
          <p>We reserve the right to refuse or cancel any order for any reason. Payment is charged at the time of purchase. All prices are in USD.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Intellectual Property</h2>
          <p>All designs, artwork, and content on this site are owned by NOREN and may not be reproduced, distributed, or used without written permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Limitation of Liability</h2>
          <p>NOREN is not liable for indirect, incidental, or consequential damages arising from your use of our products or website.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Contact</h2>
          <p>Questions? Email <a href="mailto:hello@norenstore.com" className="text-primary">hello@norenstore.com</a>.</p>
        </section>
      </div>
    </div>
  )
}
