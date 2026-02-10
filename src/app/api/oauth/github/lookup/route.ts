import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import type { GitHubProfileData } from '@/lib/oauth/github'

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    // Public API — no auth token needed (60 req/hr rate limit)
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

    const profile: GitHubProfileData = {
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

    return NextResponse.json(profile)
  } catch (err) {
    if (err instanceof Error && 'status' in err && (err as { status: number }).status === 404) {
      return NextResponse.json({ error: 'GitHub user not found' }, { status: 404 })
    }
    console.error('GitHub lookup error:', err)
    return NextResponse.json({ error: 'Failed to fetch GitHub profile' }, { status: 500 })
  }
}
