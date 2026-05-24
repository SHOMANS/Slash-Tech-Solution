"use client"

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Work',     href: '#work',     index: '01' },
  { label: 'Services', href: '#services', index: '02' },
  { label: 'Products', href: '#products', index: '03' },
  { label: 'About',    href: '#about',    index: '04' },
  { label: 'Contact',  href: '#contact',  index: '05' },
]

export function NavbarV2() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () => {
      const d = new Date()
      const s = d.toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Johannesburg',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      })
      setTime(s + ' CAT')
    }
    fmt()
    const id = setInterval(fmt, 1000)
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearInterval(id); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '18px clamp(20px, 4vw, 64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      background: scrolled ? 'rgba(7,7,7,0.85)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
      fontFamily: 'var(--v2-mono), ui-monospace, monospace',
      fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
    }}>
      {/* Logo */}
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--ink)' }}>
        <span style={{
          fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
          fontSize: 32, lineHeight: 0.9,
          color: 'var(--accent)',
          display: 'inline-block', transform: 'skewX(-12deg)',
        }}>/</span>
        <span style={{ fontWeight: 700 }}>
          SLASH<span style={{ color: 'var(--ink-dim)' }}>/</span>SOLUTION
        </span>
      </a>

      {/* Desktop nav links */}
      <div
        className="v2-nav-links"
        style={{ display: 'flex', gap: 22, alignItems: 'center' }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{ color: 'var(--ink)', textDecoration: 'none', padding: '4px 0' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
          >
            <span style={{ color: 'var(--ink-dim)', marginRight: 6 }}>{link.index}</span>
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: time + CTA */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {time && (
          <span
            className="v2-nav-time"
            style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}
          >
            {time}
          </span>
        )}
        <a
          href="#contact"
          data-cursor="GO"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            borderRadius: 999,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Start a project ↗
        </a>
      </div>
    </nav>
  )
}
