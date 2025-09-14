# CoCreate 切版專題 — 資料結構與說明

> 目標：讓每位夥伴「不用想太多環境」，直接專心做 **HTML/SCSS 切版**。
> 本文件定義資料結構、命名規範、全域設定與常用操作。

---

## 確認 Node.js 版本
  - 專案的 Node.js 版本需為 v18 以上
  - 查看自己版本指令：`node -v`


## 1) 快速開始

```bash
- `npm install` - 初次使用，需要使用 npm install 來安裝套件
- `npm run dev` - 執行開發模式
  - 若沒有自動開啟瀏覽器，可嘗試手動在瀏覽器上輸入
    `http://localhost:5173/<專案名稱>/pages/index.html`
```

每頁 HTML 結尾請加：
```html
<script type="module" src="/main.js"></script>
```
> `main.js` 只會 import `assets/scss/all.scss`，**不含互動邏輯**。

---

## 2) 檔案結構

```
project/
├─ pages/                      # 多頁入口（平鋪）
│  ├─ index.html
│  ├─ find-partners.html
│  ├─ partner-detail.html
│  ├─ about.html
│  ├─ wall.html
│  ├─ login.html
│  ├─ register.html
│  ├─ forgot-password.html
│  └─ member-center.html
│
├─ assets/
│  └─ scss/
│     ├─ all.scss                  # SCSS 入口（唯一被 JS 引入）
│     ├─ utils/                    # 對接 Bootstrap 的覆寫點
│     │  ├─ _utilities.scss
│     │  └─ _variables.scss
│     ├─ base/                     # 全域基礎樣式（不綁頁面）
│     │  └─ _base.scss
│     ├─ components/               # 可重用元件（切版模板）
│     │  ├─ _button.scss
│     │  ├─ _card.scss
│     │  └─ _forms.scss
│     └─ pages/                    # 各頁專屬樣式（必要時再建）
│        ├─ _find-partners.scss
|        ├─ _partner-detail.scss
|        ├─ _about.scss
|        ├─ _wall.scss
|        ├─ _login.scss
|        ├─ _register.scss
|        ├─ _forgot-password.scss
|        └─ _member-center.scss
│
├─ main.js                         # 只 import SCSS
├─ vite.config.js                  # MPA (pages/*.html) 輸入、base、alias
├─ postcss.config.cjs              # Autoprefixer
└─ package.json
```

---

## 3) SCSS 匯入順序（非常重要）

`assets/scss/all.scss`：

```scss
@import 'bootstrap/scss/functions';

/* 把 Tokens 映射到 Bootstrap 變數 + utilities 擴充 */
@import './utils/variables';

/* 專案基礎與元件 */
@import './base/globals';
@import './components/button';
@import './components/card';
@import './components/forms';

/* 頁面專屬（需要時再加） */
@import './pages/member-center';
```

---

## 4) 設計 Tokens（可直接照設計稿改）

### 4.1 色彩
```scss
$neutral-950: #0A0A0A;
$neutral-800: #262626;
$neutral-600: #525252;
$neutral-400: #A3A3A3;
$neutral-200: #E5E5E5;
$neutral-100: #F0F0F0;
$neutral-50:  #FFFFFF;

$primary-green-700: #1B4912;
$primary-green-500: #5B8C30;
$primary-green-200: #EFF2DC;
$primary-yellow: #FAD349;
$primary-orange: #F2A61C;
```

### 4.2 文字
```scss
$font-family-sans-serif: 'Noto Sans TC', 'Poppins', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Microsoft JhengHei', 'Noto Sans', sans-serif;

$font-sizes: (
  display: 5rem,  /* 80px */
  h1: 3rem,       /* 48px */
  h2: 2.5rem,     /* 40px */
  h3: 2rem,       /* 32px */
  h4: 1.75rem,    /* 28px */
  h5: 1.5rem,     /* 24px */
  h6: 1.25rem,    /* 20px */
  body: 1rem,     /* 16px */
  small: .875rem, /* 14px */
  tiny: .75rem    /* 12px */
);
$line-height-body: 1.5;
$line-height-heading: 1.2;
$line-height-display: 1.1;
```

### 4.3 間距 **px → rem**
```scss
$spacer: 1rem !default;
// 自訂 spacers map (依設計稿 px → rem)
$spacers: (
  0: 0,          // 0px
  4: 0.25rem,    // 4px
  8: 0.5rem,     // 8px
  12: 0.75rem,   // 12px
  14: 0.875rem,  // 14px
  16: 1rem,      // 16px
  20: 1.25rem,   // 20px
  24: 1.5rem,    // 24px
  36: 2.25rem,   // 36px
  40: 2.5rem,    // 40px
  48: 3rem,      // 48px
  80: 5rem,      // 80px
  120: 7.5rem    // 120px
);
```
> HTML 可直接用 `mb-24`、`pt-40`、`gap-12` 等。

---

## 5) 對接 Bootstrap（utils/_variables.scss）

### 5.1 文字與尺寸
```scss
$font-family-base: $font-family-sans-serif;
$font-weight-base: 400;
$headings-font-weight: 700;
$line-height-base: $line-height-body;
$headings-line-height: $line-height-heading;
$display-line-height: $line-height-display;
$enable-rfs: false;

$h1-font-size: map-get($font-sizes, h1);
$h2-font-size: map-get($font-sizes, h2);
$h3-font-size: map-get($font-sizes, h3);
$h4-font-size: map-get($font-sizes, h4);
$h5-font-size: map-get($font-sizes, h5);
$h6-font-size: map-get($font-sizes, h6);

$display-font-sizes: (
  1: map-get($font-sizes, display),
  2: map-get($font-sizes, h1),
  3: map-get($font-sizes, h2),
  4: map-get($font-sizes, h3),
  5: map-get($font-sizes, h4),
  6: map-get($font-sizes, h5)
);
```

### 5.2 主題顏色（可使用 `text-*` / `bg-*` / `border-*` / `btn-*` ）
```scss
/* 把 tokens 掛入 $theme-colors，會自動生成 text-*/bg-*/border-*/btn-* */
$theme-colors: map-merge(
  $theme-colors,
  (
    "primary-green-500": $primary-green-500,
    "primary-green-700": $primary-green-700,
    "primary-yellow":    $primary-yellow,
    "primary-orange":    $primary-orange,
    "neutral-600": $neutral-600,
    "neutral-950": $neutral-950
  )
);
```

> 例：`<span class="text-primary-green-500">綠色字</span>`、`<div class="bg-primary-orange">橘色底</div>`、`<button class="btn btn-primary-green-500">綠色按鈕</button>`。

### 5.3 圓角（Radius）
```scss
$radius-16: 1rem;   // 16px
$radius-36: 2.25rem;// 36px
$radius-40: 2.5rem; // 40px
$radius-80: 5rem;   // 80px
$radius-240: 15rem; // 240px

$border-radius:    $radius-16;
$border-radius-sm: $radius-16;
$border-radius-lg: $radius-36;
$border-radius-pill: 50rem;

/* 產生 .rounded-16 / -36 / -40 / -80 / -240 */
$utilities: map-merge(
  $utilities,
  (
    "rounded": (
      property: border-radius,
      class: rounded,
      values: (
        null: $border-radius,
        0: 0,
        16: $radius-16,
        36: $radius-36,
        40: $radius-40,
        80: $radius-80,
        240: $radius-240,
        circle: 50%,
        pill: $border-radius-pill
      )
    )
  )
);
```

### 5.4 文字大小 Utilities（可使用 `.fs-base/.fs-small/.fs-tiny`）
```scss
$utilities: map-merge(
  $utilities,
  (
    "font-size": (
      property: font-size,
      class: fs,
      values: (
        base: map-get($font-sizes, body),
        small: map-get($font-sizes, small),
        tiny: map-get($font-sizes, tiny)
      )
    )
  )
);
```

---

## 6) HTML 寫法建議

- **命名空間**：每頁 `<main class="page-<檔名>">`，對應 `assets/scss/pages/_<檔名>.scss`。  
- **間距**：優先用 utilities：`mb-24` / `px-16` / `gap-12`。  
- **字色**：`text-primary-green-500` / `textprimary--orange`。  
- **按鈕字色被覆蓋？** 使用 CSS 變數覆寫：  
  ```html
  <button class="btn btn-primary-green-500" style="--bs-btn-color: rgba(var(--bs-orange-rgb),1);">
    綠底橘字
  </button>
  ```

---

## 7) 元件模板與展示

- 元件樣式集中於 `assets/scss/components/*`（例如 `_card.scss`, `_button.scss`）。  
- 另外以 `pages/components.html` 當元件展示頁（複製元件範例使用）。  
