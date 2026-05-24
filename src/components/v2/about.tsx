// Server component — no "use client"

const FEATURES = [
  {
    n: '01',
    t: 'Our Mission',
    d: 'Empower businesses with technology that drives growth and efficiency.',
  },
  {
    n: '02',
    t: 'Expert Team',
    d: 'Developers, designers and strategists who actually ship.',
  },
  {
    n: '03',
    t: 'Quality First',
    d: 'Highest standards in code, security and user experience.',
  },
  {
    n: '04',
    t: 'Scalable',
    d: 'Systems that grow with your business and bend to change.',
  },
]

export function AboutV2() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '140px clamp(20px, 4vw, 64px) 120px',
      }}
    >
      {/* Two-column grid */}
      <div
        className="v2-about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 80,
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div>
          {/* Section label */}
          <div
            style={{
              fontFamily: 'var(--v2-mono), monospace',
              fontSize: 11,
              letterSpacing: '.1em',
              color: 'var(--ink-dim)',
              marginBottom: 32,
              textTransform: 'uppercase' as const,
            }}
          >
            <span style={{ color: 'var(--accent)' }}>02 /</span> About — Who we are
          </div>

          {/* Headline */}
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
              fontSize: 'clamp(48px, 7vw, 120px)',
              lineHeight: 0.9,
              textTransform: 'uppercase' as const,
              color: 'var(--ink)',
            }}
          >
            We make{' '}
            <em
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontStyle: 'italic',
                textTransform: 'none' as const,
              }}
            >
              software
            </em>{' '}
            that{' '}
            <span style={{ color: 'var(--accent)' }}>refuses</span> to be
            forgettable.
          </h2>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ paddingTop: 60 }}>
          {/* Para 1 */}
          <p
            style={{
              margin: 0,
              fontSize: 20,
              lineHeight: 1.4,
              color: 'var(--ink)',
              maxWidth: 600,
            }}
          >
            Slash Tech Solution is a forward-thinking studio specializing in
            custom software, web applications and mobile solutions. We combine
            creative direction with deep engineering to deliver products that
            make a real impact.
          </p>

          {/* Para 2 */}
          <p
            style={{
              marginTop: 22,
              marginBottom: 0,
              fontSize: 18,
              lineHeight: 1.5,
              color: 'var(--ink-dim)',
              maxWidth: 600,
            }}
          >
            From{' '}
            <span style={{ color: 'var(--accent)' }}>Slash POS</span> — a
            complete web-based point of sale — to{' '}
            <span style={{ color: 'var(--accent)' }}>Tourer</span>, our tourism
            app for South Africa, we build to solve real-world problems.
          </p>

          {/* 2×2 Feature cards */}
          <div
            className="v2-cards-grid"
            style={{
              marginTop: 60,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              border: '1px solid var(--line)',
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={f.n}
                className="v2-about-card"
                style={{
                  padding: 28,
                  borderRight: i % 2 === 0 ? '1px solid var(--line)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--line)' : 'none',
                }}
              >
                <div className="v2-about-card-content">
                  <div
                    style={{
                      fontFamily: 'var(--v2-mono), monospace',
                      fontSize: 11,
                      color: 'var(--ink-dim)',
                      letterSpacing: '.1em',
                    }}
                  >
                    /{f.n}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                      fontSize: 30,
                      lineHeight: 1,
                      marginTop: 16,
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {f.t}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: 'var(--ink-dim)',
                    }}
                  >
                    {f.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
