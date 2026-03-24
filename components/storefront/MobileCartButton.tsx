"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"

export function MobileCartButton() {
  const { count, openCart } = useCart()

  return (
    <div className="fixed bottom-6 right-6 md:hidden z-40">
      <button
        onClick={openCart}
        className="relative w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/25 flex items-center justify-center transition-colors"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
    </div>
  )
}
