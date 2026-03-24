"use client"

const SIZES = ["S", "M", "L", "XL", "2XL"] as const
export type PDPSize = (typeof SIZES)[number]

interface Props {
  selectedSize: PDPSize | null
  onSizeChange: (size: PDPSize) => void
}

export function SizeSelector({ selectedSize, onSizeChange }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 gap-3">
        <p className="text-sm font-semibold">
          Size
          {!selectedSize && (
            <span className="text-muted-foreground font-normal ml-1">— select one</span>
          )}
        </p>
        <span className="text-xs text-muted-foreground">Full fit guide below</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`w-12 h-12 rounded-xl text-sm font-semibold border-2 transition-all ${
              selectedSize === size
                ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(204,68,68,0.3)]"
                : "border-border bg-card text-foreground hover:border-muted-foreground"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
