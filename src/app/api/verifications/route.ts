import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface FounderData {
  id: string
  role?: string
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

    // Admin can view any founder's verifications
    if (founder.role === 'admin' && founderId) {
      const { data: verifications, error } = await supabase
        .from('founder_verifications')
        .select('*')
        .eq('founder_id', founderId)
        .order('created_at', { ascending: false })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ verifications })
    }

    // Regular user sees their own verifications
    const { data: verifications, error } = await supabase
      .from('founder_verifications')
      .select('*')
      .eq('founder_id', founder.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ verifications })
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
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()

    const upsertData = {
      founder_id: founder.id,
      verification_type: body.verificationType,
      status: 'pending',
      metadata: body.metadata || null,
    }

    const { data: verification, error } = await (supabase
      .from('founder_verifications') as ReturnType<typeof supabase.from>)
      .upsert(upsertData, {
        onConflict: 'founder_id,verification_type',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ verification }, { status: 201 })
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

    const updateData: Record<string, unknown> = {
      status: body.status,
    }

    if (body.status === 'verified') {
      updateData.verified_at = new Date().toISOString()
    }

    if (body.expiresAt) {
      updateData.expires_at = body.expiresAt
    }

    const { data: verification, error } = await (supabase
      .from('founder_verifications') as ReturnType<typeof supabase.from>)
      .update(updateData)
      .eq('id', body.verificationId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ verification })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
