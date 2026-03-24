import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { ProductForm } from "@/components/admin/ProductForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params

  let product: typeof products.$inferSelect | null = null
  try {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1)
    product = result[0] ?? null
  } catch {
    // DB not configured
  }

  if (!product) notFound()

  const initialData = {
    title: product.title,
    subtitle: product.subtitle ?? "",
    slug: product.slug,
    description: product.description ?? "",
    priceCents: (product.priceCents / 100).toFixed(2),
    compareAtPriceCents: product.compareAtPriceCents
      ? (product.compareAtPriceCents / 100).toFixed(2)
      : "",
    category: product.category,
    badge: product.badge ?? "",
    emoji: product.emoji ?? "",
    isFeatured: product.isFeatured ?? false,
    isActive: product.isActive ?? true,
    blueprintId: product.printifyBlueprintId ?? "",
    printProviderId: product.printifyPrintProviderId ?? "",
  }

  return (
    <div className="space-y-6">
      <div>
        <a href="/admin/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Products
        </a>
        <h1 className="text-2xl font-extrabold tracking-tight mt-1">Edit Product</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{product.title}</p>
      </div>
      <ProductForm initialData={initialData} productId={id} />
    </div>
  )
}
