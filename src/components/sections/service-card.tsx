"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  order: number
  active: boolean
}

interface ServiceCardProps {
  service: Service
  index: number
}

const colors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-cyan-500",
]

export function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = (Icons as any)[service.icon] as LucideIcon || Icons.Code
  const color = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-900 h-full">
        <CardHeader>
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed">
            {service.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
