// White-noise grain: matches original design (baseFreq 0.9, numOctaves 2, white feColorMatrix, 240px tile)
const GRAIN_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`

export function GrainScanlines() {
  return (
    <>
      {/* Film grain — white noise overlay with vignette */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          opacity: 0.35,
          mixBlendMode: 'overlay' as const,
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: '240px 240px',
          animation: 'v2-grain 0.4s steps(1) infinite',
        }}
      >
        {/* Radial vignette — darkens edges, especially bottom */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(0,0,0,0.6) 100%)',
            mixBlendMode: 'multiply' as const,
          }}
        />
      </div>

      {/* Scanlines — very subtle white lines */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9997,
          pointerEvents: 'none',
          mixBlendMode: 'overlay' as const,
          background:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0) 0, rgba(255,255,255,0) 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 3px)',
        }}
      />
    </>
  )
}
