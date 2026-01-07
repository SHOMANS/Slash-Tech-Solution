import { ClientForm } from '@/components/admin/client-form'

export default function NewClientPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Add New Client</h1>
      <ClientForm />
    </div>
  )
}
