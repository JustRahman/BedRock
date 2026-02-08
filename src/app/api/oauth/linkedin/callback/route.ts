import { NextRequest, NextResponse } from 'next/server'
import { verifyStateToken, cacheSet, generateSessionId, getAppUrl } from '@/lib/oauth/utils'
import { exchangeLinkedInCode, fetchLinkedInProfile } from '@/lib/oauth/linkedin'

export async function GET(request: NextRequest) {
  const appUrl = getAppUrl()

  try {
    const { searchParams } = request.nextUrl
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(
        `${appUrl}/onboarding/oauth-success?provider=linkedin&error=${encodeURIComponent(error)}`
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${appUrl}/onboarding/oauth-success?provider=linkedin&error=${encodeURIComponent('Missing code or state')}`
      )
    }

    const stateResult = await verifyStateToken(state)
    if (!stateResult) {
      return NextResponse.redirect(
        `${appUrl}/onboarding/oauth-success?provider=linkedin&error=${encodeURIComponent('Invalid or expired state token')}`
      )
    }

    const accessToken = await exchangeLinkedInCode(code)
    const profile = await fetchLinkedInProfile(accessToken)

    const sessionId = generateSessionId()
    cacheSet(sessionId, profile)

    return NextResponse.redirect(
      `${appUrl}/onboarding/oauth-success?provider=linkedin&session=${sessionId}`
    )
  } catch (error) {
    console.error('LinkedIn callback error:', error)
    return NextResponse.redirect(
      `${appUrl}/onboarding/oauth-success?provider=linkedin&error=${encodeURIComponent('Failed to connect LinkedIn')}`
    )
  }
}
