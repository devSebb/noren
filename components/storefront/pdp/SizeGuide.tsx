"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const sizes = [
  { size: "S",   width: 18, length: 27, sleeve: 8.5 },
  { size: "M",   width: 20, length: 28, sleeve: 9 },
  { size: "L",   width: 22, length: 29, sleeve: 9.5 },
  { size: "XL",  width: 24, length: 30, sleeve: 10 },
  { size: "2XL", width: 26, length: 31, sleeve: 10.5 },
]

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
          Size guide
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <p className="text-xs text-muted-foreground mb-4">
            Comfort Colors 1717 — relaxed, slightly oversized fit. Measurements in inches (laid flat).
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold">Size</th>
                <th className="text-center py-2 font-semibold">Width</th>
                <th className="text-center py-2 font-semibold">Length</th>
                <th className="text-center py-2 font-semibold">Sleeve</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row) => (
                <tr key={row.size} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 font-medium">{row.size}</td>
                  <td className="py-2.5 text-center text-muted-foreground">{row.width}&quot;</td>
                  <td className="py-2.5 text-center text-muted-foreground">{row.length}&quot;</td>
                  <td className="py-2.5 text-center text-muted-foreground">{row.sleeve}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-4">
            Tip: If you're between sizes or prefer a looser fit, size up.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
