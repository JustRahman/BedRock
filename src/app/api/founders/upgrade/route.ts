import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const authClient = await createClient()
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createServiceClient()

    // Verify current role is student
    const { data: founder } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const f = founder as { id: string; role: string }
    if (f.role !== 'student') {
      return NextResponse.json({ error: 'Only students can upgrade to founder' }, { status: 400 })
    }

    const { error: updateError } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .update({ role: 'founder' })
      .eq('id', f.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, role: 'founder' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
