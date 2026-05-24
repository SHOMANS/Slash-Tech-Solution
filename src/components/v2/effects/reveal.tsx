"use client"

import { useEffect, useRef, useState } from 'react'

export interface RevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
  style?: React.CSSProperties
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
}: RevealProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const initial =
    direction === 'left'
      ? 'translateX(-30px)'
      : direction === 'right'
      ? 'translateX(30px)'
      : 'translateY(30px)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : initial,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
