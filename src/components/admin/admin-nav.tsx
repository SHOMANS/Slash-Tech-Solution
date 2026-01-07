'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/contacts', label: 'Contacts' },
  { href: '/admin/analytics', label: 'Analytics' },
]

export function AdminNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="hidden md:flex gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition-colors ${isActive(link.href)
            ? 'text-blue-600 dark:text-blue-400 font-semibold'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
