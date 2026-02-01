'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage(t('contact.success'))
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        setSubmitMessage(data.error || t('contact.error'))
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitMessage(t('contact.error'))
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
            <div className="contact-us-container">
              <div className="contact-us-grid">
                {/* Left Column - Contact Information */}
                <div className="contact-info-column">
                  <h1 className="contact-heading">{t('contact.getInTouch')}</h1>

                  <div className="contact-details">
                    <div className="contact-detail-item">
                      <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <a href="tel:+919540185185" className="contact-link">+91 9540 185 185</a>
                    </div>

                    <div className="contact-detail-item">
                      <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <a href="mailto:info@zineegroup.com" className="contact-link">info@zineegroup.com</a>
                    </div>
                  </div>

                  <h2 className="social-heading">{t('contact.socialMedia')}</h2>
                  <div className="social-links">
                    <a href="https://in.linkedin.com/company/zineegroup" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image
                        src="/assets/social/linkedin.png"
                        alt="LinkedIn"
                        width={40}
                        height={40}
                        className="social-icon-img"
                      />
                    </a>
                    <a href="https://www.instagram.com/helloans_zinee/?igsh=MTVmeWpiOGlkZXpseA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image
                        src="/assets/social/instagram.png"
                        alt="Instagram"
                        width={40}
                        height={40}
                        className="social-icon-img"
                      />
                    </a>
                    <a href="https://www.facebook.com/HELLOANS.ZINEE?mibextid=wwXIfr&rdid=HaXjbDNL58yjXxXo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BCucexnhL%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image
                        src="/assets/social/facebook.png"
                        alt="Facebook"
                        width={40}
                        height={40}
                        className="social-icon-img"
                      />
                    </a>
                    <a href="https://www.youtube.com/@HELLOANS_ZINEEGROUP" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image
                        src="/assets/social/youtube.png"
                        alt="YouTube"
                        width={40}
                        height={40}
                        className="social-icon-img"
                      />
                    </a>
                  </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="contact-form-column">
                  <form className="contact-us-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                      <label className="form-label">{t('contact.name')} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        placeholder={t('contact.name')}
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-label">{t('contact.email')} <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        placeholder={t('contact.email')}
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-label">{t('contact.phone')} <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t('contact.phone')}
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label className="form-label">{t('contact.message')} <span className="text-red-500">*</span></label>
                      <textarea
                        name="message"
                        placeholder={t('contact.message')}
                        className="form-textarea"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {submitMessage && (
                      <div className={`submit-message ${submitMessage.includes('error') || submitMessage.includes('Error') ? 'error' : 'success'}`}>
                        {submitMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('contact.submitting') : t('contact.submit')}
                    </button>
                  </form>
                </div>
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
