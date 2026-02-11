'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { emiBanks, type EmiBank } from '@/data/emiBanks'
import { emiNbfcs, type EmiNbfc } from '@/data/emiNbfcs'
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

function NbfcLogo({ nbfc, size = 48 }: { nbfc: EmiNbfc; size?: number }) {
  const [imageError, setImageError] = useState(false)

  if (nbfc.logo && !imageError) {
    return (
      <span className="compare-bank-logo-img-wrap compare-nbfc-logo" style={{ width: size, height: size }}>
        <Image
          src={nbfc.logo}
          alt=""
          width={size}
          height={size}
          className="compare-bank-logo-img"
          onError={() => setImageError(true)}
          unoptimized={nbfc.logo.startsWith('http')}
        />
      </span>
    )
  }
  return (
    <span className="compare-bank-logo-fallback compare-nbfc-fallback" style={{ width: size, height: size }}>
      {nbfc.name.charAt(0)}
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

const BANK_SLOTS = 2
const NBFC_SLOT_INDEX = 2

export default function BankLoanComparison({ amount, tenure, tenureUnit }: BankLoanComparisonParams) {
  const { t } = useLanguage()
  const [selectedBanks, setSelectedBanks] = useState<(EmiBank | null)[]>(() => {
    const hdfc = emiBanks.find((b) => b.id === 'hdfc') || emiBanks[0]
    const axis = emiBanks.find((b) => b.id === 'axis') || emiBanks[1]
    return [hdfc || null, axis || null]
  })
  const [selectedNbfc, setSelectedNbfc] = useState<EmiNbfc | null>(null)

  const months = tenureUnit === 'Yr' ? tenure * 12 : tenure

  const availableBanks = useMemo(() => {
    const selectedIds = new Set(selectedBanks.filter(Boolean).map((b) => b!.id))
    return emiBanks.filter((b) => !selectedIds.has(b.id))
  }, [selectedBanks])

  const addBank = (bank: EmiBank, slotIndex: number) => {
    if (slotIndex >= BANK_SLOTS) return
    setSelectedBanks((prev) => {
      const next = [...prev]
      next[slotIndex] = bank
      return next
    })
  }

  const removeBank = (slotIndex: number) => {
    setSelectedBanks((prev) => {
      const next = [...prev]
      next[slotIndex] = null
      return next
    })
  }

  const columns = [
    ...selectedBanks.map((b, i) => (b ? { type: 'bank' as const, bank: b, index: i } : null)).filter(Boolean),
    ...(selectedNbfc ? [{ type: 'nbfc' as const, nbfc: selectedNbfc, index: NBFC_SLOT_INDEX }] : []),
  ]
  const hasCompareData = columns.length > 0

  return (
    <section className="compare-bank-loans-section">
      <h2 className="compare-bank-loans-title">{t('compare.title')}</h2>
      <p className="compare-bank-loans-subtitle">{t('compare.subtitle')}</p>

      <div className="compare-bank-slots">
        {/* Slot 0 & 1: Banks */}
        {[0, 1].map((slotIndex) => {
          const bank = selectedBanks[slotIndex] ?? null
          return (
            <div key={slotIndex} className="compare-bank-slot">
              {bank ? (
                <div className="compare-bank-slot-card selected">
                  <div className="compare-bank-slot-logo">
                    <BankLogo bank={bank} size={100} />
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

        {/* Slot 2: NBFC (Bajaj, Tata, Aditya Birla, Cholamandalam, Piramal) */}
        <div className="compare-bank-slot">
          {selectedNbfc ? (
            <div className="compare-bank-slot-card selected compare-nbfc-slot">
              <div className="compare-bank-slot-logo">
                <NbfcLogo nbfc={selectedNbfc} size={100} />
              </div>
              <div className="compare-bank-slot-name">{selectedNbfc.name}</div>
              <div className="compare-bank-slot-rate">{selectedNbfc.interestRate}% p.a.</div>
              <button
                type="button"
                className="compare-bank-slot-remove"
                onClick={() => setSelectedNbfc(null)}
                aria-label={`${t('compare.remove')} ${selectedNbfc.name}`}
              >
                {t('compare.remove')}
              </button>
            </div>
          ) : (
            <div className="compare-bank-slot-card add compare-nbfc-slot-add">
              <span className="compare-bank-slot-add-label">{t('compare.addNbfc')}</span>
              <select
                className="compare-bank-slot-select"
                value=""
                onChange={(e) => {
                  const id = e.target.value
                  if (!id) return
                  const n = emiNbfcs.find((x) => x.id === id)
                  if (n) setSelectedNbfc(n)
                  e.target.value = ''
                }}
              >
                <option value="">{t('compare.chooseNbfc')}</option>
                {emiNbfcs.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} ({n.interestRate}%)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {hasCompareData && (
        <div className="compare-bank-table-wrapper compare-table-pro">
          <h3 className="compare-bank-table-title">{t('compare.comparison')}</h3>
          <div className="compare-bank-table-scroll">
            <table className="compare-bank-table compare-table-pro-table">
              <thead>
                <tr>
                  <th className="compare-bank-th compare-bank-th-label">{t('compare.parameter')}</th>
                  {selectedBanks[0] && (
                    <th className="compare-bank-th compare-bank-th-bank">
                      <div className="compare-bank-th-logo">
                        <BankLogo bank={selectedBanks[0]} size={56} />
                      </div>
                      <div className="compare-bank-th-name">{selectedBanks[0].name}</div>
                      <div className="compare-bank-th-rate">{selectedBanks[0].interestRate}% p.a.</div>
                    </th>
                  )}
                  {selectedBanks[1] && (
                    <th className="compare-bank-th compare-bank-th-bank">
                      <div className="compare-bank-th-logo">
                        <BankLogo bank={selectedBanks[1]} size={56} />
                      </div>
                      <div className="compare-bank-th-name">{selectedBanks[1].name}</div>
                      <div className="compare-bank-th-rate">{selectedBanks[1].interestRate}% p.a.</div>
                    </th>
                  )}
                  {selectedNbfc && (
                    <th className="compare-bank-th compare-bank-th-nbfc">
                      <div className="compare-bank-th-logo">
                        <NbfcLogo nbfc={selectedNbfc} size={56} />
                      </div>
                      <div className="compare-bank-th-name">{selectedNbfc.name}</div>
                      <div className="compare-bank-th-rate">{selectedNbfc.interestRate}% p.a.</div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="compare-table-row-emi">
                  <td className="compare-bank-td-label">{t('compare.monthlyEmi')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-value compare-emi-cell">
                      {formatCurrency(calcEmi(amount, selectedBanks[0].interestRate, months).emi)}
                    </td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-value compare-emi-cell">
                      {formatCurrency(calcEmi(amount, selectedBanks[1].interestRate, months).emi)}
                    </td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-value compare-emi-cell">
                      {formatCurrency(calcEmi(amount, selectedNbfc.interestRate, months).emi)}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="compare-bank-td-label">{t('compare.totalInterestPayable')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-value">
                      {formatCurrency(calcEmi(amount, selectedBanks[0].interestRate, months).totalInterest)}
                    </td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-value">
                      {formatCurrency(calcEmi(amount, selectedBanks[1].interestRate, months).totalInterest)}
                    </td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-value">
                      {formatCurrency(calcEmi(amount, selectedNbfc.interestRate, months).totalInterest)}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="compare-bank-td-label">{t('compare.totalPayment')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-value">
                      {formatCurrency(calcEmi(amount, selectedBanks[0].interestRate, months).totalPayment)}
                    </td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-value">
                      {formatCurrency(calcEmi(amount, selectedBanks[1].interestRate, months).totalPayment)}
                    </td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-value">
                      {formatCurrency(calcEmi(amount, selectedNbfc.interestRate, months).totalPayment)}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="compare-bank-td-label">{t('compare.processingFee')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-desc">{selectedBanks[0].processingFee}</td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-desc">{selectedBanks[1].processingFee}</td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-desc">{selectedNbfc.processingFee}</td>
                  )}
                </tr>
                <tr>
                  <td className="compare-bank-td-label">{t('compare.loanAmountRange')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-desc">
                      {formatCurrency(selectedBanks[0].minAmount)} – {formatCurrency(selectedBanks[0].maxAmount)}
                    </td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-desc">
                      {formatCurrency(selectedBanks[1].minAmount)} – {formatCurrency(selectedBanks[1].maxAmount)}
                    </td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-desc">
                      {formatCurrency(selectedNbfc.minAmount)} – {formatCurrency(selectedNbfc.maxAmount)}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="compare-bank-td-label">{t('compare.tenureRange')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-desc">
                      {selectedBanks[0].minTenureYrs}–{selectedBanks[0].maxTenureYrs} {t('compare.years')}
                    </td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-desc">
                      {selectedBanks[1].minTenureYrs}–{selectedBanks[1].maxTenureYrs} {t('compare.years')}
                    </td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-desc">
                      {selectedNbfc.minTenureYrs}–{selectedNbfc.maxTenureYrs} {t('compare.years')}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="compare-bank-td-label">{t('compare.description')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-desc">{selectedBanks[0].description}</td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-desc">{selectedBanks[1].description}</td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-desc">{selectedNbfc.description}</td>
                  )}
                </tr>
                <tr>
                  <td className="compare-bank-td-label">{t('compare.keyFeatures')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td compare-bank-td-features">
                      <ul>
                        {selectedBanks[0].features.map((f, j) => (
                          <li key={j}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td compare-bank-td-features">
                      <ul>
                        {selectedBanks[1].features.map((f, j) => (
                          <li key={j}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td compare-bank-td-features">
                      <ul>
                        {selectedNbfc.features.map((f, j) => (
                          <li key={j}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  )}
                </tr>
                <tr className="compare-bank-td-actions-row">
                  <td className="compare-bank-td-label">{t('compare.apply')}</td>
                  {selectedBanks[0] && (
                    <td className="compare-bank-td">
                      <a
                        href={selectedBanks[0].applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="compare-bank-apply-btn"
                      >
                        {t('compare.applyWith')} {selectedBanks[0].name}
                      </a>
                    </td>
                  )}
                  {selectedBanks[1] && (
                    <td className="compare-bank-td">
                      <a
                        href={selectedBanks[1].applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="compare-bank-apply-btn"
                      >
                        {t('compare.applyWith')} {selectedBanks[1].name}
                      </a>
                    </td>
                  )}
                  {selectedNbfc && (
                    <td className="compare-bank-td">
                      <a
                        href={selectedNbfc.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="compare-bank-apply-btn compare-apply-nbfc"
                      >
                        {t('compare.applyWith')} {selectedNbfc.name}
                      </a>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
