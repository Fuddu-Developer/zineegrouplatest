'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BecomePartnerPage() {
    const { t } = useLanguage()
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (submitMessage) {
            setSubmitMessage('')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('')

        try {
            const response = await fetch('/api/partner-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitMessage(t('partner.success'))
                setFormData({
                    name: '',
                    companyName: '',
                    email: '',
                    phone: '',
                    city: '',
                    message: ''
                })
            } else {
                setSubmitMessage(data.error || t('partner.error'))
            }
        } catch (error) {
            console.error('Error submitting partner form:', error)
            setSubmitMessage(t('partner.error'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="page-container">
            <Header />
            <div className="scrollable-content">
                <main className="main-body become-partner-main">
                    <aside className="sidebar left-sidebar"></aside>
                    <section className="main-content">
                        <div className="become-partner-page">
                            {/* Hero strip */}
                            <header className="partner-hero">
                                <h1 className="partner-hero-title">{t('partner.title')}</h1>
                                <p className="partner-hero-tagline">{t('partner.heroTagline')}</p>
                                <p className="partner-hero-subtitle">{t('partner.subtitle')}</p>
                            </header>

                            <div className="partner-layout">
                                {/* Left: Why partner with us */}
                                <div className="partner-side-card">
                                    <h2 className="partner-side-title">{t('partner.benefitsHeading')}</h2>
                                    <ul className="partner-benefits-list partner-benefits-list-redesign">
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit1')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit2')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit3')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit4')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit5')}</span>
                                        </li>
                                    </ul>
                                    <div className="partner-contact-block">
                                        <span className="partner-contact-label">Email us</span>
                                        <a href="mailto:info@zineegroup.com" className="partner-contact-email-link">info@zineegroup.com</a>
                                    </div>
                                    <div className="partner-social-block">
                                        <span className="partner-social-label">{t('contact.socialMedia')}</span>
                                        <div className="social-links partner-social-links">
                                            <a href="https://in.linkedin.com/company/helloans-zinee-services-pvt-ltd" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                                <Image src="/assets/social/linkedin.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                            <a href="https://www.instagram.com/helloans_zinee/?igsh=MTVmeWpiOGlkZXpseA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                                <Image src="/assets/social/instagram.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                            <a href="https://www.facebook.com/HELLOANS.ZINEE?mibextid=wwXIfr&rdid=HaXjbDNL58yjXxXo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BCucexnhL%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                                <Image src="/assets/social/facebook.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                            <a href="https://www.youtube.com/@HELLOANS_ZINEEGROUP" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                                                <Image src="/assets/social/youtube.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Form with sections */}
                                <div className="partner-form-card">
                                    <form className="partner-form-redesign" onSubmit={handleSubmit}>
                                        <div className="partner-form-section">
                                            <h3 className="partner-form-section-title">{t('partner.sectionYourDetails')}</h3>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-name">{t('partner.labelFullName')} <span className="partner-required">*</span></label>
                                                <input
                                                    id="partner-name"
                                                    type="text"
                                                    name="name"
                                                    className="partner-form-input"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Rajesh Kumar"
                                                    required
                                                />
                                            </div>
                                            <div className="partner-form-row">
                                                <div className="partner-form-field">
                                                    <label className="partner-form-label" htmlFor="partner-email">{t('partner.labelWorkEmail')} <span className="partner-required">*</span></label>
                                                    <input
                                                        id="partner-email"
                                                        type="email"
                                                        name="email"
                                                        className="partner-form-input"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="you@company.com"
                                                        required
                                                    />
                                                </div>
                                                <div className="partner-form-field">
                                                    <label className="partner-form-label" htmlFor="partner-phone">{t('partner.labelPhone')} <span className="partner-required">*</span></label>
                                                    <input
                                                        id="partner-phone"
                                                        type="tel"
                                                        name="phone"
                                                        className="partner-form-input"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="10-digit mobile"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="partner-form-section">
                                            <h3 className="partner-form-section-title">{t('partner.sectionBusiness')}</h3>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-company">{t('partner.labelCompanyOrBusiness')} <span className="partner-required">*</span></label>
                                                <input
                                                    id="partner-company"
                                                    type="text"
                                                    name="companyName"
                                                    className="partner-form-input"
                                                    value={formData.companyName}
                                                    onChange={handleChange}
                                                    placeholder="Your company or business name"
                                                    required
                                                />
                                            </div>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-city">{t('partner.labelCity')} <span className="partner-required">*</span></label>
                                                <input
                                                    id="partner-city"
                                                    type="text"
                                                    name="city"
                                                    className="partner-form-input"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    placeholder="City"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="partner-form-section">
                                            <h3 className="partner-form-section-title">{t('partner.sectionGoals')}</h3>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-message">{t('partner.labelTellUsMore')} <span className="partner-required">*</span></label>
                                                <textarea
                                                    id="partner-message"
                                                    name="message"
                                                    className="partner-form-textarea"
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="e.g. I’d like to refer customers for personal loans and earn commission."
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {submitMessage && (
                                            <div className={`partner-submit-message ${submitMessage.includes('wrong') || submitMessage.includes('error') ? 'error' : 'success'}`}>
                                                {submitMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="partner-submit-btn"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? t('partner.submitting') : t('partner.submit')}
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
