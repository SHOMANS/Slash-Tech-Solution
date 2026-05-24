import Link from 'next/link'

interface VersionToggleProps {
  href: string
  label: string
  variant?: 'v1' | 'v2'
}

export function VersionToggle({ href, label, variant = 'v1' }: VersionToggleProps) {
  if (variant === 'v2') {
    return (
      <Link
        href={href}
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
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Link>
    )
  }

  return (
    <Link
      href={href}
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
        textDecoration: 'none',
        boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Link>
  )
}
