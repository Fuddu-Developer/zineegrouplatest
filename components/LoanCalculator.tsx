'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export type LoanCalculatorParams = { amount: number; tenure: number; tenureUnit: 'Yr' | 'Mo' }

interface LoanCalculatorProps {
  loanType: string
  minAmount?: number
  maxAmount?: number
  defaultInterestRate?: number
  defaultBanks?: any[]
  /** Called when loan amount, tenure or tenure unit changes (e.g. for comparison section). */
  onParamsChange?: (params: LoanCalculatorParams) => void
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function LoanCalculator({
  loanType,
  minAmount = 100000,
  maxAmount = 10000000,
  defaultInterestRate = 10.5,
  onParamsChange,
}: LoanCalculatorProps) {
  const { t } = useLanguage()
  const [amount, setAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(defaultInterestRate)
  const [tenure, setTenure] = useState(3)
  const [tenureUnit, setTenureUnit] = useState<'Yr' | 'Mo'>('Yr')

  useEffect(() => {
    onParamsChange?.({ amount, tenure, tenureUnit })
  }, [amount, tenure, tenureUnit, onParamsChange])

  // Constants for Ranges
  const MIN_RATE = 1
  const MAX_RATE = 30

  // Tenure Constraints
  const minTenure = tenureUnit === 'Yr' ? 1 : 12
  const maxTenure = tenureUnit === 'Yr' ? 30 : 360

  // Calculations
  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const principal = amount
    const monthlyRate = interestRate / 12 / 100
    const months = tenureUnit === 'Yr' ? tenure * 12 : tenure

    let emiCalc = 0
    if (interestRate === 0) {
      emiCalc = principal / months
    } else {
      emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    }

    const totalPay = emiCalc * months
    const totalInt = totalPay - principal

    return {
      emi: Math.round(emiCalc),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay)
    }
  }, [amount, interestRate, tenure, tenureUnit])

  // Pie Chart Data
  const principalPercentage = (amount / totalPayment) * 100
  const interestPercentage = (totalInterest / totalPayment) * 100

  // SVG Chart Calculations
  const size = 200
  const strokeWidth = 25
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const principalDash = (principalPercentage / 100) * circumference
  const interestDash = (interestPercentage / 100) * circumference

  // Colors
  const PRINCIPAL_COLOR = '#10b981' // Emerald 500
  const INTEREST_COLOR = '#3b82f6'  // Blue

  // Generic Input Handler
  const handleAmountChange = (val: string) => {
    const num = Number(val)
    if (!isNaN(num)) setAmount(Math.min(maxAmount, Math.max(minAmount, num)))
  }

  return (
    <div className="loan-calculator-container">
      <h2 className="calculator-title">{t('emi.calculateYour')} {loanType}</h2>

      <div className="emi-calc-wrapper">
        <div className="emi-calc-grid">

          {/* Left Column: Inputs */}
          <div className="emi-inputs-section">

            {/* Amount Input */}
            <div className="emi-input-group">
              <div className="emi-input-header">
                <label className="emi-label">{t('emi.loanAmount')}</label>
                <div className="emi-input-control">
                  <span className="emi-currency-symbol">₹</span>
                  <input
                    type="text"
                    value={amount.toLocaleString('en-IN')} // formatting for display
                    onChange={(e) => {
                      const val = e.target.value.replace(/,/g, '')
                      if (!isNaN(Number(val))) setAmount(Number(val))
                    }}
                    onBlur={() => {
                      if (amount < minAmount) setAmount(minAmount)
                      if (amount > maxAmount) setAmount(maxAmount)
                    }}
                    className="emi-input-field"
                  />
                </div>
              </div>
              <div className="emi-slider-container">
                <input
                  type="range"
                  min={minAmount}
                  max={maxAmount}
                  step={10000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="emi-slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(amount - minAmount) / (maxAmount - minAmount) * 100}%, #e2e8f0 ${(amount - minAmount) / (maxAmount - minAmount) * 100}%, #e2e8f0 100%)`
                  }}
                />
              </div>
              <div className="emi-slider-range-labels">
                <span>{formatCurrency(minAmount)}</span>
                <span>{formatCurrency(maxAmount)}</span>
              </div>
            </div>

            {/* Interest Rate Input */}
            <div className="emi-input-group">
              <div className="emi-input-header">
                <label className="emi-label">{t('emi.rateOfInterest')}</label>
                <div className="emi-input-control">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="emi-input-field"
                  />
                  <span className="emi-currency-symbol">%</span>
                </div>
              </div>
              <div className="emi-slider-container">
                <input
                  type="range"
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="emi-slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(interestRate - MIN_RATE) / (MAX_RATE - MIN_RATE) * 100}%, #e2e8f0 ${(interestRate - MIN_RATE) / (MAX_RATE - MIN_RATE) * 100}%, #e2e8f0 100%)`
                  }}
                />
              </div>
              <div className="emi-slider-range-labels">
                <span>{MIN_RATE}%</span>
                <span>{MAX_RATE}%</span>
              </div>
            </div>

            {/* Tenure Input */}
            <div className="emi-input-group">
              <div className="emi-input-header">
                <label className="emi-label">{t('emi.loanTenure')}</label>
                <div className="flex gap-4 items-center">
                  <div className="emi-input-control" style={{ maxWidth: '100px' }}>
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="emi-input-field"
                    />
                  </div>
                  <div className="tenure-toggle-group">
                    <button
                      className={`tenure-toggle-btn ${tenureUnit === 'Yr' ? 'active' : ''}`}
                      onClick={() => {
                        if (tenureUnit === 'Mo') setTenure(Math.max(1, Math.round(tenure / 12)))
                        setTenureUnit('Yr')
                      }}
                    >
                      {t('emi.yr')}
                    </button>
                    <button
                      className={`tenure-toggle-btn ${tenureUnit === 'Mo' ? 'active' : ''}`}
                      onClick={() => {
                        if (tenureUnit === 'Yr') setTenure(tenure * 12)
                        setTenureUnit('Mo')
                      }}
                    >
                      {t('emi.mo')}
                    </button>
                  </div>
                </div>
              </div>
              <div className="emi-slider-container">
                <input
                  type="range"
                  min={minTenure}
                  max={maxTenure}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="emi-slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(tenure - minTenure) / (maxTenure - minTenure) * 100}%, #e2e8f0 ${(tenure - minTenure) / (maxTenure - minTenure) * 100}%, #e2e8f0 100%)`
                  }}
                />
              </div>
              <div className="emi-slider-range-labels">
                <span>{minTenure} {tenureUnit}</span>
                <span>{maxTenure} {tenureUnit}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Calculations & Chart */}
          <div className="emi-results-column">

            <div className="emi-stat-item">
              <div className="emi-stat-label">{t('emi.loanEmi')}</div>
              <div className="emi-stat-value highlight">{formatCurrency(emi)}</div>
            </div>

            <div className="emi-stat-item">
              <div className="emi-stat-label">{t('emi.totalInterestPayable')}</div>
              <div className="emi-stat-value">{formatCurrency(totalInterest)}</div>
            </div>

            <div className="emi-stat-item">
              <div className="emi-stat-label">{t('emi.totalPayment')}</div>
              <div className="emi-stat-value">{formatCurrency(totalPayment)}</div>
            </div>

            {/* Pie Chart */}
            <div className="emi-chart-container">
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Circle Background (Principal) */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={PRINCIPAL_COLOR}
                  strokeWidth={strokeWidth}
                />
                {/* Interest Arc */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={INTEREST_COLOR}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - interestDash}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ background: PRINCIPAL_COLOR }}></div>
                <span>{t('emi.principalAmount')}</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: INTEREST_COLOR }}></div>
                <span>{t('emi.totalInterest')}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
