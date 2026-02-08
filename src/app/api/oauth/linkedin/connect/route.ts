import { NextResponse } from 'next/server'
import { generateStateToken, setStateCookie } from '@/lib/oauth/utils'
import { getLinkedInAuthUrl } from '@/lib/oauth/linkedin'

export async function GET() {
  try {
    if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
      return NextResponse.json({ error: 'LinkedIn OAuth not configured' }, { status: 503 })
    }

    const state = generateStateToken('linkedin', 4)
    await setStateCookie(state)
    const url = getLinkedInAuthUrl(state)

    return NextResponse.redirect(url)
  } catch (error) {
    console.error('LinkedIn connect error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/onboarding/oauth-success?provider=linkedin&error=${encodeURIComponent('Failed to initiate LinkedIn OAuth')}`
    )
  }
}
