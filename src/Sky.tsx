import { useRef, useState, type MouseEvent } from 'react'
import type { Profile } from './content/types'
import { PixelCloud } from './PixelCloud'
import { PixelSparkle } from './PixelSparkle'

const cloudLines = [
  '我只是一朵雲，請不要戳我',
  '噗～',
  '今天也要好好 Vibe coding',
  '你發現了一朵會說話的雲！',
  '雲的背後，還是雲',
  '下雨前我會先通知你',
  '聽說 Camila 很愛看動漫',
]

const wishLines = ['許願成功！✨', '願望已送出 🌠', '流星收到了！', '這個願望會實現的']

const BUBBLE_MS = 2200
const METEOR_MS = 900

type Bubble = { id: number; x: number; y: number; text: string }
type Meteor = { id: number; x: number; y: number }

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)]

/** 第一個畫面：整片藍天、頭像和名字，還有兩個彩蛋：點雲會說話、點天空會劃過流星並許願。 */
export function Sky({ profile }: { profile: Profile }) {
  const skyRef = useRef<HTMLElement>(null)
  const nextId = useRef(0)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const [wishes, setWishes] = useState(0)

  // 畫面座標換算成相對於天空左上角的座標
  const pointIn = (clientX: number, clientY: number) => {
    const box = skyRef.current!.getBoundingClientRect()
    return { x: clientX - box.left, y: clientY - box.top }
  }

  const say = (point: { x: number; y: number }, text: string) => {
    const id = nextId.current++
    setBubbles((list) => [...list, { id, ...point, text }])
    setTimeout(() => setBubbles((list) => list.filter((b) => b.id !== id)), BUBBLE_MS)
  }

  const onCloud = (e: MouseEvent<HTMLButtonElement>) => {
    // 用鍵盤按的時候沒有滑鼠座標（detail 是 0），改從雲的上緣中間冒出來
    const cloud = e.currentTarget.getBoundingClientRect()
    const point =
      e.detail === 0 ? pointIn(cloud.left + cloud.width / 2, cloud.top) : pointIn(e.clientX, e.clientY)
    say(point, pick(cloudLines))
  }

  const onSky = (e: MouseEvent) => {
    // 點到雲、連結等可操作的東西時不算許願
    if ((e.target as Element).closest('a, button')) return
    const point = pointIn(e.clientX, e.clientY)
    const id = nextId.current++
    setMeteors((list) => [...list, { id, ...point }])
    setTimeout(() => setMeteors((list) => list.filter((m) => m.id !== id)), METEOR_MS)
    setWishes((n) => n + 1)
    say(point, pick(wishLines))
  }

  return (
    // 點天空是滑鼠彩蛋；鍵盤使用者可以改按雲（雲是按鈕）
    <header className="sky" ref={skyRef} onClick={onSky}>
      <button type="button" className="cloud cloud-big" onClick={onCloud} aria-label="戳一下雲">
        <PixelCloud scale={32} />
      </button>
      <button type="button" className="cloud cloud-left" onClick={onCloud} aria-label="戳一下雲">
        <PixelCloud scale={9} />
      </button>
      <button type="button" className="cloud cloud-right" onClick={onCloud} aria-label="戳一下雲">
        <PixelCloud scale={8} />
      </button>

      <p className="weather">
        <svg viewBox="0 0 7 7" width="14" height="14" shapeRendering="crispEdges" aria-hidden="true">
          <path fill="#ffc94d" d="M2 0h3v1h1v1h1v3H6v1H5v1H2V6H1V5H0V2h1V1h1z" />
        </svg>
        今日天氣：晴時多雲，適合寫程式
      </p>

      <div className="sky-text">
        <div className="avatar-frame">
          {profile.avatar ? (
            <img className="avatar" src={profile.avatar} alt={`${profile.name} 的大頭貼`} />
          ) : (
            <div className="avatar" aria-hidden="true">
              {profile.name.slice(0, 1)}
            </div>
          )}
          <PixelSparkle className="sparkle sparkle-1" />
          <PixelSparkle className="sparkle sparkle-2" />
        </div>
        <h1>{profile.name}</h1>
        <p className="intro">{profile.intro}</p>
        <span className="scroll-hint">往下飄 ▼</span>
      </div>

      {meteors.map((m) => (
        <div key={m.id} className="wish-meteor" style={{ left: m.x, top: m.y }} />
      ))}
      {bubbles.map((b) => (
        <div key={b.id} role="status" className="bubble" style={{ left: b.x, top: b.y }}>
          {b.text}
        </div>
      ))}

      <p className="hint">
        （偷偷說：天空和雲都可以點）
        {wishes > 0 && ` · 已許願 ${wishes} 次`}
      </p>
    </header>
  )
}
