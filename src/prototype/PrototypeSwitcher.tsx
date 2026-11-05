// PROTOTYPE: floating bar to flip between style variants. Hidden in production builds.
import { useEffect } from 'react'

type Props = {
  variants: { key: string; name: string }[]
  current: string
  onChange: (key: string) => void
}

export function PrototypeSwitcher({ variants, current, onChange }: Props) {
  const index = Math.max(0, variants.findIndex((v) => v.key === current))
  const go = (step: number) => onChange(variants[(index + step + variants.length) % variants.length].key)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!import.meta.env.DEV) return null

  const v = variants[index]
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 14px',
        borderRadius: 999,
        background: '#111',
        color: '#fff',
        font: '14px system-ui, sans-serif',
        boxShadow: '0 4px 16px rgba(0,0,0,.35)',
        whiteSpace: 'nowrap',
      }}
    >
      <button onClick={() => go(-1)} aria-label="上一個版本" style={btn}>←</button>
      <span>
        PROTOTYPE · {v.key}（{v.name}）
      </span>
      <button onClick={() => go(1)} aria-label="下一個版本" style={btn}>→</button>
    </div>
  )
}

const btn = {
  background: '#333',
  color: '#fff',
  border: 0,
  borderRadius: 999,
  width: 28,
  height: 28,
  cursor: 'pointer',
}
