'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  eligibilityDetails?: {
    age: string
    employment: string[]
    workExperience: string
    income: string
    creditScore?: string
    documents?: string[]
  }
  applicationUrl?: string
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
    id: 'hdfc',
    name: 'HDFC Bank',
    interestRate: 10.5,
    processingFee: 'Up to 2.5% of loan amount',
    minAmount: 50000,
    maxAmount: 40000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 40000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-60 years', 'Min Income: ₹15,000/month'],
    features: ['Quick approval', 'Flexible tenure', 'No prepayment charges', 'Online application'],
    eligibilityDetails: {
      age: '21 to 60 years',
      employment: [
        'Employees working in private limited companies',
        'Employees of public sector undertakings (central, state, and local government bodies)'
      ],
      workExperience: 'Minimum of 2 years of total work experience, with at least 1 year in the current organisation',
      income: 'Minimum monthly net income of ₹25,000',
      creditScore: 'Minimum credit score of 720',
      documents: ['PAN Card', 'Aadhaar Card', 'Salary slips (last 3 months)', 'Bank statements (last 6 months)', 'Employment certificate']
    },
    applicationUrl: '/apply/hdfc'
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    interestRate: 10.49,
    processingFee: 'Up to 2% of loan amount',
    minAmount: 50000,
    maxAmount: 40000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 40000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-60 years', 'Min Income: ₹15,000/month'],
    features: ['Instant approval', 'Zero foreclosure charges', 'Flexible EMI options', 'Digital process'],
    eligibilityDetails: {
      age: '21 to 60 years',
      employment: [
        'Salaried employees from private and public sector companies',
        'Self-employed professionals and business owners'
      ],
      workExperience: 'Minimum 1 year of work experience',
      income: 'Minimum monthly income of ₹15,000 for salaried, ₹25,000 for self-employed',
      creditScore: 'Minimum credit score of 700',
      documents: ['PAN Card', 'Aadhaar Card', 'Salary slips/Bank statements', 'Identity proof', 'Address proof']
    },
    applicationUrl: '/apply/axis'
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    interestRate: 10.99,
    processingFee: 'Up to 2.5% of loan amount',
    minAmount: 50000,
    maxAmount: 30000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 30000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-58 years', 'Min Income: ₹20,000/month'],
    features: ['Fast processing', 'Competitive rates', 'No hidden charges', 'Easy documentation'],
    eligibilityDetails: {
      age: '21 to 58 years',
      employment: [
        'Salaried employees from private and public sector',
        'Self-employed professionals and business owners'
      ],
      workExperience: 'Minimum 1 year of work experience',
      income: 'Minimum monthly income of ₹20,000',
      creditScore: 'Minimum credit score of 700',
      documents: ['PAN Card', 'Aadhaar Card', 'Salary slips', 'Bank statements', 'Identity and address proof']
    },
    applicationUrl: '/apply/kotak'
  },
  {
    id: 'idfc',
    name: 'IDFC FIRST Bank',
    interestRate: 10.25,
    processingFee: 'Up to 3% of loan amount',
    minAmount: 50000,
    maxAmount: 40000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 40000000,
    eligibility: ['Salaried & Self-employed', 'Age: 23-60 years', 'Min Income: ₹15,000/month'],
    features: ['Low interest rates', 'Quick disbursal', 'Flexible repayment', 'Online approval'],
    eligibilityDetails: {
      age: '23 to 60 years',
      employment: [
        'Salaried employees',
        'Self-employed professionals and business owners'
      ],
      workExperience: 'Minimum 1 year of work experience',
      income: 'Minimum monthly income of ₹15,000',
      creditScore: 'Minimum credit score of 700',
      documents: ['PAN Card', 'Aadhaar Card', 'Income proof', 'Bank statements', 'KYC documents']
    },
    applicationUrl: '/apply/idfc'
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    interestRate: 10.50,
    processingFee: 'Up to 2% of loan amount',
    minAmount: 50000,
    maxAmount: 30000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 30000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-60 years', 'Min Income: ₹15,000/month'],
    features: ['Competitive rates', 'Quick processing', 'Flexible terms', 'Easy documentation'],
    eligibilityDetails: {
      age: '21 to 60 years',
      employment: [
        'Salaried employees',
        'Self-employed professionals and business owners'
      ],
      workExperience: 'Minimum 1 year of work experience',
      income: 'Minimum monthly income of ₹15,000',
      creditScore: 'Minimum credit score of 650',
      documents: ['PAN Card', 'Aadhaar Card', 'Income proof', 'Bank statements', 'KYC documents']
    },
    applicationUrl: '/apply/bob'
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    interestRate: 10.85,
    processingFee: 'Up to 1.5% of loan amount',
    minAmount: 50000,
    maxAmount: 20000000,
    minTenure: 1,
    maxTenure: 5,
    maxLoanAmount: 20000000,
    eligibility: ['Salaried & Self-employed', 'Age: 21-58 years', 'Min Income: ₹15,000/month'],
    features: ['Low processing fee', 'Government bank', 'Flexible repayment', 'Trusted service'],
    eligibilityDetails: {
      age: '21 to 58 years',
      employment: [
        'Salaried employees from government and private sector',
        'Self-employed professionals'
      ],
      workExperience: 'Minimum 2 years of work experience',
      income: 'Minimum monthly income of ₹15,000',
      creditScore: 'Minimum credit score of 650',
      documents: ['PAN Card', 'Aadhaar Card', 'Salary certificate', 'Bank statements', 'Identity proof']
    },
    applicationUrl: '/apply/pnb'
  },
]

export default function LoanCalculator({
  loanType,
  defaultBanks: banks = defaultBanks,
  minAmount = 50000,
  maxAmount = 5000000,
  defaultInterestRate = 10.5,
}: LoanCalculatorProps) {
  const router = useRouter()
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
                    <span className="bank-name">{bank.name}</span>
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
                      <div className="comparison-bank-name">{bank.name}</div>
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

        {/* Right Section: Eligibility Section */}
        <div className="right-section-container">
          <div className="eligibility-summary">
            <h3 className="eligibility-title">Eligibility Criteria</h3>
            
            {selectedBankData.eligibilityDetails ? (
              <div className="eligibility-content">
                <div className="eligibility-section">
                  <div className="eligibility-item">
                    <svg className="eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div>
                      <strong>Age:</strong> {selectedBankData.eligibilityDetails.age}
                    </div>
                  </div>
                  
                  <div className="eligibility-item">
                    <svg className="eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div>
                      <strong>Employment:</strong>
                      <ul className="eligibility-list">
                        {selectedBankData.eligibilityDetails.employment.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="eligibility-item">
                    <svg className="eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <div>
                      <strong>Work Experience:</strong> {selectedBankData.eligibilityDetails.workExperience}
                    </div>
                  </div>
                  
                  <div className="eligibility-item">
                    <svg className="eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <div>
                      <strong>Income:</strong> {selectedBankData.eligibilityDetails.income}
                    </div>
                  </div>
                  
                  {selectedBankData.eligibilityDetails.creditScore && (
                    <div className="eligibility-item">
                      <svg className="eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <div>
                        <strong>Credit Score:</strong> {selectedBankData.eligibilityDetails.creditScore}
                      </div>
                    </div>
                  )}
                  
                  {selectedBankData.eligibilityDetails.documents && (
                    <div className="eligibility-item">
                      <svg className="eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      <div>
                        <strong>Required Documents:</strong>
                        <ul className="eligibility-list">
                          {selectedBankData.eligibilityDetails.documents.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="eligibility-content">
                <div className="eligibility-section">
                  {selectedBankData.eligibility.map((item, idx) => (
                    <div key={idx} className="eligibility-item">
                      <svg className="eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Separate EMI Calculator Container - Below */}
      <div className="emi-calculator-container">
        <div className="emi-summary">
          <div className="selected-bank-header">
            <h4 className="selected-bank-name">{selectedBankData.name}</h4>
            <span className="selected-bank-rate">{interestRate}% p.a.</span>
          </div>
          
          <h3 className="emi-title">Calculate Your EMI</h3>
          
          <div className="emi-calculator-section">
            <div className="emi-display-box">
              <div className="emi-label">Monthly EMI</div>
              <div className="emi-amount-small">{formatCurrency(emi)}</div>
              <div className="emi-note-small">For {tenure} {tenureUnit === 'Yr' ? 'year' : 'month'}{tenure > 1 ? 's' : ''}</div>
            </div>
            
            <div className="breakdown-small">
              <div className="breakdown-item-small">
                <span>Principal</span>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
              <div className="breakdown-item-small">
                <span>Interest</span>
                <span>{formatCurrency(interestAmount)}</span>
              </div>
              <div className="breakdown-item-small">
                <span>Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <button 
              className="cta-button-loan" 
              type="button"
              onClick={() => {
                const url = selectedBankData.applicationUrl || `/apply/${selectedBankData.id}?loanType=${encodeURIComponent(loanType)}&amount=${loanAmount}&tenure=${tenure}&tenureUnit=${tenureUnit}`
                router.push(url)
              }}
            >
              Apply with {selectedBankData.name} →
            </button>
            <button className="secondary-button-loan" type="button">
              Get Expert Advice
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
