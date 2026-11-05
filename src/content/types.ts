export type Profile = {
  name: string
  intro: string
  hobbies: Hobby[]
  /** 大頭貼圖片網址。沒有的話會顯示名字第一個字的圓形色塊。 */
  avatar?: string
}

export type Hobby = {
  label: string
  /** 標籤前面的像素小圖示：code 是程式碼符號、tv 是小電視。沒填就用十字星。 */
  icon?: 'code' | 'tv'
}

export type Link = {
  label: string
  url: string
  /** 選填，顯示在平台名稱下面的帳號，例如 '@feroula09'。 */
  handle?: string
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
