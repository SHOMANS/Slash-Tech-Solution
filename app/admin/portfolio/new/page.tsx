import { PortfolioForm } from '@/components/admin/portfolio-form'

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Add New Portfolio Project</h1>
      <PortfolioForm />
    </div>
  )
}
