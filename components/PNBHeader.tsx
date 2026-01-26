'use client'

import Image from 'next/image'

export default function PNBHeader() {
  return (
    <header className="pnb-bank-header">
      <div className="pnb-header-container">
        {/* Logo */}
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
      </div>
    </header>
  )
}
