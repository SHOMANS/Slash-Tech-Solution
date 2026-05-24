// Server component — no "use client"

import type { Testimonial, Client } from '@prisma/client'

interface ClientsV2Props {
  testimonials: Testimonial[]
  clients: Client[]
}

export function ClientsV2({ testimonials, clients }: ClientsV2Props) {
  const firstTestimonial = testimonials[0]
  const remainingTestimonials = testimonials.slice(1)

  return (
    <section
      id="clients"
      style={{
        padding: '80px clamp(20px, 4vw, 64px) 120px',
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: 'var(--v2-mono), ui-monospace, monospace',
          fontSize: 11,
          color: 'var(--ink-dim)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>06 /</span> Trust — Clients &amp; words
      </div>

      {testimonials.length > 0 ? (
        <>
          {/* Big quote area */}
          <div
            style={{
              marginTop: 30,
              padding: '60px 0',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 40,
              alignItems: 'start',
            }}
          >
            {/* Giant quote mark */}
            <div
              aria-hidden="true"
              style={{
                fontFamily: 'var(--v2-serif), "Instrument Serif", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 160,
                lineHeight: 0.7,
                color: 'var(--accent)',
                userSelect: 'none',
              }}
            >
              &ldquo;
            </div>

            {/* First testimonial */}
            <div>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--v2-serif), "Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(24px, 3vw, 48px)',
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                  maxWidth: '22ch',
                }}
              >
                {firstTestimonial.quote}
              </p>

              <div
                style={{
                  marginTop: 24,
                  fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                  fontSize: 11,
                  color: 'var(--ink-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                &mdash; {firstTestimonial.author}, {firstTestimonial.role} at {firstTestimonial.company}
              </div>
            </div>
          </div>

          {/* Remaining testimonial cards */}
          {remainingTestimonials.length > 0 && (
            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 24,
              }}
            >
              {remainingTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  style={{
                    border: '1px solid var(--line)',
                    padding: 28,
                    background: '#050505',
                  }}
                >
                  {/* Stars */}
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--accent)',
                      marginBottom: 16,
                    }}
                  >
                    {'★'.repeat(testimonial.rating)}
                  </div>

                  {/* Quote */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.5,
                      fontStyle: 'italic',
                      color: 'var(--ink-dim)',
                    }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div
                    style={{
                      marginTop: 16,
                      fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                      fontSize: 11,
                      color: 'var(--ink-dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    &mdash; {testimonial.author}, {testimonial.role}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* No testimonials placeholder */
        <div
          style={{
            marginTop: 30,
            padding: '60px 0',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* Giant quote mark */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: 'var(--v2-serif), "Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 160,
              lineHeight: 0.7,
              color: 'var(--accent)',
              userSelect: 'none',
            }}
          >
            &ldquo;
          </div>

          <div>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--v2-serif), "Instrument Serif", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(24px, 3vw, 48px)',
                lineHeight: 1.1,
                color: 'var(--ink)',
              }}
            >
              More client words coming soon — once we get permission to publish them.
            </p>

            <div
              style={{
                marginTop: 24,
                fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                fontSize: 11,
                color: 'var(--ink-dim)',
              }}
            >
              Drop your review at &mdash;{' '}
              <a href="/reviews" style={{ color: 'var(--accent)' }}>
                slashsolution.com/reviews
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Client logos */}
      {clients.length > 0 && (
        <div style={{ marginTop: 60 }}>
          <div
            style={{
              fontFamily: 'var(--v2-mono), ui-monospace, monospace',
              fontSize: 11,
              color: 'var(--ink-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Trusted by
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 32,
              marginTop: 20,
              alignItems: 'center',
            }}
          >
            {clients.map((client) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={client.id}
                src={client.logo}
                alt={client.name}
                width={100}
                height={40}
                style={{
                  objectFit: 'contain',
                  opacity: 0.6,
                  filter: 'grayscale(100%)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
