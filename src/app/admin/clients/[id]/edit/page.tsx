import { ClientForm } from '@/components/admin/client-form'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditClientPageProps {
  params: Promise<{ id: string }>
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const { id } = await params

  const client = await prisma.client.findUnique({
    where: { id },
  })

  if (!client) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit Client</h1>
      <ClientForm client={client} />
    </div>
  )
}
