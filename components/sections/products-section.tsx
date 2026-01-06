"use client"

import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingCart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    name: "Slash POS",
    tagline: "Web-Based Point of Sale System",
    description: "A comprehensive, cloud-based POS solution designed for modern businesses. Manage inventory, process sales, track analytics, and streamline operations from anywhere.",
    icon: ShoppingCart,
    image: "https://placehold.co/600x400/3b82f6/ffffff?text=Slash+POS",
    color: "from-blue-600 to-cyan-600",
    href: "/slash-pos",
    features: ["Inventory Management", "Real-time Analytics", "Multi-location Support", "Cloud-based"]
  },
  {
    name: "Tourer",
    tagline: "South Africa Tourism Guide",
    description: "Your ultimate companion for exploring South Africa. Discover amazing places, hire expert tour guides, and create unforgettable experiences.",
    icon: MapPin,
    image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Tourer+App",
    color: "from-purple-600 to-pink-600",
    href: "/tourer",
    features: ["Place Discovery", "Tour Guide Booking", "Offline Maps", "Local Experiences"]
  },
]

export function ProductsSection() {
  return (
    <Section id="products" className="bg-white dark:bg-gray-900">
      <SectionHeader
        subtitle="Our Products"
        title="Innovative Solutions We've Built"
        description="Explore our flagship products designed to solve real-world challenges."
      />

      <div className="space-y-16">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Product Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${product.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                  <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${product.color} mb-4`}>
                  <product.icon className="h-5 w-5 text-white" />
                  <span className="text-sm font-semibold text-white">
                    {product.tagline}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  {product.name}
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
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.color}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link href={product.href}>
                  <Button className="group">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
