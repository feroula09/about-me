// 原創像素雲：每個字元是一格像素，'.' 是透明。
const rows = [
  '..........wwww..........',
  '........wwwwwwww........',
  '.......wwwwwwwwwp.......',
  '...www.wwwwwwwwwwp..ww..',
  '..wwwwwwwwwwwwwwwwwwwww.',
  '.wwwwwwwwwwwwwwwwwwwwwwp',
  'wwwwwwwwwwwwwwwwwwwwwwwp',
  'bwwwwwwwwwwwwwwwwwwwwwbb',
  '.bbbwwwwbbbbwwwwwbbbbbb.',
  '...bbbbbbbbbbbbbbbbbb...',
]

const colors: Record<string, string> = { w: '#ffffff', p: '#ffd9cf', b: '#a9c8f0' }

const pixels = rows.flatMap((row, y) =>
  [...row].flatMap((char, x) => (colors[char] ? [{ x, y, fill: colors[char] }] : [])),
)

type Props = {
  /** 每格像素的實際大小（px）。 */
  scale: number
  /** 有給就當成有意義的圖片讓螢幕閱讀器念出來；沒給就是純裝飾。 */
  label?: string
}

export function PixelCloud({ scale, label }: Props) {
  const width = rows[0].length
  const height = rows.length

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {pixels.map((p) => (
        <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={1} height={1} fill={p.fill} />
      ))}
    </svg>
  )
}
