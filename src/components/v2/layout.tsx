import type { Service, Product, Portfolio, Client, Testimonial } from '@prisma/client'
import { GrainScanlines } from './effects/grain-scanlines'
import { Cursor } from './effects/cursor'
import { Loader } from './effects/loader'
import { NavbarV2 } from './navbar'
import { HeroV2 } from './hero'
import { MarqueeStripV2 } from './marquee-strip'
import { AboutV2 } from './about'
import { ServicesV2 } from './services'
import { ProductsV2 } from './products'
import { WorkV2 } from './work'
import { ClientsV2 } from './clients'
import { ContactV2 } from './contact'
import { FooterV2 } from './footer'
import { VersionToggle } from '@/components/version-toggle'

interface V2LayoutProps {
  services: Service[]
  portfolio: Portfolio[]
  products: Product[]
  clients: Client[]
  testimonials: Testimonial[]
}

export function V2Layout({ services, portfolio, products, clients, testimonials }: V2LayoutProps) {
  return (
    <>
      {/* Fixed full-screen effects */}
      <GrainScanlines />
      <Cursor />
      <Loader />

      {/* Page content */}
      <NavbarV2 />
      <main>
        <HeroV2 />
        <MarqueeStripV2 services={services} />
        <AboutV2 />
        <ServicesV2 services={services} />
        <ProductsV2 products={products} />
        <WorkV2 portfolio={portfolio} />
        <ClientsV2 testimonials={testimonials} clients={clients} />
        <ContactV2 />
      </main>
      <FooterV2 products={products} />
      <VersionToggle label="← Classic Design" target="v1" variant="v2" />
    </>
  )
}
