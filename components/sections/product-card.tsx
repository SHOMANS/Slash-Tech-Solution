"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Product {
  id: string
  slug: string | null
  title: string
  subtitle: string | null
  description: string
  image: string
  heroImage: string | null
  features: string[]
  benefits: string[]
  price: string | null
  order: number
  featured: boolean
  active: boolean
}

interface ProductCardProps {
  product: Product
  index: number
}

const colors = [
  "from-blue-600 to-cyan-600",
  "from-purple-600 to-pink-600",
  "from-green-600 to-emerald-600",
  "from-orange-600 to-red-600",
]

export function ProductCard({ product, index }: ProductCardProps) {
  const color = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        {/* Product Image */}
        <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${color} mb-4`}>
            <span className="text-sm font-semibold text-white">
              {product.featured ? 'Featured Product' : 'Our Product'}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {product.title}
          </h3>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {product.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {product.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color}`} />
                {feature}
              </div>
            ))}
          </div>

          <Link href={`/product/${product.id}`}>
            <Button className="group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
