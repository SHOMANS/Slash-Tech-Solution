"use client"

import { useEffect, useRef, useCallback } from 'react'

export interface SlashFieldProps {
  className?: string
  style?: React.CSSProperties
}

const CELL = 80
const RADIUS = 300

export function SlashField({ className, style }: SlashFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cellsRef = useRef<HTMLSpanElement[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(0)
  const pendingRef = useRef(false)

  const buildGrid = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const cols = Math.ceil(el.clientWidth / CELL)
    const rows = Math.ceil(el.clientHeight / CELL)
    const total = cols * rows

    el.innerHTML = ''
    cellsRef.current = []

    el.style.display = 'grid'
    el.style.gridTemplateColumns = `repeat(${cols}, ${CELL}px)`
    el.style.gridTemplateRows = `repeat(${rows}, ${CELL}px)`
    el.style.overflow = 'hidden'

    for (let i = 0; i < total; i++) {
      const span = document.createElement('span')
      span.textContent = '/'
      span.style.display = 'flex'
      span.style.alignItems = 'center'
      span.style.justifyContent = 'center'
      span.style.color = 'var(--line)'
      span.style.fontSize = `${CELL * 0.5}px`
      span.style.fontFamily = 'var(--v2-mono), ui-monospace, monospace'
      span.style.willChange = 'transform'
      span.style.transition = 'transform 0.1s ease, color 0.3s ease'
      el.appendChild(span)
      cellsRef.current.push(span)
    }
  }, [])

  const updateCells = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const cols = Math.round(el.clientWidth / CELL)
    const { x: mx, y: my } = mouseRef.current

    cellsRef.current.forEach((span, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const cx = col * CELL + CELL / 2
      const cy = row * CELL + CELL / 2
      const dx = mx - cx
      const dy = my - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < RADIUS) {
        const angle = Math.atan2(dy, dx) - Math.PI / 4
        const intensity = 1 - dist / RADIUS
        const rot = angle * intensity * 0.7
        span.style.transform = `rotate(${rot}rad)`
        span.style.color = `rgba(198, 255, 61, ${intensity * 0.4})`
      } else {
        span.style.transform = 'rotate(0deg)'
        span.style.color = 'var(--line)'
      }
    })
    pendingRef.current = false
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    buildGrid()

    const ro = new ResizeObserver(buildGrid)
    const el = containerRef.current
    if (el) ro.observe(el)

    if (prefersReducedMotion) return () => { ro.disconnect() }

    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (!pendingRef.current) {
        pendingRef.current = true
        rafRef.current = requestAnimationFrame(updateCells)
      }
    }

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
      rafRef.current = requestAnimationFrame(updateCells)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    el?.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el?.removeEventListener('mouseleave', onLeave)
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [buildGrid, updateCells])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, ...style }}
    />
  )
}
