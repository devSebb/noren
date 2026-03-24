"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useCart } from "@/lib/hooks/use-cart"
import type { Size } from "@/lib/data/products"
import type { StoreProduct } from "@/lib/data/products-db"

interface Props {
  product: StoreProduct
  sizes: readonly Size[]
}

export function AddToCartButton({ product, sizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const { addItem, openCart } = useCart()

  const handleAdd = () => {
    const size = selectedSize ?? "M"
    addItem({
      id: String(product.id),
      slug: product.slug,
      name: product.title,
      price: product.price,
      size,
      color: product.color,
      colorHex: product.colorHex,
      emoji: product.emoji,
      image: product.image,
    })
    toast.success(`${product.title} (${size}) added!`, { icon: product.emoji })
    openCart()
  }

  return (
    <div className="space-y-4">
      {/* Size Selector */}
      <div>
        <p className="text-sm font-medium mb-2">
          Size{" "}
          {!selectedSize && (
            <span className="text-muted-foreground font-normal">(defaults to M)</span>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-xl text-sm font-medium border-2 transition-all ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-muted-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-xl transition-colors"
      >
        ADD TO CART
      </button>
    </div>
  )
}
