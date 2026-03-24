export interface ProductVariant {
  id: string
  size: string
  color: string
  colorHex: string | null
  sku: string | null
  priceCents: number | null
  stockStatus: string | null
}

export interface ProductImage {
  id: string
  url: string
  altText: string | null
  position: number | null
  isPrimary: boolean | null
  variantColor: string | null
}

export interface ProductWithDetails {
  id: string
  slug: string
  title: string
  subtitle: string | null
  description: string | null
  priceCents: number
  compareAtPriceCents: number | null
  category: string
  tags: string[] | null
  badge: string | null
  badgeColor: string | null
  emoji: string | null
  isFeatured: boolean | null
  seoTitle: string | null
  seoDescription: string | null
  ogImageUrl: string | null
  variants: ProductVariant[]
  images: ProductImage[]
}
