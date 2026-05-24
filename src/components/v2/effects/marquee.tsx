"use client"

import { useEffect, useRef } from 'react'

export interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Marquee({ children, speed = 60, reverse = false, className, style }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let x = 0
    let last = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      if (!pausedRef.current) {
        const dt = (now - last) / 1000
        const dir = reverse ? 1 : -1
        x += speed * dt * dir
        const halfWidth = track.scrollWidth / 2
        if (x <= -halfWidth) x += halfWidth
        if (x >= 0) x -= halfWidth
        track.style.transform = `translate3d(${x}px, 0, 0)`
      }
      last = now
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [speed, reverse])

  return (
    <div
      className={className}
      style={{ overflow: 'hidden', width: '100%', ...style }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div
        ref={trackRef}
        style={{ display: 'inline-flex', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        <div style={{ display: 'inline-flex' }}>{children}</div>
        <div aria-hidden style={{ display: 'inline-flex' }}>{children}</div>
      </div>
    </div>
  )
}
