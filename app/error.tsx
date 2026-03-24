"use client"

import { useEffect } from "react"

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[Global Error]", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl">⚠️</div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-3">Something went wrong</h1>
          <p className="text-muted-foreground leading-relaxed">
            An unexpected error occurred. Our team has been notified. Please try again or come back
            later.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-border hover:bg-secondary text-foreground font-semibold rounded-xl transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
