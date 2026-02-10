import { whoisDomain } from 'whoiser'
import * as cheerio from 'cheerio'

// === Types ===

export interface DomainVerificationResult {
  domainAge?: number
  createdDate?: string
  expiryDate?: string
  registrar?: string
  title?: string
  description?: string
  ogImage?: string
  isLive: boolean
  hasSSL: boolean
  nameFound?: boolean
  error?: string
}

export interface TwitterVerificationResult {
  handle: string
  valid: boolean
  profileUrl: string
}

export interface InstagramVerificationResult {
  handle: string
  valid: boolean
  profileUrl: string
}

export interface AppStoreVerificationResult {
  appName?: string
  developer?: string
  rating?: number
  ratingCount?: number
  price?: string
  genre?: string
  releaseDate?: string
  iconUrl?: string
  error?: string
}

export type VerificationResult =
  | { type: 'domain'; data: DomainVerificationResult }
  | { type: 'twitter'; data: TwitterVerificationResult }
  | { type: 'instagram'; data: InstagramVerificationResult }
  | { type: 'appstore'; data: AppStoreVerificationResult }

// === Domain Verification ===

export async function verifyDomain(url: string, founderName?: string): Promise<DomainVerificationResult> {
  let hostname: string
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`)
    hostname = parsed.hostname
  } catch {
    return { isLive: false, hasSSL: false, error: 'Invalid URL format' }
  }

  const result: DomainVerificationResult = { isLive: false, hasSSL: false }

  // WHOIS lookup
  try {
    const whoisData = await whoisDomain(hostname, { follow: 1, timeout: 5000 })
    // whoiser returns an object keyed by registrar server
    const firstKey = Object.keys(whoisData)[0]
    const record = firstKey ? (whoisData as Record<string, Record<string, unknown>>)[firstKey] : null

    if (record) {
      const createdRaw = record['Created Date'] || record['Creation Date'] || record['created'] || record['Registration Date']
      const expiryRaw = record['Expiry Date'] || record['Registry Expiry Date'] || record['expires'] || record['Expiration Date']
      const registrarRaw = record['Registrar'] || record['registrar']

      if (createdRaw) {
        const createdStr = Array.isArray(createdRaw) ? String(createdRaw[0]) : String(createdRaw)
        const createdDate = new Date(createdStr)
        if (!isNaN(createdDate.getTime())) {
          result.createdDate = createdDate.toISOString().split('T')[0]
          const ageMs = Date.now() - createdDate.getTime()
          result.domainAge = Math.round((ageMs / (1000 * 60 * 60 * 24 * 365)) * 10) / 10
        }
      }

      if (expiryRaw) {
        const expiryStr = Array.isArray(expiryRaw) ? String(expiryRaw[0]) : String(expiryRaw)
        const expiryDate = new Date(expiryStr)
        if (!isNaN(expiryDate.getTime())) {
          result.expiryDate = expiryDate.toISOString().split('T')[0]
        }
      }

      if (registrarRaw) {
        result.registrar = Array.isArray(registrarRaw) ? String(registrarRaw[0]) : String(registrarRaw)
      }
    }
  } catch {
    // WHOIS may fail for some TLDs — continue with website fetch
  }

  // Website content fetch
  try {
    const fetchUrl = url.startsWith('http') ? url : `https://${url}`
    result.hasSSL = fetchUrl.startsWith('https://')

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(fetchUrl, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'BedRock-Verifier/1.0',
        'Accept': 'text/html',
      },
    })

    clearTimeout(timeout)

    if (response.ok) {
      result.isLive = true
      result.hasSSL = response.url.startsWith('https://')

      const html = await response.text()
      const $ = cheerio.load(html)

      result.title = $('title').first().text().trim() || undefined
      result.description =
        $('meta[name="description"]').attr('content')?.trim() ||
        $('meta[property="og:description"]').attr('content')?.trim() ||
        undefined
      result.ogImage =
        $('meta[property="og:image"]').attr('content')?.trim() ||
        undefined

      // Check if founder's name appears on the page (body, title, meta tags)
      if (founderName && founderName.trim().length >= 2) {
        const searchText = [
          $('body').text(),
          result.title || '',
          result.description || '',
          $('meta[property="og:title"]').attr('content') || '',
        ].join(' ').toLowerCase()
        const nameLower = founderName.trim().toLowerCase()
        // Check full name and also individual parts (first/last)
        const nameParts = nameLower.split(/\s+/).filter((p) => p.length >= 2)
        result.nameFound = searchText.includes(nameLower) ||
          (nameParts.length >= 2 && nameParts.every((part) => searchText.includes(part)))
      }
    }
  } catch {
    // Site unreachable — isLive stays false
  }

  if (!result.isLive && !result.createdDate) {
    result.error = 'Could not verify domain — site unreachable and WHOIS lookup failed'
  }

  return result
}

// === Twitter/X Verification ===

export function verifyTwitter(handle: string): TwitterVerificationResult {
  // Normalize: strip @ and URL prefixes
  let normalized = handle.trim()
  normalized = normalized.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '')
  normalized = normalized.replace(/^@/, '')
  normalized = normalized.split('/')[0] // remove trailing paths
  normalized = normalized.split('?')[0] // remove query params

  const valid = /^[a-zA-Z0-9_]{1,15}$/.test(normalized)

  return {
    handle: normalized,
    valid,
    profileUrl: `https://x.com/${normalized}`,
  }
}

// === Instagram Verification ===

export function verifyInstagram(handle: string): InstagramVerificationResult {
  let normalized = handle.trim()
  normalized = normalized.replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
  normalized = normalized.replace(/^@/, '')
  normalized = normalized.split('/')[0]
  normalized = normalized.split('?')[0]

  const valid = /^[a-zA-Z0-9_.]{1,30}$/.test(normalized)

  return {
    handle: normalized,
    valid,
    profileUrl: `https://instagram.com/${normalized}`,
  }
}

// === App Store Verification ===

export async function verifyAppStore(url: string): Promise<AppStoreVerificationResult> {
  // Extract app ID from URL like apps.apple.com/.../id1234567890
  const match = url.match(/id(\d+)/)
  if (!match) {
    return { error: 'Could not find app ID in URL. Use a link like apps.apple.com/app/name/id123456789' }
  }

  const appId = match[1]

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${appId}&country=us`,
      { signal: controller.signal }
    )

    clearTimeout(timeout)

    if (!response.ok) {
      return { error: 'App Store lookup failed' }
    }

    const data = await response.json()

    if (!data.results || data.results.length === 0) {
      return { error: 'App not found in the App Store' }
    }

    const app = data.results[0]

    return {
      appName: app.trackName,
      developer: app.artistName,
      rating: app.averageUserRating ? Math.round(app.averageUserRating * 10) / 10 : undefined,
      ratingCount: app.userRatingCount,
      price: app.formattedPrice || (app.price === 0 ? 'Free' : `$${app.price}`),
      genre: app.primaryGenreName,
      releaseDate: app.releaseDate?.split('T')[0],
      iconUrl: app.artworkUrl100,
    }
  } catch {
    return { error: 'Could not reach App Store. Please try again.' }
  }
}
