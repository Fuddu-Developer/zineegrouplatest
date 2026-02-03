'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Bank {
    name: string
    slug: string
    logo?: string
    link: string
}

interface Slide {
    id: number
    title: string
    subtitle: string
    banks: Bank[]
}

export default function NewCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [showAllModal, setShowAllModal] = useState(false)
    const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null)
    const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null)

    const slides: Slide[] = [
        {
            id: 1,
            title: 'INSTANT LOAN',
            subtitle: 'Personal Loan from Fi Money',
            banks: [
                { name: 'ICICI Bank', slug: 'icici', logo: '/assets/banks/indusind.png', link: 'https://induseasycredit.indusind.com/customer/personal-loan/new-lead?utm_source=assisted&utm_medium=IBLV899&utm_campaign=Personal-Loan&utm_content=1' },
                { name: 'HDFC Bank', slug: 'hdfc', logo: '/assets/images/HDFC.png', link: 'https://www.bajajfinservmarkets.in/apply-for-personal-loan-finservmarkets/?utm_source=B2B&utm_medium=E-referral&utm_campaign=OA&utm_content=MYMONEYMANTRA_FINTECH_PRIVATE_LIMITED' },
                { name: 'IDFC First Bank', slug: 'idfc', logo: '/assets/banks/unity.png', link: 'https://loans.theunitybank.com/unity-pl-ui/page/exclusion/login/logindetails?utm_source=partnership&utm_medium=mymoneymantra&utm_campaign=ENT-941530' },
                { name: 'Axis Bank', slug: 'axis', logo: '/assets/images/AX.png', link: 'https://hipl.onelink.me/1OrE?af_ios_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_android_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_web_dp=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_xp=custom&pid=Mymoneymantra&is_retargeting=true&af_reengagement_window=30d&c=Mymoneymantra&utm_source=partnership&utm_campaign=mymoneymantra&utm_content=ENT&utm_medium=MMMENT941530' },
                { name: 'Federal Bank', slug: 'federal', logo: '/assets/banks/bajaj.png', link: 'https://marketplace.creditvidya.com/mymoneymantra?utm_source=EARNTRA_941530' },
                { name: 'SBI', slug: 'sbi', logo: '/assets/images/SBI.png', link: 'https://poonawalla.mymoneymantra.com/?sms=false&btb=true&utm_source=pnwpl&utm_medium=mmm&utm_campaign=pnwpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5' },
                { name: 'RBL Bank', slug: 'rbl', logo: '/assets/banks/hero.png', link: 'https://incredpl.mymoneymantra.com?btb=true&utm_source=incred&utm_medium=mmm&utm_campaign=incred-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5' },
                { name: 'Fi Money', slug: 'fimoney', logo: '/assets/images/Kotak-1.png', link: 'https://dmi.mymoneymantra.com/?sms=false&btb=true&utm_source=dmipl&utm_medium=mmm&utm_campaign=dmipl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5' },
                { name: 'PNB', slug: 'pnb', logo: '/assets/images/PNB.png', link: 'https://fimoney.mymoneymantra.com/?sms=false&btb=true&utm_source=fimnpl&utm_medium=mmm&utm_campaign=fimnpl-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5' },
            ]
        },
        {
            id: 2,
            title: 'CREDIT CARDS',
            subtitle: 'Best Credit Card Offers',
            banks: [
                { name: 'HDFC Bank', slug: 'hdfc', logo: '/assets/images/HDFC.png', link: 'https://popcard.mymoneymantra.com?sms=false&btb=true&utm_source=yescc&utm_medium=mmm&utm_campaign=yescc-mmm-941530' },
                { name: 'Bank of Baroda', slug: 'bob', logo: '/assets/images/BOB.png', link: 'https://bobcard.mymoneymantra.com?sms=false&btb=true&utm_source=bobcc&utm_medium=mmm&utm_campaign=bobcc-mmm-941530' },
                { name: 'SBI Card', slug: 'sbi', logo: '/assets/images/SBI.png', link: 'https://federalcc.mymoneymantra.com?sms=false&btb=true&utm_source=fedcc&utm_medium=mmm&utm_campaign=fedcc-mmm-941530' },
                { name: 'Axis Bank', slug: 'axis', logo: '/assets/images/AX.png', link: 'https://aucc.mymoneymantra.com/?sms=false&btb=true&utm_source=aucc&utm_medium=mmm&utm_campaign=aucc-mmm-941530' },
                { name: 'Kotak', slug: 'kotak', logo: '/assets/images/Kotak-1.png', link: 'https://sbicard.mymoneymantra.com?sms=false&btb=true&utm_source=sbcc&utm_medium=mmm&utm_campaign=sbcc-mmm-941530' },
                { name: 'PNB', slug: 'pnb', logo: '/assets/images/PNB.png', link: 'https://axis-card.mymoneymantra.com?sms=false&btb=true&utm_source=axs&utm_medium=mmm&utm_campaign=axs-mmm-941530' },
            ]
        },
        {
            id: 3,
            title: 'BUSINESS LOAN',
            subtitle: 'Loans for Your Business',
            banks: [
                { name: 'HDFC Bank', slug: 'hdfc', logo: '/assets/images/HDFC.png', link: 'https://protium.mymoneymantra.com/?sms=false&btb=true&utm_source=protium&utm_medium=mmm&utm_campaign=protium-mmm-941530' },
                { name: 'SBI', slug: 'sbi', logo: '/assets/images/SBI.png', link: 'https://muthoot.mymoneymantra.com/?sms=false&btb=true&v1=EDI&utm_source=medi&utm_medium=mmm&utm_campaign=medi-mmm-941530' },
                { name: 'Axis Bank', slug: 'axis', logo: '/assets/images/AX.png', link: 'https://abflbl.mymoneymantra.com/?btb=true&utm_source=abfl&utm_medium=mmm&utm_campaign=abfl-mmm-941530' },
                { name: 'Kotak', slug: 'kotak', logo: '/assets/images/Kotak-1.png', link: 'https://tatacapitalbl.mymoneymantra.com/?sms=false&btb=true&utm_source=tatabl&utm_medium=mmm&utm_campaign=tatabl-mmm-941530' },
            ]
        }
    ]

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const handleViewAll = (slide: Slide) => {
        setSelectedSlide(slide)
        setShowAllModal(true)
    }

    useEffect(() => {
        if (isPaused || showAllModal) {
            if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current)
            return
        }

        autoAdvanceTimerRef.current = setInterval(handleNext, 5000)
        return () => {
            if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current)
        }
    }, [currentIndex, isPaused, showAllModal])

    const currentSlide = slides[currentIndex]
    const displayBanks = currentSlide.banks.slice(0, 9)

    return (
        <section className="new-carousel-section">
            <div
                className="new-carousel-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Main Slide */}
                <div className="new-carousel-slide">
                    {/* Left Section */}
                    <div className="new-carousel-left">
                        <h2 className="new-carousel-title">{currentSlide.title}</h2>
                        <p className="new-carousel-subtitle">{currentSlide.subtitle}</p>
                    </div>

                    {/* Right Section */}
                    <div className="new-carousel-right">
                        <div className="new-bank-grid">
                            {displayBanks.map((bank) => (
                                <Link
                                    key={bank.slug}
                                    href={bank.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="new-bank-tile"
                                >
                                    {bank.logo ? (
                                        <Image
                                            src={bank.logo}
                                            alt={bank.name}
                                            width={100}
                                            height={60}
                                            className="new-bank-logo"
                                        />
                                    ) : (
                                        <span className="new-bank-name">{bank.name}</span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {currentSlide.banks.length > 9 && (
                            <button
                                onClick={() => handleViewAll(currentSlide)}
                                className="new-view-all-btn"
                            >
                                View All
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                {slides.length > 1 && (
                    <div className="new-carousel-nav">
                        <button
                            onClick={handlePrev}
                            className="new-nav-btn new-nav-prev"
                            aria-label="Previous slide"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="new-carousel-dots">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`new-dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="new-nav-btn new-nav-next"
                            aria-label="Next slide"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Modal for View All */}
            {showAllModal && selectedSlide && (
                <div className="new-modal-overlay" onClick={() => setShowAllModal(false)}>
                    <div className="new-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="new-modal-header">
                            <h3>{selectedSlide.title} - All Partners</h3>
                            <button
                                onClick={() => setShowAllModal(false)}
                                className="new-modal-close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="new-modal-grid">
                            {selectedSlide.banks.map((bank) => (
                                <Link
                                    key={bank.slug}
                                    href={bank.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="new-bank-tile"
                                >
                                    {bank.logo ? (
                                        <Image
                                            src={bank.logo}
                                            alt={bank.name}
                                            width={100}
                                            height={60}
                                            className="new-bank-logo"
                                        />
                                    ) : (
                                        <span className="new-bank-name">{bank.name}</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
