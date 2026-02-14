'use client'

import { useState } from 'react'
import Image from 'next/image'

const SALARY_BANKS = ['HDFC Bank', 'ICICI Bank', 'SBI Bank', 'Kotak Bank', 'Yes Bank']

export default function AxisSinglePageForm({
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
  const formatPan = (value: string) => {
    const v = value.replace(/\s/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
    if (v.length <= 5) return v
    if (v.length <= 9) return `${v.slice(0, 5)} ${v.slice(5)}`
    return `${v.slice(0, 5)} ${v.slice(5, 9)} ${v.slice(9, 10)}`
  }

  const [formData, setFormData] = useState({
    pan: '',
    nameAsPerPan: '',
    gender: 'male',
    dateOfBirth: '',
    companyName: '',
    netMonthlySalary: '',
    salaryBankAccount: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    city: '',
    state: '',
    consentIndianCitizen: false,
    consentIncomeAbove: false,
    consentAxisEmpanel: false,
    consentShareData: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const selectBank = (bankName: string) => {
    setFormData(prev => ({ ...prev, salaryBankAccount: bankName }))
  }

  const canSubmit =
    formData.pan.replace(/\s/g, '').length >= 10 &&
    formData.nameAsPerPan.trim() &&
    formData.gender &&
    formData.dateOfBirth.trim() &&
    formData.companyName.trim() &&
    formData.netMonthlySalary.trim() &&
    formData.salaryBankAccount.trim() &&
    formData.addressLine1.trim() &&
    formData.pincode.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    formData.consentIndianCitizen &&
    formData.consentIncomeAbove &&
    formData.consentAxisEmpanel &&
    formData.consentShareData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || isSubmitting) return
    await onSubmit({
      ...formData,
      loanLabel,
      bankName: bank.name,
    })
  }

  return (
    <div className="axis-single-page">
      <header className="axis-single-header" style={{ backgroundColor: bank.color }}>
        <div className="axis-single-header-inner">
          <Image src={bank.logo} alt={bank.name} width={140} height={44} className="axis-single-logo" />
          <span className="axis-single-tagline">open | 24x7 PERSONAL LOANS</span>
          <div className="axis-single-header-links">
            <a href="#">Get Support</a>
            <a href="#">Log Out</a>
          </div>
        </div>
      </header>

      <div className="axis-single-body">
        <div className="axis-single-left">
          <h2 className="axis-single-dream">Dream Bigger with Personal Loans</h2>
          <ul className="axis-single-benefits">
            <li>Customise your Loan</li>
            <li>Review terms</li>
            <li>Get instant disbursement</li>
          </ul>
        </div>

        <div className="axis-single-right">
          <form onSubmit={handleSubmit} className="axis-single-form">
            <h3 className="axis-single-section-title">Personal Details</h3>
            <div className="axis-single-field">
              <label>PAN Number</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={(e) => setFormData(prev => ({ ...prev, pan: formatPan(e.target.value.replace(/\s/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '')) }))}
                placeholder="XXXXX XXXX X"
                maxLength={12}
                required
              />
            </div>
            <div className="axis-single-field">
              <label>Name as per PAN</label>
              <input type="text" name="nameAsPerPan" value={formData.nameAsPerPan} onChange={handleChange} placeholder="Enter your full name" required />
            </div>
            <div className="axis-single-field">
              <label>Gender</label>
              <div className="axis-single-gender">
                <label className={formData.gender === 'male' ? 'selected' : ''}>
                  <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
                </label>
                <label className={formData.gender === 'female' ? 'selected' : ''}>
                  <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
                </label>
                <label className={formData.gender === 'others' ? 'selected' : ''}>
                  <input type="radio" name="gender" value="others" checked={formData.gender === 'others'} onChange={handleChange} /> Others
                </label>
              </div>
            </div>
            <div className="axis-single-field">
              <label>Date of Birth</label>
              <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="YYYY-MM-DD" required />
            </div>
            <div className="axis-single-field">
              <label>Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter your company name" required />
            </div>
            <div className="axis-single-field">
              <label>Last Drawn Net Monthly Salary</label>
              <input type="text" name="netMonthlySalary" value={formData.netMonthlySalary} onChange={handleChange} placeholder="Enter amount" inputMode="numeric" required />
            </div>

            <h3 className="axis-single-section-title">Salary & Address</h3>
            <div className="axis-single-field">
              <label>Salary Bank Account</label>
              <p className="axis-single-hint">With at least 2 salary credits in the last 3 months</p>
              <input type="text" name="salaryBankAccount" value={formData.salaryBankAccount} onChange={handleChange} placeholder="Enter your bank name" required />
              <div className="axis-single-bank-chips">
                {SALARY_BANKS.map(b => (
                  <button key={b} type="button" className={formData.salaryBankAccount === b ? 'selected' : ''} onClick={() => selectBank(b)} style={{ borderColor: bank.primaryColor }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div className="axis-single-field">
              <label className="axis-single-address-label">Permanent Address</label>
              <div className="axis-single-address-fields">
                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address line 1" required />
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address line 2" />
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="PIN Code" maxLength={6} required />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
              </div>
            </div>

            <div className="axis-single-consents">
              <label><input type="checkbox" name="consentIndianCitizen" checked={formData.consentIndianCitizen} onChange={handleChange} required /> <span className="required-asterisk">*</span> I am an Indian citizen and pay taxes only in India</label>
              <label><input type="checkbox" name="consentIncomeAbove" checked={formData.consentIncomeAbove} onChange={handleChange} required /> <span className="required-asterisk">*</span> I confirm my household income is above ₹3,00,000 per annum</label>
              <label><input type="checkbox" name="consentAxisEmpanel" checked={formData.consentAxisEmpanel} onChange={handleChange} required /> <span className="required-asterisk">*</span> I further expressly consent and authorize Axis Bank&apos;s empanele... <a href="#">Read More</a></label>
              <label><input type="checkbox" name="consentShareData" checked={formData.consentShareData} onChange={handleChange} required /> <span className="required-asterisk">*</span> I hereby expressly consent to and authorize Axis Bank to share... <a href="#">Read More</a></label>
            </div>

            <button type="submit" className="axis-single-submit" disabled={!canSubmit || isSubmitting} style={{ backgroundColor: canSubmit ? bank.primaryColor : '#94a3b8' }}>
              {isSubmitting ? 'Submitting...' : 'View Loan Offer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
