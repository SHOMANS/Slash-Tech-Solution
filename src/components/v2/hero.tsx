"use client"

import { SlashField } from '@/components/v2/effects/slash-field'
import { Ticker } from '@/components/v2/effects/ticker'

const STATS = [
  { end: 150, suffix: '+',  label: 'Projects delivered'  },
  { end: 80,  suffix: '+',  label: 'Happy clients'        },
  { end: 5,   suffix: '+',  label: 'Years building'       },
  { end: 24,  suffix: '/7', label: 'Async-first studio'   },
] as const

export function HeroV2() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingTop: 120,
        paddingBottom: 60,
      }}
    >
      {/* ── Background layer ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SlashField />
        {/* Thin diagonal accent line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '30%',
            left: '-10%',
            right: '-10%',
            height: 2,
            background: 'var(--accent)',
            transform: 'rotate(-8deg)',
            opacity: 0.25,
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(20px, 4vw, 64px)',
        }}
      >
        {/* 1. Meta row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--v2-mono), ui-monospace, monospace',
              fontSize: 11,
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: 'var(--ink-dim)' }}>(01) — Studio Index</div>
            <div style={{ color: 'var(--ink)' }}>EST. 2021 · CPT, ZA</div>
          </div>
          <div
            style={{
              fontFamily: 'var(--v2-mono), ui-monospace, monospace',
              fontSize: 11,
              color: 'var(--ink-dim)',
              maxWidth: 280,
              textAlign: 'right',
            }}
          >
            Transforming ideas into digital reality
          </div>
        </div>

        {/* 2. Monumental headline */}
        <h1
          style={{
            fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
            fontSize: 'clamp(64px, 16vw, 260px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: 0,
            color: 'var(--ink)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.06em' }}>
            <span>Tech</span>
            <span
              style={{
                fontFamily: 'var(--v2-serif), "Instrument Serif", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '0.65em',
                color: 'var(--accent)',
              }}
            >
              that
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.04em' }}>
            <span
              style={{
                color: 'var(--accent)',
                display: 'inline-block',
                transform: 'skewX(-12deg)',
              }}
            >
              /
            </span>
            <span>Scales.</span>
          </div>
        </h1>

        {/* 3. Subhead + CTA grid */}
        <div
          className="v2-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 60,
            marginTop: 60,
            alignItems: 'end',
          }}
        >
          {/* Left: subhead */}
          <p
            style={{
              fontFamily: 'var(--v2-serif), "Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 2.2vw, 36px)',
              lineHeight: 1.15,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            We build cutting-edge web &amp; mobile apps, deliver custom tech, and ship
            products like{' '}
            <span
              style={{
                fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                fontStyle: 'normal',
                color: 'var(--accent)',
              }}
            >
              Slash POS
            </span>{' '}
            and{' '}
            <span
              style={{
                fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                fontStyle: 'normal',
                color: 'var(--accent)',
              }}
            >
              Tourer
            </span>{' '}
            — from Cape Town, for the world.
          </p>

          {/* Right: CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              alignItems: 'flex-end',
            }}
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '18px 28px',
                background: '#c6ff3d',
                color: '#000',
                borderRadius: 999,
                textDecoration: 'none',
                fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              Start a project
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#000',
                  color: '#c6ff3d',
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                ↗
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#products"
              style={{
                fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                fontSize: 11,
                color: 'var(--ink-dim)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--line)',
                paddingBottom: 2,
              }}
            >
              or — see our products ↓
            </a>
          </div>
        </div>

        {/* 4. Stats row */}
        <div
          className="v2-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40,
            marginTop: 80,
            paddingTop: 30,
            borderTop: '1px solid var(--line)',
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                  fontSize: 'clamp(40px, 5vw, 80px)',
                  lineHeight: 0.9,
                  color: 'var(--ink)',
                }}
              >
                <Ticker end={stat.end} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                  fontSize: 11,
                  color: 'var(--ink-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
