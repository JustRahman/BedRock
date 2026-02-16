import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { welcomeEmail } from '@/lib/email-templates'

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 })
    }

    await sendEmail(email, 'Welcome to BedRock!', welcomeEmail(name))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
