import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'

const NOTIFY_EMAILS = [
  'rahmanbazarov4567@gmail.com',
  'rahman@bedrockhq.co',
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name } = body as { email?: string; name?: string }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { error } = await (supabase.from('waitlist') as ReturnType<typeof supabase.from>).insert({
      email: email.toLowerCase().trim(),
      name: name?.trim() || null,
    })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'already_exists' }, { status: 409 })
      }
      console.error('Waitlist insert error:', error)
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
    }

    // Notify admins
    const html = `
      <h2>New Waitlist Signup</h2>
      <p><strong>Email:</strong> ${email}</p>
      ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
      <hr />
      <p style="color: #888; font-size: 12px;">From BedRock landing page waitlist</p>
    `

    await Promise.all(
      NOTIFY_EMAILS.map((to) =>
        sendEmail(to, `Waitlist Signup — ${email}`, html)
      )
    ).catch((err) => {
      // Don't fail the request if email notification fails
      console.error('Waitlist notification email error:', err)
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
