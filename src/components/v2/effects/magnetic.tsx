"use client"

import { useRef } from 'react'

export interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
  style?: React.CSSProperties
}

export function Magnetic({ children, strength = 0.3, className, style }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transition = 'transform 0.1s ease'
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
