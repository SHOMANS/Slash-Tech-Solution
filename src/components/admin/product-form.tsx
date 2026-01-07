'use client'

import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/lib/admin-crud'
import { useState } from 'react'
import { ImageUpload } from './image-upload'

interface ProductFormProps {
  product?: {
    id: string
    slug: string | null
    title: string
    subtitle: string | null
    description: string
    image: string
    heroImage: string | null
    productType: string
    features: string[]
    benefits: string[]
    price: string | null
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
      {pending ? 'Saving...' : 'Save Product'}
    </button>
  )
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<string>(product?.image || '')
  const [heroImage, setHeroImage] = useState<string>(product?.heroImage || '')
  const [features, setFeatures] = useState<string>(
    product?.features.join(', ') || ''
  )
  const [benefits, setBenefits] = useState<string>(
    product?.benefits.join(', ') || ''
  )

  async function handleSubmit(formData: FormData) {
    try {
      const data = {
        slug: formData.get('slug') as string,
        title: formData.get('title') as string,
        subtitle: (formData.get('subtitle') as string) || '',
        description: formData.get('description') as string,
        image: image,
        heroImage: heroImage || '',
        productType: formData.get('productType') as string,
        features: features.split(',').map(f => f.trim()).filter(Boolean),
        benefits: benefits.split(',').map(b => b.trim()).filter(Boolean),
        price: (formData.get('price') as string) || '',
        order: parseInt(formData.get('order') as string),
        featured: formData.get('featured') === 'on',
        active: formData.get('active') === 'on',
      }

      if (product) {
        await updateProduct(product.id, data)
      } else {
        await createProduct(data)
      }

      router.push('/admin/products')
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
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          URL Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          defaultValue={product?.slug || ''}
          placeholder="e.g., slash-pos or tourer"
          pattern="[a-z0-9-]*"
          title="Only lowercase letters, numbers, and hyphens allowed"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          This will be used in the URL (e.g., /slash-pos). Leave empty for now, add later.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={product?.title}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subtitle (Badge Text)
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          defaultValue={product?.subtitle || ''}
          placeholder="e.g., Web-Based POS System"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Shown in product badge on the landing page
        </p>
      </div>

      <div>
        <label htmlFor="productType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Type *
        </label>
        <select
          id="productType"
          name="productType"
          defaultValue={product?.productType || 'web'}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="web">Web Application</option>
          <option value="mobile">Mobile Application</option>
        </select>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Determines the design style of the product page
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <ImageUpload
        label="Card Image *"
        defaultValue={product?.image}
        onChange={setImage}
        required
      />

      <ImageUpload
        label="Hero Image (Product Page)"
        defaultValue={product?.heroImage || ''}
        onChange={setHeroImage}
        required={false}
      />

      <div>
        <label htmlFor="features" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Features (comma-separated)
        </label>
        <input
          type="text"
          id="features"
          name="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          required
          placeholder="Feature 1, Feature 2, Feature 3"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Shown as bullet points on the card
        </p>
      </div>

      <div>
        <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Benefits/Highlights (comma-separated)
        </label>
        <textarea
          id="benefits"
          name="benefits"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          rows={3}
          placeholder="Benefit 1, Benefit 2, Benefit 3"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Shown on the product detail page
        </p>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price (optional)
        </label>
        <input
          type="text"
          id="price"
          name="price"
          defaultValue={product?.price || ''}
          placeholder="e.g., $99/month or Contact for pricing"
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
          defaultValue={product?.order ?? 0}
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
            defaultChecked={product?.featured ?? false}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Featured Product
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            name="active"
            defaultChecked={product?.active ?? true}
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
          onClick={() => router.push('/admin/products')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
