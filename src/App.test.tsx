import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import type { Link, Profile, Work } from './content/types'

const profile: Profile = {
  name: 'Camila',
  intro: '嗨，我是測試用的自我介紹。',
  hobbies: [{ label: 'Vibe coding', icon: 'code' }, { label: '看動漫', icon: 'tv' }],
}

const links: Link[] = [
  { label: 'Threads', url: 'https://www.threads.com/@someone', handle: '@someone' },
  { label: 'GitHub', url: 'https://github.com/someone' },
]

// 照 spec 抄的台詞清單，用來確認畫面上冒出的話屬於哪一組
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

const work = (overrides: Partial<Work> = {}): Work => ({
  name: 'some-work',
  description: '一個作品',
  date: '2026-01-01',
  ...overrides,
})

function renderApp(props: { profile?: Profile; links?: Link[]; works?: Work[] } = {}) {
  return render(<App profile={props.profile ?? profile} links={props.links ?? links} works={props.works ?? []} />)
}

describe('App', () => {
  it('顯示名字、自我介紹和興趣', () => {
    renderApp()

    expect(screen.getByRole('heading', { level: 1, name: 'Camila' })).toBeInTheDocument()
    expect(screen.getByText('嗨，我是測試用的自我介紹。')).toBeInTheDocument()
    expect(screen.getByText('Vibe coding')).toBeInTheDocument()
    expect(screen.getByText('看動漫')).toBeInTheDocument()
  })

  it('顯示每個社群連結，連到正確網址並在新分頁開啟', () => {
    renderApp()

    const threads = screen.getByRole('link', { name: /Threads/ })
    expect(threads).toHaveAttribute('href', 'https://www.threads.com/@someone')
    expect(threads).toHaveAttribute('target', '_blank')

    const github = screen.getByRole('link', { name: /GitHub/ })
    expect(github).toHaveAttribute('href', 'https://github.com/someone')
    expect(github).toHaveAttribute('target', '_blank')
  })

  it('社群連結有填帳號時顯示帳號，沒填就只顯示平台名稱', () => {
    renderApp()

    expect(screen.getByRole('link', { name: /Threads/ })).toHaveTextContent('@someone')
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveTextContent(/^GitHub$/)
  })

  it('作品依日期由新到舊排列，每張卡片都有名稱和介紹', () => {
    renderApp({
      works: [
        work({ name: '中間的', description: '去年秋天做的', date: '2025-10-01' }),
        work({ name: '最新的', description: '今年做的', date: '2026-03-15' }),
        work({ name: '最舊的', description: '很久以前做的', date: '2024-12-31' }),
      ],
    })

    const names = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(names).toEqual(['最新的', '中間的', '最舊的'])
    expect(screen.getByText('今年做的')).toBeInTheDocument()
  })

  it('作品有 GitHub 和網站連結時，顯示按鈕並連到正確網址', () => {
    renderApp({
      works: [work({ github: 'https://github.com/someone/a', site: 'https://a.example.com' })],
    })

    const code = screen.getByRole('link', { name: '偷看原始碼' })
    expect(code).toHaveAttribute('href', 'https://github.com/someone/a')
    expect(code).toHaveAttribute('target', '_blank')

    const site = screen.getByRole('link', { name: '飛過去看看' })
    expect(site).toHaveAttribute('href', 'https://a.example.com')
    expect(site).toHaveAttribute('target', '_blank')
  })

  it('作品沒填 GitHub 或網站連結時，不顯示對應按鈕', () => {
    renderApp({ works: [work()] })

    expect(screen.queryByRole('link', { name: '偷看原始碼' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '飛過去看看' })).not.toBeInTheDocument()
  })

  it('作品有封面圖時顯示封面圖', () => {
    renderApp({ works: [work({ cover: '/covers/a.png' })] })

    expect(screen.getByRole('img', { name: 'some-work 的封面' })).toHaveAttribute('src', '/covers/a.png')
    expect(screen.queryByRole('img', { name: 'some-work 的預設封面' })).not.toBeInTheDocument()
  })

  it('作品沒有封面圖時顯示預設封面', () => {
    renderApp({ works: [work()] })

    expect(screen.getByRole('img', { name: 'some-work 的預設封面' })).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: 'some-work 的封面' })).not.toBeInTheDocument()
  })

  it('沒有大頭貼時顯示「C」圓形色塊', () => {
    renderApp()

    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: 'Camila 的大頭貼' })).not.toBeInTheDocument()
  })

  it('有大頭貼時顯示大頭貼圖片', () => {
    renderApp({ profile: { ...profile, avatar: '/me.png' } })

    expect(screen.getByRole('img', { name: 'Camila 的大頭貼' })).toHaveAttribute('src', '/me.png')
    expect(screen.queryByText('C')).not.toBeInTheDocument()
  })

  it('三個視窗旁各有一張小雲插畫，而且螢幕閱讀器讀不到', () => {
    const { container } = renderApp({ profile: { ...profile, avatar: '/me.png' }, works: [work({ cover: '/a.png' })] })

    // 純裝飾的圖片用 alt=""，角色是 presentation，螢幕閱讀器不會念出來
    const windows = container.querySelectorAll('.window')
    expect(windows).toHaveLength(3)
    for (const win of windows) {
      expect(within(win as HTMLElement).getAllByRole('presentation')).toHaveLength(1)
    }
  })

  it('點雲之後，冒出一句雲的台詞，而且不算許願', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getAllByRole('button', { name: '戳一下雲' })[0])

    expect(cloudLines).toContain(screen.getByRole('status').textContent)
    expect(screen.queryByText(/已許願/)).not.toBeInTheDocument()
  })

  it('用鍵盤聚焦到雲再按 Enter，也會冒出一句雲的台詞', async () => {
    const user = userEvent.setup()
    renderApp()

    screen.getAllByRole('button', { name: '戳一下雲' })[0].focus()
    await user.keyboard('{Enter}')

    expect(cloudLines).toContain(screen.getByRole('status').textContent)
  })

  it('點天空空白處會許願：冒出許願訊息，次數從 1 變成 2', async () => {
    const user = userEvent.setup()
    renderApp()
    const sky = screen.getByRole('banner')

    await user.click(sky)
    expect(wishLines).toContain(screen.getByRole('status').textContent)
    expect(screen.getByText(/已許願 1 次/)).toBeInTheDocument()

    await user.click(sky)
    expect(screen.getByText(/已許願 2 次/)).toBeInTheDocument()
  })

  it('點連結不會許願', async () => {
    const user = userEvent.setup()
    renderApp({ works: [work({ github: 'https://github.com/someone/a' })] })

    await user.click(screen.getByRole('link', { name: /Threads/ }))
    await user.click(screen.getByRole('link', { name: '偷看原始碼' }))

    expect(screen.queryByText(/已許願/)).not.toBeInTheDocument()
  })
})
