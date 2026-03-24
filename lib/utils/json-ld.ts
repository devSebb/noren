const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://norenapparel.com"

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
  image?: string
  slug: string
  priceCents: number
  isAvailable?: boolean
}) {
  const priceUSD = (opts.priceCents / 100).toFixed(2)

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image,
    url: `${SITE_URL}/products/${opts.slug}`,
    brand: {
      "@type": "Brand",
      name: "NOREN 暖簾",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${opts.slug}`,
      priceCurrency: "USD",
      price: priceUSD,
      availability: opts.isAvailable !== false
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
