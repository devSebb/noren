import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found — NOREN 暖簾",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl">🍜</div>
        <div>
          <h1 className="text-6xl font-extrabold tracking-tight text-primary mb-2">404</h1>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Lost in Translation</h2>
          <p className="text-muted-foreground leading-relaxed">
            This page wandered off like a noren curtain in the wind. The design you&apos;re
            looking for might have moved or doesn&apos;t exist.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-border hover:bg-secondary text-foreground font-semibold rounded-xl transition-colors"
          >
            Shop All Designs
          </Link>
        </div>
      </div>
    </div>
  )
}
