import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function PATCH(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Check that the current user is an admin
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminEmail = process.env.ADMIN_EMAIL || ''
    if (user.email !== adminEmail) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { founderId, verified } = await request.json()
    if (!founderId || typeof verified !== 'boolean') {
      return NextResponse.json({ error: 'founderId and verified (boolean) are required' }, { status: 400 })
    }

    if (verified) {
      // Upsert payment_verified verification
      await (supabase.from('founder_verifications') as ReturnType<typeof supabase.from>)
        .upsert({
          founder_id: founderId,
          verification_type: 'payment_verified',
          status: 'verified',
          verified_at: new Date().toISOString(),
          metadata: { verified_by: user.email, verified_at: new Date().toISOString() },
        }, { onConflict: 'founder_id,verification_type' })
    } else {
      // Remove the verification
      await (supabase.from('founder_verifications') as ReturnType<typeof supabase.from>)
        .delete()
        .eq('founder_id', founderId)
        .eq('verification_type', 'payment_verified')
    }

    // Recalculate trust score for this founder
    // We use the service client to read founder data and recalculate directly
    const { data: founder } = await supabase
      .from('founders')
      .select('id, country_of_origin, country_of_residence')
      .eq('id', founderId)
      .single()

    if (founder) {
      const { calculateTrustScoreV2, getStatusFromScore } = await import('@/lib/trust-score-v2')
      const { data: verifications } = await supabase
        .from('founder_verifications')
        .select('verification_type, status, metadata')
        .eq('founder_id', founderId)

      const verifs = (verifications || []) as { verification_type: string; status: string; metadata: Record<string, unknown> | null }[]

      // Build input from verifications
      const v2Input: Parameters<typeof calculateTrustScoreV2>[0] = {
        countryOfOrigin: (founder as Record<string, unknown>).country_of_origin as string | undefined,
        countryOfResidence: (founder as Record<string, unknown>).country_of_residence as string | undefined,
      }

      for (const v of verifs) {
        if (v.status !== 'verified' && v.status !== 'pending') continue
        const meta = v.metadata

        if (v.verification_type === 'github' && meta) {
          v2Input.github = meta as never
          v2Input.githubUsernameOnly = false
        } else if (v.verification_type === 'github_username' && meta) {
          v2Input.github = meta as never
          v2Input.githubUsernameOnly = true
        } else if (v.verification_type === 'stripe' && meta) {
          if (!v2Input.economicActivity) v2Input.economicActivity = {}
          v2Input.economicActivity.stripe = meta as never
        } else if (v.verification_type === 'linkedin' && meta) {
          v2Input.linkedin = meta as never
          v2Input.linkedinUrlOnly = false
        } else if (v.verification_type === 'linkedin_url') {
          v2Input.linkedinUrlOnly = true
        } else if (v.verification_type === 'crypto_wallet' && meta) {
          if (!v2Input.economicActivity) v2Input.economicActivity = {}
          const profileData = meta as Record<string, unknown>
          v2Input.economicActivity.crypto = (profileData.score as Record<string, unknown>) as never
        } else if (v.verification_type === 'payment_verified') {
          if (!v2Input.economicActivity) v2Input.economicActivity = {}
          v2Input.economicActivity.paymentVerified = true
        } else if (v.verification_type === 'passport' && meta) {
          if (!v2Input.identity) v2Input.identity = {}
          v2Input.identity.hasPassport = true
          const m = meta as Record<string, unknown>
          v2Input.identity.passportNameMatch = m.passportNameMatch as boolean | undefined
          v2Input.identity.passportDobMatch = m.passportDobMatch as boolean | undefined
          v2Input.identity.passportGenderMatch = m.passportGenderMatch as boolean | undefined
          v2Input.identity.passportNationalityMatch = m.passportNationalityMatch as boolean | undefined
        } else if (v.verification_type === 'local_id') {
          if (!v2Input.identity) v2Input.identity = {}
          v2Input.identity.hasLocalId = true
        } else if (v.verification_type === 'face_scan') {
          if (!v2Input.identity) v2Input.identity = {}
          v2Input.identity.hasLivenessCheck = true
        } else if (v.verification_type === 'address_proof') {
          if (!v2Input.identity) v2Input.identity = {}
          v2Input.identity.hasAddressProof = true
        }
      }

      const result = calculateTrustScoreV2(v2Input)
      const { status } = getStatusFromScore(result.score)

      await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>)
        .upsert({
          founder_id: founderId,
          total_score: result.score,
          identity_score: result.breakdown.identity.score,
          business_score: result.breakdown.economic_activity.score,
          financial_score: result.breakdown.economic_activity.score,
          social_score: result.breakdown.linkedin.score,
          digital_lineage_score: result.breakdown.github.score + result.breakdown.digital_presence.score,
          network_score: result.breakdown.network.score,
          country_adjustment: result.country_adjustment,
          status,
          score_breakdown: result.breakdown as unknown as Record<string, unknown>,
          calculated_at: new Date().toISOString(),
        }, { onConflict: 'founder_id' })
    }

    return NextResponse.json({ success: true, verified })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
