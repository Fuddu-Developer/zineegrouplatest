'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function YesBankSinglePageForm({
  bank,
  loanLabel,
  onSubmit,
  isSubmitting,
}: {
  bank: { name: string; logo: string; color: string; primaryColor: string }
  loanLabel: string
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  isSubmitting: boolean
}) {
  const [isCustomer, setIsCustomer] = useState<boolean | null>(null)
  const [name, setName] = useState('')
  const [pan, setPan] = useState('')

  const formatPan = (value: string) => {
    const v = value.replace(/\s/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
    if (v.length <= 5) return v
    if (v.length <= 9) return `${v.slice(0, 5)} ${v.slice(5)}`
    return `${v.slice(0, 5)} ${v.slice(5, 9)} ${v.slice(9, 10)}`
  }

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPan(formatPan(e.target.value.replace(/\s/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '')))
  }

  const handleNo = () => {
    if (typeof window !== 'undefined') {
      window.close()
      if (!window.closed) window.history.back()
    }
  }

  const canSubmit = name.trim().length > 0 && pan.length >= 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || isSubmitting) return
    await onSubmit({
      name: name.trim(),
      pan,
      loanLabel,
      bankName: bank.name,
      isYesBankCustomer: isCustomer,
    })
  }

  if (isCustomer === false) {
    return (
      <div className="yes-single-page">
        <div className="yes-single-header" style={{ backgroundColor: bank.color }}>
          <div className="yes-single-header-inner">
            <Image src={bank.logo} alt={bank.name} width={120} height={40} className="yes-single-logo" />
          </div>
        </div>
        <div className="yes-single-close-message">
          <p>This application is for YES Bank customers. You have chosen &quot;No&quot;.</p>
          <p className="yes-single-close-hint">If the page did not close, use the back button or close this tab.</p>
          <button type="button" onClick={handleNo} className="yes-single-close-btn" style={{ backgroundColor: bank.primaryColor }}>
            Close / Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="yes-single-page">
      <div className="yes-single-header" style={{ backgroundColor: bank.color }}>
        <div className="yes-single-header-inner">
          <Image src={bank.logo} alt={bank.name} width={120} height={40} className="yes-single-logo" />
        </div>
      </div>
      <div className="yes-single-form-wrap">
        {isCustomer === null ? (
          <>
            <h1 className="yes-single-question">ARE YOU YES BANK CUSTOMER?</h1>
            <div className="yes-single-options">
              <button
                type="button"
                className="yes-single-option yes-single-option-yes"
                onClick={() => setIsCustomer(true)}
                style={{ borderColor: bank.primaryColor, color: bank.primaryColor }}
              >
                Yes
              </button>
              <button
                type="button"
                className="yes-single-option yes-single-option-no"
                onClick={handleNo}
              >
                No
              </button>
            </div>
            <p className="yes-single-note">Select &quot;No&quot; will close this page.</p>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="yes-single-form">
            <h2 className="yes-single-title">Apply for {loanLabel}</h2>
            <p className="yes-single-subtitle">Name and PAN only – simple and quick</p>
            <div className="yes-single-field">
              <label className="yes-single-label">Name as per PAN Card</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name as per PAN"
                className="yes-single-input"
                required
              />
            </div>
            <div className="yes-single-field">
              <label className="yes-single-label">PAN Number</label>
              <input
                type="text"
                value={pan}
                onChange={handlePanChange}
                placeholder="XXXXX XXXX X"
                maxLength={12}
                className="yes-single-input"
                required
              />
            </div>
            <button
              type="submit"
              className="yes-single-submit"
              disabled={!canSubmit || isSubmitting}
              style={{ backgroundColor: canSubmit ? bank.primaryColor : '#94a3b8' }}
            >
              {isSubmitting ? 'Submitting...' : 'Proceed'}
            </button>
          </form>
        )}
      </div>
      <footer className="yes-single-footer">
        <span>Copyright © YES BANK. All rights reserved.</span>
      </footer>
    </div>
  )
}
