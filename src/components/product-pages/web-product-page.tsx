"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingCart,
  BarChart3,
  Package,
  Users,
  CreditCard,
  Cloud,
  Zap,
  Shield,
  Check,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  subtitle: string | null
  description: string
  image: string
  heroImage: string | null
  features: string[]
  benefits: string[]
  productType: string
}

interface WebProductPageProps {
  product: Product
}

const iconMap: Record<string, any> = {
  ShoppingCart, BarChart3, Package, Users, CreditCard, Cloud, Zap, Shield
}

export default function WebProductPage({ product }: WebProductPageProps) {
  const defaultFeatures = [
    { icon: ShoppingCart, title: "Point of Sale", description: "Fast and intuitive POS interface for quick transaction processing." },
    { icon: Package, title: "Inventory Management", description: "Real-time inventory tracking and automated reordering." },
    { icon: BarChart3, title: "Analytics & Reporting", description: "Comprehensive sales reports and business insights." },
    { icon: Users, title: "Customer Management", description: "Build customer profiles and track purchase history." },
    { icon: CreditCard, title: "Multiple Payment Options", description: "Accept cash, cards, and digital wallets seamlessly." },
    { icon: Cloud, title: "Cloud-Based", description: "Access your data anywhere with secure cloud storage." },
    { icon: Zap, title: "Lightning Fast", description: "Optimized performance for smooth operation." },
    { icon: Shield, title: "Secure & Compliant", description: "Bank-level security with end-to-end encryption." },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.subtitle && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 mb-6">
                  <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {product.subtitle}
                  </span>
                </div>
              )}

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {product.title}
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#contact">
                  <Button size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Browser Window Mockup */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-3xl opacity-25" />
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 mx-4 h-6 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center px-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{product.title}</span>
                    </div>
                  </div>
                  {/* Browser Content */}
                  <div className="relative">
                    <Image
                      src={product.heroImage || product.image}
                      alt={product.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Section className="bg-white dark:bg-gray-900">
        <SectionHeader
          subtitle="Features"
          title="Everything You Need"
          description="Powerful features designed to streamline your operations."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(product.features.length > 0 ? product.features : defaultFeatures.map(f => f.title)).slice(0, 8).map((feature, index) => {
            const featureObj = typeof feature === 'string'
              ? defaultFeatures.find(f => f.title === feature) || defaultFeatures[index]
              : defaultFeatures[index]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4">
                      <featureObj.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{featureObj.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{featureObj.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Benefits Section */}
      {product.benefits.length > 0 && (
        <Section className="bg-gray-50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Why Choose {product.title}?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {product.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-2 border-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
