'use client'

import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { createPortfolio, updatePortfolio } from '@/lib/admin-crud'
import { useState } from 'react'
import { ImageUpload } from './image-upload'

interface PortfolioFormProps {
  portfolio?: {
    id: string
    title: string
    description: string
    image: string
    technologies: string[]
    liveUrl: string | null
    githubUrl: string | null
    order: number
    featured: boolean
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
      {pending ? 'Saving...' : 'Save Project'}
    </button>
  )
}

export function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<string>(portfolio?.image || '')
  const [technologies, setTechnologies] = useState<string>(
    portfolio?.technologies.join(', ') || ''
  )

  async function handleSubmit(formData: FormData) {
    try {
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        image: image,
        technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
        liveUrl: (formData.get('liveUrl') as string) || '',
        githubUrl: (formData.get('githubUrl') as string) || '',
        order: parseInt(formData.get('order') as string),
        featured: formData.get('featured') === 'on',
        active: formData.get('active') === 'on',
      }

      if (portfolio) {
        await updatePortfolio(portfolio.id, data)
      } else {
        await createPortfolio(data)
      }

      router.push('/admin/portfolio')
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
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={portfolio?.title}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={portfolio?.description}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <ImageUpload
        label="Project Image"
        defaultValue={portfolio?.image}
        onChange={setImage}
        required
      />

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Technologies (comma-separated)
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          required
          placeholder="React, Next.js, TypeScript, Tailwind CSS"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Separate each technology with a comma
        </p>
      </div>

      <div>
        <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Live URL (optional)
        </label>
        <input
          type="url"
          id="liveUrl"
          name="liveUrl"
          defaultValue={portfolio?.liveUrl || ''}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          GitHub URL (optional)
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          defaultValue={portfolio?.githubUrl || ''}
          placeholder="https://github.com/username/repo"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Display Order
        </label>
        <input
          type="number"
          id="order"
          name="order"
          defaultValue={portfolio?.order ?? 0}
          min="0"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            defaultChecked={portfolio?.featured ?? false}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Featured Project
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            name="active"
            defaultChecked={portfolio?.active ?? true}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Active (visible on website)
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <SubmitButton />
        <button
          type="button"
          onClick={() => router.push('/admin/portfolio')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
