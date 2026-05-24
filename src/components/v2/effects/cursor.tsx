"use client"

import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isTouch = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) {
      isTouch.current = true
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.opacity = '1'
      ring.style.opacity = '1'
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Don't render on touch-only devices — checked via media query too
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--accent)',
          mixBlendMode: 'difference' as const,
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid var(--ink)',
          mixBlendMode: 'difference' as const,
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform',
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  )
}
