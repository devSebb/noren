"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ShoppingBag, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
  const [added, setAdded] = useState(false)
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

    // Brief success state
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)

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

      {/* Add to cart button with success state */}
      <motion.button
        onClick={handleAdd}
        data-cursor="grow"
        whileTap={{ scale: 0.97 }}
        className={`w-full py-4 font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
          added
            ? "bg-[#22c55e] text-white shadow-[0_4px_24px_rgba(34,197,94,0.3)]"
            : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_24px_rgba(204,68,68,0.25)] hover:shadow-[0_4px_32px_rgba(204,68,68,0.4)]"
        }`}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              ADDED TO CART!
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              ADD TO CART — {formatCents(product.priceCents)}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <TrustBadges />
    </div>
  )
}
