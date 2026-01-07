import { PortfolioForm } from '@/components/admin/portfolio-form'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditPortfolioPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { id } = await params

  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
  })

  if (!portfolio) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit Portfolio Project</h1>
      <PortfolioForm portfolio={portfolio} />
    </div>
  )
}
