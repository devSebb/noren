// ============================================================
// PRINTIFY PRODUCT CONFIGURATION
// ============================================================
// Blueprint 706: Unisex Garment-Dyed T-shirt
// Provider 99: Printify Choice
// Colors: Seafoam, Yam, Washed Denim, Moss, Mustard
// Sizes: S, M, L, XL, 2XL
// ============================================================

export interface PrintifyProductConfig {
  slug: string
  printifyProductId: string
  blueprintId: number
  printProviderId: number
  variantMapping: Record<string, number>
  printAreas: {
    front: {
      src: string
      scale: number
      x: number
      y: number
    }
  }
}

// Shared variant mapping — same for all products (same blueprint + provider)
const SHARED_VARIANT_MAPPING: Record<string, number> = {
  "Seafoam/S":       78951,
  "Seafoam/M":       78952,
  "Seafoam/L":       78953,
  "Seafoam/XL":      78954,
  "Seafoam/2XL":     78955,
  "Yam/S":           79106,
  "Yam/M":           79107,
  "Yam/L":           79108,
  "Yam/XL":          79109,
  "Yam/2XL":         79110,
  "Washed Denim/S":  79096,
  "Washed Denim/M":  79097,
  "Washed Denim/L":  79098,
  "Washed Denim/XL": 79099,
  "Washed Denim/2XL":79100,
  "Moss/S":          79021,
  "Moss/M":          79022,
  "Moss/L":          79023,
  "Moss/XL":         79024,
  "Moss/2XL":        79025,
  "Mustard/S":       79026,
  "Mustard/M":       79027,
  "Mustard/L":       79028,
  "Mustard/XL":      79029,
  "Mustard/2XL":     79030,
}

export const PRINTIFY_PRODUCT_MAP: PrintifyProductConfig[] = [
  {
    slug: "the-ramen-connoisseur",
    printifyProductId: "69c225452cba662fc405f349",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "black-cat-ramen",
    printifyProductId: "69c225542ca6824bb9045213",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "warriors-feast",
    printifyProductId: "69c225672e38f3660f002027",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "city-sized-hunger",
    printifyProductId: "69c2257c2e38f3660f00202a",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "dragon-noodle-spirit",
    printifyProductId: "69c2258e65f2255f8f0faf2b",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "capybara-ramen",
    printifyProductId: "69c2259e65f2255f8f0faf2e",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "fox-husky-ramen",
    printifyProductId: "69c225a865f2255f8f0faf3c",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "ramen-frog",
    printifyProductId: "69c225b82ca6824bb9045237",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
  {
    slug: "samurai-cat-retro",
    printifyProductId: "69c225cb7fb825d7240251e7",
    blueprintId: 706,
    printProviderId: 99,
    variantMapping: SHARED_VARIANT_MAPPING,
    printAreas: { front: { src: "", scale: 0.8, x: 0.5, y: 0.5 } },
  },
]
