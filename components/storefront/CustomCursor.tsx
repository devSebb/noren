"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 50, mass: 0.3 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 50, mass: 0.3 })

  const [isHovering, setIsHovering] = useState(false)
  const [isText, setIsText] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as Element
      const textEl = target.closest("[data-cursor='text']")
      const growEl =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='grow']")

      if (textEl) {
        setIsText(true)
        setIsHovering(true)
      } else if (growEl) {
        setIsText(false)
        setIsHovering(true)
      } else {
        setIsText(false)
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [cursorX, cursorY, isVisible])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{ x: springX, y: springY }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          width: isHovering ? 44 : 12,
          height: isHovering ? 44 : 12,
          backgroundColor: isHovering ? "rgba(0,0,0,0)" : "#cc4444",
          borderWidth: isHovering ? 1.5 : 0,
          borderColor: "#cc4444",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          borderStyle: "solid",
        }}
        className="flex items-center justify-center"
      >
        {isText && (
          <span
            className="text-[7px] font-bold tracking-wider text-primary leading-none"
            style={{ letterSpacing: "0.05em" }}
          >
            VIEW
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
