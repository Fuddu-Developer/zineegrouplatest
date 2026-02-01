'use client'

import { BankOffer } from '@/data/bankOffers'
import { useLanguage } from '@/contexts/LanguageContext'

interface BankListProps {
    offers: BankOffer[]
    categoryTitle: string
}

export default function BankList({ offers, categoryTitle }: BankListProps) {
    const { t } = useLanguage()

    return (
        <div className="bank-list-section">
            <h2 className="bank-list-title">
                {categoryTitle}
            </h2>
            <div className="bank-tiles-grid">
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className="bank-tile"
                    >
                        <div className="bank-tile-header">
                            <h3 className="bank-tile-name">
                                {offer.bankName}
                            </h3>
                            {offer.description && (
                                <p className="bank-tile-description">
                                    {offer.description}
                                </p>
                            )}
                        </div>

                        <div className="bank-tile-requirements">
                            <p className="requirements-title">Requirements:</p>
                            <ul className="requirements-list">
                                <li>
                                    <svg className="req-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Valid Identity Proof (Aadhar/PAN)
                                </li>
                                <li>
                                    <svg className="req-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Address Proof
                                </li>
                                <li>
                                    <svg className="req-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {categoryTitle.toLowerCase().includes('business')
                                        ? 'Business Registration Proof'
                                        : 'Income Proof (Salary Slips/ITR)'}
                                </li>
                                <li>
                                    <svg className="req-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Good Credit Score
                                </li>
                            </ul>
                        </div>

                        <a
                            href={offer.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bank-tile-apply-btn"
                        >
                            Apply Now
                            <svg className="icon-arrow-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
