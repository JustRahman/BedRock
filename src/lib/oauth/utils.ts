import { createHmac, randomBytes } from 'crypto'
import { cookies } from 'next/headers'

const STATE_COOKIE_NAME = 'oauth_state'
const STATE_EXPIRY_MS = 15 * 60 * 1000 // 15 minutes

function getSecret(): string {
  const secret = process.env.OAUTH_STATE_SECRET
  if (!secret) throw new Error('OAUTH_STATE_SECRET is not set')
  return secret
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex')
}

export function generateStateToken(provider: string, returnStep: number): string {
  const nonce = randomBytes(16).toString('hex')
  const timestamp = Date.now().toString()
  const payload = `${provider}:${returnStep}:${timestamp}:${nonce}`
  const signature = sign(payload)
  return `${payload}:${signature}`
}

export async function setStateCookie(state: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(STATE_COOKIE_NAME, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 900, // 15 minutes
    path: '/',
  })
}

export async function verifyStateToken(state: string): Promise<{ provider: string; returnStep: number } | null> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(STATE_COOKIE_NAME)?.value

  if (!cookieValue || cookieValue !== state) return null

  const parts = state.split(':')
  if (parts.length !== 5) return null

  const [provider, returnStep, timestamp, nonce, signature] = parts
  const payload = `${provider}:${returnStep}:${timestamp}:${nonce}`
  const expectedSignature = sign(payload)

  if (signature !== expectedSignature) return null

  const age = Date.now() - parseInt(timestamp, 10)
  if (age > STATE_EXPIRY_MS) return null

  // Clear the cookie after verification
  cookieStore.delete(STATE_COOKIE_NAME)

  return { provider, returnStep: parseInt(returnStep, 10) }
}

// Simple in-memory cache with TTL for storing OAuth data between callback and retrieval
const cache = new Map<string, { data: unknown; expiresAt: number }>()

const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes

export function cacheSet(key: string, data: unknown): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS })
}

export function cacheGet(key: string): unknown | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }
  return entry.data
}

export function cacheDelete(key: string): void {
  cache.delete(key)
}

export function generateSessionId(): string {
  return randomBytes(32).toString('hex')
}

export function getAppUrl(): string {
  // APP_URL is a runtime env var (read from .env.production by Docker at start)
  // NEXT_PUBLIC_APP_URL is baked at build time — wrong when building locally
  return process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}
