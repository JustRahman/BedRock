import { NextRequest, NextResponse } from 'next/server'
import { verifyStateToken, cacheSet, generateSessionId, getAppUrl } from '@/lib/oauth/utils'
import { exchangeStripeCode, fetchStripeData } from '@/lib/oauth/stripe'

export async function GET(request: NextRequest) {
  const appUrl = getAppUrl()

  try {
    const { searchParams } = request.nextUrl
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(
        `${appUrl}/onboarding/oauth-success?provider=stripe&error=${encodeURIComponent(error)}`
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${appUrl}/onboarding/oauth-success?provider=stripe&error=${encodeURIComponent('Missing code or state')}`
      )
    }

    const stateResult = await verifyStateToken(state)
    if (!stateResult) {
      return NextResponse.redirect(
        `${appUrl}/onboarding/oauth-success?provider=stripe&error=${encodeURIComponent('Invalid or expired state token')}`
      )
    }

    const stripeUserId = await exchangeStripeCode(code)
    const stripeData = await fetchStripeData(stripeUserId)

    const sessionId = generateSessionId()
    cacheSet(sessionId, stripeData)

    return NextResponse.redirect(
      `${appUrl}/onboarding/oauth-success?provider=stripe&session=${sessionId}`
    )
  } catch (error) {
    console.error('Stripe callback error:', error)
    return NextResponse.redirect(
      `${appUrl}/onboarding/oauth-success?provider=stripe&error=${encodeURIComponent('Failed to connect Stripe')}`
    )
  }
}
