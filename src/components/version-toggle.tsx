'use client'

interface VersionToggleProps {
  label: string
  target: 'v1' | 'v2'
  variant?: 'v1' | 'v2'
}

export function VersionToggle({ label, target, variant = 'v1' }: VersionToggleProps) {
  const handleClick = () => {
    if (target === 'v2') {
      localStorage.setItem('slash-design', 'v2')
      document.documentElement.setAttribute('data-design', 'v2')
    } else {
      localStorage.removeItem('slash-design')
      document.documentElement.removeAttribute('data-design')
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      }
    }
  }

  if (variant === 'v2') {
    return (
      <button
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          background: 'transparent',
          fontFamily: 'var(--v2-mono), ui-monospace, monospace',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.25rem',
        borderRadius: '9999px',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        color: '#ffffff',
        fontSize: '0.8125rem',
        fontWeight: 500,
        border: 'none',
        boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}
