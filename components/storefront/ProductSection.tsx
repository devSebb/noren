"use client"

import { useMemo, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useCart } from "@/lib/hooks/use-cart"
import { SIZES, type Size } from "@/lib/data/products"
import type { StoreProduct } from "@/lib/data/products-db"
import { formatPrice, discountPercent } from "@/lib/utils/format"
import { MagneticButton } from "@/components/ui/MagneticButton"

interface ProductSectionProps {
  products: StoreProduct[]
}

// Pre-computed kamon spokes — avoids SSR/client floating-point mismatch
const KAMON_LINES = [0, 60, 120, 180, 240, 300].map((angle) => {
  const rad = (angle * Math.PI) / 180
  return {
    x1: +(24 + 16 * Math.cos(rad)).toFixed(4),
    y1: +(24 + 16 * Math.sin(rad)).toFixed(4),
    x2: +(24 + 22 * Math.cos(rad)).toFixed(4),
    y2: +(24 + 22 * Math.sin(rad)).toFixed(4),
    angle,
  }
})

function KamonCircle() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-40">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="0.75" />
      {KAMON_LINES.map(({ x1, y1, x2, y2, angle }) => (
        <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.75" />
      ))}
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

// 3D tilt card wrapper
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 6)
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 6)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual product card
function ProductCard({
  product,
  index,
  selectedSize,
  onSizeSelect,
  onAddToCart,
}: {
  product: StoreProduct
  index: number
  selectedSize: Size | undefined
  onSizeSelect: (size: Size) => void
  onAddToCart: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className="h-full">
        <Link
          href={`/products/${product.slug}`}
          className="group relative bg-card rounded-2xl overflow-hidden block h-full border border-border/50 hover:border-border transition-colors duration-300"
          data-cursor="text"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false)
          }}
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient overlay always visible at bottom of image */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/60 to-transparent" />

            {/* Badge */}
            <span className={`absolute top-4 left-4 ${product.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
              {product.badge}
            </span>

            {/* Discount */}
            <span className="absolute top-4 right-4 bg-background/90 text-[#4ade80] text-xs font-bold px-2.5 py-1 rounded-full">
              -{discountPercent(product.originalPrice, product.price)}%
            </span>

            {/* Color swatch */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full border border-white/30" style={{ backgroundColor: product.colorHex }} />
              <span className="text-[10px] font-medium">{product.color}</span>
            </div>

            {/* Hover overlay — size + add to cart */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22 }}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/96 to-transparent pt-10 pb-4 px-4"
                >
                  {/* Sizes */}
                  <div className="flex gap-1.5 mb-3">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault()
                          onSizeSelect(size)
                        }}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(204,68,68,0.4)]"
                            : "bg-border/80 text-foreground hover:bg-secondary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      onAddToCart()
                    }}
                    className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl transition-colors tracking-wider"
                  >
                    ADD TO CART — {formatPrice(product.price)}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-mono">
              {product.subtitle}
            </p>
            <h3 className="text-base font-bold mb-1.5 leading-snug">{product.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

export function ProductSection({ products }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Designs")
  const [selectedSizes, setSelectedSizes] = useState<Record<string, Size>>({})
  const { addItem, openCart } = useCart()

  const sectionRef = useRef(null)

  const categories = useMemo(
    () => ["All Designs", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  )

  const filtered =
    activeCategory === "All Designs"
      ? products
      : products.filter((p) => p.category === activeCategory)

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return
    const size = selectedSizes[productId] ?? "M"
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
    setSelectedSizes((prev) => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
    openCart()
  }

  return (
    <section id="shop" className="py-24 px-4" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div className="flex items-center gap-5">
            <div className="text-muted-foreground">
              <KamonCircle />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase mb-1">
                02 — Collection
              </p>
              <h2 className="font-display font-extrabold tracking-tight leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                The{" "}
                <span className="gradient-text">Collection</span>
              </h2>
            </div>
          </div>

          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed hidden md:block">
            Every design hand-drawn. Every tee garment-dyed. No compromises.
          </p>
        </div>

        {/* Filter bar with animated pill */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor="grow"
              className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              style={{ color: activeCategory === cat ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Product grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                selectedSize={selectedSizes[product.id]}
                onSizeSelect={(size) =>
                  setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))
                }
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <MagneticButton>
            <Link
              href="/products"
              data-cursor="grow"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border rounded-xl text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-300"
            >
              View All Designs
              <span className="text-base">↗</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
