export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { BankAppsClient } from './bank-apps-client'

interface BankAppRow {
  id: string
  founder_id: string
  company_id: string
  bank_name: string | null
  status: string
  submitted_at: string | null
  approved_at: string | null
  rejection_reason: string | null
  notes: string | null
  created_at: string
  founders: { full_name: string; email: string } | null
  companies: { name: string; state: string } | null
}

export default async function AdminBankAppsPage() {
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('bank_applications')
    .select('*, founders(full_name, email), companies(name, state)')
    .order('created_at', { ascending: false })

  const apps = ((data || []) as BankAppRow[]).map((a) => ({
    id: a.id,
    founderId: a.founder_id,
    founderName: a.founders ? (a.founders as { full_name: string }).full_name : 'Unknown',
    founderEmail: a.founders ? (a.founders as { email: string }).email : '',
    companyName: a.companies ? (a.companies as { name: string }).name : 'N/A',
    companyState: a.companies ? (a.companies as { state: string }).state : '',
    bankName: a.bank_name || 'N/A',
    status: a.status,
    submittedAt: a.submitted_at,
    approvedAt: a.approved_at,
    rejectionReason: a.rejection_reason,
    notes: a.notes,
    createdAt: a.created_at,
  }))

  return <BankAppsClient applications={apps} />
}
