"use client"

import { useEffect, useRef, useState } from 'react'

export interface TickerProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function Ticker({
  end,
  suffix = '',
  duration = 2000,
  className,
  style,
}: TickerProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      obs.disconnect()
      const startTime = performance.now()
      const tick = (now: number) => {
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / duration)
        setValue(Math.floor(easeOut(t) * end))
        if (t < 1) requestAnimationFrame(tick)
        else setValue(end)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {value}{suffix}
    </span>
  )
}
