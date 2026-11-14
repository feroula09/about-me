import type { ReactNode } from 'react'
import './App.css'
import type { Link, Profile, Work } from './content/types'
import { HobbyIcon } from './HobbyIcon'
import { Cloud, Daisy, PaperPlane, Ribbon } from './Ornaments'
import { Sky } from './Sky'

type Props = {
  profile: Profile
  links: Link[]
  works: Work[]
}

type SectionProps = {
  id: string
  title: string
  caption: string
  className: string
  /** 標題前面的小插畫，純裝飾。 */
  icon: ReactNode
  children: ReactNode
}

/** 一個段落：圓體大標、一句俏皮的說明，再接內容。 */
function Section({ id, title, caption, className, icon, children }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <h2 id={`${id}-title`}>
          {icon}
          {title}
        </h2>
        <p className="caption">{caption}</p>
      </div>
      {children}
    </section>
  )
}

function App({ profile, links, works }: Props) {
  const newestFirst = [...works].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page">
      <Sky profile={profile} />

      <main>
        <Section id="hobbies" className="section-hobbies" icon={<Daisy className="section-icon" size={34} />} title="最近沉迷" caption="沉迷程度：99%，剩下 1% 用來睡覺">
          <ul className="tags">
            {profile.hobbies.map((hobby) => (
              <li key={hobby.label}>
                <span className="tag-icon">
                  <HobbyIcon icon={hobby.icon} />
                </span>
                {hobby.label}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="works" className="section-works" icon={<Cloud width={58} />} title="雲上的作品" caption="目前只有一朵，之後會越飄越多">
          <div className="works">
            {newestFirst.map((work) => (
              <article key={work.name} className="work">
                <div className="work-cover">
                  {work.cover ? (
                    <img src={work.cover} alt={`${work.name} 的封面`} />
                  ) : (
                    <div className="work-cover-default" role="img" aria-label={`${work.name} 的預設封面`}>
                      <span className="cover-title" aria-hidden="true">
                        {work.name}
                      </span>
                      <Cloud width={120} />
                      <Daisy className="cover-daisy" size={56} />
                    </div>
                  )}
                  <span className="tape tape-left" aria-hidden="true" />
                </div>
                <div className="work-text">
                  <h3>{work.name}</h3>
                  <p>{work.description}</p>
                  <time className="work-date" dateTime={work.date}>
                    {work.date.replaceAll('-', '.')}
                  </time>
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
            <p className="work-next">
              <Cloud width={56} />
              下一朵雲正在路上…
            </p>
          </div>
        </Section>

        <Section id="links" className="section-links" icon={<span className="section-icon plane-icon"><PaperPlane size={26} /></span>} title="丟紙飛機給我" caption="保證會飛到我手上">
          <div className="links">
            {links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                <span className="link-icon">
                  <PaperPlane />
                </span>
                <span className="link-text">
                  {link.label}
                  {link.handle && <span className="link-handle">{link.handle}</span>}
                </span>
              </a>
            ))}
          </div>
        </Section>
      </main>

      <footer className="footer">
        <span className="footer-mark" aria-hidden="true">
          <Daisy className="footer-daisy" size={48} />
          <Ribbon className="footer-ribbon" size={44} />
        </span>
        <p>— 你已經飄到天空的盡頭了 —</p>
      </footer>
    </div>
  )
}

export default App
