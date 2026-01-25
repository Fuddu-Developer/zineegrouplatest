'use client'

import { useEffect, useState } from 'react'

interface Stock {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStocks = async () => {
    try {
      const response = await fetch('/api/stocks')
      if (!response.ok) {
        throw new Error('Failed to fetch stock data')
      }
      const data = await response.json()
      if (data.stocks && Array.isArray(data.stocks)) {
        setStocks(data.stocks)
        setError(null)
      } else {
        throw new Error('Invalid stock data format')
      }
    } catch (err: any) {
      console.error('Error fetching stocks:', err)
      setError(err.message || 'Failed to load stock data')
      // Keep previous data on error to avoid flickering
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch immediately on mount
    fetchStocks()

    // Set up polling every 30 seconds (adjust based on your API rate limits)
    const interval = setInterval(fetchStocks, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}`
  }

  const formatChangePercent = (percent: number) => {
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  // Don't render if there's an error and no stocks
  if (isLoading && stocks.length === 0) {
    return (
      <div className="stock-ticker">
        <div className="stock-ticker-content">
          <div className="stock-ticker-item">
            <span className="stock-loading">Loading stock data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error && stocks.length === 0) {
    return null // Don't show ticker if there's an error and no data
  }

  return (
    <div className="stock-ticker">
      <div className="stock-ticker-content">
        {stocks.map((stock, index) => (
          <div key={`${stock.symbol}-${index}`} className="stock-ticker-item">
            <span className="stock-symbol">{stock.symbol}</span>
            <span className="stock-price">${formatPrice(stock.price)}</span>
            <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
              {formatChange(stock.change)} ({formatChangePercent(stock.changePercent)})
            </span>
          </div>
        ))}
        {/* Duplicate items for seamless scrolling effect */}
        {stocks.map((stock, index) => (
          <div key={`${stock.symbol}-${index}-dup`} className="stock-ticker-item">
            <span className="stock-symbol">{stock.symbol}</span>
            <span className="stock-price">${formatPrice(stock.price)}</span>
            <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
              {formatChange(stock.change)} ({formatChangePercent(stock.changePercent)})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
