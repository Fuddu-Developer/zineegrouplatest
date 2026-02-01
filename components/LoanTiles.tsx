'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const loanTypes = [
  {
    name: 'Personal Loans',
    slug: 'personal-loans',
    image: '/assets/images/personalloan.svg',
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  {
    name: 'Business Loans',
    slug: 'business-loans',
    image: '/assets/images/businesslonas.svg',
    backgroundColor: '#e9d5ff',
    borderColor: '#9333ea',
  },
  {
    name: 'Overdraft',
    slug: 'overdraft',
    image: '/assets/images/instantloan.svg',
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },

  {
    name: 'Secure Loans',
    slug: 'secure-loans',
    image: '/assets/images/secureloan.svg',
    backgroundColor: '#d1fae5',
    borderColor: '#059669',
  },
  {
    name: 'Balance Transfer',
    slug: 'balance-transfer',
    image: '/assets/images/balancetransfer.svg',
    backgroundColor: '#e0e7ff',
    borderColor: '#6366f1',
  },
  {
    name: 'Professional Loans',
    slug: 'professional-loans',
    image: '/assets/images/professionalloans.svg',
    backgroundColor: '#ccfbf1',
    borderColor: '#14b8a6',
  },
  {
    name: 'Credit Cards',
    slug: 'credit-cards',
    image: '/assets/images/instantloan.svg',
    backgroundColor: '#ffe4e6',
    borderColor: '#f43f5e',
  },
  {
    name: 'Home Loans',
    slug: 'home-loans',
    image: '/assets/images/secureloan.svg',
    backgroundColor: '#ffedd5',
    borderColor: '#f97316',
  },
  {
    name: 'Gold Loans',
    slug: 'gold-loans',
    image: '/assets/images/secureloan.svg',
    backgroundColor: '#fef9c3',
    borderColor: '#eab308',
  },
  {
    name: 'Education Loans',
    slug: 'education-loans',
    image: '/assets/images/professionalloans.svg',
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  {
    name: 'Insurance',
    slug: 'insurance',
    image: '/assets/images/secureloan.svg',
    backgroundColor: '#fce7f3',
    borderColor: '#ec4899',
  },
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
                <div className="loan-tile-icon-circle">
                  <Image
                    src={loan.image}
                    alt={loan.name}
                    width={60}
                    height={60}
                    className="loan-tile-icon-img"
                  />
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
