import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import dynamic from 'next/dynamic'

// Dynamically import the page components
const WebProductPage = dynamic(() => import('@/components/product-pages/web-product-page'), { ssr: true })
const MobileProductPage = dynamic(() => import('@/components/product-pages/mobile-product-page'), { ssr: true })

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product || !product.active) {
    notFound()
  }

  // Render appropriate page based on product type
  if (product.productType === 'mobile') {
    return <MobileProductPage product={product} />
  }

  return <WebProductPage product={product} />
}
