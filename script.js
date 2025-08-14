// ---- .product をスクロールでフェードイン（下から） ----
document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");

  // ユーザーが「動きを減らす」を選んでいたら、即表示に切り替え
  const preferReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (preferReduced) {
    products.forEach(el => el.classList.add("show"));
    return;
  }

  // ちょっと見えたら発火（下 10% はみ出した時点で開始）
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target); // 1回だけ発火
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );

  products.forEach(el => {
    // 初期状態クラス（CSSで非表示・下にズラす）
    el.classList.add("reveal-from-bottom");
    observer.observe(el);
  });
});
