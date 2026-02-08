import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface FounderData {
  id: string
  role: string
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
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
    const founderId = searchParams.get('founderId')

    // Admin can view all compliance deadlines
    if (founder.role === 'admin') {
      let query = supabase
        .from('compliance_deadlines')
        .select('*, founders(full_name, email)')
        .order('due_date', { ascending: true })

      if (founderId) {
        query = query.eq('founder_id', founderId)
      }

      const { data: deadlines, error } = await query

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ deadlines })
    }

    // Regular user sees their own deadlines
    const { data: deadlines, error } = await supabase
      .from('compliance_deadlines')
      .select('*')
      .eq('founder_id', founder.id)
      .order('due_date', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ deadlines })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
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

    // Determine founder_id (admin can create for any founder)
    let targetFounderId = founder.id
    if (founder.role === 'admin' && body.founderId) {
      targetFounderId = body.founderId
    }

    // Use type assertion to bypass strict typing when DB types aren't available
    const insertData = {
      founder_id: targetFounderId,
      company_id: body.companyId || null,
      title: body.title,
      description: body.description || null,
      due_date: body.dueDate,
    }

    const { data: deadline, error } = await (supabase
      .from('compliance_deadlines') as ReturnType<typeof supabase.from>)
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ deadline }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
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

    if (!body.deadlineId) {
      return NextResponse.json({ error: 'Deadline ID required' }, { status: 400 })
    }

    // Build update object
    const updateData: Record<string, unknown> = {}

    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.dueDate !== undefined) updateData.due_date = body.dueDate
    if (body.completed !== undefined) {
      updateData.completed = body.completed
      updateData.completed_at = body.completed ? new Date().toISOString() : null
    }
    if (body.reminderSent !== undefined) updateData.reminder_sent = body.reminderSent

    // Build query with type assertion
    const baseQuery = (supabase.from('compliance_deadlines') as ReturnType<typeof supabase.from>)
      .update(updateData)
      .eq('id', body.deadlineId)

    // Regular users can only update their own deadlines
    const query = founder.role !== 'admin'
      ? baseQuery.eq('founder_id', founder.id)
      : baseQuery

    const { data: deadline, error } = await query.select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ deadline })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
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
    const deadlineId = searchParams.get('id')

    if (!deadlineId) {
      return NextResponse.json({ error: 'Deadline ID required' }, { status: 400 })
    }

    // Build query with type assertion
    const baseQuery = (supabase.from('compliance_deadlines') as ReturnType<typeof supabase.from>)
      .delete()
      .eq('id', deadlineId)

    // Regular users can only delete their own deadlines
    const query = founder.role !== 'admin'
      ? baseQuery.eq('founder_id', founder.id)
      : baseQuery

    const { error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
