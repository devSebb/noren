const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const PRODUCT_LIST_SELECT =
  "id,slug,title,subtitle,description,price_cents,compare_at_price_cents,category,tags,badge,badge_color,emoji,is_featured,is_active,printify_product_id,product_variants(id,size,color,color_hex,printify_variant_id,is_active),product_images(url,alt_text,is_primary,position,variant_color)"

const PRODUCT_LIST_QUERY = `products?select=${PRODUCT_LIST_SELECT}&is_active=eq.true&order=created_at.asc`
const PRODUCT_BY_SLUG_QUERY = `products?select=${PRODUCT_LIST_SELECT},created_at&is_active=eq.true`

export interface StoreProduct {
  id: string
  slug: string
  title: string
  subtitle: string
  price: number
  originalPrice: number
  badge: string
  badgeColor: string
  category: string
  tags: string[]
  emoji: string
  description?: string
  image: string
  color: string
  colorHex: string
  variants: Array<{
    id: string
    size: string
    color: string
    colorHex: string
    printifyVariantId: string | null
  }>
}

interface SupabaseVariant {
  id: string
  size: string | null
  color: string | null
  color_hex: string | null
  printify_variant_id: string | null
  is_active: boolean | null
}

interface SupabaseImage {
  url: string | null
  alt_text: string | null
  is_primary: boolean | null
  position: number | null
  variant_color: string | null
}

interface SupabaseProduct {
  id: string
  slug: string
  title: string | null
  subtitle: string | null
  description: string | null
  price_cents: number | null
  compare_at_price_cents: number | null
  category: string | null
  tags: string[] | null
  badge: string | null
  badge_color: string | null
  emoji: string | null
  is_featured: boolean | null
  is_active: boolean | null
  printify_product_id: string | null
  product_variants?: SupabaseVariant[] | null
  product_images?: SupabaseImage[] | null
}

function getSupabaseHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  }
}

async function fetchSupabase<T>(path: string): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: getSupabaseHeaders(),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Supabase request failed (${response.status}): ${errorText}`)
  }

  return response.json() as Promise<T>
}

function mapProduct(product: SupabaseProduct): StoreProduct {
  const variants = (product.product_variants ?? [])
    .filter((variant) => variant?.is_active !== false)
    .map((variant) => ({
      id: variant.id,
      size: variant.size ?? "M",
      color: variant.color ?? "Default",
      colorHex: variant.color_hex ?? "#000000",
      printifyVariantId: variant.printify_variant_id,
    }))

  const sortedImages = [...(product.product_images ?? [])].sort(
    (a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER)
  )

  const primaryImage =
    sortedImages.find((image) => image.is_primary && image.url)?.url ??
    sortedImages.find((image) => image.url)?.url ??
    "/placeholder.svg"

  const firstVariant = variants[0]

  return {
    id: product.id,
    slug: product.slug,
    title: product.title ?? "Untitled Product",
    subtitle: product.subtitle ?? "",
    price: (product.price_cents ?? 0) / 100,
    originalPrice: (product.compare_at_price_cents ?? product.price_cents ?? 0) / 100,
    badge: product.badge ?? "NEW",
    badgeColor: product.badge_color ?? "bg-primary text-primary-foreground",
    category: product.category ?? "Uncategorized",
    tags: product.tags ?? [],
    emoji: product.emoji ?? "🛍️",
    description: product.description ?? undefined,
    image: primaryImage,
    color: firstVariant?.color ?? "Default",
    colorHex: firstVariant?.colorHex ?? "#000000",
    variants,
  }
}

export async function getProducts(): Promise<StoreProduct[]> {
  const products = await fetchSupabase<SupabaseProduct[]>(PRODUCT_LIST_QUERY)
  return products.map(mapProduct)
}

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  const encodedSlug = encodeURIComponent(slug)
  const products = await fetchSupabase<SupabaseProduct[]>(`${PRODUCT_BY_SLUG_QUERY}&slug=eq.${encodedSlug}&limit=1`)
  const product = products[0]
  return product ? mapProduct(product) : null
}
