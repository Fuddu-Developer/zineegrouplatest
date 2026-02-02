'use client'

import { useEffect, useState } from 'react'

interface BankLoan {
  bank: string
  loanType: string
  roi: number
}

// Fallback data when API fails so the ticker stays visible
const FALLBACK_BANK_LOANS: BankLoan[] = [
  { bank: 'HDFC Bank', loanType: 'Personal Loan', roi: 10.5 },
  { bank: 'HDFC Bank', loanType: 'Home Loan', roi: 8.75 },
  { bank: 'Axis Bank', loanType: 'Personal Loan', roi: 10.75 },
  { bank: 'Kotak Bank', loanType: 'Personal Loan', roi: 11.0 },
  { bank: 'Bank of Baroda', loanType: 'Personal Loan', roi: 10.4 },
  { bank: 'PNB', loanType: 'Personal Loan', roi: 10.35 },
]

export default function StockTicker() {
  const [bankLoans, setBankLoans] = useState<BankLoan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBankLoans = async () => {
    try {
      const response = await fetch('/api/stocks')
      if (!response.ok) {
        throw new Error('Failed to fetch bank loan data')
      }
      const data = await response.json()
      if (data.stocks && Array.isArray(data.stocks)) {
        setBankLoans(data.stocks)
        setError(null)
      } else {
        throw new Error('Invalid bank loan data format')
      }
    } catch (err: any) {
      console.error('Error fetching bank loans:', err)
      setError(err.message || 'Failed to load bank loan data')
      // Keep previous data on error to avoid flickering
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch immediately on mount
    fetchBankLoans()

    // Set up polling every 30 seconds to update ROIs
    const interval = setInterval(fetchBankLoans, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatROI = (roi?: number) => {
    if (roi === undefined || roi === null || Number.isNaN(roi)) {
      return 'N/A'
    }
    return `${roi.toFixed(2)}%`
  }

  // Group loans by bank — each bank appears once with all its loans under it
  const groupedByBank = (data: BankLoan[] = bankLoans): { bank: string; loans: BankLoan[] }[] => {
    const map: { [key: string]: BankLoan[] } = {}
    data.forEach((loan) => {
      if (!map[loan.bank]) map[loan.bank] = []
      map[loan.bank].push(loan)
    })
    return Object.entries(map).map(([bank, loans]) => ({ bank, loans }))
  }

  // Don't render if there's an error and no bank loans
  if (isLoading && bankLoans.length === 0) {
    return (
      <div className="stock-ticker">
        <div className="stock-ticker-content">
          <div className="stock-ticker-item">
            <span className="stock-loading">Loading bank loan rates...</span>
          </div>
        </div>
      </div>
    )
  }

  // Use fallback data when API fails and no cached data — keep ticker visible
  const dataToShow = error && bankLoans.length === 0 ? FALLBACK_BANK_LOANS : bankLoans
  const bankGroups = groupedByBank(dataToShow)

  return (
    <div className="stock-ticker">
      <div className="stock-ticker-content">
        {bankGroups.map((group, groupIndex) => (
          <div key={`group-${group.bank}-${groupIndex}`} className="stock-ticker-item stock-ticker-group">
            <span className="stock-symbol">{group.bank}</span>
            {group.loans.map((loan, loanIndex) => (
              <span key={`${group.bank}-${loan.loanType}-${loanIndex}`} className="stock-ticker-loan">
                <span className="stock-price">{loan.loanType}</span>
                <span className="stock-change positive">ROI: {formatROI(loan.roi)}</span>
              </span>
            ))}
          </div>
        ))}
        {/* Duplicate for seamless scrolling */}
        {bankGroups.map((group, groupIndex) => (
          <div key={`group-${group.bank}-${groupIndex}-dup`} className="stock-ticker-item stock-ticker-group">
            <span className="stock-symbol">{group.bank}</span>
            {group.loans.map((loan, loanIndex) => (
              <span key={`${group.bank}-${loan.loanType}-${loanIndex}-dup`} className="stock-ticker-loan">
                <span className="stock-price">{loan.loanType}</span>
                <span className="stock-change positive">ROI: {formatROI(loan.roi)}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
