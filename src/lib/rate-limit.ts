const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60_000)

export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count, resetIn: entry.resetAt - now }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIp || 'unknown'
}
