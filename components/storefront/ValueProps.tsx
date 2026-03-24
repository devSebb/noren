const props = [
  {
    icon: "👕",
    title: "Premium Quality",
    description: "Heavyweight garment-dyed cotton. Broken-in softness from day one.",
  },
  {
    icon: "🎨",
    title: "DTG Printed",
    description: "Vibrant, detailed prints that won't crack, peel, or fade.",
  },
  {
    icon: "📦",
    title: "Fast Shipping",
    description: "Ships in 2-3 business days. Free over $75.",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    description: "30-day hassle-free returns. No questions asked.",
  },
]

export function ValueProps() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border text-center"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
