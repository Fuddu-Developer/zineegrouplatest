'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  
  const handleLearnMore = () => {
    const carousel = document.querySelector('.flip-carousel-section')
    if (carousel) {
      carousel.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const title = t('hero.title')
  const highlight1 = t('hero.highlight')
  const highlight2 = t('hero.highlight2')
  
  // Split title to insert highlights
  const parts = title.split(highlight1)
  const firstPart = parts[0]
  const rest = parts[1] || ''
  const secondParts = rest.split(highlight2)
  const middlePart = secondParts[0] || ''
  const lastPart = secondParts[1] || ''

  return (
    <div className="hero-section" id="home">
      <h1>
        {firstPart}
        <span className="highlight">{highlight1}</span>
        {middlePart}
        <span className="highlight">{highlight2}</span>
        {lastPart}
      </h1>
      <button className="btn-learn-more" onClick={handleLearnMore}>
        {t('hero.button')}
      </button>
    </div>
  )
}
