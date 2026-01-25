'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function TrustSection() {
  const { t } = useLanguage()
  
  const trustCards = [
    {
      className: 'trust-card-purple',
      icon: (
        <svg className="trust-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stack of green banknotes */}
          <rect x="6" y="12" width="12" height="8" rx="1" fill="#10b981"/>
          <rect x="7" y="14" width="10" height="1" fill="white" opacity="0.3"/>
          <rect x="7" y="16" width="10" height="1" fill="white" opacity="0.3"/>
          <rect x="5" y="10" width="14" height="8" rx="1" fill="#10b981" opacity="0.7"/>
          <rect x="6" y="11" width="12" height="8" rx="1" fill="#10b981" opacity="0.5"/>
          {/* Golden coin stack */}
          <circle cx="12" cy="6" r="2.5" fill="#fbbf24"/>
          <circle cx="12" cy="4" r="2" fill="#fbbf24" opacity="0.8"/>
          <circle cx="12" cy="2.5" r="1.5" fill="#fbbf24" opacity="0.6"/>
          {/* Blue shield */}
          <path d="M12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8Z" fill="#3b82f6"/>
          <path d="M12 4L10 6L12 8L14 6L12 4Z" fill="#3b82f6" opacity="0.8"/>
          <path d="M11 6L12 7L13 6" stroke="white" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      ),
      primaryText: t('trust.loansDisbursed'),
      secondaryText: t('trust.loansDisbursedDesc'),
    },
    {
      className: 'trust-card-green',
      icon: (
        <svg className="trust-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Two hands shaking in circular motion */}
          <circle cx="12" cy="12" r="8" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.3"/>
          {/* Left hand */}
          <ellipse cx="8" cy="10" rx="2.5" ry="3.5" fill="#10b981" opacity="0.6"/>
          <path d="M6 10L7 12L8 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Right hand */}
          <ellipse cx="16" cy="10" rx="2.5" ry="3.5" fill="#10b981" opacity="0.6"/>
          <path d="M15 10L16 12L17 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Circular arrow indicating continuous loop */}
          <path d="M12 4C12 4 16 8 16 12C16 16 12 20 12 20" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" markerEnd="url(#arrowhead)"/>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6"/>
            </marker>
          </defs>
        </svg>
      ),
      primaryText: t('trust.since2016'),
      secondaryText: t('trust.since2016Desc'),
    },
    {
      className: 'trust-card-yellow',
      icon: (
        <svg className="trust-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Map background - green landmasses and blue water */}
          <rect x="2" y="4" width="20" height="16" rx="2" fill="#3b82f6" opacity="0.2"/>
          <path d="M4 8C4 8 6 10 8 12C10 10 12 8 14 10C16 8 18 10 20 8" stroke="#10b981" strokeWidth="2" fill="#10b981" opacity="0.6"/>
          <path d="M6 14C6 14 7 15 8 16C9 15 10 14 12 15C14 14 15 15 16 16C17 15 18 14 18 14" stroke="#10b981" strokeWidth="1.5" fill="#10b981" opacity="0.5"/>
          {/* Red location pin */}
          <path d="M12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2Z" fill="#ef4444"/>
          <path d="M12 6L12 10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      primaryText: t('trust.panIndia'),
      secondaryText: t('trust.panIndiaDesc'),
    },
    {
      className: 'trust-card-blue',
      icon: (
        <svg className="trust-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blue clipboard */}
          <rect x="5" y="4" width="14" height="16" rx="2" fill="#3b82f6" opacity="0.2"/>
          <rect x="7" y="6" width="10" height="12" rx="1" fill="#3b82f6"/>
          {/* Checklist items */}
          <path d="M9 9L10.5 10.5L13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L10.5 13.5L13 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 15L10.5 16.5L13 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Document */}
          <rect x="6" y="5" width="12" height="14" rx="1" fill="white" opacity="0.1"/>
          {/* Golden quill pen */}
          <path d="M16 3L18 5L17 6L15 4L16 3Z" fill="#fbbf24"/>
          <path d="M15 4L17 6" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Red shield with checkmark */}
          <path d="M12 1C10.8954 1 10 1.89543 10 3C10 4.10457 10.8954 5 12 5C13.1046 5 14 4.10457 14 3C14 1.89543 13.1046 1 12 1Z" fill="#ef4444"/>
          <path d="M12 5L12 7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          <path d="M11 6L12 7L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      primaryText: t('trust.iso27001'),
      secondaryText: t('trust.iso27001Desc'),
    },
  ]

  return (
    <section className="trust-section">
      <div className="trust-header">
        <h2 className="trust-title">
          <span className="trust-title-text">{t('trust.title')}</span> {t('trust.titleHighlight')}
        </h2>
      </div>
      <div className="trust-grid">
        {trustCards.map((card, index) => (
          <div key={index} className={`trust-card ${card.className}`}>
            <div className="trust-icon-wrapper">
              {card.icon}
            </div>
            <h3 className="trust-primary-text">{card.primaryText}</h3>
            <p className="trust-secondary-text">{card.secondaryText}</p>
          </div>
        ))}
      </div>
    </section>
  )
}