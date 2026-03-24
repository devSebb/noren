"use client"

import { useRef } from "react"
import { Star } from "lucide-react"
import { ImageGallery } from "./ImageGallery"
import { AddToCartCTA } from "./AddToCartCTA"
import { StickyCartBar } from "./StickyCartBar"
import { formatCents, discountPercent } from "@/lib/utils/format"
import type { ProductWithDetails } from "@/lib/types/product"

interface Props {
  product: ProductWithDetails
}

export function ProductHero({ product }: Props) {
  const ctaRef = useRef<HTMLDivElement>(null)

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0]
  const primaryImageUrl = primaryImage?.url ?? ""

  const salePrice = formatCents(product.priceCents)
  const comparePrice = product.compareAtPriceCents
    ? formatCents(product.compareAtPriceCents)
    : null
  const savings = product.compareAtPriceCents
    ? discountPercent(product.compareAtPriceCents / 100, product.priceCents / 100)
    : null

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
          />

          {/* Right: Product info */}
          <div className="flex flex-col justify-start lg:pt-2">
            {/* Category / subtitle */}
            {product.subtitle && (
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">
                {product.subtitle}
              </p>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
              {product.title}
            </h1>

            {/* Rating — links to reviews */}
            <button
              onClick={() =>
                document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 mb-5 w-fit group"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                4.9 <span className="opacity-60">(2,400+ reviews)</span>
              </span>
            </button>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">{salePrice}</span>
              {comparePrice && (
                <span className="text-lg text-muted-foreground line-through">{comparePrice}</span>
              )}
              {savings !== null && savings > 0 && (
                <span className="text-sm font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded-full">
                  SAVE {savings}%
                </span>
              )}
            </div>

            {/* Urgency signal */}
            <p className="text-xs font-semibold text-[#4ade80] mb-5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse inline-block" />
              Selling fast — order soon
            </p>

            {/* Add to Cart (size, color, progress, button, trust) */}
            <div ref={ctaRef}>
              <AddToCartCTA product={product} primaryImageUrl={primaryImageUrl} />
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <StickyCartBar
        product={product}
        primaryImageUrl={primaryImageUrl}
        ctaRef={ctaRef}
      />
    </>
  )
}
