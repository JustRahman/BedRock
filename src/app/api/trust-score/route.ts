import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

interface FounderData {
  id: string
  role?: string
}

// Get trust score for current user or specific founder (admin)
export async function GET(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
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

    // Admin can view any founder's trust score
    if (founder.role === 'admin' && founderId) {
      const { data: trustScore, error } = await supabase
        .from('trust_scores')
        .select('*')
        .eq('founder_id', founderId)
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ trustScore })
    }

    // Regular user sees their own trust score
    const { data: trustScore, error } = await supabase
      .from('trust_scores')
      .select('*')
      .eq('founder_id', founder.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ trustScore: trustScore || null })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Admin: Override trust score
export async function PATCH(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if admin
    const { data: founderData } = await supabase
      .from('founders')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder || founder.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()

    if (!body.founderId) {
      return NextResponse.json({ error: 'Founder ID required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {
      manual_override: true,
      override_reason: body.reason || null,
    }

    if (body.totalScore !== undefined) {
      updateData.total_score = body.totalScore
    }

    if (body.status) {
      const validStatuses = ['elite', 'approved', 'review_needed', 'conditional', 'not_eligible']
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
      }
      updateData.status = body.status
    }

    const { data: trustScore, error } = await (supabase
      .from('trust_scores') as ReturnType<typeof supabase.from>)
      .update(updateData)
      .eq('founder_id', body.founderId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ trustScore })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
