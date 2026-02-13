import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))

    // Check if founder already exists
    const { data: existingFounder } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .select('id')
      .eq('user_id', user.id)
      .single()

    let founderId: string

    if (existingFounder) {
      founderId = (existingFounder as { id: string }).id

      // Update founder with any new onboarding data
      if (body.onboardingData?.basicInfo) {
        const bi = body.onboardingData.basicInfo
        const updates: Record<string, unknown> = {}
        if (bi.phone) updates.phone = bi.phone
        if (bi.dateOfBirth) updates.date_of_birth = bi.dateOfBirth
        if (bi.countryOfOrigin) updates.country_of_origin = bi.countryOfOrigin
        if (bi.countryOfResidence) updates.country_of_residence = bi.countryOfResidence
        if (Object.keys(updates).length > 0) {
          updates.onboarding_completed = true
          await (supabase.from('founders') as ReturnType<typeof supabase.from>)
            .update(updates)
            .eq('id', founderId)
        }
      }
    } else {
      // Create founder record
      const meta = user.user_metadata || {}
      const bi = body.onboardingData?.basicInfo || {}
      const { data: founder, error: founderError } = await (supabase
        .from('founders') as ReturnType<typeof supabase.from>)
        .insert({
          user_id: user.id,
          email: user.email || '',
          full_name: meta.full_name || bi.fullName || user.email?.split('@')[0] || 'User',
          phone: bi.phone || null,
          date_of_birth: bi.dateOfBirth || null,
          country_of_origin: bi.countryOfOrigin || '',
          country_of_residence: bi.countryOfResidence || '',
          onboarding_completed: !!body.trustScore,
        })
        .select('id')
        .single()

      if (founderError) {
        console.error('[ensure] Founder creation failed:', founderError.message)
        return NextResponse.json({ error: founderError.message }, { status: 500 })
      }

      founderId = (founder as { id: string }).id
    }

    // Save trust score if provided
    if (body.trustScore) {
      const { data: existingScore } = await (supabase
        .from('trust_scores') as ReturnType<typeof supabase.from>)
        .select('id')
        .eq('founder_id', founderId)
        .single()

      if (!existingScore) {
        const { error: tsError } = await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>).insert({
          founder_id: founderId,
          total_score: body.trustScore.totalScore || 0,
          identity_score: body.trustScore.identityScore || 0,
          business_score: body.trustScore.businessScore || 0,
          financial_score: body.trustScore.businessScore || 0,
          social_score: body.trustScore.networkScore || 0,
          digital_lineage_score: body.trustScore.digitalLineageScore || 0,
          network_score: body.trustScore.networkScore || 0,
          country_adjustment: body.trustScore.countryAdjustment || 0,
          status: body.trustScore.status || 'review_needed',
          score_breakdown: body.trustScore.breakdown || {},
        })

        if (tsError) {
          console.error('[ensure] Trust score insert failed:', tsError.message)
        }
      } else {
        // Update existing score
        await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>)
          .update({
            total_score: body.trustScore.totalScore || 0,
            identity_score: body.trustScore.identityScore || 0,
            business_score: body.trustScore.businessScore || 0,
            financial_score: body.trustScore.businessScore || 0,
            social_score: body.trustScore.networkScore || 0,
            country_adjustment: body.trustScore.countryAdjustment || 0,
            status: body.trustScore.status || 'review_needed',
            score_breakdown: body.trustScore.breakdown || {},
          })
          .eq('founder_id', founderId)
      }
    }

    // Save all verification data from onboarding
    if (body.onboardingData) {
      const verifications: { type: string; data: unknown }[] = []
      const od = body.onboardingData

      // Identity verifications
      if (od.identity) {
        if (od.identity.hasPassport) {
          verifications.push({
            type: 'passport',
            data: {
              hasPassport: true,
              passportNameMatch: od.identity.passportNameMatch,
              passportDobMatch: od.identity.passportDobMatch,
              passportGenderMatch: od.identity.passportGenderMatch,
              passportNationalityMatch: od.identity.passportNationalityMatch,
              extractedData: od.identity.passportData,
            },
          })
        }
        if (od.identity.hasLocalId) {
          verifications.push({
            type: 'local_id',
            data: { hasLocalId: true, extractedData: od.identity.localIdData },
          })
        }
        if (od.identity.hasAddressProof) {
          verifications.push({
            type: 'address_proof',
            data: { hasAddressProof: true, extractedData: od.identity.addressProofData },
          })
        }
        if (od.identity.hasLivenessCheck) {
          verifications.push({
            type: 'face_scan',
            data: { matched: true },
          })
        }
      }

      // GitHub OAuth
      if (od.codeHistory?.githubConnected) {
        const ghData = body.oauthData?.github || od.codeHistory
        verifications.push({ type: 'github_oauth', data: ghData })
      }

      // LinkedIn OAuth
      if (od.professional?.linkedinConnected) {
        const liData = body.oauthData?.linkedin || od.professional
        verifications.push({ type: 'linkedin_oauth', data: liData })
      }

      // Stripe OAuth
      if (od.financial?.hasStripeConnected) {
        const stripeData = body.oauthData?.stripe || od.financial
        verifications.push({ type: 'stripe_oauth', data: stripeData })
      }

      // Financial details
      if (od.financial?.monthlyRevenue || od.financial?.customerGeography) {
        verifications.push({
          type: 'financial_info',
          data: {
            monthlyRevenue: od.financial.monthlyRevenue,
            customerGeography: od.financial.customerGeography,
            chargebackRate: od.financial.chargebackRate,
            hasBankStatements: od.financial.hasBankStatements,
          },
        })
      }

      // Digital presence
      if (od.digitalPresence) {
        const dp = od.digitalPresence
        if (dp.website || dp.twitterHandle || dp.instagramHandle || dp.appStoreUrl) {
          verifications.push({
            type: 'digital_presence',
            data: {
              website: dp.website,
              websiteVerified: dp.websiteVerified,
              twitterHandle: dp.twitterHandle,
              twitterVerified: dp.twitterVerified,
              instagramHandle: dp.instagramHandle,
              instagramVerified: dp.instagramVerified,
              appStoreUrl: dp.appStoreUrl,
              appStoreVerified: dp.appStoreVerified,
            },
          })
        }
      }

      // Trust signals
      if (od.trustSignals) {
        const ts = od.trustSignals
        if (ts.hasReferral || ts.referralVerified) {
          verifications.push({
            type: 'referral',
            data: { hasReferral: ts.hasReferral, referralVerified: ts.referralVerified, referralCode: ts.referralCode },
          })
        }
        if (ts.hasUniversityEmail || ts.universityEmailVerified) {
          verifications.push({
            type: 'university_email',
            data: { hasUniversityEmail: ts.hasUniversityEmail, verified: ts.universityEmailVerified, email: ts.universityEmail },
          })
        }
        if (ts.hasAccelerator || ts.acceleratorVerified) {
          verifications.push({
            type: 'accelerator',
            data: { hasAccelerator: ts.hasAccelerator, verified: ts.acceleratorVerified, name: ts.acceleratorName },
          })
        }
        if (ts.hasEmployerVerification) {
          verifications.push({
            type: 'employer_verification',
            data: { hasEmployerVerification: true },
          })
        }
      }

      // Upsert all verifications
      for (const v of verifications) {
        const status = (
          v.type === 'github_oauth' && od.codeHistory?.githubConnected ? 'verified' :
          v.type === 'linkedin_oauth' && od.professional?.linkedinConnected ? 'verified' :
          v.type === 'stripe_oauth' && od.financial?.hasStripeConnected ? 'verified' :
          v.type === 'face_scan' ? 'verified' :
          v.type === 'referral' && od.trustSignals?.referralVerified ? 'verified' :
          v.type === 'university_email' && od.trustSignals?.universityEmailVerified ? 'verified' :
          v.type === 'accelerator' && od.trustSignals?.acceleratorVerified ? 'verified' :
          'pending'
        ) as 'verified' | 'pending'

        try {
          await (supabase.from('founder_verifications') as ReturnType<typeof supabase.from>)
            .upsert({
              founder_id: founderId,
              verification_type: v.type,
              status,
              verified_at: status === 'verified' ? new Date().toISOString() : null,
              metadata: v.data,
            }, { onConflict: 'founder_id,verification_type' })
        } catch {
          // Non-critical — continue saving other verifications
        }
      }
    }

    return NextResponse.json({ founder: { id: founderId }, created: !existingFounder })
  } catch (err) {
    console.error('[ensure] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
