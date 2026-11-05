// PROTOTYPE variant B「夜泳池」: dark, two columns (sticky profile sidebar + works floating as jellyfish).
import './VariantB.css'
import { Pixel, jellyRows, jellyPalette } from './Pixel'
import { profile, links, works } from './sampleContent'

const bubbles = Array.from({ length: 18 }, (_, i) => i)

export function VariantB() {
  return (
    <div className="vb">
      <div className="vb-bubbles" aria-hidden="true">
        {bubbles.map((i) => (
          <span
            key={i}
            style={{
              left: `${(i * 53) % 100}%`,
              animationDelay: `${(i * 1.7) % 12}s`,
              animationDuration: `${10 + (i % 5) * 3}s`,
              width: 6 + (i % 4) * 4,
              height: 6 + (i % 4) * 4,
            }}
          />
        ))}
      </div>

      <aside className="vb-side">
        <div className="vb-avatar">C</div>
        <h1>{profile.name}</h1>
        <p>{profile.intro}</p>

        <h2>// 興趣</h2>
        <ul className="vb-list">
          {profile.hobbies.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <h2>// 連結</h2>
        <ul className="vb-list">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="vb-main">
        <p className="vb-caption">～ 深夜泳池 ～</p>
        <h2 className="vb-works-title">作品</h2>
        <div className="vb-works">
          {works.map((w, i) => (
            <article key={w.name} className="vb-work" style={{ animationDelay: `${i * 0.8}s` }}>
              <Pixel rows={jellyRows} palette={jellyPalette} scale={7} className="vb-jelly" />
              <div>
                <h3>{w.name}</h3>
                <p>{w.description}</p>
                <div className="vb-actions">
                  {w.github && (
                    <a href={w.github} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                  {w.site && (
                    <a href={w.site} target="_blank" rel="noreferrer">網站</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
