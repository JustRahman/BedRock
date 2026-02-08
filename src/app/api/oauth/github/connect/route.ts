import { NextResponse } from 'next/server'
import { generateStateToken, setStateCookie } from '@/lib/oauth/utils'
import { getGitHubAuthUrl } from '@/lib/oauth/github'

export async function GET() {
  try {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      return NextResponse.json({ error: 'GitHub OAuth not configured' }, { status: 503 })
    }

    const state = generateStateToken('github', 3)
    await setStateCookie(state)
    const url = getGitHubAuthUrl(state)

    return NextResponse.redirect(url)
  } catch (error) {
    console.error('GitHub connect error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/onboarding/oauth-success?provider=github&error=${encodeURIComponent('Failed to initiate GitHub OAuth')}`
    )
  }
}
