import { DiscountForm } from "@/components/admin/DiscountForm"

export default function NewDiscountPage() {
  return (
    <div className="space-y-6">
      <div>
        <a href="/admin/discounts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Discount Codes
        </a>
        <h1 className="text-2xl font-extrabold tracking-tight mt-1">Create Discount Code</h1>
      </div>
      <DiscountForm />
    </div>
  )
}
