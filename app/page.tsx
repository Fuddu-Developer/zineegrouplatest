import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LoanTiles from '@/components/LoanTiles'
import NewCarousel from '@/components/NewCarousel'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Partners from '@/components/Partners'
import Footer from '@/components/Footer'
import ScrollRevealSection from '@/components/ScrollRevealSection'

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <div className="scrollable-content">
        <main className="main-body">
          <aside className="sidebar left-sidebar"></aside>
          <section className="main-content">
            <div className="content-wrapper">
              <ScrollRevealSection delay={0} className="no-blur">
                <div className="hero-carousel-wrapper">
                  <NewCarousel />
                  <Hero />
                </div>
              </ScrollRevealSection>

              <ScrollRevealSection delay={40}>
                <LoanTiles />
              </ScrollRevealSection>

              <ScrollRevealSection delay={80}>
                <Features />
              </ScrollRevealSection>

              <ScrollRevealSection delay={120}>
                <Testimonials />
              </ScrollRevealSection>

              <ScrollRevealSection delay={120}>
                <Partners />
              </ScrollRevealSection>
            </div>
          </section>
          <aside className="sidebar right-sidebar"></aside>
        </main>
        <Footer />
      </div>
    </div>
  )
}
