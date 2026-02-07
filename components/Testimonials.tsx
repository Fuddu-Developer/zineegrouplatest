'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export const testimonials = [
  {
    avatar: '👤',
    rating: 5,
    text: 'Excellent service from all team members. Zinee Group is my first choice for financial needs.',
    name: 'Ajay R',
  },
  {
    avatar: '👤',
    rating: 5,
    text: 'I was in need of funds and got my loan processed quickly with complete transparency.',
    name: 'Raunak Batra',
  },
  {
    avatar: '👤',
    rating: 5,
    text: 'They provide quick financial assistance and a clear process that keeps you informed.',
    name: 'Sonia Sharma',
  },
  {
    avatar: '👤',
    rating: 4,
    text: 'Got my personal loan disbursed within a day. Smooth and hassle‑free experience.',
    name: 'Mona',
  },
  {
    avatar: '👤',
    rating: 5,
    text: 'Business loan process became much easier thanks to their expert guidance.',
    name: 'Saurabh Verma',
  },
  {
    avatar: '👤',
    rating: 5,
    text: 'Professional support and fast turnaround. Highly recommended for all loan needs.',
    name: 'Priya',
  },
]

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <div className="testimonials-header-left">
          <p className="happy-clients">{t('testimonials.happyClients')}</p>
          <h2 className="testimonials-title"><span className="highlight">Client</span> Experiences</h2>
        </div>
        <Link href="/reviews" className="read-all-reviews">
          {t('testimonials.readAll')}
        </Link>
      </div>
      <div className="testimonials-grid">
        <div className="testimonials-track">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <article
              key={index}
              className="testimonial-card"
            >
              <div className="testimonial-stars-row">
                <span className="testimonial-stars">
                  ★★★★★
                </span>
                <span className="testimonial-rating">
                  ({t('testimonials.rating')}: {testimonial.rating})
                </span>
              </div>

              <p className="testimonial-text">“ {testimonial.text} ”</p>

              <div className="testimonial-divider" />

              <div className="testimonial-footer">
                <span className="testimonial-footer-avatar">{testimonial.avatar}</span>
                <span className="testimonial-footer-name">{testimonial.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
