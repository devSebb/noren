import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-[15%] left-[10%] text-6xl animate-float opacity-15">🍜</span>
        <span className="absolute top-[25%] right-[15%] text-5xl animate-float-delayed opacity-15">🐈‍⬛</span>
        <span className="absolute bottom-[30%] left-[20%] text-4xl animate-float-slow opacity-15">🌸</span>
        <span className="absolute top-[40%] right-[25%] text-5xl animate-float opacity-15">🐉</span>
        <span className="absolute bottom-[20%] right-[10%] text-4xl animate-float-delayed opacity-15">⚔️</span>
        <span className="absolute top-[60%] left-[8%] text-5xl animate-float-slow opacity-15">🌊</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border mb-8">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Japanese-Inspired Apparel
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[0.9]">
          Wear the{" "}
          <span className="animate-gradient">Culture.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Premium garment-dyed tees featuring hand-illustrated Japanese art. Where mythology,
          ramen obsession, and streetwear collide into wearable masterpieces.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/#shop"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            SHOP ALL DESIGNS
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-border hover:border-muted-foreground text-foreground font-semibold rounded-xl transition-all duration-300"
          >
            OUR STORY
          </Link>
        </div>

        {/* Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="text-accent">★</span> 12K+ Happy Customers
          </span>
          <span className="hidden md:inline">·</span>
          <span className="flex items-center gap-2">4.9★ Average Rating</span>
          <span className="hidden md:inline">·</span>
          <span>100% Garment-Dyed</span>
          <span className="hidden md:inline">·</span>
          <span>7 Unique Designs</span>
        </div>
      </div>
    </section>
  )
}
