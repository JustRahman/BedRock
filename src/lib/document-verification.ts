import Anthropic from '@anthropic-ai/sdk'

function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

type MatchResult = 'exact' | 'partial' | 'mismatch' | 'unavailable'

export interface VerificationResult {
  status: 'verified' | 'failed' | 'review_needed'
  extractedData: ExtractedData
  matchResults: {
    name: MatchResult
    dateOfBirth: MatchResult
    country: MatchResult
  }
  confidence: number
  reasoning: string
}

interface ExtractedData {
  fullName: string | null
  dateOfBirth: string | null
  documentNumber: string | null
  expiryDate: string | null
  nationality: string | null
  documentTypeConfirmed: string | null
  confidence: number
}

interface FounderProfile {
  full_name: string
  date_of_birth: string | null
  country_of_origin: string
}

type ImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

const COUNTRY_ALIASES: Record<string, string[]> = {
  'united states': ['us', 'usa', 'united states of america', 'u.s.', 'u.s.a.'],
  'united kingdom': ['uk', 'gb', 'great britain', 'britain', 'england'],
  'south korea': ['korea', 'republic of korea', 'kr'],
  'north korea': ['dprk', 'democratic peoples republic of korea'],
  'russia': ['russian federation', 'ru'],
  'china': ['peoples republic of china', 'cn', 'prc'],
  'taiwan': ['republic of china', 'tw', 'chinese taipei'],
  'uae': ['united arab emirates', 'ae'],
}

function normalizeCountry(country: string): string {
  const lower = country.toLowerCase().trim()

  // Resolve ISO 2/3-letter codes (e.g. "TM" → "turkmenistan", "US" → "united states")
  if (lower.length <= 3) {
    try {
      const displayName = new Intl.DisplayNames(['en'], { type: 'region' }).of(country.toUpperCase())
      if (displayName) {
        const resolved = displayName.toLowerCase()
        // Check if resolved name has a canonical alias
        for (const [canonical, aliases] of Object.entries(COUNTRY_ALIASES)) {
          if (resolved === canonical || aliases.includes(resolved)) {
            return canonical
          }
        }
        return resolved
      }
    } catch { /* fall through to manual lookup */ }
  }

  for (const [canonical, aliases] of Object.entries(COUNTRY_ALIASES)) {
    if (lower === canonical || aliases.includes(lower)) {
      return canonical
    }
  }
  return lower
}

function compareName(extracted: string | null, expected: string): MatchResult {
  if (!extracted) return 'unavailable'

  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean).sort()

  const extractedParts = normalize(extracted)
  const expectedParts = normalize(expected)

  if (extractedParts.join(' ') === expectedParts.join(' ')) return 'exact'

  // Check if all parts of one name appear in the other (handles middle names, ordering)
  const extractedSet = new Set(extractedParts)
  const expectedSet = new Set(expectedParts)
  const allExpectedInExtracted = expectedParts.every((p) => extractedSet.has(p))
  const allExtractedInExpected = extractedParts.every((p) => expectedSet.has(p))

  if (allExpectedInExtracted || allExtractedInExpected) return 'partial'

  // Check if at least first and last name match
  const overlap = expectedParts.filter((p) => extractedSet.has(p))
  if (overlap.length >= 2) return 'partial'

  return 'mismatch'
}

function compareDateOfBirth(extracted: string | null, expected: string | null): MatchResult {
  if (!extracted) return 'unavailable'
  if (!expected) return 'unavailable'

  // Normalize dates to YYYY-MM-DD for comparison
  const normalize = (d: string) => {
    const date = new Date(d)
    if (isNaN(date.getTime())) return d.trim()
    return date.toISOString().split('T')[0]
  }

  return normalize(extracted) === normalize(expected) ? 'exact' : 'mismatch'
}

function compareCountry(extracted: string | null, expected: string): MatchResult {
  if (!extracted) return 'unavailable'
  return normalizeCountry(extracted) === normalizeCountry(expected) ? 'exact' : 'mismatch'
}

function determineStatus(
  matchResults: VerificationResult['matchResults'],
  confidence: number,
): VerificationResult['status'] {
  const { name, dateOfBirth, country } = matchResults

  // Auto-verify: name exact/partial + DOB exact/unavailable + country exact/unavailable + confidence >= 70
  if (
    (name === 'exact' || name === 'partial') &&
    (dateOfBirth === 'exact' || dateOfBirth === 'unavailable') &&
    (country === 'exact' || country === 'unavailable') &&
    confidence >= 70
  ) {
    return 'verified'
  }

  // Auto-fail: both name AND DOB are mismatch
  if (name === 'mismatch' && dateOfBirth === 'mismatch') {
    return 'failed'
  }

  // Everything else: flag for review
  return 'review_needed'
}

export async function verifyDocument({
  fileBase64,
  mimeType,
  documentType,
  founderProfile,
}: {
  fileBase64: string
  mimeType: string
  documentType: string
  founderProfile: FounderProfile
}): Promise<VerificationResult> {
  // PDFs can't be sent as images to Claude Vision
  if (mimeType === 'application/pdf') {
    return {
      status: 'review_needed',
      extractedData: {
        fullName: null,
        dateOfBirth: null,
        documentNumber: null,
        expiryDate: null,
        nationality: null,
        documentTypeConfirmed: null,
        confidence: 0,
      },
      matchResults: { name: 'unavailable', dateOfBirth: 'unavailable', country: 'unavailable' },
      confidence: 0,
      reasoning: 'PDF documents cannot be automatically verified via image analysis. Manual review required.',
    }
  }

  const anthropic = getAnthropicClient()

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType as ImageMediaType,
              data: fileBase64,
            },
          },
          {
            type: 'text',
            text: `You are analyzing an identity document (expected type: ${documentType}). Extract the following information from this document image and return ONLY valid JSON with no other text:

{
  "fullName": "the full name on the document or null if not readable",
  "dateOfBirth": "date of birth in YYYY-MM-DD format or null if not present",
  "documentNumber": "the document/passport number or null",
  "expiryDate": "expiry date in YYYY-MM-DD format or null",
  "nationality": "nationality/country listed on document or null",
  "documentTypeConfirmed": "what type of document this actually is (passport, national_id, drivers_license, address_proof, other)",
  "confidence": 85
}

The confidence field should be 0-100 indicating how confident you are in the extracted data quality. Consider image clarity, whether fields are readable, and if the document appears genuine.`,
          },
        ],
      },
    ],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  const rawText = textBlock && 'text' in textBlock ? textBlock.text : ''

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = rawText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    return {
      status: 'review_needed',
      extractedData: {
        fullName: null,
        dateOfBirth: null,
        documentNumber: null,
        expiryDate: null,
        nationality: null,
        documentTypeConfirmed: null,
        confidence: 0,
      },
      matchResults: { name: 'unavailable', dateOfBirth: 'unavailable', country: 'unavailable' },
      confidence: 0,
      reasoning: 'Could not parse AI response. Manual review required.',
    }
  }

  const extracted: ExtractedData = JSON.parse(jsonMatch[0])

  const matchResults = {
    name: compareName(extracted.fullName, founderProfile.full_name),
    dateOfBirth: compareDateOfBirth(extracted.dateOfBirth, founderProfile.date_of_birth),
    country: compareCountry(extracted.nationality, founderProfile.country_of_origin),
  }

  const confidence = extracted.confidence ?? 0
  const status = determineStatus(matchResults, confidence)

  const reasons: string[] = []
  reasons.push(`Name: ${matchResults.name} (extracted: "${extracted.fullName}", expected: "${founderProfile.full_name}")`)
  reasons.push(`DOB: ${matchResults.dateOfBirth} (extracted: "${extracted.dateOfBirth}", expected: "${founderProfile.date_of_birth}")`)
  reasons.push(`Country: ${matchResults.country} (extracted: "${extracted.nationality}", expected: "${founderProfile.country_of_origin}")`)
  reasons.push(`Confidence: ${confidence}/100`)

  return {
    status,
    extractedData: extracted,
    matchResults,
    confidence,
    reasoning: reasons.join('. '),
  }
}
