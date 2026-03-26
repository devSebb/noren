"use client"

import type { ProductVariant } from "@/lib/types/product"

interface Props {
  variants: ProductVariant[]
  selectedColor: string
  onColorChange: (color: string, colorHex: string) => void
}

interface ColorOption {
  color: string
  colorHex: string
}

function normalizeHex(hex: string | null | undefined) {
  return hex && hex.trim() ? hex : "#888888"
}

function isNearWhite(hex: string) {
  const value = hex.replace("#", "")

  if (![3, 6].includes(value.length) || /[^0-9a-fA-F]/.test(value)) {
    return false
  }

  const expanded =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value

  const red = Number.parseInt(expanded.slice(0, 2), 16)
  const green = Number.parseInt(expanded.slice(2, 4), 16)
  const blue = Number.parseInt(expanded.slice(4, 6), 16)

  return red + green + blue > 680
}

export function ColorSelector({ variants, selectedColor, onColorChange }: Props) {
  const colorOptions = variants.reduce<ColorOption[]>((options, variant) => {
    if (!variant.color || options.some((option) => option.color === variant.color)) {
      return options
    }

    options.push({
      color: variant.color,
      colorHex: normalizeHex(variant.colorHex),
    })

    return options
  }, [])

  const activeOption =
    colorOptions.find((option) => option.color === selectedColor) ?? colorOptions[0] ?? null

  if (!activeOption) {
    return null
  }

  const isSingleColor = colorOptions.length === 1

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 gap-3">
        <p className="text-sm font-semibold">Color — {activeOption.color}</p>
      </div>

      <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        {colorOptions.map((option) => {
          const isSelected = option.color === activeOption.color
          const needsBorder = isNearWhite(option.colorHex)
          const swatchClassName = `relative h-7 w-7 rounded-full transition-all duration-200 ${
            needsBorder ? "border border-border" : ""
          } ${
            isSelected
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
              : "hover:scale-105 hover:brightness-110"
          } ${isSingleColor ? "cursor-default" : "cursor-pointer"}`

          if (isSingleColor) {
            return (
              <span
                key={option.color}
                aria-label={option.color}
                className={swatchClassName}
                style={{ backgroundColor: option.colorHex }}
              />
            )
          }

          return (
            <button
              key={option.color}
              type="button"
              aria-label={`Select ${option.color}`}
              aria-pressed={isSelected}
              onClick={() => onColorChange(option.color, option.colorHex)}
              className={swatchClassName}
              style={{ backgroundColor: option.colorHex }}
            />
          )
        })}
      </div>
    </div>
  )
}
