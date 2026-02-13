export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { ServicesClient } from './services-client'

interface ServiceRow {
  id: string
  founder_id: string
  company_id: string | null
  service_type: string
  status: string
  details: Record<string, unknown> | null
  notes: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
  founders: { full_name: string; email: string } | null
  companies: { name: string; state: string | null } | null
}

export default async function AdminServicesPage() {
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('service_requests')
    .select('*, founders(full_name, email), companies(name, state)')
    .order('created_at', { ascending: false })

  const requests = ((data || []) as ServiceRow[]).map((r) => ({
    id: r.id,
    founderId: r.founder_id,
    founderName: r.founders ? (r.founders as { full_name: string }).full_name : 'Unknown',
    founderEmail: r.founders ? (r.founders as { email: string }).email : '',
    companyName: r.companies ? (r.companies as { name: string }).name : null,
    companyState: r.companies ? (r.companies as { state: string | null }).state : null,
    serviceType: r.service_type,
    status: r.status,
    notes: r.notes,
    adminNotes: r.admin_notes,
    createdAt: r.created_at,
  }))

  return <ServicesClient requests={requests} />
}
