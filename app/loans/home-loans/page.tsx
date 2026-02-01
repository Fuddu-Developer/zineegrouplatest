import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home Loan & LAP | Zineegroup',
    description: 'Apply for home loans and loans against property with competitive interest rates.',
}

export default function HomeLoansPage() {
    return (
        <>
            <Header />
            <main className="loan-page-main">
                <div className="loan-page-container">
                    <div className="loan-page-header">
                        <h1>Home Loan & LAP</h1>
                        <p>Turn your dream home into reality or leverage your property for funds with our home loan solutions.</p>
                    </div>

                    <BankList offers={bankOffers['home-loans']} categoryTitle="Home Loan & LAP Offers" />
                </div>
            </main>
            <Footer />
        </>
    )
}
