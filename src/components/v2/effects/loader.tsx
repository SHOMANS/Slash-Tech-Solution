"use client"

import { useEffect, useState } from 'react'

export function Loader() {
  const [visible, setVisible] = useState(true)
  const [dots, setDots] = useState('...')

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 300)
    const timer = setTimeout(() => setVisible(false), 1200)
    return () => {
      clearTimeout(timer)
      clearInterval(dotsInterval)
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#070707',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '24px',
      fontFamily: 'var(--v2-mono), ui-monospace, monospace',
      fontSize: 11, color: '#8d8d83',
      letterSpacing: '0.08em', textTransform: 'uppercase' as const,
      transition: 'opacity 0.6s ease',
    }}>
      {/* Big "/" in center */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid', placeItems: 'center',
        fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
        fontSize: 'clamp(120px, 28vw, 420px)',
        lineHeight: 1,
        color: '#c6ff3d',
      }}>
        <span style={{ display: 'inline-block', transform: 'skewX(-12deg)' }}>/</span>
      </div>
      {/* Bottom left */}
      <span style={{ position: 'relative', zIndex: 1 }}>SLASH / SOLUTION — V.2026</span>
      {/* Bottom right */}
      <span style={{ position: 'relative', zIndex: 1 }}>LOADING{dots}</span>
    </div>
  )
}
