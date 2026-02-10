import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

const FROM_ADDRESS = 'BedRock <noreply@bedrockhq.co>'

export async function sendEmail(to: string, subject: string, html: string) {
  const resend = getResend()
  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
  })

  if (error) {
    console.error('Failed to send email:', error)
    throw error
  }

  return data
}
