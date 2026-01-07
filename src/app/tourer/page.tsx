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
  Globe,
  Calendar,
  Shield,
  Check,
  ArrowRight,
  Smartphone
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    icon: MapPin,
    title: "Discover Places",
    description: "Explore hidden gems and popular tourist destinations across South Africa with detailed information and reviews."
  },
  {
    icon: Users,
    title: "Book Tour Guides",
    description: "Connect with experienced local tour guides who know the best spots and can create personalized experiences."
  },
  {
    icon: Navigation,
    title: "Offline Maps",
    description: "Download maps and access them offline, perfect for areas with limited connectivity."
  },
  {
    icon: Camera,
    title: "Photo Spots",
    description: "Find the best photography locations and capture stunning memories of your journey."
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Read authentic reviews from fellow travelers and share your own experiences."
  },
  {
    icon: Calendar,
    title: "Trip Planning",
    description: "Create and manage your itinerary with our intuitive trip planning tools."
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description: "Bookmark places and guides you love for quick access and future visits."
  },
  {
    icon: Shield,
    title: "Verified Guides",
    description: "All tour guides are verified and rated to ensure quality and safety."
  },
]

const highlights = [
  "Over 1,000+ tourist destinations",
  "500+ verified tour guides",
  "Available on iOS and Android",
  "Multilingual support",
  "Real-time availability",
  "Secure payment system"
]

const destinations = [
  { name: "Cape Town", image: "https://placehold.co/400x300/8b5cf6/ffffff?text=Cape+Town", places: "250+ Places" },
  { name: "Kruger Park", image: "https://placehold.co/400x300/a78bfa/ffffff?text=Kruger+Park", places: "180+ Places" },
  { name: "Johannesburg", image: "https://placehold.co/400x300/8b5cf6/ffffff?text=Johannesburg", places: "200+ Places" },
  { name: "Durban", image: "https://placehold.co/400x300/a78bfa/ffffff?text=Durban", places: "150+ Places" },
]

export default function TourerPage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 mb-6">
                <Compass className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  South Africa Tourism Guide
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Tourer
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Your ultimate companion for exploring the beauty of South Africa.
                Discover amazing places, connect with expert guides, and create unforgettable memories.
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://placehold.co/400x800/8b5cf6/ffffff?text=Tourer+App+Screen"
                    alt="Tourer App"
                    width={400}
                    height={800}
                    className="w-full h-auto mx-auto max-w-sm"
                  />
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
          title="Everything You Need for the Perfect Trip"
          description="Powerful features designed to enhance your travel experience in South Africa."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
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
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Popular Destinations */}
      <Section className="bg-gray-50 dark:bg-gray-950">
        <SectionHeader
          subtitle="Popular Destinations"
          title="Explore South Africa's Finest"
          description="Discover the most visited and loved destinations across the country."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-purple-200 text-sm">{destination.places}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* App Screenshots */}
      <Section className="bg-white dark:bg-gray-900">
        <SectionHeader
          subtitle="Screenshots"
          title="Beautiful & Intuitive Design"
          description="Take a look at the sleek interface of the Tourer mobile app."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Explore", image: "https://placehold.co/300x600/8b5cf6/ffffff?text=Explore+Screen" },
            { title: "Tour Guides", image: "https://placehold.co/300x600/a78bfa/ffffff?text=Guides+Screen" },
            { title: "Booking", image: "https://placehold.co/300x600/8b5cf6/ffffff?text=Booking+Screen" },
          ].map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={screenshot.image}
                  alt={screenshot.title}
                  width={300}
                  height={600}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Highlights Section */}
      <Section className="bg-gray-50 dark:bg-gray-950">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="https://placehold.co/600x600/8b5cf6/ffffff?text=Tourer+Features"
              alt="Tourer Features"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Why Choose Tourer?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of travelers who have made their South African adventure unforgettable with Tourer.
              Experience the best of what the country has to offer.
            </p>

            <div className="space-y-4">
              {highlights.map((highlight, index) => (
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
                  <p className="text-gray-700 dark:text-gray-300">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

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
              Start Your South African Adventure Today
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Download Tourer now and explore the wonders of South Africa with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
                <Smartphone className="mr-2 h-5 w-5" />
                Download Now
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-2 border-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
