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

    const { data: applications, error } = await supabase
      .from('bank_applications')
      .select('*')
      .eq('founder_id', founder.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ applications: applications || [] })
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

    // Get company
    const { data: companyData } = await supabase
      .from('companies')
      .select('id')
      .eq('founder_id', founder.id)
      .single()

    if (!companyData) {
      return NextResponse.json({ error: 'Company not found. Complete LLC formation first.' }, { status: 400 })
    }

    const body = await request.json()

    const insertData = {
      founder_id: founder.id,
      company_id: (companyData as { id: string }).id,
      bank_name: body.bankName,
      status: body.status || 'draft',
      notes: body.notes || null,
    }

    const { data: application, error } = await (supabase
      .from('bank_applications') as ReturnType<typeof supabase.from>)
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ application }, { status: 201 })
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
    if (body.status) updateData.status = body.status
    if (body.bankName) updateData.bank_name = body.bankName
    if (body.notes !== undefined) updateData.notes = body.notes
    if (body.status === 'submitted') updateData.submitted_at = new Date().toISOString()
    if (body.status === 'approved') updateData.approved_at = new Date().toISOString()
    if (body.rejectionReason) updateData.rejection_reason = body.rejectionReason

    const targetId = founder.role === 'admin' && body.applicationId
      ? body.applicationId
      : body.id

    let queryBuilder = (supabase.from('bank_applications') as ReturnType<typeof supabase.from>)
      .update(updateData)
      .eq('id', targetId)

    if (!(founder.role === 'admin' && body.applicationId)) {
      queryBuilder = queryBuilder.eq('founder_id', founder.id)
    }

    const { data: application, error } = await queryBuilder
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ application })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
