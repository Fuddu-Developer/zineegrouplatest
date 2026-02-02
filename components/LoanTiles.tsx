'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

/* Sprite: loan-tiles-icons.png is a 4×3 grid (left→right, top→bottom) */
const SPRITE_COLS = 4
const SPRITE_ROWS = 3
const SPRITE_URL = '/assets/images/loan-tiles-icons.png'

const loanTypes: Array<{
  name: string
  slug: string
  image?: string
  spriteCol: number
  spriteRow: number
}> = [
  { name: 'Personal Loans', slug: 'personal-loans', image: '/assets/images/personal-loans-pl.png', spriteCol: 0, spriteRow: 0 },
  { name: 'Business Loans', slug: 'business-loans', image: '/assets/images/business-loans-icon.png', spriteCol: 1, spriteRow: 0 },
  { name: 'Overdraft', slug: 'overdraft', image: '/assets/images/overdraft-icon.png', spriteCol: 2, spriteRow: 0 },
  { name: 'Secure Loans', slug: 'secure-loans', image: '/assets/images/secure-loans-icon.png', spriteCol: 3, spriteRow: 0 },
  { name: 'Balance Transfer', slug: 'balance-transfer', image: '/assets/images/balance-transfer-icon.png', spriteCol: 0, spriteRow: 1 },
  { name: 'Professional Loans', slug: 'professional-loans', image: '/assets/images/professional-loans-icon.png', spriteCol: 1, spriteRow: 1 },
  { name: 'Credit Cards', slug: 'credit-cards', image: '/assets/images/credit-cards-icon.png', spriteCol: 2, spriteRow: 1 },
  { name: 'Home Loans', slug: 'home-loans', image: '/assets/images/home-loans-icon.png', spriteCol: 3, spriteRow: 1 },
  { name: 'Gold Loans', slug: 'gold-loans', image: '/assets/images/gold-loans-icon.png', spriteCol: 0, spriteRow: 2 },
  { name: 'Education Loans', slug: 'education-loans', image: '/assets/images/education-loans-icon.png', spriteCol: 1, spriteRow: 2 },
  { name: 'Insurance', slug: 'insurance', image: '/assets/images/insurance-icon.png', spriteCol: 3, spriteRow: 2 },
]

const translationKeyMap: Record<string, string> = {
  'overdraft': 'overdraft',
  'personal-loans': 'personalLoans',
  'business-loans': 'businessLoans',
  'professional-loans': 'professionalLoans',
  'secure-loans': 'secureLoans',
  'balance-transfer': 'balanceTransfer',
}

export default function LoanTiles() {
  const { t } = useLanguage()

  return (
    <section className="loan-tiles-section">
      <div className="loan-tiles-container">
        <div className="loan-tiles-header">
          <h2 className="loan-tiles-title">
            {t('loanTiles.title')}
          </h2>
        </div>
        <div className="loan-tiles-grid">
          {loanTypes.map((loan) => (
            <Link
              key={loan.slug}
              href={`/loans/${loan.slug}`}
              className="loan-tile"
            >
              <div className="loan-tile-icon-wrapper">
                <div className="loan-tile-icon-circle loan-tile-icon-sprite" role="img" aria-label={loan.name}>
                  {loan.image ? (
                    <Image
                      src={loan.image}
                      alt={loan.name}
                      width={80}
                      height={80}
                      className="loan-tile-icon-img"
                    />
                  ) : (
                    <span
                      className="loan-tile-sprite-cell"
                      style={{
                        backgroundImage: `url(${SPRITE_URL})`,
                        backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
                        backgroundPosition: `${(loan.spriteCol / (SPRITE_COLS - 1)) * 100}% ${(loan.spriteRow / (SPRITE_ROWS - 1)) * 100}%`,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="loan-tile-label">
                {translationKeyMap[loan.slug] ? t(`carousel.${translationKeyMap[loan.slug]}`) : loan.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
