'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { testimonials } from '@/components/Testimonials'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ReviewsPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage(t('reviews.thankYou'))
        setFormData({
          name: '',
          email: '',
          review: '',
          rating: 5
        })
      } else {
        setSubmitMessage(t('reviews.errorMessage'))
      }
    } catch (error) {
      setSubmitMessage(t('reviews.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="main-body">
        <aside className="sidebar left-sidebar"></aside>
        <section className="main-content">
          <div className="content-wrapper">
            <div className="reviews-page-container">
              {/* Header Section */}
              <div className="reviews-header">
                <h1 className="reviews-title">{t('reviews.title')}</h1>
                <p className="reviews-intro">{t('reviews.intro')}</p>
              </div>

              {/* All Reviews - static grid, no transition */}
              <section className="testimonials-section">
                <div className="testimonials-header">
                  <div className="testimonials-header-left">
                    <p className="happy-clients">{t('reviews.happyClients')}</p>
                    <h2 className="testimonials-title">{t('reviews.allReviews')}</h2>
                  </div>
                </div>
                <div className="testimonials-grid reviews-static-grid">
                  {testimonials.map((testimonial, index) => (
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
              </section>

              {/* Write Review Section */}
              <div className="write-review-section">
                <h2 className="write-review-title">{t('reviews.writeReview')}</h2>
                <p className="write-review-intro">{t('reviews.shareExperience')}</p>
                
                <form className="review-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">{t('contact.name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t('reviews.yourName')}
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">{t('contact.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t('reviews.yourEmail')}
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rating" className="form-label">{t('reviews.ratingOption')}</label>
                    <select
                      id="rating"
                      name="rating"
                      className="form-select"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                    >
                      <option value="5">{t('reviews.starsExcellent')}</option>
                      <option value="4">{t('reviews.starsVeryGood')}</option>
                      <option value="3">{t('reviews.starsGood')}</option>
                      <option value="2">{t('reviews.starsFair')}</option>
                      <option value="1">{t('reviews.starsPoor')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="review" className="form-label">{t('contact.message')}</label>
                    <textarea
                      id="review"
                      name="review"
                      placeholder={t('reviews.yourReview')}
                      className="form-textarea"
                      rows={6}
                      value={formData.review}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {submitMessage && (
                    <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                      {submitMessage}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="form-submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.submitting') : t('reviews.submitReview')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <aside className="sidebar right-sidebar"></aside>
      </main>
      <Footer />
    </>
  )
}
