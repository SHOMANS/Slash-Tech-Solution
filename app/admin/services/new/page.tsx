import { ServiceForm } from '@/components/admin/service-form'

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Add New Service</h1>
      <ServiceForm />
    </div>
  )
}
