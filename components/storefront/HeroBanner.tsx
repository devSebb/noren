"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { formatPrice } from "@/lib/utils/format"
import type { StoreProduct } from "@/lib/data/products-db"

interface Props {
  products: StoreProduct[]
}

// Small SVG sakura petal
function SakuraPetal({
  top,
  left,
  size,
  delay,
  duration,
}: {
  top: string
  left: string
  size: number
  delay: number
  duration: number
}) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        top,
        left,
        animation: `sakura-fall ${duration}s ease-in ${delay}s infinite`,
        opacity: 0,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx="10"
            cy="4"
            rx="3"
            ry="5"
            fill="rgba(255,180,200,0.55)"
            transform={`rotate(${i * 72} 10 10)`}
          />
        ))}
        <circle cx="10" cy="10" r="2" fill="rgba(240,180,41,0.7)" />
      </svg>
    </div>
  )
}

const PETALS = [
  { top: "12%", left: "68%", size: 14, delay: 0, duration: 9 },
  { top: "8%", left: "80%", size: 10, delay: 2.5, duration: 12 },
  { top: "35%", left: "74%", size: 12, delay: 5, duration: 8 },
  { top: "55%", left: "85%", size: 8, delay: 1.5, duration: 14 },
  { top: "20%", left: "91%", size: 16, delay: 7, duration: 10 },
  { top: "70%", left: "71%", size: 11, delay: 3.5, duration: 11 },
]

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function HeroBanner({ products }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imageX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const imageY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  // Cycle products
  useEffect(() => {
    if (products.length <= 1) return
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % products.length)
    }, 3800)
    return () => clearInterval(id)
  }, [products.length])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 28)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 28)
  }

  const currentProduct = products[currentIndex] ?? products[0]

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(204,68,68,0.055)_0%,transparent_65%)] pointer-events-none" />

      {/* Main content area */}
      <div className="flex-1 flex items-center min-h-0">
        <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-0 h-full">

          {/* ─── LEFT: Typography ───────────────────────── */}
          <div className="flex flex-col justify-center py-12 z-10">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="text-accent text-sm">★</span>
              <span className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase">
                4.9 · 12K+ Happy Customers
              </span>
            </motion.div>

            {/* Hero words — clip-path reveal */}
            <div className="mb-8">
              {(["WEAR", "THE", "CULTURE."] as const).map((word, i) => (
                <div key={word} className="overflow-hidden leading-none">
                  <motion.div
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.95,
                      delay: 0.22 + i * 0.18,
                      ease: EASE_OUT_EXPO,
                    }}
                    className={`font-display font-extrabold tracking-tight leading-[0.86] ${
                      word === "CULTURE."
                        ? "gradient-text"
                        : "text-foreground"
                    }`}
                    style={{
                      fontSize: "clamp(4rem, 11.5vw, 12.5rem)",
                    }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mb-9"
            >
              Art-forward Japanese tees.{" "}
              <span className="text-foreground/80">Hand-drawn. Obsessed.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
              className="flex items-center gap-4 flex-wrap"
            >
              <MagneticButton>
                <Link
                  href="/#shop"
                  data-cursor="grow"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-bold text-sm tracking-wider rounded-xl glow-red transition-all duration-300 hover:bg-primary/90"
                >
                  SHOP NOW
                  <span className="text-base">↗</span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/about"
                  data-cursor="grow"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-foreground/80 font-semibold text-sm tracking-wider rounded-xl transition-all duration-300 hover:border-foreground/40 hover:text-foreground"
                >
                  OUR STORY
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* ─── RIGHT: Product imagery ──────────────────── */}
          <div className="relative hidden lg:flex items-center justify-center">

            {/* 暖簾 watermark */}
            <span
              className="absolute font-jp select-none pointer-events-none text-foreground"
              style={{
                fontSize: "clamp(10rem, 18vw, 22rem)",
                opacity: 0.025,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                lineHeight: 1,
              }}
            >
              暖簾
            </span>

            {/* Vertical cultural text */}
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 font-jp text-accent/50 select-none pointer-events-none"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
                fontSize: "1.4rem",
                letterSpacing: "0.6em",
              }}
            >
              文化
            </div>

            {/* Sakura petals */}
            {PETALS.map((petal, i) => (
              <SakuraPetal key={i} {...petal} />
            ))}

            {/* Product image card */}
            {currentProduct && (
              <motion.div
                style={{ x: imageX, y: imageY }}
                className="relative w-[340px] xl:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/60"
              >
                <AnimatePresence mode="sync">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="400px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Product label overlay */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`label-${currentIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent pt-12 pb-5 px-5"
                  >
                    <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-0.5">
                      {currentProduct.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground">
                        {currentProduct.title}
                      </p>
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(currentProduct.price)} →
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Product counter dots */}
                <div className="absolute top-4 right-4 flex gap-1.5">
                  {products.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      data-cursor="grow"
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-foreground scale-125"
                          : "bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Stats strip ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.15 }}
        className="border-t border-border/40 shrink-0"
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-4 text-[11px] font-mono tracking-[0.15em] text-muted-foreground uppercase flex-wrap">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            12K+ Customers
          </span>
          <span className="hidden sm:block">·</span>
          <span>4.9★ Rated</span>
          <span className="hidden sm:block">·</span>
          <span>Free Ship $75+</span>
          <span className="hidden sm:block">·</span>
          <span>7 Unique Designs</span>
          <span className="hidden md:flex items-center gap-2 ml-auto">
            <span className="h-7 w-px bg-foreground/20" />
            <span>Scroll</span>
          </span>
        </div>
      </motion.div>
    </section>
  )
}
