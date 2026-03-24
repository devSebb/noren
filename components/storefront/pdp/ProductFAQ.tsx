import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "What material are NOREN tees made of?",
    a: "Every NOREN tee is printed on a Comfort Colors 1717 blank — 100% ring-spun cotton, garment-dyed, 6.5oz heavyweight. It's the softest, most durable blank we could find, and the standard by which we judge every other tee.",
  },
  {
    q: "How do they fit?",
    a: "Relaxed and boxy with a slightly oversized feel. Most customers order their normal size. Check the size guide above for exact measurements. The garment-dyed cotton holds its shape without being stiff.",
  },
  {
    q: "How should I wash my tee?",
    a: "Turn inside out, cold wash, tumble dry low or hang dry. The garment-dyed fabric will actually soften even more over time — it's one of the few items of clothing that genuinely gets better with every wash. Avoid bleach and ironing directly on the print.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders ship within 2–4 business days from our US fulfillment partner. Standard delivery is 5–7 business days within the US. Free shipping on all orders over $75.",
  },
  {
    q: "What's your return policy?",
    a: "We offer hassle-free 30-day returns. If you're not happy for any reason — wrong size, not what you expected, changed your mind — we'll make it right with a full exchange or refund. No questions, no drama.",
  },
  {
    q: "Are the designs really hand-drawn?",
    a: "Yes. Every NOREN design starts as a hand illustration. We don't use AI-generated art or stock vectors. Each piece is original work. This is slower and more expensive, but you can feel the difference — there's a warmth and intentionality to hand-drawn work that algorithms can't replicate.",
  },
  {
    q: "Where are the shirts printed?",
    a: "Our tees are printed on demand in the USA using direct-to-garment (DTG) technology. DTG bonds ink directly into the fabric fibers for prints that are soft to the touch, vibrant in color, and built to outlast the shirt.",
  },
]

export function ProductFAQ() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-extrabold tracking-tight mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
