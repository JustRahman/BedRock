function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:24px;font-weight:bold;color:#1e40af;">Bedrock</span>
    </div>
    <div style="background:#ffffff;border-radius:8px;padding:32px;border:1px solid #e5e7eb;">
      ${content}
    </div>
    <div style="text-align:center;margin-top:32px;color:#9ca3af;font-size:12px;">
      <p>&copy; ${new Date().getFullYear()} Bedrock. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
}

export function welcomeEmail(name: string): string {
  return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Welcome to Bedrock, ${name}!</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Your account has been created. You're now on your way to getting a US business bank account.
    </p>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Here's what to do next:
    </p>
    <ol style="margin:0 0 24px;padding-left:20px;color:#4b5563;line-height:1.8;">
      <li>Choose a plan that fits your needs</li>
      <li>Start the LLC formation process</li>
      <li>Apply for your US bank account</li>
    </ol>
    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        Go to Dashboard
      </a>
    </div>
  `)
}

export function paymentConfirmationEmail(name: string, tier: string, amount: number): string {
  const tierName = tier.charAt(0).toUpperCase() + tier.slice(1)
  return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Payment Confirmed</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${name}, your payment has been processed successfully.
    </p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:16px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-weight:600;color:#166534;">Payment Details</p>
      <p style="margin:0;color:#4b5563;">Plan: <strong>${tierName}</strong></p>
      <p style="margin:0;color:#4b5563;">Amount: <strong>$${amount.toFixed(2)}</strong></p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Your account is now active. You can begin the LLC formation process from your dashboard.
    </p>
    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/formation"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        Start LLC Formation
      </a>
    </div>
  `)
}

export function complianceReminderEmail(name: string, deadline: string): string {
  return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Compliance Reminder</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${name}, you have an upcoming compliance deadline:
    </p>
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:16px;margin:0 0 24px;">
      <p style="margin:0;font-weight:600;color:#92400e;">${deadline}</p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Please review your compliance dashboard and take action before the deadline.
    </p>
    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/compliance"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        View Compliance Dashboard
      </a>
    </div>
  `)
}

export function trustScoreEmail(name: string, score: number, status: string): string {
  const statusColors: Record<string, { bg: string; border: string; text: string }> = {
    elite: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
    approved: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
    review_needed: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
    conditional: { bg: '#fff7ed', border: '#fed7aa', text: '#9a3412' },
    not_eligible: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
  }
  const colors = statusColors[status] || statusColors.review_needed

  const statusLabel = status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return baseTemplate(`
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Your Trust Score is Ready</h1>
    <p style="margin:0 0 16px;color:#4b5563;line-height:1.6;">
      Hi ${name}, your trust score has been calculated.
    </p>
    <div style="text-align:center;margin:0 0 24px;">
      <div style="display:inline-block;width:100px;height:100px;line-height:100px;border-radius:50%;background:${colors.bg};border:3px solid ${colors.border};font-size:32px;font-weight:bold;color:${colors.text};">
        ${score}
      </div>
      <p style="margin:8px 0 0;font-weight:600;color:${colors.text};">${statusLabel}</p>
    </div>
    <p style="margin:0 0 24px;color:#4b5563;line-height:1.6;">
      Log in to your dashboard to see the full breakdown and next steps.
    </p>
    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:500;">
        View Dashboard
      </a>
    </div>
  `)
}
