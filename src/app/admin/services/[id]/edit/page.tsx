import { ServiceForm } from '@/components/admin/service-form'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditServicePageProps {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params

  const service = await prisma.service.findUnique({
    where: { id },
  })

  if (!service) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit Service</h1>
      <ServiceForm service={service} />
    </div>
  )
}
