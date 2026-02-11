import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

interface FounderData {
  id: string
  role?: string
}

export async function GET() {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founderData } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const { data: company, error } = await supabase
      .from('companies')
      .select('*')
      .eq('founder_id', founder.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Fetch company updates timeline if company exists
    let updates = null
    if (company) {
      const companyRecord = company as { id: string }
      const { data: updatesData } = await supabase
        .from('company_updates')
        .select('*')
        .eq('company_id', companyRecord.id)
        .order('created_at', { ascending: true })
      updates = updatesData
    }

    return NextResponse.json({ company: company || null, updates: updates || [] })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founderData } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()

    const insertData = {
      founder_id: founder.id,
      name: body.name,
      legal_name: body.legalName || body.name,
      state: body.state,
      description: body.description || null,
      formation_status: 'pending',
    }

    const { data: company, error } = await (supabase
      .from('companies') as ReturnType<typeof supabase.from>)
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const companyId = (company as { id: string }).id

    // Auto-create compliance deadlines
    const now = new Date()
    const boiDue = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
    const annualReportDue = new Date(now.getFullYear() + 1, 2, 1) // March 1 next year

    await (supabase.from('compliance_deadlines') as ReturnType<typeof supabase.from>)
      .insert([
        {
          founder_id: founder.id,
          company_id: companyId,
          title: 'FinCEN BOI Report',
          description: 'Beneficial Ownership Information report due within 90 days of formation.',
          due_date: boiDue.toISOString().split('T')[0],
        },
        {
          founder_id: founder.id,
          company_id: companyId,
          title: `${body.state === 'DE' ? 'Delaware' : 'Wyoming'} Annual Report`,
          description: `Annual report and franchise tax filing for ${body.state === 'DE' ? 'Delaware' : 'Wyoming'}.`,
          due_date: annualReportDue.toISOString().split('T')[0],
        },
      ])

    return NextResponse.json({ company }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founderData } = await supabase
      .from('founders')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()

    const updateData: Record<string, unknown> = {}
    if (body.formationStatus !== undefined) updateData.formation_status = body.formationStatus
    if (body.ein !== undefined) updateData.ein = body.ein
    if (body.formationDate !== undefined) updateData.formation_date = body.formationDate
    if (body.name !== undefined) updateData.name = body.name
    if (body.legalName !== undefined) updateData.legal_name = body.legalName

    // Determine which company to update
    const isAdmin = founder.role === 'admin' && body.companyId
    let queryBuilder = (supabase.from('companies') as ReturnType<typeof supabase.from>)
      .update(updateData)

    queryBuilder = isAdmin
      ? queryBuilder.eq('id', body.companyId)
      : queryBuilder.eq('founder_id', founder.id)

    const { data: company, error } = await queryBuilder
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log status change to company_updates if status was changed
    if (body.formationStatus && company) {
      const companyRecord = company as { id: string }
      await (supabase.from('company_updates') as ReturnType<typeof supabase.from>)
        .insert({
          company_id: companyRecord.id,
          status: body.formationStatus,
          note: body.note || null,
          created_by: founder.id,
        })
    }

    return NextResponse.json({ company })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
