export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { ApplicationsClient } from './applications-client'

interface FounderWithScore {
  id: string
  full_name: string
  email: string
  country_of_residence: string
  created_at: string
  trust_scores: { total_score: number; status: string }[] | null
  companies: { name: string }[] | null
}

export default async function ApplicationsPage() {
  const supabase = createServiceClient()

  const { data, count } = await supabase
    .from('founders')
    .select('id, full_name, email, country_of_residence, created_at, trust_scores(total_score, status), companies(name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(100)

  const founders = ((data || []) as FounderWithScore[]).map((f) => ({
    id: f.id,
    founderName: f.full_name,
    email: f.email,
    country: f.country_of_residence || 'N/A',
    trustScore: Array.isArray(f.trust_scores) && f.trust_scores[0] ? f.trust_scores[0].total_score : 0,
    status: (Array.isArray(f.trust_scores) && f.trust_scores[0] ? f.trust_scores[0].status : 'pending') as 'pending' | 'under_review' | 'approved' | 'rejected' | 'elite' | 'review_needed' | 'conditional' | 'not_eligible',
    submittedAt: f.created_at,
    companyName: Array.isArray(f.companies) && f.companies[0] ? f.companies[0].name : 'N/A',
  }))

  return <ApplicationsClient applications={founders} total={count || 0} />
}
