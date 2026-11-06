# about-me

Camila 的像素風自我介紹網頁，給朋友看、好玩性質。

🌤 線上網址：<https://camila.blog-camila.workers.dev/>

## 頁面內容

- **天空**：大頭貼、名字和自我介紹，加上兩個彩蛋
  - 點雲：雲會隨機說一句話（雲是按鈕，用鍵盤按 Enter 也可以）
  - 點天空空白處：劃過一顆流星並許願，會累計許願次數
- **最近沉迷**：興趣標籤
- **雲上的作品**：手動挑選的作品（寫在 `src/content/works/`），依日期由新到舊排列
- **丟紙飛機給我**：社群連結

整頁背景是一張固定不動的像素天空插畫（直向螢幕換成直式那張），每個視窗旁邊還有一張原創角色「小雲」的插畫。這些圖是用 ChatGPT 生成的，畫小雲的新插畫時，可以拿 `docs/art/kumo-sheet.png` 當角色參考。

## 技術

- [React](https://react.dev/) 19 + TypeScript
- [Vite](https://vite.dev/)：開發與打包
- [Vitest](https://vitest.dev/) + Testing Library：測試
- [oxlint](https://oxc.rs/)：lint
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)（靜態資源）：部署

## 開始使用

需要 Node.js 24（和 CI 相同）。

```bash
npm install
npm run dev
```

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 型別檢查並打包到 `dist/` |
| `npm run preview` | 預覽打包後的結果 |
| `npm test` | 以 watch 模式跑測試 |
| `npm run lint` | 執行 oxlint |
| `npm run check` | lint + 測試 + build，push 前一定要跑 |

## 修改內容

頁面上的文字和連結都放在 `src/content/`，通常不需要動到元件。

### 個人資料

編輯 `src/content/profile.ts`：名字、自我介紹、興趣和大頭貼。

每個興趣是一個標籤，`icon` 選填，決定標籤前面的像素小圖示（`code` 程式碼符號、`tv` 小電視，沒填就是十字星）：

```ts
{ label: '看動漫', icon: 'tv' },
```

換大頭貼：把圖片放進 `src/content/`，在 `profile.ts` 裡 import 後填到 `avatar`。沒填 `avatar` 的話，會顯示名字第一個字的圓形色塊。

### 社群連結

在 `src/content/links.ts` 加一行：

```ts
{ label: '平台名稱', url: '網址', handle: '@帳號' }, // handle 選填，顯示在平台名稱下面
```

### 新增作品

每個作品一個資料夾，會自動被收集到頁面上，不用改其他檔案。

1. 建立 `src/content/works/<作品名稱>/index.ts`
2. 照 `works/about-me/index.ts` 的寫法填內容：

```ts
import type { Work } from '../../types'

const work: Work = {
  name: '作品名稱',
  description: '一兩句介紹',
  date: '2026-11-05', // YYYY-MM-DD，用來排序
  github: 'https://github.com/...', // 選填，顯示「偷看原始碼」按鈕
  site: 'https://...', // 選填，顯示「飛過去看看」按鈕
  // cover: 選填，封面圖放在同一個資料夾再 import 進來；沒有的話用預設的像素雲
}

export default work
```

請保留 `const work: Work = {...}` 的寫法，漏填必填欄位時型別檢查才擋得下來。

## 專案結構

```
src/
├── main.tsx            # 進入點，把 content 傳給 App
├── App.tsx             # 頁面主體：興趣、作品、社群連結
├── Sky.tsx             # 第一屏的天空與彩蛋
├── PixelCloud.tsx      # 原創像素雲（SVG）
├── PixelSparkle.tsx    # 像素十字星裝飾（SVG）
├── HobbyIcon.tsx       # 興趣標籤的像素小圖示
├── index.css           # 全域樣式
├── App.css             # 頁面樣式
├── assets/
│   └── illustrations/  # 背景和小雲插畫（webp）
├── content/            # 所有頁面內容
│   ├── types.ts
│   ├── profile.ts
│   ├── links.ts
│   ├── *.png           # 大頭貼圖片
│   ├── works.ts        # 自動收集 works/*/index.ts
│   └── works/
│       └── about-me/
├── test/
│   └── setup.ts        # 測試初始化
├── App.test.tsx        # 元件行為測試
└── content.smoke.test.tsx  # 用真正的內容渲染一次
```

## 部署

Cloudflare Workers Builds 已連結這個 repo，**push 到 `main` 就會自動部署**。設定在 `wrangler.jsonc`，只上傳 build 出來的 `dist/`。

GitHub Actions（`.github/workflows/check.yml`）會在 push 到 `main` 和開 PR 時跑 `npm run check`。
