import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

const NOTIFY_EMAILS = [
  'rahmanbazarov4567@gmail.com',
  'rahman@bedrockhq.co',
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, description } = body as { email?: string; description?: string }

    if (!email || !description) {
      return NextResponse.json({ error: 'Email and description are required' }, { status: 400 })
    }

    const html = `
      <h2>New Research Partner Application</h2>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p><strong>Description:</strong></p>
      <p>${description.replace(/\n/g, '<br />')}</p>
      <hr />
      <p style="color: #888; font-size: 12px;">Sent from BedRock pricing page</p>
    `

    await Promise.all(
      NOTIFY_EMAILS.map((to) =>
        sendEmail(to, `Research Partner Application — ${email}`, html)
      )
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Research apply error:', err)
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 })
  }
}
