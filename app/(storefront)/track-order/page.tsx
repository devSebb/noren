"use client"

import { useState } from "react"
import { Search, Package } from "lucide-react"

interface OrderResult {
  orderNumber: string
  status: string
  fulfillmentStatus: string
  trackingNumber?: string
  trackingUrl?: string
  carrier?: string
  createdAt: string
  total: number
}

export default function TrackOrderPage() {
  const [email, setEmail] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OrderResult | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orderNumber: orderNumber.trim().toUpperCase() }),
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
      } else {
        setError(data.error ?? "Order not found")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const statusColors: Record<string, string> = {
    pending: "text-accent",
    paid: "text-[#4ade80]",
    processing: "text-accent",
    shipped: "text-[#4ade80]",
    delivered: "text-[#4ade80]",
    cancelled: "text-primary",
    refunded: "text-muted-foreground",
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <Package className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your email and order number to check your order status.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Order Number</label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
              placeholder="ORD-XXXXX"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? "Looking up..." : "Track Order"}
          </button>
        </form>

        {error && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-primary font-medium">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{result.orderNumber}</h2>
              <span className={`font-semibold capitalize ${statusColors[result.status] ?? "text-foreground"}`}>
                {result.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fulfillment</span>
                <span className="capitalize">{result.fulfillmentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Total</span>
                <span>${(result.total / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date</span>
                <span>{new Date(result.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {result.trackingNumber && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Tracking</p>
                <p className="font-mono font-medium">{result.trackingNumber}</p>
                {result.carrier && (
                  <p className="text-sm text-muted-foreground">{result.carrier}</p>
                )}
                {result.trackingUrl && (
                  <a
                    href={result.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Track Package →
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
