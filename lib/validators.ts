import { z } from "zod"

// ============================================================
// COMMON
// ============================================================

export const emailSchema = z.string().email("Invalid email address").toLowerCase().trim()

// ============================================================
// NEWSLETTER
// ============================================================

export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: z.string().trim().optional(),
  source: z.enum(["website", "checkout", "popup", "footer"]).default("website"),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// ============================================================
// CONTACT FORM
// ============================================================

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: emailSchema,
  subject: z.string().min(1, "Subject is required").max(200).trim(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000).trim(),
})

export type ContactInput = z.infer<typeof contactSchema>

// ============================================================
// CHECKOUT
// ============================================================

const cartImageSchema = z.string().refine(
  (value) => value.startsWith("/") || /^https?:\/\//.test(value),
  "Image must be a URL or root-relative path"
)

export const cartItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number().positive(),
  size: z.string(),
  color: z.string(),
  colorHex: z.string(),
  emoji: z.string(),
  image: cartImageSchema,
  quantity: z.number().int().positive(),
})

export const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Cart is empty"),
  discountCode: z.string().trim().optional(),
  email: emailSchema.optional(),
  cartSessionId: z.string().optional(),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>

// ============================================================
// DISCOUNT VALIDATION
// ============================================================

export const discountValidateSchema = z.object({
  code: z.string().min(1).trim().toUpperCase(),
  subtotalCents: z.number().int().nonnegative(),
})

export type DiscountValidateInput = z.infer<typeof discountValidateSchema>

// ============================================================
// ORDER TRACKING
// ============================================================

export const trackOrderSchema = z.object({
  email: emailSchema,
  orderNumber: z.string().min(1).trim().toUpperCase(),
})

export type TrackOrderInput = z.infer<typeof trackOrderSchema>

// ============================================================
// ADMIN — PRODUCT
// ============================================================

export const productSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(100).optional(),
  description: z.string().optional(),
  priceCents: z.number().int().positive(),
  compareAtPriceCents: z.number().int().positive().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  badge: z.string().max(50).optional(),
  badgeColor: z.string().optional(),
  emoji: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

export type ProductInput = z.infer<typeof productSchema>

// ============================================================
// ADMIN — DISCOUNT CODE
// ============================================================

export const discountCodeSchema = z.object({
  code: z.string().min(3).max(50).trim().toUpperCase(),
  type: z.enum(["percentage", "fixed_amount"]),
  value: z.number().int().positive(),
  minimumOrderCents: z.number().int().nonnegative().default(0),
  maxUses: z.number().int().positive().optional(),
  startsAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
})

export type DiscountCodeInput = z.infer<typeof discountCodeSchema>
