"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { motion } from "framer-motion"

const KATAKANA = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

function useScrambleText(original: string) {
  const [text, setText] = useState(original)

  const scramble = useCallback(() => {
    let iteration = 0
    const chars = original.split("")
    const id = setInterval(() => {
      setText(
        chars
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration) return original[i]
            return KATAKANA[Math.floor(Math.random() * KATAKANA.length)]
          })
          .join("")
      )
      iteration += 0.7
      if (iteration >= original.length) {
        clearInterval(id)
        setText(original)
      }
    }, 38)
  }, [original])

  return { text, scramble }
}

function NavLink({
  href,
  label,
  index,
}: {
  href: string
  label: string
  index: number
}) {
  const { text, scramble } = useScrambleText(label)

  return (
    <Link
      href={href}
      className="group flex flex-col items-start gap-0.5 hover:text-foreground transition-colors"
      onMouseEnter={scramble}
      data-cursor="grow"
    >
      <span className="text-[9px] font-mono text-muted-foreground/50 leading-none">
        {String(index).padStart(2, "0")}
      </span>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-none">
        {text}
      </span>
    </Link>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { count, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-2xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-2.5 group" data-cursor="grow">
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            NOREN
          </span>
          <span
            className="font-jp text-lg text-accent/80 group-hover:text-accent transition-colors"
            style={{ lineHeight: 1 }}
          >
            暖簾
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-end gap-8">
          <NavLink href="/#shop" label="Shop" index={1} />
          <NavLink href="/about" label="About" index={2} />
          <NavLink href="/faq" label="FAQ" index={3} />
          <NavLink href="/contact" label="Contact" index={4} />
        </div>

        {/* Cart Button */}
        <motion.button
          onClick={openCart}
          data-cursor="grow"
          className="relative p-2 hover:bg-card rounded-xl transition-colors"
          aria-label={`Open cart, ${count} items`}
          whileTap={{ scale: 0.92 }}
        >
          <ShoppingBag className="w-5 h-5" />
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center"
              style={{ width: 18, height: 18 }}
            >
              {count}
            </motion.span>
          )}
        </motion.button>
      </div>
    </nav>
  )
}
