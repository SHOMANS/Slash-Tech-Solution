"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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
  TrendingUp,
  Check,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    icon: ShoppingCart,
    title: "Point of Sale",
    description: "Fast and intuitive POS interface for quick transaction processing with support for multiple payment methods."
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Real-time inventory tracking, stock alerts, and automated reordering to prevent stockouts."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Comprehensive sales reports, revenue analytics, and business insights at your fingertips."
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Build customer profiles, track purchase history, and create loyalty programs."
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description: "Accept cash, cards, mobile payments, and digital wallets seamlessly."
  },
  {
    icon: Cloud,
    title: "Cloud-Based",
    description: "Access your business data anywhere, anytime with secure cloud storage and backup."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance ensures quick loading times and smooth operation even during peak hours."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Bank-level security with end-to-end encryption and PCI DSS compliance."
  },
]

const benefits = [
  "Increase sales efficiency by 40%",
  "Reduce inventory costs by 25%",
  "Real-time synchronization across multiple locations",
  "24/7 customer support",
  "Free regular updates and new features",
  "No long-term contracts required"
]

export default function SlashPOSPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 mb-6">
                <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Web-Based POS System
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Slash POS
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                The modern point of sale system for forward-thinking businesses.
                Manage sales, inventory, and customers all in one powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  <Link href="#contact" className="flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-2xl opacity-20" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://placehold.co/800x600/3b82f6/ffffff?text=Slash+POS+Dashboard"
                    alt="Slash POS Dashboard"
                    width={800}
                    height={600}
                    className="w-full h-auto"
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
          title="Everything You Need to Run Your Business"
          description="Powerful features designed to streamline your operations and boost productivity."
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
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4">
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

      {/* Screenshots Section */}
      <Section className="bg-gray-50 dark:bg-gray-950">
        <SectionHeader
          subtitle="Screenshots"
          title="Beautiful Interface, Powerful Features"
          description="Take a look at the sleek and intuitive design of Slash POS."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Dashboard Overview", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Dashboard" },
            { title: "Sales Analytics", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Analytics" },
            { title: "Inventory Management", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Inventory" },
            { title: "Customer Portal", image: "https://placehold.co/600x400/06b6d4/ffffff?text=Customers" },
          ].map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={screenshot.image}
                  alt={screenshot.title}
                  width={600}
                  height={400}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{screenshot.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-white dark:bg-gray-900">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Why Choose Slash POS?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of businesses that have transformed their operations with Slash POS.
              Experience the difference of a truly modern POS system.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="https://placehold.co/600x600/3b82f6/ffffff?text=Benefits"
              alt="Benefits"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </Section>

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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your free 30-day trial today. No credit card required.
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

      <Footer />
    </main>
  )
}
