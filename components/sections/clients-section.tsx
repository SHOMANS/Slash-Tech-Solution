"use client"

import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/ui/section"
import Image from "next/image"

const clients = [
  { name: "TechCorp", logo: "https://placehold.co/200x80/e5e7eb/374151?text=TechCorp" },
  { name: "InnovateLabs", logo: "https://placehold.co/200x80/e5e7eb/374151?text=InnovateLabs" },
  { name: "Digital Solutions", logo: "https://placehold.co/200x80/e5e7eb/374151?text=Digital+Solutions" },
  { name: "CloudFirst", logo: "https://placehold.co/200x80/e5e7eb/374151?text=CloudFirst" },
  { name: "StartupHub", logo: "https://placehold.co/200x80/e5e7eb/374151?text=StartupHub" },
  { name: "Enterprise Co", logo: "https://placehold.co/200x80/e5e7eb/374151?text=Enterprise+Co" },
]

const testimonials = [
  {
    quote: "Slash Tech Solution transformed our business operations with their innovative POS system. The team's expertise and dedication are unmatched.",
    author: "Sarah Johnson",
    role: "CEO, Retail Excellence",
    avatar: "https://placehold.co/100x100/3b82f6/ffffff?text=SJ"
  },
  {
    quote: "Working with Slash Tech was a game-changer. They delivered a mobile app that exceeded our expectations and continues to delight our users.",
    author: "Michael Chen",
    role: "Founder, TourGuide Pro",
    avatar: "https://placehold.co/100x100/8b5cf6/ffffff?text=MC"
  },
  {
    quote: "Professional, creative, and reliable. The team at Slash Tech Solution brings ideas to life with precision and care.",
    author: "Emily Rodriguez",
    role: "CTO, Digital Dynamics",
    avatar: "https://placehold.co/100x100/06b6d4/ffffff?text=ER"
  },
]

export function ClientsSection() {
  return (
    <Section id="clients" className="bg-gray-50 dark:bg-gray-950">
      <SectionHeader
        subtitle="Our Clients"
        title="Trusted by Industry Leaders"
        description="We're proud to partner with amazing companies around the world."
      />

      {/* Client Logos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20"
      >
        {clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-shadow duration-300 grayscale hover:grayscale-0"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={200}
              height={80}
              className="w-full h-auto max-h-12 object-contain"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          What Our Clients Say
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
