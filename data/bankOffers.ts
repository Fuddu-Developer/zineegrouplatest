export type BankOffer = {
    bankName: string
    link: string
    description?: string
    /** Optional logo path under /assets/images or remote URL */
    logo?: string
    /** Optional brand color used to tint the tile background/border */
    brandColor?: string
    /** When set, "Apply Now" links to /apply/[internalApplySlug]?loanType=[category] */
    internalApplySlug?: string
}

export type OfferCategory =
    | 'personal-loans'
    | 'business-loans'
    | 'instant-loan'
    | 'credit-cards'
    | 'home-loans'
    | 'gold-loans'
    | 'education-loans'
    | 'insurance'

/** Only 7 banks (ICICI, IndusInd, YES, IDFC, Kotak, HDFC, Axis) + 3 NBFCs (Bajaj Finserv, Tata Capital, Aditya Birla Finance). Each category shows only those that offer that product. */
export const bankOffers: Record<OfferCategory, BankOffer[]> = {
    'personal-loans': [
        {
            bankName: 'ICICI Bank',
            link: '#',
            internalApplySlug: 'icici',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'IndusInd Bank',
            link: '#',
            internalApplySlug: 'indusind',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'YES Bank',
            link: '#',
            internalApplySlug: 'yes',
            logo: '/assets/images/partners/yes.png',
            brandColor: '#1e4f9c',
        },
        {
            bankName: 'IDFC First Bank',
            link: '#',
            internalApplySlug: 'idfc',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: '#',
            internalApplySlug: 'kotak',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'HDFC Bank',
            link: '#',
            internalApplySlug: 'hdfc',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'Axis Bank',
            link: '#',
            internalApplySlug: 'axis',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
    ],
    'business-loans': [
        {
            bankName: 'ICICI Bank',
            link: '#',
            internalApplySlug: 'icici',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'IndusInd Bank',
            link: '#',
            internalApplySlug: 'indusind',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'YES Bank',
            link: '#',
            internalApplySlug: 'yes',
            logo: '/assets/images/partners/yes.png',
            brandColor: '#1e4f9c',
        },
        {
            bankName: 'IDFC First Bank',
            link: '#',
            internalApplySlug: 'idfc',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: '#',
            internalApplySlug: 'kotak',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'HDFC Bank',
            link: '#',
            internalApplySlug: 'hdfc',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'Axis Bank',
            link: '#',
            internalApplySlug: 'axis',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
    ],
    'instant-loan': [
        {
            bankName: 'Axis Bank',
            link: 'https://www.axisbank.com/retail/loans/personal-loan',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        {
            bankName: 'Bajaj Finserv',
            link: 'https://www.bajajfinserv.in/personal-loans',
            logo: '/assets/images/partners/bajaj.png',
            brandColor: '#0076b8',
        },
        {
            bankName: 'Aditya Birla Finance',
            link: 'https://www.adityabirlacapital.com/loans/personal-loan',
            logo: '/assets/images/partners/abfl.webp',
            brandColor: '#a02030',
        },
        {
            bankName: 'HDFC Bank',
            link: 'https://www.hdfc.bank.in/personal-loan',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'ICICI Bank',
            link: 'https://www.icicibank.com/personal-banking/loans/personal-loan',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'IDFC First Bank',
            link: 'https://www.idfcfirstbank.com/personal-loan',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'IndusInd Bank',
            link: 'https://www.indusind.com/in/en/personal/loans/personal-loan.html',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: 'https://www.kotak.com/en/personal-banking/loans/personal-loan.html',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'Tata Capital',
            link: 'https://www.tatacapital.com/personal-loan',
            logo: '/assets/images/partners/tata.png',
            brandColor: '#2b8fcb',
        },
        {
            bankName: 'YES Bank',
            link: 'https://www.yesbank.in/retail-banking/loans/personal-loan',
            logo: '/assets/images/partners/yes.png',
            brandColor: '#1e4f9c',
        },
    ],
    'home-loans': [
        {
            bankName: 'HDFC Bank',
            link: 'https://www.hdfc.bank.in/loans/housing-loan',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'ICICI Bank',
            link: 'https://www.icicibank.com/home-loan',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'Axis Bank',
            link: 'https://www.axisbank.com/retail/loans/home-loan',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: 'https://www.kotak.com/en/personal-banking/loans/home-loan.html',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'IDFC First Bank',
            link: 'https://www.idfcfirstbank.com/home-loan',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'IndusInd Bank',
            link: 'https://www.indusind.com/in/en/personal/loans/affordable-home-loans.html',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'YES Bank',
            link: 'https://www.yesbank.in/retail-banking/loans/home-loan',
            logo: '/assets/images/partners/yes.png',
            brandColor: '#1e4f9c',
        },
        {
            bankName: 'Bajaj Finserv',
            link: 'https://www.bajajfinserv.in/home-loan',
            logo: '/assets/images/partners/bajaj.png',
            brandColor: '#0076b8',
        },
        {
            bankName: 'Tata Capital',
            link: 'https://www.tatacapital.com/home-loan',
            logo: '/assets/images/partners/tata.png',
            brandColor: '#2b8fcb',
        },
        {
            bankName: 'Aditya Birla Finance',
            link: 'https://www.adityabirlacapital.com/loans/home-loan',
            logo: '/assets/images/partners/abfl.webp',
            brandColor: '#a02030',
        },
    ],
    'gold-loans': [
        {
            bankName: 'HDFC Bank',
            link: 'https://www.hdfc.bank.in/loans/gold-loan',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'ICICI Bank',
            link: 'https://www.icicibank.com/gold-loan',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'Axis Bank',
            link: 'https://www.axisbank.com/retail/loans/gold-loan',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: 'https://www.kotak.com/en/personal-banking/loans/gold-loan.html',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'IDFC First Bank',
            link: 'https://www.idfcfirstbank.com/gold-loan',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'IndusInd Bank',
            link: 'https://www.indusind.com/in/en/personal/loans/gold-loan.html',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'YES Bank',
            link: 'https://www.yesbank.in/retail-banking/loans/gold-loan',
            logo: '/assets/images/partners/yes.png',
            brandColor: '#1e4f9c',
        },
        {
            bankName: 'Bajaj Finserv',
            link: 'https://www.bajajfinserv.in/gold-loan',
            logo: '/assets/images/partners/bajaj.png',
            brandColor: '#0076b8',
        },
        {
            bankName: 'Tata Capital',
            link: 'https://www.tatacapital.com/gold-loan',
            logo: '/assets/images/partners/tata.png',
            brandColor: '#2b8fcb',
        },
        {
            bankName: 'Aditya Birla Finance',
            link: 'https://www.adityabirlacapital.com/loans/gold-loan',
            logo: '/assets/images/partners/abfl.webp',
            brandColor: '#a02030',
        },
    ],
    'education-loans': [
        {
            bankName: 'HDFC Bank',
            link: 'https://www.hdfc.bank.in/loans/education-loan',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'ICICI Bank',
            link: 'https://www.icicibank.com/education-loan',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'Axis Bank',
            link: 'https://www.axisbank.com/retail/loans/education-loan',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: 'https://www.kotak.com/en/personal-banking/loans/education-loan.html',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'IDFC First Bank',
            link: 'https://www.idfcfirstbank.com/education-loan',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'IndusInd Bank',
            link: 'https://www.indusind.com/in/en/personal/loans/education-loan.html',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'YES Bank',
            link: 'https://www.yesbank.in/retail-banking/loans/education-loan',
            logo: '/assets/images/partners/yes.png',
            brandColor: '#1e4f9c',
        },
        {
            bankName: 'Tata Capital',
            link: 'https://www.tatacapital.com/education-loan',
            logo: '/assets/images/partners/tata.png',
            brandColor: '#2b8fcb',
        },
        {
            bankName: 'Aditya Birla Finance',
            link: 'https://www.adityabirlacapital.com/loans/education-loan',
            logo: '/assets/images/partners/abfl.webp',
            brandColor: '#a02030',
        },
    ],
    'credit-cards': [
        {
            bankName: 'HDFC Bank',
            link: 'https://www.hdfc.bank.in/credit-cards',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'ICICI Bank',
            link: 'https://www.icicibank.com/credit-card',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'Axis Bank',
            link: 'https://www.axisbank.com/retail/cards/credit-card',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: 'https://www.kotak.com/en/personal-banking/cards/credit-card.html',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'IDFC First Bank',
            link: 'https://www.idfcfirstbank.com/credit-card',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'IndusInd Bank',
            link: 'https://www.indusind.com/in/en/personal/cards/credit-cards.html',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'YES Bank',
            link: 'https://www.yesbank.in/retail-banking/cards/credit-cards',
            logo: '/assets/images/partners/yes.png',
            brandColor: '#1e4f9c',
        },
    ],
    'insurance': [
        {
            bankName: 'HDFC Bank',
            link: 'https://www.hdfc.bank.in/insurance',
            logo: '/assets/images/HDFC.png',
            brandColor: '#004c8f',
        },
        {
            bankName: 'ICICI Bank',
            link: 'https://www.icicibank.com/insurance',
            logo: '/assets/images/partners/icici.jpg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'Axis Bank',
            link: 'https://www.axisbank.com/retail/insurance',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: 'https://www.kotak.com/en/personal-banking/insurance.html',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'Bajaj Finserv',
            link: 'https://www.bajajfinserv.in/insurance',
            logo: '/assets/images/partners/bajaj.png',
            brandColor: '#0076b8',
        },
        {
            bankName: 'Tata Capital',
            link: 'https://www.tatacapital.com/insurance',
            logo: '/assets/images/partners/tata.png',
            brandColor: '#2b8fcb',
        },
        {
            bankName: 'Aditya Birla Finance',
            link: 'https://www.adityabirlacapital.com/insurance',
            logo: '/assets/images/partners/abfl.webp',
            brandColor: '#a02030',
        },
    ],
}
