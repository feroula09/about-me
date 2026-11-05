// PROTOTYPE: three style variants of the about-me page on the same route, switchable via ?variant=A|B|C.
import { useState } from 'react'
import { PrototypeSwitcher } from './prototype/PrototypeSwitcher'
import { VariantA } from './prototype/VariantA'
import { VariantB } from './prototype/VariantB'
import { VariantC } from './prototype/VariantC'
import { VariantD } from './prototype/VariantD'

const variants = [
  { key: 'A', name: '積雨雲' },
  { key: 'B', name: '夜泳池' },
  { key: 'C', name: '白磁磚泳池' },
  { key: 'D', name: '天空 RPG（A＋C）' },
]

function App() {
  const [variant, setVariant] = useState(
    () => new URLSearchParams(location.search).get('variant') ?? 'A',
  )

  const change = (key: string) => {
    const url = new URL(location.href)
    url.searchParams.set('variant', key)
    history.replaceState(null, '', url)
    setVariant(key)
    window.scrollTo(0, 0)
  }

  return (
    <>
      {variant === 'A' && <VariantA />}
      {variant === 'B' && <VariantB />}
      {variant === 'C' && <VariantC />}
      {variant === 'D' && <VariantD />}
      <PrototypeSwitcher variants={variants} current={variant} onChange={change} />
    </>
  )
}

export default App
