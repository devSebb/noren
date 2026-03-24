"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DiscountFormData {
  code: string
  type: "percentage" | "fixed_amount"
  value: string
  minimumOrderCents: string
  maxUses: string
  expiresAt: string
  isActive: boolean
}

interface Props {
  initialData?: Partial<DiscountFormData>
  discountId?: string
}

export function DiscountForm({ initialData, discountId }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<DiscountFormData>({
    code: "",
    type: "percentage",
    value: "",
    minimumOrderCents: "",
    maxUses: "",
    expiresAt: "",
    isActive: true,
    ...initialData,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        code: form.code.toUpperCase(),
        type: form.type,
        value: form.type === "percentage"
          ? parseInt(form.value)
          : Math.round(parseFloat(form.value) * 100),
        minimumOrderCents: form.minimumOrderCents
          ? Math.round(parseFloat(form.minimumOrderCents) * 100)
          : 0,
        maxUses: form.maxUses ? parseInt(form.maxUses) : undefined,
        expiresAt: form.expiresAt || undefined,
        isActive: form.isActive,
      }

      const url = discountId
        ? `/api/admin/discounts/${discountId}`
        : "/api/admin/discounts"

      const res = await fetch(url, {
        method: discountId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(discountId ? "Discount updated!" : "Discount created!")
        router.push("/admin/discounts")
      } else {
        const data = await res.json()
        toast.error(data.error ?? "Failed to save discount")
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
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div>
          <label className={labelClass}>Code *</label>
          <input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
            required
            placeholder="SUMMER20"
            className={`${inputClass} font-mono uppercase`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Type *</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as DiscountFormData["type"] })}
              className={inputClass}
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed_amount">Fixed Amount ($)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Value * {form.type === "percentage" ? "(%)" : "($)"}
            </label>
            <input
              type="number"
              step={form.type === "percentage" ? "1" : "0.01"}
              min="0"
              max={form.type === "percentage" ? "100" : undefined}
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              required
              placeholder={form.type === "percentage" ? "20" : "10.00"}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Minimum Order ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.minimumOrderCents}
              onChange={(e) => setForm({ ...form, minimumOrderCents: e.target.value })}
              placeholder="0.00"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Max Uses</label>
            <input
              type="number"
              min="1"
              value={form.maxUses}
              onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
              placeholder="Unlimited"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Expires At</label>
          <input
            type="datetime-local"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm">Active</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold rounded-xl transition-colors"
      >
        {saving ? "Saving..." : discountId ? "Update Discount" : "Create Discount"}
      </button>
    </form>
  )
}
