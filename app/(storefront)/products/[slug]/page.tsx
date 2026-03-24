import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlug, getProducts, type StoreProduct } from "@/lib/data/products-db"
import { buildProductMetadata } from "@/lib/utils/seo"
import { productJsonLd, breadcrumbJsonLd } from "@/lib/utils/json-ld"
import { ProductHero } from "@/components/storefront/pdp/ProductHero"
import { ProductStory } from "@/components/storefront/pdp/ProductStory"
import { WhyNoren } from "@/components/storefront/pdp/WhyNoren"
import { ProductFAQ } from "@/components/storefront/pdp/ProductFAQ"
import { RelatedProducts } from "@/components/storefront/pdp/RelatedProducts"
import { SizeGuide } from "@/components/storefront/pdp/SizeGuide"
import { ReviewsSection } from "@/components/storefront/ReviewsSection"
import type { ProductWithDetails } from "@/lib/types/product"

interface Props {
  params: Promise<{ slug: string }>
}

function toProductWithDetails(product: StoreProduct): ProductWithDetails {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle || null,
    description: product.description || null,
    priceCents: Math.round(product.price * 100),
    compareAtPriceCents: Math.round(product.originalPrice * 100) || null,
    category: product.category,
    tags: product.tags,
    badge: product.badge || null,
    badgeColor: product.badgeColor || null,
    emoji: product.emoji || null,
    isFeatured: null,
    seoTitle: null,
    seoDescription: null,
    ogImageUrl: null,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      sku: variant.printifyVariantId,
      priceCents: Math.round(product.price * 100),
      stockStatus: null,
    })),
    images: [
      {
        id: `${product.id}-primary`,
        url: product.image,
        altText: product.title,
        position: 0,
        isPrimary: true,
        variantColor: product.color,
      },
    ],
  }
}

function withGarmentDyeDescription(description?: string | null, fallback?: string | null) {
  const base = description ?? fallback ?? ""
  const phrase = "Comfort Colors garment-dyed tee"

  if (!base) {
    return `Premium ${phrase} with original NOREN artwork and a relaxed everyday fit.`
  }

  if (base.toLowerCase().includes(phrase.toLowerCase())) {
    return base
  }

  return `${base} Printed on a ${phrase} for a soft, relaxed fit.`
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const product = await getProductBySlug(slug)
    if (!product) return {}

    return await buildProductMetadata({
      title: product.title,
      description: withGarmentDyeDescription(product.description, product.subtitle),
      slug: product.slug,
      image: product.image,
      priceCents: Math.round(product.price * 100),
    })
  } catch {
    return {}
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params

  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const productDetails = toProductWithDetails(product)
  const allProducts = await getProducts()
  const related = allProducts
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3)
    .map(toProductWithDetails)

  const seoDescription = withGarmentDyeDescription(
    productDetails.description,
    productDetails.subtitle,
  )

  const structuredData = [
    productJsonLd({
      name: productDetails.title,
      description: seoDescription,
      images: productDetails.images.map((image) => image.url),
      slug: productDetails.slug,
      priceCents: productDetails.priceCents,
      compareAtPriceCents: productDetails.compareAtPriceCents ?? undefined,
      isAvailable: true,
      withAggregateRating: true,
    }),
    breadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: productDetails.title },
    ]),
  ]

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <ProductHero product={productDetails} />

      {productDetails.description && (
        <ProductStory
          description={productDetails.description}
          subtitle={productDetails.subtitle}
        />
      )}

      <WhyNoren />
      <SizeGuide garmentType="1717" />

      <div id="reviews">
        <ReviewsSection />
      </div>

      <RelatedProducts products={related} />

      <ProductFAQ />
    </>
  )
}
