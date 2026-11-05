import type { Profile } from './types'
import avatar from './橘髮花飾蝴蝶結萌系特寫.png'

// 想換大頭貼：把圖片放進 src/content/，在上面 import 進來，再填到 avatar。
// 例如：import avatar from './avatar.png'，然後 avatar: avatar
export const profile: Profile = {
  name: 'Camila',
  intro: '嗨，我是 Camila，喜歡寫程式和看動漫。',
  hobbies: [
    { label: 'Vibe coding', icon: 'code' },
    { label: '看動漫', icon: 'tv' },
  ],
  avatar: avatar,
}
