import { NextResponse } from 'next/server'
import { generateStateToken, setStateCookie } from '@/lib/oauth/utils'
import { getStripeConnectUrl } from '@/lib/oauth/stripe'

export async function GET() {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_CONNECT_CLIENT_ID) {
      return NextResponse.json({ error: 'Stripe Connect not configured' }, { status: 503 })
    }

    const state = generateStateToken('stripe', 5)
    await setStateCookie(state)
    const url = getStripeConnectUrl(state)

    return NextResponse.redirect(url)
  } catch (error) {
    console.error('Stripe connect error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/onboarding/oauth-success?provider=stripe&error=${encodeURIComponent('Failed to initiate Stripe Connect')}`
    )
  }
}
