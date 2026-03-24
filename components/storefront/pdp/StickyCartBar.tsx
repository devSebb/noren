"use client"

import { useEffect, useRef, useState } from "react"
import { ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/hooks/use-cart"
import { formatCents } from "@/lib/utils/format"
import type { ProductWithDetails } from "@/lib/types/product"

interface Props {
  product: ProductWithDetails
  primaryImageUrl: string
  ctaRef: React.RefObject<HTMLDivElement | null>
}

export function StickyCartBar({ product, primaryImageUrl, ctaRef }: Props) {
  const [visible, setVisible] = useState(false)
  const { addItem, openCart } = useCart()

  const primaryVariant = product.variants[0]
  const color = primaryVariant?.color ?? ""
  const colorHex = primaryVariant?.colorHex ?? "#888"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    const el = ctaRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [ctaRef])

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: product.priceCents / 100,
      size: "M",
      color,
      colorHex,
      emoji: product.emoji ?? "👕",
      image: primaryImageUrl,
    })
    toast.success(`${product.title} (M) added!`, { icon: product.emoji ?? "👕" })
    openCart()
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/95 backdrop-blur-sm border-t border-border px-4 py-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">{product.title}</p>
          <p className="text-xs text-muted-foreground">{formatCents(product.priceCents)}</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-bold text-sm flex-shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
