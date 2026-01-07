import { ProductForm } from '@/components/admin/product-form'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
}
