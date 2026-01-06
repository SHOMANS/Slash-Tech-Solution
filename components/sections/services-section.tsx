"use client"

import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Cloud, Palette, Database, Shield } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js for scalable and performant solutions.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Cloud infrastructure setup, migration, and optimization using AWS, Azure, and Google Cloud Platform.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed with user experience at the forefront, ensuring engagement and satisfaction.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Robust database architecture, optimization, and management for PostgreSQL, MongoDB, MySQL, and more.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Security & DevOps",
    description: "Comprehensive security audits, CI/CD pipeline setup, and DevOps best practices implementation.",
    color: "from-teal-500 to-cyan-500"
  },
]

export function ServicesSection() {
  return (
    <Section id="services" className="bg-gray-50 dark:bg-gray-950">
      <SectionHeader
        subtitle="Our Services"
        title="Comprehensive Tech Solutions"
        description="We offer a full range of services to help your business thrive in the digital age."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full group hover:shadow-2xl">
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
