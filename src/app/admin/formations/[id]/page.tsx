import { createServiceClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { FormationDetailClient } from './formation-detail-client'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function FormationDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = createServiceClient()

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single()

  if (!company) {
    notFound()
  }

  const companyRecord = company as { founder_id: string; id: string }

  const [
    { data: founder },
    { data: updates },
    { data: deadlines },
    { data: bankApps },
  ] = await Promise.all([
    supabase.from('founders').select('id, full_name, email, country_of_origin').eq('id', companyRecord.founder_id).single(),
    supabase.from('company_updates').select('*').eq('company_id', companyRecord.id).order('created_at', { ascending: false }),
    supabase.from('compliance_deadlines').select('id, title, description, due_date, completed, is_recurring, recurring_type').eq('company_id', companyRecord.id).order('due_date', { ascending: true }),
    supabase.from('bank_applications').select('id, bank_name, status, submitted_at, approved_at, notes').eq('company_id', companyRecord.id).order('created_at', { ascending: false }),
  ])

  return (
    <FormationDetailClient
      company={company as Record<string, unknown>}
      founder={founder as Record<string, unknown> | null}
      updates={(updates || []) as Record<string, unknown>[]}
      deadlines={(deadlines || []) as Record<string, unknown>[]}
      bankApps={(bankApps || []) as Record<string, unknown>[]}
    />
  )
}
