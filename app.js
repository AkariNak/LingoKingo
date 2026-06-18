// ── SHARED STATE ──────────────────────────────────────────────────────────────
const SITUATIONS = [
  {key:'airport',       label:'at the airport',    color:'#7a8cc8'},
  {key:'food',          label:'ordering food',      color:'#c8a87a'},
  {key:'restaurant',    label:'at a restaurant',    color:'#7ac8a0'},
  {key:'shopping',      label:'shopping',           color:'#c87aa8'},
  {key:'meeting',       label:'meeting people',     color:'#7ac8c8'},
  {key:'getting_around',label:'getting around',     color:'#c8c87a'},
  {key:'emergency',     label:'emergencies',        color:'#c87a7a'},
  {key:'dating',        label:'dating & texting',   color:'#a87ac8'},
];
let activeSituation = null;
let activeScripts   = new Set();

const FONT_SIZES  = ['sm','md','lg','xl','xxl'];
const FONT_LABELS = {sm:'small',md:'medium',lg:'large',xl:'x-large',xxl:'xx-large'};
let fontSize = localStorage.getItem('lf-fontsize') || 'lg';
if (!FONT_SIZES.includes(fontSize)) fontSize = 'lg';

let showRomanization = localStorage.getItem('lf-show-ro') !== 'false';

const PREMADE_DECKS = {
  korean: [
    {name:'Korean Essentials', color:'#c8a87a', filter: w => w.freq >= 9 && w.pos !== 'particle'},
    {name:'K-pop & Texting',   color:'#c87aa8', filter: w => w.register === 'casual' || (w.sit && w.sit.includes('dating'))},
    {name:'Survival Korean',   color:'#7ac8a0', filter: w => w.sit && (w.sit.includes('airport') || w.sit.includes('getting_around') || w.sit.includes('emergency'))},
  ],
  japanese_hiragana: [{name:'Hiragana (all 46)', color:'#7ac8a0', filter: w => w.pos === 'hiragana'}],
  japanese_katakana: [{name:'Katakana (all 46)', color:'#7a8cc8', filter: w => w.pos === 'katakana'}],
  japanese_kanji:    [{name:'Essential Kanji',   color:'#c87aa8', filter: w => w.pos === 'kanji'}],
  japanese_dakuten:  [
    {name:'Hiragana Accents', color:'#7ac8c8', filter: w => w.pos === 'hiragana_d'},
    {name:'Katakana Accents', color:'#c8c87a', filter: w => w.pos === 'katakana_d'},
  ],
  japanese_vocab:     [{name:'Japanese Vocabulary', color:'#7ac8a0', filter: w => w.pos !== 'kanji' && w.pos !== 'hiragana' && w.pos !== 'katakana' && w.pos !== 'hiragana_d' && w.pos !== 'katakana_d' && w.script !== 'kanji' && !w.song}],
  japanese_yofukashi:[{name:'よふかしのうた',  color:'#a87ac8', filter: w => w.song === 'yofukashi'}],
  japanese_kawaikute:[{name:'可愛くてごめん', color:'#c87aa8', filter: w => w.song === 'kawaikute'}],
  italian: [
    {name:'Italian Essentials', color:'#c8a87a', filter: w => w.freq >= 9},
    {name:'Italian Verbs',      color:'#7a8cc8', filter: w => w.pos === 'verb'},
    {name:'Italian for Travel', color:'#7ac8a0', filter: w => w.sit && (w.sit.includes('airport') || w.sit.includes('getting_around') || w.sit.includes('restaurant') || w.sit.includes('emergency'))},
  ],
};

const LANGS = {
  korean:   {label:'Korean',   script:'한국어',  flag:'🇰🇷', placeholder:'search hangul, romanization, or meaning…',  words: KOREAN_WORDS,   sentences: () => KOREAN_SENTENCES,   grammar: () => GRAMMAR.korean},
  italian:  {label:'Italian',  script:'Italiano',flag:'🇮🇹', placeholder:'search Italian, pronunciation, or meaning…', words: ITALIAN_WORDS,  sentences: () => ITALIAN_SENTENCES,  grammar: () => GRAMMAR.italian},
  japanese: {label:'Japanese', script:'日本語',  flag:'🇯🇵', placeholder:'search hiragana, romaji, or meaning…',       words: JAPANESE_WORDS, sentences: () => JAPANESE_SENTENCES, grammar: () => GRAMMAR.japanese},
};

let curLang = localStorage.getItem('lf-lang') || 'korean';
if (!LANGS[curLang]) curLang = 'korean';
let curTab  = localStorage.getItem('lf-tab')  || 'vocab';
let theme   = localStorage.getItem('lf-theme') || 'dark';

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} }
function load(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch(e) { return def; } }
function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'korean' ? 'ko-KR' : lang === 'italian' ? 'it-IT' : 'ja-JP';
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return r+','+g+','+b;
}
function showToast(msg, duration) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.pointerEvents = 'auto';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; t.style.pointerEvents = 'none'; }, duration || 2800);
}

// ── STREAK & ACHIEVEMENTS ─────────────────────────────────────────────────────
// ── ACHIEVEMENT ICONS (SVG, no emoji) ────────────────────────────────────────
const ACHIEVEMENT_ICONS = {
  first_deck:   `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="20" height="26" rx="2" stroke="currentColor" stroke-width="2"/><rect x="8" y="2" width="20" height="26" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><line x1="11" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="16" x2="21" y2="16" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="20" x2="17" y2="20" stroke="currentColor" stroke-width="1.5"/></svg>`,
  streak_3:     `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3 C16 3 22 10 22 17 C22 21 19 25 16 25 C13 25 10 21 10 17 C10 13 13 9 16 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 15 C16 15 19 18 19 21 C19 23 17.6 25 16 25 C14.4 25 13 23 13 21 C13 18 16 15 16 15Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="16" y1="25" x2="16" y2="29" stroke="currentColor" stroke-width="2"/></svg>`,
  streak_7:     `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,3 19,12 29,12 21,18 24,28 16,22 8,28 11,18 3,12 13,12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  streak_14:    `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="2.5" fill="currentColor"/></svg>`,
  streak_30:    `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4 L19.5 12.5 L29 13.5 L22.5 19.5 L24.5 29 L16 24.5 L7.5 29 L9.5 19.5 L3 13.5 L12.5 12.5 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="16" cy="16" r="4" stroke="currentColor" stroke-width="1.5"/></svg>`,
  streak_100:   `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4 L19 11 L27 11 L21 16 L23 24 L16 19 L9 24 L11 16 L5 11 L13 11 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 8 L18 13 L23 13 L19 16.5 L20.5 22 L16 19 L11.5 22 L13 16.5 L9 13 L14 13 Z" stroke="currentColor" stroke-width="1" fill="none"/></svg>`,
  words_50:     `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="14" height="18" rx="2" stroke="currentColor" stroke-width="2"/><line x1="10" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="17" x2="16" y2="17" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="21" x2="14" y2="21" stroke="currentColor" stroke-width="1.5"/><rect x="12" y="5" width="14" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  words_200:    `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="10" width="12" height="16" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="7" width="12" height="16" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="4" width="12" height="16" rx="1.5" stroke="currentColor" stroke-width="2"/><line x1="21" y1="9" x2="25" y2="9" stroke="currentColor" stroke-width="1.5"/><line x1="21" y1="13" x2="25" y2="13" stroke="currentColor" stroke-width="1.5"/></svg>`,
  practice_10:  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="24" x2="24" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="22" cy="10" r="3" stroke="currentColor" stroke-width="2"/><rect x="6" y="22" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`,
  practice_100: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="7" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>`,
  perfect_5:    `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="5,17 12,24 27,8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="27" cy="8" r="1" fill="currentColor"/></svg>`,
  all_langs:    `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/><ellipse cx="16" cy="16" rx="5" ry="12" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="10" x2="27" y2="10" stroke="currentColor" stroke-width="1"/><line x1="5" y1="22" x2="27" y2="22" stroke="currentColor" stroke-width="1"/></svg>`,
  songs_deck:   `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24 L12 10 L26 7 L26 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="24" r="3" stroke="currentColor" stroke-width="2"/><circle cx="23" cy="21" r="3" stroke="currentColor" stroke-width="2"/></svg>`,
  shield_used:  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4 L28 9 L28 18 C28 24 22 29 16 30 C10 29 4 24 4 18 L4 9 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polyline points="11,16 15,20 22,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
function achievementIcon(id, color, size) {
  const svg = ACHIEVEMENT_ICONS[id] || ACHIEVEMENT_ICONS.first_deck;
  const s = size || 28;
  return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${s}px;height:${s}px;color:${color};flex-shrink:0">${svg}</span>`;
}

const ACHIEVEMENTS = [
  {id:'first_deck',   name:'First Deck',      desc:'Create your first deck',                color:'#c8a87a'},
  {id:'streak_3',     name:'On Fire',          desc:'3 day streak',                          color:'#c87a7a'},
  {id:'streak_7',     name:'Week Warrior',     desc:'7 day streak — streak shield unlocked', color:'#c8c87a'},
  {id:'streak_14',    name:'Dedicated',        desc:'14 day streak',                         color:'#7ac8a0'},
  {id:'streak_30',    name:'Monthly Master',   desc:'30 day streak',                         color:'#a87ac8'},
  {id:'streak_100',   name:'Diamond Mind',     desc:'100 day streak',                        color:'#7a8cc8'},
  {id:'words_50',     name:'Word Collector',   desc:'Add 50 words to decks',                 color:'#7ac8a0'},
  {id:'words_200',    name:'Vocabulary Rich',  desc:'Add 200 words to decks',                color:'#c87aa8'},
  {id:'practice_10',  name:'First Steps',      desc:'Complete 10 practice exercises',        color:'#7ac8c8'},
  {id:'practice_100', name:'Sharp Shooter',    desc:'Complete 100 practice exercises',       color:'#c8a87a'},
  {id:'perfect_5',    name:'Perfect Run',      desc:'Get 5 correct in a row',                color:'#c8c87a'},
  {id:'all_langs',    name:'Polyglot',         desc:'Study 5 flashcards in all three languages',             color:'#a87ac8'},
  {id:'songs_deck',   name:'Music Fan',        desc:'Add words from a song deck',            color:'#c87aa8'},
  {id:'shield_used',  name:'Shield Bearer',    desc:'Use your streak shield',                color:'#7a8cc8'},
];

function getStreak() {
  return {
    count:  parseInt(localStorage.getItem('lf-streak-count')  || '0'),
    lastDay:localStorage.getItem('lf-streak-lastday') || '',
    shield: parseInt(localStorage.getItem('lf-streak-shield') || '0'),
  };
}
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function updateStreak() {
  const today = todayStr();
  const s = getStreak();
  if (s.lastDay === today) return;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
  const yStr = yesterday.getFullYear() + '-' + String(yesterday.getMonth()+1).padStart(2,'0') + '-' + String(yesterday.getDate()).padStart(2,'0');
  let newCount;
  if (s.lastDay === yStr) {
    newCount = s.count + 1;
  } else if (s.lastDay === '' || s.count === 0) {
    newCount = 1;
  } else {
    if (s.shield > 0) {
      localStorage.setItem('lf-streak-shield', String(s.shield - 1));
      unlockAchievement('shield_used');
      showToast('🛡️ streak shield used! streak protected at ' + s.count + ' days', 4000);
      localStorage.setItem('lf-streak-lastday', today);
      return;
    }
    newCount = 1;
  }
  localStorage.setItem('lf-streak-count', String(newCount));
  localStorage.setItem('lf-streak-lastday', today);
  if (newCount >= 3)   unlockAchievement('streak_3');
  if (newCount >= 7)   { unlockAchievement('streak_7'); if (s.shield === 0) localStorage.setItem('lf-streak-shield','1'); }
  if (newCount >= 14)  unlockAchievement('streak_14');
  if (newCount >= 30)  { unlockAchievement('streak_30'); const sh = getStreak().shield; localStorage.setItem('lf-streak-shield', String(sh+1)); }
  if (newCount >= 100) unlockAchievement('streak_100');
  if (newCount > 1) {
    const msgs = {3:'🔥 3 day streak!', 7:'⚡ one week streak!', 14:'🌟 two week streak!', 30:'🏆 30 days — incredible!', 100:'💎 100 days. legendary.'};
    if (msgs[newCount]) showToast(msgs[newCount], 5000);
    else if (newCount % 10 === 0) showToast('🔥 ' + newCount + ' day streak!', 4000);
  }
}

function getUnlocked() { try { return JSON.parse(localStorage.getItem('lf-achievements') || '[]'); } catch(e) { return []; } }
function unlockAchievement(id) {
  const unlocked = getUnlocked();
  if (unlocked.includes(id)) return;
  unlocked.push(id);
  localStorage.setItem('lf-achievements', JSON.stringify(unlocked));
  const a = ACHIEVEMENTS.find(x => x.id === id);
  if (!a) return;
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--sf);border:1px solid ${a.color};border-radius:12px;padding:12px 20px;font-family:'DM Mono',monospace;font-size:.78rem;color:var(--tx);z-index:9999;box-shadow:0 4px 24px rgba(0,0,0,.4);display:flex;align-items:center;gap:12px;min-width:260px;animation:cin .3s ease`;
  // Check if this achievement unlocks any cosmetics
  const cosmeticUnlock = [...ACCENT_COLORS,...BG_THEMES].find(t=>t.unlock===a.id);
  const cosmeticNote = cosmeticUnlock ? `<div style="font-size:.62rem;color:${a.color};margin-top:3px;opacity:.85">+ ${cosmeticUnlock.label} unlocked in themes</div>` : '';
  el.innerHTML = `${achievementIcon(a.id,a.color,32)}<div><div style="font-weight:500;color:${a.color};margin-bottom:2px">achievement unlocked</div><div style="font-size:.82rem">${a.name}</div><div style="font-size:.68rem;color:var(--mu)">${a.desc}</div>${cosmeticNote}</div>`;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .5s'; setTimeout(() => el.remove(), 500); }, 4000);
}
function checkAchievements() {
  const allWords = new Set();
  decks.forEach(d => Object.keys(d.words).forEach(w => allWords.add(w)));
  if (allWords.size >= 50)  unlockAchievement('words_50');
  if (allWords.size >= 200) unlockAchievement('words_200');
  if (decks.length > 0) unlockAchievement('first_deck');
  const songNames = ['よふかしのうた','可愛くてごめん','アイドル'];
  if (decks.some(d => songNames.includes(d.name))) unlockAchievement('songs_deck');
  // all_langs is checked via recordLangFlashcard, not here
}
function recordLangFlashcard() {
  // track cards seen per language; unlock all_langs when all three hit 5
  const key = 'lf-lang-cards';
  const counts = load(key, {korean:0, italian:0, japanese:0});
  if ((counts[curLang] || 0) < 5) {
    counts[curLang] = (counts[curLang] || 0) + 1;
    save(key, counts);
  }
  if (counts.korean >= 5 && counts.italian >= 5 && counts.japanese >= 5) {
    unlockAchievement('all_langs');
  }
}

// ── THEME & FONT ──────────────────────────────────────────────────────────────
function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('lf-theme', theme);
  document.body.className = theme;
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? 'light mode' : 'dark mode';
  // reapply accent since body class change resets inline styles
  const accentId = getActiveAccent();
  if (accentId !== 'acc_default') applyAccent(accentId);
}
function applyFontSize(size) {
  fontSize = size;
  document.documentElement.setAttribute('data-size', size);
  localStorage.setItem('lf-fontsize', size);
  const btn = document.getElementById('fontBtn');
  if (btn) btn.textContent = 'text: ' + FONT_LABELS[size];
}
function cycleFontSize() { const idx = FONT_SIZES.indexOf(fontSize); applyFontSize(FONT_SIZES[(idx + 1) % FONT_SIZES.length]); }

// ── ROMANIZATION ──────────────────────────────────────────────────────────────
function toggleRomanization() {
  showRomanization = !showRomanization;
  localStorage.setItem('lf-show-ro', showRomanization ? 'true' : 'false');
  const btn = document.getElementById('roBtn');
  if (btn) { btn.textContent = showRomanization ? 'hide romaji' : 'show romaji'; btn.classList.toggle('on', !showRomanization); }
  renderWordGrid();
  if (document.getElementById('studyOverlay')?.classList.contains('open')) renderStudyCard();
}

// ── LANGUAGE SWITCHER ─────────────────────────────────────────────────────────
function toggleLangMenu() {
  const menu = document.getElementById('langMenu'), btn = document.getElementById('langBtn');
  if (!menu || !btn) return;
  if (menu.classList.contains('open')) { menu.classList.remove('open'); return; }
  const r = btn.getBoundingClientRect(), menuW = 180;
  let left = r.right - menuW; if (left < 8) left = 8;
  menu.style.top = (r.bottom + 6) + 'px'; menu.style.left = left + 'px';
  menu.classList.add('open');
}
document.addEventListener('click', e => {
  const btn = document.getElementById('langBtn'), menu = document.getElementById('langMenu');
  if (menu && btn && !btn.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
});
function switchLang(lang) {
  curLang = lang; localStorage.setItem('lf-lang', lang);
  activeScripts.clear(); updateScriptBtns(); showScriptFilters(lang === 'japanese');
  if (lang !== 'japanese' && (curGrouping === 'fewest_strokes' || curGrouping === 'script')) { curGrouping = 'pos'; save('lf-grouping', 'pos'); }
  const L = LANGS[lang];
  const fe = document.getElementById('langFlag'), le = document.getElementById('langLabel');
  if (fe) fe.textContent = L.flag; if (le) le.textContent = L.label;
  const srch = document.getElementById('searchInput2'); if (srch) srch.placeholder = L.placeholder;
  document.querySelectorAll('.lang-option').forEach(el => el.classList.toggle('active', el.dataset.lang === lang));
  document.getElementById('langMenu')?.classList.remove('open');
  checkAchievements(); renderTab(curTab);
}

// ── TAB ROUTING ───────────────────────────────────────────────────────────────
function switchTab(tab) {
  curTab = tab; localStorage.setItem('lf-tab', tab);
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderTab(tab);
}
function renderTab(tab) {
  const main = document.getElementById('mainContent'); if (!main) return;
  main.innerHTML = '';
  if (tab === 'vocab')    renderVocab(main);
  if (tab === 'practice') renderPractice(main);
  if (tab === 'grammar')  renderGrammar(main);
  if (tab === 'songs')    renderSongs(main);
  if (tab === 'guide')    renderGuide(main);
  if (tab === 'medals')   renderMedals(main);
  if (tab === 'themes')   renderThemes(main);
}

// ── SCRIPT FILTERS ────────────────────────────────────────────────────────────
function showScriptFilters(show) {
  const el = document.getElementById('scriptFilters');
  if (el) el.style.display = show ? 'flex' : 'none';
  if (!show) { activeScripts.clear(); updateScriptBtns(); }
}
function toggleScript(script) { if (activeScripts.has(script)) activeScripts.delete(script); else activeScripts.add(script); updateScriptBtns(); renderWordGrid(); }
function updateScriptBtns() { document.querySelectorAll('.script-btn').forEach(btn => btn.classList.toggle('script-on', activeScripts.has(btn.dataset.script))); }

// ── SITUATION PILLS ───────────────────────────────────────────────────────────
function buildSitPills() {
  const row = document.getElementById('sitRow'); if (!row) return;
  row.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'sit-pill' + (activeSituation === 'all' ? ' sit-active' : '');
  allBtn.textContent = 'all situations'; allBtn.style.setProperty('--sc', '#c8a87a');
  allBtn.onclick = () => { activeSituation = activeSituation === 'all' ? null : 'all'; buildSitPills(); renderWordGrid(); };
  row.appendChild(allBtn);
  SITUATIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'sit-pill' + (activeSituation === s.key ? ' sit-active' : '');
    btn.textContent = s.label; btn.style.setProperty('--sc', s.color);
    btn.onclick = () => { activeSituation = activeSituation === s.key ? null : s.key; buildSitPills(); renderWordGrid(); };
    row.appendChild(btn);
  });
  if (activeSituation) {
    const words = LANGS[curLang].words;
    const sitWords = activeSituation === 'all' ? words.filter(w => w.sit && w.sit.length > 0) : words.filter(w => w.sit && w.sit.includes(activeSituation));
    const addAll = document.createElement('button'); addAll.className = 'sit-add-all'; addAll.textContent = 'add all to deck →';
    addAll.onclick = () => {
      if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
        const name = prompt('Name your new deck (' + sitWords.length + ' words):', ''); if (!name || !name.trim()) return;
        addDeck(name.trim()); sitWords.forEach(w => decks[decks.length-1].words[w.kr] = true);
      } else { sitWords.forEach(w => decks[activeDeckIdx].words[w.kr] = true); }
      saveDeckState(); buildSitPills(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); checkAchievements();
    };
    row.appendChild(addAll);
  }
}

// ── PREMADE DECKS ─────────────────────────────────────────────────────────────
function addPremadeDeck(key) {
  const templates = PREMADE_DECKS[key]; if (!templates) return;
  const words = LANGS[curLang].words; let added = 0;
  templates.forEach(t => {
    const existing = decks.find(d => d.name === t.name);
    if (existing) { words.filter(t.filter).forEach(w => existing.words[w.kr] = true); return; }
    const deck = {name:t.name, color:t.color, words:{}}; words.filter(t.filter).forEach(w => deck.words[w.kr] = true);
    decks.push(deck); activeDeckIdx = decks.length - 1; added++;
  });
  saveDeckState(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); checkAchievements();
  showToast(added > 0 ? templates.map(t => '"'+t.name+'"').join(' + ') + ' added!' : 'Deck already exists — words updated.');
}
function addPremadeDeckJapaneseAll() { ['japanese_hiragana','japanese_katakana','japanese_kanji','japanese_dakuten'].forEach(k => addPremadeDeck(k)); }

// ── DECK STATE ────────────────────────────────────────────────────────────────
let decks = [], activeDeckIdx = -1, openSecs = {};
const POS_ORDER = ['expression','verb','adjective','noun','adverb','pronoun','particle'];
const PALETTE   = ['#c8a87a','#7ac8a0','#7a8cc8','#c87aa8','#7ac8c8','#c8c87a','#c87a7a','#a87ac8'];
const GROUPINGS = {
  pos:           {label:'part of speech', key:w=>w.pos, order:()=>POS_ORDER, color:k=>({verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'}[k]||'#888')},
  register:      {label:'formality', key:w=>w.register||'neutral', order:()=>['formal','neutral','casual'], color:k=>({formal:'#7a8cc8',neutral:'#7ac8a0',casual:'#c8a87a'}[k]||'#888')},
  most_common:   {label:'most common first', key:w=>w.freq>=10?'essential':w.freq>=8?'very common':w.freq>=6?'common':w.freq>=4?'uncommon':'rare', order:()=>['essential','very common','common','uncommon','rare'], color:()=>'#7ac8a0'},
  least_common:  {label:'least common first', key:w=>w.freq>=10?'essential':w.freq>=8?'very common':w.freq>=6?'common':w.freq>=4?'uncommon':'rare', order:()=>['rare','uncommon','common','very common','essential'], color:()=>'#c87a7a'},
  shortest:      {label:'shortest first', key:w=>{const l=w.kr.length;return l<=1?'1 char':l<=2?'2 chars':l<=3?'3 chars':l<=4?'4 chars':'5+ chars';}, order:()=>['1 char','2 chars','3 chars','4 chars','5+ chars'], color:()=>'#7ac8c8'},
  a_z:           {label:'a → z', key:w=>w.ro[0].toUpperCase(), order:keys=>keys.slice().sort(), color:()=>'#7a8cc8'},
  in_deck:       {label:'in my deck', key:w=>deckColorFor(w.kr)?'in a deck':'not in deck', order:()=>['in a deck','not in deck'], color:k=>k==='in a deck'?'#c8a87a':'#888'},
  fewest_strokes:{label:'fewest strokes', key:_=>'kanji by stroke count', filter:w=>!!w.strokes, sort:(a,b)=>(a.strokes||99)-(b.strokes||99), order:()=>['kanji by stroke count'], color:()=>'#7ac8a0'},
  script:        {label:'by script', key:w=>w.script||w.pos, order:()=>['hiragana','katakana','kanji','hiragana_d','katakana_d','expression','verb','adjective','noun','adverb','pronoun','particle'], displayName:k=>({'hiragana_d':'hiragana accents','katakana_d':'katakana accents'}[k]||k), color:k=>({'hiragana':'#7ac8a0','katakana':'#7a8cc8','kanji':'#c87aa8','hiragana_d':'#7ac8c8','katakana_d':'#c8c87a',verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'}[k]||'#888')},
};
let curGrouping = 'pos';
function deckColorFor(kr) { for (let d of decks) { if (d.words[kr]) return d.color; } return null; }
function nextDeckColor() { const used = decks.map(d=>d.color); for (let c of PALETTE) { if (!used.includes(c)) return c; } return PALETTE[decks.length%PALETTE.length]; }
function addDeck(name) { decks.push({name, color:nextDeckColor(), words:{}}); activeDeckIdx = decks.length-1; saveDeckState(); checkAchievements(); }
function deleteDeck(idx) { decks.splice(idx,1); if (activeDeckIdx >= decks.length) activeDeckIdx = decks.length-1; saveDeckState(); }
function saveDeckState() { save('lf-decks', decks); save('lf-activeDeck', activeDeckIdx); }

// ── SUSPEND STATE ────────────────────────────────────────────────────────────────────────────────
let suspendedWords = new Set(load('lf-suspended', []));
let showSuspended = false;
let kanjiFilter = false;
function isSuspended(kr) { return suspendedWords.has(kr); }
function suspendWord(kr) { suspendedWords.add(kr); save('lf-suspended', [...suspendedWords]); }
function unsuspendWord(kr) { suspendedWords.delete(kr); save('lf-suspended', [...suspendedWords]); }
function getKanjiInDecks() {
  const kanji = new Set();
  decks.forEach(d => {
    Object.keys(d.words).forEach(kr => {
      [...kr].forEach(ch => { if (/[一-鿿]/.test(ch)) kanji.add(ch); });
    });
  });
  LANGS[curLang].words.filter(w => w.pos === 'kanji').forEach(w => {
    [...w.kr].forEach(ch => { if (/[一-鿿]/.test(ch)) kanji.add(ch); });
  });
  return kanji;
}
function wordHasKanjiFromDecks(w) {
  const deckKanji = getKanjiInDecks();
  return [...w.kr].some(ch => deckKanji.has(ch));
}

// ── VOCAB TAB ─────────────────────────────────────────────────────────────────
function renderVocab(container) {
  container.innerHTML = '';
  const ctrl = document.createElement('div'); ctrl.className = 'ctrl';
  const sitRow = document.createElement('div'); sitRow.className = 'sit-row'; sitRow.id = 'sitRow'; ctrl.appendChild(sitRow);
  const mainRow = document.createElement('div'); mainRow.className = 'ctrl-row'; mainRow.style.cssText = 'margin-top:4px;flex-wrap:wrap;gap:6px';
  const si = document.createElement('input'); si.type='text'; si.id='searchInput2'; si.placeholder=LANGS[curLang].placeholder; si.style.cssText='flex:1;min-width:140px'; si.oninput=renderWordGrid; mainRow.appendChild(si);
  const fb = document.createElement('button'); fb.className='ubtn filters-toggle'; fb.id='filtersToggle'; fb.textContent='more filters ▾'; fb.onclick=toggleFilters; mainRow.appendChild(fb);
  const roBtn = document.createElement('button'); roBtn.className='ubtn'+(!showRomanization?' on':''); roBtn.id='roBtn'; roBtn.textContent=showRomanization?'hide romaji':'show romaji'; roBtn.onclick=toggleRomanization; mainRow.appendChild(roBtn);
  const cb = document.createElement('button'); cb.className='ubtn'; cb.textContent='+ custom word'; cb.onclick=openCustomWord; mainRow.appendChild(cb);
  if(curLang==='japanese'){
    const kfBtn=document.createElement('button');kfBtn.className='ubtn'+(kanjiFilter?' on':'');kfBtn.id='kanjiFilterBtn';kfBtn.textContent='kanji i know';kfBtn.title='Show only words containing kanji from your decks';kfBtn.onclick=()=>{kanjiFilter=!kanjiFilter;kfBtn.classList.toggle('on',kanjiFilter);renderWordGrid();};mainRow.appendChild(kfBtn);
  }
  const suBtn=document.createElement('button');suBtn.className='ubtn'+(showSuspended?' on':'');suBtn.id='suspendedBtn';suBtn.textContent=showSuspended?'hide suspended':'show suspended';suBtn.onclick=()=>{showSuspended=!showSuspended;suBtn.classList.toggle('on',showSuspended);suBtn.textContent=showSuspended?'hide suspended':'show suspended';renderWordGrid();};mainRow.appendChild(suBtn);
  ctrl.appendChild(mainRow);
  const fr = document.createElement('div'); fr.className='ctrl-row filters-row'; fr.id='filtersRow'; fr.style.cssText='display:none;flex-wrap:wrap;gap:6px;margin-top:4px';
  const gb = document.createElement('div'); gb.id='groupBar'; gb.style.cssText='display:flex;flex-wrap:wrap;gap:5px'; fr.appendChild(gb);
  ['expand all','collapse all'].forEach((lbl,i)=>{ const b=document.createElement('button'); b.className='ubtn'; b.textContent=lbl; b.onclick=i===0?vocabExpandAll:vocabCollapseAll; fr.appendChild(b); });
  ctrl.appendChild(fr); container.appendChild(ctrl);
  const ws = document.createElement('div'); ws.id='wordSections'; container.appendChild(ws);
  const dp = document.createElement('div'); dp.id='deckPanel'; dp.className='deck-panel surface';
  dp.innerHTML=`<div class="deck-hdr"><span class="deck-title">your deck</span><div class="deck-acts"><button class="abtn danger" onclick="clearActiveDeck()">remove all</button><button class="abtn accent" onclick="openStudy()">study deck →</button></div></div><div id="deckSwitcher" class="deck-switcher"></div><div id="deckChips"></div>`;
  container.appendChild(dp);
  showScriptFilters(curLang==='japanese'); buildSitPills(); buildGroupBtns(); renderWordGrid(); renderDeckSwitcher(); renderDeckChips();
}
function toggleFilters() { const r=document.getElementById('filtersRow'),b=document.getElementById('filtersToggle'),open=r.style.display==='flex'; r.style.display=open?'none':'flex'; b.textContent=open?'more filters ▾':'hide filters ▴'; }
function buildGroupBtns() {
  const bar=document.getElementById('groupBar'); if(!bar) return; bar.innerHTML='';
  Object.entries(GROUPINGS).forEach(([key,cfg])=>{
    if((key==='fewest_strokes'||key==='script')&&curLang!=='japanese') return;
    const btn=document.createElement('button'); btn.className='gbtn'+(key===curGrouping?' on':''); btn.textContent=cfg.label;
    btn.onclick=()=>{ curGrouping=key; save('lf-grouping',key); openSecs={}; buildGroupBtns(); renderWordGrid(); }; bar.appendChild(btn);
  });
}
function makeChip(w, i) {
  const chip=document.createElement('div'); const chipColor=deckColorFor(w.kr);
  const suspended = isSuspended(w.kr);
  chip.className='chip'+(chipColor?' on':'')+(suspended?' suspended':''); if(chipColor&&!suspended) chip.style.borderColor=chipColor; if(suspended) chip.style.opacity='0.35';
  chip.style.animationDelay=Math.min(i*0.008,0.2)+'s'; chip.title=w.meaning+' — '+w.example;
  const regColor={formal:'#7a8cc8',casual:'#c8a87a',neutral:'transparent'}[w.register||'neutral'];
  const sb=(curGrouping==='fewest_strokes'&&w.strokes)?`<span style="font-size:.5rem;color:var(--mu);margin-left:auto">${w.strokes}画</span>`:'';
  const roHtml=showRomanization?`<span class="chip-ro">${w.ro}</span>`:'';
  chip.innerHTML=`<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px"><span class="chip-kr" style="${chipColor?'color:'+chipColor:''}">${w.kr}</span>${w.register&&w.register!=='neutral'?`<span class="reg-badge" style="background:${regColor}20;color:${regColor};border-color:${regColor}40">${w.register}</span>`:''}${sb}</div>${roHtml}`;
  chip.onclick=()=>toggleWordInDeck(w); chip.oncontextmenu=e=>showWordCtxMenu(e,w); chip.ondblclick=()=>speak(w.kr,curLang);
  return chip;
}

function makeGroupRow(groupName, words, sectionBody) {
  // Group header inside a section body
  const row = document.createElement('div');
  row.style.cssText = 'width:100%;margin-bottom:4px;margin-top:2px';

  const hdr = document.createElement('div');
  const isOpen = !!openSecs['group:'+groupName];
  hdr.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 2px;cursor:pointer;user-select:none';
  const lbl = document.createElement('span');
  lbl.style.cssText = 'font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--su)';
  lbl.textContent = groupName;
  const ct = document.createElement('span');
  ct.style.cssText = 'font-size:.6rem;color:var(--mu)';
  ct.textContent = words.length;
  const chev = document.createElement('span');
  chev.style.cssText = 'font-size:.55rem;color:var(--mu);margin-left:auto';
  chev.textContent = isOpen ? '▴' : '▾';
  hdr.appendChild(lbl); hdr.appendChild(ct); hdr.appendChild(chev);

  const chips = document.createElement('div');
  chips.style.cssText = 'display:' + (isOpen ? 'flex' : 'none') + ';flex-wrap:wrap;gap:6px;padding:4px 0 8px';
  words.forEach((w,i) => chips.appendChild(makeChip(w,i)));

  hdr.onclick = () => {
    const open = chips.style.display === 'none';
    chips.style.display = open ? 'flex' : 'none';
    chev.textContent = open ? '▴' : '▾';
    if (open) openSecs['group:'+groupName] = true; else delete openSecs['group:'+groupName];
  };

  row.appendChild(hdr); row.appendChild(chips);
  sectionBody.appendChild(row);
}

function renderWordGrid() {
  const container=document.getElementById('wordSections'); if(!container) return;
  const rawSearch=document.getElementById('searchInput2');
  const search=(rawSearch?.value||'').toLowerCase().trim();
  if(!GROUPINGS[curGrouping]) curGrouping='pos';
  const cfg=GROUPINGS[curGrouping], words=LANGS[curLang].words;
  const alphaPoses=new Set(['hiragana','katakana','hiragana_d','katakana_d']);
  // kanji with script:"kanji" are alphabet drill cards — hide those by default too
  const isAlphaKanji = w => w.pos==='kanji' && w.script==='kanji';
  let filtered=words.filter(w=>{
    if(activeSituation==='all'&&!(w.sit&&w.sit.length>0)) return false;
    if(activeSituation&&activeSituation!=='all'&&!(w.sit&&w.sit.includes(activeSituation))) return false;
    if(activeScripts.size>0){if(!activeScripts.has(w.pos)) return false;}
    else if(curLang==='japanese'){if(alphaPoses.has(w.pos)||isAlphaKanji(w)) return false;}
    if(!showSuspended && isSuspended(w.kr)) return false;
    if(showSuspended && !isSuspended(w.kr)) return false;
    if(kanjiFilter && curLang==='japanese' && !wordHasKanjiFromDecks(w)) return false;
    if(search&&!w.kr.includes(search)&&!w.ro.toLowerCase().includes(search)&&!w.meaning.toLowerCase().includes(search)) return false;
    return true;
  });
  if(cfg.filter&&curLang==='japanese') filtered=filtered.filter(cfg.filter);
  const groups={}; filtered.forEach(w=>{ const k=cfg.key(w); if(!k) return; if(!groups[k]) groups[k]=[]; groups[k].push(w); });
  if(cfg.sort) Object.values(groups).forEach(arr=>arr.sort(cfg.sort));
  const allKeys=Object.keys(groups);
  const ordered=cfg.order(allKeys).filter(k=>groups[k]?.length>0);
  if(search||activeSituation) ordered.forEach(k=>openSecs[k]=true);
  if(Object.keys(openSecs).length===0&&ordered.length>0) openSecs[ordered[0]]=true;
  container.innerHTML='';
  if(ordered.length===0){container.innerHTML='<div class="empty-msg">no words match</div>';return;}
  ordered.forEach(key=>{
    const wds=groups[key],isOpen=!!openSecs[key],color=cfg.color(key);
    const selCount=wds.filter(w=>deckColorFor(w.kr)).length;
    const sec=document.createElement('div'); sec.className='sec';
    const hdr=document.createElement('div'); hdr.className='sec-hdr';
    const left=document.createElement('div'); left.className='sec-left';
    const nm=document.createElement('span'); nm.className='sec-name'; nm.style.color=color; nm.textContent=cfg.displayName?cfg.displayName(key):key;
    const ct=document.createElement('span'); ct.className='sec-count'; ct.textContent=wds.length;
    left.appendChild(nm); left.appendChild(ct);
    if(selCount){const sl=document.createElement('span');sl.className='sec-sel';sl.textContent=selCount+' in deck';left.appendChild(sl);}
    const chev=document.createElement('span'); chev.className='sec-chev'; chev.textContent=isOpen?'▴':'▾';
    hdr.appendChild(left); hdr.appendChild(chev);
    const body=document.createElement('div'); body.className='sec-body'; body.style.display=isOpen?'flex':'none';

    // Separate grouped and ungrouped words
    const wordGroups = {};
    const ungrouped = [];
    wds.forEach(w => {
      if (w.group) {
        if (!wordGroups[w.group]) wordGroups[w.group] = [];
        wordGroups[w.group].push(w);
      } else {
        ungrouped.push(w);
      }
    });

    // Render ungrouped chips normally
    ungrouped.forEach((w,i) => body.appendChild(makeChip(w,i)));

    // Render each word group as a sub-row
    Object.entries(wordGroups).forEach(([groupName, groupWords]) => {
      makeGroupRow(groupName, groupWords, body);
    });

    const toggle=()=>{ const open=sec.classList.toggle('open'); body.style.display=open?'flex':'none'; chev.textContent=open?'▴':'▾'; if(open) openSecs[key]=true; else delete openSecs[key]; };
    hdr.onclick=toggle; if(isOpen) sec.classList.add('open');
    sec.appendChild(hdr); sec.appendChild(body); container.appendChild(sec);
  });
}
function vocabExpandAll(){const words=LANGS[curLang].words;words.forEach(w=>openSecs[GROUPINGS[curGrouping].key(w)]=true);renderWordGrid();}
function vocabCollapseAll(){openSecs={};renderWordGrid();}
function toggleWordInDeck(w){
  if(activeDeckIdx<0||activeDeckIdx>=decks.length){const p=document.getElementById('deckPanel');if(p){p.style.outline='2px solid var(--acc)';setTimeout(()=>p.style.outline='',800);}return;}
  const d=decks[activeDeckIdx].words; if(d[w.kr]) delete d[w.kr]; else d[w.kr]=true;
  saveDeckState(); animateBadge(); renderDeckChips(); renderWordGrid(); checkAchievements();
}
function animateBadge(){const b=document.getElementById('deckBadge');if(!b)return;b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');setTimeout(()=>b.classList.remove('pop'),200);}

function renderDeckSwitcher(){
  const sw=document.getElementById('deckSwitcher'); if(!sw) return; sw.innerHTML='';

  // ── Two-column layout: left=decks+utils, right=SRS+grid ──────────────────
  const layout=document.createElement('div');
  layout.style.cssText='display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap';

  // LEFT: deck buttons + utility buttons
  const leftCol=document.createElement('div');
  leftCol.style.cssText='display:flex;flex-direction:column;gap:8px;flex:1;min-width:200px';

  // Deck buttons row
  const deckRow=document.createElement('div');
  deckRow.style.cssText='display:flex;flex-wrap:wrap;gap:6px;align-items:center';

  if(decks.length===0){
    deckRow.innerHTML='<span class="empty-deck">right-click any word to create your first deck</span>';
  } else {
    decks.forEach((deck,i)=>{
      const isActive = i===activeDeckIdx;
      const btn=document.createElement('button');
      btn.className='dbtn'+(isActive?' dactive':'');
      btn.style.setProperty('--dc', deck.color);
      const dot=document.createElement('span');dot.className='ddot';dot.style.background=deck.color;
      const lbl=document.createElement('span');lbl.textContent=deck.name;
      const wc=Object.keys(deck.words).length;
      const ct=document.createElement('span');ct.className='dct';if(wc>0)ct.textContent=wc;
      btn.appendChild(dot);btn.appendChild(lbl);btn.appendChild(ct);
      btn.onclick=()=>{activeDeckIdx=i===activeDeckIdx?-1:i;saveDeckState();renderDeckSwitcher();renderDeckChips();renderWordGrid();};
      btn.oncontextmenu=e=>showDeckCtxMenu(e,i);
      deckRow.appendChild(btn);
    });
  }
  leftCol.appendChild(deckRow);

  // Utility buttons row (same style as deck buttons)
  const utilRow=document.createElement('div');
  utilRow.style.cssText='display:flex;flex-wrap:wrap;gap:6px;align-items:center';

  const add=document.createElement('button');add.className='dbtn';add.textContent='+ new deck';
  add.onclick=()=>{const n=prompt('Name your new deck:','');if(n?.trim()){addDeck(n.trim());renderDeckSwitcher();renderDeckChips();renderWordGrid();}};
  utilRow.appendChild(add);

  const pk={korean:['korean'],italian:['italian'],japanese:['japanese_hiragana','japanese_katakana','japanese_kanji','japanese_dakuten','japanese_yofukashi','japanese_kawaikute']};
  if(pk[curLang]){
    const pb=document.createElement('button');pb.className='dbtn';
    pb.textContent=curLang==='japanese'?'★ alphabet + accent decks':'★ starter decks';
    pb.onclick=()=>{if(curLang==='japanese')addPremadeDeckJapaneseAll();else pk[curLang].forEach(k=>addPremadeDeck(k));};
    utilRow.appendChild(pb);
  }
  if(curLang==='japanese'){
    const vb=document.createElement('button');vb.className='dbtn';
    vb.textContent='★ vocabulary deck';
    vb.onclick=()=>addPremadeDeck('japanese_vocab');
    utilRow.appendChild(vb);
  }
  leftCol.appendChild(utilRow);
  layout.appendChild(leftCol);

  // RIGHT: SRS controls + activity grid
  const rightCol=document.createElement('div');
  rightCol.style.cssText='display:flex;flex-direction:column;gap:8px;min-width:220px';

  const badge=document.getElementById('deckBadge');if(badge)badge.textContent=activeDeckIdx>=0?Object.keys(decks[activeDeckIdx]?.words||{}).length:'0';

  if(activeDeckIdx>=0&&activeDeckIdx<decks.length){
    const due=cardsDueToday(activeDeckIdx);
    const newAvail=newCardsAvailable(activeDeckIdx);
    const total=due+newAvail;

    const statsRow=document.createElement('div');statsRow.style.cssText='display:flex;gap:12px;font-size:.7rem';
    statsRow.innerHTML=`<span style="color:#c87a7a">■ ${due} due</span><span style="color:#7ac8a0">■ ${newAvail} new</span>`;
    rightCol.appendChild(statsRow);

    const limitRow=document.createElement('div');limitRow.style.cssText='display:flex;align-items:center;gap:8px;font-size:.7rem;color:var(--mu)';
    const limitLabel=document.createElement('span');limitLabel.textContent='new cards/day:';
    const limitInput=document.createElement('input');
    limitInput.type='number';limitInput.min='1';limitInput.max='100';
    limitInput.value=getDailyLimit(activeDeckIdx);
    limitInput.style.cssText='width:52px;padding:3px 6px;background:var(--sf);border:1px solid var(--bd2);border-radius:5px;color:var(--tx);font-family:DM Mono,monospace;font-size:.72rem;text-align:center';
    limitInput.onchange=()=>{const v=parseInt(limitInput.value);if(v>0){setDailyLimit(activeDeckIdx,v);renderDeckSwitcher();}};
    limitRow.appendChild(limitLabel);limitRow.appendChild(limitInput);
    rightCol.appendChild(limitRow);

    const sb=document.createElement('button');sb.className='abtn accent';
    if(total===0){sb.textContent='nothing due — check back later';sb.style.opacity='0.5';}
    else{sb.textContent=`study now (${due} review + ${newAvail} new) →`;}
    sb.onclick=()=>{if(total>0)openAnkiSession();};
    rightCol.appendChild(sb);

    const gridWrap=document.createElement('div');gridWrap.style.cssText='margin-top:2px';
    renderActivityGrid(gridWrap);
    rightCol.appendChild(gridWrap);
  } else {
    const hint=document.createElement('div');hint.style.cssText='font-size:.7rem;color:var(--mu)';hint.textContent='select a deck to start studying';
    rightCol.appendChild(hint);
  }
  layout.appendChild(rightCol);
  sw.appendChild(layout);
}
function renderDeckChips(){
  const c=document.getElementById('deckChips'); if(!c) return;
  const badge=document.getElementById('deckBadge');
  if(activeDeckIdx<0||activeDeckIdx>=decks.length){if(badge)badge.textContent='0';c.innerHTML='<span class="empty-deck">select or create a deck, then click words to add them</span>';return;}
  const deck=decks[activeDeckIdx],keys=Object.keys(deck.words);
  if(badge)badge.textContent=keys.length;
  if(keys.length===0){c.innerHTML=`<span class="empty-deck">left-click words to add to <strong style="color:${deck.color}">${deck.name}</strong></span>`;return;}
  c.innerHTML='';
  keys.forEach(kr=>{const w=LANGS[curLang].words.find(x=>x.kr===kr)||{kr,ro:'',meaning:''};const chip=document.createElement('div');chip.className='dchip';chip.style.cssText=`border-color:${deck.color};color:${deck.color}`;chip.innerHTML=`${w.kr} <span class="dchip-ro">${w.ro}</span><button class="dchip-x">×</button>`;chip.querySelector('button').onclick=()=>{delete deck.words[kr];saveDeckState();renderDeckChips();renderWordGrid();};c.appendChild(chip);});
}
function clearActiveDeck(){if(activeDeckIdx<0)return;decks[activeDeckIdx].words={};saveDeckState();renderDeckChips();renderWordGrid();}

// ── CONTEXT MENUS ─────────────────────────────────────────────────────────────
let ctxMenu=null;
function removeCtxMenu(){if(ctxMenu){ctxMenu.remove();ctxMenu=null;}}
document.addEventListener('click',removeCtxMenu);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){removeCtxMenu();closeCustomWord();}});
function makeMenu(isDark){const m=document.createElement('div');m.style.cssText='position:fixed;z-index:9999;border-radius:9px;overflow:hidden;min-width:170px;box-shadow:0 8px 32px rgba(0,0,0,.4)';m.style.background=isDark?'#1e1e28':'#fff';m.style.border=isDark?'1px solid rgba(255,255,255,.14)':'1px solid rgba(0,0,0,.14)';return m;}
function menuRow(menu,label,color,fn,isDark){const row=document.createElement('div');row.style.cssText='padding:8px 13px;font-size:.74rem;cursor:pointer;font-family:DM Mono,monospace;';row.style.color=color||(isDark?'#f0eee8':'#1c1a16');row.textContent=label;row.onmouseenter=()=>row.style.background=isDark?'rgba(255,255,255,.06)':'rgba(0,0,0,.05)';row.onmouseleave=()=>row.style.background='';row.onclick=e=>{e.stopPropagation();removeCtxMenu();fn();};menu.appendChild(row);}
function positionMenu(menu,e){menu.style.left=e.clientX+'px';menu.style.top=e.clientY+'px';document.body.appendChild(menu);ctxMenu=menu;const r=menu.getBoundingClientRect();if(r.right>window.innerWidth-8)menu.style.left=(e.clientX-r.width)+'px';if(r.bottom>window.innerHeight-8)menu.style.top=(e.clientY-r.height)+'px';}
function showWordCtxMenu(e,w){
  e.preventDefault();removeCtxMenu();const isDark=document.body.classList.contains('dark');const menu=makeMenu(isDark);
  const hd=document.createElement('div');hd.style.cssText='padding:8px 13px 4px;font-family:Noto Sans KR,sans-serif;font-size:.9rem;font-weight:500;color:'+(isDark?'#f0eee8':'#1c1a16');hd.textContent=w.kr+' — '+w.ro;menu.appendChild(hd);
  menuRow(menu,'▶ listen',isDark?'#7ac8a0':'#1a7a4a',()=>speak(w.kr,curLang),isDark);
  const d=document.createElement('div');d.style.cssText='border-top:1px solid '+(isDark?'rgba(255,255,255,.08)':'rgba(0,0,0,.08)')+';margin:2px 0';menu.appendChild(d);
  const dh=document.createElement('div');dh.style.cssText='padding:5px 13px 3px;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:'+(isDark?'#55555f':'#a09d96');dh.textContent='add to deck';menu.appendChild(dh);
  decks.forEach(deck=>{const inThis=!!deck.words[w.kr];menuRow(menu,(inThis?'✓ ':'')+deck.name,inThis?deck.color:null,()=>{decks.forEach(d=>delete d.words[w.kr]);if(!inThis)deck.words[w.kr]=true;saveDeckState();renderDeckSwitcher();renderDeckChips();renderWordGrid();checkAchievements();},isDark);});
  const d2=document.createElement('div');d2.style.cssText='border-top:1px solid '+(isDark?'rgba(255,255,255,.08)':'rgba(0,0,0,.08)')+';margin:3px 0';menu.appendChild(d2);
  menuRow(menu,'+ new deck',isDark?'#7ac8a0':'#1a7a4a',()=>{const n=prompt('Name your new deck:','');if(n?.trim()){addDeck(n.trim());decks[decks.length-1].words[w.kr]=true;saveDeckState();renderDeckSwitcher();renderDeckChips();renderWordGrid();}},isDark);
  const d3=document.createElement('div');d3.style.cssText='border-top:1px solid '+(isDark?'rgba(255,255,255,.08)':'rgba(0,0,0,.08)')+';margin:3px 0';menu.appendChild(d3);
  const susp=isSuspended(w.kr);
  menuRow(menu,susp?'↑ unsuspend':'⊘ suspend',susp?'#7ac8a0':'#c87a7a',()=>{if(susp)unsuspendWord(w.kr);else suspendWord(w.kr);renderWordGrid();},isDark);
  positionMenu(menu,e);
}
function showDeckCtxMenu(e,idx){
  e.preventDefault();removeCtxMenu();const isDark=document.body.classList.contains('dark');const deck=decks[idx];const menu=makeMenu(isDark);
  const hd=document.createElement('div');hd.style.cssText='padding:7px 13px 5px;font-size:.65rem;letter-spacing:.08em;font-weight:500;text-transform:uppercase;color:'+deck.color;hd.textContent=deck.name;menu.appendChild(hd);
  menuRow(menu,'rename',null,()=>{const n=prompt('Rename deck:',deck.name);if(n?.trim()){deck.name=n.trim();saveDeckState();renderDeckSwitcher();}},isDark);
  menuRow(menu,'delete deck','#c87a7a',()=>{if(confirm('Delete "'+deck.name+'"? Words will not be deleted.')){deleteDeck(idx);renderDeckSwitcher();renderDeckChips();renderWordGrid();}},isDark);
  positionMenu(menu,e);
}

// ── STUDY MODE ────────────────────────────────────────────────────────────────
let studyList=[],sIdx=0,sFlip=false;
// studyMode: 'flip' (default) | 'meaning' (type English) | 'reading' (type romaji)
let studyMode = localStorage.getItem('lf-study-mode') || 'flip';
const STUDY_MODES = ['flip','meaning','reading','cloze'];
const STUDY_MODE_LABELS = {flip:'✎ flip', meaning:'✎ type meaning', reading:'✎ type reading', cloze:'✎ cloze'};

function cycleStudyMode(){
  const idx = STUDY_MODES.indexOf(studyMode);
  studyMode = STUDY_MODES[(idx+1) % STUDY_MODES.length];
  localStorage.setItem('lf-study-mode', studyMode);
  renderStudyCard();
}

function openStudy(){
  if(activeDeckIdx<0||activeDeckIdx>=decks.length){alert('Select a deck first.');return;}
  const keys=Object.keys(decks[activeDeckIdx].words);
  if(keys.length===0){alert(decks[activeDeckIdx].name+' has no words yet.');return;}
  studyList=shuffle(keys.map(kr=>LANGS[curLang].words.find(w=>w.kr===kr)).filter(Boolean).filter(w=>!isSuspended(w.kr)));
  sIdx=0;sFlip=false;renderStudyCard();
  document.getElementById('studyOverlay')?.classList.add('open');
  document.getElementById('srsControls').style.display='none';
  document.getElementById('normalControls').style.display='block';
  document.getElementById('mMeta').textContent=keys.length+' words';
  updateStreak();
}
function closeStudy(){document.getElementById('studyOverlay')?.classList.remove('open');}
function overlayClick(e){if(e.target.id==='studyOverlay')closeStudy();}

function renderStudyCard(){
  const w=studyList[sIdx];
  // pick a random example for kanji with multiple examples
  const cardExample = (w.examples && w.examples.length > 1)
    ? w.examples[Math.floor(Math.random() * w.examples.length)]
    : w.example;
  // Extract reading note from example if present (text after 　[reading])
  const exParts = cardExample ? cardExample.split('　[') : [];
  const exSentence = exParts[0] || cardExample;
  const exReading = exParts[1] ? exParts[1].replace(']','') : '';
  const front=document.getElementById('cFront'),back=document.getElementById('cBack'),fcard=document.getElementById('fcard');
  if(!front||!back) return;
  if(fcard){fcard.style.transition='none';fcard.classList.remove('flip');void fcard.offsetWidth;fcard.style.transition='';}

  // always show example on front for context in typing modes
  if(studyMode !== 'cloze') {
    const roHtml=showRomanization?`<div class="fc-ro">${w.ro}</div>`:'';
    const exHtml=(studyMode==='meaning'||studyMode==='reading')?`<div class="fc-ex" style="font-size:.68rem;margin-top:6px;opacity:.7">${exSentence}</div>`:'';
    front.innerHTML=`<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-kr">${w.kr}</div>${roHtml}<div class="fc-pos">${w.pos}</div>${w.register&&w.register!=='neutral'?`<div class="fc-reg" style="color:${{formal:'#7a8cc8',casual:'#c8a87a'}[w.register]}">${w.register}</div>`:''}${exHtml}`;
  }

  if(studyMode === 'cloze'){
    // ── CLOZE MODE ─────────────────────────────────────────────────────────────
    // Build blank sentence from example — replace the target word with ＿＿＿
    const clozeSentence = (() => {
      if(!exSentence) return null;
      // Try to blank the kr form in the sentence
      if(exSentence.includes(w.kr)) return exSentence.replace(w.kr, '＿＿＿');
      // Try each individual kanji
      const chars = [...w.kr].filter(ch => /[一-鿿぀-ゟ゠-ヿ]/.test(ch));
      for(const ch of chars) {
        if(exSentence.includes(ch)) return exSentence.replace(ch, '＿');
      }
      return null;
    })();

    // Front: show sentence with blank, plus reading hint
    const exRo = exSentence ? exSentence.split(' — ')[1] || '' : '';
    const frontSentence = clozeSentence || (exSentence ? exSentence.replace(/ — .*/,'') : '?');
    const frontRo = (() => {
      if(!exSentence) return '';
      const parts = exSentence.split(' — ');
      if(!parts[1]) return '';
      if(w.ro && parts[1]) return parts[1].replace(w.ro, '＿＿＿');
      return parts[1];
    })();

    front.innerHTML = `<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\'")}','${curLang}')">▶</button><div style="font-family:'Noto Sans KR',sans-serif;font-size:1.3rem;line-height:1.8;color:var(--tx);margin-bottom:.5rem">${frontSentence}</div>${showRomanization&&frontRo?`<div style="font-size:.72rem;color:var(--mu);font-style:italic">${frontRo}</div>`:''}<div class="fc-pos" style="margin-top:.5rem">${w.pos}</div>`;

    // Back: full answer card
    back.innerHTML = `<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\'")}','${curLang}')">▶</button>
      <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:.4rem">
        <span style="font-family:'Noto Sans KR',sans-serif;font-size:1.6rem;font-weight:500;color:var(--acc)">${w.kr}</span>
        ${showRomanization?`<span style="font-size:.75rem;color:var(--mu)">${w.ro}</span>`:''}
        <span style="font-size:.85rem;color:var(--tx)">${w.meaning}</span>
      </div>
      <div style="font-size:.75rem;color:var(--mu);line-height:1.7;padding:.5rem .75rem;background:var(--sf2);border-radius:8px;font-family:'Noto Sans KR',sans-serif">${exSentence||''}</div>`;

  } else if(studyMode === 'meaning' || studyMode === 'reading'){
    const isMeaning = studyMode === 'meaning';
    const prompt = isMeaning ? 'what does this mean?' : 'how do you read this?';
    const placeholder = isMeaning ? 'type the meaning...' : 'type the reading...';
    // Compute targets
    const getTargets = () => {
      if(isMeaning){
        const raw = w.meaning.toLowerCase().split(' — ')[0].split('(')[0].trim();
        return raw.split(/[\/,]/).map(s=>s.trim()).filter(Boolean);
      } else {
        // reading: use first ro value before / or ・ or space
        const raw = w.ro.toLowerCase().split(' — ')[0].trim();
        return raw.split(/[\/,・\s]+/).map(s=>s.trim()).filter(Boolean);
      }
    };
    back.innerHTML=`<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-meaning" style="font-size:.85rem;margin-bottom:8px">${prompt}</div>`;
    const inp=document.createElement('input');
    inp.type='text';
    inp.placeholder=placeholder;
    inp.style.cssText='width:85%;padding:8px 12px;border-radius:6px;border:1px solid var(--bd2);background:var(--sf);color:var(--tx);font-family:DM Mono,monospace;font-size:.85rem;text-align:center;outline:none';
    inp.onfocus=()=>inp.style.borderColor='var(--acc)';
    const checkBtn=document.createElement('button');
    checkBtn.className='abtn accent';
    checkBtn.style.cssText='margin-top:8px;font-size:.78rem';
    checkBtn.textContent='check →';
    const result=document.createElement('div');
    result.style.cssText='margin-top:8px;font-size:.78rem;min-height:20px';
    checkBtn.onclick=()=>{
      const val=inp.value.trim().toLowerCase();
      const targets=getTargets();
      const correct=targets.some(t=>val===t||(val.length>1&&t.startsWith(val))||(val.length>2&&t.includes(val)));
      result.style.color=correct?'#7ac8a0':'#c87a7a';
      result.textContent=correct
        ? '✓ correct — '+(isMeaning?w.meaning:w.ro)
        : '✗ '+(isMeaning?w.meaning:w.ro);
      inp.disabled=true;checkBtn.disabled=true;
    };
    back.appendChild(inp);back.appendChild(checkBtn);back.appendChild(result);
    inp.onkeydown=e=>{if(e.key==='Enter')checkBtn.click();};
} else if (w.pos === 'kanji' && w.examples && w.examples.length > 1) {
    back.innerHTML = '';
    const spkBtn = document.createElement('button');
    spkBtn.className = 'speak-btn';
    spkBtn.textContent = '▶';
    spkBtn.onclick = () => speak(w.kr, curLang);
    back.appendChild(spkBtn);

    const mLabel = document.createElement('div');
    mLabel.style.cssText = 'font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:var(--su);margin-bottom:.2rem';
    mLabel.textContent = 'core meaning';
    back.appendChild(mLabel);

    const mVal = document.createElement('div');
    mVal.className = 'fc-meaning';
    mVal.style.marginBottom = '.6rem';
    mVal.textContent = w.meaning;
    back.appendChild(mVal);

    const wLabel = document.createElement('div');
    wLabel.style.cssText = 'font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:var(--su);margin-bottom:.25rem';
    wLabel.textContent = 'words';
    back.appendChild(wLabel);

    const wordList = document.createElement('div');
    wordList.style.cssText = 'width:100%;overflow-y:auto;max-height:140px;display:flex;flex-direction:column;flex-shrink:0';

    w.examples.slice(0, 4).forEach(ex => {
      const parts = ex.split(' — ');
      const word    = (parts[0] || '').replace(/[\s　]*\[.*?\]/g, '').trim();
      const reading = (parts[1] || '').replace(/[\s　]*\[.*?\]/g, '').trim();
      const eng     = (parts[2] || '').replace(/[\s　]*\[.*?\]/g, '').trim();

      const row = document.createElement('div');
      row.style.cssText = 'padding:5px 0;border-bottom:1px solid var(--bd)';

      const top = document.createElement('div');
      top.style.cssText = 'display:flex;gap:8px;align-items:baseline;flex-wrap:wrap';

      const wordEl = document.createElement('span');
      wordEl.style.cssText = "font-family:'Noto Sans KR',sans-serif;font-size:.95rem;color:var(--tx)";
      wordEl.textContent = word;

      const readEl = document.createElement('span');
      readEl.style.cssText = 'font-size:.65rem;color:var(--acc)';
      readEl.textContent = reading;

      top.appendChild(wordEl);
      top.appendChild(readEl);

      const engEl = document.createElement('div');
      engEl.style.cssText = 'font-size:.63rem;color:var(--mu);line-height:1.4;margin-top:1px';
      engEl.textContent = eng;

      row.appendChild(top);
      row.appendChild(engEl);
      wordList.appendChild(row);
    });
    back.appendChild(wordList);

    const readings = [...new Set(w.examples.slice(0,4).map(ex => {
      const m = ex.match(/\[([^\]]+)\]/);
      return m ? m[1] : null;
    }).filter(Boolean))].join(' · ');
    if (readings) {
      const patEl = document.createElement('div');
      patEl.style.cssText = 'font-size:.6rem;color:var(--mu);margin-top:.4rem;line-height:1.6;font-style:italic;padding:.35rem .6rem;background:var(--sf2);border-radius:6px';
      patEl.textContent = 'pattern: ' + readings;
      back.appendChild(patEl);
    }
  } else {
    back.innerHTML = `<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-meaning">${w.meaning}</div>${exReading?`<div style="font-size:.6rem;color:var(--acc);margin-top:6px;letter-spacing:.04em">this example uses: ${exReading}</div>`:''}<div class="fc-ex">${exSentence}</div>`;
  }

  sFlip=false;
  const ab=document.getElementById('againBtn'),gb=document.getElementById('goodBtn'),sh=document.getElementById('srsHint');
  if(ab)ab.style.display='none';if(gb)gb.style.display='none';if(sh)sh.style.display='block';
  const tmBtn=document.getElementById('typingModeBtn');
  if(tmBtn){tmBtn.textContent=STUDY_MODE_LABELS[studyMode];tmBtn.className='abtn'+(studyMode!=='flip'?' accent':'');}
  const roToggle=document.getElementById('studyRoBtn');
  if(roToggle)roToggle.textContent=showRomanization?'hide romaji':'show romaji';
}
function toggleStudyTypingMode(){cycleStudyMode();}
function toggleStudyRo(){showRomanization=!showRomanization;localStorage.setItem('lf-show-ro',showRomanization?'true':'false');renderStudyCard();const b=document.getElementById('roBtn');if(b){b.textContent=showRomanization?'hide romaji':'show romaji';}}
function flipCard(){
  sFlip=!sFlip;document.getElementById('fcard')?.classList.toggle('flip',sFlip);
  if(sFlip){
    if(studyMode!=='flip'&&studyMode!=='cloze'){const inp=document.querySelector('#cBack input');if(inp)setTimeout(()=>inp.focus(),500);}
    if(document.getElementById('srsControls')?.style.display!=='none'){
      ankiFlipped();
    }
  }
}
function nextCard(){recordLangFlashcard();sIdx++;if(sIdx>=studyList.length){const last=studyList[studyList.length-1];studyList=shuffle(studyList);if(studyList[0]?.kr===last?.kr&&studyList.length>1)[studyList[0],studyList[1]]=[studyList[1],studyList[0]];sIdx=0;}renderStudyCard();}
function reshuffleStudy(){const cur=studyList[sIdx];studyList=shuffle(studyList);if(studyList[0]?.kr===cur?.kr&&studyList.length>1)[studyList[0],studyList[1]]=[studyList[1],studyList[0]];sIdx=0;renderStudyCard();}
document.addEventListener('keydown',e=>{
  if(!document.getElementById('studyOverlay')?.classList.contains('open')) return;
  if(e.key==='Escape')closeStudy();
  if(e.key==='ArrowRight'&&(studyMode==='flip'||studyMode==='cloze'))nextCard();
  if(e.key===' '&&(studyMode==='flip'||studyMode==='cloze')){e.preventDefault();flipCard();}
});

// ── SRS SYSTEM (ANKI-STYLE) ──────────────────────────────────────────────────
// Card states: 'new' | 'learning' | 'review'
// Learning steps: 10min → 1day (graduate to review)
// Review: Again=reset to learning, Good=interval*ease, ease starts 2.5
// Ease: Again→-0.2, Good→unchanged. Min ease 1.3.

let srsMode = localStorage.getItem('lf-srs-mode') === 'true';
let srsData = {};
try { srsData = JSON.parse(localStorage.getItem('lf-srs-data') || '{}'); } catch(e) { srsData = {}; }
function saveSRS() { localStorage.setItem('lf-srs-data', JSON.stringify(srsData)); }

// Activity log: { 'YYYY-MM-DD': count }
let srsActivity = {};
try { srsActivity = JSON.parse(localStorage.getItem('lf-srs-activity') || '{}'); } catch(e) { srsActivity = {}; }
function logActivity() {
  const d = todayStr();
  srsActivity[d] = (srsActivity[d] || 0) + 1;
  localStorage.setItem('lf-srs-activity', JSON.stringify(srsActivity));
}

// Per-deck new card limit
function getDailyLimit(deckIdx) {
  const limits = load('lf-daily-limits', {});
  return parseInt(limits[deckIdx] ?? 10);
}
function setDailyLimit(deckIdx, n) {
  const limits = load('lf-daily-limits', {});
  limits[deckIdx] = n;
  save('lf-daily-limits', limits);
}

// How many new cards introduced today for this deck
function newCardsToday(deckIdx) {
  const deck = decks[deckIdx]; if (!deck) return 0;
  const d = todayStr();
  return Object.keys(deck.words).filter(kr => {
    const c = srsData[srsKey(deckIdx, kr)];
    return c && c.firstSeen === d;
  }).length;
}

function srsKey(deckIdx, kr) { const deck = decks[deckIdx]; return (deck ? deck.name : 'deck') + ':' + kr; }

function getCard(deckIdx, kr) {
  const k = srsKey(deckIdx, kr);
  if (!srsData[k]) srsData[k] = { state: 'new', interval: 0, due: 0, ease: 2.5, reps: 0, step: 0, firstSeen: null };
  // migrate old cards
  if (!srsData[k].state) {
    srsData[k].state = srsData[k].reps === 0 ? 'new' : 'review';
    srsData[k].step = 0;
    srsData[k].firstSeen = srsData[k].firstSeen || null;
  }
  return srsData[k];
}

// Learning steps in minutes
const LEARNING_STEPS = [10, 1440]; // 10min, 1day

function answerCard(kr, rating) {
  // rating: 'again' | 'good'
  const k = srsKey(activeDeckIdx, kr);
  const c = getCard(activeDeckIdx, kr);
  const now = Date.now();

  if (!c.firstSeen) { c.firstSeen = todayStr(); }
  logActivity();

  if (rating === 'again') {
    // Reset to start of learning
    c.state = 'learning';
    c.step = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = now + LEARNING_STEPS[0] * 60000;
  } else {
    // good
    if (c.state === 'new' || c.state === 'learning') {
      c.step = (c.step || 0) + 1;
      if (c.step >= LEARNING_STEPS.length) {
        // Graduate to review
        c.state = 'review';
        c.interval = 1;
        c.reps = 1;
        c.due = now + 86400000; // 1 day
      } else {
        c.state = 'learning';
        c.due = now + LEARNING_STEPS[c.step] * 60000;
      }
    } else {
      // review phase: good = multiply by ease
      c.reps++;
      const newInterval = c.reps === 1 ? 1 : Math.max(1, Math.round(c.interval * c.ease));
      // Add small fuzz (±5%) to avoid cards all coming due same day
      const fuzz = 1 + (Math.random() * 0.1 - 0.05);
      c.interval = Math.round(newInterval * fuzz);
      c.due = now + c.interval * 86400000;
      // ease unchanged for good
    }
  }
  saveSRS();
}

function cardsDueToday(deckIdx) {
  if (deckIdx < 0 || deckIdx >= decks.length) return 0;
  const now = Date.now();
  return Object.keys(decks[deckIdx].words).filter(kr => {
    const c = getCard(deckIdx, kr);
    return c.state !== 'new' && c.due <= now;
  }).length;
}

function newCardsAvailable(deckIdx) {
  if (deckIdx < 0 || deckIdx >= decks.length) return 0;
  const limit = getDailyLimit(deckIdx);
  const seenToday = newCardsToday(deckIdx);
  const remaining = Math.max(0, limit - seenToday);
  if (remaining === 0) return 0;
  return Object.keys(decks[deckIdx].words).filter(kr => {
    const c = getCard(deckIdx, kr);
    return c.state === 'new';
  }).length > 0 ? remaining : 0;
}

// Current session queues
let ankiReviewQueue = [];   // due review cards
let ankiNewQueue = [];      // new cards to introduce today
let ankiLearningQueue = []; // cards in learning (requeued same session)
let ankiSessionNewCount = 0;
let ankiDailyNewLimit = 10;

function buildAnkiSession(deckIdx) {
  const deck = decks[deckIdx]; if (!deck) return;
  const now = Date.now();
  const limit = getDailyLimit(deckIdx);
  const seenToday = newCardsToday(deckIdx);
  const newLimit = Math.max(0, limit - seenToday);

  const allKeys = Object.keys(deck.words);

  // Reviews: due cards not in learning
  ankiReviewQueue = shuffle(allKeys.filter(kr => {
    const c = getCard(deckIdx, kr);
    return (c.state === 'review' || c.state === 'learning') && c.due <= now;
  }).map(kr => LANGS[curLang].words.find(w => w.kr === kr)).filter(Boolean));

  // New cards: sort by freq desc (most common first), then slice to limit
  const newKeys = allKeys.filter(kr => {
    const c = getCard(deckIdx, kr);
    return c.state === 'new' && !isSuspended(kr);
  });
  const newWords = newKeys.map(kr => LANGS[curLang].words.find(w => w.kr === kr)).filter(Boolean);
  newWords.sort((a, b) => (b.freq || 0) - (a.freq || 0));
  ankiNewQueue = newWords.slice(0, newLimit);
  ankiLearningQueue = [];
  ankiSessionNewCount = 0;
}

function toggleSRSMode() { srsMode = !srsMode; localStorage.setItem('lf-srs-mode', srsMode ? 'true' : 'false'); renderDeckSwitcher(); }

function openAnkiSession() {
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) { showToast('Select a deck first.'); return; }
  buildAnkiSession(activeDeckIdx);
  const total = ankiReviewQueue.length + ankiNewQueue.length;
  if (total === 0) {
    showToast('Nothing due! Come back later or add more words.');
    return;
  }
  sFlip = false;
  document.getElementById('studyOverlay')?.classList.add('open');
  document.getElementById('srsControls').style.display = 'flex';
  document.getElementById('normalControls').style.display = 'none';
  updateAnkiMeta();
  showNextAnkiCard();
  updateStreak();
}

// Keep openReview as alias
function openReview() { openAnkiSession(); }

function updateAnkiMeta() {
  const meta = document.getElementById('mMeta');
  if (!meta) return;
  const r = ankiReviewQueue.length + ankiLearningQueue.length;
  const n = ankiNewQueue.length;
  meta.innerHTML = `<span style="color:#c87a7a">${r} due</span> · <span style="color:#7ac8a0">${n} new</span>`;
}

function getCurrentAnkiCard() {
  // Priority: learning (requeue) → review → new
  if (ankiLearningQueue.length > 0 && ankiLearningQueue[0].dueAt <= Date.now()) return { w: ankiLearningQueue[0].w, queue: 'learning' };
  if (ankiReviewQueue.length > 0) return { w: ankiReviewQueue[0], queue: 'review' };
  if (ankiNewQueue.length > 0) return { w: ankiNewQueue[0], queue: 'new' };
  // Check learning queue even if not due yet (last resort)
  if (ankiLearningQueue.length > 0) return { w: ankiLearningQueue[0].w, queue: 'learning' };
  return null;
}

function showNextAnkiCard() {
  const next = getCurrentAnkiCard();
  if (!next) {
    showToast('Session complete! 🎉');
    closeStudy();
    renderDeckSwitcher();
    return;
  }
  studyList = [next.w];
  sIdx = 0;
  sFlip = false;
  renderStudyCard();
  // Update hint text
  const sh = document.getElementById('srsHint');
  const ab = document.getElementById('againBtn');
  const gb = document.getElementById('goodBtn');
  if (sh) {
    const c = getCard(activeDeckIdx, next.w.kr);
    const queueLabel = next.queue === 'new' ? 'new' : next.queue === 'learning' ? 'learning' : 'review';
    sh.textContent = `flip to reveal · ${queueLabel}`;
    sh.style.display = 'block';
  }
  if (ab) ab.style.display = 'none';
  if (gb) gb.style.display = 'none';
  updateAnkiMeta();
}

function ankiFlipped() {
  // Called when card is flipped — show again/good buttons
  const ab = document.getElementById('againBtn');
  const gb = document.getElementById('goodBtn');
  const sh = document.getElementById('srsHint');
  if (!ab || !gb) return;
  const next = getCurrentAnkiCard();
  if (!next) return;
  const c = getCard(activeDeckIdx, next.w.kr);

  // Show next interval on good button
  let goodInterval = '';
  if (c.state === 'new' || c.state === 'learning') {
    // For a new card (step 0), good moves to step 1 (first learning step = 10m)
    // For learning step 1, good graduates to 1d
    const curStep = c.step || 0;
    const nextStep = curStep + 1;
    if (nextStep >= LEARNING_STEPS.length) {
      goodInterval = '1d';
    } else {
      const mins = LEARNING_STEPS[nextStep];
      goodInterval = mins < 60 ? mins + 'm' : mins < 1440 ? Math.round(mins/60) + 'h' : Math.round(mins/1440) + 'd';
    }
    // Special case: new card has never been seen — first good shows step[0] = 10m
    if (c.state === 'new') {
      const mins = LEARNING_STEPS[0];
      goodInterval = mins < 60 ? mins + 'm' : mins < 1440 ? Math.round(mins/60) + 'h' : Math.round(mins/1440) + 'd';
    }
  } else {
    const ni = Math.round(c.interval * c.ease);
    goodInterval = ni <= 1 ? '1d' : ni < 30 ? ni + 'd' : ni < 365 ? Math.round(ni/30) + 'mo' : Math.round(ni/365) + 'yr';
  }

  ab.textContent = '✗ again · 10m';
  gb.textContent = '✓ good · ' + goodInterval;
  ab.style.display = 'block';
  gb.style.display = 'block';
  if (sh) sh.style.display = 'none';
}

function srsAgain() {
  const next = getCurrentAnkiCard(); if (!next) return;
  const w = next.w;
  answerCard(w.kr, 'again');
  // Remove from current queue, add to learning with delay
  removeFromCurrentQueue(next);
  ankiLearningQueue.push({ w, dueAt: Date.now() + LEARNING_STEPS[0] * 60000 });
  // Sort learning by dueAt
  ankiLearningQueue.sort((a, b) => a.dueAt - b.dueAt);
  logActivity();
  showNextAnkiCard();
}

function srsGood() {
  const next = getCurrentAnkiCard(); if (!next) return;
  const w = next.w;
  answerCard(w.kr, 'good');
  removeFromCurrentQueue(next);
  logActivity();
  showNextAnkiCard();
}

function removeFromCurrentQueue(next) {
  if (next.queue === 'learning') {
    ankiLearningQueue.shift();
  } else if (next.queue === 'review') {
    ankiReviewQueue.shift();
  } else if (next.queue === 'new') {
    ankiNewQueue.shift();
    ankiSessionNewCount++;
  }
}

function srsNextCard() { showNextAnkiCard(); }

// ── PRACTICE TAB ──────────────────────────────────────────────────────────────
let practiceQueue=[],practiceIdx=0,practiceScore={correct:0,total:0,total_ever:0,consecutive:0},practiceFilter='all',selectedBlocks=[],answered=false;

function renderPractice(container){
  container.innerHTML='';
  const ctrl=document.createElement('div');ctrl.className='ctrl';
  const row=document.createElement('div');row.className='ctrl-row';row.style.cssText='gap:6px;flex-wrap:wrap';
  const lbl=document.createElement('span');lbl.className='ctrl-label';lbl.textContent='exercise type:';row.appendChild(lbl);
  ['all','particle','conjugate','build','fill','formal_casual','output','sentence'].forEach(t=>{
    const b=document.createElement('button');b.className='gbtn'+(practiceFilter===t?' on':'');b.textContent=t;b.onclick=()=>setPracticeFilter(t);row.appendChild(b);
  });
  ctrl.appendChild(row);container.appendChild(ctrl);
  const area=document.createElement('div');area.id='practiceArea';area.style.cssText='padding:1.5rem 2rem';container.appendChild(area);
  loadPracticeQueue();showNextExercise();updateStreak();
}
function setPracticeFilter(f){practiceFilter=f;document.querySelectorAll('#practiceArea').forEach(el=>el.innerHTML='');document.querySelectorAll('.gbtn').forEach(b=>b.classList.toggle('on',b.textContent===f));loadPracticeQueue();showNextExercise();}
function buildSentenceExercises(){
  const words=LANGS[curLang].words;
  const deckWords=activeDeckIdx>=0&&activeDeckIdx<decks.length?Object.keys(decks[activeDeckIdx].words).map(kr=>words.find(w=>w.kr===kr)).filter(Boolean):words.filter(w=>w.freq>=8).slice(0,30);
  if(deckWords.length<4) return [];
  const exercises=[];
  deckWords.forEach(w=>{
    if(!w.example||!w.meaning) return;
    const others=shuffle(words.filter(x=>x.kr!==w.kr&&x.meaning!==w.meaning)).slice(0,3);
    if(others.length<3) return;
    exercises.push({type:'sentence',english:w.meaning,prompt:w.example,answer:w.kr,choices:shuffle([w.kr,...others.map(x=>x.kr)]),explanation:w.example+'\n'+w.ro+' — '+w.meaning,level:1});
  });
  return shuffle(exercises);
}
function loadPracticeQueue(){
  const s=LANGS[curLang].sentences;const all=(typeof s==='function'?s():s)||[];
  if(practiceFilter==='sentence'){practiceQueue=buildSentenceExercises();if(practiceQueue.length===0)practiceQueue=all;}
  else{let f=practiceFilter==='all'?all:all.filter(s=>s.type===practiceFilter);if(f.length===0)f=all;practiceQueue=shuffle(f);}
  practiceIdx=0;
}
function showNextExercise(){
  if(practiceQueue.length===0){document.getElementById('practiceArea').innerHTML='<div class="empty-msg">No exercises yet. Add words to a deck first, or switch exercise type.</div>';return;}
  if(practiceIdx>=practiceQueue.length){practiceIdx=0;practiceQueue=shuffle(practiceQueue);}
  const ex=practiceQueue[practiceIdx];answered=false;selectedBlocks=[];
  const area=document.getElementById('practiceArea');if(!area) return;
  area.innerHTML='';
  const streak=getStreak();
  const scoreRow=document.createElement('div');scoreRow.className='practice-score';
  scoreRow.innerHTML=`<span class="score-num">${practiceScore.correct}/${practiceScore.total}</span><span class="score-lbl">correct</span>${streak.count>0?`<span style="margin-left:8px;font-size:.75rem">🔥 ${streak.count} day streak${streak.shield>0?' 🛡️':''}</span>`:''}<button class="ubtn" style="margin-left:auto" onclick="practiceScore={correct:0,total:0,total_ever:0,consecutive:0};showNextExercise()">reset</button>`;
  area.appendChild(scoreRow);
  const card=document.createElement('div');card.className='exercise-card surface';
  const meta=document.createElement('div');meta.className='ex-meta';
  const tc={particle:'#7ac8a0',conjugate:'#7a8cc8',build:'#c8a87a',fill:'#c87aa8',formal_casual:'#7ac8c8',output:'#c8c87a',sentence:'#a87ac8'};
  meta.innerHTML=`<span class="ex-type" style="color:${tc[ex.type]||'#888'}">${ex.type}</span><span class="ex-level">level ${ex.level}</span>`;
  card.appendChild(meta);
  if(ex.type==='sentence'){
    const sentEl=document.createElement('div');sentEl.style.cssText="font-family:'Noto Sans KR',sans-serif;font-size:1.1rem;line-height:1.7;padding:.75rem 1rem;background:var(--sf2);border-radius:8px;border:1px solid var(--bd);margin-bottom:.5rem";sentEl.textContent=ex.prompt;card.appendChild(sentEl);
    const qEl=document.createElement('div');qEl.className='ex-english';qEl.textContent='which word means: '+ex.english;card.appendChild(qEl);
    const cd=document.createElement('div');cd.className='ex-choices';cd.id='choicesDiv';card.appendChild(cd);
    const fb=document.createElement('div');fb.className='ex-feedback';fb.id='exFeedback';fb.style.display='none';card.appendChild(fb);
    const nb=document.createElement('button');nb.className='abtn accent';nb.style.cssText='width:100%;margin-top:1rem;display:none';nb.id='exNextBtn';nb.textContent='next →';nb.onclick=()=>{practiceIdx++;showNextExercise();};card.appendChild(nb);
    area.appendChild(card);
    shuffle(ex.choices).forEach(c=>{const btn=document.createElement('button');btn.className='choice-btn';btn.style.cssText="font-family:'Noto Sans KR',sans-serif;font-size:.95rem";btn.textContent=c;btn.onclick=()=>submitChoiceAnswer(c,ex);cd.appendChild(btn);});
    return;
  }
  const eng=document.createElement('div');eng.className='ex-english';eng.textContent=ex.english;card.appendChild(eng);
  if(ex.baseForm){const bf=document.createElement('div');bf.className='ex-base';bf.textContent='base: '+ex.baseForm;card.appendChild(bf);}
  const prompt=document.createElement('div');prompt.className='ex-prompt';prompt.id='exPrompt';card.appendChild(prompt);
  const ansArea=document.createElement('div');ansArea.className='ex-answer-area';ansArea.id='ansArea';card.appendChild(ansArea);
  const cd=document.createElement('div');cd.className='ex-choices';cd.id='choicesDiv';card.appendChild(cd);
  const fb=document.createElement('div');fb.className='ex-feedback';fb.id='exFeedback';fb.style.display='none';card.appendChild(fb);
  const nb=document.createElement('button');nb.className='abtn accent';nb.style.cssText='width:100%;margin-top:1rem;display:none';nb.id='exNextBtn';nb.textContent='next exercise →';nb.onclick=()=>{practiceIdx++;showNextExercise();};card.appendChild(nb);
  area.appendChild(card);
  if(ex.type==='build')renderBuildExercise(ex);
  else if(ex.type==='formal_casual')renderFormalCasualExercise(ex);
  else if(ex.type==='output')renderOutputExercise(ex);
  else renderChoiceExercise(ex);
}
function recordPracticeAnswer(correct){
  practiceScore.total++;practiceScore.total_ever++;
  if(correct){practiceScore.correct++;practiceScore.consecutive++;if(practiceScore.consecutive>=5)unlockAchievement('perfect_5');}
  else practiceScore.consecutive=0;
  if(practiceScore.total_ever>=10) unlockAchievement('practice_10');
  if(practiceScore.total_ever>=100) unlockAchievement('practice_100');
  const sn=document.querySelector('.score-num');if(sn)sn.textContent=practiceScore.correct+'/'+practiceScore.total;
}
function renderChoiceExercise(ex){
  document.getElementById('exPrompt').innerHTML=ex.prompt.replace('___','<span class="blank">___</span>');
  const choices=document.getElementById('choicesDiv');choices.innerHTML='';
  shuffle(ex.choices).forEach(c=>{const btn=document.createElement('button');btn.className='choice-btn';btn.textContent=c;btn.onclick=()=>submitChoiceAnswer(c,ex);choices.appendChild(btn);});
}
function submitChoiceAnswer(chosen,ex){
  if(answered) return;answered=true;const correct=chosen===ex.answer;recordPracticeAnswer(correct);
  document.querySelectorAll('.choice-btn').forEach(btn=>{if(btn.textContent===ex.answer)btn.classList.add('correct');else if(btn.textContent===chosen&&!correct)btn.classList.add('wrong');btn.onclick=null;});
  const pe=document.getElementById('exPrompt');if(pe&&ex.prompt)pe.innerHTML=ex.prompt.replace('___',`<span class="answer-fill" style="color:${correct?'#7ac8a0':'#c87a7a'}">${chosen}</span>`);
  showFeedback(correct,ex);
}
function renderBuildExercise(ex){
  document.getElementById('exPrompt').innerHTML='<span style="opacity:.5;font-size:.75rem">arrange blocks in correct order:</span>';
  document.getElementById('ansArea').innerHTML='<div class="build-slots" id="buildSlots"><span class="slot-hint">tap blocks below to place them here</span></div>';
  const choices=document.getElementById('choicesDiv');choices.innerHTML='';
  shuffle(ex.blocks).forEach(block=>{const btn=document.createElement('button');btn.className='block-btn';btn.textContent=block;btn.dataset.word=block;btn.onclick=()=>selectBlock(btn,block,ex);choices.appendChild(btn);});
}
function selectBlock(btn,block,ex){
  if(answered||btn.disabled) return;btn.disabled=true;btn.style.opacity='0.35';selectedBlocks.push(block);
  const slots=document.getElementById('buildSlots');slots.querySelector('.slot-hint')?.remove();
  const chip=document.createElement('span');chip.className='placed-block';chip.textContent=block;
  chip.onclick=()=>{if(answered)return;const idx=selectedBlocks.lastIndexOf(block);if(idx>=0){selectedBlocks.splice(idx,1);chip.remove();btn.disabled=false;btn.style.opacity='1';if(slots.children.length===0)slots.innerHTML='<span class="slot-hint">tap blocks below to place them here</span>';}};
  slots.appendChild(chip);if(selectedBlocks.length===ex.answer.length)setTimeout(()=>checkBuildAnswer(ex),300);
}
function checkBuildAnswer(ex){
  if(answered&&selectedBlocks.length<ex.answer.length) return;answered=true;const correct=selectedBlocks.join('|')===ex.answer.join('|');recordPracticeAnswer(correct);
  document.querySelectorAll('.placed-block').forEach((chip,i)=>{chip.style.color=correct?'#7ac8a0':(chip.textContent===ex.answer[i]?'#7ac8a0':'#c87a7a');});
  if(!correct){const slots=document.getElementById('buildSlots');const ans=document.createElement('div');ans.style.cssText='margin-top:8px;font-size:.75rem;color:#7ac8a0';ans.textContent='✓ '+ex.answer.join(' ');slots.parentNode.insertBefore(ans,slots.nextSibling);}
  showFeedback(correct,ex);
}
function renderFormalCasualExercise(ex){
  const prompt=document.getElementById('exPrompt');prompt.innerHTML='';
  const lbl=document.createElement('span');lbl.style.cssText='font-size:.7rem;color:var(--mu);display:block;margin-bottom:6px';lbl.textContent='formal version:';
  const ftxt=document.createElement('span');ftxt.style.cssText="font-family:'Noto Sans KR',sans-serif;font-size:1.1rem";ftxt.textContent=ex.formal;
  prompt.appendChild(lbl);prompt.appendChild(ftxt);
  const choices=document.getElementById('choicesDiv');choices.innerHTML='';
  const clbl=document.createElement('div');clbl.style.cssText='font-size:.7rem;color:var(--mu);margin-bottom:6px;width:100%';clbl.textContent='casual version:';choices.appendChild(clbl);
  shuffle(ex.choices).forEach(c=>{const btn=document.createElement('button');btn.className='choice-btn';btn.style.fontFamily="'Noto Sans KR',sans-serif";btn.textContent=c;btn.onclick=()=>submitChoiceAnswer(c,ex);choices.appendChild(btn);});
}
function renderOutputExercise(ex){
  const prompt=document.getElementById('exPrompt');prompt.innerHTML='<span style="font-size:.7rem;color:var(--mu);display:block;margin-bottom:4px">hint: '+ex.hint+'</span>';
  const ansArea=document.getElementById('ansArea');
  const input=document.createElement('input');input.type='text';input.placeholder='type your answer...';input.style.cssText="width:100%;font-family:'Noto Sans KR',sans-serif;font-size:1rem";input.id='outputInput';
  ansArea.appendChild(input);
  const submitBtn=document.createElement('button');submitBtn.className='abtn accent';submitBtn.style.marginTop='8px';submitBtn.textContent='check →';
  submitBtn.onclick=()=>{
    const val=input.value.trim();if(!val) return;const correct=val===ex.answer;recordPracticeAnswer(correct);
    const fb=document.getElementById('exFeedback');fb.style.display='block';fb.className='ex-feedback '+(correct?'fb-correct':'fb-wrong');
    fb.innerHTML='<div class="fb-result">'+(correct?'✓ correct':'✗ not quite')+'</div>'+(!correct?`<div class="fb-explanation">correct: <span style="font-family:Noto Sans KR,sans-serif">${ex.answer}</span></div>`:'')+'<div class="fb-explanation">'+ex.explanation+'</div>';
    document.getElementById('exNextBtn').style.display='block';input.disabled=true;submitBtn.disabled=true;
  };
  ansArea.appendChild(submitBtn);input.onkeydown=e=>{if(e.key==='Enter')submitBtn.click();};
  setTimeout(()=>input.focus(),100);
}
function showFeedback(correct,ex){
  const fb=document.getElementById('exFeedback');fb.style.display='block';fb.className='ex-feedback '+(correct?'fb-correct':'fb-wrong');
  fb.innerHTML=`<div class="fb-result">${correct?'✓ correct':'✗ not quite'}</div><div class="fb-explanation">${ex.explanation}</div>`;
  document.getElementById('exNextBtn').style.display='block';
}

// ── GRAMMAR TAB ───────────────────────────────────────────────────────────────
function renderGrammar(container){
  const notes=GRAMMAR[curLang]||[];container.innerHTML='';
  if(!notes.length){container.innerHTML='<div class="empty-msg">Grammar notes coming soon.</div>';return;}
  const wrap=document.createElement('div');wrap.style.cssText='padding:1.5rem 2rem;display:flex;flex-direction:column;gap:10px';
  const intro=document.createElement('div');intro.className='t-muted';intro.style.cssText='font-size:.75rem;padding-bottom:.5rem';
  intro.textContent=notes.length+' grammar topics — click any card to expand';wrap.appendChild(intro);
  const lc=['#7ac8a0','#c8a87a','#c87aa8'],ll=['beginner','intermediate','advanced'];
  notes.forEach(note=>{
    const card=document.createElement('div');card.className='grammar-card surface';
    const hdr=document.createElement('div');hdr.className='grammar-hdr';
    const left=document.createElement('div');left.className='grammar-left';
    const lvl=document.createElement('span');lvl.className='grammar-level';lvl.style.color=lc[(note.level||1)-1];lvl.textContent=ll[(note.level||1)-1];
    const title=document.createElement('div');title.className='grammar-title';title.textContent=note.title;
    const sh=document.createElement('div');sh.className='grammar-short t-muted';sh.textContent=note.short;
    left.appendChild(lvl);left.appendChild(title);left.appendChild(sh);
    const chev=document.createElement('span');chev.className='sec-chev';chev.textContent='▾';
    hdr.appendChild(left);hdr.appendChild(chev);
    const body=document.createElement('div');body.className='grammar-body';body.style.display='none';
    const bt=document.createElement('div');bt.className='grammar-text';bt.textContent=note.body;
    const ex=document.createElement('div');ex.className='grammar-example';
    ex.innerHTML='<div class="ex-label t-muted">example</div><pre class="ex-pre">'+note.example+'</pre>';
    const spk=document.createElement('button');spk.className='ubtn';spk.style.marginTop='8px';spk.textContent='▶ hear example';
    spk.onclick=()=>speak(note.example.split('\n')[0].split('→')[0].trim(),curLang);
    body.appendChild(bt);body.appendChild(ex);body.appendChild(spk);
    hdr.onclick=()=>{const open=body.style.display==='none';body.style.display=open?'block':'none';chev.textContent=open?'▴':'▾';card.classList.toggle('grammar-open',open);};
    card.appendChild(hdr);card.appendChild(body);wrap.appendChild(card);
  });
  container.appendChild(wrap);
}

// ── SONGS TAB ─────────────────────────────────────────────────────────────────
function renderSongs(container){
  try {
  const langSongs=SONGS.filter(s=>!s.lang||s.lang===curLang);
  if(!langSongs.length){container.innerHTML='<div class="empty-msg">No songs yet for this language — switch to Japanese to see よふかしのうた.</div>';return;}
  const wrap=document.createElement('div');wrap.style.cssText='padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1.2rem';
  langSongs.forEach(song=>{
    const songCard=document.createElement('div');songCard.className='song-card';
    const titleBar=document.createElement('div');titleBar.style.cssText=`background:${song.color}18;border-bottom:1px solid ${song.color}44;padding:1rem 1.2rem;display:flex;align-items:center;gap:12px;cursor:pointer;user-select:none`;
    const chev=document.createElement('span');chev.style.cssText='font-size:.65rem;color:var(--su);flex-shrink:0';chev.textContent='▾';
    const info=document.createElement('div');info.style.flex='1';info.innerHTML=`<div style="font-family:'DM Serif Display',serif;font-size:1.2rem;color:var(--tx)">${song.title} — ${song.titleRo}</div><div style="font-size:.68rem;color:var(--mu);margin-top:2px">${song.artist} · ${song.words.length} words</div>`;
    const addAll=document.createElement('button');addAll.className='abtn accent';addAll.textContent='+ add all to deck';addAll.onclick=e=>{e.stopPropagation();addSongToDeck(song,container);};
    titleBar.appendChild(chev);titleBar.appendChild(info);titleBar.appendChild(addAll);songCard.appendChild(titleBar);
    const body=document.createElement('div');body.style.display='none';
    const desc=document.createElement('div');desc.style.cssText='padding:.75rem 1.2rem;font-size:.74rem;color:var(--mu);line-height:1.7;border-bottom:1px solid var(--bd)';desc.textContent=song.desc;body.appendChild(desc);
    const grid=document.createElement('div');grid.style.cssText='padding:.85rem 1rem;display:flex;flex-direction:column;gap:6px';
    song.words.filter(Boolean).forEach(w=>{
      const wordObj=LANGS[song.lang||curLang]?.words.find(x=>x.kr===w.kr);const inDeck=wordObj&&deckColorFor(w.kr);
      const row=document.createElement('div');row.className='song-word-row';if(inDeck)row.style.borderColor=song.color;

      // ── header row: kanji + info + action buttons ──
      const rowHdr=document.createElement('div');rowHdr.style.cssText='display:flex;align-items:flex-start;gap:10px;padding:.7rem .9rem;cursor:pointer';

      // Large kanji on left
      const kj=document.createElement('span');
      kj.style.cssText=`font-family:'Noto Sans KR',sans-serif;font-size:1.8rem;font-weight:500;color:${inDeck?song.color:'var(--tx)'};min-width:2.6rem;text-align:center;flex-shrink:0;line-height:1.1`;
      kj.textContent=w.kr;

      // Middle: reading, meaning, lyric
      const wi=document.createElement('div');wi.style.flex='1';wi.style.minWidth='0';
      // only show romaji for non-kanji words (kana, expressions etc)
      const isAllKanji=/^[\u4e00-\u9fff]+$/.test(w.kr);
      if(!isAllKanji){const roEl=document.createElement('div');roEl.style.cssText='font-size:.65rem;color:var(--acc);margin-bottom:1px';roEl.textContent=w.ro;wi.appendChild(roEl);}
      const mnEl=document.createElement('div');mnEl.style.cssText='font-size:.82rem;color:var(--tx);font-weight:500;margin-bottom:3px';mnEl.textContent=w.meaning;
      const lyEl=document.createElement('div');lyEl.style.cssText='font-size:.63rem;color:var(--mu);font-style:italic;line-height:1.5';lyEl.textContent=w.lyric+' — '+w.lyricRo;
      wi.appendChild(mnEl);wi.appendChild(lyEl);

      // Right: action buttons + expand chevron (stacked vertically so they don't crowd)
      const right=document.createElement('div');right.style.cssText='display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0';

      // Button row: speak + add to deck
      const btnRow=document.createElement('div');btnRow.style.cssText='display:flex;align-items:center;gap:5px';
      const spk=document.createElement('button');spk.className='ubtn';spk.style.padding='4px 8px';spk.textContent='▶';spk.onclick=e=>{e.stopPropagation();speak(w.kr,'japanese');};btnRow.appendChild(spk);
      const addBtn=document.createElement('button');addBtn.className='abtn'+(inDeck?' accent':'');if(inDeck)addBtn.style.cssText=`background:${song.color};border-color:${song.color}`;
      addBtn.style.fontSize='.7rem';addBtn.textContent=inDeck?'✓ in deck':'+ deck';
      addBtn.onclick=e=>{e.stopPropagation();
        const langWords=LANGS[song.lang||'japanese']?.words||JAPANESE_WORDS;
        let target=langWords.find(x=>x.kr===w.kr);
        if(!target){target={kr:w.kr,ro:w.ro,meaning:w.meaning,example:w.lyric+' — '+w.lyricRo,pos:'noun',freq:5,register:'neutral'};langWords.push(target);}
        if(activeDeckIdx<0||activeDeckIdx>=decks.length){const n=prompt('Name your deck:','');if(!n?.trim())return;addDeck(n.trim());}
        if(decks[activeDeckIdx].words[w.kr]){delete decks[activeDeckIdx].words[w.kr];}else{decks[activeDeckIdx].words[w.kr]=true;}
        saveDeckState();renderSongs(container);};
      btnRow.appendChild(addBtn);right.appendChild(btnRow);

      // "sounds different sung" badge if present
      if(w.crush){const b=document.createElement('span');b.style.cssText='font-size:.52rem;padding:2px 6px;border-radius:99px;border:1px solid rgba(200,168,122,.35);color:var(--acc);white-space:nowrap';b.textContent='sounds different sung';right.appendChild(b);}

      // Expand chevron — only if there's a note
      const rc=document.createElement('span');rc.style.cssText='font-size:.6rem;color:var(--su);margin-top:2px';
      if(w.note) rc.textContent='▾ note'; else rc.textContent='';
      right.appendChild(rc);

      rowHdr.appendChild(kj);rowHdr.appendChild(wi);rowHdr.appendChild(right);

      // ── note panel (hidden by default) ──
      const noteEl=document.createElement('div');noteEl.className='song-note-body';

      if(w.note){
        const sentences = w.note.split(/\.\s+/).filter(Boolean);
        if(sentences.length <= 1){
          const p=document.createElement('p');
          p.style.cssText='font-size:.73rem;color:var(--mu);line-height:1.75;margin:0';
          p.textContent=w.note;
          noteEl.appendChild(p);
        } else {
          const ul=document.createElement('ul');
          ul.style.cssText='margin:0;padding-left:1.1rem;display:flex;flex-direction:column;gap:4px';
          sentences.forEach(s=>{
            const li=document.createElement('li');
            li.style.cssText='font-size:.73rem;color:var(--mu);line-height:1.65';
            li.textContent=s.endsWith('.')?s:s+'.';
            ul.appendChild(li);
          });
          noteEl.appendChild(ul);
        }
      }
      const hasDetail=!!w.note;
      let noteOpen=false;
      rowHdr.onclick=()=>{
        if(!hasDetail) return;
        noteOpen=!noteOpen;
        noteEl.style.display=noteOpen?'block':'none';
        rc.textContent=noteOpen?'▴ note':'▾ note';
      };
      if(!hasDetail) rc.textContent='';
      row.appendChild(rowHdr);
      if(hasDetail) row.appendChild(noteEl);
      grid.appendChild(row);
    });
    body.appendChild(grid);songCard.appendChild(body);
    let isOpen=false;titleBar.onclick=e=>{if(addAll.contains(e.target))return;isOpen=!isOpen;body.style.display=isOpen?'block':'none';chev.textContent=isOpen?'▴':'▾';};
    wrap.appendChild(songCard);
  });
  container.appendChild(wrap);
  } catch(e) { container.innerHTML = '<div class="empty-msg" style="color:#c87a7a">songs error: ' + e.message + '</div>'; console.error('renderSongs error:', e); }
}
function addSongToDeck(song,container){
  if(activeDeckIdx<0||activeDeckIdx>=decks.length){
    const n=prompt('Name for new deck:',song.title);if(!n||!n.trim())return;
    addDeck(n.trim());decks[decks.length-1].color=song.color;
  }
  const idx=activeDeckIdx>=0?activeDeckIdx:decks.length-1;
  const langWords=LANGS[song.lang||'japanese']?.words||JAPANESE_WORDS;
  let added=0;
  song.words.filter(Boolean).forEach(w=>{
    if(!langWords.find(x=>x.kr===w.kr)){
      langWords.push({kr:w.kr,ro:w.ro,meaning:w.meaning,example:w.lyric+' — '+w.lyricRo,pos:'noun',freq:5,register:'neutral'});
    }
    decks[idx].words[w.kr]=true;added++;
  });
  saveDeckState();checkAchievements();
  showToast('Added '+added+' words to "'+decks[idx].name+'"');
  renderSongs(container);
}

// ── MEDALS TAB ────────────────────────────────────────────────────────────────
// ── THEME SYSTEM ──────────────────────────────────────────────────────────────
const ACCENT_COLORS = [
  // Tier 1 — unlocked with Week Warrior (streak_7)
  {id:'acc_default',    label:'Default',       value:'#c8a87a', tier:0, unlock:null},
  {id:'acc_sakura',     label:'Sakura Pink',   value:'#e8829a', tier:1, unlock:'streak_7'},
  {id:'acc_indigo',     label:'Indigo',        value:'#6b7fd7', tier:1, unlock:'streak_7'},
  {id:'acc_matcha',     label:'Matcha Green',  value:'#7ac8a0', tier:1, unlock:'streak_7'},
  {id:'acc_sunset',     label:'Sunset Orange', value:'#e09060', tier:1, unlock:'streak_7'},
  {id:'acc_violet',     label:'Violet',        value:'#a87ac8', tier:1, unlock:'streak_7'},
  {id:'acc_aqua',       label:'Aqua',          value:'#5bc8c8', tier:1, unlock:'streak_7'},
  {id:'acc_ruby',       label:'Ruby Red',      value:'#c85a5a', tier:1, unlock:'streak_7'},
  {id:'acc_gold',       label:'Gold',          value:'#d4a820', tier:1, unlock:'streak_7'},
  // Tier 2 — unlocked with Vocabulary Rich (words_200)
  {id:'acc_plum',       label:'Plum',          value:'#8b4f8b', tier:2, unlock:'words_200'},
  {id:'acc_teal',       label:'Teal',          value:'#2a9d8f', tier:2, unlock:'words_200'},
  {id:'acc_crimson',    label:'Crimson',       value:'#b5173a', tier:2, unlock:'words_200'},
  {id:'acc_amber',      label:'Amber',         value:'#e0920a', tier:2, unlock:'words_200'},
  {id:'acc_sky',        label:'Sky Blue',      value:'#4fb3d9', tier:2, unlock:'words_200'},
  {id:'acc_lavender',   label:'Lavender',      value:'#9b89c8', tier:2, unlock:'words_200'},
  {id:'acc_forest',     label:'Forest',        value:'#3a7d44', tier:2, unlock:'words_200'},
  {id:'acc_rose',       label:'Rose',          value:'#d4607a', tier:2, unlock:'words_200'},
  // Tier 3 — Shield Bearer
  {id:'acc_shield',     label:'Shield Blue',   value:'#4a8fc8', tier:3, unlock:'shield_used'},
];

const BG_THEMES = [
  // Unlocked with Dedicated (streak_14)
  {
    id:'theme_paper', label:'Paper', unlock:'streak_14', tier:'standard',
    desc:'Light, clean, easy on the eyes.',
    vars:{'--bg':'#f5f0e8','--sf':'#ede8de','--sf2':'#e5dfd4','--tx':'#2a2520','--mu':'#7a7268','--bd':'rgba(42,37,32,.12)','--bd2':'rgba(42,37,32,.2)'},
  },
  {
    id:'theme_midnight', label:'Midnight', unlock:'streak_14', tier:'standard',
    desc:'Deep navy dark mode.',
    vars:{'--bg':'#0d1117','--sf':'#161b22','--sf2':'#1c2330','--tx':'#e6edf3','--mu':'#7d8590','--bd':'rgba(240,246,252,.1)','--bd2':'rgba(240,246,252,.2)'},
  },
  {
    id:'theme_sakura_mist', label:'Sakura Mist', unlock:'streak_14', tier:'standard',
    desc:'Soft pink with warm neutrals.',
    vars:{'--bg':'#fff0f3','--sf':'#ffe4ea','--sf2':'#ffd6df','--tx':'#3d2030','--mu':'#9a7080','--bd':'rgba(180,80,100,.15)','--bd2':'rgba(180,80,100,.25)'},
  },
  {
    id:'theme_matcha_wash', label:'Matcha Wash', unlock:'streak_14', tier:'standard',
    desc:'Muted green with earthy tones.',
    vars:{'--bg':'#f0f4ee','--sf':'#e4ebe0','--sf2':'#d8e2d3','--tx':'#1e2e1a','--mu':'#607060','--bd':'rgba(50,90,40,.15)','--bd2':'rgba(50,90,40,.25)'},
  },
  {
    id:'theme_ink_blue', label:'Ink Blue', unlock:'streak_14', tier:'standard',
    desc:'Dark indigo with cool grays.',
    vars:{'--bg':'#0f1524','--sf':'#181f34','--sf2':'#1e2840','--tx':'#dde4f0','--mu':'#6a7a9a','--bd':'rgba(180,200,240,.1)','--bd2':'rgba(180,200,240,.2)'},
  },
  {
    id:'theme_warm_sand', label:'Warm Sand', unlock:'streak_14', tier:'standard',
    desc:'Tan background with warm text.',
    vars:{'--bg':'#f2ead8','--sf':'#ebe0c6','--sf2':'#e2d5b4','--tx':'#2e2418','--mu':'#806a50','--bd':'rgba(100,70,30,.15)','--bd2':'rgba(100,70,30,.25)'},
  },
  {
    id:'theme_lavender_fog', label:'Lavender Fog', unlock:'streak_14', tier:'standard',
    desc:'Light purple with cool grays.',
    vars:{'--bg':'#f2f0f8','--sf':'#e8e4f4','--sf2':'#ddd8ee','--tx':'#281e3c','--mu':'#7068a0','--bd':'rgba(100,80,160,.15)','--bd2':'rgba(100,80,160,.25)'},
  },
  {
    id:'theme_charcoal', label:'Charcoal', unlock:'streak_14', tier:'standard',
    desc:'Dark gray, softer than pure black.',
    vars:{'--bg':'#1a1a1a','--sf':'#242424','--sf2':'#2c2c2c','--tx':'#e8e8e8','--mu':'#888888','--bd':'rgba(255,255,255,.1)','--bd2':'rgba(255,255,255,.18)'},
  },
  // Premium — Monthly Master (streak_30)
  {
    id:'theme_tokyo_night', label:'Tokyo Night', unlock:'streak_30', tier:'premium',
    desc:'Deep purple-black with neon traces.',
    vars:{'--bg':'#1a1b26','--sf':'#24283b','--sf2':'#292e42','--tx':'#c0caf5','--mu':'#565f89','--bd':'rgba(192,202,245,.1)','--bd2':'rgba(192,202,245,.18)'},
  },
  {
    id:'theme_kyoto_garden', label:'Kyoto Garden', unlock:'streak_30', tier:'premium',
    desc:'Forest greens, wood tones, quiet depth.',
    vars:{'--bg':'#0e1a12','--sf':'#162218','--sf2':'#1c2c20','--tx':'#d4e8d0','--mu':'#608060','--bd':'rgba(150,220,150,.1)','--bd2':'rgba(150,220,150,.18)'},
  },
  {
    id:'theme_rainy_window', label:'Rainy Window', unlock:'streak_30', tier:'premium',
    desc:'Slate grays, cool blues, overcast light.',
    vars:{'--bg':'#1c2028','--sf':'#242a34','--sf2':'#2a303e','--tx':'#b8c4d4','--mu':'#5a6880','--bd':'rgba(180,200,230,.1)','--bd2':'rgba(180,200,230,.18)'},
  },
  {
    id:'theme_study_desk', label:'Study Desk', unlock:'streak_30', tier:'premium',
    desc:'Warm cream, soft amber, library feel.',
    vars:{'--bg':'#f8f2e0','--sf':'#f0e8d0','--sf2':'#e8dcc0','--tx':'#28200c','--mu':'#806040','--bd':'rgba(120,80,20,.15)','--bd2':'rgba(120,80,20,.25)'},
  },
  {
    id:'theme_moonlit_ink', label:'Moonlit Ink', unlock:'streak_30', tier:'premium',
    desc:'Deep black with silver and pale violet.',
    vars:{'--bg':'#0c0c14','--sf':'#141420','--sf2':'#1a1a28','--tx':'#e0ddf0','--mu':'#706880','--bd':'rgba(200,196,230,.1)','--bd2':'rgba(200,196,230,.18)'},
  },
  {
    id:'theme_lantern_street', label:'Lantern Street', unlock:'streak_30', tier:'premium',
    desc:'Warm amber-orange glow, deep background.',
    vars:{'--bg':'#180e06','--sf':'#221408','--sf2':'#2c1a0c','--tx':'#f0d8a8','--mu':'#906040','--bd':'rgba(240,180,80,.1)','--bd2':'rgba(240,180,80,.18)'},
  },
  {
    id:'theme_neon_arcade', label:'Neon Arcade', unlock:'streak_30', tier:'premium',
    desc:'Dark background, electric highlights.',
    vars:{'--bg':'#0a0a14','--sf':'#12121e','--sf2':'#181828','--tx':'#f0f0ff','--mu':'#6060a0','--bd':'rgba(120,80,255,.15)','--bd2':'rgba(120,80,255,.25)'},
  },
  // Legendary — Diamond Mind (streak_100)
  {
    id:'theme_diamond_focus', label:'Diamond Focus', unlock:'streak_100', tier:'legendary',
    desc:'Earned. Clean, sharp, nothing wasted.',
    vars:{'--bg':'#080c14','--sf':'#0e1420','--sf2':'#141c2c','--tx':'#eef2ff','--mu':'#6070a0','--bd':'rgba(160,180,240,.12)','--bd2':'rgba(160,180,240,.22)'},
  },
];

// Which themes / accents are available given unlocked achievements
function getUnlockedThemeIds() {
  const u = getUnlocked();
  const ids = new Set(['acc_default', 'theme_dark', 'theme_light']); // always available
  [...ACCENT_COLORS, ...BG_THEMES].forEach(t => {
    if (!t.unlock || u.includes(t.unlock)) ids.add(t.id);
  });
  return ids;
}

function getActiveAccent() { return localStorage.getItem('lf-accent') || 'acc_default'; }
function getActiveBgTheme() { return localStorage.getItem('lf-bg-theme') || null; }

function applyAccent(id) {
  const acc = ACCENT_COLORS.find(a => a.id === id);
  if (!acc) return;
  localStorage.setItem('lf-accent', id);
  document.body.style.setProperty('--acc', acc.value);
  document.body.style.setProperty('--acc-bd', acc.value + '40');
  document.body.style.setProperty('--acc-bg', acc.value + '14');
}

function applyBgTheme(id) {
  if (!id) { clearBgTheme(); return; }
  const t = BG_THEMES.find(x => x.id === id);
  if (!t) return;
  localStorage.setItem('lf-bg-theme', id);
  Object.entries(t.vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  // Remove body class dark/light since theme overrides everything
  document.body.setAttribute('data-custom-theme', id);
}

function clearBgTheme() {
  localStorage.removeItem('lf-bg-theme');
  BG_THEMES.forEach(t => Object.keys(t.vars).forEach(k => document.documentElement.style.removeProperty(k)));
  document.body.removeAttribute('data-custom-theme');
}

function applyStoredThemes() {
  const accentId = getActiveAccent();
  if (accentId !== 'acc_default') applyAccent(accentId);
  const bgId = getActiveBgTheme();
  if (bgId) applyBgTheme(bgId);
}

// ── THEMES TAB ────────────────────────────────────────────────────────────────
function renderThemes(container) {
  container.innerHTML = '';
  const wrap = document.createElement('div'); wrap.style.cssText = 'padding:1.5rem 2rem;display:flex;flex-direction:column;gap:2rem';
  const unlockedIds = getUnlockedThemeIds();
  const activeAccent = getActiveAccent();
  const activeBg = getActiveBgTheme();

  // ── Accent Colors ──
  const accentSec = document.createElement('div');
  const accentTitle = document.createElement('div');
  accentTitle.innerHTML = '<div style="font-family:\'DM Serif Display\',serif;font-size:1.1rem;color:var(--tx);margin-bottom:.3rem">accent color</div><div style="font-size:.72rem;color:var(--mu);margin-bottom:1rem">changes buttons, links, and highlights throughout the app</div>';
  accentSec.appendChild(accentTitle);

  const tiers = [
    {label:'always available', ids: ['acc_default']},
    {label:'week warrior — 7 day streak', unlock:'streak_7', ids: ACCENT_COLORS.filter(a=>a.tier===1).map(a=>a.id)},
    {label:'vocabulary rich — 200 words', unlock:'words_200', ids: ACCENT_COLORS.filter(a=>a.tier===2).map(a=>a.id)},
    {label:'shield bearer — use streak shield', unlock:'shield_used', ids: ACCENT_COLORS.filter(a=>a.tier===3).map(a=>a.id)},
  ];

  tiers.forEach(tier => {
    const tierLabel = document.createElement('div');
    const tierUnlocked = !tier.unlock || unlockedIds.has(tier.ids[0]);
    tierLabel.style.cssText = `font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:${tierUnlocked?'var(--acc)':'var(--mu)'};margin-bottom:.5rem;margin-top:.75rem`;
    tierLabel.textContent = tier.label;
    accentSec.appendChild(tierLabel);

    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    tier.ids.forEach(id => {
      const acc = ACCENT_COLORS.find(a => a.id === id); if (!acc) return;
      const isUnlocked = unlockedIds.has(id);
      const isActive = activeAccent === id;
      const btn = document.createElement('button');
      btn.style.cssText = `display:flex;align-items:center;gap:8px;padding:6px 12px 6px 8px;border-radius:8px;border:1.5px solid ${isActive ? acc.value : isUnlocked ? 'var(--bd2)' : 'var(--bd)'};background:${isActive ? acc.value+'18' : 'var(--sf)'};cursor:${isUnlocked?'pointer':'not-allowed'};opacity:${isUnlocked?'1':'.4'};font-family:'DM Mono',monospace;font-size:.72rem;color:${isActive?acc.value:'var(--tx)'};transition:all .15s`;
      btn.innerHTML = `<span style="width:14px;height:14px;border-radius:50%;background:${acc.value};flex-shrink:0;display:inline-block;${!isUnlocked?'filter:grayscale(1)':''}"></span>${acc.label}${isActive?' ✓':''}`;
      if (isUnlocked) {
        btn.onclick = () => { applyAccent(id); renderThemes(container); };
      }
      grid.appendChild(btn);
    });
    accentSec.appendChild(grid);
  });
  wrap.appendChild(accentSec);

  // ── Background Themes ──
  const bgSec = document.createElement('div');
  const bgTitle = document.createElement('div');
  bgTitle.innerHTML = '<div style="font-family:\'DM Serif Display\',serif;font-size:1.1rem;color:var(--tx);margin-bottom:.3rem">background theme</div><div style="font-size:.72rem;color:var(--mu);margin-bottom:.5rem">changes the whole visual feel of the app</div>';
  bgSec.appendChild(bgTitle);

  // Reset button
  const resetRow = document.createElement('div'); resetRow.style.cssText = 'margin-bottom:.75rem';
  const resetBtn = document.createElement('button');
  resetBtn.className = 'ubtn' + (!activeBg ? ' on' : '');
  resetBtn.textContent = !activeBg ? '✓ default (dark / light)' : 'default (dark / light)';
  resetBtn.onclick = () => { clearBgTheme(); renderThemes(container); };
  resetRow.appendChild(resetBtn);
  bgSec.appendChild(resetRow);

  const bgTierGroups = [
    {label:'dedicated — 14 day streak', unlock:'streak_14', tier:'standard'},
    {label:'monthly master — 30 day streak', unlock:'streak_30', tier:'premium'},
    {label:'diamond mind — 100 day streak', unlock:'streak_100', tier:'legendary'},
  ];

  bgTierGroups.forEach(tg => {
    const themes = BG_THEMES.filter(t => t.tier === tg.tier);
    const tierUnlocked = unlockedIds.has(themes[0]?.id);
    const tLabel = document.createElement('div');
    tLabel.style.cssText = `font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:${tierUnlocked?'var(--acc)':'var(--mu)'};margin-bottom:.6rem;margin-top:.85rem`;
    tLabel.textContent = tg.label;
    bgSec.appendChild(tLabel);

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px';

    themes.forEach(t => {
      const isUnlocked = unlockedIds.has(t.id);
      const isActive = activeBg === t.id;
      const bg   = t.vars['--bg']   || '#111';
      const sf   = t.vars['--sf']   || '#1a1a1a';
      const tx   = t.vars['--tx']   || '#eee';
      const mu   = t.vars['--mu']   || '#888';
      const bd   = t.vars['--bd']   || 'rgba(255,255,255,.1)';

      const card = document.createElement('div');
      card.style.cssText = `border-radius:10px;overflow:hidden;border:2px solid ${isActive?'var(--acc)':isUnlocked?'var(--bd2)':'var(--bd)'};cursor:${isUnlocked?'pointer':'not-allowed'};opacity:${isUnlocked?'1':'.4'};transition:all .15s`;

      // Mini preview
      const preview = document.createElement('div');
      preview.style.cssText = `background:${bg};padding:10px 12px 8px;`;
      preview.innerHTML = `
        <div style="background:${sf};border-radius:5px;padding:6px 8px;margin-bottom:5px;border:1px solid ${bd}">
          <div style="width:60%;height:5px;border-radius:3px;background:${tx};margin-bottom:3px;opacity:.8"></div>
          <div style="width:40%;height:4px;border-radius:3px;background:${mu}"></div>
        </div>
        <div style="display:flex;gap:4px">
          <div style="flex:1;height:4px;border-radius:2px;background:${mu};opacity:.4"></div>
          <div style="flex:2;height:4px;border-radius:2px;background:${mu};opacity:.4"></div>
        </div>`;

      const label = document.createElement('div');
      label.style.cssText = `padding:6px 10px;background:var(--sf);display:flex;justify-content:space-between;align-items:center`;
      label.innerHTML = `<span style="font-size:.72rem;font-family:'DM Mono',monospace;color:${isActive?'var(--acc)':'var(--tx)'}">${t.label}</span>${isActive?'<span style="font-size:.65rem;color:var(--acc)">✓</span>':''}`;

      card.appendChild(preview); card.appendChild(label);
      if (isUnlocked) {
        card.onclick = () => { applyBgTheme(t.id); renderThemes(container); };
        card.onmouseenter = () => { if (!isActive) card.style.borderColor = 'var(--acc)'; };
        card.onmouseleave = () => { if (!isActive) card.style.borderColor = isUnlocked ? 'var(--bd2)' : 'var(--bd)'; };
      } else {
        // Show tooltip with unlock condition
        card.title = 'unlock: ' + tg.label;
      }
      grid.appendChild(card);
    });
    bgSec.appendChild(grid);
  });
  wrap.appendChild(bgSec);
  container.appendChild(wrap);
}

function renderMedals(container){
  container.innerHTML='';
  const wrap=document.createElement('div');wrap.style.cssText='padding:1.5rem 2rem';
  const streak=getStreak(),unlocked=getUnlocked();
  const sc=document.createElement('div');sc.style.cssText='border:1px solid var(--acc-bd);border-radius:12px;padding:1.2rem 1.5rem;background:var(--acc-bg);display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem;flex-wrap:wrap';
  sc.innerHTML=`<div style="text-align:center;flex-shrink:0"><div style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;color:#c87a7a;margin:0 auto">${ACHIEVEMENT_ICONS.streak_3}</div><div style="font-size:2rem;font-weight:500;color:var(--acc);font-family:'DM Serif Display',serif">${streak.count}</div><div style="font-size:.65rem;color:var(--mu);letter-spacing:.08em;text-transform:uppercase">day streak</div></div><div style="flex:1;min-width:160px"><div style="font-size:.78rem;color:var(--tx);margin-bottom:4px">keep it going — study every day to grow your streak.</div>${streak.shield>0?`<div style="font-size:.72rem;color:#7a8cc8;margin-top:6px;display:flex;align-items:center;gap:6px">${achievementIcon('shield_used','#7a8cc8',16)} you have ${streak.shield} streak shield${streak.shield>1?'s':''} — protected if you miss a day.</div>`:''}${streak.count>=6&&streak.shield===0?'<div style="font-size:.72rem;color:var(--mu);margin-top:6px">reach 7 days to earn a streak shield.</div>':''}</div>`;
  wrap.appendChild(sc);
  const gt=document.createElement('div');gt.style.cssText='font-family:"DM Serif Display",serif;font-size:1.2rem;color:var(--tx);margin-bottom:.85rem';gt.textContent='achievements';wrap.appendChild(gt);
  const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px';
  ACHIEVEMENTS.forEach(a=>{
    const done=unlocked.includes(a.id);
    const card=document.createElement('div');card.style.cssText=`border:1px solid ${done?a.color+'60':'var(--bd)'};border-radius:10px;padding:.9rem 1rem;background:${done?a.color+'10':'var(--sf)'};display:flex;gap:12px;align-items:flex-start;opacity:${done?'1':'.45'};transition:opacity .2s`;
    const cosm=[...ACCENT_COLORS,...BG_THEMES].find(t=>t.unlock===a.id);
    const cosmHtml=cosm?`<div style="font-size:.6rem;color:${done?a.color:'var(--mu)'};margin-top:3px">${done?'+ ':''}${cosm.label} — themes tab</div>`:'';
    card.innerHTML=`${achievementIcon(a.id,done?a.color:'var(--bd2)',36)}<div style="min-width:0"><div style="font-size:.78rem;font-weight:500;color:${done?a.color:'var(--tx)'};margin-bottom:2px">${a.name}</div><div style="font-size:.65rem;color:var(--mu);line-height:1.5">${a.desc}</div>${done?`<div style="font-size:.6rem;color:${a.color};margin-top:4px;letter-spacing:.06em">✓ unlocked</div>`:''}${cosmHtml}</div>`;
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  const sm=document.createElement('div');sm.style.cssText='margin-top:1.2rem;font-size:.72rem;color:var(--mu)';sm.textContent=unlocked.length+' of '+ACHIEVEMENTS.length+' achievements unlocked';wrap.appendChild(sm);
  container.appendChild(wrap);
}

// ── CUSTOM WORD BUILDER ───────────────────────────────────────────────────────
let cwbText='';
const CWB_CHARS={
  korean:[
    {label:'vowels',chars:['아','야','어','여','오','요','우','유','으','이','애','에','외','위','와','워','의']},
    {label:'consonants',chars:['가','나','다','라','마','바','사','아','자','차','카','타','파','하']},
    {label:'common syllables',chars:['안','는','에','서','를','가','이','한','의','지','그','들','하','도','다','요','게','만','와','수','로','으','나','이다','있','없','해','해요','어요','아요','았','었','겠','세요']},
  ],
  italian:[
    {label:'vowels',chars:['a','e','i','o','u','à','è','ì','ò','ù','é']},
    {label:'consonants',chars:['b','c','d','f','g','h','l','m','n','p','q','r','s','t','v','z']},
    {label:'common words',chars:['il','la','lo','i','le','gli','un','una','di','del','della','in','a','e','non','mi','ti','si','ci','vi','ho','hai','ha','sei','sono','che','per','con']},
  ],
  japanese:[
    {label:'hiragana vowels',chars:['あ','い','う','え','お']},
    {label:'hiragana k-row',chars:['か','き','く','け','こ']},
    {label:'hiragana s-row',chars:['さ','し','す','せ','そ']},
    {label:'hiragana t-row',chars:['た','ち','つ','て','と']},
    {label:'hiragana n-row',chars:['な','に','ぬ','ね','の','ん']},
    {label:'hiragana h/m/y/r/w',chars:['は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を']},
    {label:'accents',chars:['が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ']},
    {label:'katakana',chars:['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン']},
  ],
};
function openCustomWord(){cwbText='';document.getElementById('cwbDisplay').textContent='';document.getElementById('cwbRo').value='';document.getElementById('cwbMeaning').value='';buildCwbAlpha();document.getElementById('customWordOverlay').classList.add('open');}
function closeCustomWord(){document.getElementById('customWordOverlay').classList.remove('open');}
function buildCwbAlpha(){
  const c=document.getElementById('cwbAlpha');c.innerHTML='';
  (CWB_CHARS[curLang]||CWB_CHARS.korean).forEach(group=>{
    const lbl=document.createElement('div');lbl.className='cwb-section-label';lbl.textContent=group.label;c.appendChild(lbl);
    group.chars.forEach(ch=>{const btn=document.createElement('button');btn.className='cwb-char';btn.textContent=ch;btn.onclick=()=>{cwbText+=ch;document.getElementById('cwbDisplay').textContent=cwbText;};c.appendChild(btn);});
  });
}
function cwbBackspace(){const chars=[...cwbText];chars.pop();cwbText=chars.join('');document.getElementById('cwbDisplay').textContent=cwbText;}
function cwbClear(){cwbText='';document.getElementById('cwbDisplay').textContent='';}
function cwbAddSpace(){cwbText+=' ';document.getElementById('cwbDisplay').textContent=cwbText;}
function cwbSave(){
  const word=cwbText.trim(),ro=document.getElementById('cwbRo').value.trim(),meaning=document.getElementById('cwbMeaning').value.trim();
  if(!word){showToast('Type a word first!');return;}if(!meaning){showToast('Add a meaning for the word');return;}
  LANGS[curLang].words.push({kr:word,ro:ro||word,meaning,example:word+' — '+meaning,pos:'expression',freq:7,register:'neutral',_custom:true});
  if(activeDeckIdx>=0&&activeDeckIdx<decks.length){decks[activeDeckIdx].words[word]=true;saveDeckState();showToast('"'+word+'" added to '+decks[activeDeckIdx].name+'!');}
  else showToast('"'+word+'" added to vocabulary!');
  cwbText='';document.getElementById('cwbDisplay').textContent='';document.getElementById('cwbRo').value='';document.getElementById('cwbMeaning').value='';
  renderWordGrid();renderDeckChips();
}

// ── GUIDE TAB ─────────────────────────────────────────────────────────────────
const ROADMAPS={
  korean:[
    {stage:1,label:'foundations',color:'#7ac8a0',milestones:[
      {title:'Learn Hangul (the alphabet)',desc:"Korean's alphabet is 14 consonants + 10 vowels arranged into syllable blocks. Research shows most learners can read it in 2–4 hours of focused study, and fluently within a week. It's genuinely phonetic — every sound has exactly one symbol.",tip:'Start with ㅏ ㅣ ㅗ ㅜ ㅡ (the 5 base vowels), then add ㄱ ㄴ ㄷ ㅁ ㅂ ㅅ (the 6 most common consonants). You can read 70% of syllables with just those 11 characters.'},
      {title:'Learn 50 high-frequency words in context',desc:"Don't learn words in isolation — the research is clear that vocabulary learned in sentences sticks 2–3x better than word lists. Start with the top 50 words that appear in everyday speech: 저, 나, 이, 그, 있다, 없다, 하다, 되다, 가다, 오다, 알다, 모르다, 좋다, 싶다, 같다, 줄다, 보다, 말하다, 생각하다, 사람.",tip:'Use the sentence-first practice type in this app. It shows you the word in a real sentence and asks you to identify it — this is sentence mining, one of the most research-supported vocabulary methods.',actionLabel:'practice sentences →',action:()=>{practiceFilter='sentence';switchTab('practice');}},
      {title:'Understand SOV word order and particles',desc:"Korean sentences are Subject-Object-Verb: \"I sushi ate.\" Particles (은/는, 이/가, 을/를) mark what each word is doing, which is why word order is flexible. Particles replace the job that word order does in English.",tip:'은/는 marks the topic (what we\'re talking about). 이/가 marks the subject (who does it). 을/를 marks the object (what receives the action). You don\'t need to master the difference right away — just noticing them is enough to start.',actionLabel:'practice particles →',action:()=>{practiceFilter='particle';switchTab('practice');}},
      {title:'Learn present tense + polite endings',desc:'The core pattern: verb stem + 아요/어요 for polite present. This one pattern lets you make hundreds of sentences. Vowel harmony decides which ending: stems with ㅏ or ㅗ use 아요, everything else uses 어요.',tip:'먹다 → 먹어요 (eat). 가다 → 가요 (go). 오다 → 와요 (come, irregular). Learn these three as fixed phrases first before worrying about the rule.',actionLabel:'practice conjugation →',action:()=>{practiceFilter='conjugate';switchTab('practice');}},
    ]},
    {stage:2,label:'building blocks',color:'#c8a87a',milestones:[
      {title:'Learn past and future tense',desc:'Past: verb stem + 았어요/었어요. Future/intention: verb stem + ㄹ/을 거예요. With present, past, and future, you can talk about most real situations.',tip:'갔어요 (went), 먹었어요 (ate), 했어요 (did) — three past forms that cover huge ground. 할 거예요 (will do), 갈 거예요 (will go) for future.',actionLabel:'review grammar →',action:()=>switchTab('grammar')},
      {title:'Master formality registers',desc:"Korean has distinct formal and casual speech. 존댓말 (polite) ends in -요. 반말 (casual) drops it. Using the wrong register with the wrong person is a real social error — more so than in Italian or Japanese.",tip:'Default to -요 endings with everyone until they invite you to use casual speech (편하게 얘기해요). K-drama dialogue is mostly 반말 between friends — great for hearing both registers.',actionLabel:'practice formality drills →',action:()=>{practiceFilter='formal_casual';switchTab('practice');}},
      {title:'Build vocabulary to 200+ words through immersion',desc:"Once you have grammar foundations, vocabulary is the main bottleneck. Research (Nation, 2001) shows you need ~2,000 word families to understand 95% of everyday speech. Immersion — K-dramas, K-pop, podcasts — is the most efficient path because your brain processes emotionally engaging content differently than study materials.",tip:'The assisted reading tool below is designed for this: paste a lyric, subtitle line, or text message you actually received, and tap unknown words to add them to your deck.',actionLabel:'try reading tool ↓',action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'})},
      {title:'Learn connecting expressions',desc:'그리고 (and), 그런데/근데 (but), 왜냐하면/왜냐면 (because), 그래서 (so), 그럼 (then), 아니면 (or). These are the connective tissue of real Korean — without them your sentences sound like a vocabulary list.',tip:'Listen for 근데 (casual 그런데) constantly in K-drama. It\'s the most frequent discourse marker in spoken Korean.'},
    ]},
    {stage:3,label:'conversational',color:'#7a8cc8',milestones:[
      {title:'Read without romanization',desc:"Romanization is training wheels. Once you can read Hangul at all, romanization actively slows you down by routing through English sounds instead of Korean sounds. The goal is for 안녕하세요 to trigger a sound directly, not the detour 'an-nyeong-ha-se-yo'.",tip:'Turn off romanization in this app and stay uncomfortable for a week. Your reading speed will double within a month.',actionLabel:'toggle romanization →',action:()=>{if(showRomanization)toggleRomanization();switchTab('vocab');}},
      {title:'Learn -(으)면, -아/어서, -고, -(으)니까',desc:'These four connectors turn two sentences into one and are the backbone of complex Korean speech. -(으)면 = if/when. -아/어서 = because/and then. -고 = and (listing). -(으)니까 = because (stronger, with explanation).',tip:'가면 (if you go), 먹어서 배불러요 (I\'m full because I ate), 피곤하니까 자요 (I\'m going to sleep because I\'m tired). One pattern per week for a month covers most compound sentences.',actionLabel:'read grammar →',action:()=>switchTab('grammar')},
      {title:'Use comprehensible input daily',desc:"The single most research-supported principle in language acquisition: you acquire language from input you mostly understand, not from input you're studying. 30 minutes of a Korean drama you enjoy does more than 30 minutes of drills.",tip:'Choose content with Korean subtitles, not English ones. NHK Korean, TTMIK podcast, and Integrated Korean listening resources are well-calibrated to intermediate level.'},
    ]},
    {stage:4,label:'intermediate',color:'#c87aa8',milestones:[
      {title:'Learn honorific vocabulary',desc:'Korean has entirely different words for polite contexts, not just different endings. 먹다 → 드시다 (eat, respectful). 있다 → 계시다 (be, respectful). 말하다 → 말씀하시다 (speak, respectful). These matter in professional and formal settings.',tip:'You do not need these until stage 3–4. Learning them too early causes confusion. At this stage they are worth the investment.'},
      {title:'Mine vocabulary from content you love',desc:"Research on incidental vocabulary acquisition shows that learners who engage with genuinely interesting content learn 2–3x more words per hour than those using textbooks, because emotional engagement drives retention. K-pop lyrics, Korean webtoons, and dramas are legitimate study material.",tip:'The sentence-first practice type in this app is designed for this: words you find in the wild, added to your deck, then tested in their original sentence context.',actionLabel:'practice sentences →',action:()=>{practiceFilter='sentence';switchTab('practice');}},
    ]},
  ],
  italian:[
    {stage:1,label:'foundations',color:'#7ac8a0',milestones:[
      {title:'Learn pronunciation first',desc:"Italian spelling is nearly phonetic — once you know the 6 rules (c vs ch, g vs gh, gn, gli, sc, double consonants), you can pronounce any word correctly. This matters more in Italian than most languages because mispronunciation genuinely impedes comprehension.",tip:'The two rules that trip everyone up: C before i/e = ch sound (ciao, cena). G before i/e = soft j sound (gelato, giro). CH and GH before i/e become hard k/g (chiedere, ghiaccio).'},
      {title:'Learn essere and avere cold',desc:"These two verbs — to be and to have — are the foundation of Italian tense. Almost every past tense construction uses one of them as an auxiliary. Essere: sono, sei, è, siamo, siete, sono. Avere: ho, hai, ha, abbiamo, avete, hanno. Memorize both tables before moving on.",tip:'Italian uses avere (have) to express states English expresses with to be: ho fame (I\'m hungry, literally I have hunger), ho freddo (I\'m cold), ho paura (I\'m afraid), ho sonno (I\'m sleepy). Twelve common expressions, one verb.',actionLabel:'browse verbs →',action:()=>{curGrouping='pos';save('lf-grouping','pos');switchTab('vocab');}},
      {title:'Learn gender and article agreement',desc:"Every Italian noun is masculine or feminine, and adjectives and articles must match. Il/lo/la/l' for singular, i/gli/le for plural. This isn't optional — mismatched gender is immediately noticeable to native speakers.",tip:'Most nouns ending in -o are masculine (il libro), most ending in -a are feminine (la pizza). Nouns ending in -e are mixed — learn them individually. Lo is used before s+consonant and z (lo studente, lo zaino).'},
      {title:'Learn the top 100 words in sentences',desc:"Just 100 words cover roughly 50% of everything you'll read or hear in Italian. But learn them in full sentences, not as isolated vocabulary — research consistently shows that context is what makes words stick long-term.",tip:'Start with: essere, avere, fare, dire, andare, vedere, sapere, volere, potere, dovere, venire, stare. These 12 verbs appear in nearly every Italian conversation.',actionLabel:'sort by most common →',action:()=>{curGrouping='most_common';save('lf-grouping','most_common');switchTab('vocab');}},
    ]},
    {stage:2,label:'building blocks',color:'#c8a87a',milestones:[
      {title:'Learn -ARE verb conjugation',desc:"About 75% of Italian verbs follow the regular -ARE pattern. Present tense: io -o, tu -i, lui/lei -a, noi -iamo, voi -ate, loro -ano. Italian usually drops the subject pronoun because the verb ending tells you who's speaking.",tip:'The most common mistake: English speakers say \"io vado\" when Italians just say \"vado.\" The pronoun is included only for emphasis or contrast: \"io vado, tu resti\" (I\'m going, you stay).',actionLabel:'practice conjugation →',action:()=>{practiceFilter='conjugate';switchTab('practice');}},
      {title:'Understand adjective agreement',desc:'Adjectives in Italian must match the noun in gender and number. Un ragazzo alto → una ragazza alta → dei ragazzi alti → delle ragazze alte. The pattern is consistent: -o/-a for singular, -i/-e for plural.',tip:'Adjective position changes meaning slightly: un uomo grande (a big man) vs un grand\'uomo (a great man). By default, put descriptive adjectives after the noun.',actionLabel:'read grammar →',action:()=>switchTab('grammar')},
      {title:'Learn piacere (to like)',desc:"Mi piace works the opposite of English: the thing you like is the subject, you are the indirect object. Mi piace il caffè (coffee pleases me). Mi piacciono i film (the films please me — plural, so piacciono). This trips up most English speakers for months.",tip:'The shortcut: mi piace + singular. Mi piacciono + plural. Non mi piace = I don\'t like. Mi piacciono moltissimo = I love (plural things). Ti piace? = Do you like it?'},
      {title:'Build vocabulary through Italian media',desc:"Italian is one of the most accessible languages for media immersion because of the extensive catalogue of Italian cinema, RAI programming, and podcasts designed for learners. News in Slow Italian and Coffee Break Italian are well-matched to intermediate level.",tip:'The biggest research finding for European language learners: people who watch TV in their target language with same-language subtitles learn vocabulary 40–60% faster than those using translated subtitles.',actionLabel:'try reading tool ↓',action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'})},
    ]},
    {stage:3,label:'conversational',color:'#7a8cc8',milestones:[
      {title:'Learn the passato prossimo (past tense)',desc:"The most common past tense in spoken Italian. Structure: avere or essere + past participle. Movement and state verbs use essere: sono andato (I went). Action verbs typically use avere: ho mangiato (I ate). Participles with essere agree in gender: sono andata (female speaker).",tip:'Essere verbs to memorize: andare, venire, arrivare, partire, uscire, entrare, nascere, morire, restare, diventare, essere, stare. When in doubt, use avere — the error is less jarring.',actionLabel:'practice past tense →',action:()=>{practiceFilter='conjugate';switchTab('practice');}},
      {title:'Master tu vs Lei (formal you)',desc:"Lei (formal) is used with strangers, shopkeepers, professionals, and older people. Tu is for friends, peers, and family. The switch from Lei to tu is usually initiated by the older or higher-status person — let them lead.",tip:'In southern Italy, voi (plural you) is used as a formal singular, especially in Naples and Sicily. This is regional and becoming less common, but you will hear it.',actionLabel:'practice formality →',action:()=>{practiceFilter='formal_casual';switchTab('practice');}},
      {title:'Learn the congiuntivo (subjunctive)',desc:"The subjunctive is used after expressions of opinion, desire, emotion, doubt, and certain conjunctions. Penso che sia (I think it is), voglio che tu venga (I want you to come), sebbene sia difficile (even though it is difficult). It sounds educated and native.",tip:'The four most important triggers: penso/credo/spero che (I think/believe/hope that), voglio/vorrei che (I want/would like), bisogna che (it\'s necessary that), sebbene/benché/nonostante (although/even though). Master these four and you have 90% of subjunctive usage.',actionLabel:'read grammar →',action:()=>switchTab('grammar')},
    ]},
  ],
  japanese:[
    {stage:1,label:'the writing systems',color:'#7ac8a0',milestones:[
      {title:'Learn hiragana in 1–2 weeks',desc:"Hiragana is 46 sounds — the foundation of everything. Every word in Japanese can be written in hiragana, and every kanji has a hiragana reading. Research from the AJALT and data from thousands of WaniKani users confirms: people who master hiragana and katakana before anything else progress significantly faster.",tip:'Learn あいうえお first (the 5 vowels). Then か行 (k-sounds), さ行 (s-sounds), た行 (t-sounds), な行 (n-sounds) — each row takes one focused session. The Tofugu hiragana guide with mnemonics is the most cited beginner resource across r/LearnJapanese.',actionLabel:'add hiragana deck →',action:()=>{addPremadeDeck('japanese_hiragana');switchTab('vocab');}},
      {title:'Learn katakana (same sounds, angular shapes)',desc:"Katakana uses the exact same sounds as hiragana, just angular characters used for foreign loanwords. Once you know hiragana sounds, katakana is fast: most learners finish it in 3–5 days. The payoff is immediate — you can read menu items, brand names, and most borrowed English words.",tip:'コーヒー (koohii = coffee), テレビ (terebi = television), ハンバーガー (hanbaagaa = hamburger), スマホ (sumaho = smartphone). Katakana opens up a huge chunk of modern written Japanese instantly.',actionLabel:'add katakana deck →',action:()=>{addPremadeDeck('japanese_katakana');switchTab('vocab');}},
      {title:'Learn dakuten accent marks',desc:"Adding ゛to a kana changes the consonant: か(ka)→が(ga), さ(sa)→ざ(za), た(ta)→だ(da). Adding ゜makes p-sounds: は(ha)→ぱ(pa). This gives you 25 additional sounds from marks you add to characters you already know.",actionLabel:'add accent decks →',action:()=>{addPremadeDeck('japanese_dakuten');switchTab('vocab');}},
      {title:'Understand how Japanese text actually works',desc:"Japanese has no spaces between words. The mix of scripts signals word boundaries: kanji for content words (meanings), hiragana for grammar glue (particles, verb endings), katakana for foreign words. Reading skill comes from pattern recognition, not looking up every character.",tip:'You do not need to be able to write kanji by hand. Recognition reading (knowing what 食べる means when you see it) is the priority. Writing skill can come much later — or not at all depending on your goals.',actionLabel:'read grammar →',action:()=>switchTab('grammar')},
    ]},
    {stage:2,label:'core sentences',color:'#c8a87a',milestones:[
      {title:'Learn X は Y です',desc:'This is the skeleton of Japanese. は (topic marker, pronounced wa) + です (polite form of to be). わたしは学生です = I am a student. これは本です = This is a book. The pattern: [topic] は [what it is] です. Question: add か at the end.',tip:'は is the most important particle. It does not exactly mean "is the subject" — it means "as for X, speaking of X." The nuance matters later but the structure is what you need now.',actionLabel:'read grammar note →',action:()=>switchTab('grammar')},
      {title:'Learn the 8 core particles',desc:"Particles are what make Japanese work. は(wa)=topic, が(ga)=subject, を(o)=object, に(ni)=direction/time/destination, で(de)=location of action/means, の(no)=possessive, も(mo)=also, か(ka)=question. These 8 particles appear in almost every sentence.",tip:'に vs で is the hardest distinction. に = destination or existence location (学校に行く = go to school, 家にいる = be at home). で = where the action happens (図書館で勉強する = study at the library). Ask: is this where something IS, or where something HAPPENS?',actionLabel:'practice particles →',action:()=>{practiceFilter='particle';switchTab('practice');}},
      {title:'Learn ます verb forms (polite present/past)',desc:"ます is the polite present/future. Add ました for past. Add ません for negative. Add ませんでした for past negative. Japanese is SOV — the verb always ends the sentence, every time, without exception.",tip:'食べます(tabemasu)=eat. 食べました(tabemashita)=ate. 食べません(tabemasen)=don\'t eat. 食べませんでした(tabemasen deshita)=didn\'t eat. Learn these four forms for 5 common verbs and you have 20 sentences.',actionLabel:'practice verb forms →',action:()=>{practiceFilter='conjugate';switchTab('practice');}},
      {title:'Learn い-adjectives and な-adjectives',desc:"Japanese adjectives come in two types that conjugate differently. い-adjectives conjugate directly: おいしい (delicious) → おいしくない (not delicious) → おいしかった (was delicious). な-adjectives need な before a noun: 好きな食べ物 (favorite food).",tip:'Special case: いい (good) is irregular — its negative is よくない, not いくない. This trips up everyone. いい → よい (formal) → よくない (negative) → よかった (past).',actionLabel:'read grammar →',action:()=>switchTab('grammar')},
    ]},
    {stage:3,label:'vocabulary and kanji',color:'#7a8cc8',milestones:[
      {title:'Start kanji with radicals, not rote memorization',desc:"The consensus across r/LearnJapanese, WaniKani's community, and academic research is clear: kanji learned through their components (radicals + meaningful stories) are retained 3–5x longer than kanji learned by writing them out repeatedly. Each kanji is built from smaller pieces — learning those pieces first makes the whole system click.",tip:'WaniKani is the most recommended tool for this. It uses spaced repetition + mnemonic stories. The first 300 kanji take most people 3–6 months and cover the majority of everyday reading. Alternatively, Heisig\'s Remembering the Kanji teaches meaning-first, then add readings from vocabulary.',actionLabel:'add kanji deck →',action:()=>{addPremadeDeck('japanese_kanji');switchTab('vocab');}},
      {title:'Learn vocabulary in kanji+reading pairs',desc:"A kanji has multiple readings depending on context. 食 alone = た(べる) (kun\'yomi). 食 in compounds = しょく (on\'yomi): 食堂, 食事. The trick: learn vocabulary words, not isolated kanji readings. When you know 食べる and 食堂 as vocabulary, you know both readings naturally.",tip:'This is why WaniKani teaches vocabulary words alongside each kanji level, and why the r/LearnJapanese community recommends learning vocab through Anki sentence cards rather than isolated kanji lists.',actionLabel:'browse vocabulary →',action:()=>{activeScripts.clear();updateScriptBtns();curGrouping='most_common';save('lf-grouping','most_common');switchTab('vocab');}},
      {title:'Use song vocabulary for emotional memory',desc:"Neuroscience research shows that vocabulary encountered in emotionally engaging contexts is retained significantly longer than vocabulary from textbooks. Music triggers the same memory consolidation pathways as emotionally meaningful events — the words from songs you love are genuinely easier to remember.",tip:'よふかしのうた and 可愛くてごめん use high-frequency kanji in their natural emotional context. Add the words you don\'t know to a deck and use sentence-first practice to test yourself in the song\'s own context.',actionLabel:'explore songs →',action:()=>switchTab('songs')},
    ]},
    {stage:4,label:'reading and immersion',color:'#c87aa8',milestones:[
      {title:'Read native Japanese content with a dictionary',desc:"The jump from structured study to native content is the hardest transition in Japanese. The r/LearnJapanese community calls this the \"intermediate wall.\" The research-backed solution is comprehensible input: content at roughly 80–95% comprehension, where you look up 1–2 unknown words per sentence.",tip:'Start with NHK Web Easy (simplified news), graded readers, or manga with furigana. Use Jisho.org or the reading tool below to look up unknown words. Every word you look up in context has a much higher chance of sticking than a word from a vocab list.',actionLabel:'try reading tool ↓',action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'})},
      {title:'Learn て-form and compound verb patterns',desc:'The て-form is a connector that turns two sentences into one and enables dozens of grammar patterns. 食べてください (please eat). 食べています (is eating, -te iru = ongoing action). 食べてから (after eating). 食べてみる (try eating). 食べてもいい (it\'s okay to eat). One form, endless uses.',tip:'The hardest thing about て-form is that it changes based on the verb group. Learn group 1, 2, and irregular verbs separately. る-verbs (group 2) are the easiest: just drop る and add て. う-verbs (group 1) change their final sound.',actionLabel:'read grammar →',action:()=>switchTab('grammar')},
    ]},
  ],
};

function milestoneKey(lang,si,mi){return 'lf-milestone-'+lang+'-'+si+'-'+mi;}
function getMilestoneDone(lang,si,mi){return localStorage.getItem(milestoneKey(lang,si,mi))==='1';}
function setMilestoneDone(lang,si,mi,done){if(done)localStorage.setItem(milestoneKey(lang,si,mi),'1');else localStorage.removeItem(milestoneKey(lang,si,mi));}
function buildRoadmap(container){
  container.innerHTML='';
  const hdr=document.createElement('div');hdr.style.marginBottom='1.25rem';
  hdr.innerHTML=`<div class="guide-section-title">learning path</div><div class="guide-section-sub">your suggested progression for ${LANGS[curLang].label}. tap the circle to mark a milestone done.</div>`;
  container.appendChild(hdr);
  const roadmap=ROADMAPS[curLang];if(!roadmap){container.innerHTML+='<div class="empty-msg">Roadmap coming soon.</div>';return;}
  roadmap.forEach((stage,si)=>{
    const stageEl=document.createElement('div');stageEl.style.marginBottom='1.5rem';
    const sh=document.createElement('div');sh.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:.75rem';
    sh.innerHTML=`<span style="font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;font-weight:500;color:${stage.color};flex-shrink:0">stage ${stage.stage}</span><span style="font-size:.8rem;font-weight:500;color:var(--tx)">${stage.label}</span><span style="flex:1;height:1px;background:var(--bd)"></span>`;
    stageEl.appendChild(sh);
    stage.milestones.forEach((m,mi)=>{
      const isDone=getMilestoneDone(curLang,si,mi);
      const card=document.createElement('div');card.className='milestone-card';card.style.cssText=`border:1px solid ${isDone?stage.color+'60':'var(--bd)'};background:${isDone?stage.color+'10':'var(--sf)'}`;
      const chk=document.createElement('div');chk.className='milestone-check';chk.style.cssText=`border:2px solid ${isDone?stage.color:'var(--bd2)'};background:${isDone?stage.color:'transparent'};cursor:pointer;flex-shrink:0`;chk.textContent=isDone?'✓':'';chk.title=isDone?'mark as not done':'mark as done';
      chk.onclick=()=>{setMilestoneDone(curLang,si,mi,!isDone);buildRoadmap(container);};card.appendChild(chk);
      const content=document.createElement('div');content.style.cssText='flex:1;min-width:0';
      const t=document.createElement('div');t.className='milestone-title';t.style.color=isDone?stage.color:'var(--tx)';t.textContent=m.title;content.appendChild(t);
      const d=document.createElement('div');d.className='milestone-desc';d.textContent=m.desc;content.appendChild(d);
      if(m.tip){const tip=document.createElement('div');tip.className='milestone-tip';tip.style.cssText=`color:${stage.color};background:${stage.color}15;border-left:2px solid ${stage.color}`;tip.textContent=m.tip;content.appendChild(tip);}
      if(m.action){const ab=document.createElement('button');ab.className='ubtn';ab.style.cssText=`font-size:.67rem;color:${stage.color};border-color:${stage.color}50`;ab.textContent=m.actionLabel||'go →';ab.onclick=()=>{if(typeof m.action==='function')m.action();};content.appendChild(ab);}
      card.appendChild(content);stageEl.appendChild(card);
    });
    container.appendChild(stageEl);
  });
  const rb=document.createElement('button');rb.className='ubtn';rb.style.marginTop='4px';rb.textContent='↺ reset all progress';
  rb.onclick=()=>{if(!confirm('Reset all milestone progress?'))return;Object.keys(localStorage).filter(k=>k.startsWith('lf-milestone-')).forEach(k=>localStorage.removeItem(k));buildRoadmap(container);};
  container.appendChild(rb);
}

// ── TOKENIZER & READING TOOL ──────────────────────────────────────────────────
function tokenizeSentence(text,lang){
  if(!text||!text.trim()) return [];
  if(lang==='korean'||lang==='italian'){
    const tokens=[];
    text.split(/\s+/).forEach(part=>{if(!part)return;const match=part.match(/^([\s\S]*?)([。.!?！？、,，…]+)$/);if(match){if(match[1])tokens.push({text:match[1],isPunct:false});tokens.push({text:match[2],isPunct:true});}else tokens.push({text:part,isPunct:false});});
    return tokens;
  }
  if(lang==='japanese') return tokenizeJapanese(text);
  return [{text,isPunct:false}];
}
function tokenizeJapanese(text){
  const wordMap=new Map();JAPANESE_WORDS.forEach(w=>wordMap.set(w.kr,w));
  ['は','が','を','に','で','の','も','か','と','へ','から','まで','より','ので','のに','けど','し','て','ね','よ','な'].forEach(p=>{if(!wordMap.has(p))wordMap.set(p,{kr:p,ro:p,meaning:'particle/function word',pos:'particle'});});
  const tokens=[];let i=0;const chars=[...text];
  while(i<chars.length){
    const ch=chars[i];
    if(/\s/.test(ch)){i++;continue;}
    if(/[。.!?！？、,，…「」『』【】（）()・ー〜~]/.test(ch)){tokens.push({text:ch,isPunct:true});i++;continue;}
    let matched=false;
    for(let len=Math.min(8,chars.length-i);len>=1;len--){const candidate=chars.slice(i,i+len).join('');if(wordMap.has(candidate)){tokens.push({text:candidate,isPunct:false,word:wordMap.get(candidate)});i+=len;matched=true;break;}}
    if(!matched){const last=tokens[tokens.length-1];if(last&&last.unknown&&!last.isPunct)last.text+=ch;else tokens.push({text:ch,isPunct:false,unknown:true});i++;}
  }
  return tokens;
}
const READING_SAMPLES={
  korean:['오늘 날씨가 너무 좋아서 공원에 갔어요.','나는 한국 음식을 정말 좋아해요.','자꾸 생각나, 왠지 모르게 너만 바라봐.'],
  italian:['Oggi il tempo è bellissimo, andiamo al parco.','Non capisco tutto, ma mi piace molto l\'italiano.','Voglio un caffè, per favore. Quanto costa?'],
  japanese:['よふかしをした。夜の街が好きだ。','すみません、トイレはどこですか？','私は毎日日本語を勉強しています。'],
};
function renderGuide(container){
  container.innerHTML='';const wrap=document.createElement('div');wrap.className='guide-wrap';
  const rs=document.createElement('div');rs.id='roadmapSection';buildRoadmap(rs);wrap.appendChild(rs);
  const hr=document.createElement('hr');hr.style.cssText='border:none;border-top:1px solid var(--bd)';wrap.appendChild(hr);
  const rds=document.createElement('div');rds.id='readingSection';buildReadingTool(rds);wrap.appendChild(rds);
  container.appendChild(wrap);
}
function buildReadingTool(container){
  container.innerHTML='';
  const hdr=document.createElement('div');hdr.style.marginBottom='1rem';hdr.innerHTML=`<div class="guide-section-title">assisted reading</div><div class="guide-section-sub">paste any ${LANGS[curLang].label} sentence. tap a word to see its meaning and add it to a deck.</div>`;container.appendChild(hdr);
  const iw=document.createElement('div');iw.style.cssText='display:flex;flex-direction:column;gap:7px;margin-bottom:1rem';
  const ta=document.createElement('textarea');ta.id='readingInput';ta.placeholder=curLang==='korean'?'한국어 문장을 붙여넣으세요...':curLang==='italian'?'Incolla una frase in italiano...':'日本語の文を貼り付けてください...';ta.style.cssText='width:100%;min-height:80px;resize:vertical;background:var(--sf);border:1px solid var(--bd2);border-radius:8px;color:var(--tx);font-family:"Noto Sans KR",sans-serif;font-size:1rem;padding:10px 13px;outline:none;transition:border-color .2s;box-sizing:border-box;line-height:1.6';ta.onfocus=()=>ta.style.borderColor='var(--acc)';ta.onblur=()=>ta.style.borderColor='var(--bd2)';iw.appendChild(ta);
  const sr=document.createElement('div');sr.style.cssText='display:flex;flex-wrap:wrap;gap:6px;align-items:center';const sl=document.createElement('span');sl.style.cssText='font-size:.63rem;letter-spacing:.1em;text-transform:uppercase;color:var(--su);flex-shrink:0';sl.textContent='try:';sr.appendChild(sl);
  (READING_SAMPLES[curLang]||[]).forEach(s=>{const p=document.createElement('button');p.className='gbtn';p.style.cssText='font-size:.65rem;font-family:"Noto Sans KR",sans-serif';p.textContent=s.length>18?s.slice(0,18)+'…':s;p.title=s;p.onclick=()=>{ta.value=s;analyzeReading(container,s);};sr.appendChild(p);});
  iw.appendChild(sr);
  const br=document.createElement('div');br.style.cssText='display:flex;gap:7px';
  const ab=document.createElement('button');ab.className='abtn accent';ab.textContent='analyze →';ab.onclick=()=>analyzeReading(container,ta.value);br.appendChild(ab);
  const cb=document.createElement('button');cb.className='abtn';cb.textContent='clear';cb.onclick=()=>{ta.value='';const o=document.getElementById('readingOutput');if(o)o.innerHTML='';const wc=document.getElementById('readingWordCard');if(wc)wc.style.display='none';};br.appendChild(cb);
  iw.appendChild(br);ta.onkeydown=e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey))ab.click();};container.appendChild(iw);
  const out=document.createElement('div');out.id='readingOutput';out.style.marginBottom='.75rem';container.appendChild(out);
  const wc=document.createElement('div');wc.id='readingWordCard';wc.className='reading-word-card';wc.style.display='none';container.appendChild(wc);
}
function analyzeReading(container,text){
  const trimmed=(text||'').trim();if(!trimmed) return;
  const tokens=tokenizeSentence(trimmed,curLang);const out=document.getElementById('readingOutput');if(!out) return;
  out.innerHTML='';if(!tokens.length){out.innerHTML='<div class="empty-msg">Nothing to analyze.</div>';return;}
  const hint=document.createElement('div');hint.style.cssText='font-size:.63rem;color:var(--su);margin-bottom:.6rem;letter-spacing:.04em';hint.textContent='tap a word to see its meaning';out.appendChild(hint);
  const tw=document.createElement('div');tw.style.cssText='display:flex;flex-wrap:wrap;gap:3px;align-items:baseline;line-height:2.4;padding:.75rem 1rem;background:var(--sf);border:1px solid var(--bd);border-radius:10px';
  tokens.forEach(token=>{
    if(token.isPunct){const s=document.createElement('span');s.style.cssText='color:var(--su);font-size:.9rem;font-family:"Noto Sans KR",sans-serif';s.textContent=token.text;tw.appendChild(s);return;}
    const vw=LANGS[curLang].words.find(w=>w.kr===token.text)||token.word||null;const hasEntry=!!vw;const inDeck=hasEntry&&deckColorFor(token.text);
    const span=document.createElement('span');
    span.className='reading-token'+(inDeck?' in-deck':(!hasEntry?' unknown-token':''));
    if(!hasEntry) span.style.cssText='border-color:rgba(200,122,122,.4);cursor:pointer';
    const te=document.createElement('span');te.className='reading-token-text';te.style.cssText=`font-size:${curLang==='japanese'?'1.3rem':'1.1rem'};color:${inDeck?'var(--acc)':hasEntry?'var(--tx)':'#c87a7a'}`;te.textContent=token.text;span.appendChild(te);
    if(hasEntry&&vw.ro&&showRomanization){const ro=document.createElement('span');ro.className='reading-token-ro';ro.textContent=vw.ro;span.appendChild(ro);}
    if(hasEntry){span.style.cursor='pointer';span.onclick=()=>showReadingWordCard(container,vw);}
    else{span.title='unknown — click to add';span.onclick=()=>showUnknownWordPanel(container,token.text);}
    tw.appendChild(span);
  });
  out.appendChild(tw);
  const known=tokens.filter(t=>!t.isPunct&&(LANGS[curLang].words.find(w=>w.kr===t.text)||t.word)).length,total=tokens.filter(t=>!t.isPunct).length;
  if(total>0){const stats=document.createElement('div');stats.className='reading-stats';stats.innerHTML=`<span>${total} word${total!==1?'s':''}</span><span style="color:var(--acc)">${known} in vocabulary</span><span>${total-known} unknown</span>`;out.appendChild(stats);}
}
function makeBullet(items) {
  const ul = document.createElement('ul');
  ul.style.cssText = 'margin:4px 0 0;padding-left:1rem;display:flex;flex-direction:column;gap:3px;list-style:disc';
  items.filter(Boolean).forEach(text => {
    const li = document.createElement('li');
    li.style.cssText = "font-size:.7rem;color:var(--mu);line-height:1.6;font-family:'Noto Sans KR',sans-serif";
    li.textContent = text;
    ul.appendChild(li);
  });
  return ul;
}

function buildSingleKanjiInfo(word) {
  // For words that ARE a single kanji or contain one kanji with a KANJI_MEANINGS entry
  if (!word.kr || typeof KANJI_MEANINGS === 'undefined') return null;
  const chars = [...word.kr];
  const kanjiChars = chars.filter(c => /[\u4e00-\u9fff]/.test(c) && KANJI_MEANINGS[c]);
  // Only use this for single-kanji words (multi-kanji gets buildKanjiBreakdown)
  if (kanjiChars.length !== 1) return null;

  const ch = kanjiChars[0];
  const entry = KANJI_MEANINGS[ch];
  const on = entry.on || '';
  const kun = entry.kun || '';
  const meaning = entry.meaning || '';
  const onEx = entry.onEx || '';
  const kunEx = entry.kunEx || '';

  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:.75rem;padding:.75rem;background:var(--sf2);border-radius:10px;border:1px solid var(--bd)';

  const title = document.createElement('div');
  title.style.cssText = 'font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--su);margin-bottom:.5rem';
  title.textContent = 'kanji detail';
  wrap.appendChild(title);

  // Kanji + meaning
  const topRow = document.createElement('div');
  topRow.style.cssText = 'display:flex;align-items:baseline;gap:10px;margin-bottom:.4rem';
  const kanjiEl = document.createElement('span');
  kanjiEl.style.cssText = "font-family:'Noto Sans KR',sans-serif;font-size:2rem;font-weight:500;color:var(--acc);line-height:1;flex-shrink:0";
  kanjiEl.textContent = ch;
  const meaningEl = document.createElement('span');
  meaningEl.style.cssText = 'font-size:.75rem;color:var(--tx)';
  meaningEl.textContent = meaning;
  topRow.appendChild(kanjiEl); topRow.appendChild(meaningEl);
  wrap.appendChild(topRow);

  const bullets = [];
  if (on) {
    let line = '音読み (おんよみ) — Chinese-origin reading: ' + on;
    if (onEx) line += '　→　' + onEx;
    bullets.push(line);
  }
  if (kun) {
    let line = '訓読み (くんよみ) — Japanese reading: ' + kun;
    if (kunEx) line += '　→　' + kunEx;
    bullets.push(line);
  }
  if (bullets.length) wrap.appendChild(makeBullet(bullets));

  if (word.example) {
    const exLabel = document.createElement('div');
    exLabel.style.cssText = 'font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--su);margin-top:.6rem;margin-bottom:.2rem';
    exLabel.textContent = 'in a sentence';
    wrap.appendChild(exLabel);
    wrap.appendChild(makeBullet([word.example]));
  }

  return wrap;
}

function buildKanjiBreakdown(word) {
  if (!word.kr || word.kr.length < 2) return null;
  const hasKanji = /[\u4e00-\u9fff]/.test(word.kr);
  if (!hasKanji || typeof KANJI_MEANINGS === 'undefined') return null;
  const chars = [...word.kr];
  const kanjiChars = chars.filter(c => /[\u4e00-\u9fff]/.test(c) && KANJI_MEANINGS[c]);
  if (kanjiChars.length < 2) return null;

  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:.75rem;padding:.75rem;background:var(--sf2);border-radius:10px;border:1px solid var(--bd)';

  const title = document.createElement('div');
  title.style.cssText = 'font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--su);margin-bottom:.75rem';
  title.textContent = 'kanji breakdown';
  wrap.appendChild(title);

  // Each kanji as its own section
  kanjiChars.forEach((ch, idx) => {
    const entry = KANJI_MEANINGS[ch];
    const on = entry.on || '';
    const kun = entry.kun || '';
    const meaning = entry.meaning || '';
    const onEx = entry.onEx || '';
    const kunEx = entry.kunEx || '';

    const sec = document.createElement('div');
    sec.style.cssText = (idx > 0 ? 'margin-top:.75rem;padding-top:.75rem;border-top:1px solid var(--bd);' : '');

    // Kanji + meaning on one line
    const topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;align-items:baseline;gap:10px;margin-bottom:.35rem';
    const kanjiEl = document.createElement('span');
    kanjiEl.style.cssText = "font-family:'Noto Sans KR',sans-serif;font-size:1.8rem;font-weight:500;color:var(--acc);line-height:1;flex-shrink:0";
    kanjiEl.textContent = ch;
    const meaningEl = document.createElement('span');
    meaningEl.style.cssText = 'font-size:.75rem;color:var(--tx)';
    meaningEl.textContent = meaning;
    topRow.appendChild(kanjiEl); topRow.appendChild(meaningEl);
    sec.appendChild(topRow);

    // Bullet list: on-reading, kun-reading, examples
    const bullets = [];

    if (on) {
      let line = '音読み (おんよみ) — Chinese-origin reading: ' + on;
      if (onEx) line += '　→　' + onEx;
      bullets.push(line);
    }
    if (kun) {
      let line = '訓読み (くんよみ) — Japanese reading: ' + kun;
      if (kunEx) line += '　→　' + kunEx;
      bullets.push(line);
    }

    if (bullets.length) sec.appendChild(makeBullet(bullets));
    wrap.appendChild(sec);
  });

  // Together section
  const together = document.createElement('div');
  together.style.cssText = 'margin-top:.75rem;padding-top:.6rem;border-top:1px solid var(--bd)';

  const togLabel = document.createElement('div');
  togLabel.style.cssText = 'font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--su);margin-bottom:.3rem';
  togLabel.textContent = 'together';
  together.appendChild(togLabel);

  const togWord = document.createElement('div');
  togWord.style.cssText = "display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-bottom:.3rem";
  togWord.innerHTML = `<span style="font-family:'Noto Sans KR',sans-serif;font-size:1.1rem;font-weight:500;color:var(--acc)">${word.kr}</span><span style="font-size:.7rem;color:var(--mu)">${word.ro}</span><span style="font-size:.75rem;color:var(--tx)">${word.meaning}</span>`;
  together.appendChild(togWord);

  if (word.example) {
    const exBullets = makeBullet([word.example]);
    together.appendChild(exBullets);
  }

  wrap.appendChild(together);
  return wrap;
}

function showReadingWordCard(container,word){
  let card=document.getElementById('readingWordCard');if(!card) return;
  const inDeck=deckColorFor(word.kr);card.style.display='block';card.innerHTML='';
  const top=document.createElement('div');top.style.cssText='display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:.5rem';
  const wi=document.createElement('div');wi.innerHTML=`<div style="font-family:'Noto Sans KR',sans-serif;font-size:1.8rem;font-weight:500;color:var(--acc);line-height:1.1">${word.kr}</div>${showRomanization?`<div style="font-size:.72rem;color:var(--mu);margin-top:2px">${word.ro}</div>`:''}`;top.appendChild(wi);
  const acts=document.createElement('div');acts.style.cssText='display:flex;gap:6px;flex-shrink:0';
  const spk=document.createElement('button');spk.className='ubtn';spk.textContent='▶';spk.onclick=()=>speak(word.kr,curLang);acts.appendChild(spk);
  const db=document.createElement('button');db.className='abtn'+(inDeck?' accent':'');db.textContent=inDeck?'✓ in deck':'+ add to deck';
  db.onclick=()=>{if(activeDeckIdx<0){const n=prompt('Name your new deck:','');if(!n?.trim())return;addDeck(n.trim());}toggleWordInDeck(word);showReadingWordCard(container,word);analyzeReading(container,document.getElementById('readingInput')?.value);};
  acts.appendChild(db);top.appendChild(acts);card.appendChild(top);
  const mn=document.createElement('div');mn.style.cssText="font-family:'DM Serif Display',serif;font-size:1.05rem;color:var(--tx);margin-bottom:.4rem";mn.textContent=word.meaning;card.appendChild(mn);
  if(word.pos){const pc={verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'};const pe=document.createElement('span');pe.style.cssText=`font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:${pc[word.pos]||'var(--mu)'};margin-bottom:.5rem;display:inline-block`;pe.textContent=word.pos;card.appendChild(pe);}
  if(word.example){const ex=document.createElement('div');ex.style.cssText='font-size:.72rem;color:var(--mu);font-style:italic;line-height:1.65;padding:.5rem .75rem;background:var(--sf2);border-radius:7px;margin-top:.4rem;border:1px solid var(--bd)';ex.textContent=word.example;card.appendChild(ex);}
  // Kanji breakdown — only for multi-kanji words

}

function showUnknownWordPanel(container, text) {
  let card = document.getElementById('readingWordCard'); if (!card) return;
  card.style.display = 'block'; card.innerHTML = '';

  const hdr = document.createElement('div');
  hdr.style.cssText = 'font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:#c87a7a;margin-bottom:.75rem';
  hdr.textContent = 'unknown word — add it yourself';
  card.appendChild(hdr);

  const wordEl = document.createElement('div');
  wordEl.style.cssText = "font-family:'Noto Sans KR',sans-serif;font-size:2rem;font-weight:500;color:var(--tx);margin-bottom:1rem";
  wordEl.textContent = text;
  card.appendChild(wordEl);

  const hint = document.createElement('div');
  hint.style.cssText = 'font-size:.72rem;color:var(--mu);margin-bottom:.75rem;line-height:1.6';
  hint.innerHTML = 'Fill in what you know, then save it to a deck. You can look up this word at <a href="https://jisho.org/search/' + encodeURIComponent(text) + '" target="_blank" style="color:var(--acc)">jisho.org</a>' + (curLang === 'korean' ? ' or <a href="https://papago.naver.com/" target="_blank" style="color:var(--acc)">papago</a>' : curLang === 'italian' ? ' or <a href="https://www.wordreference.com/iten/' + encodeURIComponent(text) + '" target="_blank" style="color:var(--acc)">wordreference</a>' : '') + '.';
  card.appendChild(hint);

  const fields = document.createElement('div');
  fields.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin-bottom:.75rem';

  const makeField = (id, placeholder) => {
    const inp = document.createElement('input');
    inp.type = 'text'; inp.id = 'uwp-' + id; inp.placeholder = placeholder;
    inp.style.cssText = 'width:100%;padding:8px 10px;background:var(--sf);border:1px solid var(--bd2);border-radius:7px;color:var(--tx);font-family:DM Mono,monospace;font-size:.82rem;outline:none;box-sizing:border-box';
    inp.onfocus = () => inp.style.borderColor = 'var(--acc)';
    inp.onblur  = () => inp.style.borderColor = 'var(--bd2)';
    return inp;
  };

  fields.appendChild(makeField('ro',      'romanization / pronunciation'));
  fields.appendChild(makeField('meaning', 'meaning in english'));
  fields.appendChild(makeField('example', 'example sentence (optional)'));
  card.appendChild(fields);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'abtn accent'; saveBtn.textContent = 'save to vocabulary →';
  saveBtn.style.cssText = 'width:100%;margin-top:2px';
  saveBtn.onclick = () => {
    const ro      = document.getElementById('uwp-ro')?.value.trim() || text;
    const meaning = document.getElementById('uwp-meaning')?.value.trim();
    const example = document.getElementById('uwp-example')?.value.trim() || text + ' — ' + (meaning || '?');
    if (!meaning) { showToast('Add a meaning first'); return; }
    const newWord = {kr:text, ro, meaning, example, pos:'expression', freq:7, register:'neutral', _custom:true};
    LANGS[curLang].words.push(newWord);
    if (activeDeckIdx >= 0 && activeDeckIdx < decks.length) {
      decks[activeDeckIdx].words[text] = true;
      saveDeckState();
      showToast('"' + text + '" added to ' + decks[activeDeckIdx].name + '!');
    } else {
      showToast('"' + text + '" saved to vocabulary');
    }
    checkAchievements();
    // re-render with the new word known
    const inputVal = document.getElementById('readingInput')?.value;
    if (inputVal) analyzeReading(container, inputVal);
    showReadingWordCard(container, newWord);
  };
  card.appendChild(saveBtn);
}

// ── ACTIVITY GRID (GitHub-style heatmap) ─────────────────────────────────────
function renderActivityGrid(container) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.style.cssText = 'font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--su);margin-bottom:5px';
  label.textContent = 'activity — last 12 weeks';
  container.appendChild(label);

  const weeks = 12;
  const days = weeks * 7;
  const today = new Date();

  const dayData = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    dayData.push({ key, count: srsActivity[key] || 0 });
  }

  const maxCount = Math.max(...dayData.map(d => d.count), 1);

  // more cards = DARKER green. empty = faint outline only.
  function cellColor(count) {
    if (count === 0) return 'rgba(255,255,255,0.04)';
    const t = Math.min(1, count / maxCount);
    // t=small: light green. t=1(max): very dark green.
    const r = Math.round(140 - t * 120);
    const g = Math.round(220 - t * 130);
    const b = Math.round(130 - t * 100);
    return 'rgb('+r+','+g+','+b+')';
  }

  // Row-based grid: left→right across each row, then next row down.
  // dayData[0] = oldest = top-left. dayData[83] = today = bottom-right.
  // 12 weeks = 84 days = 12 columns × 7 rows.
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat('+weeks+',10px);grid-template-rows:repeat(7,10px);gap:2px';

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < weeks; col++) {
      const idx = row * weeks + col;  // left-to-right, top-to-bottom
      const day = dayData[idx] || { key: '', count: 0 };
      const cell = document.createElement('div');
      cell.style.cssText = 'width:10px;height:10px;border-radius:2px;border:1px solid rgba(255,255,255,0.07)';
      cell.style.background = cellColor(day.count);
      if (day.key) cell.title = day.key + ': ' + day.count + ' card' + (day.count !== 1 ? 's' : '');
      grid.appendChild(cell);
    }
  }
  container.appendChild(grid);

  // Legend: left=less(light green), right=more(dark green)
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;align-items:center;gap:3px;margin-top:5px;font-size:.58rem;color:var(--mu)';
  const less = document.createElement('span'); less.style.marginRight='2px'; less.textContent = 'less'; legend.appendChild(less);
  [0, 0.2, 0.4, 0.7, 1].forEach(v => {
    const sq = document.createElement('div');
    sq.style.cssText = 'width:9px;height:9px;border-radius:1px;border:1px solid rgba(255,255,255,0.07);margin:0 1px';
    sq.style.background = cellColor(v === 0 ? 0 : Math.ceil(v * maxCount));
    legend.appendChild(sq);
  });
  const more = document.createElement('span'); more.style.marginLeft='2px'; more.textContent = 'more'; legend.appendChild(more);
  container.appendChild(legend);
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
(function boot(){
  decks=load('lf-decks',[]);activeDeckIdx=load('lf-activeDeck',-1);curGrouping=load('lf-grouping','pos');
  if(!GROUPINGS[curGrouping])curGrouping='pos';if(activeDeckIdx>=decks.length)activeDeckIdx=-1;
  if(curLang!=='japanese'&&(curGrouping==='fewest_strokes'||curGrouping==='script'))curGrouping='pos';
  document.body.className=theme;applyFontSize(fontSize);
  document.getElementById('themeBtn').textContent=theme==='dark'?'light mode':'dark mode';
  applyStoredThemes();
  const L=LANGS[curLang];document.getElementById('langFlag').textContent=L.flag;document.getElementById('langLabel').textContent=L.label;
  document.querySelectorAll('.lang-option').forEach(el=>el.classList.toggle('active',el.dataset.lang===curLang));
  showScriptFilters(curLang==='japanese');
  if(!document.querySelector('[data-tab="medals"]')){
    const tb=document.getElementById('tabBar');const mb=document.createElement('button');mb.className='tab-btn';mb.dataset.tab='medals';mb.textContent='medals';mb.onclick=()=>switchTab('medals');
    tb.insertBefore(mb,document.getElementById('fontBtn'));
  }
  if(!document.querySelector('[data-tab="themes"]')){
    const tb=document.getElementById('tabBar');const thb=document.createElement('button');thb.className='tab-btn';thb.dataset.tab='themes';thb.textContent='themes';thb.onclick=()=>switchTab('themes');
    tb.insertBefore(thb,document.getElementById('fontBtn'));
  }
  // inject typing mode + romaji toggle buttons into study modal
  const nc=document.getElementById('normalControls');
  if(nc&&!document.getElementById('typingModeBtn')){
    const tr=document.createElement('div');tr.style.cssText='display:flex;gap:8px;margin-top:8px';
    const tmb=document.createElement('button');tmb.id='typingModeBtn';tmb.className='abtn';tmb.textContent='✎ typing: off';tmb.onclick=()=>toggleStudyTypingMode();tr.appendChild(tmb);
    const rrb=document.createElement('button');rrb.id='studyRoBtn';rrb.className='abtn';rrb.textContent=showRomanization?'hide romaji':'show romaji';rrb.onclick=()=>toggleStudyRo();tr.appendChild(rrb);
    nc.appendChild(tr);
  }
  const savedTab=localStorage.getItem('lf-tab')||'vocab';curTab=savedTab;
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===savedTab));
  renderTab(savedTab);updateStreak();checkAchievements();
})();
