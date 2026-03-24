import { eq, and, ne } from "drizzle-orm"
import { db, products, productVariants, productImages } from "@/lib/db"
import type { ProductWithDetails } from "@/lib/types/product"

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  const result = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: {
      variants: {
        where: eq(productVariants.isActive, true),
        orderBy: (v, { asc }) => [asc(v.size)],
      },
      images: {
        orderBy: (i, { asc }) => [asc(i.position)],
      },
    },
  })
  return result ?? null
}

export async function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit = 3
): Promise<ProductWithDetails[]> {
  const results = await db.query.products.findMany({
    where: and(
      eq(products.category, category),
      ne(products.slug, excludeSlug),
      eq(products.isActive, true)
    ),
    limit,
    with: {
      variants: {
        where: eq(productVariants.isActive, true),
        orderBy: (v, { asc }) => [asc(v.size)],
      },
      images: {
        orderBy: (i, { asc }) => [asc(i.position)],
      },
    },
  })
  return results
}

export async function getAllProductSlugs(): Promise<string[]> {
  const results = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.isActive, true))
  return results.map((r) => r.slug)
}
