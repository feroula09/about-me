// 5×5 的像素十字星，純裝飾。顏色跟著 CSS 的 color 走。
export function PixelSparkle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 5 5"
      width="15"
      height="15"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 0h1v2h2v1H3v2H2V3H0V2h2z" />
    </svg>
  )
}
