"use client"

import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/ui/section"
import { Target, Users, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower businesses with innovative technology solutions that drive growth and efficiency."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "A talented team of developers, designers, and strategists dedicated to excellence."
  },
  {
    icon: Award,
    title: "Quality First",
    description: "We maintain the highest standards in code quality, security, and user experience."
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Building systems that grow with your business and adapt to changing needs."
  },
]

export function AboutSection() {
  return (
    <Section id="about" className="bg-white dark:bg-gray-900">
      <SectionHeader
        subtitle="About Us"
        title="Building the Future of Technology"
        description="We are a passionate team of innovators dedicated to creating exceptional digital experiences and products."
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
            <Image
              src="https://placehold.co/600x600/3b82f6/ffffff?text=Slash+Tech+Team"
              alt="About Slash Tech Solution"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Decorative Element */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl -z-10 blur-2xl opacity-30" />
        </motion.div>

        {/* Right: Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Who We Are
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Slash Tech Solution is a forward-thinking technology company specializing in
              custom software development, web applications, and mobile solutions. We combine
              creativity with technical expertise to deliver products that make a real impact.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              From our flagship products like <span className="text-primary font-semibold">Slash POS</span>,
              a comprehensive web-based point of sale system, to <span className="text-secondary font-semibold">Tourer</span>,
              our innovative tourism app for South Africa, we're committed to building solutions
              that solve real-world problems.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
