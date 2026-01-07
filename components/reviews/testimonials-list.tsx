"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { StarRating } from "@/components/ui/star-rating"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  quote: string
  author: string
  email: string
  role: string
  company: string
  rating: number
  avatar: string | null
  approved: boolean
  createdAt: Date
}

interface TestimonialsListProps {
  testimonials: Testimonial[]
  total: number
  pages: number
  currentPage: number
}

export function TestimonialsList({
  testimonials,
  total,
  pages,
  currentPage,
}: TestimonialsListProps) {
  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No reviews yet. Be the first to share your experience!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              {testimonial.avatar && (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role} at {testimonial.company}
                </p>
                <div className="mt-2">
                  <StarRating value={testimonial.rating} onChange={() => { }} readonly size="sm" />
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 italic">
              "{testimonial.quote}"
            </p>

            {!testimonial.approved && (
              <div className="mt-4 inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                Pending Approval
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Link
            href={`/reviews?page=${currentPage - 1}`}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          >
            <Button variant="outline" size="sm" disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          </Link>

          <div className="flex gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <Link key={page} href={`/reviews?page=${page}`}>
                <Button
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  className="min-w-10"
                >
                  {page}
                </Button>
              </Link>
            ))}
          </div>

          <Link
            href={`/reviews?page=${currentPage + 1}`}
            className={currentPage === pages ? "pointer-events-none opacity-50" : ""}
          >
            <Button variant="outline" size="sm" disabled={currentPage === pages}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      )}

      {/* Total Count */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {testimonials.length} of {total} reviews
      </p>
    </div>
  )
}
