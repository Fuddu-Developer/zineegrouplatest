export type BankOffer = {
    bankName: string
    link: string
    description?: string // Placeholder for requirements
}

export type OfferCategory =
    | 'personal-loans'
    | 'business-loans'
    | 'credit-cards'
    | 'home-loans'
    | 'gold-loans'
    | 'education-loans'
    | 'insurance'

export const bankOffers: Record<OfferCategory, BankOffer[]> = {
    'personal-loans': [
        {
            bankName: 'IndusInd Bank',
            link: 'https://induseasycredit.indusind.com/customer/personal-loan/new-lead?utm_source=assisted&utm_medium=IBLV899&utm_campaign=Personal-Loan&utm_content=1'
        },
        {
            bankName: 'Bajaj Finserv',
            link: 'https://www.bajajfinservmarkets.in/apply-for-personal-loan-finservmarkets/?utm_source=B2B&utm_medium=E-referral&utm_campaign=OA&utm_content=MYMONEYMANTRA_FINTECH_PRIVATE_LIMITED'
        },
        {
            bankName: 'Unity Bank',
            link: 'https://loans.theunitybank.com/unity-pl-ui/page/exclusion/login/logindetails?utm_source=partnership&utm_medium=mymoneymantra&utm_campaign=ENT-941530'
        },
        {
            bankName: 'Hero FinCorp',
            link: 'https://hipl.onelink.me/1OrE?af_ios_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_android_url=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&af_web_dp=https%3A%2F%2Floans.apps.herofincorp.com%2Fen%2Fpersonal-loan&pid=Mymoneymantra&utm_source=partnership&utm_campaign=mymoneymantra&utm_medium=MMMENT941530'
        },
        {
            bankName: 'Credit Vidya',
            link: 'https://marketplace.creditvidya.com/mymoneymantra?utm_source=EARNTRA_941530'
        },
        {
            bankName: 'Poonawalla Fincorp',
            link: 'https://poonawalla.mymoneymantra.com/?sms=false&btb=true&utm_source=pnwpl&utm_medium=mmm&utm_campaign=pnwpl-mmm-941530'
        },
        {
            bankName: 'InCred',
            link: 'https://incredpl.mymoneymantra.com?btb=true&utm_source=incred&utm_medium=mmm&utm_campaign=incred-mmm-941530'
        },
        {
            bankName: 'DMI Finance',
            link: 'https://dmi.mymoneymantra.com/?sms=false&btb=true&utm_source=dmipl&utm_medium=mmm&utm_campaign=dmipl-mmm-941530'
        },
        {
            bankName: 'Fi Money',
            link: 'https://fimoney.mymoneymantra.com/?sms=false&btb=true&utm_source=fimnpl&utm_medium=mmm&utm_campaign=fimnpl-mmm-941530'
        },
        {
            bankName: 'IDFC First Bank',
            link: 'https://idfcfirstpl.mymoneymantra.com?sms=false&btb=true&utm_source=idfcpl&utm_medium=mmm&utm_campaign=idfcpl-mmm-941530'
        }
    ],
    'business-loans': [
        {
            bankName: 'Protium',
            link: 'https://protium.mymoneymantra.com/?sms=false&btb=true&utm_source=protium&utm_medium=mmm&utm_campaign=protium-mmm-941530'
        },
        {
            bankName: 'Muthoot Finance',
            link: 'https://muthoot.mymoneymantra.com/?sms=false&btb=true&utm_source=medi&utm_medium=mmm&utm_campaign=medi-mmm-941530'
        },
        {
            bankName: 'Aditya Birla Finance',
            link: 'https://abflbl.mymoneymantra.com/?btb=true&utm_source=abfl&utm_medium=mmm&utm_campaign=abfl-mmm-941530'
        },
        {
            bankName: 'Tata Capital',
            link: 'https://tatacapitalbl.mymoneymantra.com/?sms=false&btb=true&utm_source=tatabl&utm_medium=mmm&utm_campaign=tatabl-mmm-941530'
        }
    ],
    'credit-cards': [
        {
            bankName: 'YES Bank',
            link: 'https://popcard.mymoneymantra.com?sms=false&btb=true&utm_source=yescc&utm_medium=mmm&utm_campaign=yescc-mmm-941530'
        },
        {
            bankName: 'Bank of Baroda',
            link: 'https://bobcard.mymoneymantra.com?sms=false&btb=true&utm_source=bobcc&utm_medium=mmm&utm_campaign=bobcc-mmm-941530'
        },
        {
            bankName: 'Federal Bank',
            link: 'https://federalcc.mymoneymantra.com?sms=false&btb=true&utm_source=fedcc&utm_medium=mmm&utm_campaign=fedcc-mmm-941530'
        },
        {
            bankName: 'AU Bank',
            link: 'https://aucc.mymoneymantra.com/?sms=false&btb=true&utm_source=aucc&utm_medium=mmm&utm_campaign=aucc-mmm-941530'
        },
        {
            bankName: 'Kiwi',
            link: 'https://kiwi.mymoneymantra.com?sms=false&btb=true&utm_source=kiwicc&utm_medium=mmm&utm_campaign=kiwicc-mmm-941530'
        },
        {
            bankName: 'Tata Neu',
            link: 'https://tataneu.mymoneymantra.com?sms=false&btb=true&utm_source=neucc&utm_medium=mmm&utm_campaign=neucc-mmm-941530'
        },
        {
            bankName: 'SBI Card',
            link: 'https://sbicard.mymoneymantra.com?sms=false&btb=true&utm_source=sbcc&utm_medium=mmm&utm_campaign=sbcc-mmm-941530'
        },
        {
            bankName: 'Axis Bank',
            link: 'https://axis-card.mymoneymantra.com?sms=false&btb=true&utm_source=axs&utm_medium=mmm&utm_campaign=axs-mmm-941530'
        },
        {
            bankName: 'Scapia',
            link: 'https://scapia.mymoneymantra.com?sms=false&btb=true&utm_source=scacc&utm_medium=mmm&utm_campaign=scacc-mmm-941530'
        },
        {
            bankName: 'Magnifi',
            link: 'https://magnifi.mymoneymantra.com?sms=false&btb=true&utm_source=mficc&utm_medium=mmm&utm_campaign=mficc-mmm-941530'
        },
        {
            bankName: 'IndusInd',
            link: 'https://ccindus.mymoneymantra.com?sms=false&btb=true&utm_source=induscc&utm_medium=mmm&utm_campaign=induscc-mmm-941530'
        },
        {
            bankName: 'ICICI',
            link: 'https://icicicc.mymoneymantra.com?sms=false&btb=true&utm_source=icicc&utm_medium=mmm&utm_campaign=icicc-mmm-941530'
        },
        {
            bankName: 'Axis LIC',
            link: 'https://licaxiscc.mymoneymantra.com?sms=false&btb=true&utm_source=axslic&utm_medium=mmm&utm_campaign=axslic-mmm-941530'
        },
        {
            bankName: 'Magnet',
            link: 'https://magnetcard.mymoneymantra.com/?sms=false&btb=true&utm_source=mfdcc&utm_medium=mmm&utm_campaign=mfdcc-mmm-941530'
        }
    ],
    'home-loans': [
        {
            bankName: 'Jio LAP',
            link: 'https://jiolap.mymoneymantra.com/?btb=true&utm_source=jiolap&utm_medium=mmm&utm_campaign=jiolap-mmm-941530'
        }
    ],
    'gold-loans': [
        {
            bankName: 'Oro Money',
            link: 'https://oromoney.mymoneymantra.com?btb=true&utm_source=orogold&utm_medium=mmm&utm_campaign=orogold-mmm-941530'
        },
        {
            bankName: 'DBS Gold Loan',
            link: 'https://dbsgl.mymoneymantra.com?btb=true&utm_source=dbsgl&utm_medium=mmm&utm_campaign=dbsgl-mmm-941530'
        },
        {
            bankName: 'Rupeek',
            link: 'https://rupeek.mymoneymantra.com?btb=true&utm_source=rupeek&utm_medium=mmm&utm_campaign=rupeek-mmm-941530'
        }
    ],
    'education-loans': [
        {
            bankName: 'Propelld',
            link: 'https://propelld.mymoneymantra.com?sms=false&btb=true&utm_source=proel&utm_medium=mmm&utm_campaign=proel-mmm-941530'
        },
        {
            bankName: 'HDFC Credila',
            link: 'https://hdfccredila.mymoneymantra.com/?btb=true&utm_source=hdfcel&utm_medium=mmm&utm_campaign=hdfcel-mmm-941530'
        }
    ],
    'insurance': [
        {
            bankName: 'Care Insurance',
            link: 'https://care.mymoneymantra.com/?btb=true&utm_source=carein&utm_medium=mmm&utm_campaign=carein-mmm-941530'
        }
    ]
}
