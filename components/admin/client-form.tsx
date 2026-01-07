'use client'

import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { createClient, updateClient } from '@/lib/admin-crud'
import { useState } from 'react'
import { ImageUpload } from './image-upload'

interface ClientFormProps {
  client?: {
    id: string
    name: string
    logo: string
    order: number
    active: boolean
  }
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Saving...' : 'Save Client'}
    </button>
  )
}

export function ClientForm({ client }: ClientFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [logo, setLogo] = useState<string>(client?.logo || '')

  async function handleSubmit(formData: FormData) {
    try {
      const data = {
        name: formData.get('name') as string,
        logo: logo,
        order: parseInt(formData.get('order') as string),
        active: formData.get('active') === 'on',
      }

      if (client) {
        await updateClient(client.id, data)
      } else {
        await createClient(data)
      }

      router.push('/admin/clients')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Client Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={client?.name}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <ImageUpload
        label="Client Logo"
        defaultValue={client?.logo}
        onChange={setLogo}
        required
      />

      <div>
        <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Display Order
        </label>
        <input
          type="number"
          id="order"
          name="order"
          defaultValue={client?.order ?? 0}
          min="0"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="active"
          name="active"
          defaultChecked={client?.active ?? true}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Active (visible on website)
        </label>
      </div>

      <div className="flex gap-4">
        <SubmitButton />
        <button
          type="button"
          onClick={() => router.push('/admin/clients')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
