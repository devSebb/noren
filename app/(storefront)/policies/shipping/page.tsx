import type { Metadata } from "next"

export const metadata: Metadata = { title: "Shipping Policy — NOREN 暖簾" }

export default function ShippingPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto prose prose-invert">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shipping Policy</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Processing Time</h2>
          <p className="text-muted-foreground">All orders are custom printed and typically ship within 2-3 business days of payment confirmation.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Shipping Rates</h2>
          <p className="text-muted-foreground mb-2">Standard shipping is calculated at checkout based on your location.</p>
          <p className="text-[#4ade80] font-medium">Orders over $75 qualify for FREE standard shipping within the USA.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Delivery Times</h2>
          <ul className="text-muted-foreground space-y-2">
            <li><strong className="text-foreground">USA:</strong> 5-10 business days after shipping</li>
            <li><strong className="text-foreground">Canada:</strong> 10-15 business days after shipping</li>
            <li><strong className="text-foreground">UK/Australia/NZ:</strong> 10-20 business days after shipping</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Tracking</h2>
          <p className="text-muted-foreground">You&apos;ll receive a shipping confirmation email with tracking information once your order ships. Track your order at any time on our <a href="/track-order" className="text-primary">track order page</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Issues with Delivery</h2>
          <p className="text-muted-foreground">If your order is delayed or lost, please <a href="/contact" className="text-primary">contact us</a> and we&apos;ll resolve it promptly.</p>
        </section>
      </div>
    </div>
  )
}
