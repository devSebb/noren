import { ProductForm } from "@/components/admin/ProductForm"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <a href="/admin/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Products
        </a>
        <h1 className="text-2xl font-extrabold tracking-tight mt-1">Add Product</h1>
      </div>
      <ProductForm />
    </div>
  )
}
