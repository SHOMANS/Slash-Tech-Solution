import { Section, SectionHeader } from "@/components/ui/section"
import prisma from "@/lib/prisma"
import { ClientLogo } from "./client-logo"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  email: string
  company: string | null
  role: string | null
  rating: number
  message: string
  avatar: string | null
  approved: boolean
  active: boolean
  createdAt: Date
}

interface ClientsSectionProps {
  testimonials: Testimonial[]
}

export async function ClientsSection({ testimonials }: ClientsSectionProps) {
  const clients = await prisma.client.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  return (
    <Section id="clients" className="bg-gray-50 dark:bg-gray-950">
      <SectionHeader
        subtitle="Our Clients"
        title="Trusted by Industry Leaders"
        description="We're proud to partner with amazing companies around the world."
      />

      {/* Client Logos */}
      {clients.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {clients.map((client) => (
            <ClientLogo key={client.id} client={client} index={0} />
          ))}
        </div>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 fill-current ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'
                        }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name || ""}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role || 'Client'}
                      {testimonial.company ? `, ${testimonial.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
