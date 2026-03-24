import type { Metadata } from "next"
import { db } from "@/lib/db"
import { seoSettings } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://norenapparel.com"
const SITE_NAME = "NOREN 暖簾"

/** Fetch SEO override for a given page path from the database. */
async function getSeoOverride(pagePath: string) {
  try {
    const result = await db
      .select()
      .from(seoSettings)
      .where(eq(seoSettings.pagePath, pagePath))
      .limit(1)
    return result[0] ?? null
  } catch {
    return null
  }
}

interface PageMetaOptions {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

/** Build a Metadata object, merged with any DB overrides for the given path. */
export async function buildMetadata(opts: PageMetaOptions): Promise<Metadata> {
  const override = await getSeoOverride(opts.path)

  const title = override?.title ?? opts.title
  const description = override?.description ?? opts.description
  const ogImage = override?.ogImageUrl ?? opts.image
  const noIndex = override?.noIndex ?? opts.noIndex ?? false
  const canonicalUrl = override?.canonicalUrl ?? `${SITE_URL}${opts.path}`

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical: canonicalUrl },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: `${title} — ${SITE_NAME}`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

/** Build product-specific Metadata. */
export async function buildProductMetadata(opts: {
  title: string
  description: string
  slug: string
  image?: string
  priceCents: number
}): Promise<Metadata> {
  const path = `/products/${opts.slug}`
  const override = await getSeoOverride(path)

  const title = override?.title ?? opts.title
  const description = override?.description ?? opts.description
  const ogImage = override?.ogImageUrl ?? opts.image
  const canonicalUrl = override?.canonicalUrl ?? `${SITE_URL}${path}`

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: `${title} — ${SITE_NAME}`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}
