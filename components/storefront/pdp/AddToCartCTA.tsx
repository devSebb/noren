"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { formatCents } from "@/lib/utils/format"
import { ColorSelector } from "./ColorSelector"
import { SizeSelector, type PDPSize } from "./SizeSelector"
import { FreeShippingProgress } from "./FreeShippingProgress"
import { TrustBadges } from "./TrustBadges"
import type { ProductWithDetails } from "@/lib/types/product"

interface Props {
  product: ProductWithDetails
  imageUrl: string
  selectedColor: string
  selectedColorHex: string
  onColorChange: (color: string, colorHex: string) => void
}

export function AddToCartCTA({
  product,
  imageUrl,
  selectedColor,
  selectedColorHex,
  onColorChange,
}: Props) {
  const [selectedSize, setSelectedSize] = useState<PDPSize | null>(null)
  const { addItem, openCart } = useCart()
  const price = product.priceCents / 100

  const handleAdd = () => {
    const size = selectedSize ?? "M"

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.title,
      price,
      size,
      color: selectedColor,
      colorHex: selectedColorHex,
      emoji: product.emoji ?? "👕",
      image: imageUrl,
    })

    toast.success(`${product.title} (${size}) added!`, {
      icon: product.emoji ?? "👕",
    })

    openCart()
  }

  return (
    <div>
      <ColorSelector
        variants={product.variants}
        selectedColor={selectedColor}
        onColorChange={onColorChange}
      />
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
