'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Bank {
    name: string;
    slug: string;
    logo?: string;
    link: string;
    color: string;
}

interface InstantLoanSlideProps {
    title: string;
    banks: Bank[];
    subtitle?: string;
}

const InstantLoanSlide: React.FC<InstantLoanSlideProps> = ({ title, banks, subtitle }) => {
    const { t } = useLanguage();
    const [showAll, setShowAll] = useState(false);

    // Show up to 9 banks in the main grid (3x3)
    const displayBanks = banks.slice(0, 9);
    const hasMore = banks.length > 9;

    return (
        <div className="fintech-slide">
            {/* Left Section - Title and Subtitle */}
            <div className="fintech-slide-left">
                <h1 className="fintech-slide-title">{title}</h1>
                {subtitle && <p className="fintech-slide-subtitle">{subtitle}</p>}
            </div>

            {/* Right Section - Bank Grid */}
            <div className="fintech-slide-right">
                {!showAll ? (
                    <>
                        <div className="bank-grid-3x3">
                            {displayBanks.map((bank) => (
                                <Link
                                    key={bank.slug}
                                    href={bank.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bank-tile-unit"
                                >
                                    {bank.logo ? (
                                        <Image
                                            src={bank.logo}
                                            alt={bank.name}
                                            width={100}
                                            height={60}
                                            className="bank-tile-logo"
                                        />
                                    ) : (
                                        <span className="bank-tile-name-text">{bank.name}</span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {hasMore && (
                            <button
                                onClick={() => setShowAll(true)}
                                className="view-all-btn"
                            >
                                {t('carousel.viewAll') || 'View All'}
                            </button>
                        )}
                    </>
                ) : (
                    <div className="fintech-slide-overlay-content">
                        <div className="overlay-header">
                            <h2 className="overlay-title">{title} - All Partners</h2>
                            <button
                                onClick={() => setShowAll(false)}
                                className="overlay-close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="bank-grid-all">
                            {banks.map((bank) => (
                                <Link
                                    key={bank.slug}
                                    href={bank.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bank-tile-unit"
                                >
                                    {bank.logo ? (
                                        <Image
                                            src={bank.logo}
                                            alt={bank.name}
                                            width={100}
                                            height={60}
                                            className="bank-tile-logo"
                                        />
                                    ) : (
                                        <span className="bank-tile-name-text">{bank.name}</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstantLoanSlide;
