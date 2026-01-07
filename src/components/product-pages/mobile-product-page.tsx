"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  Compass,
  Users,
  Star,
  Camera,
  Navigation,
  Heart,
  Shield,
  Smartphone
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

interface MobileProductPageProps {
  product: Product
}

const iconMap: Record<string, any> = {
  MapPin, Compass, Users, Star, Camera, Navigation, Heart, Shield
}

export default function MobileProductPage({ product }: MobileProductPageProps) {
  const defaultFeatures = [
    { icon: MapPin, title: "Discover Places", description: "Explore amazing destinations with detailed information and reviews." },
    { icon: Users, title: "Expert Guides", description: "Connect with experienced local guides for personalized experiences." },
    { icon: Navigation, title: "Offline Maps", description: "Download maps and access them offline." },
    { icon: Camera, title: "Photo Spots", description: "Find the best photography locations." },
    { icon: Star, title: "Reviews & Ratings", description: "Read authentic reviews from fellow users." },
    { icon: Heart, title: "Save Favorites", description: "Bookmark places for quick access." },
    { icon: Compass, title: "Trip Planning", description: "Create and manage your itinerary easily." },
    { icon: Shield, title: "Verified & Safe", description: "All content is verified for quality and safety." },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.subtitle && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 mb-6">
                  <Compass className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    {product.subtitle}
                  </span>
                </div>
              )}

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {product.title}
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Download App
                  <Smartphone className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>

              {/* App Store Badges */}
              <div className="flex gap-4 mt-8">
                <div className="h-12 w-36 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-black text-xs font-semibold">App Store</span>
                </div>
                <div className="h-12 w-36 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-black text-xs font-semibold">Google Play</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center"
            >
              {/* Phone Mockup Frame */}
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[3rem] blur-3xl opacity-30 animate-pulse" />
                <div className="relative w-[280px] md:w-[320px] bg-gray-900 dark:bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 dark:bg-gray-800 rounded-b-2xl z-10" />
                  {/* Screen */}
                  <div className="relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-950">
                    <Image
                      src={product.heroImage || product.image}
                      alt={product.title}
                      width={320}
                      height={640}
                      className="w-full h-auto aspect-[9/19]"
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
          description="Powerful features designed to enhance your experience."
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
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4">
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
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
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
                    <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700">
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
            <p className="text-xl text-purple-100 mb-8">
              Download the app today and start your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
                Download Now
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-2 border-white hover:bg-white/10">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
