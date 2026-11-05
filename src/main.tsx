import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { links } from './content/links'
import { profile } from './content/profile'
import { works } from './content/works'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App profile={profile} links={links} works={works} />
  </StrictMode>,
)
