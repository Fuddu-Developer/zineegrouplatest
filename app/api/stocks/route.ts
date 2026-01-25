import { NextResponse } from 'next/server'

// Base configuration for spoofed intraday data
const BASE_STOCKS = [
  { symbol: 'NIFTY', basePrice: 24000 },
  { symbol: 'BANKNIFTY', basePrice: 51000 },
  { symbol: 'RELIANCE', basePrice: 2800 },
  { symbol: 'HDFCBANK', basePrice: 1650 },
  { symbol: 'INFY', basePrice: 1650 },
  { symbol: 'TCS', basePrice: 3950 },
  { symbol: 'SBIN', basePrice: 820 },
  { symbol: 'ICICIBANK', basePrice: 1150 },
]

// Generate realistic-looking intraday moves around the base price
function generateSpoofStocks() {
  const MAX_INTRADAY_MOVE_PERCENT = 2 // total range ~ -1% to +1% around base

  return BASE_STOCKS.map((stock) => {
    const movePercent = (Math.random() - 0.5) * MAX_INTRADAY_MOVE_PERCENT // -1%..+1%
    const price = stock.basePrice * (1 + movePercent / 100)
    const change = stock.basePrice * (movePercent / 100)

    return {
      symbol: stock.symbol,
      price,
      change,
      changePercent: movePercent,
    }
  })
}

export async function GET() {
  try {
    const stocks = generateSpoofStocks()
    return NextResponse.json({ stocks }, { status: 200 })
  } catch (error: any) {
    console.error('Error generating spoof stock data:', error)
    return NextResponse.json(
      { error: 'Failed to generate stock data' },
      { status: 500 }
    )
  }
}
