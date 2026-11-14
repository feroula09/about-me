---
name: Camila
description: 日系插畫同人風的一頁式自我介紹：橘髮大頭貼是主視覺，整頁像插畫本與攤位小物。
colors:
  orange: "#f07a3c"
  orange-deep: "#b6461c"
  orange-soft: "#fde4d6"
  ink: "#2a1d18"
  ink-soft: "#5c4a42"
  pink: "#f7b2aa"
  paper: "#ffffff"
  sky: "#d5ebf7"
  sky-deep: "#a9d0ea"
typography:
  display:
    fontFamily: "Chiron GoRound TC, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(5.5rem, min(17vw, 28svh), 16rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Chiron GoRound TC, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 900
    lineHeight: 1.2
  title:
    fontFamily: "Chiron GoRound TC, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 1.2
  body:
    fontFamily: "Chiron GoRound TC, Noto Sans TC, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.7
  label:
    fontFamily: "Chiron GoRound TC, Noto Sans TC, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  tape: "3px"
  inner: "12px"
  card: "24px"
  sticker: "28px"
  pill: "999px"
spacing:
  xs: "12px"
  sm: "24px"
  md: "40px"
  lg: "56px"
components:
  button-solid:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  nav-link-hover:
    backgroundColor: "{colors.paper}"
  tag-sticker:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 26px 10px 10px"
  link-sticker:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sticker}"
    padding: "16px 32px 16px 16px"
  link-sticker-hover:
    backgroundColor: "{colors.orange-soft}"
  illustration-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "12px"
  date-pill:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 14px"
---

# Design System: Camila

## Overview

**Creative North Star: "插畫本與攤位小物"**

這是一位日系插畫同人作者的個人小站。橘髮大頭貼是主視覺插畫（KV），其他所有東西都像她在同人場攤位上擺的小物：白邊插畫卡用紙膠帶貼住、貼紙裁出白色外框、漫畫對話框、緞帶與雛菊。版面不是格線上的一排等大卡片，而是被「親手擺上去」的物件，每件都帶一點旋轉。

色彩全部取自大頭貼本身：頭髮橘、緞帶的暖黑、臉頰粉、白襯衫的紙白，加上首屏一片柔和的淡天空讓雲有地方住。整頁由天空開始，經過白紙、淡橘作品區，最後收在一整片頭髮橘。線條語言是動漫上色的暖黑描邊（字標、對話框、貼紙外框），不是冷灰或純黑。

動態只有一種語法：柔和回彈的「落定」（`cubic-bezier(0.34, 1.4, 0.64, 1)`）。卡片落定、雲被戳時縮放、按鈕浮起、對話框彈出，全部用這一條曲線；只有流星彩蛋用自己的劃落曲線。

**Key Characteristics:**
- 一套圓體（Chiron GoRound TC）包辦所有字級，大標用 900 粗。
- 暖黑（ink）描邊是動漫線稿語言，用在字標、對話框、貼紙與按鈕外框。
- 物件微旋轉（-3deg 到 +1.5deg），相鄰物件左右交錯。
- 白色貼紙邊：`0 0 0 6px` 的紙白外圈加上暖色柔和陰影。
- 區塊之間以圓弧蕾絲邊（scallop）銜接，不用直線分隔。
- 只有一種動態曲線：回彈落定。

## Colors

全部取色自大頭貼：一個高彩的頭髮橘當主角，暖黑當線稿，其餘是紙白、淡橘、淡天空。

### Primary
- **頭髮橘 Hair Orange** (orange)：品牌主色。超大字標填色、實心按鈕、連結圖示圓底、雛菊花瓣、頁尾整片背景、作品區網點。
- **深橘 Ember Orange** (orange-deep)：需要在白或淡色上當文字讀的橘：小字標、許願次數、`work-next` 文字、興趣圖示筆畫、focus 外框。

### Secondary
- **臉頰粉 Cheek Pink** (pink)：只當點綴：左側紙膠帶格紋、`::selection` 反白。

### Tertiary
- **淡天空 Pale Sky** (sky)：只用在首屏背景，讓雲有地方住。
- **天空陰影 Sky Shade** (sky-deep)：雲朵下緣的陰影層。

### Neutral
- **暖黑 Ribbon Ink** (ink)：本文顏色、所有描邊線稿、自我介紹標籤條與日期膠囊的底色。
- **暖灰褐 Soft Ink** (ink-soft)：說明文字（caption）、作品介紹、提示、帳號 handle。
- **紙白 Paper** (paper)：頁面底色、所有卡片與貼紙、雲的本體。
- **淡橘紙 Peach Paper** (orange-soft)：作品區整片背景、興趣圖示圓底、連結貼紙 hover 底色。

### Named Rules
**The 取自大頭貼 Rule.** 新顏色只能從大頭貼插畫裡取；目前的九個 token 就是全部調色盤。灰色一律帶暖褐（ink / ink-soft），不用冷灰或 `#000`。

**The 深橘讀字 Rule.** 頭髮橘（orange）在白底上只當色塊、圖形或大字；要當成小字閱讀時改用深橘（orange-deep）。

## Typography

**Display Font:** Chiron GoRound TC（備援 Noto Sans TC、system-ui）
**Body Font:** 同上，只有一套字

**Character:** 圓潤、厚實、可愛但不幼稚的圓體；靠字重（500 / 700 / 900）而不是換字體建立層級。

### Hierarchy
- **Display**（900，`--wm` 隨首屏高度與寬度縮放，line-height 0.95）：只用在首屏「Camila」字標。橘色填色、暖黑描邊（0.035em）、外圈 0.11em 紙白貼紙邊，「i」的點由一朵雛菊取代。
- **Headline**（900，clamp 30–44px，1.2）：段落大標，前面接一個小插畫（雛菊、雲、紙飛機）。
- **Title**（900，clamp 28–36px，1.2）：作品名稱、預設封面的標題膠囊。
- **Body**（500，16px，1.7）：所有內文；作品介紹最多 32em 寬。導覽、按鈕、貼紙文字用 700，連結名稱用 900 / 20px。
- **Label**（700，14px，letter-spacing 0.06em，tabular-nums）：日期膠囊。

### Named Rules
**The 一套圓體 Rule.** 整站只用 Chiron GoRound TC。不加襯線體、等寬字或手寫字當「點綴」。

**The 粗才可愛 Rule.** 標題一律 900。圓體在細字重下會變得空洞，失去貼紙感。

## Layout

一頁式，由上而下：首屏天空 → 最近沉迷（白）→ 作品（淡橘）→ 紙飛機（白）→ 頁尾（頭髮橘）。

- **首屏**：`min-height: clamp(640px, 100svh, 1040px)`，三欄格線（`1fr auto 1fr`），頂部是小字標加三個錨點導覽，中間是 KV，底部一列天氣／往下飄／提示。KV 的所有尺寸都跟著 `--wm`（字標字級）走，插畫卡永遠蓋住字標左半。
- **段落**：上下 `clamp(80px, 10vw, 128px)`，左右 `max(clamp(16px, 5vw, 64px), (100% - 1080px) / 2)`，內容最寬 1080px。
- **兩欄段落**：興趣、紙飛機用 `1fr 1fr` 左標題右內容（間距 40px）；作品用 `1.1fr 1fr` 左封面右文字，作品區標題置中。
- **節奏**：12 / 24 / 40 / 56px 是重複出現的間距；標題到內容 56px。
- **手機（≤760px）**：全部改單欄置中；`--wm` 改為 `min(26vw, 7.5rem)`，插畫卡寬 `min(84vw, 400px)`；雲縮小並移到插畫卡上方；首屏不再強制滿高。

## Elevation & Depth

深度靠「紙片疊在紙上」的物理感：柔和、偏暖褐的投影，加上紙白外圈，不用冷灰陰影或玻璃效果。

### Shadow Vocabulary
- **紙片投影**（`--shadow`）：插畫卡、作品封面卡、貼紙、按鈕 hover。
- **貼紙白邊**（`0 0 0 6px var(--paper)` 疊在 `--shadow` 之前）：興趣貼紙與連結貼紙的裁切白邊。
- **字標貼紙陰影**（`drop-shadow(0 8px 14px rgb(110 52 22 / 0.25))`）：只用在字標的白色外圈。

### Named Rules
**The 暖色陰影 Rule.** 陰影色一律是暖褐 `rgb(110 52 22 / …)`，柔和、有模糊。不用硬邊位移陰影。

## Shapes

圓潤是預設：膠囊（999px）給所有按鈕、標籤、導覽與日期；卡片 22–24px，內圖 12–14px；連結貼紙 28px；紙膠帶 3px。

- **描邊**：互動與貼紙物件用 2px 暖黑實線；標題膠囊與漫畫對話框用 2.5–3px。`work-next`（還沒來的東西）用 2px 橘色虛線。
- **漫畫對話框**：`border-radius: 50%` 的橢圓加上兩層 border 三角形組成的尖尾（外黑內白）。用在彩蛋氣泡與「丟紙飛機給我」標題。
- **圓弧蕾絲邊**：`radial-gradient(circle at 50% 100%, … 15px, transparent 16px) 0 0 / 34px 18px repeat-x`，用在每個色塊交界。
- **格紋**：兩層 linear-gradient 疊出的橘白（或粉白）格紋，用在紙膠帶（12px）與預設封面（36px）。
- **網點**：作品區上緣 11px 間距的橘色圓點，往下漸隱。
- **旋轉**：物件帶 -3deg 到 +1.5deg 的微旋轉，相鄰物件交錯方向。

## Components

### Buttons
柔軟、有手感，像壓克力小牌。
- **Shape:** 膠囊（999px），2px 暖黑描邊。
- **Solid:** 頭髮橘底、暖黑字、700，`12px 26px`。
- **Outline:** 紙白底，其餘相同。
- **Hover / Focus:** 以落定曲線往上浮 3px 並出現紙片投影；focus 是 3px 深橘外框、offset 3px。

### Chips（興趣貼紙）
- **Style:** 紙白膠囊、2px 暖黑描邊、6px 紙白外圈加紙片投影，20px / 700 字。左邊 44px 淡橘圓底配深橘線條圖示。
- **State:** 靜態；奇數 -2deg、偶數 +1.5deg。

### Cards / Containers（白邊插畫卡）
- **Corner Style:** 外框 22–24px，內圖 12–14px。
- **Background:** 紙白，內距 12px。
- **Shadow Strategy:** 紙片投影。
- **Border:** 無，白邊本身就是框。
- **裝飾:** 一到兩條紙膠帶（112×30px，-9deg / +7deg）跨在上緣；首屏插畫卡 -2.5deg 並以落定動畫進場。

### Navigation
- 頂部左邊是深橘 900 小字標，右邊三個錨點連結（700，`6px 14px` 膠囊），hover 時底色變紙白。手機上置中換行、縮小內距。

### 連結貼紙（紙飛機）
- 28px 圓角、2px 暖黑描邊、6px 紙白外圈；56px 頭髮橘圓形圖示裝紙飛機。hover 時浮起 3px、底色變淡橘、圖示以落定曲線轉 -14deg。

### 標籤條與日期膠囊
- 暖黑底、紙白字的膠囊：首屏自我介紹（17px / 700，-1deg，左端掛一個緞帶）與作品日期（Label 字級）。

### 插畫小物（Ornaments）
- 全部是內嵌 SVG：雲（紙白本體 + 天空陰影層）、12 瓣雛菊（頭髮橘花瓣 + 紙白花心）、四角星、黑白緞帶、紙飛機。純裝飾時一律 `aria-hidden`。首屏的雲是可戳的按鈕（最小 44px）。

## Do's and Don'ts

### Do:
- **Do** 從大頭貼取色，九個 token 之外不新增顏色。
- **Do** 讓物件帶 -3deg 到 +1.5deg 的微旋轉，相鄰物件交錯方向。
- **Do** 用 2px 暖黑（ink）描邊當線稿；漫畫對話框與標題膠囊用 3px。
- **Do** 用紙白外圈加暖色紙片投影（`--shadow`）表現貼紙與卡片。
- **Do** 用圓弧蕾絲邊銜接不同底色的區塊。
- **Do** 所有動態都用 `--settle` 回彈曲線，並在 `prefers-reduced-motion` 時全部關閉。
- **Do** 白底上的小字橘色用 orange-deep。

### Don't:
- **Don't** 引入第二套字體；只用 Chiron GoRound TC。
- **Don't** 用冷灰、純黑 `#000` 或冷色陰影。
- **Don't** 用硬邊位移陰影或玻璃擬態。
- **Don't** 把內容排成一排等大、無旋轉的卡片格線。
- **Don't** 為物件新增 `--settle` 以外的動態曲線；唯一例外是點天空的流星彩蛋（`cubic-bezier(0.16, 1, 0.3, 1)`）。
