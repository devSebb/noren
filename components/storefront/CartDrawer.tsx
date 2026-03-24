"use client"

import { X, ShoppingBag, Minus, Plus } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/lib/hooks/use-cart"
import { formatPrice } from "@/lib/utils/format"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/products"

export function CartDrawer() {
  const { items, isOpen, count, total, closeCart, removeItem, updateQuantity } = useCart()

  const shippingProgress = Math.min(total / FREE_SHIPPING_THRESHOLD, 1)
  const remaining = FREE_SHIPPING_THRESHOLD - total

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full max-w-md bg-background border-l border-border p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between p-6 border-b border-border space-y-0">
          <SheetTitle className="text-xl font-bold text-foreground">
            Your Cart ({count})
          </SheetTitle>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-xl font-bold mb-2">Your cart is empty</p>
              <p className="text-muted-foreground">Time to fill your bowl.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 bg-card rounded-xl p-4"
                >
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.size} · {item.color}
                    </p>
                    <p className="text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-6 h-6 bg-secondary hover:bg-border rounded flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-6 h-6 bg-secondary hover:bg-border rounded flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
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
              <p className="text-sm text-[#4ade80] font-medium">
                🎉 You&apos;ve unlocked free shipping!
              </p>
            )}

            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={async () => {
                const res = await fetch("/api/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ items }),
                })
                if (res.ok) {
                  const { url } = await res.json()
                  window.location.href = url
                }
              }}
              className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
            >
              CHECKOUT — {formatPrice(total)}
            </button>

            {/* Trust Line */}
            <p className="text-xs text-muted-foreground text-center">
              Secure checkout · 30-day returns · Ships in 2-3 days
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
