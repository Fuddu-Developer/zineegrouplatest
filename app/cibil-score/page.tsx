'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CibilScorePage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    panNumber: '',
    dob: '',
    mobileNumber: '',
    email: '',
    city: '',
    pincode: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'panNumber') {
      setFormData({ ...formData, [name]: value.toUpperCase() })
    } else if (name === 'mobileNumber' && value.length <= 10) {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '') })
    } else if (name !== 'mobileNumber') {
      setFormData({ ...formData, [name]: value })
    }
    if (submitMessage) setSubmitMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    try {
      const response = await fetch('/api/cibil-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        setSubmitMessage(t('cibil.formSuccess') || 'Your CIBIL score enquiry has been submitted. We will contact you via email.')
        setFormData({
          name: '',
          panNumber: '',
          dob: '',
          mobileNumber: '',
          email: '',
          city: '',
          pincode: ''
        })
      } else {
        setSubmitMessage(data.error || 'There was an error. Please try again.')
      }
    } catch {
      setSubmitMessage('There was an error submitting. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <Header />
      <div className="scrollable-content">
        <main className="main-body">
          <aside className="sidebar left-sidebar"></aside>
          <section className="main-content">
            <div className="content-wrapper">
              <div className="cibil-page-container">
                {/* Hero Section */}
                <div className="cibil-hero-section">
                  <h1 className="cibil-hero-title">{t('cibil.heroTitle')}</h1>
                  <p className="cibil-hero-subtitle">{t('cibil.heroSubtitle')}</p>

                  {/* Security Message */}
                  <div className="cibil-security-message">
                    <svg className="security-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 8V12M12 16H12.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{t('cibil.securityMessage')}</span>
                  </div>
                </div>

                {/* Apply Now Form Section */}
                <section className="cibil-cta-section cibil-form-section" style={{ marginBottom: '40px' }}>
                  <h2 className="cibil-cta-title">{t('cibil.ctaTitle')}</h2>
                  <p className="cibil-cta-text">{t('cibil.ctaText')}</p>
                  <div className="cibil-form-wrapper">
                    <form className="contact-form cibil-form" onSubmit={handleSubmit}>
                      <div className="form-section-header">
                        <h3 className="form-section-title">{t('nav.apply')} – CIBIL Score</h3>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('cibil.formNameLabel') || 'Enter name as per Pan Card'} <span className="text-red-500">*</span></label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input
                            type="text"
                            name="name"
                            placeholder={t('cibil.formNamePlaceholder') || 'Name as per PAN Card'}
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('cibil.formPanLabel') || 'PAN Number'} <span className="text-red-500">*</span></label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input
                            type="text"
                            name="panNumber"
                            placeholder="e.g. ABCDE1234F"
                            className="form-input"
                            value={formData.panNumber}
                            onChange={handleChange}
                            maxLength={10}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('cibil.formDobLabel') || 'Date of Birth'} <span className="text-red-500">*</span></label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input
                            type="date"
                            name="dob"
                            className="form-input"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t('cibil.formMobileLabel') || 'Mobile Number'} <span className="text-red-500">*</span></label>
                          <div className="form-input-wrapper">
                            <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                              type="tel"
                              name="mobileNumber"
                              placeholder="10-digit mobile"
                              className="form-input"
                              value={formData.mobileNumber}
                              onChange={handleChange}
                              maxLength={10}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">{t('cibil.formEmailLabel') || 'Email ID'} <span className="text-red-500">*</span></label>
                          <div className="form-input-wrapper">
                            <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">{t('cibil.formCityLabel') || 'City'} <span className="text-red-500">*</span></label>
                          <div className="form-input-wrapper">
                            <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                              type="text"
                              name="city"
                              placeholder={t('cibil.formCityPlaceholder') || 'Enter city'}
                              className="form-input"
                              value={formData.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">{t('cibil.formPincodeLabel') || 'Pincode'} <span className="text-red-500">*</span></label>
                          <div className="form-input-wrapper">
                            <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

                      {submitMessage && (
                        <p className={`form-message ${submitMessage.includes('error') || submitMessage.includes('Invalid') ? 'form-message-error' : 'form-message-success'}`}>
                          {submitMessage}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cibil-cta-button form-submit-button"
                      >
                        {isSubmitting ? (t('cibil.formSubmitting') || 'Submitting...') : (t('nav.apply') || 'Apply Now')}
                      </button>
                    </form>
                  </div>
                  <p className="cibil-cta-note">
                    {t('cibil.ctaNote')}
                  </p>
                  <p className="cibil-contact-email-only">
                    {t('cibil.contactEmailOnly') || 'We will contact you only via email for your CIBIL score enquiry.'}
                  </p>
                </section>

                {/* Features Grid */}
                <div className="cibil-features-grid">
                  <div className="cibil-feature-card">
                    <h3>{t('about.professionalService')}</h3>
                  </div>
                  <div className="cibil-feature-card">
                    <h3>{t('about.ultraFastSupport')}</h3>
                  </div>
                  <div className="cibil-feature-card">
                    <h3>{t('about.lowInterestLoan')}</h3>
                  </div>
                </div>

                {/* What is a Credit Score Section */}
                <section className="cibil-content-section">
                  <h2 className="cibil-section-title">{t('cibil.whatIsCreditScore')}</h2>
                  <p className="cibil-section-text">
                    {t('cibil.whatIsCreditScoreText1')}
                  </p>
                  <p className="cibil-section-text">
                    {t('cibil.whatIsCreditScoreText2')}
                  </p>
                </section>

                {/* Credit Score Range Section */}
                <section className="cibil-content-section">
                  <h2 className="cibil-section-title">{t('cibil.creditScoreRange')}</h2>
                  <p className="cibil-section-text">
                    {t('cibil.creditScoreRangeText')}
                  </p>

                  <div className="cibil-score-ranges-grid">
                    <div className="cibil-score-ranges-track">
                      {/* Range cards omitted for brevity in search/replace, but they remain */}
                      <div className="score-range-card score-bad">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.badCredit')}</span>
                          <span className="score-range-value">{t('cibil.badCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.badCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-poor">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.poorCredit')}</span>
                          <span className="score-range-value">{t('cibil.poorCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.poorCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-fair">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.fairCredit')}</span>
                          <span className="score-range-value">{t('cibil.fairCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.fairCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-good">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.goodCredit')}</span>
                          <span className="score-range-value">{t('cibil.goodCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.goodCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-excellent">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.excellentCredit')}</span>
                          <span className="score-range-value">{t('cibil.excellentCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.excellentCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-bad">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.badCredit')}</span>
                          <span className="score-range-value">{t('cibil.badCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.badCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-poor">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.poorCredit')}</span>
                          <span className="score-range-value">{t('cibil.poorCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.poorCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-fair">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.fairCredit')}</span>
                          <span className="score-range-value">{t('cibil.fairCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.fairCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-good">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.goodCredit')}</span>
                          <span className="score-range-value">{t('cibil.goodCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.goodCreditDesc')}</p>
                      </div>

                      <div className="score-range-card score-excellent">
                        <div className="score-range-header">
                          <span className="score-range-label">{t('cibil.excellentCredit')}</span>
                          <span className="score-range-value">{t('cibil.excellentCreditRange')}</span>
                        </div>
                        <p className="score-range-description">{t('cibil.excellentCreditDesc')}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="cibil-content-section">
                  <h2 className="cibil-section-title">{t('cibil.benefitsTitle')}</h2>
                  <p className="cibil-section-text">
                    {t('cibil.benefitsText1')}
                  </p>
                  <p className="cibil-section-text">
                    {t('cibil.benefitsText2')}
                  </p>
                </section>

                <section className="cibil-content-section">
                  <h2 className="cibil-section-title">{t('cibil.buildCreditTitle')}</h2>
                  <p className="cibil-section-text">
                    {t('cibil.buildCreditText')}
                  </p>

                  <div className="cibil-tips-grid">
                    <div className="cibil-tip-card">
                      <div className="tip-icon">✓</div>
                      <h4 className="tip-title">{t('cibil.payOnTime')}</h4>
                      <p className="tip-description">{t('cibil.payOnTimeDesc')}</p>
                    </div>

                    <div className="cibil-tip-card">
                      <div className="tip-icon">✓</div>
                      <h4 className="tip-title">{t('cibil.limitInquiries')}</h4>
                      <p className="tip-description">{t('cibil.limitInquiriesDesc')}</p>
                    </div>

                    <div className="cibil-tip-card">
                      <div className="tip-icon">✓</div>
                      <h4 className="tip-title">{t('cibil.payDownBalances')}</h4>
                      <p className="tip-description">{t('cibil.payDownBalancesDesc')}</p>
                    </div>

                    <div className="cibil-tip-card">
                      <div className="tip-icon">✓</div>
                      <h4 className="tip-title">{t('cibil.consolidateDebt')}</h4>
                      <p className="tip-description">{t('cibil.consolidateDebtDesc')}</p>
                    </div>

                    <div className="cibil-tip-card">
                      <div className="tip-icon">✓</div>
                      <h4 className="tip-title">{t('cibil.authorizedUser')}</h4>
                      <p className="tip-description">{t('cibil.authorizedUserDesc')}</p>
                    </div>

                    <div className="cibil-tip-card">
                      <div className="tip-icon">✓</div>
                      <h4 className="tip-title">{t('cibil.keepOldAccounts')}</h4>
                      <p className="tip-description">{t('cibil.keepOldAccountsDesc')}</p>
                    </div>

                    <div className="cibil-tip-card">
                      <div className="tip-icon">✓</div>
                      <h4 className="tip-title">{t('cibil.securedLoans')}</h4>
                      <p className="tip-description">{t('cibil.securedLoansDesc')}</p>
                    </div>
                  </div>
                </section>

                <section className="cibil-content-section cibil-why-section">
                  <h2 className="cibil-section-title">{t('cibil.whyZineegroup')}</h2>

                  <div className="cibil-benefits-grid">
                    <div className="cibil-benefit-card">
                      <h3 className="benefit-title">{t('cibil.unlockDeals')}</h3>
                      <p className="benefit-description">
                        {t('cibil.unlockDealsDesc')}
                      </p>
                    </div>

                    <div className="cibil-benefit-card">
                      <h3 className="benefit-title">{t('cibil.effortlessCheck')}</h3>
                      <p className="benefit-description">
                        {t('cibil.effortlessCheckDesc')}
                      </p>
                    </div>

                    <div className="cibil-benefit-card">
                      <h3 className="benefit-title">{t('cibil.simplifiedInsights')}</h3>
                      <p className="benefit-description">
                        {t('cibil.simplifiedInsightsDesc')}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
          <aside className="sidebar right-sidebar"></aside>
        </main>
        <Footer />
      </div>
    </div>
  )
}
