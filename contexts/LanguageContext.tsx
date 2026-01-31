'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About us',
    'nav.emi': 'EMI Calculator',
    'nav.apply': 'Apply now',
    'nav.cibil': 'Cibil Score',
    'nav.contact': 'Talk to an Expert',
    'nav.instantApproval': 'Instant approval',
    'nav.talkToExpert': 'Talk to Expert',
    
    // Language switcher
    'lang.english': 'English',
    'lang.hindi': 'हिंदी',
    
    // Hero
    'hero.title': 'Providing the best future for your best living.',
    'hero.highlight': 'best',
    
    // Features
    'features.personalPrivacy': 'Personal Privacy',
    'features.personalPrivacyDesc': 'Other forms of secured loans include loans against securities',
    'features.noPayment': 'No Payment Required',
    'features.noPaymentDesc': 'These may be available from financial institutions under many different guises',
    'features.easyAccess': 'Easy Access',
    'features.easyAccessDesc': 'obtain a money judgment for breach of contract',
    
    // Carousel
    'carousel.instantLoan': 'Instant Loan',
    'carousel.instantLoanDesc': 'A convenient and speedy way to get the funds you require for unanticipated expenses.',
    'carousel.overdraft': 'Overdraft',
    'carousel.personalLoans': 'Personal Loans',
    'carousel.personalLoansDesc': 'Whether it\'s for debt repayment or big life ambitions, a personal loan can be an excellent financial instrument.',
    'carousel.businessLoans': 'Business Loans',
    'carousel.businessLoansDesc': 'Business loan enables you to expand your business and network. It provides financial stability in your business.',
    'carousel.professionalLoans': 'Professional Loans',
    'carousel.professionalLoansDesc': 'A professional loan is a type of funding meant for professionals, such as accountants and attorneys.',
    'carousel.secureLoans': 'Secure Loans',
    'carousel.secureLoansDesc': 'With a secured loan, you\'re eligible for low interest rates since property is pledged as security.',
    'carousel.balanceTransfer': 'Balance Transfer',
    'carousel.balanceTransferDesc': 'Transfer your existing loan to us and save on interest rates with better terms and conditions.',
    'carousel.applyNow': 'Apply Now',
    
    // Loan Tiles Section
    'loanTiles.title': 'Our Loan Products',
    
    // Trust Section
    'trust.title': 'Trust with',
    'trust.titleHighlight': 'Confidence',
    'trust.loansDisbursed': '₹ 15000 Crore+',
    'trust.loansDisbursedDesc': 'Worth of loans disbursed to our users',
    'trust.since2016': 'Since 2016',
    'trust.since2016Desc': '13 years of customers love and trust',
    'trust.panIndia': 'Pan India',
    'trust.panIndiaDesc': 'Serving you, wherever you are',
    'trust.iso27001': 'ISO 27001',
    'trust.iso27001Desc': 'Certified Data Security Excellence',
    
    // Testimonials
    'testimonials.happyClients': '12K + Happy Clients',
    'testimonials.title': 'Client Experiences',
    'testimonials.readAll': 'Read All Review →',
    'testimonials.rating': 'Rating',
    
    // Partners
    'partners.title': 'Our Partners',
    
    // Footer
    'footer.tagline': 'Fastest Way To Get Money',
    'footer.description': 'Our team of experienced professionals is dedicated to providing competitive interest rates, flexible repayment options, and a hassle-free application process.',
    'footer.quickLinks': 'Quick Links',
    'footer.getInTouch': 'Get in touch',
    'footer.socialMedia': 'Social Media Links',
    'footer.copyright': '© Copyright 2026 | HELLOANS ZINEE SERVICES PVT LTD (Formerly a part of ZINEE GROUP)',
    
    // Contact Page
    'contact.getInTouch': 'Get in Touch',
    'contact.socialMedia': 'Social Media Links',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone No.',
    'contact.message': 'Message',
    'contact.submit': 'Submit Now',
    'contact.submitting': 'Submitting...',
    'contact.success': 'Success! Your message has been sent. We will contact you soon.',
    'contact.error': 'There was an error sending your message. Please try again.',
    
    // About Page
    'about.title': 'About Us',
    'about.subtitle': 'We specialize in customized Loan for people and businesses.',
    'about.learnMore': 'Learn More →',
    'about.intro1': 'We specialize in customized Loan for people and businesses. We are not yet another online offer comparison site. While we do give you the most exhaustive range of options, we do the last mile and get you the loan also. We strongly believe that financial services is not like an ecommerce business where products are standardized and hence the cheaper the better. Every borrower has a unique financial position and requirement.',
    'about.intro2': 'Hence, we always have a dedicated sales manager to advise you on the best bank to choose, do the initial documentation, answer bank queries on your behalf, negotiate on your behalf, complete the loan documentation and ensure disbursal to your account. We are able to do this because we have strong in house team of 300 people spread across 4000 cities. The senior management consists of people who have held leadership roles with banks/NBFC\'s like Citibank, Standard Chartered Bank, Bajaj Finserve etc.',
    'about.intro3': 'It is entirely due to the efforts of our loyal employees (attrition of less than 5% over the last 4 years) that we are currently disbursing more than 1,000 cr annually within a short company lifespan of 4 years We have embarked on an exciting journey to make the process even simpler and streamlined for the customer.',
    'about.loanTypes': 'Unsecured & Secured Loans',
    'about.loanTypesSubtitle': 'We Are Providing All Types Loan.',
    'about.instantLoan': 'Instant Loan',
    'about.personalLoans': 'Personal Loans',
    'about.businessLoans': 'Business Loans',
    'about.professionalLoans': 'Professional Loans',
    'about.secureLoans': 'Secure Loans',
    'about.balanceTransfer': 'Balance Transfer',
    'about.whyChoose': 'Why Choose Us',
    'about.whyChooseSubtitle': 'Why you should choose Helloans, there are tons of reasons.',
    'about.whyChooseText': 'Our team of Loan professionals have the knowledge, skills, markets and desire necessary to provide you.',
    'about.professionalService': 'Professional Service',
    'about.ultraFastSupport': 'Ultra Fast Support',
    'about.lowInterestLoan': 'Low Intrest Loan',
    'about.available24x7': '24x7 Available',
    'about.ctaTitle': 'Looking For Loan ?',
    'about.ctaText': 'Our Team Will Help For Providing Instant Loan In Low Intrest Rate ! Apply Here.',
    'about.ctaDescription': 'Our team of experienced professionals is dedicated to providing competitive interest rates, flexible repayment options, and a hassle-free application process.',
    
    // CIBIL Score Page
    'cibil.heroTitle': 'Check Your Free Credit Score Today!',
    'cibil.heroSubtitle': 'Check Your Free Credit Score Today!',
    'cibil.securityMessage': 'Your Personal Information is 100% secured with us. We do not share your data with any third party.',
    'cibil.whatIsCreditScore': 'What is a Credit Score?',
    'cibil.whatIsCreditScoreText1': 'Your credit score is an essential indicator of your financial reliability, serving as a measure of how well you manage and repay debts. Represented as a three-digit number typically ranging from 300 to 900, it reflects your creditworthiness and is calculated based on your credit history and data from various loan types and credit bureaus. This score helps lenders and financial institutions assess your likelihood of repaying borrowed money on time.',
    'cibil.whatIsCreditScoreText2': 'A higher credit score, generally considered good if it exceeds 700, improves your chances of loan approval and securing better interest rates. In India, the most commonly recognized credit score is the CIBIL Score, provided by TransUnion. Other credit bureaus, including Experian, CRIF High Mark, and Equifax, also contribute by collecting and analyzing your credit information to generate your score. Factors like repayment history, types of loans, credit utilization, credit history length, and the frequency of credit applications influence your score.',
    'cibil.creditScoreRange': 'What is the range of the Credit Score?',
    'cibil.creditScoreRangeText': 'Credit scores, though slightly varying across bureaus, typically range from 300 (lowest) to 900 (highest). If you have no credit history, you\'ll need to build it by responsibly using credit cards or loans. Here\'s an overview of credit score ranges and their implications:',
    'cibil.badCredit': 'Bad Credit',
    'cibil.badCreditRange': '300-549',
    'cibil.badCreditDesc': 'Indicates missed payments, defaults, or high credit utilization. It makes securing loans or credit cards difficult and often leads to unfavorable terms.',
    'cibil.poorCredit': 'Poor Credit',
    'cibil.poorCreditRange': '550-649',
    'cibil.poorCreditDesc': 'Suggests some repayment issues, which may limit loan approvals or result in less favorable conditions.',
    'cibil.fairCredit': 'Fair Credit',
    'cibil.fairCreditRange': '650-749',
    'cibil.fairCreditDesc': 'Reflects a responsible repayment history, improving chances of loan approval but not necessarily with the best interest rates.',
    'cibil.goodCredit': 'Good Credit',
    'cibil.goodCreditRange': '750-799',
    'cibil.goodCreditDesc': 'Represents consistent on-time payments and sound credit management, increasing the likelihood of loan approval with favorable terms.',
    'cibil.excellentCredit': 'Excellent Credit',
    'cibil.excellentCreditRange': '800-900',
    'cibil.excellentCreditDesc': 'Demonstrates exceptional financial management, offering the best opportunities for loans and credit cards with the most attractive rates and terms.',
    'cibil.benefitsTitle': 'Benefits of Good credit score',
    'cibil.benefitsText1': 'Your credit score is a crucial measure of your financial well-being and plays a significant role in determining your loan and credit card options. A high credit score, typically above 700, comes with numerous advantages. It boosts your chances of loan approval, qualifies you for lower interest rates, and helps you save money.',
    'cibil.benefitsText2': 'A strong credit score also provides access to pre-approved loans with quicker processing and exclusive credit cards that offer premium rewards. Additionally, it can make you eligible for higher credit limits and longer loan repayment terms, offering greater flexibility and reducing financial stress. Maintaining a good credit score opens doors to better credit opportunities and paves the way for a secure financial future.',
    'cibil.buildCreditTitle': 'What Is the Fastest Way to Build Credit?',
    'cibil.buildCreditText': 'Building a strong credit score unlocks numerous financial opportunities, but starting from scratch can feel challenging. The good news is that establishing credit is entirely achievable! Responsible credit use is the fastest way to build your score. Getting a credit card in your name is a great first step. Once you have one, consistently making on-time payments is crucial to creating a positive payment history, a key factor in building a good credit score. Regularly checking your credit report for errors that may harm your score is equally important. By following these steps, you\'ll be on the right path to a solid credit foundation.',
    'cibil.payOnTime': 'Pay on Time',
    'cibil.payOnTimeDesc': 'Always prioritize timely payments for all debts to maintain a good payment history.',
    'cibil.limitInquiries': 'Limit Inquiries',
    'cibil.limitInquiriesDesc': 'Avoid excessive credit applications, as too many inquiries can lower your score.',
    'cibil.payDownBalances': 'Pay Down Balances',
    'cibil.payDownBalancesDesc': 'Keep credit card balances low to improve your credit utilization ratio.',
    'cibil.consolidateDebt': 'Consolidate Debt',
    'cibil.consolidateDebtDesc': 'Use a consolidation loan to reduce credit utilization and simplify repayment.',
    'cibil.authorizedUser': 'Become an Authorized User',
    'cibil.authorizedUserDesc': 'Linking to someone\'s account with a strong payment history can boost your score (choose carefully).',
    'cibil.keepOldAccounts': 'Keep Old Accounts Open',
    'cibil.keepOldAccountsDesc': 'A longer credit history improves your score, so avoid closing your oldest accounts.',
    'cibil.securedLoans': 'Apply for Secured Loans',
    'cibil.securedLoansDesc': 'Secured loans are easier to obtain and help build a positive repayment record.',
    'cibil.whyZineegroup': 'Why You Should Check Your CIBIL Score with Zineegroup (and It\'s Free!)',
    'cibil.unlockDeals': 'Unlock Exclusive Loan & Credit Card Deals',
    'cibil.unlockDealsDesc': 'A strong credit score unlocks a world of financial opportunities. Access pre-approved loans and credit card deals from India\'s leading lenders and NBFCs, tailored to suit your unique financial profile. Enjoy benefits like minimal documentation, quick approvals, and even instant disbursal with these exclusive offers.',
    'cibil.effortlessCheck': 'Effortless Credit Score Check',
    'cibil.effortlessCheckDesc': 'Easily check your CIBIL score for free on our intuitive website or app. Get instant access to your credit score from multiple bureaus, anytime, anywhere, and stay informed about your financial health.',
    'cibil.simplifiedInsights': 'Simplified Credit Report Insights',
    'cibil.simplifiedInsightsDesc': 'Understanding credit reports can be tricky, but we\'ve got you covered. Our platform provides detailed explanations and simplified breakdowns of your credit report, helping you gain a clear understanding of your financial standing with ease.',
    'cibil.ctaTitle': 'Looking For Loan ?',
    'cibil.ctaText': 'Our Team Will Help For Providing Instant Loan In Low Interest Rate ! Apply Here.',
    'cibil.ctaNote': 'Our team of experienced professionals is dedicated to providing competitive interest rates, flexible repayment options, and a hassle-free application process.',
    'cibil.formNameLabel': 'Enter name as per Pan Card',
    'cibil.formNamePlaceholder': 'Name as per PAN Card',
    'cibil.formPanLabel': 'PAN Number',
    'cibil.formDobLabel': 'Date of Birth',
    'cibil.formMobileLabel': 'Mobile Number',
    'cibil.formEmailLabel': 'Email ID',
    'cibil.formCityLabel': 'City',
    'cibil.formCityPlaceholder': 'Enter city',
    'cibil.formPincodeLabel': 'Pincode',
    'cibil.formSuccess': 'Your CIBIL score enquiry has been submitted. We will contact you via email.',
    'cibil.formSubmitting': 'Submitting...',
    'cibil.contactEmailOnly': 'We will contact you only via email for your CIBIL score enquiry.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.emi': 'ईएमआई कैलकुलेटर',
    'nav.apply': 'अभी आवेदन करें',
    'nav.cibil': 'सिबिल स्कोर',
    'nav.contact': 'विशेषज्ञ से बात करें',
    'nav.instantApproval': 'तत्काल अनुमोदन',
    'nav.talkToExpert': 'विशेषज्ञ से बात करें',
    
    // Language switcher
    'lang.english': 'English',
    'lang.hindi': 'हिंदी',
    
    // Hero
    'hero.title': 'आपके सर्वोत्तम जीवन के लिए सर्वोत्तम भविष्य प्रदान करना।',
    'hero.highlight': 'सर्वोत्तम',
    
    // Features
    'features.personalPrivacy': 'व्यक्तिगत गोपनीयता',
    'features.personalPrivacyDesc': 'सुरक्षित ऋण के अन्य रूपों में प्रतिभूतियों के खिलाफ ऋण शामिल हैं',
    'features.noPayment': 'कोई भुगतान आवश्यक नहीं',
    'features.noPaymentDesc': 'ये वित्तीय संस्थानों से कई अलग-अलग रूपों में उपलब्ध हो सकते हैं',
    'features.easyAccess': 'आसान पहुंच',
    'features.easyAccessDesc': 'अनुबंध के उल्लंघन के लिए धन निर्णय प्राप्त करें',
    
    // Carousel
    'carousel.instantLoan': 'तत्काल ऋण',
    'carousel.instantLoanDesc': 'अप्रत्याशित खर्चों के लिए आवश्यक धन प्राप्त करने का एक सुविधाजनक और तेज़ तरीका।',
    'carousel.overdraft': 'ओवरड्राफ्ट',
    'carousel.personalLoans': 'व्यक्तिगत ऋण',
    'carousel.personalLoansDesc': 'चाहे वह ऋण चुकौती के लिए हो या बड़े जीवन के लक्ष्य, व्यक्तिगत ऋण एक उत्कृष्ट वित्तीय साधन हो सकता है।',
    'carousel.businessLoans': 'व्यावसायिक ऋण',
    'carousel.businessLoansDesc': 'व्यावसायिक ऋण आपको अपने व्यवसाय और नेटवर्क का विस्तार करने में सक्षम बनाता है। यह आपके व्यवसाय में वित्तीय स्थिरता प्रदान करता है।',
    'carousel.professionalLoans': 'पेशेवर ऋण',
    'carousel.professionalLoansDesc': 'एक पेशेवर ऋण एक प्रकार का वित्तपोषण है जो पेशेवरों के लिए है, जैसे लेखाकार और वकील।',
    'carousel.secureLoans': 'सुरक्षित ऋण',
    'carousel.secureLoansDesc': 'सुरक्षित ऋण के साथ, आप कम ब्याज दरों के लिए पात्र हैं क्योंकि संपत्ति को सुरक्षा के रूप में गिरवी रखा जाता है।',
    'carousel.balanceTransfer': 'बैलेंस ट्रांसफर',
    'carousel.balanceTransferDesc': 'अपने मौजूदा ऋण को हमारे पास स्थानांतरित करें और बेहतर शर्तों और शर्तों के साथ ब्याज दरों पर बचत करें।',
    'carousel.applyNow': 'अभी आवेदन करें',
    
    // Loan Tiles Section
    'loanTiles.title': 'हमारे ऋण उत्पाद',
    
    // Trust Section
    'trust.title': 'विश्वास के साथ',
    'trust.titleHighlight': 'आत्मविश्वास',
    'trust.loansDisbursed': '₹ 15000 करोड़+',
    'trust.loansDisbursedDesc': 'हमारे उपयोगकर्ताओं को वितरित किए गए ऋणों की राशि',
    'trust.since2016': '2016 से',
    'trust.since2016Desc': '13 वर्षों का ग्राहक प्रेम और विश्वास',
    'trust.panIndia': 'पूरे भारत में',
    'trust.panIndiaDesc': 'आपकी सेवा, जहाँ भी आप हों',
    'trust.iso27001': 'ISO 27001',
    'trust.iso27001Desc': 'प्रमाणित डेटा सुरक्षा उत्कृष्टता',
    
    // Testimonials
    'testimonials.happyClients': '12K + खुश ग्राहक',
    'testimonials.title': 'ग्राहक अनुभव',
    'testimonials.readAll': 'सभी समीक्षा पढ़ें →',
    'testimonials.rating': 'रेटिंग',
    
    // Partners
    'partners.title': 'हमारे साझेदार',
    
    // Footer
    'footer.tagline': 'पैसा पाने का सबसे तेज़ तरीका',
    'footer.description': 'हमारी अनुभवी पेशेवरों की टीम प्रतिस्पर्धी ब्याज दरें, लचीले पुनर्भुगतान विकल्प और परेशानी मुक्त आवेदन प्रक्रिया प्रदान करने के लिए समर्पित है।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.getInTouch': 'संपर्क में रहें',
    'footer.socialMedia': 'सोशल मीडिया लिंक',
    'footer.copyright': '© कॉपीराइट 2026 | हेलोअन्स ज़िनी सर्विसेज प्राइवेट लिमिटेड (पूर्व में ज़िनी ग्रुप का हिस्सा)',
    
    // Contact Page
    'contact.getInTouch': 'संपर्क करें',
    'contact.socialMedia': 'सोशल मीडिया लिंक',
    'contact.name': 'नाम',
    'contact.email': 'ईमेल',
    'contact.phone': 'फोन नंबर',
    'contact.message': 'संदेश',
    'contact.submit': 'अभी जमा करें',
    'contact.submitting': 'जमा हो रहा है...',
    'contact.success': 'सफलता! आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।',
    'contact.error': 'आपका संदेश भेजने में एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    
    // About Page
    'about.title': 'हमारे बारे में',
    'about.subtitle': 'हम लोगों और व्यवसायों के लिए अनुकूलित ऋण में विशेषज्ञता रखते हैं।',
    'about.learnMore': 'और जानें →',
    'about.intro1': 'हम लोगों और व्यवसायों के लिए अनुकूलित ऋण में विशेषज्ञता रखते हैं। हम केवल एक और ऑनलाइन ऑफर तुलना साइट नहीं हैं। जबकि हम आपको सबसे व्यापक विकल्प देते हैं, हम अंतिम मील भी करते हैं और आपको ऋण भी दिलाते हैं। हम दृढ़ता से मानते हैं कि वित्तीय सेवाएं ई-कॉमर्स व्यवसाय की तरह नहीं हैं जहां उत्पाद मानकीकृत हैं और इसलिए सस्ता बेहतर है। हर उधारकर्ता की एक अद्वितीय वित्तीय स्थिति और आवश्यकता होती है।',
    'about.intro2': 'इसलिए, हमारे पास हमेशा एक समर्पित बिक्री प्रबंधक होता है जो आपको सर्वोत्तम बैंक चुनने की सलाह देता है, प्रारंभिक दस्तावेज़ीकरण करता है, आपकी ओर से बैंक प्रश्नों का उत्तर देता है, आपकी ओर से बातचीत करता है, ऋण दस्तावेज़ीकरण पूरा करता है और आपके खाते में वितरण सुनिश्चित करता है। हम ऐसा करने में सक्षम हैं क्योंकि हमारे पास 4000 शहरों में फैले 300 लोगों की मजबूत इन-हाउस टीम है। वरिष्ठ प्रबंधन में ऐसे लोग शामिल हैं जिन्होंने सिटीबैंक, स्टैंडर्ड चार्टर्ड बैंक, बजाज फिनसर्व आदि जैसे बैंकों/एनबीएफसी में नेतृत्व की भूमिकाएँ निभाई हैं।',
    'about.intro3': 'यह पूरी तरह से हमारे वफादार कर्मचारियों के प्रयासों के कारण है (पिछले 4 वर्षों में 5% से कम का कारोबार) कि हम वर्तमान में 4 वर्षों की कम कंपनी जीवनकाल के भीतर प्रति वर्ष 1,000 करोड़ से अधिक का वितरण कर रहे हैं। हमने ग्राहक के लिए प्रक्रिया को और भी सरल और सुव्यवस्थित बनाने के लिए एक रोमांचक यात्रा शुरू की है।',
    'about.loanTypes': 'असुरक्षित और सुरक्षित ऋण',
    'about.loanTypesSubtitle': 'हम सभी प्रकार के ऋण प्रदान कर रहे हैं।',
    'about.instantLoan': 'तत्काल ऋण',
    'about.personalLoans': 'व्यक्तिगत ऋण',
    'about.businessLoans': 'व्यावसायिक ऋण',
    'about.professionalLoans': 'पेशेवर ऋण',
    'about.secureLoans': 'सुरक्षित ऋण',
    'about.balanceTransfer': 'बैलेंस ट्रांसफर',
    'about.whyChoose': 'हमें क्यों चुनें',
    'about.whyChooseSubtitle': 'आपको हेलोअन्स क्यों चुनना चाहिए, इसके कई कारण हैं।',
    'about.whyChooseText': 'हमारी ऋण पेशेवरों की टीम के पास आपको प्रदान करने के लिए आवश्यक ज्ञान, कौशल, बाजार और इच्छा है।',
    'about.professionalService': 'पेशेवर सेवा',
    'about.ultraFastSupport': 'अल्ट्रा फास्ट सपोर्ट',
    'about.lowInterestLoan': 'कम ब्याज ऋण',
    'about.available24x7': '24x7 उपलब्ध',
    'about.ctaTitle': 'ऋण की तलाश है?',
    'about.ctaText': 'हमारी टीम कम ब्याज दर पर तत्काल ऋण प्रदान करने में मदद करेगी! यहाँ आवेदन करें।',
    'about.ctaDescription': 'हमारी अनुभवी पेशेवरों की टीम प्रतिस्पर्धी ब्याज दरें, लचीले पुनर्भुगतान विकल्प और परेशानी मुक्त आवेदन प्रक्रिया प्रदान करने के लिए समर्पित है।',
    
    // CIBIL Score Page
    'cibil.heroTitle': 'आज ही अपना मुफ्त क्रेडिट स्कोर जांचें!',
    'cibil.heroSubtitle': 'आज ही अपना मुफ्त क्रेडिट स्कोर जांचें!',
    'cibil.securityMessage': 'आपकी व्यक्तिगत जानकारी 100% हमारे साथ सुरक्षित है। हम आपका डेटा किसी तीसरे पक्ष के साथ साझा नहीं करते हैं।',
    'cibil.whatIsCreditScore': 'क्रेडिट स्कोर क्या है?',
    'cibil.whatIsCreditScoreText1': 'आपका क्रेडिट स्कोर आपकी वित्तीय विश्वसनीयता का एक आवश्यक संकेतक है, जो इस बात का माप है कि आप ऋणों का प्रबंधन और पुनर्भुगतान कितनी अच्छी तरह करते हैं। आमतौर पर 300 से 900 तक की तीन अंकों की संख्या के रूप में दर्शाया गया, यह आपकी साख को दर्शाता है और विभिन्न ऋण प्रकारों और क्रेडिट ब्यूरो से आपके क्रेडिट इतिहास और डेटा के आधार पर गणना की जाती है। यह स्कोर ऋणदाताओं और वित्तीय संस्थानों को समय पर उधार लिए गए धन का पुनर्भुगतान करने की आपकी संभावना का आकलन करने में मदद करता है।',
    'cibil.whatIsCreditScoreText2': 'एक उच्च क्रेडिट स्कोर, आमतौर पर 700 से अधिक को अच्छा माना जाता है, ऋण स्वीकृति की आपकी संभावनाओं को बेहतर बनाता है और बेहतर ब्याज दरें सुरक्षित करता है। भारत में, सबसे अधिक मान्यता प्राप्त क्रेडिट स्कोर ट्रांसयूनियन द्वारा प्रदान किया गया CIBIL स्कोर है। अन्य क्रेडिट ब्यूरो, जिनमें एक्सपेरियन, CRIF हाई मार्क और इक्विफैक्स शामिल हैं, आपकी क्रेडिट जानकारी को एकत्र करके और विश्लेषण करके आपका स्कोर उत्पन्न करने में भी योगदान देते हैं। पुनर्भुगतान इतिहास, ऋण के प्रकार, क्रेडिट उपयोग, क्रेडिट इतिहास की लंबाई और क्रेडिट आवेदनों की आवृत्ति जैसे कारक आपके स्कोर को प्रभावित करते हैं।',
    'cibil.creditScoreRange': 'क्रेडिट स्कोर की सीमा क्या है?',
    'cibil.creditScoreRangeText': 'क्रेडिट स्कोर, हालांकि ब्यूरो में थोड़ा भिन्न होते हैं, आमतौर पर 300 (सबसे कम) से 900 (सबसे अधिक) तक होते हैं। यदि आपके पास कोई क्रेडिट इतिहास नहीं है, तो आपको क्रेडिट कार्ड या ऋण का जिम्मेदारी से उपयोग करके इसे बनाने की आवश्यकता होगी। यहाँ क्रेडिट स्कोर रेंज और उनके निहितार्थों का अवलोकन है:',
    'cibil.badCredit': 'खराब क्रेडिट',
    'cibil.badCreditRange': '300-549',
    'cibil.badCreditDesc': 'चूक भुगतान, डिफॉल्ट, या उच्च क्रेडिट उपयोग को इंगित करता है। यह ऋण या क्रेडिट कार्ड प्राप्त करना मुश्किल बनाता है और अक्सर प्रतिकूल शर्तों की ओर जाता है।',
    'cibil.poorCredit': 'खराब क्रेडिट',
    'cibil.poorCreditRange': '550-649',
    'cibil.poorCreditDesc': 'कुछ पुनर्भुगतान समस्याओं का सुझाव देता है, जो ऋण स्वीकृतियों को सीमित कर सकता है या कम अनुकूल स्थितियों में परिणाम दे सकता है।',
    'cibil.fairCredit': 'उचित क्रेडिट',
    'cibil.fairCreditRange': '650-749',
    'cibil.fairCreditDesc': 'एक जिम्मेदार पुनर्भुगतान इतिहास को दर्शाता है, ऋण स्वीकृति की संभावनाओं में सुधार करता है लेकिन जरूरी नहीं कि सर्वोत्तम ब्याज दरों के साथ।',
    'cibil.goodCredit': 'अच्छा क्रेडिट',
    'cibil.goodCreditRange': '750-799',
    'cibil.goodCreditDesc': 'लगातार समय पर भुगतान और ध्वनि क्रेडिट प्रबंधन का प्रतिनिधित्व करता है, अनुकूल शर्तों के साथ ऋण स्वीकृति की संभावना को बढ़ाता है।',
    'cibil.excellentCredit': 'उत्कृष्ट क्रेडिट',
    'cibil.excellentCreditRange': '800-900',
    'cibil.excellentCreditDesc': 'असाधारण वित्तीय प्रबंधन का प्रदर्शन करता है, सबसे आकर्षक दरों और शर्तों के साथ ऋण और क्रेडिट कार्ड के लिए सर्वोत्तम अवसर प्रदान करता है।',
    'cibil.benefitsTitle': 'अच्छे क्रेडिट स्कोर के लाभ',
    'cibil.benefitsText1': 'आपका क्रेडिट स्कोर आपकी वित्तीय भलाई का एक महत्वपूर्ण माप है और आपके ऋण और क्रेडिट कार्ड विकल्पों को निर्धारित करने में महत्वपूर्ण भूमिका निभाता है। एक उच्च क्रेडिट स्कोर, आमतौर पर 700 से ऊपर, कई फायदे के साथ आता है। यह ऋण स्वीकृति की आपकी संभावनाओं को बढ़ाता है, आपको कम ब्याज दरों के लिए योग्य बनाता है, और आपको पैसे बचाने में मदद करता है।',
    'cibil.benefitsText2': 'एक मजबूत क्रेडिट स्कोर तेज़ प्रसंस्करण के साथ पूर्व-अनुमोदित ऋण और प्रीमियम पुरस्कार प्रदान करने वाले विशेष क्रेडिट कार्ड तक पहुंच भी प्रदान करता है। इसके अतिरिक्त, यह आपको उच्च क्रेडिट सीमा और लंबे ऋण पुनर्भुगतान शर्तों के लिए योग्य बना सकता है, अधिक लचीलापन प्रदान करता है और वित्तीय तनाव को कम करता है। एक अच्छे क्रेडिट स्कोर को बनाए रखना बेहतर क्रेडिट अवसरों के दरवाजे खोलता है और एक सुरक्षित वित्तीय भविष्य के लिए रास्ता तैयार करता है।',
    'cibil.buildCreditTitle': 'क्रेडिट बनाने का सबसे तेज़ तरीका क्या है?',
    'cibil.buildCreditText': 'एक मजबूत क्रेडिट स्कोर बनाना कई वित्तीय अवसरों को अनलॉक करता है, लेकिन शुरुआत से शुरू करना चुनौतीपूर्ण लग सकता है। अच्छी खबर यह है कि क्रेडिट स्थापित करना पूरी तरह से प्राप्त करने योग्य है! जिम्मेदार क्रेडिट उपयोग आपके स्कोर को बनाने का सबसे तेज़ तरीका है। अपने नाम पर एक क्रेडिट कार्ड प्राप्त करना एक बेहतरीन पहला कदम है। एक बार जब आपके पास एक हो, तो लगातार समय पर भुगतान करना एक सकारात्मक भुगतान इतिहास बनाने के लिए महत्वपूर्ण है, जो एक अच्छा क्रेडिट स्कोर बनाने में एक प्रमुख कारक है। नियमित रूप से अपनी क्रेडिट रिपोर्ट को त्रुटियों के लिए जांचना जो आपके स्कोर को नुकसान पहुंचा सकती है, समान रूप से महत्वपूर्ण है। इन चरणों का पालन करके, आप एक ठोस क्रेडिट नींव के लिए सही रास्ते पर होंगे।',
    'cibil.payOnTime': 'समय पर भुगतान करें',
    'cibil.payOnTimeDesc': 'एक अच्छा भुगतान इतिहास बनाए रखने के लिए हमेशा सभी ऋणों के लिए समय पर भुगतान को प्राथमिकता दें।',
    'cibil.limitInquiries': 'पूछताछ सीमित करें',
    'cibil.limitInquiriesDesc': 'अत्यधिक क्रेडिट आवेदनों से बचें, क्योंकि बहुत अधिक पूछताछ आपके स्कोर को कम कर सकती है।',
    'cibil.payDownBalances': 'बैलेंस कम करें',
    'cibil.payDownBalancesDesc': 'अपने क्रेडिट उपयोग अनुपात में सुधार करने के लिए क्रेडिट कार्ड बैलेंस को कम रखें।',
    'cibil.consolidateDebt': 'ऋण समेकित करें',
    'cibil.consolidateDebtDesc': 'क्रेडिट उपयोग को कम करने और पुनर्भुगतान को सरल बनाने के लिए एक समेकन ऋण का उपयोग करें।',
    'cibil.authorizedUser': 'अधिकृत उपयोगकर्ता बनें',
    'cibil.authorizedUserDesc': 'मजबूत भुगतान इतिहास वाले किसी के खाते से लिंक करना आपके स्कोर को बढ़ा सकता है (सावधानी से चुनें)।',
    'cibil.keepOldAccounts': 'पुराने खाते खुले रखें',
    'cibil.keepOldAccountsDesc': 'एक लंबा क्रेडिट इतिहास आपके स्कोर में सुधार करता है, इसलिए अपने सबसे पुराने खातों को बंद करने से बचें।',
    'cibil.securedLoans': 'सुरक्षित ऋण के लिए आवेदन करें',
    'cibil.securedLoansDesc': 'सुरक्षित ऋण प्राप्त करना आसान है और सकारात्मक पुनर्भुगतान रिकॉर्ड बनाने में मदद करते हैं।',
    'cibil.whyZineegroup': 'आपको ज़िनीग्रुप के साथ अपना CIBIL स्कोर क्यों जांचना चाहिए (और यह मुफ़्त है!)',
    'cibil.unlockDeals': 'विशेष ऋण और क्रेडिट कार्ड डील अनलॉक करें',
    'cibil.unlockDealsDesc': 'एक मजबूत क्रेडिट स्कोर वित्तीय अवसरों की दुनिया को अनलॉक करता है। भारत के प्रमुख ऋणदाताओं और एनबीएफसी से पूर्व-अनुमोदित ऋण और क्रेडिट कार्ड डील तक पहुंचें, जो आपकी अद्वितीय वित्तीय प्रोफ़ाइल के अनुरूप हैं। न्यूनतम दस्तावेज़ीकरण, त्वरित स्वीकृतियां, और इन विशेष ऑफ़र के साथ तत्काल वितरण जैसे लाभों का आनंद लें।',
    'cibil.effortlessCheck': 'सहज क्रेडिट स्कोर जांच',
    'cibil.effortlessCheckDesc': 'हमारी सहज वेबसाइट या ऐप पर मुफ्त में अपना CIBIL स्कोर आसानी से जांचें। कभी भी, कहीं भी कई ब्यूरो से अपने क्रेडिट स्कोर तक तत्काल पहुंच प्राप्त करें, और अपने वित्तीय स्वास्थ्य के बारे में सूचित रहें।',
    'cibil.simplifiedInsights': 'सरलीकृत क्रेडिट रिपोर्ट अंतर्दृष्टि',
    'cibil.simplifiedInsightsDesc': 'क्रेडिट रिपोर्ट को समझना मुश्किल हो सकता है, लेकिन हमने आपको कवर किया है। हमारा प्लेटफ़ॉर्म आपकी क्रेडिट रिपोर्ट के विस्तृत स्पष्टीकरण और सरलीकृत विश्लेषण प्रदान करता है, जिससे आप आसानी से अपनी वित्तीय स्थिति की स्पष्ट समझ प्राप्त कर सकते हैं।',
    'cibil.ctaTitle': 'ऋण की तलाश है?',
    'cibil.ctaText': 'हमारी टीम कम ब्याज दर पर तत्काल ऋण प्रदान करने में मदद करेगी! यहाँ आवेदन करें।',
    'cibil.ctaNote': 'हमारी अनुभवी पेशेवरों की टीम प्रतिस्पर्धी ब्याज दरें, लचीले पुनर्भुगतान विकल्प और परेशानी मुक्त आवेदन प्रक्रिया प्रदान करने के लिए समर्पित है।',
    'cibil.formNameLabel': 'पैन कार्ड के अनुसार नाम दर्ज करें',
    'cibil.formNamePlaceholder': 'पैन कार्ड के अनुसार नाम',
    'cibil.formPanLabel': 'पैन नंबर',
    'cibil.formDobLabel': 'जन्म तिथि',
    'cibil.formMobileLabel': 'मोबाइल नंबर',
    'cibil.formEmailLabel': 'ईमेल आईडी',
    'cibil.formCityLabel': 'शहर',
    'cibil.formCityPlaceholder': 'शहर दर्ज करें',
    'cibil.formPincodeLabel': 'पिनकोड',
    'cibil.formSuccess': 'आपकी CIBIL स्कोर जांच जमा कर दी गई है। हम आपसे ईमेल के माध्यम से संपर्क करेंगे।',
    'cibil.formSubmitting': 'जमा हो रहा है...',
    'cibil.contactEmailOnly': 'आपकी CIBIL स्कोर जांच के लिए हम आपसे केवल ईमेल के माध्यम से संपर्क करेंगे।',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage === 'en' || savedLanguage === 'hi') {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // Update HTML lang attribute
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  useEffect(() => {
    // Update HTML lang attribute when language changes
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
