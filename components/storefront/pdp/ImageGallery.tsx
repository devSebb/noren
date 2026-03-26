"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    if (!selectedColor) return null
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
      {/* Main image with crossfade */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border/40">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.url}
              alt={activeImage.altText ?? productName}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Badge */}
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`absolute top-4 left-4 ${badgeColor ?? "bg-primary text-primary-foreground"} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg z-10`}
          >
            {badge}
          </motion.span>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img) => {
            const isActive = img.id === activeImage.id
            return (
              <motion.button
                key={img.id}
                type="button"
                onClick={() => setActiveImageId(img.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  isActive
                    ? "border-primary shadow-[0_0_12px_rgba(204,68,68,0.3)]"
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
                {isActive && (
                  <motion.div
                    layoutId="thumb-active"
                    className="absolute inset-0 border-2 border-primary rounded-xl"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      )}
    </div>
  )
}
