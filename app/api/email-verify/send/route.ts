import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { setEmailCode, isValidEmail } from '@/lib/email-verify-store'

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body.email ?? '').trim()

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const code = generateCode()
    setEmailCode(email, code)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your verification code – Zineegroup',
      text: `Your email verification code is: ${code}\n\nThis code is valid for 10 minutes. If you didn't request this, please ignore this email.\n\n— Zineegroup`,
    })

    if (error) {
      console.error('Email verify send error:', error)
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: 'Verification code sent to your email.' })
  } catch (e) {
    console.error('Email verify send error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
