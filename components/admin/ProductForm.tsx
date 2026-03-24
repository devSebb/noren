"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ProductFormData {
  title: string
  subtitle: string
  slug: string
  description: string
  priceCents: string
  compareAtPriceCents: string
  category: string
  badge: string
  emoji: string
  isFeatured: boolean
  isActive: boolean
  blueprintId: string
  printProviderId: string
}

const CATEGORIES = ["Cats", "Dragons", "Kawaii", "Warriors", "Fine Art"]

interface Props {
  initialData?: Partial<ProductFormData>
  productId?: string
}

export function ProductForm({ initialData, productId }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<ProductFormData>({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    priceCents: "",
    compareAtPriceCents: "",
    category: "Cats",
    badge: "",
    emoji: "",
    isFeatured: false,
    isActive: true,
    blueprintId: "",
    printProviderId: "",
    ...initialData,
  })

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
    setForm((f) => ({ ...f, title, slug: f.slug || slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        priceCents: Math.round(parseFloat(form.priceCents) * 100),
        compareAtPriceCents: form.compareAtPriceCents
          ? Math.round(parseFloat(form.compareAtPriceCents) * 100)
          : undefined,
      }

      const res = await fetch(productId ? `/api/admin/products/${productId}` : "/api/admin/products", {
        method: productId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(productId ? "Product updated!" : "Product created!")
        router.push("/admin/products")
      } else {
        const data = await res.json()
        toast.error(data.error ?? "Failed to save product")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
  const labelClass = "block text-sm font-medium mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Fields */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold">Basic Info</h2>
            <div>
              <label className={labelClass}>Title *</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="The Ramen Connoisseur"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug *</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                placeholder="the-ramen-connoisseur"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="KIMONO GUINEA PIG"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="Tell the story of this design..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.priceCents}
                  onChange={(e) => setForm({ ...form, priceCents: e.target.value })}
                  required
                  placeholder="34.99"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Compare-at Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.compareAtPriceCents}
                  onChange={(e) => setForm({ ...form, compareAtPriceCents: e.target.value })}
                  placeholder="44.99"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold">Fulfillment Configuration</h2>
            <p className="text-sm text-muted-foreground">Enter your Printify IDs for automated fulfillment. Find these in your Printify account.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Blueprint ID</label>
                <input
                  value={form.blueprintId}
                  onChange={(e) => setForm({ ...form, blueprintId: e.target.value })}
                  placeholder="e.g. 5"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Print Provider ID</label>
                <input
                  value={form.printProviderId}
                  onChange={(e) => setForm({ ...form, printProviderId: e.target.value })}
                  placeholder="e.g. 99"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-bold">Organization</h2>
            <div>
              <label className={labelClass}>Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Badge Label</label>
              <input
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="BEST SELLER"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Emoji</label>
              <input
                value={form.emoji}
                onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                placeholder="🐹"
                className={inputClass}
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <h2 className="font-bold">Visibility</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm">Active (visible in store)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm">Featured on homepage</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold rounded-xl transition-colors"
          >
            {saving ? "Saving..." : productId ? "Update Product" : "Create Product"}
          </button>
        </div>
      </div>
    </form>
  )
}
