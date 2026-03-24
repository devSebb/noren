import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ — NOREN 暖簾",
  description: "Frequently asked questions about NOREN — sizing, shipping, returns, and more.",
}

const faqs = [
  {
    question: "What sizes do you carry?",
    answer: "We carry S, M, L, XL, and 2XL. Our tees run true to size — if you&apos;re between sizes, we recommend going up for a more relaxed fit. Check our size guide for exact measurements.",
  },
  {
    question: "How long does shipping take?",
    answer: "Orders typically ship within 2-3 business days after payment. Once shipped, standard delivery takes 5-10 business days within the USA. You&apos;ll receive a tracking number via email when your order ships.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! Orders over $75 qualify for free standard shipping within the USA.",
  },
  {
    question: "What&apos;s your return policy?",
    answer: "We offer 30-day hassle-free returns. If you&apos;re not happy with your purchase for any reason, contact us and we&apos;ll sort it out — exchange, store credit, or refund, your choice.",
  },
  {
    question: "How do I wash my NOREN tee?",
    answer: "Machine wash cold, inside out, with like colors. Tumble dry low or hang dry. Do not iron directly on the print. The garment-dyed fabric gets softer and more beautiful with every wash.",
  },
  {
    question: "Are the tees true to the photos?",
    answer: "Yes — our product photos show the actual design on the actual garment color. The garment-dyed process means each tee has subtle natural variations in shade, which is part of the beauty.",
  },
  {
    question: "Can I use a discount code?",
    answer: "Absolutely! Enter your code in the cart or at checkout. First-time customers can use code SLURP25 for 25% off. You can also join our newsletter to get an exclusive welcome code.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently we ship to the USA, Canada, UK, Australia, and New Zealand. International shipping is calculated at checkout. We&apos;re working on expanding to more countries — stay tuned.",
  },
]

export default function FAQPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">FAQ</h1>
          <p className="text-muted-foreground">
            Everything you need to know. Can&apos;t find your answer?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-2xl px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
