import { Anton, Bebas_Neue, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProductsSection } from "@/components/sections/products-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { ClientsSection } from "@/components/sections/clients-section"
import { ContactSection } from "@/components/sections/contact-section"
import { VersionToggle } from "@/components/version-toggle"
import { V2Layout } from "@/components/v2/layout"
import { getServices, getPortfolioProjects, getProducts, getClients, getTestimonials } from "@/lib/actions"

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--v2-display',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--v2-display-alt',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--v2-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--v2-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--v2-serif',
  display: 'swap',
})

export default async function HomePage() {
  const [services, portfolio, products, clients, testimonials] = await Promise.all([
    getServices(),
    getPortfolioProjects(),
    getProducts(),
    getClients(),
    getTestimonials(),
  ])

  return (
    <>
      {/* V1 — shown by default */}
      <div data-design-v1="">
        <main className="min-h-screen">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProductsSection />
          <PortfolioSection />
          <ClientsSection testimonials={testimonials} />
          <ContactSection />
          <Footer />
          <VersionToggle label="✦ New Design →" target="v2" variant="v1" />
        </main>
      </div>

      {/* V2 — hidden by default, shown when html[data-design="v2"] */}
      <div
        data-design-v2=""
        className={`v2 ${anton.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
        style={{ display: 'none', background: 'var(--bg)', minHeight: '100vh', color: 'var(--ink)' }}
      >
        <V2Layout
          services={services}
          portfolio={portfolio}
          products={products}
          clients={clients}
          testimonials={testimonials}
        />
      </div>
    </>
  )
}
