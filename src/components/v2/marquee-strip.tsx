"use client"

import { Marquee } from '@/components/v2/effects/marquee'

interface MarqueeStripV2Props {
  services: Array<{ title: string }>
}

const FALLBACK = [
  'Web Development',
  'Mobile Apps',
  'Custom Software',
  'UI/UX Design',
  'DevOps & Cloud',
  'E-Commerce',
]

export function MarqueeStripV2({ services }: MarqueeStripV2Props) {
  const items = services.length > 0 ? services.map(s => s.title) : FALLBACK

  return (
    <section
      style={{
        position: 'relative',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: '#0a0a0a',
        padding: '28px 0',
        overflow: 'hidden',
      }}
    >
      {/* Marquee already duplicates children internally — pass items once */}
      <Marquee speed={70}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 28,
              padding: '0 28px',
              fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
              fontSize: 'clamp(40px, 6vw, 100px)',
              lineHeight: 1,
              textTransform: 'uppercase' as const,
              letterSpacing: '-0.01em',
              color: i % 2 === 0 ? 'var(--ink)' : 'transparent',
              WebkitTextStroke: i % 2 !== 0 ? '1px var(--accent)' : '0',
            }}
          >
            {item}
            <span
              style={{
                color: 'var(--accent)',
                transform: 'skewX(-12deg)',
                display: 'inline-block',
              }}
            >
              /
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
