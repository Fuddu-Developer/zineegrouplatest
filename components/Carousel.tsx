'use client'

import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import InstantLoanSlide from './InstantLoanSlide'

export default function Carousel() {
  const { t } = useLanguage()

  const slides = [
    {
      id: 1,
      type: 'instant-loan',
      title: 'INSTANT LOAN',
      subtitle: 'Personal Loan from Fi Money',
      banks: [
        { name: 'IndusInd Bank', slug: 'indusind', logo: '/assets/banks/indusind.png', link: 'https://induseasycredit.indusind.com/customer/personal-loan/new-lead?utm_source=assisted&utm_medium=IBLV899&utm_campaign=Personal-Loan&utm_content=1', color: '#003366' },
        { name: 'Bajaj Finserv', slug: 'bajaj', logo: '/assets/banks/bajaj.png', link: 'https://www.bajajfinservmarkets.in/apply-for-personal-loan-finservmarkets/?utm_source=B2B&utm_medium=E-referral&utm_campaign=OA&utm_content=MYMONEYMANTRA_FINTECH_PRIVATE_LIMITED', color: '#005AA9' },
        { name: 'Unity Bank', slug: 'unity', logo: '/assets/banks/unity.png', link: 'https://loans.theunitybank.com/unity-pl-ui/page/exclusion/login/logindetails?utm_source=partnership&utm_medium=mymoneymantra&utm_campaign=ENT-941530', color: '#0054A6' },
        { name: 'Hero FinCorp', slug: 'hero', logo: '/assets/banks/hero.png', link: 'https://hipl.onelink.me/1OrE?af_ios_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_android_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_web_dp=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_xp=custom&pid=Mymoneymantra&is_retargeting=true&af_reengagement_window=30d&c=Mymoneymantra&utm_source=partnership&utm_campaign=mymoneymantra&utm_content=ENT&utm_medium=MMMENT941530', color: '#ED1C24' },
        { name: 'Prefer', slug: 'prefer', link: 'https://marketplace.creditvidya.com/mymoneymantra?utm_source=EARNTRA_941530', color: '#6C5CE7' },
        { name: 'Poonawalla', slug: 'poonawalla', link: 'https://poonawalla.mymoneymantra.com/?sms=false&btb=true&utm_source=pnwpl&utm_medium=mmm&utm_campaign=pnwpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5', color: '#004D8C' },
        { name: 'Incred', slug: 'incred', link: 'https://incredpl.mymoneymantra.com?btb=true&utm_source=incred&utm_medium=mmm&utm_campaign=incred-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5', color: '#004B87' },
        { name: 'DMI', slug: 'dmi', link: 'https://dmi.mymoneymantra.com/?sms=false&btb=true&utm_source=dmipl&utm_medium=mmm&utm_campaign=dmipl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5', color: '#1B3D6D' },
        { name: 'Fi Money', slug: 'fimoney', link: 'https://fimoney.mymoneymantra.com/?sms=false&btb=true&utm_source=fimnpl&utm_medium=mmm&utm_campaign=fimnpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5', color: '#00D3D3' },
        { name: 'IDFC First', slug: 'idfcfirst', link: 'https://idfcfirstpl.mymoneymantra.com?sms=false&btb=true&utm_source=idfcpl&utm_medium=mmm&utm_campaign=idfcpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5', color: '#8C1D2C' },
      ]
    },
    {
      id: 2,
      type: 'credit-card',
      title: 'CREDIT CARDS',
      subtitle: 'Best Credit Card Offers',
      banks: [
        { name: 'YES Bank', slug: 'yes', color: '#006BB4', link: 'https://popcard.mymoneymantra.com?sms=false&btb=true&utm_source=yescc&utm_medium=mmm&utm_campaign=yescc-mmm-941530' },
        { name: 'Bank of Baroda', slug: 'bob', color: '#FF6600', link: 'https://bobcard.mymoneymantra.com?sms=false&btb=true&utm_source=bobcc&utm_medium=mmm&utm_campaign=bobcc-mmm-941530' },
        { name: 'Federal Bank', slug: 'federal', color: '#0066CC', link: 'https://federalcc.mymoneymantra.com?sms=false&btb=true&utm_source=fedcc&utm_medium=mmm&utm_campaign=fedcc-mmm-941530' },
        { name: 'AU Bank', slug: 'au', color: '#FF9900', link: 'https://aucc.mymoneymantra.com/?sms=false&btb=true&utm_source=aucc&utm_medium=mmm&utm_campaign=aucc-mmm-941530' },
        { name: 'SBI Card', slug: 'sbi', color: '#288CC8', link: 'https://sbicard.mymoneymantra.com?sms=false&btb=true&utm_source=sbcc&utm_medium=mmm&utm_campaign=sbcc-mmm-941530' },
        { name: 'Axis Bank', slug: 'axis', color: '#8C1D2C', link: 'https://axis-card.mymoneymantra.com?sms=false&btb=true&utm_source=axs&utm_medium=mmm&utm_campaign=axs-mmm-941530' },
      ]
    },
    {
      id: 3,
      type: 'business-loan',
      title: 'BUSINESS LOAN',
      subtitle: 'Loans for Your Business',
      banks: [
        { name: 'Protium', slug: 'protium', color: '#003366', link: 'https://protium.mymoneymantra.com/?sms=false&btb=true&utm_source=protium&utm_medium=mmm&utm_campaign=protium-mmm-941530' },
        { name: 'Muthoot', slug: 'muthoot', color: '#ED1C24', link: 'https://muthoot.mymoneymantra.com/?sms=false&btb=true&v1=EDI&utm_source=medi&utm_medium=mmm&utm_campaign=medi-mmm-941530' },
        { name: 'ABFL', slug: 'abfl', color: '#FFCC00', link: 'https://abflbl.mymoneymantra.com/?btb=true&utm_source=abfl&utm_medium=mmm&utm_campaign=abfl-mmm-941530' },
        { name: 'Tata Capital', slug: 'tata', color: '#0066CC', link: 'https://tatacapitalbl.mymoneymantra.com/?sms=false&btb=true&utm_source=tatabl&utm_medium=mmm&utm_campaign=tatabl-mmm-941530' },
      ]
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (isPaused) {
      if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current)
      return
    }

    autoAdvanceTimerRef.current = setInterval(handleNext, 6000)
    return () => {
      if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current)
    }
  }, [currentIndex, isPaused])

  return (
    <section className="flip-carousel-section" id="apply">
      <div
        className="carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-wrapper">
          <div className="slide">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-modern-item ${index === currentIndex ? 'active' : ''}`}
              >
                <InstantLoanSlide
                  title={slide.title}
                  subtitle={slide.subtitle}
                  banks={slide.banks}
                />
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="carousel-navigation-wrapper">
            <button
              className="carousel-nav-button carousel-nav-button-prev"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="carousel-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-nav-button carousel-nav-button-next"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
