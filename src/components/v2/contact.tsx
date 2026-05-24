"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitContact } from '@/lib/actions'

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:   z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

type FormData = z.infer<typeof schema>

const CONTACT_INFO = [
  { label: 'Email',    value: 'info@slashsolution.com', href: 'mailto:info@slashsolution.com' },
  { label: 'Phone',    value: '+27 60 153 4356',        href: 'tel:+27601534356'              },
  { label: 'Location', value: 'Cape Town, South Africa', href: '#'                            },
] as const

const TEXT_FIELDS = [
  { key: 'name'    as const, label: 'your_name',  placeholder: 'John Doe',          type: 'text'  },
  { key: 'email'   as const, label: 'your_email', placeholder: 'john@example.com',  type: 'email' },
  { key: 'subject' as const, label: 'subject',    placeholder: 'How can we help?',  type: 'text'  },
]

export function ContactV2() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const result = await submitContact(data)
      if (result.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  /* ── Status indicator ── */
  const statusLabel =
    status === 'submitting' ? (
      <span style={{ color: 'var(--ink-dim)' }}>● RUNNING</span>
    ) : status === 'success' ? (
      <span style={{ color: '#4ade80' }}>● SENT ✓</span>
    ) : (
      <span style={{ color: 'var(--accent)' }}>● READY</span>
    )

  /* ── Submit button label ── */
  const submitLabel =
    status === 'submitting'
      ? '$ RUNNING...'
      : status === 'success'
      ? '// [OK] Message sent. Response within 24h.'
      : status === 'error'
      ? '// [ERR] Failed. Please try again.'
      : '$ EXECUTE ./send.sh'

  const submitColor =
    status === 'success'
      ? '#4ade80'
      : status === 'error'
      ? 'var(--accent-2)'
      : 'var(--accent)'

  /* ── Shared input style ── */
  const inputStyle: React.CSSProperties = {
    display:     'block',
    width:       '100%',
    marginTop:   8,
    background:  'transparent',
    border:      0,
    borderBottom: '1px dashed var(--line)',
    color:       'var(--ink)',
    fontFamily:  'var(--v2-mono), ui-monospace, monospace',
    fontSize:    14,
    outline:     'none',
    padding:     '10px 0',
    boxSizing:   'border-box',
  }

  return (
    <section
      id="contact"
      style={{
        position:      'relative',
        paddingTop:    140,
        paddingBottom: 140,
        borderTop:     '1px solid var(--line)',
        background:    '#050505',
      }}
    >
      <div style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>

        {/* ── Section label ── */}
        <div
          style={{
            fontFamily:    'var(--v2-mono), ui-monospace, monospace',
            fontSize:      11,
            letterSpacing: '.1em',
            color:         'var(--ink-dim)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>07 /</span> Contact — Let&apos;s go
        </div>

        {/* ── Two-column grid ── */}
        <div
          className="v2-contact-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap:                 80,
            marginTop:           24,
          }}
        >
          {/* ══ LEFT COLUMN ══ */}
          <div>
            {/* Headline */}
            <h2
              style={{
                margin:        0,
                fontFamily:    'var(--v2-display), "Anton", system-ui, sans-serif',
                fontSize:      'clamp(56px, 9vw, 200px)',
                lineHeight:    0.85,
                textTransform: 'uppercase',
                color:         'var(--ink)',
              }}
            >
              Let&apos;s build{' '}
              <br />
              something{' '}
              <br />
              <span style={{ color: 'var(--accent)' }}>amazing</span>{' '}
              <br />
              <em
                style={{
                  fontFamily:    'var(--v2-serif), "Instrument Serif", Georgia, serif',
                  fontStyle:     'italic',
                  textTransform: 'none',
                }}
              >
                together.
              </em>
            </h2>

            {/* ── Contact info rows ── */}
            <div
              style={{
                marginTop:     40,
                display:       'flex',
                flexDirection: 'column',
                gap:           0,
              }}
            >
              {CONTACT_INFO.map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display:             'grid',
                    gridTemplateColumns: '100px 1fr 32px',
                    padding:             '20px 0',
                    borderTop:           '1px solid var(--line)',
                    borderBottom:        i === CONTACT_INFO.length - 1 ? '1px solid var(--line)' : 'none',
                    alignItems:          'center',
                  }}
                >
                  {/* Row label */}
                  <span
                    style={{
                      fontFamily:    'var(--v2-mono), ui-monospace, monospace',
                      fontSize:      11,
                      color:         'var(--ink-dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '.08em',
                    }}
                  >
                    {row.label}
                  </span>

                  {/* Row value */}
                  <a
                    href={row.href}
                    style={{
                      fontFamily:     'var(--v2-display), "Anton", system-ui, sans-serif',
                      fontSize:       'clamp(16px, 2vw, 28px)',
                      textTransform:  'uppercase',
                      color:          'var(--ink)',
                      textDecoration: 'none',
                    }}
                  >
                    {row.value}
                  </a>

                  {/* Arrow */}
                  <span
                    style={{
                      color:     'var(--accent)',
                      textAlign: 'right',
                      fontSize:  16,
                    }}
                  >
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT COLUMN — Terminal Form ══ */}
          <div
            style={{
              border:     '1px solid var(--line)',
              padding:    28,
              background: '#080808',
              fontFamily: 'var(--v2-mono), ui-monospace, monospace',
            }}
          >
            {/* Terminal header bar */}
            <div
              style={{
                display:       'flex',
                justifyContent:'space-between',
                marginBottom:  20,
                fontSize:      10,
                color:         'var(--ink-dim)',
                textTransform: 'uppercase',
                letterSpacing: '.15em',
              }}
            >
              <span>$ ./start-project.sh</span>
              {statusLabel}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* Text fields: name, email, subject */}
              {TEXT_FIELDS.map((field) => (
                <div key={field.key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', cursor: 'text' }}>
                    <div style={{ fontSize: 12 }}>
                      <span style={{ color: 'var(--accent)' }}>{'>'}</span>{' '}
                      <span style={{ color: 'var(--ink-dim)' }}>{field.label} =</span>
                    </div>
                    <input
                      {...register(field.key)}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--line)'   }}
                    />
                  </label>
                  {errors[field.key] && (
                    <div
                      style={{
                        fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                        fontSize:   10,
                        color:      'var(--accent-2)',
                        marginTop:  4,
                      }}
                    >
                      // {errors[field.key]?.message}
                    </div>
                  )}
                </div>
              ))}

              {/* Message textarea */}
              <div style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', cursor: 'text' }}>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ color: 'var(--accent)' }}>{'>'}</span>{' '}
                    <span style={{ color: 'var(--ink-dim)' }}>message =</span>
                  </div>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell us about your project..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--line)'   }}
                  />
                </label>
                {errors.message && (
                  <div
                    style={{
                      fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                      fontSize:   10,
                      color:      'var(--accent-2)',
                      marginTop:  4,
                    }}
                  >
                    // {errors.message.message}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                style={{
                  marginTop:  24,
                  display:    'block',
                  width:      '100%',
                  background: 'transparent',
                  border:     0,
                  borderTop:  '1px solid var(--line)',
                  padding:    '18px 0 0',
                  textAlign:  'left',
                  fontFamily: 'var(--v2-mono), ui-monospace, monospace',
                  fontSize:   13,
                  color:      submitColor,
                  cursor:     status === 'submitting' || status === 'success' ? 'default' : 'pointer',
                  letterSpacing: '.05em',
                }}
              >
                {submitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
