# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- 朋友：從 Threads 或私訊點進來，想知道 Camila 最近在做什麼、在沉迷什麼，順便玩一下頁面上的小彩蛋。
- 工作／合作對象：從 GitHub 或社群連結點進來，想在短時間內判斷 Camila 做過什麼、能不能信任她的作品，然後找到聯絡管道。

## Product Purpose

Camila 的一頁式自我介紹網頁。讓看的人認識她（名字、一句自我介紹、興趣），看到她親手挑選的作品，並找到她的社群帳號。成功的樣子：朋友覺得好玩、會想戳一戳；工作或合作對象看完會認真點開作品或聯絡她。

## Positioning

這是 Camila 本人親手做、親手維護的個人小站：作品本身就包含這個網頁，內容全部由她手寫，語氣輕鬆、有玩心。好玩之外，也要讓作品被認真看待。

## Operating Context

- 內容全部放在 `src/content/`（`profile.ts`、`links.ts`、`works/<作品>/index.ts`），Camila 自己修改，通常不需要動元件。
- 作品以資料夾自動收集，依日期由新到舊排列；欄位：名稱、介紹、日期、選填 GitHub／網站／封面。
- push 到 `main` 就會經 Cloudflare Workers Builds 自動部署；push 前必須跑 `npm run check`（lint、測試、build）。

## Capabilities and Constraints

- 技術：React 19 + TypeScript + Vite，Vitest + Testing Library 測試，oxlint，Cloudflare Workers 靜態資源。
- 頁面區塊：首屏（大頭貼、名字、自我介紹）、興趣、作品、社群連結。
- 現有互動：點雲會隨機說一句話（雲是按鈕，鍵盤可操作）；點天空空白處會劃過流星並累計許願次數。是否以同樣形式保留，屬於視覺重設計時的決定，但「有可以玩的小彩蛋」是現有功能。
- 內容可能很少：目前只有 1 個作品、2 個興趣、2 個社群連結，設計必須在內容少時也成立，並能隨內容增加而延伸。
- 這是一頁式網站，不含部落格文章功能。

## Brand Commitments

- 名字：Camila。語氣：繁體中文、口語、俏皮（例如「偷看原始碼」「飛過去看看」「丟紙飛機給我」）。

## Evidence on Hand

- 大頭貼：`src/content/橘髮花飾蝴蝶結萌系特寫.png`
- 作品：`about-me`（本網站），有 GitHub 與網站連結。
- 社群：Threads `@feroula09`、GitHub `feroula09`。
- 沒有推薦語、客戶、經歷或數據；不得捏造。

## Product Principles

1. 內容由 Camila 掌控：改文字、加作品只需要動 `src/content/`。
2. 好玩但可信：玩心不能蓋過作品，工作對象要能在幾秒內找到作品與聯絡方式。
3. 內容少也要好看：一個作品時不顯得空，十個作品時不顯得亂。
4. 彩蛋不擋路：互動是額外的樂趣，所有主要資訊與連結不依賴彩蛋，且可用鍵盤操作。
