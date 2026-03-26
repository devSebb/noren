"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { Star } from "lucide-react"
import { reviews } from "@/lib/data/reviews"

// Extend reviews with product label
const extendedReviews = [
  { stars: 5, quote: "The quality is insane. Softest tee I own and the print is chef's kiss.", name: "Mike T.", product: "Ramen Connoisseur", verified: true },
  { stars: 5, quote: "Ordered the Kaiju tee for my boyfriend. He hasn't taken it off in 3 days.", name: "Sarah K.", product: "City-Sized Hunger", verified: true },
  { stars: 5, quote: "Finally, a brand that gets Japanese culture without being cringe. 10/10.", name: "James L.", product: "Warrior's Feast", verified: true },
  { stars: 5, quote: "The guinea pig design made my entire ramen-loving heart happy.", name: "Emily R.", product: "Ramen Connoisseur", verified: true },
  { stars: 5, quote: "Shipped fast and the colors are so vivid. Already ordered two more.", name: "David K.", product: "Hokusai's Ramen", verified: true },
  { stars: 5, quote: "The art detail is incredible. People stop me on the street to ask about it.", name: "Priya M.", product: "Black Cat Ramen", verified: true },
]

function ReviewCard({
  review,
  index,
}: {
  review: (typeof extendedReviews)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col bg-card border border-border/60 rounded-2xl p-6 relative overflow-hidden group hover:border-border transition-colors duration-300 shrink-0"
      style={{ width: "clamp(280px, 30vw, 340px)" }}
    >
      {/* Big quote mark */}
      <span
        className="absolute -top-2 -left-1 font-display font-extrabold text-primary/15 leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(5rem, 8vw, 7rem)" }}
        aria-hidden
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4 relative z-10">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-foreground/90 mb-5 relative z-10 flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-semibold leading-none mb-1">{review.name}</p>
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
            {review.product}
          </p>
        </div>
        {review.verified && (
          <span className="text-[9px] font-mono bg-primary/10 text-primary px-2 py-1 rounded-full tracking-wider uppercase">
            Verified
          </span>
        )}
      </div>
    </motion.div>
  )
}

export function ReviewsSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const scrollStartX = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    dragStartX.current = e.clientX
    scrollStartX.current = trackRef.current.scrollLeft
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    const dx = e.clientX - dragStartX.current
    trackRef.current.scrollLeft = scrollStartX.current - dx
  }, [isDragging])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <motion.p
              className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase mb-2"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              04 — Reviews
            </motion.p>
            <motion.h2
              className="font-display font-extrabold tracking-tight leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              The People{" "}
              <span className="gradient-text">Have Spoken.</span>
            </motion.h2>
          </div>

          {/* Rating summary */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <div>
              <span className="font-display font-bold text-2xl leading-none">4.9</span>
              <p className="text-[11px] text-muted-foreground font-mono tracking-wider">2,400+ REVIEWS</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Drag-to-scroll carousel — bleeds to edges */}
      <div
        ref={trackRef}
        className={`flex gap-4 overflow-x-auto scrollbar-hide pl-4 md:pl-[max(1rem,calc((100vw-1400px)/2+1rem))] pr-8 pb-2 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        style={{ userSelect: "none", WebkitOverflowScrolling: "touch" }}
      >
        {extendedReviews.map((review, i) => (
          <ReviewCard key={i} review={review} index={i} />
        ))}
      </div>

      {/* Drag hint */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <p className="text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase">
          ← Drag to scroll →
        </p>
      </div>
    </section>
  )
}
