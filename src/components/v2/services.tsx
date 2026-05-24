// Server component — no "use client"

import type { Service } from '@prisma/client'

interface ServicesV2Props {
  services: Service[]
}

const SERVICE_TAGS: string[][] = [
  ['Next.js', 'React', 'Postgres'],
  ['React Native', 'iOS', 'Android'],
  ['TypeScript', 'APIs', 'Cloud'],
  ['Stripe', 'Shopify', 'PayFast'],
  ['Figma', 'Research', 'Prototyping'],
  ['AWS', 'Vercel', 'CI/CD'],
]

export function ServicesV2({ services }: ServicesV2Props) {
  if (services.length === 0) {
    return (
      <section
        id="services"
        style={{
          padding: '120px clamp(20px, 4vw, 64px)',
          position: 'relative',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--v2-mono), ui-monospace, monospace',
            fontSize: 11,
            color: 'var(--ink-dim)',
          }}
        >
          Services coming soon — check back shortly.
        </p>
      </section>
    )
  }

  return (
    <section
      id="services"
      style={{
        padding: '120px clamp(20px, 4vw, 64px)',
        position: 'relative',
      }}
    >
      {/* Header area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 80,
          flexWrap: 'wrap' as const,
          gap: 40,
        }}
      >
        {/* Left */}
        <div>
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
            <span style={{ color: 'var(--accent)' }}>03 /</span> Services — What we do
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
              fontSize: 'clamp(48px, 7vw, 160px)',
              lineHeight: 0.88,
              textTransform: 'uppercase' as const,
              color: 'var(--ink)',
            }}
          >
            Six ways to /{' '}
            <span style={{ color: 'var(--accent)' }}>obliterate</span> /{' '}
            the problem.
          </h2>
        </div>

        {/* Right */}
        <div
          style={{
            fontFamily: 'var(--v2-mono), ui-monospace, monospace',
            fontSize: 11,
            color: 'var(--ink-dim)',
            maxWidth: 240,
            textAlign: 'right' as const,
          }}
        >
          Hover each card. Pick the engagement that fits — we&apos;ll scope,
          build &amp; ship.
        </div>
      </div>

      {/* 3×2 card grid */}
      <div
        className="v2-services-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid var(--line)',
        }}
      >
        {services.map((service, index) => {
          const col = index % 3
          const row = Math.floor(index / 3)
          const totalRows = Math.ceil(services.length / 3)
          const displayIndex = String(index + 1).padStart(2, '0')
          const tags = SERVICE_TAGS[index % SERVICE_TAGS.length]

          return (
            <div
              key={service.id}
              className="v2-service-card"
              data-cursor="VIEW"
              style={{
                borderRight: col < 2 ? '1px solid var(--line)' : undefined,
                borderBottom: row < totalRows - 1 ? '1px solid var(--line)' : undefined,
              }}
            >
              {/* Huge background number */}
              <div
                className="v2-service-bg-num"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: -10,
                  bottom: -40,
                  fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                  fontSize: 240,
                  lineHeight: 1,
                  color: 'var(--line)',
                  zIndex: 0,
                  userSelect: 'none' as const,
                  pointerEvents: 'none' as const,
                }}
              >
                {displayIndex}
              </div>

              {/* Card content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column' as const,
                  height: '100%',
                  minHeight: 300,
                }}
              >
                {/* Index label */}
                <div
                  style={{
                    fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                    fontSize: 11,
                    color: 'var(--accent)',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '.1em',
                  }}
                >
                  /{displayIndex}
                </div>

                {/* Spacer to push title down */}
                <div style={{ flex: 1 }} />

                {/* Service title */}
                <div
                  style={{
                    fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                    fontSize: 36,
                    lineHeight: 1,
                    textTransform: 'uppercase' as const,
                    color: 'var(--ink)',
                    marginTop: 'auto',
                    marginBottom: 12,
                  }}
                >
                  {service.title}
                </div>

                {/* Service description */}
                <div
                  className="v2-service-desc"
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: 'var(--ink-dim)',
                    maxWidth: 260,
                    opacity: 0.8,
                    transform: 'translateY(4px)',
                    marginBottom: 20,
                  }}
                >
                  {service.description}
                </div>

                {/* Tags */}
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap' as const,
                  }}
                >
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                        fontSize: 10,
                        color: 'var(--ink-dim)',
                        border: '1px solid var(--line)',
                        padding: '3px 8px',
                        borderRadius: 2,
                        letterSpacing: '.05em',
                        textTransform: 'uppercase' as const,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner arrow */}
              <div
                className="v2-service-arrow"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 36,
                  right: 36,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  color: 'var(--ink-dim)',
                }}
              >
                →
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
