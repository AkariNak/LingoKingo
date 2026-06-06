// ── SHARED STATE & UTILITIES ──────────────────────────────────────────────────

const LANGS = {
  korean: {
    label: 'Korean', script: '한국어', flag: '🇰🇷',
    placeholder: 'search hangul, romanization, or meaning…',
    words: typeof KOREAN_WORDS !== 'undefined' ? KOREAN_WORDS : [],
    sentences: () => (typeof KOREAN_SENTENCES !== 'undefined' ? KOREAN_SENTENCES : []),
    grammar: () => (typeof GRAMMAR !== 'undefined' ? GRAMMAR.korean : []),
  },
  italian: {
    label: 'Italian', script: 'Italiano', flag: '🇮🇹',
    placeholder: 'search Italian, pronunciation, or meaning…',
    words: typeof ITALIAN_WORDS !== 'undefined' ? ITALIAN_WORDS : [],
    sentences: () => (typeof ITALIAN_SENTENCES !== 'undefined' ? ITALIAN_SENTENCES : []),
    grammar: () => (typeof GRAMMAR !== 'undefined' ? GRAMMAR.italian : []),
  }
};

let curLang = localStorage.getItem('lf-lang') || 'korean';
let curTab  = localStorage.getItem('lf-tab')  || 'vocab';

// ── THEME ──
let theme = localStorage.getItem('lf-theme') || 'dark';

function applyTheme(t) {
  document.body.className = t;
  localStorage.setItem('lf-theme', t);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = t === 'dark' ? 'light mode' : 'dark mode';
}

// ── LANGUAGE SWITCH ──
function switchLang(lang) {
  curLang = lang;
  localStorage.setItem('lf-lang', lang);
  const L = LANGS[lang];
  // update header
  const flagEl = document.getElementById('langFlag');
  const lblEl  = document.getElementById('langLabel');
  if (flagEl) flagEl.textContent = L.flag;
  if (lblEl)  lblEl.textContent  = L.label;
  // update search placeholder
  const srch = document.getElementById('searchInput');
  if (srch) srch.placeholder = L.placeholder;
  // mark active option
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
  document.getElementById('langMenu')?.classList.remove('open');
  // re-render current tab
  renderTab(curTab);
}

function toggleLangMenu() {
  document.getElementById('langMenu')?.classList.toggle('open');
}

document.addEventListener('click', e => {
  const btn  = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  if (menu && btn && !btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ── TAB ROUTING ──
function switchTab(tab) {
  curTab = tab;
  localStorage.setItem('lf-tab', tab);
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderTab(tab);
}

function renderTab(tab) {
  const main = document.getElementById('mainContent');
  if (!main) return;
  if (tab === 'vocab')    { main.innerHTML = ''; renderVocab(main); }
  if (tab === 'practice') { main.innerHTML = ''; renderPractice(main); }
  if (tab === 'grammar')  { main.innerHTML = ''; renderGrammar(main); }
}

// ── SPEECH SYNTHESIS ──
function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'korean' ? 'ko-KR' : 'it-IT';
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// ── UTILITIES ──
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}
function load(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch(e) { return def; }
}
