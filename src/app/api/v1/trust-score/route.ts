import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import type { GitHubProfileData } from '@/lib/oauth/github'
import { fetchStripeData } from '@/lib/oauth/stripe'
import { fetchLinkedInProfile } from '@/lib/oauth/linkedin'
import { calculateTrustScoreV2, TrustScoreV2Input } from '@/lib/trust-score-v2'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

async function fetchGitHubPublic(username: string): Promise<GitHubProfileData> {
  const octokit = new Octokit()

  const { data: user } = await octokit.users.getByUsername({ username })

  const { data: repos } = await octokit.repos.listForUser({
    username,
    sort: 'pushed',
    per_page: 100,
  })

  const langCounts: Record<string, number> = {}
  let totalStars = 0

  for (const repo of repos) {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
    }
    totalStars += repo.stargazers_count ?? 0
  }

  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)

  const createdAt = user.created_at
  const accountAgeYears = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  )

  return {
    login: user.login,
    name: user.name ?? null,
    avatarUrl: user.avatar_url,
    createdAt,
    accountAgeYears,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    topLanguages,
  }
}

export async function POST(request: NextRequest) {
  // Rate limit
  const ip = getClientIp(request)
  const { allowed } = checkRateLimit(`v1-trust:${ip}`, 10, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 10 requests per minute.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-BedRock-Notice': 'MVP endpoint. Production will use redirect-based OAuth flow.',
        },
      }
    )
  }

  try {
    const body = await request.json()
    const { github_username, github_token, stripe_account_id, linkedin_token } = body

    if (!github_username && !github_token && !stripe_account_id && !linkedin_token) {
      return NextResponse.json(
        { error: 'Provide at least one of: github_username, github_token, stripe_account_id, linkedin_token' },
        { status: 400 }
      )
    }

    const input: TrustScoreV2Input = {}

    // GitHub: either token (OAuth) or username (public lookup)
    if (github_token) {
      const { fetchGitHubProfile } = await import('@/lib/oauth/github')
      input.github = await fetchGitHubProfile(github_token)
      input.githubUsernameOnly = false
    } else if (github_username) {
      input.github = await fetchGitHubPublic(github_username)
      input.githubUsernameOnly = true
    }

    // Stripe
    if (stripe_account_id) {
      input.stripe = await fetchStripeData(stripe_account_id)
    }

    // LinkedIn
    if (linkedin_token) {
      input.linkedin = await fetchLinkedInProfile(linkedin_token)
    }

    const result = calculateTrustScoreV2(input)

    return NextResponse.json(result, {
      headers: {
        'X-BedRock-Notice': 'MVP endpoint. Production will use redirect-based OAuth flow.',
      },
    })
  } catch (err) {
    // Handle GitHub 404
    if (err instanceof Error && 'status' in err && (err as { status: number }).status === 404) {
      return NextResponse.json(
        { error: 'GitHub user not found' },
        { status: 404 }
      )
    }

    console.error('Trust score API error:', err)
    return NextResponse.json(
      { error: 'Failed to calculate trust score' },
      { status: 500 }
    )
  }
}
