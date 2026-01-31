'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function ApplyForLoanPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanType: '',
    loanAmount: '',
    employmentStatus: '',
    monthlyIncome: '',
    city: '',
    pincode: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear message when user starts typing
    if (submitMessage) {
      setSubmitMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/loan-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Success! Your loan application has been submitted. Our team will contact you within 24 hours.')
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          loanType: '',
          loanAmount: '',
          employmentStatus: '',
          monthlyIncome: '',
          city: '',
          pincode: '',
          message: ''
        })
      } else {
        setSubmitMessage(data.error || 'There was an error submitting your application. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting loan application:', error)
      setSubmitMessage('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="main-body">
        <aside className="sidebar left-sidebar"></aside>
        <section className="main-content">
          <div className="contact-page-container">
              {/* Header Section */}
              <div className="contact-header">
                <h1 className="contact-title">Apply Now</h1>
                <p className="contact-intro">Get instant loan approval with competitive interest rates! Fill out the form below and our team will contact you within 24 hours.</p>
                <div className="loan-benefits">
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Quick Approval</span>
                  </div>
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Low Interest Rates</span>
                  </div>
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Minimal Documentation</span>
                  </div>
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Flexible Repayment</span>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="contact-content-grid">
                {/* Left Column - Contact Methods */}
                <div className="contact-methods">
                  {/* Phone Contact Box */}
                  <div className="contact-box phone-box">
                    <div className="contact-box-header">
                      <svg className="contact-box-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="contact-box-label">Call Us Directly At</span>
                    </div>
                    <div className="contact-box-value">+91 9540 185 185</div>
                    <a
                      href="tel:+919540185185"
                      className="contact-box-button phone-button"
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                    >
                      Talk to an Expert
                    </a>
                  </div>

                  {/* Email Contact Box */}
                  <div className="contact-box email-box">
                    <div className="contact-box-header">
                      <svg className="contact-box-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M21 15L13.5 9.75C13.1022 9.41667 12.5511 9.41667 12.1533 9.75L4.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="contact-box-label">Chat With Our Team</span>
                    </div>
                    <div className="contact-box-value email-value">info@zineegroup.com</div>
                    <a
                      href="mailto:info@zineegroup.com"
                      className="contact-box-button email-button"
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                    >
                      Talk to an Expert
                    </a>
                  </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="contact-form-wrapper">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="form-section-header">
                      <h3 className="form-section-title">Personal Information</h3>
                    </div>

                    {/* Name Field */}
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <div className="form-input-wrapper">
                        <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          className="form-input"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email and Phone Row */}
                    <div className="form-row">
                      {/* Email Field */}
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="email"
                            name="email"
                            placeholder="your.email@example.com"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="10-digit mobile number"
                            className="form-input"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={10}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* City and Pincode Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">City *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="text"
                            name="city"
                            placeholder="Enter your city"
                            className="form-input"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Pincode *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="text"
                            name="pincode"
                            placeholder="6-digit pincode"
                            className="form-input"
                            value={formData.pincode}
                            onChange={handleChange}
                            maxLength={6}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Loan Information Section */}
                    <div className="form-section-header">
                      <h3 className="form-section-title">Loan Information</h3>
                    </div>

                    {/* Loan Type and Amount Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Loan Type *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <select
                            name="loanType"
                            className="form-input form-select"
                            value={formData.loanType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select loan type</option>
                            <option value="personal-loan">Personal Loan</option>
                            <option value="business-loan">Business Loan</option>
                            <option value="instant-loan">Instant Loan</option>
                            <option value="professional-loan">Professional Loan</option>
                            <option value="secure-loan">Secure Loan</option>
                            <option value="balance-transfer">Balance Transfer</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Loan Amount (₹) *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="number"
                            name="loanAmount"
                            placeholder="Enter loan amount"
                            className="form-input"
                            value={formData.loanAmount || ''}
                            onChange={handleChange}
                            min="10000"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Employment Information Section */}
                    <div className="form-section-header">
                      <h3 className="form-section-title">Employment Information</h3>
                    </div>

                    {/* Employment Status and Monthly Income Row */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Employment Status *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <select
                            name="employmentStatus"
                            className="form-input form-select"
                            value={formData.employmentStatus}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select employment status</option>
                            <option value="salaried">Salaried</option>
                            <option value="self-employed">Self Employed</option>
                            <option value="business-owner">Business Owner</option>
                            <option value="professional">Professional</option>
                            <option value="retired">Retired</option>
                            <option value="student">Student</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Monthly Income (₹) *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="number"
                            name="monthlyIncome"
                            placeholder="Enter monthly income"
                            className="form-input"
                            value={formData.monthlyIncome || ''}
                            onChange={handleChange}
                            min="0"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="form-section-header">
                      <h3 className="form-section-title">Additional Information</h3>
                    </div>

                    {/* Message Field */}
                    <div className="form-group">
                      <label className="form-label">Tell us about your loan requirements *</label>
                      <textarea
                        name="message"
                        placeholder="Please provide details about your loan purpose, preferred tenure, or any specific requirements..."
                        className="form-textarea"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                      <div className={`submit-message ${submitMessage.includes('error') || submitMessage.includes('Error') ? 'error' : 'success'}`}>
                        {submitMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className="form-submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Apply Now'}
                    </button>
                  </form>
                </div>
              </div>
          </div>
        </section>
        <aside className="sidebar right-sidebar"></aside>
      </main>
      <Footer />
    </>
  )
}
