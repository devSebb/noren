"use client"

import { useMemo, useState } from "react"
import { ChevronDown, Ruler, Shirt } from "lucide-react"

interface SizeGuideProps {
  garmentType?: "1717" | "1566"
}

type GarmentType = NonNullable<SizeGuideProps["garmentType"]>

type GarmentData = {
  name: string
  material: string
  weight: string
  fit: string
  sizingNote: string
  features: string[]
  care: string
  brandCopy: string
  badges: string[]
  sleeveLabel: string
  measureNote?: string
  chart: Array<{
    size: string
    chest: string
    length: string
    sleeve: string
  }>
}

const GARMENT_DATA: Record<GarmentType, GarmentData> = {
  "1717": {
    name: "Comfort Colors 1717 — Unisex Garment-Dyed Tee",
    material: "100% ring-spun US cotton",
    weight: "6.1 oz (207 gsm)",
    fit: "Relaxed, boxy unisex",
    sizingNote:
      "True to size with a relaxed silhouette. Size down if you prefer a fitted look. Pre-washed — minimal shrinkage.",
    features: [
      "Pigment Pure™ garment dye",
      "OEKO-TEX certified",
      "Side-seamed construction",
      "Shoulder-to-shoulder twill tape",
      "US Cotton Trust Protocol",
    ],
    care:
      "Machine wash cold, tumble dry low. The garment-dyed finish deepens with every wash.",
    brandCopy:
      "Built for comfort, finished for character. Each tee is individually garment-dyed, giving it that broken-in softness and rich, lived-in color from day one. No two are exactly alike.",
    badges: ["OEKO-TEX", "Ring-Spun Cotton", "Garment-Dyed", "US Cotton"],
    sleeveLabel: "Sleeve",
    measureNote: "Measure across the chest, one inch below the armpit.",
    chart: [
      { size: "S", chest: '18.25"', length: '26 5/8"', sleeve: '16 1/4"' },
      { size: "M", chest: '20.25"', length: '28"', sleeve: '17 3/4"' },
      { size: "L", chest: '22"', length: '29 3/8"', sleeve: '19"' },
      { size: "XL", chest: '24"', length: '30 3/4"', sleeve: '20 1/2"' },
      { size: "2XL", chest: '26"', length: '31 5/8"', sleeve: '21 3/4"' },
    ],
  },
  "1566": {
    name: "Comfort Colors 1566 — Unisex Garment-Dyed Crewneck Sweatshirt",
    material: "80% ring-spun US cotton / 20% polyester",
    weight: "9.5 oz",
    fit: "Relaxed unisex crewneck",
    sizingNote: "True to size, pre-shrunk. Size up for an oversized look.",
    features: [
      "Garment-dyed finish",
      "Forward rolled shoulders",
      "Set-in sleeves",
      "1×1 rib collar, cuffs, and waistband",
      "Double-needle stitching",
    ],
    care: "Machine wash cold, tumble dry low.",
    brandCopy:
      "Heavyweight, garment-dyed, and built to last. The kind of sweatshirt that gets better with every wear.",
    badges: ["OEKO-TEX", "Ring-Spun Cotton", "Garment-Dyed", "US Cotton"],
    sleeveLabel: "Sleeve (CB)",
    measureNote: "Measure across the chest, one inch below the armpit.",
    chart: [
      { size: "S", chest: '21"', length: '27.5"', sleeve: '31.5"' },
      { size: "M", chest: '23"', length: '28.5"', sleeve: '33.5"' },
      { size: "L", chest: '25"', length: '29.5"', sleeve: '35.25"' },
      { size: "XL", chest: '26.5"', length: '30.5"', sleeve: '36.75"' },
      { size: "2XL", chest: '28"', length: '31.5"', sleeve: '38.25"' },
    ],
  },
}

const tabs = ["size-guide", "details-care"] as const

type TabKey = (typeof tabs)[number]

export function SizeGuide({ garmentType = "1717" }: SizeGuideProps) {
  const garment = GARMENT_DATA[garmentType]
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>("size-guide")
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const introLabel = useMemo(() => {
    if (garmentType === "1717") {
      return "Comfort Colors garment-dyed tee"
    }

    return "Comfort Colors garment-dyed crewneck"
  }, [garmentType])

  return (
    <section className="border-t border-border py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02] md:px-6"
            aria-expanded={isOpen}
            aria-controls="size-guide-panel"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Fit, fabric, and sizing
              </p>
              <h2 className="mt-1 text-lg font-bold text-foreground md:text-xl">
                Size Guide & Product Details
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Built around our signature {introLabel} for an easy fit check before you buy.
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isOpen && (
            <div id="size-guide-panel" className="border-t border-[#2a2a2a] px-5 py-5 md:px-6 md:py-6">
              <div className="mb-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("size-guide")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === "size-guide"
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_rgba(204,68,68,0.22)]"
                      : "border-[#303030] bg-[#202020] text-muted-foreground hover:border-[#444] hover:text-foreground"
                  }`}
                >
                  Size Guide
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("details-care")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === "details-care"
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_rgba(204,68,68,0.22)]"
                      : "border-[#303030] bg-[#202020] text-muted-foreground hover:border-[#444] hover:text-foreground"
                  }`}
                >
                  Details & Care
                </button>
              </div>

              {activeTab === "size-guide" ? (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Ruler className="h-4 w-4 text-primary" />
                        How to measure
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {garment.measureNote}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground md:max-w-sm md:text-right">
                      <span className="font-medium text-foreground">Fit note:</span> {garment.sizingNote}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#141414]">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#2a2a2a] bg-white/[0.03] text-left text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            <th className="px-4 py-3 font-semibold">Size</th>
                            <th className="px-4 py-3 font-semibold">Chest</th>
                            <th className="px-4 py-3 font-semibold">Length</th>
                            <th className="px-4 py-3 font-semibold">{garment.sleeveLabel}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {garment.chart.map((row) => {
                            const isSelected = selectedSize === row.size

                            return (
                              <tr
                                key={row.size}
                                className={`cursor-pointer border-b border-[#242424] transition-colors last:border-b-0 ${
                                  isSelected
                                    ? "bg-primary/12"
                                    : "hover:bg-white/[0.03]"
                                }`}
                                onClick={() => setSelectedSize(row.size)}
                              >
                                <td className="px-4 py-3">
                                  <span
                                    className={`inline-flex min-w-12 items-center justify-center rounded-full border px-3 py-1 text-xs font-bold ${
                                      isSelected
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-[#343434] bg-[#1e1e1e] text-foreground"
                                    }`}
                                  >
                                    {row.size}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">{row.chest}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.length}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.sleeve}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Tap a size to highlight your best match. Measurements are shown in inches and taken laid flat.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Shirt className="h-4 w-4 text-primary" />
                      Garment Details
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-foreground">{garment.name}</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Material</p>
                        <p className="mt-1 text-sm text-foreground">{garment.material}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Weight</p>
                        <p className="mt-1 text-sm text-foreground">{garment.weight}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Fit</p>
                        <p className="mt-1 text-sm text-foreground">{garment.fit}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Sizing note</p>
                        <p className="mt-1 text-sm text-foreground">{garment.sizingNote}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {garment.badges.map((badge) => (
                        <span
                          key={badge}
                          className="rounded-full border border-[#3a3a3a] bg-[#202020] px-3 py-1.5 text-xs font-semibold text-foreground"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Features</p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {garment.features.map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Care</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{garment.care}</p>
                    </div>

                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Why we use it</p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/90">“{garment.brandCopy}”</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
