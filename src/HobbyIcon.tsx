import type { Hobby } from './content/types'
import { Star } from './Ornaments'

/** 興趣標籤前面的小圖示，純裝飾。顏色跟著 CSS 的 color 走。 */
export function HobbyIcon({ icon }: { icon: Hobby['icon'] }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (icon === 'code') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...stroke}>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m13.5 5-3 14" />
      </svg>
    )
  }
  if (icon === 'tv') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...stroke}>
        <rect x="2.5" y="7" width="19" height="13" rx="3.5" />
        <path d="m8 2.5 4 4 4-4" />
        <path d="M10 11.5v5l4-2.5z" fill="currentColor" />
      </svg>
    )
  }
  return <Star size={18} />
}
