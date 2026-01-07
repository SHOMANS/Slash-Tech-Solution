'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  defaultValue?: string
  onChange: (base64: string) => void
  label: string
  required?: boolean
}

export function ImageUpload({ defaultValue, onChange, label, required }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(defaultValue || '')
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB')
      return
    }

    setError('')

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setPreview(base64String)
      onChange(base64String)
    }
    reader.readAsDataURL(file)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setPreview(url)
    onChange(url)
  }

  const clearImage = () => {
    setPreview('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Preview */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-auto object-contain rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* File Upload */}
      <div>
        <label className="block mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Upload Image (max 2MB)</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30 mt-1"
          />
        </label>
      </div>

      {/* Or URL */}
      <div>
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-400">Or enter URL</span>
          <input
            type="url"
            value={preview.startsWith('data:') ? '' : preview}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          />
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <input
        type="hidden"
        name={label.toLowerCase().replace(/\s+/g, '_')}
        value={preview}
        required={required && !preview}
      />
    </div>
  )
}
