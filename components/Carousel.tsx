'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Carousel() {
  const { t } = useLanguage()

  /* 14 Specific Bank Loan Options */
  const services = [
    {
      id: 1,
      image: '/assets/images/instantloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from IndusInd Bank',
      link: 'https://induseasycredit.indusind.com/customer/personal-loan/new-lead?utm_source=assisted&utm_medium=IBLV899&utm_campaign=Personal-Loan&utm_content=1',
    },
    {
      id: 2,
      image: '/assets/images/personalloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Bajaj Finserv',
      link: 'https://www.bajajfinservmarkets.in/apply-for-personal-loan-finservmarkets/?utm_source=B2B&utm_medium=E-referral&utm_campaign=OA&utm_content=MYMONEYMANTRA_FINTECH_PRIVATE_LIMITED',
    },
    {
      id: 3,
      image: '/assets/images/businesslonas.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Unity Bank',
      link: 'https://loans.theunitybank.com/unity-pl-ui/page/exclusion/login/logindetails?utm_source=partnership&utm_medium=mymoneymantra&utm_campaign=ENT-941530',
    },
    {
      id: 4,
      image: '/assets/images/professionalloans.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Hero FinCorp',
      link: 'https://hipl.onelink.me/1OrE?af_ios_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_android_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_web_dp=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_xp=custom&pid=Mymoneymantra&is_retargeting=true&af_reengagement_window=30d&c=Mymoneymantra&utm_source=partnership&utm_campaign=mymoneymantra&utm_content=ENT&utm_medium=MMMENT941530',
    },
    {
      id: 5,
      image: '/assets/images/secureloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Prefer (CreditVidya)',
      link: 'https://marketplace.creditvidya.com/mymoneymantra?utm_source=EARNTRA_941530',
    },
    {
      id: 6,
      image: '/assets/images/balancetransfer.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Poonawalla Fincorp',
      link: 'https://poonawalla.mymoneymantra.com/?sms=false&btb=true&utm_source=pnwpl&utm_medium=mmm&utm_campaign=pnwpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 7,
      image: '/assets/images/instantloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Incred',
      link: 'https://incredpl.mymoneymantra.com?btb=true&utm_source=incred&utm_medium=mmm&utm_campaign=incred-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 8,
      image: '/assets/images/personalloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from DMI Finance',
      link: 'https://dmi.mymoneymantra.com/?sms=false&btb=true&utm_source=dmipl&utm_medium=mmm&utm_campaign=dmipl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 9,
      image: '/assets/images/businesslonas.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Fi Money',
      link: 'https://fimoney.mymoneymantra.com/?sms=false&btb=true&utm_source=fimnpl&utm_medium=mmm&utm_campaign=fimnpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 10,
      image: '/assets/images/professionalloans.png',
      name: 'Instant Loan',
      description: 'Personal Loan from IDFC First Bank',
      link: 'https://idfcfirstpl.mymoneymantra.com?sms=false&btb=true&utm_source=idfcpl&utm_medium=mmm&utm_campaign=idfcpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 11,
      image: '/assets/images/secureloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Protium',
      link: 'https://protium.mymoneymantra.com/?sms=false&btb=true&utm_source=protium&utm_medium=mmm&utm_campaign=protium-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 12,
      image: '/assets/images/balancetransfer.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Muthoot',
      link: 'https://muthoot.mymoneymantra.com/?sms=false&btb=true&v1=EDI&utm_source=medi&utm_medium=mmm&utm_campaign=medi-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 13,
      image: '/assets/images/instantloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from ABFL',
      link: 'https://abflbl.mymoneymantra.com/?btb=true&utm_source=abfl&utm_medium=mmm&utm_campaign=abfl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
    {
      id: 14,
      image: '/assets/images/personalloan.png',
      name: 'Instant Loan',
      description: 'Personal Loan from Tata Capital',
      link: 'https://tatacapitalbl.mymoneymantra.com/?sms=false&btb=true&utm_source=tatabl&utm_medium=mmm&utm_campaign=tatabl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
    },
  ]
  const slideRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartXRef = useRef<number>(0)
  const touchEndXRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Function to update content visibility and reset animations
  const updateContentVisibility = () => {
    if (!slideRef.current) return

    const items = slideRef.current.querySelectorAll('.item')
    const contents = slideRef.current.querySelectorAll('.content')
    const buttons = slideRef.current.querySelectorAll('.carousel-apply-button')

    // Hide all content first to prevent overlap
    contents.forEach((content) => {
      const contentEl = content as HTMLElement
      contentEl.style.display = 'none'
      contentEl.style.opacity = '0'
      contentEl.style.visibility = 'hidden'

      // Reset animation by removing and re-adding the animation class
      const nameEl = contentEl.querySelector('.name') as HTMLElement
      const desEl = contentEl.querySelector('.des') as HTMLElement

      if (nameEl) {
        nameEl.style.animation = 'none'
        nameEl.style.opacity = '0'
        void nameEl.offsetWidth // Trigger reflow
      }
      if (desEl) {
        desEl.style.animation = 'none'
        desEl.style.opacity = '0'
        void desEl.offsetWidth
      }
    })

    // Hide all buttons
    buttons.forEach((button) => {
      const buttonEl = button as HTMLElement
      buttonEl.style.display = 'none'
      buttonEl.style.opacity = '0'
      buttonEl.style.visibility = 'hidden'

      const buttonInner = buttonEl.querySelector('button') as HTMLElement
      if (buttonInner) {
        buttonInner.style.animation = 'none'
        buttonInner.style.opacity = '0'
        void buttonInner.offsetWidth
      }
    })

    // Show content and button only on the 2nd item (main visible card)
    if (items.length > 1) {
      const secondItem = items[1] as HTMLElement
      const secondContent = secondItem.querySelector('.content') as HTMLElement
      const secondButton = secondItem.querySelector('.carousel-apply-button') as HTMLElement

      if (secondContent) {
        secondContent.style.display = 'flex'
        secondContent.style.opacity = '1'
        secondContent.style.visibility = 'visible'

        // Trigger animation reset
        setTimeout(() => {
          const nameEl = secondContent.querySelector('.name') as HTMLElement
          const desEl = secondContent.querySelector('.des') as HTMLElement

          if (nameEl) {
            nameEl.style.animation = 'animate 1s ease-in-out 1 forwards'
          }
          if (desEl) {
            desEl.style.animation = 'animate 1s ease-in-out 0.3s 1 forwards'
          }
        }, 50)
      }

      if (secondButton) {
        secondButton.style.display = 'flex'
        secondButton.style.opacity = '1'
        secondButton.style.visibility = 'visible'

        setTimeout(() => {
          const buttonInner = secondButton.querySelector('button') as HTMLElement
          if (buttonInner) {
            buttonInner.style.animation = 'animate 1s ease-in-out 0.6s 1 forwards'
          }
        }, 50)
      }
    }
  }

  const handleNext = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.item')
      if (items.length > 0) {
        // Get current slide (2nd item) and next slide (1st item)
        const currentSlide = items[1] as HTMLElement
        const nextSlide = items[0] as HTMLElement

        if (currentSlide && nextSlide) {
          // Position next slide off-screen to the right before animation
          nextSlide.style.transform = 'translate3d(100%, 0, 0)'
          nextSlide.style.opacity = '0.8'
          // Force reflow to apply the transform
          void nextSlide.offsetWidth

          // Add animation classes
          currentSlide.classList.add('slide-out-left')
          nextSlide.classList.add('slide-in-from-right')

          // Wait for animation to complete, then move items
          setTimeout(() => {
            slideRef.current?.appendChild(items[0])
            // Remove animation classes and reset transform
            currentSlide.classList.remove('slide-out-left')
            nextSlide.classList.remove('slide-in-from-right')
            nextSlide.style.transform = ''
            nextSlide.style.opacity = ''
            // Update content visibility after DOM update
            setTimeout(() => {
              updateContentVisibility()
            }, 50)
          }, 600) // Match animation duration (0.6s)
        } else {
          // Fallback if items structure is different
          slideRef.current.appendChild(items[0])
          setTimeout(() => {
            updateContentVisibility()
          }, 100)
        }
        // Update current index
        setCurrentIndex((prev) => (prev + 1) % services.length)
        // Reset auto-advance timer
        resetAutoAdvance()
      }
    }
  }

  const handlePrev = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.item')
      if (items.length > 0) {
        // Get current slide (2nd item) and previous slide (3rd item)
        const currentSlide = items[1] as HTMLElement
        const prevSlide = items[2] as HTMLElement

        if (currentSlide && prevSlide) {
          // Position previous slide off-screen to the right before animation
          prevSlide.style.transform = 'translate3d(100%, 0, 0)'
          prevSlide.style.opacity = '0.8'
          // Force reflow to apply the transform
          void prevSlide.offsetWidth

          // Add animation classes
          currentSlide.classList.add('slide-out-left')
          prevSlide.classList.add('slide-in-from-right')

          // Wait for animation to complete, then move items
          setTimeout(() => {
            slideRef.current?.prepend(items[items.length - 1])
            // Remove animation classes and reset transform
            currentSlide.classList.remove('slide-out-left')
            prevSlide.classList.remove('slide-in-from-right')
            prevSlide.style.transform = ''
            prevSlide.style.opacity = ''
            // Update content visibility after DOM update
            setTimeout(() => {
              updateContentVisibility()
            }, 50)
          }, 600) // Match animation duration (0.6s)
        } else {
          // Fallback if items structure is different
          slideRef.current.prepend(items[items.length - 1])
          setTimeout(() => {
            updateContentVisibility()
          }, 100)
        }
        // Update current index
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
        // Reset auto-advance timer
        resetAutoAdvance()
      }
    }
  }

  // Auto-advance functionality (works on both mobile and desktop)
  useEffect(() => {
    if (isPaused) {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current)
        autoAdvanceTimerRef.current = null
      }
      return
    }

    // Start auto-advance
    const startAutoAdvance = () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current)
      }
      autoAdvanceTimerRef.current = setInterval(() => {
        if (slideRef.current && !isPaused) {
          const items = slideRef.current.querySelectorAll('.item')
          if (items.length > 0) {
            // Get current slide (2nd item) and next slide (1st item)
            const currentSlide = items[1] as HTMLElement
            const nextSlide = items[0] as HTMLElement

            if (currentSlide && nextSlide) {
              // Position next slide off-screen to the right before animation
              nextSlide.style.transform = 'translate3d(100%, 0, 0)'
              nextSlide.style.opacity = '0.8'
              // Force reflow to apply the transform
              void nextSlide.offsetWidth

              // Add animation classes
              currentSlide.classList.add('slide-out-left')
              nextSlide.classList.add('slide-in-from-right')

              // Wait for animation to complete, then move items
              setTimeout(() => {
                slideRef.current?.appendChild(items[0])
                // Remove animation classes and reset transform
                currentSlide.classList.remove('slide-out-left')
                nextSlide.classList.remove('slide-in-from-right')
                nextSlide.style.transform = ''
                nextSlide.style.opacity = ''
                // Update content visibility after DOM update
                setTimeout(() => {
                  updateContentVisibility()
                }, 50)
              }, 600) // Match animation duration (0.6s)
            } else {
              // Fallback if items structure is different
              slideRef.current.appendChild(items[0])
              setTimeout(() => {
                updateContentVisibility()
              }, 100)
            }
            // Update current index
            setCurrentIndex((prev) => (prev + 1) % services.length)
          }
        }
      }, 5000) // Auto-advance every 5 seconds
    }

    startAutoAdvance()

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current)
        autoAdvanceTimerRef.current = null
      }
    }
  }, [isPaused])

  const resetAutoAdvance = () => {
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current)
      autoAdvanceTimerRef.current = null
    }
    if (!isPaused) {
      autoAdvanceTimerRef.current = setInterval(() => {
        if (slideRef.current && !isPaused) {
          const items = slideRef.current.querySelectorAll('.item')
          if (items.length > 0) {
            // Get current slide (2nd item) and next slide (1st item)
            const currentSlide = items[1] as HTMLElement
            const nextSlide = items[0] as HTMLElement

            if (currentSlide && nextSlide) {
              // Position next slide off-screen to the right before animation
              nextSlide.style.transform = 'translate3d(100%, 0, 0)'
              nextSlide.style.opacity = '0.8'
              // Force reflow to apply the transform
              void nextSlide.offsetWidth

              // Add animation classes
              currentSlide.classList.add('slide-out-left')
              nextSlide.classList.add('slide-in-from-right')

              // Wait for animation to complete, then move items
              setTimeout(() => {
                slideRef.current?.appendChild(items[0])
                // Remove animation classes and reset transform
                currentSlide.classList.remove('slide-out-left')
                nextSlide.classList.remove('slide-in-from-right')
                nextSlide.style.transform = ''
                nextSlide.style.opacity = ''
                // Update content visibility after DOM update
                setTimeout(() => {
                  updateContentVisibility()
                }, 50)
              }, 600) // Match animation duration (0.6s)
            } else {
              // Fallback if items structure is different
              slideRef.current.appendChild(items[0])
              setTimeout(() => {
                updateContentVisibility()
              }, 100)
            }
            // Update current index
            setCurrentIndex((prev) => (prev + 1) % services.length)
          }
        }
      }, 5000)
    }
  }

  // Initialize content visibility on mount
  useEffect(() => {
    updateContentVisibility()
  }, [])

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
    // Pause auto-advance during touch
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return

    const swipeDistance = touchStartXRef.current - touchEndXRef.current
    const minSwipeDistance = 50 // Minimum distance for a swipe

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - next
        handleNext()
      } else {
        // Swipe right - previous
        handlePrev()
      }
    }

    // Resume auto-advance
    resetAutoAdvance()

    // Reset touch values
    touchStartXRef.current = 0
    touchEndXRef.current = 0
  }

  // Handle hover to pause/resume slideshow
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Function to jump to a specific slide index
  const goToSlide = (targetIndex: number) => {
    if (targetIndex === currentIndex) return

    const diff = (targetIndex - currentIndex + services.length) % services.length
    const isForward = diff <= services.length / 2

    // Calculate how many steps to move
    const steps = isForward ? diff : services.length - diff

    // Animate to the target slide step by step
    const animateToTarget = (remainingSteps: number) => {
      if (remainingSteps === 0) return

      if (isForward) {
        handleNext()
      } else {
        handlePrev()
      }

      // Continue animating if more steps needed
      if (remainingSteps > 1) {
        setTimeout(() => {
          animateToTarget(remainingSteps - 1)
        }, 650) // Slightly longer than animation duration to ensure smooth transitions
      }
    }

    animateToTarget(steps)
  }

  return (
    <section className="flip-carousel-section" id="apply">
      <div
        className="carousel-container"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slide" ref={slideRef}>
            {services.map((service) => (
              <div key={service.id} className="item">
                <Image
                  src={service.image}
                  alt={service.name}
                  className="service-image"
                  width={800}
                  height={450}
                  priority={service.id <= 2}
                />
                <div className="content">
                  <div className="name">{service.name}</div>
                  <div className="des">{service.description}</div>
                </div>
                <Link className="carousel-apply-button" href={service.link || '#'} target="_blank" rel="noopener noreferrer">
                  <button>{t('carousel.applyNow')}</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Dots with Buttons */}
        <div className="carousel-navigation-wrapper">
          {/* Previous Button */}
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
            {services.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
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
      </div>
    </section>
  )
}
