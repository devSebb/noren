import { Weight, Sparkles, Ruler, Pen, Printer, Heart } from "lucide-react"

const features = [
  {
    icon: Weight,
    title: "Heavyweight Cotton",
    body: "100% ring-spun, garment-dyed 6.5oz Comfort Colors 1717. The gold standard of blank tees — thick, structured, and made to last.",
  },
  {
    icon: Sparkles,
    title: "Broken-In From Day One",
    body: "Pre-shrunk and garment-dyed for that perfectly worn-in feel. No stiff, scratchy nonsense. It drapes like your oldest favorite shirt, immediately.",
  },
  {
    icon: Ruler,
    title: "Relaxed Fit, True to Size",
    body: "Boxy, comfortable cut that sits easy on every body. Not too tight, not a tent. Order your usual size and wear it with confidence.",
  },
  {
    icon: Pen,
    title: "Hand-Illustrated Art",
    body: "Every NOREN design starts as a hand illustration. No AI slop. No stock vectors. No cutting corners. Original art on your back, full stop.",
  },
  {
    icon: Printer,
    title: "DTG Printed",
    body: "Direct-to-garment printing locks vibrant color into the fabric for prints that stay soft, bright, and crack-free wash after wash.",
  },
  {
    icon: Heart,
    title: "Made With Obsession",
    body: "We're not a faceless print farm. We obsess over every detail — the blank, the ink, the art — so you get wearable art, not a merch drop.",
  },
]

export function WhyNoren() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Why NOREN?
          </h2>
          <p className="text-muted-foreground">Built different. Worn forever.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
