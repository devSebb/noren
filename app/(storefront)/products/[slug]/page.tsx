import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { products, SIZES } from "@/lib/data/products"
import { formatPrice, discountPercent } from "@/lib/utils/format"
import { AddToCartButton } from "@/components/storefront/AddToCartButton"
import { ReviewsSection } from "@/components/storefront/ReviewsSection"
import { buildProductMetadata } from "@/lib/utils/seo"
import { productJsonLd, breadcrumbJsonLd } from "@/lib/utils/json-ld"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return buildProductMetadata({
    title: product.name,
    description: product.description,
    slug: product.slug,
    image: product.image,
    priceCents: Math.round(product.price * 100),
  })
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const structuredData = [
    productJsonLd({
      name: product.name,
      description: product.description,
      image: product.image,
      slug: product.slug,
      priceCents: Math.round(product.price * 100),
    }),
    breadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: product.name },
    ]),
  ]

  return (
    <div className="py-12 px-4">
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className={`absolute top-4 left-4 ${product.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
              {product.badge}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">
              {product.subtitle}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm text-[#4ade80] font-bold">
                SAVE {discountPercent(product.originalPrice, product.price)}%
              </span>
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 w-fit">
                <span
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: product.colorHex }}
                />
                <span className="text-sm font-medium">{product.color}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Add to Cart */}
            <AddToCartButton product={product} sizes={SIZES} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-border">
              {[
                { icon: "📦", text: "Ships in 2-3 days" },
                { icon: "↩️", text: "30-day returns" },
                { icon: "🔒", text: "Secure checkout" },
              ].map((badge) => (
                <div key={badge.text} className="text-center">
                  <span className="text-2xl block mb-1">{badge.icon}</span>
                  <span className="text-xs text-muted-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ReviewsSection />

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <a
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-muted-foreground text-sm">{formatPrice(p.price)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
