'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AxisBankHeader() {
  return (
    <header className="axis-bank-header">
      <div className="axis-header-container">
        {/* Left: Logo */}
        <div className="axis-logo-section">
          <Image
            src="/assets/images/AX.png"
            alt="Axis Bank"
            width={150}
            height={50}
            className="axis-logo"
            priority
          />
          <span className="axis-bank-name">AXIS BANK</span>
        </div>

        {/* Right: Action Buttons */}
        <div className="axis-actions-section">
          <Link href="/support" className="axis-action-link">Support</Link>
          <span className="axis-action-divider">|</span>
          <Link href="/complaint" className="axis-action-link">Lodge a Complaint</Link>
          <button className="axis-action-button-secondary">Open Digital A/C</button>
          <button className="axis-action-button-primary">
            Login
            <svg className="axis-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
