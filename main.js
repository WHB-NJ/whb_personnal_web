/* 王赫邦个人网站 · 交互脚本 · 中英双语 */

// ---------- 导航栏滚动样式 ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
reveals.forEach(el => io.observe(el));

// ---------- 数字 count-up ----------
const nums = document.querySelectorAll('.stat .num');
const numIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isFloat = String(target).includes('.');
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const v = target * eased;
      el.textContent = (isFloat ? v.toFixed(2) : Math.round(v).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (isFloat ? target.toFixed(2) : target.toLocaleString()) + suffix;
    };
    requestAnimationFrame(tick);
    numIO.unobserve(el);
  });
}, { threshold: 0.6 });
nums.forEach(el => numIO.observe(el));

// ---------- Hero 鼠标视差（仅桌面）----------
if (window.matchMedia('(hover: hover)').matches) {
  const heroBg = document.querySelector('.hero-bg');
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroBg.style.transform = `translate3d(${x * 30}px, ${y * 30}px, 0) scale(1.05)`;
  });
  hero.addEventListener('mouseleave', () => {
    heroBg.style.transform = '';
  });
}

// ---------- 平滑滚动到锚点 ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    const y = t.getBoundingClientRect().top + window.scrollY - 48;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// ---------- Google Docs Viewer 动态构造 ----------
// 部署后根据当前页面 URL 自动构造绝对地址，无需手改
function buildDocUrls() {
  document.querySelectorAll('a[data-doc]').forEach(a => {
    const rel = a.dataset.doc;
    const abs = new URL(rel, window.location.href).href;
    a.href = 'https://docs.google.com/gview?embedded=true&url=' + encodeURIComponent(abs);
  });
}
buildDocUrls();

// ---------- 中英双语切换 ----------
const langToggle = document.getElementById('langToggle');
const translatable = () => document.querySelectorAll('[data-zh][data-en]');

function applyLang(lang) {
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  translatable().forEach(el => {
    const txt = el.getAttribute('data-' + lang);
    if (txt != null && txt !== '') el.textContent = txt;
  });
  langToggle.classList.toggle('is-en', lang === 'en');
  langToggle.classList.toggle('is-zh', lang === 'zh');
  try { localStorage.setItem('whb-lang', lang); } catch (e) {}
}

let currentLang = 'zh';
try {
  const saved = localStorage.getItem('whb-lang');
  if (saved === 'en' || saved === 'zh') currentLang = saved;
} catch (e) {}
applyLang(currentLang);

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  applyLang(currentLang);
});
