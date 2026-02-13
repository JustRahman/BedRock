import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

interface FounderData {
  id: string
  role?: string
}

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url)
    const serviceType = searchParams.get('type')

    // Admin: return all (optionally filtered by type)
    if (founder.role === 'admin') {
      let query = supabase
        .from('service_requests')
        .select('*, founders(full_name, email), companies(name, state)')
        .order('created_at', { ascending: false })

      if (serviceType) {
        query = query.eq('service_type', serviceType)
      }

      const { data, error } = await query
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ requests: data || [] })
    }

    // Regular user: their own requests
    let query = supabase
      .from('service_requests')
      .select('*')
      .eq('founder_id', founder.id)
      .order('created_at', { ascending: false })

    if (serviceType) {
      query = query.eq('service_type', serviceType)
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ requests: data || [] })
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

    // Get company if exists
    const { data: companyData } = await supabase
      .from('companies')
      .select('id')
      .eq('founder_id', founder.id)
      .single()

    // Check for duplicate active request of same type
    const { data: existing } = await supabase
      .from('service_requests')
      .select('id')
      .eq('founder_id', founder.id)
      .eq('service_type', body.serviceType)
      .in('status', ['requested', 'in_progress'])
      .limit(1)

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'You already have an active request for this service.' }, { status: 409 })
    }

    const insertData = {
      founder_id: founder.id,
      company_id: companyData ? (companyData as { id: string }).id : null,
      service_type: body.serviceType,
      status: 'requested' as const,
      details: body.details || null,
      notes: body.notes || null,
    }

    const { data: serviceRequest, error } = await (supabase
      .from('service_requests') as ReturnType<typeof supabase.from>)
      .insert(insertData)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ request: serviceRequest }, { status: 201 })
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
    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }

    if (body.status) updateData.status = body.status
    if (body.adminNotes !== undefined) updateData.admin_notes = body.adminNotes
    if (body.notes !== undefined) updateData.notes = body.notes

    const targetId = founder.role === 'admin' && body.requestId
      ? body.requestId
      : body.id

    let queryBuilder = (supabase.from('service_requests') as ReturnType<typeof supabase.from>)
      .update(updateData)
      .eq('id', targetId)

    if (!(founder.role === 'admin' && body.requestId)) {
      queryBuilder = queryBuilder.eq('founder_id', founder.id)
    }

    const { data: serviceRequest, error } = await queryBuilder.select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ request: serviceRequest })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
