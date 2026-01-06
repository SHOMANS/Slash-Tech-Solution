"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { Section } from "@/components/ui/section"

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive admin dashboard for managing online stores with real-time analytics, inventory management, and order processing.",
    image: "https://placehold.co/600x400/3b82f6/ffffff?text=E-Commerce+Dashboard",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking solution with biometric authentication, transaction history, and instant transfers.",
    image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Banking+App",
    technologies: ["React Native", "Firebase", "Redux", "Jest"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Restaurant Management System",
    description: "Complete restaurant management platform with table reservations, menu management, and integrated POS system.",
    image: "https://placehold.co/600x400/06b6d4/ffffff?text=Restaurant+System",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Healthcare Portal",
    description: "Patient management system with appointment scheduling, medical records, and telemedicine capabilities.",
    image: "https://placehold.co/600x400/10b981/ffffff?text=Healthcare+Portal",
    technologies: ["Vue.js", "Express", "MongoDB", "WebRTC"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "Advanced analytics platform for tracking social media performance across multiple platforms with AI-powered insights.",
    image: "https://placehold.co/600x400/f59e0b/ffffff?text=Analytics+Platform",
    technologies: ["Angular", "Python", "TensorFlow", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Logistics Tracking App",
    description: "Real-time package tracking and fleet management system with route optimization and delivery notifications.",
    image: "https://placehold.co/600x400/ef4444/ffffff?text=Logistics+App",
    technologies: ["Flutter", "Django", "GraphQL", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export function PortfolioSection() {
  return (
    <Section id="portfolio" className="bg-gray-50 dark:bg-gray-900/50">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
        >
          Our Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Explore some of our recent projects and see how we transform ideas into exceptional digital solutions
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Project Links */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                  aria-label="View live project"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
