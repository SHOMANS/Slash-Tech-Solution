import { Section } from "@/components/ui/section"
import prisma from "@/lib/prisma"
import { PortfolioCard } from "./portfolio-card"
import { motion } from "framer-motion"

export async function PortfolioSection() {
  const projects = await prisma.portfolio.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  if (projects.length === 0) return null

  return (
    <Section id="portfolio" className="bg-gray-50 dark:bg-gray-900/50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Our Portfolio
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore some of our recent projects and see how we transform ideas into exceptional digital solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <PortfolioCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
