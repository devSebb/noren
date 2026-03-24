const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://norenapparel.com"

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NOREN 暖簾",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.instagram.com/norenapparel",
      "https://www.tiktok.com/@norenapparel",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: process.env.SUPPORT_EMAIL ?? "hello@norenapparel.com",
    },
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NOREN 暖簾",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function productJsonLd(opts: {
  name: string
  description?: string
  images?: string[]
  image?: string
  slug: string
  priceCents: number
  compareAtPriceCents?: number
  sku?: string
  isAvailable?: boolean
  withAggregateRating?: boolean
}) {
  const priceUSD = (opts.priceCents / 100).toFixed(2)
  const highPriceUSD = opts.compareAtPriceCents
    ? (opts.compareAtPriceCents / 100).toFixed(2)
    : priceUSD

  const imageList = opts.images ?? (opts.image ? [opts.image] : [])

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: imageList,
    url: `${SITE_URL}/products/${opts.slug}`,
    ...(opts.sku ? { sku: opts.sku } : {}),
    brand: {
      "@type": "Brand",
      name: "NOREN 暖簾",
    },
    ...(opts.withAggregateRating !== false
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "2400",
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_URL}/products/${opts.slug}`,
      priceCurrency: "USD",
      lowPrice: priceUSD,
      highPrice: highPriceUSD,
      offerCount: "5",
      availability:
        opts.isAvailable !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "NOREN 暖簾",
      },
    },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; href?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }
}
