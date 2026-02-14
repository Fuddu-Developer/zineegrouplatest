'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './talk-to-expert.module.css'

export default function TalkToExpertPage() {
  const { t } = useLanguage()

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <aside className={styles.contentCard}>
            <h1 className={styles.title}>{t('expert.title')}</h1>
            <p className={styles.subtitle}>{t('expert.subtitle')}</p>
            <span className={styles.liveHelp}>{t('expert.liveHelp')}</span>
            <p className={styles.cta}>{t('expert.cta')}</p>
            <p className={styles.helpHeading}>{t('expert.helpHeading')}</p>
            <ul className={styles.bullets}>
              <li>{t('expert.bullet1')}</li>
              <li>{t('expert.bullet2')}</li>
              <li>{t('expert.bullet3')}</li>
            </ul>
            <div className={styles.emailBlock}>
              <p className={styles.emailLabel}>{t('expert.emailLabel')}</p>
              <a href="mailto:info@zineegroup.com" className={styles.emailLink}>
                {t('expert.email')}
              </a>
            </div>
          </aside>
          <section className={styles.chatWrapper} aria-label="Chat with expert">
            <div className={styles.chatCard}>
              <div className={styles.chatCardInner}>
                <ChatBot embedded showWhatsApp={false} showChatToggle={false} showLabel={false} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
