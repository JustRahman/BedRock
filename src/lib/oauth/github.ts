import { Octokit } from '@octokit/rest'
import { getAppUrl } from './utils'

export interface GitHubProfileData {
  login: string
  name: string | null
  avatarUrl: string
  createdAt: string
  accountAgeYears: number
  publicRepos: number
  followers: number
  totalStars: number
  topLanguages: string[]
}

export function getGitHubAuthUrl(state: string): string {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) throw new Error('GITHUB_CLIENT_ID is not set')

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'read:user',
    state,
    redirect_uri: `${getAppUrl()}/api/oauth/github/callback`,
  })

  return `https://github.com/login/oauth/authorize?${params.toString()}`
}

export async function exchangeGitHubCode(code: string): Promise<string> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  const data = await response.json()
  if (data.error) {
    throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`)
  }

  return data.access_token
}

export async function fetchGitHubProfile(token: string): Promise<GitHubProfileData> {
  const octokit = new Octokit({ auth: token })

  const { data: user } = await octokit.users.getAuthenticated()

  const { data: repos } = await octokit.repos.listForAuthenticatedUser({
    sort: 'pushed',
    per_page: 100,
  })

  // Aggregate languages
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
    name: user.name,
    avatarUrl: user.avatar_url,
    createdAt,
    accountAgeYears,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    topLanguages,
  }
}
