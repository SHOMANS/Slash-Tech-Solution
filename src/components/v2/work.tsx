// Server component — no "use client"

import type { Portfolio } from '@prisma/client'

interface WorkV2Props {
  portfolio: Portfolio[]
}

const REDACTED_ROWS = [
  ['/01 [REDACTED] Hospitality Group', 'Web App', '2025', 'NDA'],
  ['/02 [REDACTED] Logistics SaaS', 'Mobile', '2025', 'NDA'],
  ['/03 [REDACTED] Tourism Platform', 'Web App', '2024', 'NDA'],
  ['/04 [REDACTED] D2C Brand', 'E-commerce', '2024', 'NDA'],
  ['/05 [REDACTED] Healthcare Startup', 'Dashboard', '2024', 'NDA'],
] as const

export function WorkV2({ portfolio }: WorkV2Props) {
  return (
    <section
      id="work"
      style={{
        padding: '140px clamp(20px, 4vw, 64px) 80px',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 60,
        }}
      >
        {/* Section label */}
        <div
          style={{
            fontFamily: 'var(--v2-mono), ui-monospace, monospace',
            fontSize: 11,
            color: 'var(--ink-dim)',
            letterSpacing: '.1em',
            textTransform: 'uppercase' as const,
            marginBottom: 24,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>05 /</span> Work — Portfolio
        </div>

        {/* Two-column header layout */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap' as const,
            gap: 40,
          }}
        >
          {/* H2 */}
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
              fontSize: 'clamp(56px, 9vw, 180px)',
              lineHeight: 0.85,
              textTransform: 'uppercase' as const,
              color: 'var(--ink)',
            }}
          >
            Case studies
          </h2>

          {/* Subhead */}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--v2-mono), ui-monospace, monospace',
              fontSize: 13,
              color: 'var(--ink-dim)',
              maxWidth: 400,
              textAlign: 'right' as const,
              lineHeight: 1.6,
            }}
          >
            We&apos;re polishing recent client builds. Want a private walkthrough?{' '}
            <a
              href="#contact"
              style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent)', textDecoration: 'none' }}
            >
              Ask us.
            </a>
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          border: '1px solid var(--line)',
          overflow: 'hidden',
          marginTop: 60,
        }}
      >
        {portfolio.length === 0
          ? REDACTED_ROWS.map((row, i) => (
              <div
                key={i}
                className="v2-work-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 80px',
                  padding: '20px 24px',
                  borderBottom: i < REDACTED_ROWS.length - 1 ? '1px solid var(--line)' : undefined,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    color: 'var(--accent)',
                  }}
                >
                  {row[0]}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    color: 'var(--ink-dim)',
                  }}
                >
                  {row[1]}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    color: 'var(--ink-dim)',
                  }}
                >
                  {row[2]}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    color: 'var(--ink-dim)',
                    textAlign: 'right' as const,
                  }}
                >
                  {row[3]}
                </div>
              </div>
            ))
          : portfolio.map((item, i) => (
              <div
                key={item.id}
                className="v2-work-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 80px',
                  padding: '20px 24px',
                  borderBottom: i < portfolio.length - 1 ? '1px solid var(--line)' : undefined,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    color: 'var(--accent)',
                  }}
                >
                  /{String(i + 1).padStart(2, '0')} {item.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    color: 'var(--ink-dim)',
                  }}
                >
                  {item.technologies[0] ?? '—'}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    color: 'var(--ink-dim)',
                  }}
                >
                  {item.createdAt.getFullYear()}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 13,
                    textAlign: 'right' as const,
                  }}
                >
                  {item.liveUrl ? (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="OPEN"
                      style={{
                        color: 'var(--accent)',
                        textDecoration: 'none',
                      }}
                    >
                      VIEW ↗
                    </a>
                  ) : (
                    <span style={{ color: 'var(--ink-dim)' }}>—</span>
                  )}
                </div>
              </div>
            ))}
      </div>
    </section>
  )
}
