/**
 * Simple in-memory rate limiter.
 *
 * NOTE: This only works for single-process deployments (local dev, single Vercel instance).
 * For production multi-region deployments, replace with an Upstash Redis-backed solution:
 * https://github.com/upstash/ratelimit
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

/** Clean up expired entries periodically to avoid memory leaks */
setInterval(
  () => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key)
    }
  },
  60_000 // every minute
)

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number
  /** Window size in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Check if a given key (e.g. IP address) has exceeded the rate limit.
 * Returns `success: false` if the limit is exceeded.
 */
export function checkRateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const windowMs = opts.windowSeconds * 1000
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    // New window
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { success: true, remaining: opts.limit - 1, resetAt }
  }

  if (entry.count >= opts.limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { success: true, remaining: opts.limit - entry.count, resetAt: entry.resetAt }
}

/** Extract the client IP from a Next.js request. */
export function getClientIp(req: Request): string {
  const headers = req instanceof Request ? new Headers((req as Request).headers) : req
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return "unknown"
}
