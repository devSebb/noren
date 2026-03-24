interface Props {
  color: string
  colorHex: string
}

export function ColorSwatch({ color, colorHex }: Props) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold mb-2">Color</p>
      <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 w-fit">
        <span
          className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
          style={{ backgroundColor: colorHex }}
        />
        <span className="text-sm font-medium">{color}</span>
      </div>
    </div>
  )
}
