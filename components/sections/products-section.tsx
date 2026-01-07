import { Section, SectionHeader } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { ProductCard } from "./product-card"

export async function ProductsSection() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  if (products.length === 0) return null
  return (
    <Section id="products" className="bg-white dark:bg-gray-900">
      <SectionHeader
        subtitle="Our Products"
        title="Innovative Solutions We've Built"
        description="Explore our flagship products designed to solve real-world challenges."
      />

      <div className="space-y-16">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </Section>
  )
}
