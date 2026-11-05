import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'
import { links } from './content/links'
import { profile } from './content/profile'
import { works } from './content/works'

it('用真正的內容渲染頁面：看得到 Camila 和 about-me 作品', () => {
  render(<App profile={profile} links={links} works={works} />)

  expect(screen.getByRole('heading', { level: 1, name: 'Camila' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 3, name: 'about-me' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '偷看原始碼' })).toHaveAttribute(
    'href',
    'https://github.com/feroula09/about-me',
  )
  expect(screen.getByRole('link', { name: '飛過去看看' })).toHaveAttribute(
    'href',
    'https://camila.blog-camila.workers.dev/',
  )
})
