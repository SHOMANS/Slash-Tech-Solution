import React from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export function GlitchText({ text, className, style }: GlitchTextProps) {
  return (
    <span className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'var(--accent-2)',
          animation: 'v2-glitch-1 3s infinite steps(1)',
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      >
        {text}
      </span>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'var(--accent)',
          animation: 'v2-glitch-2 3s infinite steps(1)',
          animationDelay: '-1.5s',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      >
        {text}
      </span>
      {text}
    </span>
  )
}
