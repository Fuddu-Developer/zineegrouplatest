import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, panNumber, dob, mobileNumber, email, city, pincode } = body

    // Validate required fields
    if (!name || !panNumber || !dob || !mobileNumber || !email || !city || !pincode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate PAN format (e.g. ABCDE1234F - 5 letters, 4 digits, 1 letter)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    const panUpper = String(panNumber).trim().toUpperCase()
    if (!panRegex.test(panUpper)) {
      return NextResponse.json(
        { error: 'Invalid PAN number. Format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F).' },
        { status: 400 }
      )
    }

    // Validate mobile number (Indian 10-digit)
    const cleanPhone = String(mobileNumber).replace(/\D/g, '')
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid mobile number. Please enter a valid 10-digit number.' },
        { status: 400 }
      )
    }

    // Validate pincode (6 digits)
    const pincodeRegex = /^\d{6}$/
    if (!pincodeRegex.test(String(pincode).trim())) {
      return NextResponse.json(
        { error: 'Invalid pincode. Please enter a valid 6-digit pincode.' },
        { status: 400 }
      )
    }

    const recipientEmail = process.env.LOAN_EMAIL || process.env.CIBIL_EMAIL || 'info@zineegroup.com'
    const subject = `CIBIL Score Enquiry from ${name}`

    const emailBody = `
CIBIL Score Enquiry

Name (as per PAN): ${name}
PAN Number: ${panUpper}
Date of Birth: ${dob}
Mobile Number: +91 ${cleanPhone}
Email: ${email}
City: ${city}
Pincode: ${pincode}

---
Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `.trim()

    console.log('CIBIL application received:', {
      to: recipientEmail,
      subject,
      body: emailBody
    })

    return NextResponse.json(
      { message: 'Your CIBIL score enquiry has been submitted. We will contact you via email.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing CIBIL application:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
