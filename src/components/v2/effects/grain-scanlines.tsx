const GRAIN_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>`

export function GrainScanlines() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          opacity: 0.12,
          mixBlendMode: 'overlay' as const,
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: '300px 300px',
          animation: 'v2-grain 0.4s steps(1) infinite',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9997,
          pointerEvents: 'none',
          mixBlendMode: 'overlay' as const,
          background:
            'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
        }}
      />
    </>
  )
}
