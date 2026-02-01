import LoanCalculator from '@/components/LoanCalculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EMI Calculator | Zineegroup',
  description:
    'Calculate your monthly EMI, total interest, and total payment with our simple EMI calculator.',
}

export default function EmiCalculatorPage() {
  return (
    <div className="page-container">
      <Header />
      <div className="scrollable-content">
        <main className="loan-page-main">
          <div className="loan-page-container">
            <div className="loan-page-header">
              <h1>EMI Calculator</h1>
              <p>
                Enter your loan amount, interest rate, and tenure to instantly see your monthly EMI, total interest, and
                total repayment.
              </p>
            </div>
            <LoanCalculator
              loanType="EMI"
              defaultBanks={[]}
              defaultInterestRate={10.5}
              minAmount={50000}
              maxAmount={5000000}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

