'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Option {
  id: string
  text: string
  nextFlow?: string
  href?: string
}

interface Message {
  id: string
  text: string
  title?: string
  sender: 'bot' | 'user'
  options?: Option[]
  timestamp: Date
}

interface LoanChatBotProps {
  showWhatsApp?: boolean
  showChatToggle?: boolean
  showLabel?: boolean
  embedded?: boolean
  onClose?: () => void
}

// Format bot text: support \n and • bullets
function FormattedMessage({ text, title }: { text: string; title?: string }) {
  const parts = text.split(/\n/).filter(Boolean)
  return (
    <div className="lc-message-body">
      {title && <div className="lc-message-title">{title}</div>}
      <div className="lc-message-text">
        {parts.map((line, i) => {
          const isList = line.trimStart().startsWith('•') || /^[\s]*[-*]\s/.test(line)
          const content = line.replace(/^[\s•\-*]+/, '').trim()
          if (!content) return null
          return isList ? (
            <div key={i} className="lc-message-list-item">
              <span className="lc-message-bullet" />
              <span>{content}</span>
            </div>
          ) : (
            <p key={i} className="lc-message-paragraph">{line}</p>
          )
        })}
      </div>
    </div>
  )
}

// All bot replies and options (single source of truth)
const FLOWS: Record<string, { title?: string; text: string; options: Option[] }> = {
  initial: {
    title: 'Welcome to Helloans',
    text: `I'm your loan guide. Choose a topic below—we'll go step by step so you get clear, useful answers.`,
    options: [
      { id: 'p', text: 'Personal Loans', nextFlow: 'personal' },
      { id: 'b', text: 'Business Loans', nextFlow: 'business' },
      { id: 'h', text: 'Home Loans', nextFlow: 'home' },
      { id: 'o', text: 'Gold, Education & Other Loans', nextFlow: 'other' },
      { id: 'emi', text: 'EMI & Repayment', nextFlow: 'emi-repayment' },
      { id: 'cibil', text: 'CIBIL & Eligibility', nextFlow: 'cibil' },
      { id: 'apply', text: 'I want to apply', nextFlow: 'apply-intro' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  personal: {
    title: 'Personal Loans',
    text: `Personal loans are unsecured—no collateral needed. Pick what you'd like to explore next.`,
    options: [
      { id: 'pt', text: 'Types of personal loans', nextFlow: 'personal-types' },
      { id: 'pe', text: 'Eligibility criteria', nextFlow: 'personal-eligibility' },
      { id: 'pd', text: 'Documents required', nextFlow: 'personal-documents' },
      { id: 'pi', text: 'Interest rates & fees', nextFlow: 'personal-interest' },
      { id: 'pr', text: 'Repayment & tenure tips', nextFlow: 'personal-repayment' },
      { id: 'pa', text: 'Loan amount & tenure range', nextFlow: 'personal-amount' },
      { id: 'ph', text: 'How to apply', nextFlow: 'personal-apply' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'personal-types': {
    title: 'Types of personal loans',
    text: `• Unsecured personal loans — No collateral; approval based on income & CIBIL\n• Secured personal loans — Backed by FD or savings; often lower interest\n• Debt consolidation — One loan to pay off multiple debts\n• Wedding / medical / travel — Purpose-based loans with flexible tenure\n• Top-up on existing loan — Extra amount on your current loan\n\nYou can compare offers on our EMI calculator.`,
    options: [
      { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal' },
      { id: 'pe', text: 'Eligibility', nextFlow: 'personal-eligibility' },
      { id: 'pi', text: 'Interest rates', nextFlow: 'personal-interest' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'personal-eligibility': {
    title: 'Personal loan eligibility',
    text: `• Age: Usually 21–60 years (varies by lender)\n• Income: Min. ₹15,000–₹25,000/month for salaried\n• CIBIL: 650+ preferred; 750+ for best rates\n• Employment: Salaried (1+ year) or self-employed (2+ years)\n• Debt-to-income: Ideally under 40%\n\nImproving your CIBIL and keeping documents ready speeds up approval.`,
    options: [
      { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal' },
      { id: 'pd', text: 'Documents', nextFlow: 'personal-documents' },
      { id: 'cibil', text: 'Improve CIBIL score', nextFlow: 'cibil' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'personal-documents': {
    title: 'Documents for personal loan',
    text: `• ID: Aadhaar, PAN, passport or driving licence\n• Address: Aadhaar, utility bill or rent agreement\n• Income: Last 3 months' salary slips + 6 months' bank statements\n• Employment: Offer letter or employment certificate\n• Photo: 1–2 passport-size\n\nSelf-employed: add ITR (2–3 years), GST and business proof.`,
    options: [
      { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal' },
      { id: 'ph', text: 'How to apply', nextFlow: 'personal-apply' },
      { id: 'apply', text: 'Apply now', nextFlow: 'apply-intro' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'personal-interest': {
    title: 'Interest rates & fees',
    text: `• Interest: Roughly 10.5%–24% p.a. depending on profile & lender\n• Processing: 0.5%–6% of loan amount (often capped)\n• Prepayment: Some banks allow with 0–4% charges\n• GST: 18% on processing fee\n\nUse our EMI calculator to see monthly instalments for different amounts and tenures.`,
    options: [
      { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal' },
      { id: 'emi', text: 'EMI & repayment', nextFlow: 'emi-repayment' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'personal-repayment': {
    title: 'Repayment & tenure',
    text: `• Tenure: Usually 12–60 months; choose based on EMI you're comfortable with\n• Shorter tenure = less interest, higher EMI\n• Longer tenure = lower EMI, more total interest\n• Prepayment and part-payment can reduce interest—check your lender's policy\n\nWe can help you plan EMI and prepayment.`,
    options: [
      { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal' },
      { id: 'emi', text: 'EMI calculator', nextFlow: 'emi-repayment' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'personal-amount': {
    title: 'Loan amount & tenure',
    text: `• Amount: From ₹10,000 to ₹40–50 lakh (lender-dependent)\n• Tenure: 12–60 months typically\n• Your limit depends on income, existing obligations and CIBIL\n\nUse our EMI calculator to try different combinations.`,
    options: [
      { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal' },
      { id: 'apply', text: 'Apply now', nextFlow: 'apply-intro' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'personal-apply': {
    title: 'How to apply',
    text: `1. Check eligibility and required documents\n2. Compare offers using our EMI calculator\n3. Click "Apply now" and fill the form\n4. Submit documents; we'll connect you with the right lender\n5. Get approval and disbursal as per the lender's process`,
    options: [
      { id: 'apply', text: 'Apply now', nextFlow: 'apply-intro' },
      { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  business: {
    title: 'Business loans',
    text: `From working capital to equipment funding—choose what you need.`,
    options: [
      { id: 'bt', text: 'Types of business loans', nextFlow: 'business-types' },
      { id: 'be', text: 'Eligibility', nextFlow: 'business-eligibility' },
      { id: 'bd', text: 'Documents', nextFlow: 'business-documents' },
      { id: 'bi', text: 'Interest & fees', nextFlow: 'business-interest' },
      { id: 'bh', text: 'How to apply', nextFlow: 'business-apply' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'business-types': {
    title: 'Types of business loans',
    text: `• Term loans — Lump sum for a fixed period\n• Working capital — For day-to-day operations\n• Machinery / equipment — For purchase\n• Invoice / receivables financing\n• Business line of credit — Draw as needed\n• Loan against property (LAP) for business`,
    options: [
      { id: 'back', text: '← Back to Business', nextFlow: 'business' },
      { id: 'be', text: 'Eligibility', nextFlow: 'business-eligibility' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'business-eligibility': {
    title: 'Business loan eligibility',
    text: `• Business age: Often 1–3+ years\n• Turnover: As per lender (e.g. ₹10L+)\n• CIBIL: 650+ for promoters\n• Registration: GST, incorporation/partnership proof\n• Cash flow: Positive and consistent`,
    options: [
      { id: 'back', text: '← Back to Business', nextFlow: 'business' },
      { id: 'bd', text: 'Documents', nextFlow: 'business-documents' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'business-documents': {
    title: 'Documents for business loan',
    text: `• Registration: Certificate of incorporation, partnership deed\n• KYC: Aadhaar, PAN of partners/directors\n• Financials: ITR, P&L, balance sheet (2–3 years)\n• Bank statements: 6–12 months\n• GST returns and registration`,
    options: [
      { id: 'back', text: '← Back to Business', nextFlow: 'business' },
      { id: 'bh', text: 'How to apply', nextFlow: 'business-apply' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'business-interest': {
    title: 'Interest & fees',
    text: `• Rate: Typically 8%–20% p.a.; secured loans often lower\n• Processing: 0.5%–3% of loan amount\n• Depends on turnover, collateral and credit profile.`,
    options: [
      { id: 'back', text: '← Back to Business', nextFlow: 'business' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'business-apply': {
    title: 'How to apply',
    text: `Share your business details and documents. Our team will match you with suitable lenders and guide you through the process.`,
    options: [
      { id: 'apply', text: 'Apply now', nextFlow: 'apply-intro' },
      { id: 'back', text: '← Back to Business', nextFlow: 'business' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  home: {
    title: 'Home loans',
    text: `From purchase to construction—here's what you need to know.`,
    options: [
      { id: 'ht', text: 'Types of home loans', nextFlow: 'home-types' },
      { id: 'he', text: 'Eligibility', nextFlow: 'home-eligibility' },
      { id: 'hd', text: 'Documents', nextFlow: 'home-documents' },
      { id: 'hi', text: 'Interest & tax benefits', nextFlow: 'home-interest' },
      { id: 'hh', text: 'How to apply', nextFlow: 'home-apply' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'home-types': {
    title: 'Types of home loans',
    text: `• Purchase (new/resale)\n• Construction\n• Plot + construction\n• Home improvement\n• Balance transfer from another bank`,
    options: [
      { id: 'back', text: '← Back to Home Loans', nextFlow: 'home' },
      { id: 'he', text: 'Eligibility', nextFlow: 'home-eligibility' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'home-eligibility': {
    title: 'Home loan eligibility',
    text: `• Age: 18–70 at loan maturity\n• Income: Min. ₹25,000–30,000/month (varies)\n• CIBIL: 650+ preferred\n• Down payment: Usually 10–20% of property value\n• FOIR: Generally up to 40–50%`,
    options: [
      { id: 'back', text: '← Back to Home Loans', nextFlow: 'home' },
      { id: 'hd', text: 'Documents', nextFlow: 'home-documents' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'home-documents': {
    title: 'Documents for home loan',
    text: `• ID & address: Aadhaar, PAN, passport\n• Income: Salary slips, Form 16, ITR (2–3 years)\n• Bank statements: 6 months\n• Property: Sale agreement, NOC, title papers\n• Photos and application form`,
    options: [
      { id: 'back', text: '← Back to Home Loans', nextFlow: 'home' },
      { id: 'hh', text: 'How to apply', nextFlow: 'home-apply' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'home-interest': {
    title: 'Interest & tax benefits',
    text: `• Rate: Around 8.5%–12% p.a. (varies)\n• Tax: Deduction on interest (Section 24) and principal (80C) as per income tax rules\n• Processing: ~0.5%–1% of loan amount`,
    options: [
      { id: 'back', text: '← Back to Home Loans', nextFlow: 'home' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'home-apply': {
    title: 'How to apply',
    text: `Submit your details and property documents. We'll connect you with partner banks and help with the process until disbursal.`,
    options: [
      { id: 'apply', text: 'Apply now', nextFlow: 'apply-intro' },
      { id: 'back', text: '← Back to Home Loans', nextFlow: 'home' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  other: {
    title: 'Gold, education & other loans',
    text: `We can help with several other loan products.`,
    options: [
      { id: 'gold', text: 'Gold loans', nextFlow: 'other-gold' },
      { id: 'edu', text: 'Education loans', nextFlow: 'other-education' },
      { id: 'car', text: 'Car / vehicle loans', nextFlow: 'other-car' },
      { id: 'lap', text: 'Loan against property', nextFlow: 'other-lap' },
      { id: 'bt', text: 'Balance transfer', nextFlow: 'other-bt' },
      { id: 'pro', text: 'Professional loans', nextFlow: 'other-professional' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'other-gold': {
    title: 'Gold loans',
    text: `• Loan against gold jewellery (e.g. 60–75% of value)\n• Quick disbursal, lower interest than many unsecured loans\n• Documents: ID, address, gold (for valuation)\n• Tenure: Short to medium term`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'other' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'other-education': {
    title: 'Education loans',
    text: `• For higher studies in India or abroad\n• Covers tuition, living and other costs\n• Moratorium possible during course + some time after\n• Collateral may be required for large amounts`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'other' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'other-car': {
    title: 'Car / vehicle loans',
    text: `• Finance for new or used cars\n• Loan up to 85–90% of on-road price\n• Tenure usually 1–7 years\n• Vehicle is security for the loan`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'other' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'other-lap': {
    title: 'Loan against property (LAP)',
    text: `• Loan secured by residential/commercial property\n• Lower interest than personal loans; higher amount\n• Used for business, education or other needs\n• Property valuation and legal checks apply`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'other' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'other-bt': {
    title: 'Balance transfer',
    text: `• Move your existing loan to another lender for lower rate or better terms\n• Can reduce EMI or total interest\n• Processing fee and prepayment charges on old loan may apply`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'other' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'other-professional': {
    title: 'Professional loans',
    text: `• For doctors, CAs, architects and similar professionals\n• Based on practice and income\n• Flexible tenure and quick processing for eligible applicants`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'other' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-repayment': {
    title: 'EMI & repayment',
    text: `Understand EMI and how to manage repayment better.`,
    options: [
      { id: 'what', text: 'What is EMI?', nextFlow: 'emi-what' },
      { id: 'reduce', text: 'How to reduce EMI', nextFlow: 'emi-reduce' },
      { id: 'prepay', text: 'Prepayment & part-payment', nextFlow: 'emi-prepay' },
      { id: 'tenure', text: 'Choosing tenure', nextFlow: 'emi-tenure' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-what': {
    title: 'What is EMI?',
    text: `EMI = Equated Monthly Instalment. It's a fixed amount you pay each month towards loan + interest. It depends on:\n• Loan amount\n• Interest rate\n• Tenure (months)\n\nUse our EMI calculator to try different combinations.`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'reduce', text: 'Reduce EMI', nextFlow: 'emi-reduce' },
      { id: 'calc', text: 'Open EMI calculator', href: '/emi-calculator' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-reduce': {
    title: 'How to reduce EMI',
    text: `• Opt for a longer tenure (EMI drops, total interest may rise)\n• Negotiate a lower rate with good CIBIL and stable income\n• Make a higher down payment to borrow less\n• Balance transfer to a lower-rate lender`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'prepay', text: 'Prepayment', nextFlow: 'emi-prepay' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-prepay': {
    title: 'Prepayment & part-payment',
    text: `• Full prepayment: Close the loan early (check charges)\n• Part-payment: Pay a lump sum to reduce principal and often EMI or tenure\n• Many lenders allow prepayment; charges vary (0–4%)\n• Reduces total interest when you prepay`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-tenure': {
    title: 'Choosing tenure',
    text: `• Shorter tenure: Higher EMI, less total interest, loan cleared sooner\n• Longer tenure: Lower EMI, more total interest\n• Pick tenure so EMI is comfortable and you can still prepay when possible`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'calc', text: 'Open EMI calculator', href: '/emi-calculator' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  cibil: {
    title: 'CIBIL & eligibility',
    text: `Your credit score affects loan approval and interest rates. Here's what helps.`,
    options: [
      { id: 'what', text: 'What is CIBIL score?', nextFlow: 'cibil-what' },
      { id: 'improve', text: 'How to improve score', nextFlow: 'cibil-improve' },
      { id: 'check', text: 'Check my score', nextFlow: 'cibil-check' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'cibil-what': {
    title: 'What is CIBIL score?',
    text: `• 3-digit number (300–900) that reflects your credit behaviour\n• 700+ is generally good; 750+ gets better rates\n• Based on repayment history, utilisation, tenure and enquiries\n• Lenders use it to decide approval and interest rate`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'cibil' },
      { id: 'improve', text: 'Improve my score', nextFlow: 'cibil-improve' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'cibil-improve': {
    title: 'How to improve CIBIL score',
    text: `• Pay all EMIs and bills on time\n• Keep card utilisation under 30%\n• Don't apply for too many loans at once\n• Keep old accounts open; avoid closing paid-off loans abruptly\n• Check your report for errors and get them corrected`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'cibil' },
      { id: 'check', text: 'Check my score', nextFlow: 'cibil-check' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'cibil-check': {
    title: 'Check your CIBIL score',
    text: `You can check your score for free on our CIBIL page. We'll only use it to suggest suitable offers.`,
    options: [
      { id: 'link', text: 'Open CIBIL page', href: '/cibil-score' },
      { id: 'back', text: '← Back', nextFlow: 'cibil' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'apply-intro': {
    title: 'Apply for a loan',
    text: `You can apply in a few steps. We'll connect you with the right lender and guide you till disbursal.`,
    options: [
      { id: 'go', text: 'Go to application', href: '/apply-for-loan' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'contact-form-name': {
    text: `I'd be happy to connect you with our team. What's your name?`,
    options: [],
  },
  'contact-form-number': { text: '', options: [] },
  'contact-complete': {
    text: '',
    options: [{ id: 'restart', text: 'Start over', nextFlow: 'initial' }],
  },
}

export default function LoanChatBot(props: LoanChatBotProps) {
  return <LoanChatBotInner {...props} />
}

function LoanChatBotInner({
  showWhatsApp = true,
  showChatToggle = true,
  showLabel = true,
  embedded = false,
  onClose,
}: LoanChatBotProps) {
  const [isOpen, setIsOpen] = useState(embedded)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentFlow, setCurrentFlow] = useState('initial')
  const [contactData, setContactData] = useState({ name: '', number: '' })
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const contactNameRef = useRef('')

  useEffect(() => {
    if (embedded) initChat()
  }, [embedded])

  useEffect(() => {
    if (!embedded && isOpen && messages.length === 0) initChat()
  }, [isOpen, embedded])

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-chatbot', handler)
    return () => window.removeEventListener('open-chatbot', handler)
  }, [])

  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  useEffect(() => {
    if (currentFlow === 'contact-form-name' || currentFlow === 'contact-form-number') {
      inputRef.current?.focus()
    }
  }, [currentFlow])

  function initChat() {
    const flow = FLOWS.initial
    setMessages([
      {
        id: '1',
        sender: 'bot',
        title: flow.title,
        text: flow.text,
        options: flow.options,
        timestamp: new Date(),
      },
    ])
    setCurrentFlow('initial')
  }

  function handleOption(option: Option) {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: option.text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])

    if (option.href) {
      setCurrentFlow('initial')
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Opening ${option.text.toLowerCase()}... You can continue here anytime.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setTimeout(() => window.open(option.href!, '_self'), 400)
      return
    }

    if (option.id === 'restart') {
      setContactData({ name: '', number: '' })
      setCurrentFlow('initial')
      setTimeout(() => initChat(), 100)
      return
    }

    const nextFlow = option.nextFlow
    if (!nextFlow) return

    setCurrentFlow(nextFlow)

    if (nextFlow === 'contact-form-name') {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: FLOWS['contact-form-name'].text,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      return
    }

    const flow = FLOWS[nextFlow]
    if (!flow) return
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      title: flow.title,
      text: flow.text,
      options: flow.options,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMsg])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const val = inputValue.trim()
    if (!val) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: val,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])

    if (currentFlow === 'contact-form-name') {
      contactNameRef.current = val
      setContactData((c) => ({ ...c, name: val }))
      setInputValue('')
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Thanks, ${val}! What's your 10-digit mobile number?`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setCurrentFlow('contact-form-number')
      }, 400)
    } else if (currentFlow === 'contact-form-number') {
      setContactData((c) => ({ ...c, number: val }))
      setInputValue('')
      const name = contactNameRef.current || contactData.name
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `We've received your details, ${name}. Our team will call you on ${val} soon. Anything else?`,
          options: [{ id: 'restart', text: 'Start over', nextFlow: 'initial' }],
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setCurrentFlow('contact-complete')
      }, 400)
    }
  }

  function handleClose() {
    if (embedded && onClose) {
      onClose()
    } else {
      setIsOpen(false)
      setTimeout(() => {
        setMessages([])
        setCurrentFlow('initial')
        setContactData({ name: '', number: '' })
      }, 300)
    }
  }

  const showInput =
    currentFlow === 'contact-form-name' || currentFlow === 'contact-form-number'

  return (
    <>
      {!embedded && showWhatsApp && (
        <a
          href="https://wa.me/919540185185?text=Hello!%20I%20need%20help%20with%20loans."
          target="_blank"
          rel="noopener noreferrer"
          className="lc-whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      )}

      {!embedded && !isOpen && showChatToggle && (
        <button
          type="button"
          className="lc-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Talk to an Expert"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          {showLabel && <span className="lc-toggle-label">Talk to an Expert</span>}
        </button>
      )}

      {(isOpen || embedded) && (
        <div className={`lc-container ${embedded ? 'lc-container-embedded' : ''}`}>
          <div className="lc-header">
            <div className="lc-header-left">
              <div className="lc-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div className="lc-header-text">
                <span className="lc-header-title">Loan Assistant</span>
                <span className="lc-header-sub">Helloans · Here to help</span>
              </div>
            </div>
            <button
              type="button"
              className="lc-close"
              onClick={handleClose}
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={messagesContainerRef} className="lc-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`lc-bubble-wrap lc-bubble-wrap--${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="lc-bubble-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                )}
                <div className={`lc-bubble lc-bubble--${msg.sender}`}>
                  {msg.sender === 'bot' ? (
                    <>
                      <FormattedMessage title={msg.title} text={msg.text} />
                      {msg.options && msg.options.length > 0 && (
                        <div className="lc-options">
                          {msg.options.map((opt) =>
                            opt.href ? (
                              <Link
                                key={opt.id}
                                href={opt.href}
                                className="lc-option lc-option--link"
                              >
                                {opt.text}
                              </Link>
                            ) : (
                              <button
                                key={opt.id}
                                type="button"
                                className="lc-option"
                                onClick={() => handleOption(opt)}
                              >
                                {opt.text}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="lc-message-body">
                      <div className="lc-message-text">{msg.text}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showInput && (
            <form className="lc-input-wrap" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type={currentFlow === 'contact-form-number' ? 'tel' : 'text'}
                className="lc-input"
                placeholder={
                  currentFlow === 'contact-form-name'
                    ? 'Your name'
                    : '10-digit mobile number'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                maxLength={currentFlow === 'contact-form-number' ? 10 : undefined}
              />
              <button type="submit" className="lc-send" aria-label="Send">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}

      <style jsx>{`
        .lc-whatsapp {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25d366;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
          z-index: 1000;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lc-whatsapp:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
        }
        .lc-whatsapp svg {
          width: 28px;
          height: 28px;
        }
        .lc-toggle {
          position: static;
          min-width: auto;
          height: 48px;
          padding: 0 22px;
          border-radius: 12px;
          gap: 10px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.2);
          color: #1e40af;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }
        .lc-toggle:hover {
          background: rgba(255, 255, 255, 0.45);
          box-shadow: 0 8px 28px rgba(59, 130, 246, 0.3);
          transform: translateY(-1px);
        }
        .lc-toggle svg {
          width: 22px;
          height: 22px;
        }
        .lc-toggle-label {
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}
