import LoanCalculator from '@/components/LoanCalculator'
import LoanTypeSwitcher from '@/components/LoanTypeSwitcher'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Loan Calculator | Zineegroup',
  description: 'Calculate professional loan EMI for doctors, lawyers, CAs, and other professionals.',
}

export default function ProfessionalLoansPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
      <div className="loan-page-container">
        <div className="loan-page-header">
          <h1>Professional Loans</h1>
          <p>A professional loan is a type of funding meant for professionals, such as accountants and attorneys.</p>
        </div>
        <LoanTypeSwitcher />
        <LoanCalculator
          loanType="Professional Loan"
          defaultInterestRate={11.0}
          minAmount={100000}
          maxAmount={5000000}
        />
      </div>
    </main>
    <Footer />
    </>
  )
}
