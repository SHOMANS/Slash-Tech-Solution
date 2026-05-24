// Server component — no "use client"

import type { Product } from '@prisma/client'

interface FooterV2Props {
  products: Product[]
}

export function FooterV2({ products }: FooterV2Props) {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        position: 'relative',
        padding: '60px 0 30px',
        background: '#020202',
      }}
    >
      <div style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
        {/* Top section — 4 columns */}
        <div
          className="v2-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40,
            paddingBottom: 60,
            borderBottom: '1px solid var(--line)',
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                  fontSize: 28,
                  color: 'var(--accent)',
                  display: 'inline-block',
                  transform: 'skewX(-12deg)',
                  lineHeight: 1,
                }}
              >
                /
              </span>
              <span
                style={{
                  fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                  fontWeight: 700,
                  fontSize: 13,
                  color: 'var(--ink)',
                }}
              >
                Slash/Solution
              </span>
            </div>

            <p
              style={{
                marginTop: 16,
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--ink-dim)',
                maxWidth: 320,
              }}
            >
              Building innovative tech solutions and products that transform businesses.
            </p>
          </div>

          {/* Col 2 — Products */}
          <div>
            <div
              style={{
                fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                fontSize: 11,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                marginBottom: 14,
              }}
            >
              Products
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {products.map((product) => (
                <li key={product.id}>
                  <a
                    href={`/product/${product.slug || product.id}`}
                    className="v2-footer-link"
                    style={{ fontSize: 14 }}
                  >
                    {product.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <div
              style={{
                fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                fontSize: 11,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                marginBottom: 14,
              }}
            >
              Company
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Contact', href: '#contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="v2-footer-link" style={{ fontSize: 14 }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <div
              style={{
                fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                fontSize: 11,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                marginBottom: 14,
              }}
            >
              Connect
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'X', href: 'https://x.com/slashsolution' },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/slashsolution' },
                { label: 'Instagram', href: 'https://www.instagram.com/slash.solution/' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="v2-footer-link"
                    style={{ fontSize: 14 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive wordmark */}
        <div
          className="v2-footer-wordmark"
          style={{
            marginTop: 40,
            fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
            fontSize: 'clamp(60px, 18vw, 320px)',
            lineHeight: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '-.02em',
            color: 'var(--line)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <span>Slash</span>
          <span
            style={{
              color: 'var(--accent)',
              display: 'inline-block',
              transform: 'skewX(-12deg)',
            }}
          >
            /
          </span>
          <span>Solution</span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 30,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            fontFamily: 'var(--v2-mono), ui-monospace, monospace',
            fontSize: 11,
            color: 'var(--ink-dim)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          <span>&copy; {year} Slash Tech Solution &mdash; All rights reserved</span>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#" className="v2-footer-link" style={{ fontSize: 11, textTransform: 'uppercase' }}>
              Privacy
            </a>
            <a href="#" className="v2-footer-link" style={{ fontSize: 11, textTransform: 'uppercase' }}>
              Terms
            </a>
            <span>
              Made in Cape Town &middot;{' '}
              <span style={{ color: 'var(--accent)' }}>34&deg;S</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
