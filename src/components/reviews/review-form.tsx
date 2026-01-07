"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import { submitTestimonial } from "@/lib/actions"
import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

const reviewSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100),
  role: z.string().min(2, "Role must be at least 2 characters").max(100),
  rating: z.number().min(1, "Please select a rating").max(5),
  quote: z.string().min(20, "Review must be at least 20 characters").max(1000),
})

type ReviewFormData = z.infer<typeof reviewSchema>

export function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  })

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setSubmitError(null)
      const result = await submitTestimonial(data)

      if (result.success) {
        setSubmitSuccess(true)
        reset()
        setRating(0)
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        setSubmitError(result.error || "Failed to submit review")
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred. Please try again.")
    }
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
    setValue("rating", value, { shouldValidate: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg" noValidate>
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Your Rating *
          </label>
          <StarRating value={rating} onChange={handleRatingChange} size="lg" />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Name and Email */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name *
            </label>
            <Input
              id="author"
              type="text"
              placeholder="John Doe"
              {...register("author")}
              className={errors.author ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              {...register("email")}
              className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Company and Role */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company *
            </label>
            <Input
              id="company"
              type="text"
              placeholder="Your Company Ltd"
              {...register("company")}
              className={errors.company ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Role *
            </label>
            <Input
              id="role"
              type="text"
              placeholder="CEO, CTO, etc."
              {...register("role")}
              className={errors.role ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.role.message}
              </p>
            )}
          </div>
        </div>

        {/* Review */}
        <div>
          <label htmlFor="quote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Review *
          </label>
          <Textarea
            id="quote"
            placeholder="Tell us about your experience working with us..."
            {...register("quote")}
            className={errors.quote ? "border-red-500 focus:ring-red-500" : ""}
            rows={6}
          />
          {errors.quote && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.quote.message}
            </p>
          )}
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200"
          >
            <CheckCircle2 className="h-5 w-5" />
            <p>Thank you! Your review has been submitted and is pending approval.</p>
          </motion.div>
        )}

        {/* Error Message */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200"
          >
            <p>{submitError}</p>
          </motion.div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Your review will be published after approval by our team
        </p>
      </form>
    </motion.div>
  )
}
