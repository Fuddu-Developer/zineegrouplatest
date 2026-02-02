'use client'

import { useState, useCallback } from 'react'
import LoanCalculator from '@/components/LoanCalculator'
import BankLoanComparison from '@/components/BankLoanComparison'
import type { LoanCalculatorParams } from '@/components/LoanCalculator'

export default function EmiCalculatorWithComparison() {
  const [params, setParams] = useState<LoanCalculatorParams>({
    amount: 500000,
    tenure: 3,
    tenureUnit: 'Yr',
  })

  const handleParamsChange = useCallback((p: LoanCalculatorParams) => {
    setParams(p)
  }, [])

  return (
    <>
      <LoanCalculator
        loanType="EMI"
        defaultBanks={[]}
        defaultInterestRate={10.5}
        minAmount={50000}
        maxAmount={5000000}
        onParamsChange={handleParamsChange}
      />
      <BankLoanComparison
        amount={params.amount}
        tenure={params.tenure}
        tenureUnit={params.tenureUnit}
      />
    </>
  )
}
