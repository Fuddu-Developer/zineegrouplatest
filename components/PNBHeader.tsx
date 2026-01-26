'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function PNBHeader() {
  return (
    <header className="pnb-bank-header">
      <div className="pnb-header-container">
        {/* Left: Logo */}
        <div className="pnb-logo-section">
          <Image
            src="/assets/images/PNB.png"
            alt="Punjab National Bank"
            width={150}
            height={50}
            className="pnb-logo"
            priority
          />
          <span className="pnb-bank-name">PUNJAB NATIONAL BANK</span>
        </div>

        {/* Right: Action Buttons */}
        <div className="pnb-actions-section">
          <Link href="/support" className="pnb-action-link">Support</Link>
          <span className="pnb-action-divider">|</span>
          <Link href="/complaint" className="pnb-action-link">Lodge a Complaint</Link>
          <button className="pnb-action-button-secondary">Open Digital A/C</button>
          <button className="pnb-action-button-primary">
            Login
            <svg className="pnb-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
