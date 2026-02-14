import { NextRequest, NextResponse } from 'next/server'
import { consumeEmailCode, isValidEmail } from '@/lib/email-verify-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body.email ?? '').trim()
    const code = String(body.code ?? '').trim()

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    if (!code || code.length !== 6) {
      return NextResponse.json(
        { error: 'Please enter the 6-digit code from your email.' },
        { status: 400 }
      )
    }

    const valid = consumeEmailCode(email, code)
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid or expired code. Please request a new one.' },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: 'Email verified.' })
  } catch (e) {
    console.error('Email verify error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
