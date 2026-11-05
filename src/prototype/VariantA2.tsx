// PROTOTYPE variant A2「積雨雲・俏皮版」: A's layout with playful copy and easter eggs
// (click a cloud → it talks; click empty sky → a shooting star + a wish).
import { useRef, useState, type MouseEvent } from 'react'
import './VariantA.css'
import './VariantA2.css'
import { Pixel, cloudRows, cloudPalette } from './Pixel'
import { profile, links, works } from './sampleContent'

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

type Bubble = { id: number; x: number; y: number; text: string }
type Meteor = { id: number; x: number; y: number }

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)]

export function VariantA2() {
  const heroRef = useRef<HTMLElement>(null)
  const nextId = useRef(0)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const [wishes, setWishes] = useState(0)

  const pointIn = (e: MouseEvent) => {
    const r = heroRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const say = (x: number, y: number, text: string) => {
    const id = nextId.current++
    setBubbles((b) => [...b, { id, x, y, text }])
    setTimeout(() => setBubbles((b) => b.filter((v) => v.id !== id)), 2200)
  }

  const onCloud = (e: MouseEvent) => {
    e.stopPropagation()
    const { x, y } = pointIn(e)
    say(x, y, pick(cloudLines))
  }

  const onSky = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    const { x, y } = pointIn(e)
    const id = nextId.current++
    setMeteors((m) => [...m, { id, x, y }])
    setTimeout(() => setMeteors((m) => m.filter((v) => v.id !== id)), 900)
    setWishes((n) => n + 1)
    say(x, y, pick(wishLines))
  }

  return (
    <div className="va va2">
      <section className="va-hero va2-hero" ref={heroRef} onClick={onSky}>
        <p className="va2-weather">今日天氣：晴時多雲，適合寫程式</p>

        <div className="va-meteor va-meteor-1" />
        <div className="va-meteor va-meteor-2" />
        <div className="va-meteor va-meteor-3" />

        <button className="va2-cloud va-cloud-big" onClick={onCloud} aria-label="戳一下雲">
          <Pixel rows={cloudRows} palette={cloudPalette} scale={30} />
        </button>
        <button className="va2-cloud va-cloud-left" onClick={onCloud} aria-label="戳一下雲">
          <Pixel rows={cloudRows} palette={cloudPalette} scale={8} />
        </button>
        <button className="va2-cloud va-cloud-right" onClick={onCloud} aria-label="戳一下雲">
          <Pixel rows={cloudRows} palette={cloudPalette} scale={6} />
        </button>

        <div className="va-hero-text">
          <div className="va-avatar">C</div>
          <h1>{profile.name}</h1>
          <p className="va-intro">{profile.intro}</p>
          <span className="va-scroll">往下飄 ▼</span>
        </div>

        {meteors.map((m) => (
          <div key={m.id} className="va2-wish-meteor" style={{ left: m.x, top: m.y }} />
        ))}
        {bubbles.map((b) => (
          <div key={b.id} className="va2-bubble" style={{ left: b.x, top: b.y }}>
            {b.text}
          </div>
        ))}

        <p className="va2-hint">
          （偷偷說：天空和雲都可以點）
          {wishes > 0 && <span> · 已許願 {wishes} 次</span>}
        </p>
      </section>

      <main className="va-body">
        <section>
          <h2>最近沉迷</h2>
          <p className="va2-caption">沉迷程度：99%，剩下 1% 用來睡覺</p>
          <ul className="va-tags">
            {profile.hobbies.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>雲上的作品</h2>
          <p className="va2-caption">目前只有一朵，之後會越飄越多</p>
          {works.map((w) => (
            <article key={w.name} className="va-work">
              <div className="va-work-cover">
                <Pixel rows={cloudRows} palette={cloudPalette} scale={5} />
              </div>
              <div className="va-work-text">
                <h3>{w.name}</h3>
                <p>{w.description}</p>
                <div className="va-work-actions">
                  {w.github && (
                    <a href={w.github} target="_blank" rel="noreferrer">偷看原始碼</a>
                  )}
                  {w.site && (
                    <a href={w.site} target="_blank" rel="noreferrer">飛過去看看</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section>
          <h2>丟紙飛機給我</h2>
          <p className="va2-caption">保證會飛到我手上</p>
          <div className="va-links">
            {links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                ✈ {l.label}
              </a>
            ))}
          </div>
        </section>

        <p className="va2-footer">— 你已經飄到天空的盡頭了 —</p>
      </main>
    </div>
  )
}
