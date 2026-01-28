import { NextResponse } from 'next/server'

// Bank loan ROI data - organized by bank
const BANK_LOAN_DATA = {
  'HDFC Bank': [
    { loanType: 'Personal Loan', roi: 10.5 },
    { loanType: 'Home Loan', roi: 8.75 },
    { loanType: 'Business Loan', roi: 12.25 },
  ],
  'Axis Bank': [
    { loanType: 'Personal Loan', roi: 10.75 },
    { loanType: 'Home Loan', roi: 8.95 },
    { loanType: 'Business Loan', roi: 12.5 },
  ],
  'Kotak Bank': [
    { loanType: 'Personal Loan', roi: 11.0 },
    { loanType: 'Home Loan', roi: 9.1 },
    { loanType: 'Business Loan', roi: 12.75 },
  ],
  'Canara Bank': [
    { loanType: 'Personal Loan', roi: 10.25 },
    { loanType: 'Home Loan', roi: 8.5 },
    { loanType: 'Business Loan', roi: 11.95 },
  ],
  'Bank of Baroda': [
    { loanType: 'Personal Loan', roi: 10.4 },
    { loanType: 'Home Loan', roi: 8.65 },
    { loanType: 'Business Loan', roi: 12.1 },
  ],
  'PNB': [
    { loanType: 'Personal Loan', roi: 10.35 },
    { loanType: 'Home Loan', roi: 8.6 },
    { loanType: 'Business Loan', roi: 12.0 },
  ],
}

// Generate bank loan ROI data with slight variations (similar to stock ticker behavior)
function generateBankLoanData() {
  const VARIATION_PERCENT = 0.1 // Small variation of ±0.1%
  const result: Array<{ bank: string; loanType: string; roi: number }> = []

  // Iterate through each bank and its loans, keeping them grouped by bank
  Object.entries(BANK_LOAN_DATA).forEach(([bank, loans]) => {
    loans.forEach((loan) => {
      const variation = (Math.random() - 0.5) * VARIATION_PERCENT * 2 // -0.1% to +0.1%
      const roi = loan.roi + variation

      result.push({
        bank,
        loanType: loan.loanType,
        roi: parseFloat(roi.toFixed(2)),
      })
    })
  })

  return result
}

export async function GET() {
  try {
    const stocks = generateBankLoanData()
    return NextResponse.json({ stocks }, { status: 200 })
  } catch (error: any) {
    console.error('Error generating bank loan data:', error)
    return NextResponse.json(
      { error: 'Failed to generate bank loan data' },
      { status: 500 }
    )
  }
}
