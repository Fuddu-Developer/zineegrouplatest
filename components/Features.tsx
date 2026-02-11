'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Features() {
  const { t } = useLanguage()

  const features = [
    {
      className: 'feature-box-blue',
      backLine1Key: 'features.offer1BackLine1',
      backLine2Key: 'features.offer1BackLine2',
      icon: (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 7V12C4 16.55 6.16 20.74 9.5 22.29C10.18 22.63 10.94 22.63 11.62 22.29C14.86 20.74 17 16.55 17 12V7L12 2Z" fill="#3b82f6" />
          <path d="M12 11V15M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: t('features.offer1Title'),
      description: t('features.offer1Desc'),
    },
    {
      className: 'feature-box-light-blue',
      backLine1Key: 'features.offer2BackLine1',
      backLine2Key: 'features.offer2BackLine2',
      icon: (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="20" height="12" rx="2" fill="#60a5fa" />
          <path d="M7 12H17M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: t('features.offer2Title'),
      description: t('features.offer2Desc'),
    },
    {
      className: 'feature-box-green',
      backLine1Key: 'features.promiseBackLine1',
      backLine2Key: 'features.promiseBackLine2',
      icon: (
        <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 4L12 14.01l-3-3" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: t('features.promiseTitle'),
      description: t('features.promiseDesc'),
    },
  ]

  return (
    <section className="features-section" id="about">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-card-inner">
              <div className={`feature-box feature-box-front ${feature.className}`}>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className={`feature-box feature-box-back ${feature.className}`}>
                <p className="feature-back-text">{t(feature.backLine1Key)}</p>
                <span className="feature-back-label">{t(feature.backLine2Key)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
