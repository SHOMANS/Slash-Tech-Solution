import { ProductForm } from '@/components/admin/product-form'

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Add New Product</h1>
      <ProductForm />
    </div>
  )
}
