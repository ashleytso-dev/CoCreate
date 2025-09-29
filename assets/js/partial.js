(async () => {
  const inject = async (sel, url) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const res = await fetch(url, { cache: "no-store" });
    el.innerHTML = await res.text();
  };

  // 依你的檔案層級調整相對路徑
  await inject("#site-header", "../layout/header.ejs");
  await inject("#site-footer", "../layout/footer.ejs");
})();
