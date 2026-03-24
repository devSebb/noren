"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { formatCents } from "@/lib/utils/format"
import { ColorSwatch } from "./ColorSwatch"
import { SizeSelector, type PDPSize } from "./SizeSelector"
import { FreeShippingProgress } from "./FreeShippingProgress"
import { TrustBadges } from "./TrustBadges"
import type { ProductWithDetails } from "@/lib/types/product"

interface Props {
  product: ProductWithDetails
  primaryImageUrl: string
}

export function AddToCartCTA({ product, primaryImageUrl }: Props) {
  const [selectedSize, setSelectedSize] = useState<PDPSize | null>(null)
  const { addItem, openCart } = useCart()

  const primaryVariant = product.variants[0]
  const color = primaryVariant?.color ?? ""
  const colorHex = primaryVariant?.colorHex ?? "#888"
  const price = product.priceCents / 100

  const handleAdd = () => {
    const size = selectedSize ?? "M"
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.title,
      price,
      size,
      color,
      colorHex,
      emoji: product.emoji ?? "👕",
      image: primaryImageUrl,
    })
    toast.success(`${product.title} (${size}) added!`, {
      icon: product.emoji ?? "👕",
    })
    openCart()
  }

  return (
    <div>
      <ColorSwatch color={color} colorHex={colorHex} />
      <SizeSelector selectedSize={selectedSize} onSizeChange={setSelectedSize} />
      <FreeShippingProgress />
      <button
        onClick={handleAdd}
        className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_4px_24px_rgba(204,68,68,0.25)] hover:shadow-[0_4px_32px_rgba(204,68,68,0.4)]"
      >
        <ShoppingBag className="w-5 h-5" />
        ADD TO CART — {formatCents(product.priceCents)}
      </button>
      <TrustBadges />
    </div>
  )
}
