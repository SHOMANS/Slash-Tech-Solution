import { getServices, getPortfolioProjects, getClients, getTestimonials, getProducts } from '@/lib/actions'
import { V2Layout } from '@/components/v2/layout'

export default async function NewPage() {
  const [services, portfolio, products, clients, testimonials] = await Promise.all([
    getServices(),
    getPortfolioProjects(),
    getProducts(),
    getClients(),
    getTestimonials(),
  ])

  return (
    <V2Layout
      services={services}
      portfolio={portfolio}
      products={products}
      clients={clients}
      testimonials={testimonials}
    />
  )
}
