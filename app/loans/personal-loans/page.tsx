import LoanCalculator from '@/components/LoanCalculator'
import LoanTypeSwitcher from '@/components/LoanTypeSwitcher'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Loan Calculator | Zineegroup',
  description: 'Calculate your personal loan EMI with our easy-to-use calculator. Apply for personal loans up to ₹50 lakhs.',
}

export default function PersonalLoansPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
      <div className="loan-page-container">
        <div className="loan-page-header">
          <h1>Personal Loans</h1>
          <p>Whether it's for debt repayment or big life ambitions, a personal loan can be an excellent financial instrument.</p>
        </div>
        <LoanTypeSwitcher />
        <LoanCalculator
          loanType="Personal Loan"
          defaultInterestRate={10.5}
          minAmount={50000}
          maxAmount={5000000}
        />
      </div>
    </main>
    <Footer />
    </>
  )
}
