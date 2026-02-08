import { getAppUrl } from './utils'

export interface LinkedInProfileData {
  name: string
  email: string
  picture: string | null
  sub: string
  verified: boolean
}

export function getLinkedInAuthUrl(state: string): string {
  const clientId = process.env.LINKEDIN_CLIENT_ID
  if (!clientId) throw new Error('LINKEDIN_CLIENT_ID is not set')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: 'openid profile email',
    state,
    redirect_uri: `${getAppUrl()}/api/oauth/linkedin/callback`,
  })

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
}

export async function exchangeLinkedInCode(code: string): Promise<string> {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    redirect_uri: `${getAppUrl()}/api/oauth/linkedin/callback`,
  })

  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const data = await response.json()
  if (data.error) {
    throw new Error(`LinkedIn OAuth error: ${data.error_description || data.error}`)
  }

  return data.access_token
}

export async function fetchLinkedInProfile(token: string): Promise<LinkedInProfileData> {
  const response = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error(`LinkedIn API error: ${response.status}`)
  }

  const data = await response.json()

  return {
    name: data.name || `${data.given_name || ''} ${data.family_name || ''}`.trim(),
    email: data.email || '',
    picture: data.picture || null,
    sub: data.sub,
    verified: true,
  }
}
