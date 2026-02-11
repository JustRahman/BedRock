import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

interface FounderData {
  id?: string
  role?: string
}

export async function GET(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if admin
    const { data: currentFounderData } = await supabase
      .from('founders')
      .select('role')
      .eq('user_id', user.id)
      .single()

    const currentFounder = currentFounderData as FounderData | null

    if (currentFounder?.role === 'admin') {
      // Admin can see all founders
      const { searchParams } = new URL(request.url)
      const limit = parseInt(searchParams.get('limit') || '50')
      const offset = parseInt(searchParams.get('offset') || '0')

      const { data: founders, error, count } = await supabase
        .from('founders')
        .select('*, trust_scores(*), companies(*)', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ founders, total: count })
    } else {
      // Regular user can only see their own profile
      const { data: founder, error } = await supabase
        .from('founders')
        .select('*, trust_scores(*), companies(*)')
        .eq('user_id', user.id)
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 })
      }

      return NextResponse.json({ founder })
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Check if founder already exists
    const { data: existingFounder } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (existingFounder) {
      return NextResponse.json({ error: 'Founder profile already exists' }, { status: 400 })
    }

    // Create founder profile with type assertion
    const insertData = {
      user_id: user.id,
      email: body.email || user.email,
      full_name: body.fullName,
      phone: body.phone,
      country_of_origin: body.countryOfOrigin,
      country_of_residence: body.countryOfResidence,
    }

    const { data: founder, error } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ founder }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Admin updating another founder
    if (body.founderId) {
      const { data: adminData } = await supabase
        .from('founders')
        .select('role')
        .eq('user_id', user.id)
        .single()

      if ((adminData as FounderData | null)?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
      }

      const adminUpdate: Record<string, unknown> = {}
      if (body.status) adminUpdate.status = body.status
      if (body.tier) adminUpdate.tier = body.tier

      const { data: founder, error } = await (supabase
        .from('founders') as ReturnType<typeof supabase.from>)
        .update(adminUpdate)
        .eq('id', body.founderId)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ founder })
    }

    // User updating their own profile
    const updateData: Record<string, unknown> = {}
    if (body.fullName !== undefined) updateData.full_name = body.fullName
    if (body.phone !== undefined) updateData.phone = body.phone
    if (body.countryOfOrigin !== undefined) updateData.country_of_origin = body.countryOfOrigin
    if (body.countryOfResidence !== undefined) updateData.country_of_residence = body.countryOfResidence
    if (body.onboardingCompleted !== undefined) updateData.onboarding_completed = body.onboardingCompleted

    const { data: founder, error } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .update(updateData)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ founder })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
