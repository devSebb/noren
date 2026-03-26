export function MarqueeStrip() {
  const topItems = [
    "— RAMEN CULTURE",
    "— KAWAII CATS",
    "— SAMURAI SPIRIT",
    "— DRAGON ENERGY",
    "— UKIYO-E ART",
    "— SAKURA VIBES",
    "— HAND DRAWN",
    "— DTG PRINTED",
  ]

  const bottomItems = ["文化", "侍", "竜", "猫", "麺", "桜", "浮世絵", "暖簾"]

  return (
    <div className="border-y border-border/50 overflow-hidden select-none bg-background">
      {/* Top strip — cream text, forward */}
      <div className="py-3 flex overflow-hidden border-b border-border/30">
        <div className="animate-marquee whitespace-nowrap flex shrink-0">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center">
              {topItems.map((item, j) => (
                <span
                  key={j}
                  className="text-[11px] font-mono tracking-[0.25em] text-foreground/50 uppercase mx-6"
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom strip — gold Japanese text, reverse */}
      <div className="py-2.5 flex overflow-hidden">
        <div
          className="whitespace-nowrap flex shrink-0"
          style={{ animation: "marquee 20s linear infinite reverse" }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center">
              {bottomItems.map((item, j) => (
                <span
                  key={j}
                  className="font-jp text-sm text-accent/50 mx-8 tracking-widest"
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
