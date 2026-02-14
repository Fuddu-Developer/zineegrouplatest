import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/** One-off test: send a real email to k613624@gmail.com. Call GET or POST /api/send-test-email */
const TEST_TO = 'k613624@gmail.com'

export async function GET() {
  return sendTestEmail()
}

export async function POST() {
  return sendTestEmail()
}

async function sendTestEmail() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'RESEND_API_KEY is not set in .env.local' },
      { status: 500 }
    )
  }

  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: TEST_TO,
      subject: 'Zineegroup – Resend test email',
      text: `This is a real email sent via Resend from your Zineegroup app.

What Resend sends in your app:
• Contact form → email to your business (CONTACT_EMAIL) with name, email, phone, message
• CIBIL form → email to your business (CIBIL_EMAIL) with name, PAN, DOB, mobile, email, city, pincode
• Loan application → email to your business (LOAN_EMAIL) with application details
• Partner form → email to your business (PARTNER_EMAIL)
• Bank application → email with application + document info

Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: String(error.message) }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${TEST_TO}. Check your inbox (and spam).`,
      id: data?.id,
    })
  } catch (e) {
    console.error('Send test email error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to send' },
      { status: 500 }
    )
  }
}
