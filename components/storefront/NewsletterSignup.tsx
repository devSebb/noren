"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ArrowRight } from "lucide-react"

// Tiny floating sakura petal SVG
function Petal({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      aria-hidden
    >
      <ellipse cx="7" cy="4" rx="3" ry="5" fill="rgba(204,68,68,0.18)" transform="rotate(0 7 7)" />
      <ellipse cx="7" cy="4" rx="3" ry="5" fill="rgba(240,180,41,0.12)" transform="rotate(72 7 7)" />
      <ellipse cx="7" cy="4" rx="3" ry="5" fill="rgba(204,68,68,0.12)" transform="rotate(144 7 7)" />
      <ellipse cx="7" cy="4" rx="3" ry="5" fill="rgba(240,180,41,0.1)" transform="rotate(216 7 7)" />
      <ellipse cx="7" cy="4" rx="3" ry="5" fill="rgba(204,68,68,0.14)" transform="rotate(288 7 7)" />
    </svg>
  )
}

const petals = [
  { top: "12%", left: "8%", animationDelay: "0s", animationDuration: "7s", fontSize: "18px" },
  { top: "20%", right: "10%", animationDelay: "1.2s", animationDuration: "9s" },
  { top: "60%", left: "5%", animationDelay: "2.5s", animationDuration: "8s" },
  { top: "35%", right: "6%", animationDelay: "0.7s", animationDuration: "10s" },
  { top: "75%", left: "15%", animationDelay: "3.1s", animationDuration: "7.5s" },
  { top: "50%", right: "15%", animationDelay: "1.8s", animationDuration: "9.5s" },
  { top: "85%", right: "25%", animationDelay: "0.3s", animationDuration: "8.5s" },
  { top: "8%", left: "35%", animationDelay: "2s", animationDuration: "11s" },
]

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      })
      if (res.ok) {
        toast.success("You're in! Check your inbox for 25% off.", { icon: "🍜" })
        setEmail("")
        setSubmitted(true)
      } else {
        const data = await res.json()
        toast.error(data.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="relative py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0808 0%, #0f0f0f 45%, #080f1a 100%)" }}
    >
      {/* Floating sakura petals */}
      {petals.map((p, i) => (
        <Petal
          key={i}
          style={{
            top: p.top,
            left: "left" in p ? (p as any).left : undefined,
            right: "right" in p ? (p as any).right : undefined,
            animation: `sakura-fall ${p.animationDuration} ${p.animationDelay} ease-in-out infinite`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Big red radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(204,68,68,0.08) 0%, transparent 65%)" }}
      />

      {/* Japanese watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-jp text-foreground/[0.015] leading-none"
          style={{ fontSize: "clamp(8rem, 25vw, 22rem)" }}
        >
          仲間
        </span>
      </div>

      <div ref={ref} className="max-w-2xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          05 — Join The Crew
        </motion.p>

        {/* Emoji with hover spin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-6 text-6xl cursor-default select-none"
          whileHover={{ rotate: 360, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          🍜
        </motion.div>

        {/* Headline — two lines */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            className="font-display font-extrabold tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            JOIN THE
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h2
            className="font-display font-extrabold tracking-tight leading-[0.9] gradient-text"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            NOODLE CREW.
          </motion.h2>
        </div>

        <motion.p
          className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          First access to new drops, exclusive colorways, and{" "}
          <span className="text-foreground font-semibold">25% off your first order.</span>
        </motion.p>

        {/* Form */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <p className="text-2xl font-display font-bold mb-1">You&apos;re in! 🎉</p>
              <p className="text-muted-foreground text-sm">Check your inbox for your 25% off code.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch gap-0 max-w-lg mx-auto"
            >
              {/* Underline-style input */}
              <div className="flex-1 relative group">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-border/50 focus:border-primary outline-none py-4 px-2 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors duration-200"
                  style={{ caretColor: "var(--primary)" }}
                />
              </div>

              {/* Submit */}
              <MagneticButton strength={0.2}>
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="grow"
                  className="flex items-center gap-2 px-7 py-4 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground text-sm font-bold tracking-widest transition-colors whitespace-nowrap sm:rounded-none rounded-xl sm:rounded-r-xl"
                >
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <>
                      GET 25% OFF
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </MagneticButton>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Fine print */}
        <motion.p
          className="text-[10px] text-muted-foreground/40 font-mono mt-5 tracking-wider"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          No spam. Unsubscribe anytime. We hate inbox noise too.
        </motion.p>
      </div>
    </section>
  )
}
