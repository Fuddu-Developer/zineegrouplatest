'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { testimonials } from '@/components/Testimonials'
import { useState, ChangeEvent, FormEvent } from 'react'

export default function ReviewsPage() {
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
        setSubmitMessage('Thank you! Your review has been submitted successfully.')
        setFormData({
          name: '',
          email: '',
          review: '',
          rating: 5
        })
      } else {
        setSubmitMessage('There was an error submitting your review. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your review. Please try again.')
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
                <h1 className="reviews-title">All Reviews</h1>
                <p className="reviews-intro">Read what our clients have to say about us</p>
              </div>

              {/* All Reviews - static grid, no transition */}
              <section className="testimonials-section">
                <div className="testimonials-header">
                  <div className="testimonials-header-left">
                    <p className="happy-clients">12K + Happy Clients</p>
                    <h2 className="testimonials-title">All Client Reviews</h2>
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
                          (Rating: {testimonial.rating})
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
                <h2 className="write-review-title">Write a Review</h2>
                <p className="write-review-intro">Share your experience with us</p>
                
                <form className="review-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <select
                      id="rating"
                      name="rating"
                      className="form-select"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Very Good</option>
                      <option value="3">3 Stars - Good</option>
                      <option value="2">2 Stars - Fair</option>
                      <option value="1">1 Star - Poor</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="review" className="form-label">Your Review</label>
                    <textarea
                      id="review"
                      name="review"
                      placeholder="Write your review here..."
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
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
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
