"use client"

import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) return

    const dot  = dotRef.current
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
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(loop)
    }

    // Expand dot and show label on data-cursor elements (matches original design)
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]')
      if (target) {
        const label = target.dataset.cursor ?? ''
        dot.classList.add('v2-cursor-lg')
        dot.textContent = label !== 'lg' ? label : ''
      }
    }
    const onOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]')
      if (target) {
        dot.classList.remove('v2-cursor-lg')
        dot.textContent = ''
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot — instant follow, expands with text on data-cursor hover */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 10000,
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--accent)',
          mixBlendMode: 'difference' as const,
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--v2-mono), ui-monospace, monospace',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '.06em',
          textTransform: 'uppercase' as const,
          color: '#000',
        }}
      />

      {/* Ring — lerp follow, always 36px */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
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
