import { createServiceClient } from '@/lib/supabase/server'
import { FoundersClient } from './founders-client'

interface FounderRow {
  id: string
  full_name: string
  email: string
  country_of_origin: string
  country_of_residence: string
  role: string
  onboarding_completed: boolean
  created_at: string
  trust_scores: { total_score: number; status: string }[] | null
  companies: { id: string; name: string; formation_status: string }[] | null
}

export default async function FoundersPage() {
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('founders')
    .select('id, full_name, email, country_of_origin, country_of_residence, role, onboarding_completed, created_at, trust_scores(total_score, status), companies(id, name, formation_status)')
    .order('created_at', { ascending: false })

  const founders = (data || []) as FounderRow[]

  return <FoundersClient founders={founders} />
}
