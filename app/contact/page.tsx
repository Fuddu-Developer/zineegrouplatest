'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="page-container">
      <Header />
      <div className="scrollable-content">
        <main className="main-body">
          <aside className="sidebar left-sidebar"></aside>
          <section className="main-content">
            <div className="contact-us-container">
              <div className="contact-us-grid">
                <div className="contact-info-column">
                  <h1 className="contact-heading">{t('contact.getInTouch')}</h1>
                  <p className="contact-chatbot-intro">{t('contact.chatbotIntro')}</p>

                  <div className="contact-details">
                    <div className="contact-detail-item">
                      <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <a href="mailto:info@zineegroup.com" className="contact-link">info@zineegroup.com</a>
                    </div>
                  </div>

                  <h2 className="social-heading">{t('contact.socialMedia')}</h2>
                  <div className="social-links">
                    <a href="https://in.linkedin.com/company/helloans-zinee-services-pvt-ltd" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image src="/assets/social/linkedin.png" alt="LinkedIn" width={40} height={40} className="social-icon-img" />
                    </a>
                    <a href="https://www.instagram.com/helloans_zinee/?igsh=MTVmeWpiOGlkZXpseA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image src="/assets/social/instagram.png" alt="Instagram" width={40} height={40} className="social-icon-img" />
                    </a>
                    <a href="https://www.facebook.com/HELLOANS.ZINEE?mibextid=wwXIfr&rdid=HaXjbDNL58yjXxXo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BCucexnhL%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image src="/assets/social/facebook.png" alt="Facebook" width={40} height={40} className="social-icon-img" />
                    </a>
                    <a href="https://www.youtube.com/@HELLOANS_ZINEEGROUP" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Image src="/assets/social/youtube.png" alt="YouTube" width={40} height={40} className="social-icon-img" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <aside className="sidebar right-sidebar"></aside>
        </main>
        <Footer />
      </div>
    </div>
  )
}
