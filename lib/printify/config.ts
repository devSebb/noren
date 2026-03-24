// ============================================================
// PRINTIFY PRODUCT CONFIGURATION
// ============================================================
// Fill in the values below with data from your Printify account.
//
// How to find your blueprint and print provider IDs:
//   1. Go to Printify > Catalog
//   2. Choose your product (e.g., "Unisex Garment-Dyed T-Shirt")
//   3. The URL will contain the blueprint ID
//   4. Select your print provider — its ID appears in the URL
//
// How to find variant IDs:
//   1. In Printify, go to your product
//   2. Use the API to list variants: GET /v1/catalog/blueprints/{id}/print_providers/{id}/variants.json
//   3. Match each size/color combination to its Printify variant ID
//
// Map key format: "Color/Size" (e.g., "Black/M", "Navy/XL")
// ============================================================

export interface PrintifyProductConfig {
  /** Internal product slug (must match slug in products table) */
  slug: string
  /** Printify product ID once created in your shop (fill after creating via API) */
  printifyProductId?: string
  /** Blueprint ID from Printify catalog */
  blueprintId: number
  /** Print provider ID */
  printProviderId: number
  /** Map of "Color/Size" → Printify variant ID */
  variantMapping: Record<string, number>
  /** Print areas for the design */
  printAreas: {
    front: {
      /** URL to the high-res design file (Supabase Storage URL recommended) */
      src: string
      scale: number
      x: number
      y: number
    }
  }
}

// ============================================================
// FILL IN YOUR PRODUCT CONFIGS BELOW
// ============================================================
export const PRINTIFY_PRODUCT_MAP: PrintifyProductConfig[] = [
  {
    slug: "the-ramen-connoisseur",
    blueprintId: 0,          // TODO: Fill in blueprint ID
    printProviderId: 0,       // TODO: Fill in print provider ID
    printAreas: {
      front: {
        src: "",              // TODO: Fill in design file URL (Supabase Storage)
        scale: 1,
        x: 0.5,
        y: 0.5,
      },
    },
    variantMapping: {
      // TODO: Fill in variant IDs from Printify
      // "Seafoam/S": 12345,
      // "Seafoam/M": 12346,
      // "Seafoam/L": 12347,
      // "Seafoam/XL": 12348,
      // "Seafoam/2XL": 12349,
    },
  },
  {
    slug: "black-cat-ramen",
    blueprintId: 0,
    printProviderId: 0,
    printAreas: {
      front: { src: "", scale: 1, x: 0.5, y: 0.5 },
    },
    variantMapping: {},
  },
  {
    slug: "warriors-feast",
    blueprintId: 0,
    printProviderId: 0,
    printAreas: {
      front: { src: "", scale: 1, x: 0.5, y: 0.5 },
    },
    variantMapping: {},
  },
  {
    slug: "city-sized-hunger",
    blueprintId: 0,
    printProviderId: 0,
    printAreas: {
      front: { src: "", scale: 1, x: 0.5, y: 0.5 },
    },
    variantMapping: {},
  },
  {
    slug: "black-cat-at-golden-hour",
    blueprintId: 0,
    printProviderId: 0,
    printAreas: {
      front: { src: "", scale: 1, x: 0.5, y: 0.5 },
    },
    variantMapping: {},
  },
  {
    slug: "hokusais-ramen",
    blueprintId: 0,
    printProviderId: 0,
    printAreas: {
      front: { src: "", scale: 1, x: 0.5, y: 0.5 },
    },
    variantMapping: {},
  },
  {
    slug: "blossom-and-broth",
    blueprintId: 0,
    printProviderId: 0,
    printAreas: {
      front: { src: "", scale: 1, x: 0.5, y: 0.5 },
    },
    variantMapping: {},
  },
]
