import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProductsSection } from "@/components/sections/products-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { ClientsSection } from "@/components/sections/clients-section"
import { ContactSection } from "@/components/sections/contact-section"
import { getTestimonials } from "@/lib/actions"

export default async function HomePage() {
  const testimonials = await getTestimonials()

  return (
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
    </main>
  )
}

