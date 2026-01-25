'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutUsPage() {
  const { t } = useLanguage()
  
  return (
    <>
      <Header />
      <main className="main-body">
        <aside className="sidebar left-sidebar"></aside>
        <section className="main-content">
          <div className="content-wrapper">
            <div className="about-page-container">
              {/* Header Section */}
              <div className="about-header">
                <h1 className="about-title">{t('about.title')}</h1>
                <p className="about-subtitle">{t('about.subtitle')}</p>
                <Link href="/contact" className="about-header-button">
                  {t('about.learnMore')}
                </Link>
              </div>

              {/* Main Content Section */}
              <div className="about-main-content">
                <div className="about-intro">
                  <p className="about-text">
                    {t('about.intro1')}
                  </p>
                  <p className="about-text">
                    {t('about.intro2')}
                  </p>
                  <p className="about-text">
                    {t('about.intro3')}
                  </p>
                  <div className="about-cta">
                    <Link href="/apply-for-loan" className="about-cta-button">
                      {t('nav.apply')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Loan Types Section */}
              <div className="about-loan-types">
                <h2 className="about-section-title">{t('about.loanTypes')}</h2>
                <h3 className="about-section-subtitle">{t('about.loanTypesSubtitle')}</h3>
                <div className="loan-types-grid">
                  <Link href="/loans/instant-loan" className="loan-type-card loan-type-card-yellow">
                    <div className="loan-type-icon-wrapper">
                      <svg className="loan-type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="loan-type-title">{t('about.instantLoan')}</h4>
                  </Link>
                  <Link href="/loans/personal-loans" className="loan-type-card loan-type-card-blue">
                    <div className="loan-type-icon-wrapper">
                      <svg className="loan-type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="loan-type-title">{t('about.personalLoans')}</h4>
                  </Link>
                  <Link href="/loans/business-loans" className="loan-type-card loan-type-card-purple">
                    <div className="loan-type-icon-wrapper">
                      <svg className="loan-type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 21V7L13 2L21 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="loan-type-title">{t('about.businessLoans')}</h4>
                  </Link>
                  <Link href="/loans/professional-loans" className="loan-type-card loan-type-card-teal">
                    <div className="loan-type-icon-wrapper">
                      <svg className="loan-type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="loan-type-title">{t('about.professionalLoans')}</h4>
                  </Link>
                  <Link href="/loans/secure-loans" className="loan-type-card loan-type-card-green">
                    <div className="loan-type-icon-wrapper">
                      <svg className="loan-type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="loan-type-title">{t('about.secureLoans')}</h4>
                  </Link>
                  <Link href="/loans/balance-transfer" className="loan-type-card loan-type-card-indigo">
                    <div className="loan-type-icon-wrapper">
                      <svg className="loan-type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16L8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="loan-type-title">{t('about.balanceTransfer')}</h4>
                  </Link>
                </div>
              </div>

              {/* Why Choose Us Section */}
              <div className="about-why-choose">
                <h2 className="about-section-title">{t('about.whyChoose')}</h2>
                <p className="about-why-subtitle">{t('about.whyChooseSubtitle')}</p>
                <p className="about-why-text">{t('about.whyChooseText')}</p>
                <div className="why-choose-grid">
                  <div className="why-choose-card">
                    <div className="why-choose-icon-wrapper">
                      <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="why-choose-title">{t('about.professionalService')}</h4>
                  </div>
                  <div className="why-choose-card">
                    <div className="why-choose-icon-wrapper">
                      <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="why-choose-title">{t('about.ultraFastSupport')}</h4>
                  </div>
                  <div className="why-choose-card">
                    <div className="why-choose-icon-wrapper">
                      <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="why-choose-title">{t('about.lowInterestLoan')}</h4>
                  </div>
                  <div className="why-choose-card">
                    <div className="why-choose-icon-wrapper">
                      <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="why-choose-title">{t('about.available24x7')}</h4>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="about-cta-section">
                <h2 className="about-cta-title">{t('about.ctaTitle')}</h2>
                <p className="about-cta-text">{t('about.ctaText')}</p>
                <p className="about-cta-description">{t('about.ctaDescription')}</p>
                <Link href="/apply-for-loan" className="about-cta-button-large">
                  {t('nav.apply')}
                </Link>
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
