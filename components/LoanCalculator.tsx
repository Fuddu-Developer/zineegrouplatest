'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface Bank {
  id: string
  name: string
  logo?: string
  interestRate: number
  processingFee: string
  minAmount: number
  maxAmount: number
  minTenure: number
  maxTenure: number
  eligibility: string[]
  features: string[]
  maxLoanAmount: number
}

interface LoanCalculatorProps {
  loanType: string
  defaultBanks?: Bank[]
  minAmount?: number
  maxAmount?: number
  defaultInterestRate?: number
}

const defaultBanks: Bank[] = [
  {
    id: 'canara',
    name: 'Canara Bank',
    logo: '/assets/images/CB.png',
    interestRate: 10.5,
    processingFee: 'Up to 2% of loan amount',
    minAmount: 50000,
    maxAmount: 30000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 30000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-60 years', 'Min Income: ₹15,000/month'],
    features: ['Government bank', 'Competitive rates', 'Flexible tenure', 'Trusted service'],
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    logo: '/assets/images/AX.png',
    interestRate: 10.49,
    processingFee: 'Up to 2% of loan amount',
    minAmount: 50000,
    maxAmount: 40000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 40000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-60 years', 'Min Income: ₹15,000/month'],
    features: ['Instant approval', 'Zero foreclosure charges', 'Flexible EMI options', 'Digital process'],
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    logo: '/assets/images/HDFC.png',
    interestRate: 10.5,
    processingFee: 'Up to 2.5% of loan amount',
    minAmount: 50000,
    maxAmount: 40000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 40000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-60 years', 'Min Income: ₹15,000/month'],
    features: ['Quick approval', 'Flexible tenure', 'No prepayment charges', 'Online application'],
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    logo: '/assets/images/Kotak-1.png',
    interestRate: 10.99,
    processingFee: 'Up to 2.5% of loan amount',
    minAmount: 50000,
    maxAmount: 30000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 30000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-58 years', 'Min Income: ₹20,000/month'],
    features: ['Fast processing', 'Competitive rates', 'No hidden charges', 'Easy documentation'],
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    logo: '/assets/images/PNB.png',
    interestRate: 10.85,
    processingFee: 'Up to 1.5% of loan amount',
    minAmount: 50000,
    maxAmount: 20000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 20000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-58 years', 'Min Income: ₹15,000/month'],
    features: ['Low processing fee', 'Government bank', 'Flexible repayment', 'Trusted service'],
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    logo: '/assets/images/BOB.png',
    interestRate: 10.50,
    processingFee: 'Up to 2% of loan amount',
    minAmount: 50000,
    maxAmount: 30000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 30000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-60 years', 'Min Income: ₹15,000/month'],
    features: ['Competitive rates', 'Quick processing', 'Flexible terms', 'Easy documentation'],
  },
]

export default function LoanCalculator({
  loanType,
  defaultBanks: banks = defaultBanks,
  minAmount = 50000,
  maxAmount = 5000000,
  defaultInterestRate = 10.5,
}: LoanCalculatorProps) {
  const [selectedBank, setSelectedBank] = useState(banks[0].id)
  const [loanAmount, setLoanAmount] = useState(500000)
  const [tenure, setTenure] = useState(3)
  const [tenureUnit, setTenureUnit] = useState<'Yr' | 'Mo'>('Yr')
  const [showComparison, setShowComparison] = useState(false)
  const [showBankDetails, setShowBankDetails] = useState(false)

  // Get selected bank details
  const selectedBankData = banks.find(bank => bank.id === selectedBank) || banks[0]
  const interestRate = selectedBankData.interestRate

  // Update loan amount limits based on selected bank
  useEffect(() => {
    if (loanAmount > selectedBankData.maxLoanAmount) {
      setLoanAmount(selectedBankData.maxLoanAmount)
    }
    if (loanAmount < selectedBankData.minAmount) {
      setLoanAmount(selectedBankData.minAmount)
    }
  }, [selectedBank, selectedBankData.maxLoanAmount, selectedBankData.minAmount, loanAmount])

  // Quick select amounts (in rupees)
  const quickAmounts = [
    { label: '₹1L', value: 100000 },
    { label: '₹5L', value: 500000 },
    { label: '₹10L', value: 1000000 },
    { label: '₹15L', value: 1500000 },
    { label: '₹20L', value: 2000000 },
  ]

  // Calculate EMI using Indian standard formula
  // EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
  // Where P = Principal, R = Monthly Interest Rate, N = Number of months
  const calculateEMI = useCallback(() => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfMonths = tenureUnit === 'Yr' ? tenure * 12 : tenure

    if (monthlyRate === 0) {
      return principal / numberOfMonths
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1)

    return Math.round(emi)
  }, [loanAmount, interestRate, tenure, tenureUnit])

  const emi = calculateEMI()
  const numberOfMonths = tenureUnit === 'Yr' ? tenure * 12 : tenure
  const totalAmount = Math.round(emi * numberOfMonths)
  const interestAmount = totalAmount - loanAmount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate processing fee
  const processingFeeAmount = Math.round(loanAmount * (parseFloat(selectedBankData.processingFee.match(/\d+\.?\d*/)?.[0] || '2') / 100))

  // Sort banks by interest rate for comparison
  const sortedBanks = [...banks].sort((a, b) => a.interestRate - b.interestRate)

  return (
    <div className="loan-calculator-container">
      <div className="loan-calculator-grid">
        {/* Left Section: Input Form */}
        <div className="calculator-form">
          <h2 className="calculator-title">Calculate Your {loanType}</h2>

          {/* Bank Selection with Interest Rates */}
          <div className="form-section">
            <div className="form-label-row">
              <label className="form-label">Select Your Bank</label>
              <div className="action-buttons">
                <button
                  type="button"
                  className="comparison-toggle"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  {showComparison ? 'Hide' : 'Compare'} Banks
                </button>
              </div>
            </div>
            <div className="bank-selector">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  className={`bank-option ${selectedBank === bank.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBank(bank.id)}
                  type="button"
                >
                  <div className="bank-option-content">
                    {bank.logo && (
                      <div className="bank-logo-container">
                        <Image
                          src={bank.logo}
                          alt={bank.name}
                          width={120}
                          height={90}
                          className="bank-logo"
                        />
                      </div>
                    )}
                    <span className="bank-rate">{bank.interestRate}% p.a.</span>
                  </div>
                </button>
              ))}
            </div>
            {showComparison && (
              <div className="bank-comparison-table">
                <h4 className="comparison-title">Bank Comparison</h4>
                <div className="comparison-table">
                  <div className="comparison-header">
                    <div>Bank</div>
                    <div>Interest Rate</div>
                    <div>Processing Fee</div>
                    <div>Max Loan</div>
                    <div>Action</div>
                  </div>
                  {sortedBanks.map((bank) => (
                    <div key={bank.id} className={`comparison-row ${selectedBank === bank.id ? 'selected' : ''}`}>
                      <div className="comparison-bank-name">
                        {bank.logo && (
                          <Image
                            src={bank.logo}
                            alt={bank.name}
                            width={80}
                            height={60}
                            className="comparison-bank-logo"
                          />
                        )}
                        <span>{bank.name}</span>
                      </div>
                      <div className="comparison-rate">{bank.interestRate}%</div>
                      <div className="comparison-fee">{bank.processingFee}</div>
                      <div className="comparison-max">{formatCurrency(bank.maxLoanAmount)}</div>
                      <div>
                        <button
                          type="button"
                          className="comparison-select-btn"
                          onClick={() => {
                            setSelectedBank(bank.id)
                            setShowComparison(false)
                          }}
                        >
                          {selectedBank === bank.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Bank Details */}
          <div className="form-section bank-details-section">
            <button
              type="button"
              className="bank-details-toggle"
              onClick={() => setShowBankDetails(!showBankDetails)}
            >
              <span>View {selectedBankData.name} Details</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={showBankDetails ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
              </svg>
            </button>
            {showBankDetails && (
              <div className="bank-details-content">
                <div className="bank-detail-item">
                  <strong>Processing Fee:</strong> {selectedBankData.processingFee}
                </div>
                <div className="bank-detail-item">
                  <strong>Loan Amount Range:</strong> {formatCurrency(selectedBankData.minAmount)} - {formatCurrency(selectedBankData.maxLoanAmount)}
                </div>
                <div className="bank-detail-item">
                  <strong>Tenure:</strong> {selectedBankData.minTenure} - {selectedBankData.maxTenure} years
                </div>
                <div className="bank-detail-features">
                  <strong>Eligibility:</strong>
                  <ul>
                    {selectedBankData.eligibility.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bank-detail-features">
                  <strong>Features:</strong>
                  <ul>
                    {selectedBankData.features.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Loan Amount */}
          <div className="form-section">
            <label className="form-label">
              Enter Loan Amount
              <span className="amount-limit">(Max: {formatCurrency(selectedBankData.maxLoanAmount)})</span>
            </label>
            <div className="amount-display">{formatCurrency(loanAmount)}</div>
            <input
              type="range"
              min={selectedBankData.minAmount}
              max={Math.min(selectedBankData.maxLoanAmount, maxAmount)}
              step={10000}
              value={Math.min(loanAmount, selectedBankData.maxLoanAmount)}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>{formatCurrency(selectedBankData.minAmount)}</span>
              <span>{formatCurrency(Math.min(selectedBankData.maxLoanAmount, maxAmount))}</span>
            </div>
            <div className="quick-select-buttons">
              {quickAmounts
                .filter(amt => amt.value <= selectedBankData.maxLoanAmount)
                .map((amt) => (
                  <button
                    key={amt.value}
                    type="button"
                    className={`quick-btn ${loanAmount === amt.value ? 'active' : ''}`}
                    onClick={() => setLoanAmount(amt.value)}
                  >
                    {amt.label}
                  </button>
                ))}
            </div>
          </div>

          {/* Interest Rate - Now Auto-set from Bank */}
          <div className="form-section">
            <label className="form-label">
              Rate of Interest (Yearly %)
              <span className="rate-badge">Auto-set from {selectedBankData.name}</span>
            </label>
            <div className="rate-display">{interestRate}% p.a.</div>
            <div className="rate-info">
              <span className="rate-note">Interest rate is automatically set based on your selected bank</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="form-section">
            <label className="form-label">Loan Tenure</label>
            <div className="tenure-display">
              <span className="tenure-value">{tenure}</span>
              <div className="tenure-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${tenureUnit === 'Mo' ? 'active' : ''}`}
                  onClick={() => setTenureUnit('Mo')}
                >
                  Mo
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${tenureUnit === 'Yr' ? 'active' : ''}`}
                  onClick={() => setTenureUnit('Yr')}
                >
                  Yr
                </button>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={tenureUnit === 'Yr' ? 10 : 60}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>{tenureUnit === 'Yr' ? '1Y' : '1M'}</span>
              <span>{tenureUnit === 'Yr' ? '10Y' : '60M'}</span>
            </div>
          </div>
        </div>

        {/* Right Section: EMI Summary */}
        <div className="emi-summary">
          <div className="selected-bank-header">
            {selectedBankData.logo && (
              <div className="selected-bank-logo-container">
                <Image
                  src={selectedBankData.logo}
                  alt={selectedBankData.name}
                  width={140}
                  height={105}
                  className="selected-bank-logo"
                />
              </div>
            )}
            <div className="selected-bank-info">
              <h4 className="selected-bank-name">{selectedBankData.name}</h4>
              <span className="selected-bank-rate">{interestRate}% p.a.</span>
            </div>
          </div>
          <h3 className="emi-title">Your Monthly EMI Payment</h3>
          <div className="emi-amount">{formatCurrency(emi)}</div>
          <div className="emi-note">For {tenure} {tenureUnit === 'Yr' ? 'year' : 'month'}{tenure > 1 ? 's' : ''}</div>

          <div className="breakdown">
            <div className="breakdown-item">
              <span className="breakdown-label">Principal Amount</span>
              <span className="breakdown-value">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">Interest Amount</span>
              <span className="breakdown-value">{formatCurrency(interestAmount)}</span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">Processing Fee</span>
              <span className="breakdown-value">{formatCurrency(processingFeeAmount)}</span>
            </div>
            <div className="breakdown-item total">
              <span className="breakdown-label">Total Amount</span>
              <span className="breakdown-value">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="loan-highlights">
            <div className="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Quick Approval</span>
            </div>
            <div className="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Flexible Tenure</span>
            </div>
            <div className="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Online Process</span>
            </div>
          </div>

          <button className="cta-button-loan" type="button">
            Apply Now with {selectedBankData.name} →
          </button>
          <button className="secondary-button-loan" type="button">
            Get Expert Advice
          </button>
        </div>
      </div>
    </div>
  )
}
