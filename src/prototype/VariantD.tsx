// PROTOTYPE variant D「天空 RPG」: A's sky hero + C's RPG windows on the sky, no empty water area.
import { useEffect, useState } from 'react'
import './VariantA.css'
import './VariantC.css'
import './VariantD.css'
import { Pixel, cloudRows, cloudPalette } from './Pixel'
import { profile, links, works } from './sampleContent'

function useTypewriter(text: string) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(text)
      return
    }
    setShown('')
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 70)
    return () => clearInterval(id)
  }, [text])
  return shown
}

export function VariantD() {
  const [picked, setPicked] = useState(0)
  const intro = useTypewriter(profile.intro)
  const work = works[picked]

  return (
    <div className="va vd">
      <section className="va-hero">
        <div className="va-meteor va-meteor-1" />
        <div className="va-meteor va-meteor-2" />
        <div className="va-meteor va-meteor-3" />
        <Pixel rows={cloudRows} palette={cloudPalette} scale={30} className="va-cloud va-cloud-big" />
        <Pixel rows={cloudRows} palette={cloudPalette} scale={8} className="va-cloud va-cloud-left" />
        <Pixel rows={cloudRows} palette={cloudPalette} scale={6} className="va-cloud va-cloud-right" />

        <div className="va-hero-text">
          <div className="va-avatar">C</div>
          <h1>{profile.name}</h1>
          <div className="vc-dialog vd-dialog" role="status">
            <span className="vc-speaker">{profile.name}</span>
            <p>
              {intro}
              <span className="vc-caret">▼</span>
            </p>
          </div>
          <span className="va-scroll">▼</span>
        </div>
      </section>

      <section className="vd-rpg">
        <Pixel rows={cloudRows} palette={cloudPalette} scale={10} className="vd-cloud vd-cloud-1" />
        <Pixel rows={cloudRows} palette={cloudPalette} scale={7} className="vd-cloud vd-cloud-2" />

        <div className="vc-screen">
          <section className="vc-window vc-status">
            <h2 className="vc-window-title">STATUS</h2>
            <div className="vc-status-head">
              <div className="vc-avatar">C</div>
              <div>
                <h3 className="vd-name">{profile.name}</h3>
                <p className="vc-class">職業：Vibe 程式冒險者</p>
              </div>
            </div>
            <dl className="vc-stats">
              {profile.hobbies.map((h, i) => (
                <div key={h}>
                  <dt>技能 {i + 1}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>
            <h3 className="vc-sub">傳送門</h3>
            <ul className="vc-portals">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    ▶ {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="vc-window vc-items">
            <h2 className="vc-window-title">ITEMS · 作品</h2>
            <ul className="vc-slots">
              {works.map((w, i) => (
                <li key={w.name}>
                  <button
                    className={i === picked ? 'is-picked' : ''}
                    onClick={() => setPicked(i)}
                    aria-pressed={i === picked}
                  >
                    <span className="vc-slot-icon">★</span>
                    {w.name}
                  </button>
                </li>
              ))}
              {Array.from({ length: Math.max(0, 6 - works.length) }, (_, i) => (
                <li key={`empty-${i}`} className="vc-slot-empty">
                  <span>？</span>
                </li>
              ))}
            </ul>
            {work && (
              <div className="vc-item-detail">
                <h3>{work.name}</h3>
                <p>{work.description}</p>
                <div className="vc-actions">
                  {work.github && (
                    <a href={work.github} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                  {work.site && (
                    <a href={work.site} target="_blank" rel="noreferrer">網站</a>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="vd-cloud-floor" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <Pixel key={i} rows={cloudRows} palette={cloudPalette} scale={12} />
          ))}
        </div>
      </section>
    </div>
  )
}
