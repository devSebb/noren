import { Truck, RotateCcw, ShieldCheck } from "lucide-react"

const badges = [
  { icon: Truck, title: "Ships in 2–3 Days", sub: "USA fulfillment" },
  { icon: RotateCcw, title: "30-Day Returns", sub: "Hassle-free guarantee" },
  { icon: ShieldCheck, title: "Secure Checkout", sub: "SSL encrypted" },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-border">
      {badges.map(({ icon: Icon, title, sub }) => (
        <div key={title} className="flex flex-col items-center text-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs font-semibold text-foreground leading-tight">{title}</p>
          <p className="text-xs text-muted-foreground leading-tight hidden sm:block">{sub}</p>
        </div>
      ))}
    </div>
  )
}
