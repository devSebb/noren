"use client"

import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { formatPrice } from "@/lib/utils/format"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/products"
import { useState } from "react"
import { toast } from "sonner"

export default function CartPage() {
  const { items, total, count, removeItem, updateQuantity, clearCart } = useCart()
  const [discountCode, setDiscountCode] = useState("")
  const [discountCents, setDiscountCents] = useState(0)
  const [appliedCode, setAppliedCode] = useState("")
  const [validating, setValidating] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)

  const shippingProgress = Math.min(total / FREE_SHIPPING_THRESHOLD, 1)
  const remaining = FREE_SHIPPING_THRESHOLD - total
  const grandTotal = Math.max(0, total - discountCents / 100)

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return
    setValidating(true)
    try {
      const res = await fetch("/api/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode.trim(), subtotalCents: Math.round(total * 100) }),
      })
      const data = await res.json()
      if (res.ok) {
        setDiscountCents(data.discountCents)
        setAppliedCode(discountCode.trim().toUpperCase())
        toast.success(`Code applied — ${data.label}!`, { icon: "🎉" })
      } else {
        toast.error(data.error ?? "Invalid discount code")
      }
    } catch {
      toast.error("Could not validate code")
    } finally {
      setValidating(false)
    }
  }

  const handleCheckout = async () => {
    setCheckingOut(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          discountCode: appliedCode || undefined,
          discountCents: discountCents || undefined,
        }),
      })
      if (res.ok) {
        const { url } = await res.json()
        window.location.href = url
      } else {
        const data = await res.json()
        toast.error(data.error ?? "Failed to start checkout")
        setCheckingOut(false)
      }
    } catch {
      toast.error("Something went wrong")
      setCheckingOut(false)
    }
  }

  if (count === 0) {
    return (
      <div className="py-20 px-4 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <ShoppingBag className="w-20 h-20 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Time to fill your bowl with some culture.</p>
        <Link
          href="/products"
          className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors flex items-center gap-2"
        >
          Shop All Designs <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">
          Your Cart ({count} {count === 1 ? "item" : "items"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-card rounded-2xl p-4 border border-border">
                <div className="w-20 h-20 bg-secondary rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.size} · {item.color}</p>
                  <p className="font-bold mt-1">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                      className="w-8 h-8 bg-secondary hover:bg-border rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, 1)}
                      className="w-8 h-8 bg-secondary hover:bg-border rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => { clearCart(); toast.success("Cart cleared") }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Clear cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border space-y-4 sticky top-24">
              <h2 className="text-lg font-bold">Order Summary</h2>

              {/* Free Shipping Progress */}
              {total < FREE_SHIPPING_THRESHOLD ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Add {formatPrice(remaining)} more for free shipping
                  </p>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4ade80] transition-all duration-300"
                      style={{ width: `${shippingProgress * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#4ade80] font-medium">🎉 Free shipping unlocked!</p>
              )}

              {/* Discount Code */}
              <div>
                <p className="text-sm font-medium mb-2">Discount Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="SLURP25"
                    disabled={!!appliedCode}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={validating || !!appliedCode}
                    className="px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {validating ? "..." : "Apply"}
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm pt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                {discountCents > 0 && (
                  <div className="flex justify-between text-[#4ade80]">
                    <span>{appliedCode}</span>
                    <span>-{formatPrice(discountCents / 100)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{total >= FREE_SHIPPING_THRESHOLD ? "FREE" : "Calculated at checkout"}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors disabled:opacity-60"
              >
                {checkingOut ? "Redirecting..." : "CHECKOUT SECURELY"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Secure checkout · 30-day returns · Ships in 2-3 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
