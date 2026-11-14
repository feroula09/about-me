import { useRef, useState, type MouseEvent } from 'react'
import type { Profile } from './content/types'
import { Cloud, Daisy, Ribbon, Star } from './Ornaments'

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

/** 名字字標：第一個小寫 i 的點換成一朵雛菊（雛菊蓋在點上，文字本身不變）。 */
function Wordmark({ name }: { name: string }) {
  const at = name.indexOf('i')
  if (at === -1) return name
  return (
    <>
      {name.slice(0, at)}
      <span className="wordmark-i">
        i
        <Daisy className="wordmark-daisy" size={64} />
      </span>
      {name.slice(at + 1)}
    </>
  )
}

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
      <nav className="topbar" aria-label="頁面導覽">
        <a className="topbar-mark" href="#top">
          {profile.name}
        </a>
        <ul>
          <li>
            <a href="#hobbies">最近沉迷</a>
          </li>
          <li>
            <a href="#works">雲上的作品</a>
          </li>
          <li>
            <a href="#links">丟紙飛機給我</a>
          </li>
        </ul>
      </nav>

      <button type="button" className="cloud cloud-a" onClick={onCloud} aria-label="戳一下雲">
        <Cloud width={220} />
      </button>
      <button type="button" className="cloud cloud-b" onClick={onCloud} aria-label="戳一下雲">
        <Cloud width={150} />
      </button>
      <button type="button" className="cloud cloud-c" onClick={onCloud} aria-label="戳一下雲">
        <Cloud width={120} />
      </button>

      <div className="kv" id="top">
        <figure className="kv-card">
          {profile.avatar ? (
            <img className="avatar" src={profile.avatar} alt={`${profile.name} 的大頭貼`} />
          ) : (
            <div className="avatar avatar-empty" aria-hidden="true">
              {profile.name.slice(0, 1)}
            </div>
          )}
          <span className="tape tape-left" aria-hidden="true" />
          <span className="tape tape-right" aria-hidden="true" />
        </figure>
        <Daisy className="kv-daisy kv-daisy-1" size={64} />
        <Daisy className="kv-daisy kv-daisy-2" size={36} />
        <Star className="kv-star kv-star-1" size={22} />
        <Star className="kv-star kv-star-2" size={14} />

        <h1 className="wordmark" data-text={profile.name}>
          <Wordmark name={profile.name} />
        </h1>
        <p className="intro">
          <Ribbon className="intro-ribbon" size={52} />
          {profile.intro}
        </p>
      </div>

      <p className="weather">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="12" cy="12" r="5" fill="#f7b23b" />
          <g stroke="#f7b23b" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
          </g>
        </svg>
        今日天氣：晴時多雲，適合寫程式
      </p>

      <p className="hint">
        （偷偷說：天空和雲都可以點）
        {wishes > 0 && <span className="wish-count"> · 已許願 {wishes} 次</span>}
      </p>

      <a className="scroll-hint" href="#hobbies">
        往下飄
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>

      {meteors.map((m) => (
        <div key={m.id} className="wish-meteor" style={{ left: m.x, top: m.y }} aria-hidden="true">
          <Star size={18} />
        </div>
      ))}
      {bubbles.map((b) => (
        <div key={b.id} role="status" className="bubble" style={{ left: b.x, top: b.y }}>
          {b.text}
        </div>
      ))}
    </header>
  )
}
