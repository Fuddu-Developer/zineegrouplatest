'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Features() {
  const { t } = useLanguage()
  
  const features = [
    {
      className: 'feature-box-blue',
      icon: (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 7V12C4 16.55 6.16 20.74 9.5 22.29C10.18 22.63 10.94 22.63 11.62 22.29C14.86 20.74 17 16.55 17 12V7L12 2Z" fill="#3b82f6"/>
          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('features.personalPrivacy'),
      description: t('features.personalPrivacyDesc'),
    },
    {
      className: 'feature-box-light-blue',
      icon: (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="20" height="12" rx="2" fill="#60a5fa"/>
          <rect x="6" y="10" width="12" height="2" fill="white"/>
        </svg>
      ),
      title: t('features.noPayment'),
      description: t('features.noPaymentDesc'),
    },
    {
      className: 'feature-box-green',
      icon: (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('features.easyAccess'),
      description: t('features.easyAccessDesc'),
    },
  ]

  return (
    <section className="features-section" id="about">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className={`feature-box ${feature.className}`}>
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
