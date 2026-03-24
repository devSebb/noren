"use client"

import Image from "next/image"
import type { ProductImage } from "@/lib/types/product"

interface Props {
  images: ProductImage[]
  productName: string
  badge: string | null
  badgeColor: string | null
}

export function ImageGallery({ images, productName, badge, badgeColor }: Props) {
  const primary = images.find((img) => img.isPrimary) ?? images[0]

  if (!primary) return null

  return (
    <div className="sticky top-24">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
        <Image
          src={primary.url}
          alt={primary.altText ?? productName}
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
      {/* Thumbnail strip — renders only when multiple images exist */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                img.isPrimary ? "border-primary" : "border-border"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? productName}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
