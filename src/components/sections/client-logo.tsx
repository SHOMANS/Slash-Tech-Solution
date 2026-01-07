"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Client {
  id: string
  name: string
  logo: string
  order: number
  active: boolean
}

interface ClientLogoProps {
  client: Client
  index: number
}

export function ClientLogo({ client, index }: ClientLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="flex items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-lg hover:shadow-lg transition-shadow duration-300"
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={200}
        height={80}
        className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
      />
    </motion.div>
  )
}
