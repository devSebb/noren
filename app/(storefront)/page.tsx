import type { Metadata } from "next"
import { HeroBanner } from "@/components/storefront/HeroBanner"
import { MarqueeStrip } from "@/components/storefront/MarqueeStrip"
import { ProductSection } from "@/components/storefront/ProductSection"
import { ReviewsSection } from "@/components/storefront/ReviewsSection"
import { ValueProps } from "@/components/storefront/ValueProps"
import { NewsletterSignup } from "@/components/storefront/NewsletterSignup"
import { getProducts } from "@/lib/data/products-db"
import { buildMetadata } from "@/lib/utils/seo"
import { organizationJsonLd, websiteJsonLd } from "@/lib/utils/json-ld"

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await buildMetadata({
      title: "NOREN 暖簾 | Japanese-Inspired Apparel",
      description:
        "Wear the Culture. Premium garment-dyed t-shirts featuring hand-illustrated Japanese art where mythology, food culture, and streetwear collide.",
      path: "/",
    })
  } catch {
    return {}
  }
}

export default async function HomePage() {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()]
  const products = await getProducts()

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <HeroBanner />
      <MarqueeStrip />
      <ProductSection products={products} />
      <ReviewsSection />
      <ValueProps />
      <NewsletterSignup />
    </>
  )
}
