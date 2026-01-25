'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CibilScorePage() {
  const { t } = useLanguage()
  
  return (
    <>
      <Header />
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
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V12M12 16H12.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{t('cibil.securityMessage')}</span>
                </div>
              </div>

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

                    {/* Duplicate cards for seamless loop */}
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

              {/* Benefits Section */}
              <section className="cibil-content-section">
                <h2 className="cibil-section-title">{t('cibil.benefitsTitle')}</h2>
                <p className="cibil-section-text">
                  {t('cibil.benefitsText1')}
                </p>
                <p className="cibil-section-text">
                  {t('cibil.benefitsText2')}
                </p>
              </section>

              {/* Fastest Way to Build Credit Section */}
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

              {/* Why Zineegroup Section */}
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

              {/* CTA Section */}
              <section className="cibil-cta-section">
                <h2 className="cibil-cta-title">{t('cibil.ctaTitle')}</h2>
                <p className="cibil-cta-text">{t('cibil.ctaText')}</p>
                <a href="/loans/personal-loans" className="cibil-cta-button">{t('nav.apply')}</a>
                <p className="cibil-cta-note">
                  {t('cibil.ctaNote')}
                </p>
              </section>
            </div>
          </div>
        </section>
        <aside className="sidebar right-sidebar"></aside>
      </main>
      <Footer />
    </>
  )
}
