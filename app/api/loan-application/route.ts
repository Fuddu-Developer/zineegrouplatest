import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, loanType, loanAmount, employmentStatus, monthlyIncome, city, pincode, message } = body

    // Validate required fields
    if (!name || !email || !phone || !loanAmount || !message || !loanType || !employmentStatus || !monthlyIncome || !city || !pincode) {
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

    // Validate phone number (basic validation for Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10 || cleanPhone.length > 10) {
      return NextResponse.json(
        { error: 'Invalid phone number. Please enter a valid 10-digit phone number.' },
        { status: 400 }
      )
    }

    // Validate loan amount
    const amount = parseFloat(loanAmount)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid loan amount' },
        { status: 400 }
      )
    }

    // Validate monthly income
    const income = parseFloat(monthlyIncome)
    if (isNaN(income) || income <= 0) {
      return NextResponse.json(
        { error: 'Invalid monthly income' },
        { status: 400 }
      )
    }

    // Validate pincode (6 digits)
    const pincodeRegex = /^\d{6}$/
    if (!pincodeRegex.test(pincode)) {
      return NextResponse.json(
        { error: 'Invalid pincode. Please enter a valid 6-digit pincode.' },
        { status: 400 }
      )
    }

    // Email configuration
    const recipientEmail = process.env.LOAN_EMAIL || 'info@zineegroup.com'
    const subject = `New Loan Application from ${name}`
    
    // Map loan type to readable format
    const loanTypeMap: { [key: string]: string } = {
      'personal-loan': 'Personal Loan',
      'business-loan': 'Business Loan',
      'instant-loan': 'Instant Loan',
      'professional-loan': 'Professional Loan',
      'secure-loan': 'Secure Loan',
      'balance-transfer': 'Balance Transfer'
    }

    const loanTypeLabel = loanTypeMap[loanType] || loanType

    // Map employment status to readable format
    const employmentMap: { [key: string]: string } = {
      'salaried': 'Salaried',
      'self-employed': 'Self Employed',
      'business-owner': 'Business Owner',
      'professional': 'Professional',
      'retired': 'Retired',
      'student': 'Student'
    }

    const employmentLabel = employmentMap[employmentStatus] || employmentStatus
    
    // Create email body
    const emailBody = `
New Loan Application

Personal Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city}
Pincode: ${pincode}

Loan Details:
Loan Type: ${loanTypeLabel}
Loan Amount: ₹${amount.toLocaleString('en-IN')}

Employment Information:
Employment Status: ${employmentLabel}
Monthly Income: ₹${income.toLocaleString('en-IN')}

Loan Requirements:
${message}

---
This loan application was submitted through the website application form.
Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `.trim()

    // Log the loan application (for development)
    // In production, integrate with an email service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Resend
    // - AWS SES
    // - Mailgun
    
    console.log('Loan application received:', {
      to: recipientEmail,
      subject,
      body: emailBody
    })

    // Example: If using nodemailer, uncomment and configure:
    /*
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || email,
      to: recipientEmail,
      subject: subject,
      text: emailBody,
    })
    */

    // For development/testing, you can also use a service like Resend:
    /*
    const resend = require('resend')
    const resendClient = new resend.Resend(process.env.RESEND_API_KEY)
    
    await resendClient.emails.send({
      from: 'onboarding@resend.dev',
      to: recipientEmail,
      subject: subject,
      text: emailBody,
    })
    */

    return NextResponse.json(
      { message: 'Loan application submitted successfully. Our team will contact you within 24 hours.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing loan application:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
