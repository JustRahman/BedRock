export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { ComplianceClient } from './compliance-client'

interface DeadlineRow {
  id: string
  title: string
  description: string | null
  due_date: string
  completed: boolean
  is_recurring: boolean
  recurring_type: string | null
  founder_id: string
  company_id: string
  founders: { full_name: string } | null
  companies: { id: string; name: string; state: string | null; formation_status: string } | null
}

export default async function AdminCompliancePage() {
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('compliance_deadlines')
    .select('id, title, description, due_date, completed, is_recurring, recurring_type, founder_id, company_id, founders(full_name), companies(id, name, state, formation_status)')
    .order('due_date', { ascending: true })

  const items = ((data || []) as DeadlineRow[]).map((d) => ({
    id: d.id,
    founderName: d.founders ? (d.founders as { full_name: string }).full_name : 'Unknown',
    founderId: d.founder_id,
    companyId: d.company_id,
    companyName: d.companies ? (d.companies as { name: string }).name : 'Unknown',
    companyState: d.companies ? (d.companies as { state: string | null }).state : null,
    formationStatus: d.companies ? (d.companies as { formation_status: string }).formation_status : 'pending',
    title: d.title,
    description: d.description,
    dueDate: d.due_date,
    completed: d.completed,
    isRecurring: d.is_recurring || false,
    recurringType: d.recurring_type,
  }))

  return <ComplianceClient items={items} />
}
