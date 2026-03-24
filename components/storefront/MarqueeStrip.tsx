export function MarqueeStrip() {
  return (
    <div className="border-y border-border py-4 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(2)].map((_, i) => (
          <span key={i} className="text-sm tracking-[0.3em] text-muted-foreground/50 uppercase mx-4">
            🍜 RAMEN CULTURE · 🐈‍⬛ KAWAII CATS · ⚔️ SAMURAI SPIRIT · 🐉 DRAGON ENERGY · 🌊 UKIYO-E ART · 🌸 SAKURA VIBES ·{" "}
          </span>
        ))}
      </div>
    </div>
  )
}
