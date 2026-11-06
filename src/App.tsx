import type { ReactNode } from 'react'
import './App.css'
import kumoHobbies from './assets/illustrations/kumo-hobbies.webp'
import kumoLinks from './assets/illustrations/kumo-links.webp'
import kumoWorks from './assets/illustrations/kumo-works.webp'
import type { Link, Profile, Work } from './content/types'
import { HobbyIcon } from './HobbyIcon'
import { PixelCloud } from './PixelCloud'
import { Sky } from './Sky'

type Props = {
  profile: Profile
  links: Link[]
  works: Work[]
}

type WindowProps = {
  title: string
  caption: string
  /** 靠在視窗旁邊的小雲插畫，純裝飾。 */
  art: string
  artSide: 'left' | 'right'
  children: ReactNode
}

/** 像素風小視窗：深藍標題列＋白色內容，旁邊靠著一張小雲插畫。 */
function Window({ title, caption, art, artSide, children }: WindowProps) {
  return (
    <section className="window">
      <img className={`window-art window-art-${artSide}`} src={art} alt="" />
      <div className="window-bar">
        <PixelCloud scale={1.5} />
        <h2>{title}</h2>
        <span className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
      <div className="window-body">
        <p className="caption">{caption}</p>
        {children}
      </div>
    </section>
  )
}

function App({ profile, links, works }: Props) {
  const newestFirst = [...works].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page">
      <Sky profile={profile} />

      <main className="content">
        <Window title="最近沉迷" caption="沉迷程度：99%，剩下 1% 用來睡覺" art={kumoHobbies} artSide="left">
          <ul className="tags">
            {profile.hobbies.map((hobby) => (
              <li key={hobby.label}>
                <HobbyIcon icon={hobby.icon} />
                {hobby.label}
              </li>
            ))}
          </ul>
        </Window>

        <Window title="雲上的作品" caption="目前只有一朵，之後會越飄越多" art={kumoWorks} artSide="right">
          <div className="works">
            {newestFirst.map((work) => (
              <article key={work.name} className="work">
                <div className="work-cover">
                  {work.cover ? (
                    <img src={work.cover} alt={`${work.name} 的封面`} />
                  ) : (
                    <PixelCloud scale={7} label={`${work.name} 的預設封面`} />
                  )}
                  <span className="work-date">{work.date}</span>
                </div>
                <div className="work-text">
                  <h3>{work.name}</h3>
                  <p>{work.description}</p>
                  <div className="buttons">
                    {work.github && (
                      <a className="button-solid" href={work.github} target="_blank" rel="noreferrer">
                        偷看原始碼
                      </a>
                    )}
                    {work.site && (
                      <a className="button-outline" href={work.site} target="_blank" rel="noreferrer">
                        飛過去看看
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
            <div className="work-next">
              <PixelCloud scale={5} />
              下一朵雲正在路上…
            </div>
          </div>
        </Window>

        <Window title="丟紙飛機給我" caption="保證會飛到我手上" art={kumoLinks} artSide="left">
          <div className="links">
            {links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                <span className="link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
                  </svg>
                </span>
                <span className="link-text">
                  {link.label}
                  {link.handle && <span className="link-handle">{link.handle}</span>}
                </span>
              </a>
            ))}
          </div>
        </Window>
      </main>

      <footer className="footer">
        <p>— 你已經飄到天空的盡頭了 —</p>
      </footer>
    </div>
  )
}

export default App
