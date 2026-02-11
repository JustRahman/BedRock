import { createServiceClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { FounderDetailClient } from './founder-detail-client'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function FounderDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = createServiceClient()

  const { data: founder } = await supabase
    .from('founders')
    .select('*')
    .eq('id', id)
    .single()

  if (!founder) {
    notFound()
  }

  const [
    { data: trustScore },
    { data: documents },
    { data: verifications },
    { data: companies },
    { data: bankApplications },
  ] = await Promise.all([
    supabase.from('trust_scores').select('*').eq('founder_id', id).single(),
    supabase.from('documents').select('*').eq('founder_id', id).order('created_at', { ascending: false }),
    supabase.from('founder_verifications').select('*').eq('founder_id', id),
    supabase.from('companies').select('*').eq('founder_id', id),
    supabase.from('bank_applications').select('*').eq('founder_id', id),
  ])

  return (
    <FounderDetailClient
      founder={founder as Record<string, unknown>}
      trustScore={trustScore as Record<string, unknown> | null}
      documents={(documents || []) as Record<string, unknown>[]}
      verifications={(verifications || []) as Record<string, unknown>[]}
      company={companies && (companies as Record<string, unknown>[]).length > 0 ? (companies as Record<string, unknown>[])[0] : null}
      bankApplication={bankApplications && (bankApplications as Record<string, unknown>[]).length > 0 ? (bankApplications as Record<string, unknown>[])[0] : null}
    />
  )
}
