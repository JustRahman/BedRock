import { NextResponse } from 'next/server'
import {
  verifyDomain,
  verifyTwitter,
  verifyInstagram,
  verifyAppStore,
} from '@/lib/digital-presence-verification'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { allowed } = checkRateLimit(`verify-dp:${ip}`, 20, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const { type, value, founderName } = await request.json()

    if (!type || !value || typeof value !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing type or value' },
        { status: 400 }
      )
    }

    switch (type) {
      case 'domain': {
        const data = await verifyDomain(value, founderName)
        return NextResponse.json({ success: data.isLive && !data.error, data })
      }
      case 'twitter': {
        const data = verifyTwitter(value)
        return NextResponse.json({ success: data.valid, data })
      }
      case 'instagram': {
        const data = verifyInstagram(value)
        return NextResponse.json({ success: data.valid, data })
      }
      case 'appstore': {
        const data = await verifyAppStore(value)
        return NextResponse.json({ success: !data.error, data })
      }
      default:
        return NextResponse.json(
          { success: false, error: `Unknown verification type: ${type}` },
          { status: 400 }
        )
    }
  } catch {
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    )
  }
}
