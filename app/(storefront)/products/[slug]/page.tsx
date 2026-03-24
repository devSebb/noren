import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@/lib/db/queries/products"
import { buildProductMetadata } from "@/lib/utils/seo"
import { productJsonLd, breadcrumbJsonLd } from "@/lib/utils/json-ld"
import { ProductHero } from "@/components/storefront/pdp/ProductHero"
import { ProductStory } from "@/components/storefront/pdp/ProductStory"
import { WhyNoren } from "@/components/storefront/pdp/WhyNoren"
import { ProductFAQ } from "@/components/storefront/pdp/ProductFAQ"
import { RelatedProducts } from "@/components/storefront/pdp/RelatedProducts"
import { ReviewsSection } from "@/components/storefront/ReviewsSection"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    if (!product) return {}
    const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0]
    return await buildProductMetadata({
      title: product.seoTitle ?? product.title,
      description: product.seoDescription ?? product.description ?? "",
      slug: product.slug,
      image: product.ogImageUrl ?? primaryImage?.url,
      priceCents: product.priceCents,
    })
  } catch {
    return {}
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params

  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.category, product.slug, 3)

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0]

  const structuredData = [
    productJsonLd({
      name: product.title,
      description: product.description ?? undefined,
      images: product.images.map((img) => img.url),
      slug: product.slug,
      priceCents: product.priceCents,
      compareAtPriceCents: product.compareAtPriceCents ?? undefined,
      isAvailable: true,
      withAggregateRating: true,
    }),
    breadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: product.title },
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

      {/* Above the fold: image gallery + product info + CTA */}
      <ProductHero product={product} />

      {/* The Story — rich description from DB */}
      {product.description && (
        <ProductStory
          description={product.description}
          subtitle={product.subtitle}
        />
      )}

      {/* Why NOREN — static quality section */}
      <WhyNoren />

      {/* Social proof */}
      <div id="reviews">
        <ReviewsSection />
      </div>

      {/* Related products */}
      <RelatedProducts products={related} />

      {/* FAQ */}
      <ProductFAQ />
    </>
  )
}
