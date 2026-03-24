import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { formatCents } from "@/lib/utils/format"
import Link from "next/link"

export default async function AdminProductsPage() {
  let allProducts: typeof products.$inferSelect[] = []
  try {
    allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
  } catch {
    // DB not configured yet — show static products as a fallback reference
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Products</h1>
          <p className="text-muted-foreground">{allProducts.length} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors text-sm"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground">
                    <p className="mb-2">No products in database yet.</p>
                    <p className="text-xs">Run the seed script to import initial products, or add manually.</p>
                  </td>
                </tr>
              ) : (
                allProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.emoji}</span>
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-xs text-muted-foreground">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground capitalize">{product.category}</td>
                    <td className="p-4">{formatCents(product.priceCents)}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.isActive
                            ? "bg-[#4ade80]/10 text-[#4ade80]"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {product.isActive ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-primary hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
