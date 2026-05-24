"use client"

import { useEffect, useRef, useState, useCallback, ElementType } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%^&*<>/\\'

export interface ScrambleTextProps {
  text: string
  trigger?: 'view' | 'hover'
  duration?: number
  className?: string
  style?: React.CSSProperties
  as?: ElementType
}

export function ScrambleText({
  text,
  trigger = 'view',
  duration = 900,
  className,
  style,
  as: Tag = 'span',
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLElement>(null)
  const played = useRef(false)
  const rafRef = useRef(0)

  const play = useCallback(() => {
    if (played.current) return
    played.current = true
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const resolved = Math.floor(t * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue }
        if (i < resolved) { out += text[i] }
        else { out += CHARS[Math.floor(Math.random() * CHARS.length)] }
      }
      setDisplay(out)
      if (t < 1) rafRef.current = requestAnimationFrame(step)
      else setDisplay(text)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [text, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (trigger === 'view') {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { play(); obs.disconnect() }
      }, { threshold: 0.1 })
      obs.observe(el)
      return () => obs.disconnect()
    }
    if (trigger === 'hover') {
      el.addEventListener('pointerenter', play)
      return () => el.removeEventListener('pointerenter', play)
    }
  }, [trigger, play])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const Component = Tag as 'span'
  return <Component ref={ref as any} className={className} style={style}>{display}</Component>
}
