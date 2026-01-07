import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ReviewForm } from "@/components/reviews/review-form"
import { TestimonialsList } from "@/components/reviews/testimonials-list"
import { getAllTestimonials } from "@/lib/actions"

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const { testimonials, total, pages, currentPage } = await getAllTestimonials(page, 6)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Client Reviews
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Share your experience working with us or read what others have to say
              </p>
            </div>
          </div>
        </section>

        {/* Review Form */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
                Write a Review
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Your feedback helps us improve our services
              </p>
              <ReviewForm />
            </div>
          </div>
        </section>

        {/* Testimonials List */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              What Our Clients Say
            </h2>
            <Suspense fallback={<div className="text-center">Loading...</div>}>
              <TestimonialsList
                testimonials={testimonials}
                total={total}
                pages={pages}
                currentPage={currentPage}
              />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
