import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function AdminDashboard() {
  const [servicesCount, portfolioCount, clientsCount, productsCount, testimonialsCount, contactsCount, unreadContacts] = await Promise.all([
    prisma.service.count(),
    prisma.portfolio.count(),
    prisma.client.count(),
    prisma.product.count(),
    prisma.testimonial.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { read: false } }),
  ])

  const stats = [
    { name: 'Services', count: servicesCount, href: '/admin/services', color: 'blue' },
    { name: 'Portfolio Projects', count: portfolioCount, href: '/admin/portfolio', color: 'purple' },
    { name: 'Clients', count: clientsCount, href: '/admin/clients', color: 'green' },
    { name: 'Products', count: productsCount, href: '/admin/products', color: 'indigo' },
    { name: 'Testimonials', count: testimonialsCount, href: '/admin/testimonials', color: 'yellow' },
    { name: 'Contacts', count: contactsCount, href: '/admin/contacts', color: 'red', badge: unreadContacts },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.count}
                </p>
              </div>
              {stat.badge && stat.badge > 0 ? (
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                  {stat.badge} new
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            View Website
          </Link>
          <Link
            href="/admin/services"
            className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
          >
            Manage Services
          </Link>
          <Link
            href="/admin/contacts"
            className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
          >
            View Messages
          </Link>
        </div>
      </div>
    </div>
  )
}
