'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { emiBanks, type EmiBank } from '@/data/emiBanks'
import { useLanguage } from '@/contexts/LanguageContext'

function BankLogo({ bank, size = 48 }: { bank: EmiBank; size?: number }) {
  const [imageError, setImageError] = useState(false)

  if (bank.logo && !imageError) {
    return (
      <span className="compare-bank-logo-img-wrap" style={{ width: size, height: size }}>
        <Image
          src={bank.logo}
          alt=""
          width={size}
          height={size}
          className="compare-bank-logo-img"
          onError={() => setImageError(true)}
          unoptimized={bank.logo.startsWith('http')}
        />
      </span>
    )
  }
  return (
    <span className="compare-bank-logo-fallback" style={{ width: size, height: size }}>
      {bank.name.charAt(0)}
    </span>
  )
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

function calcEmi(principal: number, annualRate: number, months: number) {
  if (months <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 }
  const monthlyRate = annualRate / 12 / 100
  const emi =
    annualRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = emi * months
  const totalInterest = totalPayment - principal
  return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) }
}

export type BankLoanComparisonParams = { amount: number; tenure: number; tenureUnit: 'Yr' | 'Mo' }

const MAX_SLOTS = 3

export default function BankLoanComparison({ amount, tenure, tenureUnit }: BankLoanComparisonParams) {
  const { t } = useLanguage()
  const [selectedBanks, setSelectedBanks] = useState<(EmiBank | null)[]>([])

  const months = tenureUnit === 'Yr' ? tenure * 12 : tenure

  const availableBanks = useMemo(() => {
    const selectedIds = new Set(selectedBanks.filter(Boolean).map((b) => b!.id))
    return emiBanks.filter((b) => !selectedIds.has(b.id))
  }, [selectedBanks])

  const addBank = (bank: EmiBank, slotIndex: number) => {
    setSelectedBanks((prev) => {
      const next = [...prev]
      while (next.length <= slotIndex) next.push(null)
      next[slotIndex] = bank
      return next.slice(0, MAX_SLOTS)
    })
  }

  const removeBank = (slotIndex: number) => {
    setSelectedBanks((prev) => {
      const next = [...prev]
      next[slotIndex] = null
      return next
    })
  }

  const filledSlots = selectedBanks.filter(Boolean).length
  const canAddMore = filledSlots < MAX_SLOTS

  return (
    <section className="compare-bank-loans-section">
      <h2 className="compare-bank-loans-title">{t('compare.title')}</h2>
      <p className="compare-bank-loans-subtitle">
        {t('compare.subtitle')}
      </p>

      {/* Slots: Add / Selected bank cards (like compare car) */}
      <div className="compare-bank-slots">
        {[0, 1, 2].map((slotIndex) => {
          const bank = selectedBanks[slotIndex] ?? null
          return (
            <div key={slotIndex} className="compare-bank-slot">
              {bank ? (
                <div className="compare-bank-slot-card selected">
                  <div className="compare-bank-slot-logo">
                    <BankLogo bank={bank} size={64} />
                  </div>
                  <div className="compare-bank-slot-name">{bank.name}</div>
                  <div className="compare-bank-slot-rate">{bank.interestRate}% p.a.</div>
                  <button
                    type="button"
                    className="compare-bank-slot-remove"
                    onClick={() => removeBank(slotIndex)}
                    aria-label={`${t('compare.remove')} ${bank.name}`}
                  >
                    {t('compare.remove')}
                  </button>
                </div>
              ) : (
                <div className="compare-bank-slot-card add">
                  <span className="compare-bank-slot-add-label">{t('compare.addBank')}</span>
                  {availableBanks.length > 0 ? (
                    <select
                      className="compare-bank-slot-select"
                      value=""
                      onChange={(e) => {
                        const id = e.target.value
                        if (!id) return
                        const b = emiBanks.find((x) => x.id === id)
                        if (b) addBank(b, slotIndex)
                        e.target.value = ''
                      }}
                    >
                      <option value="">{t('compare.chooseBank')}</option>
                      {availableBanks.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.interestRate}%)
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="compare-bank-slot-full">{t('compare.noMoreBanks')}</span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Comparison table: rows = attributes, columns = 3 banks */}
      {filledSlots > 0 && (
        <div className="compare-bank-table-wrapper">
          <h3 className="compare-bank-table-title">{t('compare.comparison')}</h3>
          <div className="compare-bank-table-scroll">
            <table className="compare-bank-table">
              <thead>
                <tr>
                  <th className="compare-bank-th compare-bank-th-label">{t('compare.parameter')}</th>
                  {(selectedBanks[0] ?? selectedBanks[1] ?? selectedBanks[2]) &&
                    [0, 1, 2].map((i) => {
                      const b = selectedBanks[i]
                      if (!b) return <th key={i} className="compare-bank-th compare-bank-th-empty" />
                      return (
                        <th key={b.id} className="compare-bank-th compare-bank-th-bank">
                          <div className="compare-bank-th-logo">
                            <BankLogo bank={b} size={56} />
                          </div>
                          <div className="compare-bank-th-name">{b.name}</div>
                          <div className="compare-bank-th-rate">{b.interestRate}% p.a.</div>
                        </th>
                      )
                    })}
                </tr>
              </thead>
              <tbody>
                {selectedBanks.filter(Boolean).length > 0 &&
                  (selectedBanks[0] ?? selectedBanks[1] ?? selectedBanks[2]) && (
                    <>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.monthlyEmi')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          const { emi } = calcEmi(amount, b.interestRate, months)
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-value highlight">
                              {formatCurrency(emi)}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.totalInterestPayable')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          const { totalInterest } = calcEmi(amount, b.interestRate, months)
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-value">
                              {formatCurrency(totalInterest)}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.totalPayment')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          const { totalPayment } = calcEmi(amount, b.interestRate, months)
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-value">
                              {formatCurrency(totalPayment)}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.processingFee')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-desc">
                              {b.processingFee}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.loanAmountRange')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-desc">
                              {formatCurrency(b.minAmount)} – {formatCurrency(b.maxAmount)}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.tenureRange')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-desc">
                              {b.minTenureYrs}–{b.maxTenureYrs} {t('compare.years')}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.description')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-desc">
                              {b.description}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="compare-bank-td-label">{t('compare.keyFeatures')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          return (
                            <td key={b.id} className="compare-bank-td compare-bank-td-features">
                              <ul>
                                {b.features.map((f, j) => (
                                  <li key={j}>{f}</li>
                                ))}
                              </ul>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className="compare-bank-td-actions-row">
                        <td className="compare-bank-td-label">{t('compare.apply')}</td>
                        {[0, 1, 2].map((i) => {
                          const b = selectedBanks[i]
                          if (!b) return <td key={i} className="compare-bank-td" />
                          return (
                            <td key={b.id} className="compare-bank-td">
                              <a
                                href={b.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="compare-bank-apply-btn"
                              >
                                {t('compare.applyWith')} {b.name}
                              </a>
                            </td>
                          )
                        })}
                      </tr>
                    </>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
