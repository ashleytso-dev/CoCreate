import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap'

// import 'bootstrap-icons/font/bootstrap-icons.css'

// 匯入 Bootstrap JS 與 Collapse 元件
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Collapse } from 'bootstrap';

// 取得側邊導覽元素與切換按鈕
const navEl = document.getElementById('memberNav');
const btnEl = document.getElementById('memberNavToggler');

// 確保 DOM 存在，且避免在 Vite HMR 下重複綁定
if (navEl && btnEl && !navEl.dataset.bound) {

// 建立（或取得既有的）Collapse 實例
// { toggle: false } => 預設不要自動展開/收合，完全交給我們手動控制
const collapse = Collapse.getOrCreateInstance(navEl, { toggle: false });

// 綁定切換按鈕的點擊事件 → 呼叫 collapse.toggle()
// 功能：讓側邊導覽在小螢幕能展開/收起
btnEl.addEventListener('click', () => collapse.toggle());

  // 在元素上打標記，避免 Vite 開發環境下 HMR (熱重載) 重複掛監聽器
navEl.dataset.bound = '1';
}

console.log('Hello world');
