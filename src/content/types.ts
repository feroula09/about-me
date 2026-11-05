export type Profile = {
  name: string
  intro: string
  hobbies: string[]
  /** 大頭貼圖片網址。沒有的話會顯示名字第一個字的圓形色塊。 */
  avatar?: string
}

export type Link = {
  label: string
  url: string
}

export type Work = {
  name: string
  description: string
  /** YYYY-MM-DD，用來排序，新的在前。 */
  date: string
  github?: string
  site?: string
  cover?: string
}
