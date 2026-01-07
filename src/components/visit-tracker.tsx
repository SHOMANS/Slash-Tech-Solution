'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function VisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't track admin pages, login, or API routes
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/api') || pathname === '/login') {
      return
    }

    // Track the visit
    const trackVisit = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname || '/',
            referrer: document.referrer,
          }),
        })
      } catch (error) {
        // Silently fail - don't disrupt user experience
      }
    }

    trackVisit()
  }, [pathname])

  return null
}
