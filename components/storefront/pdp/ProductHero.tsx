"use client"

import { useMemo, useRef, useState } from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { ImageGallery } from "./ImageGallery"
import { AddToCartCTA } from "./AddToCartCTA"
import { StickyCartBar } from "./StickyCartBar"
import { formatCents, discountPercent } from "@/lib/utils/format"
import type { ProductWithDetails } from "@/lib/types/product"

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
}

interface Props {
  product: ProductWithDetails
}

export function ProductHero({ product }: Props) {
  const ctaRef = useRef<HTMLDivElement>(null)

  const primaryVariant = product.variants[0]
  const [selectedColor, setSelectedColor] = useState(primaryVariant?.color ?? "")
  const [selectedColorHex, setSelectedColorHex] = useState(primaryVariant?.colorHex ?? "#888888")

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0]

  const selectedImageUrl = useMemo(() => {
    const colorImage = product.images.find((img) => img.variantColor === selectedColor)
    return colorImage?.url ?? primaryImage?.url ?? ""
  }, [primaryImage?.url, product.images, selectedColor])

  const salePrice = formatCents(product.priceCents)
  const comparePrice = product.compareAtPriceCents
    ? formatCents(product.compareAtPriceCents)
    : null
  const savings = product.compareAtPriceCents
    ? discountPercent(product.compareAtPriceCents / 100, product.priceCents / 100)
    : null

  const handleColorChange = (color: string, colorHex: string) => {
    setSelectedColor(color)
    setSelectedColorHex(colorHex)
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <ImageGallery
            images={product.images}
            productName={product.title}
            badge={product.badge}
            badgeColor={product.badgeColor}
            selectedColor={selectedColor}
          />

          {/* Right: Product info — stagger on mount */}
          <motion.div
            className="flex flex-col justify-start lg:pt-2"
            variants={stagger.container}
            initial="hidden"
            animate="show"
          >
            {/* Category / subtitle */}
            {product.subtitle && (
              <motion.p
                variants={stagger.item}
                className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2"
              >
                {product.subtitle}
              </motion.p>
            )}

            {/* Title */}
            <motion.h1
              variants={stagger.item}
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight"
            >
              {product.title}
            </motion.h1>

            {/* Rating */}
            <motion.button
              variants={stagger.item}
              onClick={() =>
                document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 mb-5 w-fit group"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                4.9 <span className="opacity-60">(2,400+ reviews)</span>
              </span>
            </motion.button>

            {/* Pricing */}
            <motion.div variants={stagger.item} className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">{salePrice}</span>
              {comparePrice && (
                <span className="text-lg text-muted-foreground line-through">{comparePrice}</span>
              )}
              {savings !== null && savings > 0 && (
                <span className="text-sm font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded-full">
                  SAVE {savings}%
                </span>
              )}
            </motion.div>

            {/* Urgency signal */}
            <motion.p
              variants={stagger.item}
              className="text-xs font-semibold text-[#4ade80] mb-5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse inline-block" />
              Selling fast — order soon
            </motion.p>

            {/* Add to Cart */}
            <motion.div variants={stagger.item} ref={ctaRef}>
              <AddToCartCTA
                product={product}
                imageUrl={selectedImageUrl}
                selectedColor={selectedColor}
                selectedColorHex={selectedColorHex}
                onColorChange={handleColorChange}
              />
            </motion.div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <motion.div variants={stagger.item} className="flex flex-wrap gap-2 mt-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <StickyCartBar
        product={product}
        imageUrl={selectedImageUrl}
        ctaRef={ctaRef}
        selectedColor={selectedColor}
        selectedColorHex={selectedColorHex}
      />
    </>
  )
}
