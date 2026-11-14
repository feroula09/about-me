// 插畫風的小物件：柔和的雲、雛菊（取自大頭貼上的花）、小星星。全部是 SVG。

type CloudProps = {
  width: number
  /** 有給就當成有意義的圖片讓螢幕閱讀器念出來；沒給就是純裝飾。 */
  label?: string
}

export function Cloud({ width, label }: CloudProps) {
  return (
    <svg
      className="cloud-art"
      viewBox="0 0 120 64"
      width={width}
      height={(width * 64) / 120}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <path
        className="cloud-shade"
        d="M22 60c-10 0-17-7-17-15s7-14 15-14c2-12 13-21 26-21 10 0 19 5 23 14 3-2 7-3 11-3 11 0 20 8 21 19 7 1 13 7 13 14 0 4-4 6-8 6H22z"
      />
      <path
        className="cloud-body"
        d="M22 55c-9 0-15-6-15-13s6-13 14-13c2-11 12-19 25-19 10 0 18 5 22 13 3-2 7-3 11-3 10 0 18 7 19 17 7 1 12 6 12 12 0 3-3 6-7 6H22z"
      />
    </svg>
  )
}

/** 大頭貼上的橘色雛菊，純裝飾。 */
export function Daisy({ className, size = 40 }: { className?: string; size?: number }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg className={className} viewBox="-20 -20 40 40" width={size} height={size} aria-hidden="true">
      {petals.map((deg) => (
        <ellipse key={deg} className="daisy-petal" cx="0" cy="-10" rx="4.2" ry="9" transform={`rotate(${deg})`} />
      ))}
      <circle className="daisy-heart" r="4.5" />
    </svg>
  )
}

/** 四角小星星，純裝飾。顏色跟著 CSS 的 color 走。 */
export function Star({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M8 0c.6 4.6 2.4 6.6 8 8-5.6 1.4-7.4 3.4-8 8-.6-4.6-2.4-6.6-8-8 5.6-1.4 7.4-3.4 8-8z" />
    </svg>
  )
}

/** 大頭貼上的黑白緞帶蝴蝶結，純裝飾。 */
export function Ribbon({ className, size = 56 }: { className?: string; size?: number }) {
  return (
    <svg className={className} viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path className="ribbon-tail-light" d="M30 30 20 60l7-4 4 6 4-30z" />
      <path className="ribbon-tail" d="M34 30l12 28-7-3-3 7-6-30z" />
      <path className="ribbon-loop" d="M32 28C22 14 6 12 6 22s14 14 26 6z" />
      <path className="ribbon-loop" d="M32 28c10-14 26-16 26-6s-14 14-26 6z" />
      <circle className="ribbon-knot" cx="32" cy="28" r="6" />
    </svg>
  )
}

/** 紙飛機，純裝飾。 */
export function PaperPlane({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.5 2.5 10.5 13.5" />
      <path d="M21.5 2.5 14.5 21.5l-4-8-8-4 19-7z" />
    </svg>
  )
}
