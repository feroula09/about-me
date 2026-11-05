import type { Hobby } from './content/types'
import { PixelSparkle } from './PixelSparkle'

/** 興趣標籤前面的像素小圖示，純裝飾。顏色跟著 CSS 的 color 走。 */
export function HobbyIcon({ icon }: { icon: Hobby['icon'] }) {
  if (icon === 'code') {
    return (
      <svg viewBox="0 0 11 7" width="22" height="14" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
        <path d="M0 3h1v1H0zM1 2h1v1H1zM1 4h1v1H1zM2 1h1v1H2zM2 5h1v1H2zM6 1h1v2H6zM5 3h1v1H5zM4 4h1v2H4zM10 3h1v1h-1zM9 2h1v1H9zM9 4h1v1H9zM8 1h1v1H8zM8 5h1v1H8z" />
      </svg>
    )
  }
  if (icon === 'tv') {
    return (
      <svg viewBox="0 0 11 9" width="22" height="18" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
        <path d="M3 0h1v1H3zM4 1h1v1H4zM7 0h1v1H7zM6 1h1v1H6zM0 2h11v7H0z" />
        <path className="tv-screen" d="M1 3h9v5H1z" />
        <path d="M4 4h1v3H4zM7 4h1v3H7z" />
      </svg>
    )
  }
  return <PixelSparkle />
}
