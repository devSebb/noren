"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Instagram, Twitter, Youtube } from "lucide-react"
import { MagneticButton } from "@/components/ui/MagneticButton"

const shopLinks = [
  { label: "All Designs", href: "/products" },
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Best Sellers", href: "/products?sort=popular" },
  { label: "Sale", href: "/products?filter=sale" },
]

const helpLinks = [
  { label: "Size Guide", href: "/faq#sizing" },
  { label: "Shipping Info", href: "/policies/shipping" },
  { label: "Returns", href: "/policies/returns" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
]

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Twitter / X", href: "#", icon: Twitter },
  { label: "YouTube", href: "#", icon: Youtube },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Service", href: "/policies/terms" },
]

function FooterLinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground/60 uppercase mb-5">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              data-cursor="grow"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid #cc4444",
        boxShadow: "0 -1px 0 #cc4444, 0 -4px 60px rgba(204,68,68,0.07)",
      }}
    >
      {/* 暖簾 watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-jp text-foreground leading-none"
          style={{
            fontSize: "clamp(10rem, 35vw, 30rem)",
            opacity: 0.018,
          }}
        >
          暖簾
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-20 pb-10">

        {/* Giant NOREN + CTA */}
        <div ref={ref} className="mb-16">
          {/* NOREN big type */}
          <div className="flex items-baseline gap-5 mb-6 flex-wrap">
            <motion.span
              className="font-display font-extrabold tracking-tight leading-none"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              NOREN
            </motion.span>
            <motion.span
              className="font-jp text-accent leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              暖簾
            </motion.span>
          </div>

          {/* Tagline + CTA row */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <motion.p
              className="text-muted-foreground text-sm leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Premium garment-dyed t-shirts featuring hand-illustrated Japanese art. Where mythology, food culture, and streetwear collide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <Link
                  href="/products"
                  data-cursor="grow"
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold tracking-widest rounded-xl transition-colors duration-200"
                >
                  SHOP NOW
                  <span className="text-base">↗</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/20 mb-14" />

        {/* Link columns + social */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <FooterLinkGroup title="Shop" links={shopLinks} />
          <FooterLinkGroup title="Help" links={helpLinks} />

          {/* Social */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground/60 uppercase mb-5">
              Follow
            </p>
            <ul className="space-y-3">
              {socialLinks.map((s) => {
                const Icon = s.icon
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      data-cursor="grow"
                      className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                    >
                      <Icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                      {s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground/60 uppercase mb-5">
              Legal
            </p>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    data-cursor="grow"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-border/20 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono text-muted-foreground/50 tracking-wider">
            © 2026 NOREN. All rights reserved.
          </p>
          <p className="text-[11px] font-mono text-muted-foreground/50 tracking-wider">
            Made with 🍜 in the USA · Hand-drawn art, never AI
          </p>
        </div>
      </div>
    </footer>
  )
}
