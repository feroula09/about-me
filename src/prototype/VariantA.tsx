// PROTOTYPE variant A「積雨雲」: bright sky landing hero, then a single centred column.
import './VariantA.css'
import { Pixel, cloudRows, cloudPalette } from './Pixel'
import { profile, links, works } from './sampleContent'

export function VariantA() {
  return (
    <div className="va">
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
          <p className="va-intro">{profile.intro}</p>
          <span className="va-scroll">▼</span>
        </div>
      </section>

      <main className="va-body">
        <section>
          <h2>興趣</h2>
          <ul className="va-tags">
            {profile.hobbies.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>作品</h2>
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
                    <a href={w.github} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                  {w.site && (
                    <a href={w.site} target="_blank" rel="noreferrer">網站</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section>
          <h2>找到我</h2>
          <div className="va-links">
            {links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
