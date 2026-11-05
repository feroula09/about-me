import type { Work } from './types'

// 每個作品一個資料夾：works/<作品名稱>/index.ts，預設匯出一個 Work。
// 封面圖放在同一個資料夾，在 index.ts 裡 import 進來填到 cover。
// 新增作品只要多開一個資料夾，這裡會自動收集。
// index.ts 裡記得寫成 `const work: Work = {...}`（照 about-me/index.ts 複製），
// 漏填必填欄位時型別檢查才擋得下來；直接 `export default {...}` 不會被檢查。
const modules = import.meta.glob<Work>('./works/*/index.ts', { eager: true, import: 'default' })

export const works = Object.values(modules)
