"use client"

import { useState, useEffect } from "react"
import { announcements } from "@/lib/data/products"

export function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-primary text-primary-foreground py-2.5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium h-5 relative">
        {announcements.map((text, i) => (
          <span
            key={i}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
