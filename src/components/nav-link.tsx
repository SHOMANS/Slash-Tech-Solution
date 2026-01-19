'use client'

import Link from 'next/link'
import NProgress from 'nprogress'
import { ComponentProps, MouseEvent, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function NavLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname()

  useEffect(() => {
    // Complete progress when route changes
    NProgress.done()
  }, [pathname])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget.getAttribute('href')

    // Only show progress for internal navigation that changes the route
    if (target && target.startsWith('/') && !target.startsWith('/#')) {
      NProgress.start()
    }

    onClick?.(e)
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
