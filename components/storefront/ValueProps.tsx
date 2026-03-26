"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shirt, Sparkles, Package, RotateCcw } from "lucide-react"

const props = [
  {
    num: "01",
    icon: Shirt,
    title: "Heavyweight Cotton",
    description: "100% ring-spun, garment-dyed 6.5oz Comfort Colors 1717. The gold standard of blank tees — built to last, soft from day one.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Hand-Illustrated Art",
    description: "Every design starts as a hand-drawn illustration. No AI slop. No stock vectors. Original art, full stop.",
  },
  {
    num: "03",
    icon: Package,
    title: "Fast Shipping",
    description: "Ships in 2–4 business days. Standard delivery 5–7 days US. Free on orders over $75.",
  },
  {
    num: "04",
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. Exchange or full refund. No questions asked, no hoops to jump through.",
  },
]

function PropRow({
  item,
  index,
  isLast,
}: {
  item: (typeof props)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const Icon = item.icon

  return (
    <div ref={ref} className={`relative ${!isLast ? "border-b border-border/30" : ""}`}>
      {/* Wipe reveal overlay */}
      <motion.div
        className="absolute inset-0 bg-[#0c0c0c] origin-left pointer-events-none z-10"
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
        {/* Big number */}
        <div className="md:w-32 shrink-0">
          <span
            className="font-display font-extrabold text-border/40 leading-none select-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {item.num}
          </span>
        </div>

        {/* Icon */}
        <div className="md:w-16 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="md:w-64 shrink-0 md:pr-8">
          <h3
            className="font-display font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
          >
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export function ValueProps() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })

  return (
    <section className="py-24 px-4 bg-[#0c0c0c] relative overflow-hidden">
      {/* Faint red radial glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(204,68,68,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-4 flex-wrap gap-4">
          <div>
            <motion.p
              className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase mb-2"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              03 — Why NOREN
            </motion.p>
            <motion.h2
              className="font-display font-extrabold tracking-tight leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Built{" "}
              <span className="gradient-text">Different.</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-muted-foreground text-sm max-w-xs leading-relaxed hidden md:block"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            We obsess over the details most brands skip. Here&apos;s what you&apos;re actually getting.
          </motion.p>
        </div>

        {/* Top divider */}
        <div className="h-px bg-border/30 mb-0" />

        {/* Rows */}
        {props.map((item, i) => (
          <PropRow key={item.num} item={item} index={i} isLast={i === props.length - 1} />
        ))}
      </div>
    </section>
  )
}
