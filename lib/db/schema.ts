import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// ============================================================
// PRODUCTS
// ============================================================

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  priceCents: integer("price_cents").notNull(),
  compareAtPriceCents: integer("compare_at_price_cents"),
  category: text("category").notNull(),
  tags: text("tags").array().default([]),
  badge: text("badge"),
  badgeColor: text("badge_color"),
  emoji: text("emoji"),
  isFeatured: boolean("is_featured").default(false),
  isActive: boolean("is_active").default(true),
  printifyBlueprintId: text("printify_blueprint_id"),
  printifyPrintProviderId: text("printify_print_provider_id"),
  printifyProductId: text("printify_product_id"),
  designFileUrl: text("design_file_url"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  ogImageUrl: text("og_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

export const productVariants = pgTable("product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  colorHex: text("color_hex"),
  sku: text("sku").unique(),
  priceCents: integer("price_cents"),
  printifyVariantId: text("printify_variant_id"),
  stockStatus: text("stock_status").default("in_stock"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const productImages = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  url: text("url").notNull(),
  altText: text("alt_text"),
  position: integer("position").default(0),
  isPrimary: boolean("is_primary").default(false),
  variantColor: text("variant_color"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// COLLECTIONS
// ============================================================

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  isActive: boolean("is_active").default(true),
  position: integer("position").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// ORDERS
// ============================================================

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderNumber: text("order_number").unique().notNull(),
  email: text("email").notNull(),
  status: text("status").default("pending"),
  paymentStatus: text("payment_status").default("pending"),
  fulfillmentStatus: text("fulfillment_status").default("unfulfilled"),
  subtotalCents: integer("subtotal_cents").notNull(),
  discountCents: integer("discount_cents").default(0),
  shippingCents: integer("shipping_cents").default(0),
  taxCents: integer("tax_cents").default(0),
  totalCents: integer("total_cents").notNull(),
  currency: text("currency").default("usd"),
  stripeCheckoutSessionId: text("stripe_checkout_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  printifyOrderId: text("printify_order_id"),
  discountCode: text("discount_code"),
  shippingName: text("shipping_name").notNull(),
  shippingAddressLine1: text("shipping_address_line1").notNull(),
  shippingAddressLine2: text("shipping_address_line2"),
  shippingCity: text("shipping_city").notNull(),
  shippingState: text("shipping_state"),
  shippingPostalCode: text("shipping_postal_code").notNull(),
  shippingCountry: text("shipping_country").default("US").notNull(),
  shippingPhone: text("shipping_phone"),
  trackingNumber: text("tracking_number"),
  trackingUrl: text("tracking_url"),
  carrier: text("carrier"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  productId: uuid("product_id").references(() => products.id),
  variantId: uuid("variant_id").references(() => productVariants.id),
  title: text("title").notNull(),
  variantLabel: text("variant_label").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPriceCents: integer("unit_price_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
  designFileUrl: text("design_file_url"),
  printifyVariantId: text("printify_variant_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const orderEvents = pgTable("order_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  eventType: text("event_type").notNull(),
  description: text("description"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// CUSTOMERS
// ============================================================

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  totalOrders: integer("total_orders").default(0),
  totalSpentCents: integer("total_spent_cents").default(0),
  lastOrderAt: timestamp("last_order_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// EMAIL SUBSCRIBERS
// ============================================================

export const emailSubscribers = pgTable("email_subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  firstName: text("first_name"),
  source: text("source").default("website"),
  isActive: boolean("is_active").default(true),
  subscribedAt: timestamp("subscribed_at", { withTimezone: true }).defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
})

// ============================================================
// DISCOUNT CODES
// ============================================================

export const discountCodes = pgTable("discount_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").unique().notNull(),
  type: text("type").notNull(),
  value: integer("value").notNull(),
  minimumOrderCents: integer("minimum_order_cents").default(0),
  maxUses: integer("max_uses"),
  timesUsed: integer("times_used").default(0),
  isActive: boolean("is_active").default(true),
  startsAt: timestamp("starts_at", { withTimezone: true }).defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// CART SESSIONS (abandoned cart recovery)
// ============================================================

export const cartSessions = pgTable("cart_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").unique().notNull(),
  email: text("email"),
  items: jsonb("items").notNull().default([]),
  subtotalCents: integer("subtotal_cents").default(0),
  abandonedEmailSent: boolean("abandoned_email_sent").default(false),
  recovered: boolean("recovered").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// SEO SETTINGS
// ============================================================

export const seoSettings = pgTable("seo_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  pagePath: text("page_path").unique().notNull(),
  title: text("title"),
  description: text("description"),
  ogImageUrl: text("og_image_url"),
  canonicalUrl: text("canonical_url"),
  noIndex: boolean("no_index").default(false),
  structuredData: jsonb("structured_data"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// STORE SETTINGS
// ============================================================

export const storeSettings = pgTable("store_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// ============================================================
// RELATIONS
// ============================================================

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
  images: many(productImages),
}))

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
}))

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}))

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
  events: many(orderEvents),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
  variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}))

export const orderEventsRelations = relations(orderEvents, ({ one }) => ({
  order: one(orders, { fields: [orderEvents.orderId], references: [orders.id] }),
}))
