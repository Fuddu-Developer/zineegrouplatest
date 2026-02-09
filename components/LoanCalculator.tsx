'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

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
  const calculations = useMemo(() => {
    const principal = amount
    const monthlyRate = interestRate / 12 / 100
    const totalMonths = tenureUnit === 'Yr' ? tenure * 12 : tenure

    let emiCalc = 0
    if (interestRate === 0) {
      emiCalc = principal / totalMonths
    } else {
      emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }

    const totalPay = emiCalc * totalMonths
    const totalInt = totalPay - principal

    // Yearly Breakdown Calculation
    const yearlyData = []
    let balance = principal
    let totalPrincipalPaid = 0
    let currentYearPrincipal = 0
    let currentYearInterest = 0
    let currentYearTotal = 0

    // We'll calculate month by month but aggregate by year
    const startYear = new Date().getFullYear()

    for (let m = 1; m <= totalMonths; m++) {
      const interestForMonth = balance * monthlyRate
      const principalForMonth = emiCalc - interestForMonth
      balance -= principalForMonth
      if (balance < 0) balance = 0

      currentYearPrincipal += principalForMonth
      currentYearInterest += interestForMonth
      currentYearTotal += emiCalc

      if (m % 12 === 0 || m === totalMonths) {
        const yearIndex = Math.ceil(m / 12) - 1
        const yearLabel = startYear + yearIndex

        totalPrincipalPaid += currentYearPrincipal
        const loanPaidPercent = (totalPrincipalPaid / principal) * 100

        yearlyData.push({
          year: yearLabel,
          principalPaid: Math.round(currentYearPrincipal),
          interestPaid: Math.round(currentYearInterest),
          totalPayment: Math.round(currentYearTotal),
          balance: Math.round(balance),
          loanPaidExecute: loanPaidPercent.toFixed(2) + '%'
        })

        // Reset for next year
        currentYearPrincipal = 0
        currentYearInterest = 0
        currentYearTotal = 0
      }
    }

    return {
      emi: Math.round(emiCalc),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
      yearlyData,
      startYear // return startYear for logic usage if needed
    }
  }, [amount, interestRate, tenure, tenureUnit])

  const { emi, totalInterest, totalPayment, yearlyData } = calculations

  // Pie Chart Data
  const pieData = [
    { name: t('emi.principalAmount'), value: amount },
    { name: t('emi.totalInterest'), value: totalInterest },
  ]

  // Colors
  const PRINCIPAL_COLOR_PIE = '#2563eb' // Blue 600
  const INTEREST_COLOR_PIE = '#93c5fd'  // Blue 300
  const PIE_COLORS = [PRINCIPAL_COLOR_PIE, INTEREST_COLOR_PIE]

  // Bar Chart Colors - Blue and White/Light Blue theme as requested
  // Using explicit hex values for "Blue and White" feel
  const PRINCIPAL_COLOR_BAR = '#1e3a8a' // Dark Blue (Slate 900 roughly) for Principal
  const INTEREST_COLOR_BAR = '#dbeafe'  // Very light blue (Blue 100) for Interest, gives a 'white-ish' contrast

  // Generic Input Handler
  const handleAmountChange = (val: string) => {
    const num = Number(val)
    if (!isNaN(num)) setAmount(Math.min(maxAmount, Math.max(minAmount, num)))
  }



  // Custom Tooltip to ensure readability of "Total Interest"
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {label && <p style={{ fontWeight: 600, marginBottom: '8px', color: '#111827' }}>{label}</p>}
          {payload.map((entry: any, index: number) => {
            const isInterest = entry.name === t('emi.totalInterest') || (entry.name && entry.name.toLowerCase().includes('interest'));
            const color = isInterest ? '#000000' : (entry.color || entry.payload?.fill || '#000');

            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: entry.color || entry.payload?.fill, marginRight: '8px', borderRadius: '2px' }}></div>
                <span style={{ color: color, fontSize: '0.9rem' }}>
                  {entry.name}: {formatCurrency(Number(entry.value))}
                </span>
              </div>
            )
          })}
        </div>
      )
    }
    return null
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

            {/* Pie Chart (Replaced Radar) */}
            <div className="emi-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        {/* Stacked Bar Chart with Slim Bars */}
        <div className="emi-bar-chart-section">
          <h3 className="emi-section-title">Amortization Chart</h3>
          <div className="emi-bar-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={yearlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={20} // Fixed slim width
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="principalPaid" stackId="a" fill={PRINCIPAL_COLOR_BAR} name={t('emi.principalAmount')} />
                <Bar dataKey="interestPaid" stackId="a" fill={INTEREST_COLOR_BAR} name={t('emi.totalInterest')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Repayment Schedule Table with Proper Borders */}
        <div className="emi-schedule-section">
          <h3 className="emi-section-title">
            Check Your Repayment Schedule
          </h3>
          <div className="overflow-x-auto">
            <table className="emi-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Principal (A)</th>
                  <th>Interest (B)</th>
                  <th>Total Payment (A + B)</th>
                  <th>Balance</th>
                  <th>Loan Paid To Date</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((row, index) => (
                  <tr key={row.year} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <td className="center-text font-bold">
                      {row.year}
                    </td>
                    <td>{formatCurrency(row.principalPaid)}</td>
                    <td>{formatCurrency(row.interestPaid)}</td>
                    <td>{formatCurrency(row.totalPayment)}</td>
                    <td>{formatCurrency(row.balance)}</td>
                    <td className="center-text">{row.loanPaidExecute}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
