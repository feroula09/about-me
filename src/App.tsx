import './App.css'
import type { Link, Profile, Work } from './content/types'
import { PixelCloud } from './PixelCloud'
import { Sky } from './Sky'

type Props = {
  profile: Profile
  links: Link[]
  works: Work[]
}

function App({ profile, links, works }: Props) {
  const newestFirst = [...works].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page">
      <Sky profile={profile} />

      <main className="content">
        <section>
          <h2>最近沉迷</h2>
          <p className="caption">沉迷程度：99%，剩下 1% 用來睡覺</p>
          <ul className="tags">
            {profile.hobbies.map((hobby) => (
              <li key={hobby}>{hobby}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>雲上的作品</h2>
          <p className="caption">目前只有一朵，之後會越飄越多</p>
          <div className="works">
            {newestFirst.map((work) => (
              <article key={work.name} className="work">
                <div className="work-cover">
                  {work.cover ? (
                    <img src={work.cover} alt={`${work.name} 的封面`} />
                  ) : (
                    <PixelCloud scale={5} label={`${work.name} 的預設封面`} />
                  )}
                </div>
                <div className="work-text">
                  <h3>{work.name}</h3>
                  <p>{work.description}</p>
                  <div className="buttons">
                    {work.github && (
                      <a href={work.github} target="_blank" rel="noreferrer">
                        偷看原始碼
                      </a>
                    )}
                    {work.site && (
                      <a href={work.site} target="_blank" rel="noreferrer">
                        飛過去看看
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>丟紙飛機給我</h2>
          <p className="caption">保證會飛到我手上</p>
          <div className="links">
            {links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                ✈ {link.label}
              </a>
            ))}
          </div>
        </section>

        <footer className="footer">— 你已經飄到天空的盡頭了 —</footer>
      </main>
    </div>
  )
}

export default App
