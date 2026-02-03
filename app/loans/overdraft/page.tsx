import LoanCalculator from '@/components/LoanCalculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Overdraft Calculator | Zineegroup',
    description: 'Calculate your overdraft interest and limits. Get instant liquidity for your financial needs.',
}

export default function OverdraftPage() {
    return (
        <>
            <Header />
            <main className="loan-page-main">
                <div className="loan-page-container">
                    <div className="loan-page-header">
                        <h1>Overdraft</h1>
                        <p>An overdraft allows you to withdraw more money than you have in your account, providing flexible short-term funding.</p>
                    </div>

                    <LoanCalculator
                        loanType="Overdraft"
                        defaultInterestRate={12.0}
                        minAmount={50000}
                        maxAmount={5000000}
                    />
                </div>
            </main>
            <Footer />
        </>
    )
}
