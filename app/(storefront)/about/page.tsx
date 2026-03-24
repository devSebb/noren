import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Story — NOREN 暖簾",
  description: "Learn about NOREN — Japanese-inspired apparel where mythology, food culture, and streetwear collide.",
}

export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-6xl mb-6 block">🍜</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Story
          </h1>
          <p className="text-muted-foreground text-xl">
            Where mythology, ramen obsession, and streetwear collide.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">
            NOREN (暖簾) started with a simple obsession: Japanese culture deserved better representation in streetwear.
          </p>

          <p>
            The word &ldquo;noren&rdquo; refers to the fabric dividers hung in Japanese doorways — a symbol of tradition, craft, and the invitation to step inside and discover something wonderful. That&apos;s exactly what we want our shirts to feel like: an invitation to appreciate a culture that&apos;s equal parts ancient and alive.
          </p>

          <p>
            Every design is hand-illustrated by artists who genuinely love Japanese aesthetics — not just the aesthetics, but the stories behind them. Samurai cats who take their ramen as seriously as their bushido. Dragons cradling bowls of broth like precious artifacts. The Great Wave reimagined as the world&apos;s most epic noodle soup.
          </p>

          <p>
            We print exclusively on premium garment-dyed cotton. No thin, scratchy blanks. The kind of tee that gets better with every wash, that people ask you about when you wear it.
          </p>

          <p>
            This isn&apos;t just merch. It&apos;s wearable culture.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: "🎨", label: "Hand-Illustrated", description: "Every design is original art" },
            { icon: "👕", label: "Premium Cotton", description: "Garment-dyed heavyweight fabric" },
            { icon: "🌏", label: "Made with Love", description: "In the USA with Japanese soul" },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-2xl p-6 border border-border text-center">
              <span className="text-4xl block mb-3">{item.icon}</span>
              <h3 className="font-bold mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
