'use client'

import Image from 'next/image'

export default function AxisBankHeader() {
  return (
    <header className="axis-bank-header">
      <div className="axis-header-container">
        {/* Logo */}
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
      </div>
    </header>
  )
}
