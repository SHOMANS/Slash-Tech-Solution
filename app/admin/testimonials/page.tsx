import Link from 'next/link'
import { getTestimonialsAdmin, toggleTestimonialApproved, toggleTestimonialActive, deleteTestimonial } from '@/lib/admin-crud'
import { ToggleSwitch } from '@/components/admin/toggle-switch'
import { DeleteButton } from '@/components/admin/delete-button'

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const { testimonials, total, pages, currentPage } = await getTestimonialsAdmin(page, 10)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Testimonials ({total})
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Approved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate max-w-md">
                    {testimonial.quote}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ToggleSwitch
                    id={testimonial.id}
                    checked={testimonial.approved}
                    action={toggleTestimonialApproved}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ToggleSwitch
                    id={testimonial.id}
                    checked={testimonial.active}
                    action={toggleTestimonialActive}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <DeleteButton id={testimonial.id} action={deleteTestimonial} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/admin/testimonials?page=${currentPage - 1}`}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Page {currentPage} of {pages}
          </span>
          {currentPage < pages && (
            <Link
              href={`/admin/testimonials?page=${currentPage + 1}`}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
