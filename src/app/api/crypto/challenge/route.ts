import { NextResponse } from 'next/server'
import { createSignedChallenge } from '@/lib/crypto/challenge-cache'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const { allowed, resetIn } = checkRateLimit(`crypto-challenge:${ip}`, 20, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(resetIn / 1000)) } }
    )
  }

  try {
    const { address } = await request.json()
    if (!address || typeof address !== 'string') {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    const message = createSignedChallenge(address)

    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({ error: 'Failed to generate challenge' }, { status: 500 })
  }
}
