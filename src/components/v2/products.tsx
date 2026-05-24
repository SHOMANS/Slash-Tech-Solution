// Server component — no "use client"

import Image from 'next/image'
import type { Product } from '@prisma/client'

interface ProductsV2Props {
  products: Product[]
}

function BrowserMockup({ product }: { product: Product }) {
  const imageSrc = product.heroImage || product.image

  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--line)',
        background: '#0a0a0a',
        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
        transform: 'perspective(1400px) rotateY(-5deg) rotateX(2deg)',
      }}
    >
      {/* Browser chrome bar */}
      <div
        style={{
          height: 40,
          background: '#101010',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 16,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#3a3a38',
              }}
            />
          ))}
        </div>

        {/* Address bar */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--v2-mono), ui-monospace, monospace',
              fontSize: 11,
              color: 'var(--ink-dim)',
            }}
          >
            slashsolution.com/{product.slug || 'app'}
          </span>
          <span
            style={{
              fontFamily: 'var(--v2-mono), ui-monospace, monospace',
              fontSize: 11,
              color: 'var(--accent)',
            }}
          >
            ● LIVE
          </span>
        </div>
      </div>

      {/* Image area */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.title}
            width={600}
            height={400}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1a2b28 0%, #0a1612 60%, #050a08 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                fontSize: 48,
                color: 'var(--line)',
                textTransform: 'uppercase',
              }}
            >
              {product.title}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function PhoneMockup({ product }: { product: Product }) {
  const imageSrc = product.heroImage || product.image

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 280,
          borderRadius: 44,
          background: '#0a0a0a',
          border: '2px solid #1a1a18',
          padding: 10,
          boxShadow: '0 50px 120px -20px rgba(0,0,0,0.7)',
          transform: 'perspective(1400px) rotateY(5deg) rotateX(2deg)',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 24,
            borderRadius: 99,
            background: '#000',
            zIndex: 2,
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: '100%',
            borderRadius: 36,
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #1a2b28 0%, #0a1612 60%, #050a08 100%)',
            aspectRatio: '9/19',
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.title}
              width={280}
              height={480}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, #1a2b28 0%, #0a1612 60%, #050a08 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                  fontSize: 28,
                  color: 'var(--ink-dim)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {product.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ProductsV2({ products }: ProductsV2Props) {
  if (products.length === 0) return null

  return (
    <section
      id="products"
      style={{
        position: 'relative',
        paddingTop: 120,
        paddingBottom: 80,
        borderTop: '1px solid var(--line)',
      }}
    >
      {/* Header */}
      <div
        className="frame"
        style={{
          padding: '0 clamp(20px, 4vw, 64px)',
          marginBottom: 80,
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
            marginBottom: 24,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>04 /</span> Products — Things we made
        </div>

        {/* H2 */}
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
            fontSize: 'clamp(56px, 9vw, 180px)',
            lineHeight: 0.85,
            textTransform: 'uppercase',
            color: 'var(--ink)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--v2-serif), "Instrument Serif", Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            Our
          </span>{' '}
          own software,{' '}
          <span style={{ color: 'var(--accent)' }}>shipped.</span>
        </h2>
      </div>

      {/* Product rows */}
      {products.map((product, index) => {
        const isMobile = product.productType === 'mobile'
        // Even index (0, 2, 4…) → mockup LEFT, text RIGHT
        // Odd index (1, 3, 5…) with mobile → text LEFT, mockup RIGHT
        const isReversed = index % 2 === 1
        const displayIndex = String(index + 1).padStart(2, '0')
        const firstFourFeatures = product.features.slice(0, 4)

        const mockupElement = isMobile ? (
          <PhoneMockup product={product} />
        ) : (
          <BrowserMockup product={product} />
        )

        const textElement = (
          <div>
            {/* Badge */}
            <div
              style={{
                fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                fontSize: 11,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '.1em',
              }}
            >
              Product /0{index + 1} —{' '}
              {product.productType === 'web' ? 'Web App' : 'Mobile App'}
            </div>

            {/* Title */}
            <div
              style={{
                fontFamily: 'var(--v2-display), "Anton", system-ui, sans-serif',
                fontSize: 'clamp(56px, 8vw, 120px)',
                lineHeight: 0.85,
                textTransform: 'uppercase',
                color: 'var(--ink)',
                marginTop: 20,
              }}
            >
              {product.title}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: 'var(--ink-dim)',
                maxWidth: 460,
                marginTop: 20,
                marginBottom: 0,
              }}
            >
              {product.description}
            </p>

            {/* Features grid */}
            {firstFourFeatures.length > 0 && (
              <div
                style={{
                  marginTop: 32,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  border: '1px solid var(--line)',
                }}
              >
                {firstFourFeatures.map((feature, fi) => {
                  const isEven = fi % 2 === 0
                  const isTopRow = fi < 2

                  return (
                    <div
                      key={fi}
                      style={{
                        padding: 18,
                        borderRight: isEven ? '1px solid var(--line)' : undefined,
                        borderBottom: isTopRow ? '1px solid var(--line)' : undefined,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                          fontSize: 10,
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '.08em',
                        }}
                      >
                        {feature}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* CTA */}
            <div style={{ marginTop: 36 }}>
              <a
                href={product.slug ? `/product/${product.slug}` : '#contact'}
                data-cursor={product.slug ? 'DEMO' : 'CONTACT'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  borderRadius: 999,
                  padding: '14px 22px',
                  fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '.1em',
                  textDecoration: 'none',
                }}
              >
                {product.slug ? 'Learn more ↗' : 'Request info ↗'}
              </a>
            </div>
          </div>
        )

        return (
          <div
            key={product.id}
            style={{
              padding: '60px clamp(20px, 4vw, 64px)',
              borderTop: '1px solid var(--line)',
            }}
          >
            <div
              className="v2-product-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 60,
                alignItems: 'center',
              }}
            >
              {isReversed ? (
                <>
                  {textElement}
                  {mockupElement}
                </>
              ) : (
                <>
                  {mockupElement}
                  {textElement}
                </>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}
