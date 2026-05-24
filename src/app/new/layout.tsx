import type { Metadata } from 'next'
import { Anton, Bebas_Neue, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--v2-display',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--v2-display-alt',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--v2-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--v2-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--v2-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Slash Tech Solution — New Experience',
  description:
    'We build software that refuses to be forgettable. Custom web apps, mobile solutions and innovative products from Cape Town.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`v2 ${anton.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--ink)' }}
    >
      {children}
    </div>
  )
}
