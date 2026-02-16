import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
}

type ImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

const PROMPTS: Record<string, string> = {
  passport: `You are analyzing a passport document image. Extract the following information and return ONLY valid JSON with no other text:

{
  "fullName": "full name as shown on passport or null",
  "firstName": "first/given name or null",
  "lastName": "surname/family name or null",
  "middleName": "middle name if present or null",
  "dateOfBirth": "date of birth in YYYY-MM-DD format or null",
  "gender": "M, F, or X as shown or null",
  "placeOfBirth": "place of birth or null",
  "nationality": "nationality or null",
  "passportNumber": "passport number or null",
  "expiryDate": "expiry date in YYYY-MM-DD format or null",
  "issuingCountry": "issuing country or null"
}

Return null for any field you cannot read clearly. Do not guess.`,

  local_id: `You are analyzing a government-issued ID document (driver's license, national ID card, etc.). Extract the following information and return ONLY valid JSON with no other text:

{
  "fullName": "full name as shown on ID or null",
  "firstName": "first/given name or null",
  "lastName": "surname/family name or null",
  "dateOfBirth": "date of birth in YYYY-MM-DD format or null",
  "idNumber": "ID/license number or null",
  "address": "full address if shown or null",
  "expiryDate": "expiry date in YYYY-MM-DD format or null",
  "issuingAuthority": "issuing authority/state or null"
}

Return null for any field you cannot read clearly. Do not guess.`,

  address_proof: `You are analyzing a proof of address document (utility bill, bank statement, official letter, etc.). Extract the following information and return ONLY valid JSON with no other text:

{
  "fullName": "name of the person/account holder or null",
  "address": "full street address as shown or null",
  "city": "city or null",
  "state": "state/province or null",
  "postalCode": "postal/zip code or null",
  "country": "country or null",
  "documentDate": "date on the document in YYYY-MM-DD format or null",
  "issuingCompany": "company/organization that issued the document or null"
}

Return null for any field you cannot read clearly. Do not guess.`,
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { allowed } = checkRateLimit(`verify-doc:${ip}`, 5, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const documentType = formData.get('documentType') as string | null

    if (!file || !documentType) {
      return NextResponse.json(
        { error: 'File and documentType are required' },
        { status: 400 },
      )
    }

    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 },
      )
    }

    if (file.type === 'application/pdf') {
      return NextResponse.json(
        { error: 'PDF files are not supported. Please upload an image (JPG, PNG, or WebP).' },
        { status: 400 },
      )
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a JPG, PNG, or WebP image.' },
        { status: 400 },
      )
    }

    const prompt = PROMPTS[documentType]
    if (!prompt) {
      return NextResponse.json(
        { error: `Invalid document type: ${documentType}` },
        { status: 400 },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

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
                media_type: file.type as ImageMediaType,
                data: base64,
              },
            },
            { type: 'text', text: prompt },
          ],
        },
      ],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    const rawText = textBlock && 'text' in textBlock ? textBlock.text : ''

    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Could not extract data from the document. Please try a clearer image.' },
        { status: 422 },
      )
    }

    const extracted = JSON.parse(jsonMatch[0])

    return NextResponse.json({ extracted, documentType })
  } catch (error) {
    console.error('Document extraction error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze document. Please try again.' },
      { status: 500 },
    )
  }
}
