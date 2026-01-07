import { Section, SectionHeader } from "@/components/ui/section"
import prisma from "@/lib/prisma"
import { ServiceCard } from "./service-card"

export async function ServicesSection() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  if (services.length === 0) return null

  return (
    <Section id="services" className="bg-gray-50 dark:bg-gray-950">
      <SectionHeader
        subtitle="Our Services"
        title="Comprehensive Tech Solutions"
        description="We offer a full range of services to help your business thrive in the digital age."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </Section>
  )
}
