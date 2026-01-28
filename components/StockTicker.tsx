'use client'

import { useEffect, useState } from 'react'

interface BankLoan {
  bank: string
  loanType: string
  roi: number
}

interface TickerItem {
  type: 'bank' | 'loan'
  bank?: string
  loanType?: string
  roi?: number
}

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

  const formatROI = (roi: number) => {
    return `${roi.toFixed(2)}%`
  }

  // Group loans by bank and create ticker items
  const createTickerItems = (): TickerItem[] => {
    const items: TickerItem[] = []
    const groupedByBank: { [key: string]: BankLoan[] } = {}

    // Group loans by bank
    bankLoans.forEach((loan) => {
      if (!groupedByBank[loan.bank]) {
        groupedByBank[loan.bank] = []
      }
      groupedByBank[loan.bank].push(loan)
    })

    // Create ticker items: bank name first, then all its loans
    Object.entries(groupedByBank).forEach(([bank, loans]) => {
      // Add bank name item
      items.push({ type: 'bank', bank })
      // Add all loan items for this bank
      loans.forEach((loan) => {
        items.push({
          type: 'loan',
          bank: loan.bank,
          loanType: loan.loanType,
          roi: loan.roi,
        })
      })
    })

    return items
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

  if (error && bankLoans.length === 0) {
    return null // Don't show ticker if there's an error and no data
  }

  const tickerItems = createTickerItems()

  return (
    <div className="stock-ticker">
      <div className="stock-ticker-content">
        {tickerItems.map((item, index) => {
          if (item.type === 'bank') {
            return (
              <div key={`bank-${item.bank}-${index}`} className="stock-ticker-item">
                <span className="stock-symbol" style={{ fontSize: '14px', fontWeight: '700' }}>
                  {item.bank}
                </span>
              </div>
            )
          } else {
            return (
              <div key={`loan-${item.bank}-${item.loanType}-${index}`} className="stock-ticker-item">
                <span className="stock-price">{item.loanType}</span>
                <span className="stock-change positive">
                  ROI: {formatROI(item.roi!)}
                </span>
              </div>
            )
          }
        })}
        {/* Duplicate items for seamless scrolling effect */}
        {tickerItems.map((item, index) => {
          if (item.type === 'bank') {
            return (
              <div key={`bank-${item.bank}-${index}-dup`} className="stock-ticker-item">
                <span className="stock-symbol" style={{ fontSize: '14px', fontWeight: '700' }}>
                  {item.bank}
                </span>
              </div>
            )
          } else {
            return (
              <div key={`loan-${item.bank}-${item.loanType}-${index}-dup`} className="stock-ticker-item">
                <span className="stock-price">{item.loanType}</span>
                <span className="stock-change positive">
                  ROI: {formatROI(item.roi!)}
                </span>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
