import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Carousel from '@/components/Carousel'
import Features from '@/components/Features'
import TrustSection from '@/components/TrustSection'
import Testimonials from '@/components/Testimonials'
import Partners from '@/components/Partners'
import Footer from '@/components/Footer'
import ScrollRevealSection from '@/components/ScrollRevealSection'

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-body">
        <aside className="sidebar left-sidebar"></aside>
        <section className="main-content">
          <div className="content-wrapper">
            <ScrollRevealSection delay={0}>
              <Hero />
            </ScrollRevealSection>

            <ScrollRevealSection delay={80}>
              <Carousel />
            </ScrollRevealSection>

            <ScrollRevealSection delay={120}>
              <Features />
            </ScrollRevealSection>

            <ScrollRevealSection delay={160}>
              <TrustSection />
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
    </>
  )
}
