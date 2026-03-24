"use client"

import { useCart } from "@/lib/hooks/use-cart"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/products"
import { CheckCircle } from "lucide-react"

export function FreeShippingProgress() {
  const { total } = useCart()
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)
  const unlocked = total >= FREE_SHIPPING_THRESHOLD

  return (
    <div className="py-4 px-5 bg-card border border-border rounded-xl mb-6">
      {unlocked ? (
        <div className="flex items-center gap-2 text-[#4ade80] text-sm font-semibold">
          <CheckCircle className="w-4 h-4" />
          <span>You&apos;ve unlocked FREE shipping!</span>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-2">
            Add{" "}
            <span className="text-foreground font-semibold">
              ${remaining.toFixed(2)}
            </span>{" "}
            more for free shipping
          </p>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4ade80] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  )
}
