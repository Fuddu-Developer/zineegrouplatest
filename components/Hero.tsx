'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const title = t('hero.title')
  const highlight = t('hero.highlight')
  
  // Capitalize the first letter of the highlight text
  const capitalizedHighlight = highlight.charAt(0).toUpperCase() + highlight.slice(1)
  
  // Split title to insert highlights for both instances of "best"
  // Title: "Providing the best future for your best living."
  // Should display as:
  // Line 1: "Providing the best future"
  // Line 2: "for your best living."
  
  const parts = title.split(highlight)
  // parts[0] = "Providing the "
  // parts[1] = " future for your "
  // parts[2] = " living."
  
  const beforeFirstBest = parts[0] // "Providing the "
  const betweenBests = parts[1] || '' // " future for your "
  const afterSecondBest = parts[2] || '' // " living."
  
  // Split betweenBests at " future " to get the line break
  const middleParts = betweenBests.split(' future ')
  const firstLineEnd = middleParts[0] || '' // ""
  const secondLineStart = middleParts[1] || '' // "for your "

  return (
    <div className="hero-section" id="home">
      <h1>
        {beforeFirstBest}
        <span className="highlight">{capitalizedHighlight}</span>
        {firstLineEnd}
        {firstLineEnd === '' && ' future'}
        <br />
        {secondLineStart}
        <span className="highlight">{capitalizedHighlight}</span>
        {afterSecondBest}
      </h1>
    </div>
  )
}
