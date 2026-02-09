'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isCibilPage = pathname === '/cibil-score'

  return (
    <footer className="main-footer" id="mainFooter">
      <div className="footer-content">
        <div className="footer-wrapper">
          <div className="footer-section footer-company">
            <div className="footer-logo">
              <div className="logo-container">
                <Image
                  src="/assets/images/Logo-Helloans.png"
                  alt="Helloans Logo"
                  className="footer-logo-img"
                  width={80}
                  height={80}
                />
                <div className="logo-text">
                </div>
              </div>
              <div className="logo-tagline">{t('footer.tagline')}</div>
            </div>
            <p className="company-description">
              {t('footer.description')}
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">{t('footer.quickLinks')}</h3>
            <ul className="footer-list">
              <li><Link href="/">{t('nav.home')}</Link></li>
              <li><Link href="/about-us">{t('nav.about')}</Link></li>
              <li><Link href="/contact">{t('nav.apply')}</Link></li>
              <li><Link href="/cibil-score">{t('nav.cibil')}</Link></li>
              <li><Link href="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">{t('footer.getInTouch')}</h3>
            <ul className="footer-list">
              {!isCibilPage && (
                <li className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <a href="tel:+919540185185">+91 9540 185 185</a>
                </li>
              )}
              <li className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href="mailto:info@zineegroup.com">info@zineegroup.com</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">{t('footer.socialMedia')}</h3>
            <ul className="footer-list social-list">
              <li className="social-item">
                <Image
                  src="/assets/social/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://www.instagram.com/helloans_zinee/?igsh=MTVmeWpiOGlkZXpseA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
              <li className="social-item">
                <Image
                  src="/assets/social/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://in.linkedin.com/company/helloans-zinee-services-pvt-ltd" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li className="social-item">
                <Image
                  src="/assets/social/facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://www.facebook.com/HELLOANS.ZINEE?mibextid=wwXIfr&rdid=HaXjbDNL58yjXxXo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BCucexnhL%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a>
              </li>
              <li className="social-item">
                <Image
                  src="/assets/social/youtube.png"
                  alt="YouTube"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://www.youtube.com/@HELLOANS_ZINEEGROUP" target="_blank" rel="noopener noreferrer">YouTube</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="copyright-wrapper">
          <a href="https://wa.me/919540185185" className="whatsapp-icon" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.239-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
          <p className="copyright-text">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
