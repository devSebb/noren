"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { useCart } from "@/lib/hooks/use-cart"
import { SIZES, type Size } from "@/lib/data/products"
import type { StoreProduct } from "@/lib/data/products-db"
import { formatPrice, discountPercent } from "@/lib/utils/format"

interface ProductSectionProps {
  products: StoreProduct[]
}

export function ProductSection({ products }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Designs")
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, Size>>({})
  const { addItem, openCart } = useCart()

  const categories = useMemo(
    () => ["All Designs", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  )

  const filtered =
    activeCategory === "All Designs"
      ? products
      : products.filter((product) => product.category === activeCategory)

  const handleAddToCart = (productId: string) => {
    const product = products.find((item) => item.id === productId)
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

    toast.success(`${product.title} (${size}) added!`, {
      icon: product.emoji,
    })

    setHoveredId(null)
    setSelectedSizes({})
    openCart()
  }

  return (
    <section id="shop" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            The Collection
          </h2>
          <p className="text-muted-foreground text-lg">
            Every design tells a story. Every tee is a statement.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, index) => (
            <a
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 block"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => {
                setHoveredId(null)
                setSelectedSizes((prev) => {
                  const next = { ...prev }
                  delete next[product.id]
                  return next
                })
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badge */}
                <span className={`absolute top-4 left-4 ${product.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
                  {product.badge}
                </span>

                {/* Discount */}
                <span className="absolute top-4 right-4 bg-background/90 text-[#4ade80] text-xs font-bold px-3 py-1 rounded-full">
                  -{discountPercent(product.originalPrice, product.price)}%
                </span>

                {/* Color Swatch */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <span className="text-xs font-medium">{product.color}</span>
                </div>

                {/* Hover Overlay */}
                {hoveredId === product.id && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent p-4 animate-slide-up">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            onClick={(e) => { e.preventDefault(); setSelectedSizes((prev) => ({ ...prev, [product.id]: size })) }}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                              selectedSizes[product.id] === size
                                ? "bg-primary text-primary-foreground"
                                : "bg-border text-foreground hover:bg-secondary"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product.id) }}
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
                      >
                        ADD TO CART — {formatPrice(product.price)}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <p className="text-xs tracking-widest text-muted-foreground uppercase mb-1">
                  {product.subtitle}
                </p>
                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
