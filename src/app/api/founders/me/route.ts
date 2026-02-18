import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const authClient = await createClient()
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createServiceClient()
    const { data: founder } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .select('id, role, full_name')
      .eq('user_id', user.id)
      .single()

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    return NextResponse.json(founder)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
