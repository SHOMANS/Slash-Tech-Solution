import { Section } from "@/components/ui/section"
import prisma from "@/lib/prisma"
import { PortfolioCard } from "./portfolio-card"

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

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 blur-md pointer-events-none">
          {projects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-2xl border-2 border-blue-600">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Coming Soon
            </h3>
          </div>
        </div>
      </div>
    </Section>
  )
}
