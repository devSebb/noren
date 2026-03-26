"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import type { ProductImage } from "@/lib/types/product"

interface Props {
  images: ProductImage[]
  productName: string
  badge: string | null
  badgeColor: string | null
  selectedColor?: string
}

export function ImageGallery({ images, productName, badge, badgeColor, selectedColor }: Props) {
  const fallbackImage = useMemo(
    () => images.find((img) => img.isPrimary) ?? images[0] ?? null,
    [images]
  )

  const selectedColorImage = useMemo(() => {
    if (!selectedColor) {
      return null
    }

    return images.find((img) => img.variantColor === selectedColor) ?? null
  }, [images, selectedColor])

  const [activeImageId, setActiveImageId] = useState<string | null>(
    selectedColorImage?.id ?? fallbackImage?.id ?? null
  )

  useEffect(() => {
    setActiveImageId(selectedColorImage?.id ?? fallbackImage?.id ?? null)
  }, [fallbackImage?.id, selectedColorImage?.id])

  const activeImage = images.find((img) => img.id === activeImageId) ?? fallbackImage

  if (!activeImage) return null

  return (
    <div className="sticky top-24">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
        <Image
          src={activeImage.url}
          alt={activeImage.altText ?? productName}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {badge && (
          <span
            className={`absolute top-4 left-4 ${badgeColor ?? "bg-primary text-primary-foreground"} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg`}
          >
            {badge}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img) => {
            const isActive = img.id === activeImage.id

            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImageId(img.id)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  isActive
                    ? "border-primary shadow-[0_0_12px_rgba(204,68,68,0.25)]"
                    : "border-border hover:border-muted-foreground"
                }`}
                aria-label={`View ${img.altText ?? productName} image`}
                aria-pressed={isActive}
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? productName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
