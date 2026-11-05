// PROTOTYPE: draws original pixel art from a text grid. Each character maps to a colour; '.' is transparent.

type Props = {
  rows: string[]
  palette: Record<string, string>
  scale?: number
  className?: string
}

export function Pixel({ rows, palette, scale = 4, className }: Props) {
  const width = Math.max(...rows.map((r) => r.length))
  const height = rows.length
  const rects = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const fill = palette[rows[y][x]]
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />)
    }
  }
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects}
    </svg>
  )
}

export const cloudRows = [
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
export const cloudPalette = { w: '#ffffff', p: '#ffd9cf', b: '#a9c8f0' }

export const jellyRows = [
  '...cccccc...',
  '..cCCCCCCc..',
  '.cCCcCCcCCc.',
  'cCCCCCCCCCCc',
  'cCcCCCCCCcCc',
  'cccccccccccc',
  '.c.c.cc.c.c.',
  '.c..c..c..c.',
  'c..c....c..c',
  '.c..c..c..c.',
]
export const jellyPalette = { c: '#7fe3ff', C: '#2a6fd6' }
