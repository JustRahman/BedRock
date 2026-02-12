export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { FormationsClient } from './formations-client'

interface CompanyWithFounder {
  id: string
  name: string
  legal_name: string | null
  state: string | null
  formation_status: string
  ein: string | null
  created_at: string
  founders: { id: string; full_name: string; email: string } | null
}

export default async function FormationsPage() {
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('companies')
    .select('id, name, legal_name, state, formation_status, ein, created_at, founders(id, full_name, email)')
    .order('created_at', { ascending: false })

  const companies = (data || []) as CompanyWithFounder[]

  return <FormationsClient companies={companies} />
}
