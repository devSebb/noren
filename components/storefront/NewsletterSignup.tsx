"use client"

import { useState } from "react"
import { toast } from "sonner"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      })
      if (res.ok) {
        toast.success("You're in! Check your inbox for 25% off.", { icon: "🍜" })
        setEmail("")
      } else {
        const data = await res.json()
        toast.error(data.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-[#141412]">
      <div className="max-w-xl mx-auto text-center">
        <span className="text-6xl mb-6 block">🍜</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Join the Noodle Crew
        </h2>
        <p className="text-muted-foreground mb-8">
          First access to new drops, exclusive colorways, and 25% off your first order.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-5 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? "..." : "GET 25% OFF"}
          </button>
        </form>
      </div>
    </section>
  )
}
