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
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.pointerEvents = 'auto';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; t.style.pointerEvents = 'none'; }, 2800);
}

// ── THEME & FONT ──────────────────────────────────────────────────────────────
function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('lf-theme', theme);
  document.body.className = theme;
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? 'light mode' : 'dark mode';
}
function applyFontSize(size) {
  fontSize = size;
  document.documentElement.setAttribute('data-size', size);
  localStorage.setItem('lf-fontsize', size);
  const btn = document.getElementById('fontBtn');
  if (btn) btn.textContent = 'text: ' + FONT_LABELS[size];
}
function cycleFontSize() {
  const idx = FONT_SIZES.indexOf(fontSize);
  applyFontSize(FONT_SIZES[(idx + 1) % FONT_SIZES.length]);
}

// ── LANGUAGE SWITCHER ─────────────────────────────────────────────────────────
function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  const btn  = document.getElementById('langBtn');
  if (!menu || !btn) return;
  if (menu.classList.contains('open')) { menu.classList.remove('open'); return; }
  const r = btn.getBoundingClientRect();
  const menuW = 180;
  let left = r.right - menuW;
  if (left < 8) left = 8;
  menu.style.top  = (r.bottom + 6) + 'px';
  menu.style.left = left + 'px';
  menu.classList.add('open');
}
document.addEventListener('click', e => {
  const btn  = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  if (menu && btn && !btn.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
});

function switchLang(lang) {
  curLang = lang;
  localStorage.setItem('lf-lang', lang);
  activeScripts.clear();
  updateScriptBtns();
  showScriptFilters(lang === 'japanese');
  if (lang !== 'japanese' && (curGrouping === 'fewest_strokes' || curGrouping === 'script')) {
    curGrouping = 'pos'; save('lf-grouping', 'pos');
  }
  const L = LANGS[lang];
  const flagEl = document.getElementById('langFlag');
  const lblEl  = document.getElementById('langLabel');
  if (flagEl) flagEl.textContent = L.flag;
  if (lblEl)  lblEl.textContent  = L.label;
  const srch = document.getElementById('searchInput2');
  if (srch) srch.placeholder = L.placeholder;
  document.querySelectorAll('.lang-option').forEach(el => el.classList.toggle('active', el.dataset.lang === lang));
  document.getElementById('langMenu')?.classList.remove('open');
  renderTab(curTab);
}

// ── TAB ROUTING ───────────────────────────────────────────────────────────────
function switchTab(tab) {
  curTab = tab;
  localStorage.setItem('lf-tab', tab);
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderTab(tab);
}
function renderTab(tab) {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = '';
  if (tab === 'vocab')    renderVocab(main);
  if (tab === 'practice') renderPractice(main);
  if (tab === 'grammar')  renderGrammar(main);
  if (tab === 'songs')    renderSongs(main);
  if (tab === 'guide')    renderGuide(main);
}

// ── SCRIPT FILTERS ────────────────────────────────────────────────────────────
function showScriptFilters(show) {
  const el = document.getElementById('scriptFilters');
  if (el) el.style.display = show ? 'flex' : 'none';
  if (!show) { activeScripts.clear(); updateScriptBtns(); }
}
function toggleScript(script) {
  if (activeScripts.has(script)) activeScripts.delete(script);
  else activeScripts.add(script);
  updateScriptBtns();
  renderWordGrid();
}
function updateScriptBtns() {
  document.querySelectorAll('.script-btn').forEach(btn => {
    btn.classList.toggle('script-on', activeScripts.has(btn.dataset.script));
  });
}

// ── SITUATION PILLS ───────────────────────────────────────────────────────────
function buildSitPills() {
  const row = document.getElementById('sitRow');
  if (!row) return;
  row.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'sit-pill' + (activeSituation === 'all' ? ' sit-active' : '');
  allBtn.textContent = 'all situations';
  allBtn.style.setProperty('--sc', '#c8a87a');
  allBtn.onclick = () => { activeSituation = activeSituation === 'all' ? null : 'all'; buildSitPills(); renderWordGrid(); };
  row.appendChild(allBtn);
  SITUATIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'sit-pill' + (activeSituation === s.key ? ' sit-active' : '');
    btn.textContent = s.label;
    btn.style.setProperty('--sc', s.color);
    btn.onclick = () => { activeSituation = activeSituation === s.key ? null : s.key; buildSitPills(); renderWordGrid(); };
    row.appendChild(btn);
  });
  if (activeSituation) {
    const words = LANGS[curLang].words;
    const sitWords = activeSituation === 'all'
      ? words.filter(w => w.sit && w.sit.length > 0)
      : words.filter(w => w.sit && w.sit.includes(activeSituation));
    const addAll = document.createElement('button');
    addAll.className = 'sit-add-all';
    addAll.textContent = 'add all to deck →';
    addAll.onclick = () => {
      if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
        const name = prompt('Name your new deck (' + sitWords.length + ' words):', '');
        if (!name || !name.trim()) return;
        addDeck(name.trim());
        sitWords.forEach(w => decks[decks.length - 1].words[w.kr] = true);
      } else {
        sitWords.forEach(w => decks[activeDeckIdx].words[w.kr] = true);
      }
      saveDeckState(); buildSitPills(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid();
    };
    row.appendChild(addAll);
  }
}

// ── PREMADE DECKS ─────────────────────────────────────────────────────────────
function addPremadeDeck(key) {
  const templates = PREMADE_DECKS[key];
  if (!templates) return;
  const words = LANGS[curLang].words;
  let added = 0;
  templates.forEach(template => {
    const existing = decks.find(d => d.name === template.name);
    if (existing) { words.filter(template.filter).forEach(w => existing.words[w.kr] = true); return; }
    const deck = {name: template.name, color: template.color, words: {}};
    words.filter(template.filter).forEach(w => deck.words[w.kr] = true);
    decks.push(deck);
    activeDeckIdx = decks.length - 1;
    added++;
  });
  saveDeckState(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid();
  showToast(added > 0 ? templates.map(t => '"' + t.name + '"').join(' + ') + ' added!' : 'Deck already exists — words updated.');
}
function addPremadeDeckJapaneseAll() {
  ['japanese_hiragana','japanese_katakana','japanese_kanji','japanese_dakuten'].forEach(key => addPremadeDeck(key));
}

// ── DECK STATE ────────────────────────────────────────────────────────────────
let decks = [];
let activeDeckIdx = -1;
let openSecs = {};

const POS_ORDER = ['expression','verb','adjective','noun','adverb','pronoun','particle'];
const PALETTE   = ['#c8a87a','#7ac8a0','#7a8cc8','#c87aa8','#7ac8c8','#c8c87a','#c87a7a','#a87ac8'];

const GROUPINGS = {
  pos: {label:'part of speech', key:w=>w.pos, order:()=>POS_ORDER, color:k=>({verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'}[k]||'#888')},
  register: {label:'formality', key:w=>w.register||'neutral', order:()=>['formal','neutral','casual'], color:k=>({formal:'#7a8cc8',neutral:'#7ac8a0',casual:'#c8a87a'}[k]||'#888')},
  most_common: {label:'most common first', key:w=>w.freq>=10?'essential':w.freq>=8?'very common':w.freq>=6?'common':w.freq>=4?'uncommon':'rare', order:()=>['essential','very common','common','uncommon','rare'], color:()=>'#7ac8a0'},
  least_common: {label:'least common first', key:w=>w.freq>=10?'essential':w.freq>=8?'very common':w.freq>=6?'common':w.freq>=4?'uncommon':'rare', order:()=>['rare','uncommon','common','very common','essential'], color:()=>'#c87a7a'},
  shortest: {label:'shortest first', key:w=>{const l=w.kr.length;return l<=1?'1 char':l<=2?'2 chars':l<=3?'3 chars':l<=4?'4 chars':'5+ chars';}, order:()=>['1 char','2 chars','3 chars','4 chars','5+ chars'], color:()=>'#7ac8c8'},
  a_z: {label:'a → z', key:w=>w.ro[0].toUpperCase(), order:keys=>keys.slice().sort(), color:()=>'#7a8cc8'},
  in_deck: {label:'in my deck', key:w=>deckColorFor(w.kr)?'in a deck':'not in deck', order:()=>['in a deck','not in deck'], color:k=>k==='in a deck'?'#c8a87a':'#888'},
  fewest_strokes: {label:'fewest strokes', key:_=>'kanji by stroke count', filter:w=>!!w.strokes, sort:(a,b)=>(a.strokes||99)-(b.strokes||99), order:()=>['kanji by stroke count'], color:()=>'#7ac8a0'},
  script: {label:'by script', key:w=>w.script||w.pos, order:()=>['hiragana','katakana','kanji','hiragana_d','katakana_d','expression','verb','adjective','noun','adverb','pronoun','particle'], displayName:k=>({'hiragana_d':'hiragana accents','katakana_d':'katakana accents'}[k]||k), color:k=>({'hiragana':'#7ac8a0','katakana':'#7a8cc8','kanji':'#c87aa8','hiragana_d':'#7ac8c8','katakana_d':'#c8c87a',verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'}[k]||'#888')},
};
let curGrouping = 'pos';

function deckColorFor(kr) { for (let d of decks) { if (d.words[kr]) return d.color; } return null; }
function nextDeckColor() { const used = decks.map(d => d.color); for (let c of PALETTE) { if (!used.includes(c)) return c; } return PALETTE[decks.length % PALETTE.length]; }
function addDeck(name) { decks.push({name, color: nextDeckColor(), words: {}}); activeDeckIdx = decks.length - 1; saveDeckState(); }
function deleteDeck(idx) { decks.splice(idx, 1); if (activeDeckIdx >= decks.length) activeDeckIdx = decks.length - 1; saveDeckState(); }
function saveDeckState() { save('lf-decks', decks); save('lf-activeDeck', activeDeckIdx); }

// ── VOCAB TAB ─────────────────────────────────────────────────────────────────
function renderVocab(container) {
  container.innerHTML = '';
  const ctrl = document.createElement('div'); ctrl.className = 'ctrl';
  const sitRow = document.createElement('div'); sitRow.className = 'sit-row'; sitRow.id = 'sitRow';
  ctrl.appendChild(sitRow);
  const mainRow = document.createElement('div'); mainRow.className = 'ctrl-row'; mainRow.style.cssText = 'margin-top:4px;flex-wrap:wrap;gap:6px';
  const searchInput = document.createElement('input'); searchInput.type = 'text'; searchInput.id = 'searchInput2';
  searchInput.placeholder = LANGS[curLang].placeholder; searchInput.style.cssText = 'flex:1;min-width:140px';
  searchInput.oninput = renderWordGrid;
  mainRow.appendChild(searchInput);
  const filtersBtn = document.createElement('button'); filtersBtn.className = 'ubtn filters-toggle'; filtersBtn.id = 'filtersToggle';
  filtersBtn.textContent = 'more filters ▾'; filtersBtn.onclick = toggleFilters;
  mainRow.appendChild(filtersBtn);
  const customBtn = document.createElement('button'); customBtn.className = 'ubtn'; customBtn.textContent = '+ custom word'; customBtn.onclick = openCustomWord;
  mainRow.appendChild(customBtn);
  ctrl.appendChild(mainRow);
  const filtersRow = document.createElement('div'); filtersRow.className = 'ctrl-row filters-row'; filtersRow.id = 'filtersRow'; filtersRow.style.cssText = 'display:none;flex-wrap:wrap;gap:6px;margin-top:4px';
  const groupBar = document.createElement('div'); groupBar.id = 'groupBar'; groupBar.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px';
  filtersRow.appendChild(groupBar);
  ['expand all', 'collapse all'].forEach((lbl, i) => {
    const b = document.createElement('button'); b.className = 'ubtn'; b.textContent = lbl;
    b.onclick = i === 0 ? vocabExpandAll : vocabCollapseAll;
    filtersRow.appendChild(b);
  });
  ctrl.appendChild(filtersRow);
  container.appendChild(ctrl);
  const wordSections = document.createElement('div'); wordSections.id = 'wordSections';
  container.appendChild(wordSections);
  const deckPanel = document.createElement('div'); deckPanel.id = 'deckPanel'; deckPanel.className = 'deck-panel surface';
  deckPanel.innerHTML = `<div class="deck-hdr"><span class="deck-title">your deck</span><div class="deck-acts"><button class="abtn danger" onclick="clearActiveDeck()">remove all</button><button class="abtn accent" onclick="openStudy()">study deck →</button></div></div><div id="deckSwitcher" class="deck-switcher"></div><div id="deckChips"></div>`;
  container.appendChild(deckPanel);
  showScriptFilters(curLang === 'japanese');
  buildSitPills(); buildGroupBtns(); renderWordGrid(); renderDeckSwitcher(); renderDeckChips();
}

function toggleFilters() {
  const row = document.getElementById('filtersRow'); const btn = document.getElementById('filtersToggle');
  const open = row.style.display === 'flex';
  row.style.display = open ? 'none' : 'flex';
  btn.textContent = open ? 'more filters ▾' : 'hide filters ▴';
}

function buildGroupBtns() {
  const bar = document.getElementById('groupBar'); if (!bar) return; bar.innerHTML = '';
  Object.entries(GROUPINGS).forEach(([key, cfg]) => {
    if ((key === 'fewest_strokes' || key === 'script') && curLang !== 'japanese') return;
    const btn = document.createElement('button'); btn.className = 'gbtn' + (key === curGrouping ? ' on' : ''); btn.textContent = cfg.label;
    btn.onclick = () => { curGrouping = key; save('lf-grouping', key); openSecs = {}; buildGroupBtns(); renderWordGrid(); };
    bar.appendChild(btn);
  });
}

function renderWordGrid() {
  const container = document.getElementById('wordSections'); if (!container) return;
  const rawSearch = document.getElementById('searchInput2');
  const search = (rawSearch?.value || '').toLowerCase().trim();
  if (!GROUPINGS[curGrouping]) curGrouping = 'pos';
  const cfg = GROUPINGS[curGrouping];
  const words = LANGS[curLang].words;
  const alphaPoses = new Set(['hiragana','katakana','kanji','hiragana_d','katakana_d']);
  let filtered = words.filter(w => {
    if (activeSituation === 'all' && !(w.sit && w.sit.length > 0)) return false;
    if (activeSituation && activeSituation !== 'all' && !(w.sit && w.sit.includes(activeSituation))) return false;
    if (activeScripts.size > 0) { if (!activeScripts.has(w.pos)) return false; }
    else if (curLang === 'japanese') { if (alphaPoses.has(w.pos)) return false; }
    if (search && !w.kr.includes(search) && !w.ro.toLowerCase().includes(search) && !w.meaning.toLowerCase().includes(search)) return false;
    return true;
  });
  if (cfg.filter && curLang === 'japanese') filtered = filtered.filter(cfg.filter);
  const groups = {};
  filtered.forEach(w => { const k = cfg.key(w); if (!k) return; if (!groups[k]) groups[k] = []; groups[k].push(w); });
  if (cfg.sort) Object.values(groups).forEach(arr => arr.sort(cfg.sort));
  const allKeys = Object.keys(groups);
  const ordered = cfg.order(allKeys).filter(k => groups[k]?.length > 0);
  if (search || activeSituation) ordered.forEach(k => openSecs[k] = true);
  if (Object.keys(openSecs).length === 0 && ordered.length > 0) openSecs[ordered[0]] = true;
  container.innerHTML = '';
  if (ordered.length === 0) { container.innerHTML = '<div class="empty-msg">no words match</div>'; return; }
  ordered.forEach(key => {
    const wds = groups[key]; const isOpen = !!openSecs[key]; const color = cfg.color(key);
    const selCount = wds.filter(w => deckColorFor(w.kr)).length;
    const sec = document.createElement('div'); sec.className = 'sec';
    const hdr = document.createElement('div'); hdr.className = 'sec-hdr';
    const left = document.createElement('div'); left.className = 'sec-left';
    const nm = document.createElement('span'); nm.className = 'sec-name'; nm.style.color = color;
    nm.textContent = cfg.displayName ? cfg.displayName(key) : key;
    const ct = document.createElement('span'); ct.className = 'sec-count'; ct.textContent = wds.length;
    left.appendChild(nm); left.appendChild(ct);
    if (selCount) { const sl = document.createElement('span'); sl.className = 'sec-sel'; sl.textContent = selCount + ' in deck'; left.appendChild(sl); }
    const chev = document.createElement('span'); chev.className = 'sec-chev'; chev.textContent = isOpen ? '▴' : '▾';
    hdr.appendChild(left); hdr.appendChild(chev);
    const body = document.createElement('div'); body.className = 'sec-body'; body.style.display = isOpen ? 'flex' : 'none';
    wds.forEach((w, i) => {
      const chip = document.createElement('div');
      const chipColor = deckColorFor(w.kr);
      chip.className = 'chip' + (chipColor ? ' on' : '');
      if (chipColor) chip.style.borderColor = chipColor;
      chip.style.animationDelay = Math.min(i * 0.008, 0.2) + 's';
      chip.title = w.meaning + ' — ' + w.example;
      const regColor = {formal:'#7a8cc8',casual:'#c8a87a',neutral:'transparent'}[w.register||'neutral'];
      const strokeBadge = (curGrouping === 'fewest_strokes' && w.strokes) ? `<span style="font-size:.5rem;color:var(--mu);margin-left:auto">${w.strokes}画</span>` : '';
      chip.innerHTML = `<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px"><span class="chip-kr" style="${chipColor?'color:'+chipColor:''}">${w.kr}</span>${w.register&&w.register!=='neutral'?`<span class="reg-badge" style="background:${regColor}20;color:${regColor};border-color:${regColor}40">${w.register}</span>`:''}${strokeBadge}</div><span class="chip-ro">${w.ro}</span>`;
      chip.onclick = () => toggleWordInDeck(w);
      chip.oncontextmenu = e => showWordCtxMenu(e, w);
      chip.ondblclick = () => speak(w.kr, curLang);
      body.appendChild(chip);
    });
    const toggle = () => {
      const open = sec.classList.toggle('open');
      body.style.display = open ? 'flex' : 'none';
      chev.textContent = open ? '▴' : '▾';
      if (open) openSecs[key] = true; else delete openSecs[key];
    };
    hdr.onclick = toggle;
    if (isOpen) sec.classList.add('open');
    sec.appendChild(hdr); sec.appendChild(body); container.appendChild(sec);
  });
}

function vocabExpandAll() { const words = LANGS[curLang].words; words.forEach(w => openSecs[GROUPINGS[curGrouping].key(w)] = true); renderWordGrid(); }
function vocabCollapseAll() { openSecs = {}; renderWordGrid(); }

function toggleWordInDeck(w) {
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
    const panel = document.getElementById('deckPanel');
    if (panel) { panel.style.outline = '2px solid var(--acc)'; setTimeout(() => panel.style.outline = '', 800); }
    return;
  }
  const d = decks[activeDeckIdx].words;
  if (d[w.kr]) delete d[w.kr]; else d[w.kr] = true;
  saveDeckState(); animateBadge(); renderDeckChips(); renderWordGrid();
}
function animateBadge() {
  const b = document.getElementById('deckBadge'); if (!b) return;
  b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); setTimeout(() => b.classList.remove('pop'), 200);
}

function renderDeckSwitcher() {
  const sw = document.getElementById('deckSwitcher'); if (!sw) return;
  sw.innerHTML = '';
  if (decks.length === 0) {
    sw.innerHTML = '<span class="empty-deck">right-click any word to create your first deck</span>';
  } else {
    decks.forEach((deck, i) => {
      const btn = document.createElement('button'); btn.className = 'dbtn' + (i === activeDeckIdx ? ' dactive' : ''); btn.style.setProperty('--dc', deck.color);
      const dot = document.createElement('span'); dot.className = 'ddot'; dot.style.background = deck.color;
      const lbl = document.createElement('span'); lbl.textContent = deck.name;
      const ct  = document.createElement('span'); ct.className = 'dct'; const wc = Object.keys(deck.words).length; if (wc > 0) ct.textContent = wc;
      btn.appendChild(dot); btn.appendChild(lbl); btn.appendChild(ct);
      btn.onclick = () => { activeDeckIdx = i === activeDeckIdx ? -1 : i; saveDeckState(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); };
      btn.oncontextmenu = e => showDeckCtxMenu(e, i);
      sw.appendChild(btn);
    });
  }
  const add = document.createElement('button'); add.className = 'dbtn'; add.style.cssText = '--dc:#7ac8a0;color:#7ac8a0;border-color:rgba(122,200,160,.3)'; add.textContent = '+ new deck';
  add.onclick = () => { const n = prompt('Name your new deck:', ''); if (n?.trim()) { addDeck(n.trim()); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); } };
  sw.appendChild(add);
  const premadeKeys = {korean:['korean'], italian:['italian'], japanese:['japanese_hiragana','japanese_katakana','japanese_kanji','japanese_dakuten','japanese_yofukashi','japanese_kawaikute']};
  if (premadeKeys[curLang]) {
    const pb = document.createElement('button'); pb.className = 'dbtn'; pb.style.cssText = 'color:var(--acc);border-color:var(--acc-bd)';
    pb.textContent = curLang === 'japanese' ? '★ alphabet + accent decks' : '★ starter decks';
    pb.onclick = () => { if (curLang === 'japanese') addPremadeDeckJapaneseAll(); else premadeKeys[curLang].forEach(k => addPremadeDeck(k)); };
    sw.appendChild(pb);
  }
  const badge = document.getElementById('deckBadge');
  if (badge) badge.textContent = activeDeckIdx >= 0 ? Object.keys(decks[activeDeckIdx]?.words || {}).length : '0';
  // SRS controls
  const srsWrap = document.createElement('div'); srsWrap.style.cssText = 'display:flex;gap:8px;margin-top:6px;align-items:center;flex-wrap:wrap';
  const srsModeBtn = document.createElement('button'); srsModeBtn.id = 'srsModeBtn'; srsModeBtn.className = 'abtn' + (srsMode ? ' accent' : '');
  srsModeBtn.textContent = srsMode ? 'smart review: on' : 'smart review: off'; srsModeBtn.onclick = toggleSRSMode;
  srsWrap.appendChild(srsModeBtn);
  if (srsMode && activeDeckIdx >= 0 && activeDeckIdx < decks.length) {
    const due = cardsDueToday(activeDeckIdx);
    const reviewBtn = document.createElement('button'); reviewBtn.className = 'abtn accent';
    reviewBtn.textContent = due > 0 ? 'review (' + due + ' due) →' : 'review (0 due)';
    reviewBtn.onclick = openReview; if (due === 0) reviewBtn.style.opacity = '0.5';
    srsWrap.appendChild(reviewBtn);
  }
  sw.appendChild(srsWrap);
}

function renderDeckChips() {
  const c = document.getElementById('deckChips'); if (!c) return;
  const badge = document.getElementById('deckBadge');
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
    if (badge) badge.textContent = '0';
    c.innerHTML = '<span class="empty-deck">select or create a deck, then click words to add them</span>';
    return;
  }
  const deck = decks[activeDeckIdx]; const keys = Object.keys(deck.words);
  if (badge) badge.textContent = keys.length;
  if (keys.length === 0) { c.innerHTML = `<span class="empty-deck">left-click words to add to <strong style="color:${deck.color}">${deck.name}</strong></span>`; return; }
  c.innerHTML = '';
  keys.forEach(kr => {
    const w = LANGS[curLang].words.find(x => x.kr === kr) || {kr, ro:'', meaning:''};
    const chip = document.createElement('div'); chip.className = 'dchip'; chip.style.cssText = `border-color:${deck.color};color:${deck.color}`;
    chip.innerHTML = `${w.kr} <span class="dchip-ro">${w.ro}</span><button class="dchip-x">×</button>`;
    chip.querySelector('button').onclick = () => { delete deck.words[kr]; saveDeckState(); renderDeckChips(); renderWordGrid(); };
    c.appendChild(chip);
  });
}
function clearActiveDeck() { if (activeDeckIdx < 0) return; decks[activeDeckIdx].words = {}; saveDeckState(); renderDeckChips(); renderWordGrid(); }

// ── CONTEXT MENUS ─────────────────────────────────────────────────────────────
let ctxMenu = null;
function removeCtxMenu() { if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; } }
document.addEventListener('click', removeCtxMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { removeCtxMenu(); closeCustomWord(); } });

function makeMenu(isDark) {
  const m = document.createElement('div');
  m.style.cssText = 'position:fixed;z-index:9999;border-radius:9px;overflow:hidden;min-width:170px;box-shadow:0 8px 32px rgba(0,0,0,.4)';
  m.style.background = isDark ? '#1e1e28' : '#fff';
  m.style.border = isDark ? '1px solid rgba(255,255,255,.14)' : '1px solid rgba(0,0,0,.14)';
  return m;
}
function menuRow(menu, label, color, fn, isDark) {
  const row = document.createElement('div');
  row.style.cssText = 'padding:8px 13px;font-size:.74rem;cursor:pointer;font-family:DM Mono,monospace;';
  row.style.color = color || (isDark ? '#f0eee8' : '#1c1a16');
  row.textContent = label;
  row.onmouseenter = () => row.style.background = isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';
  row.onmouseleave = () => row.style.background = '';
  row.onclick = e => { e.stopPropagation(); removeCtxMenu(); fn(); };
  menu.appendChild(row);
}
function positionMenu(menu, e) {
  menu.style.left = e.clientX + 'px'; menu.style.top = e.clientY + 'px';
  document.body.appendChild(menu); ctxMenu = menu;
  const r = menu.getBoundingClientRect();
  if (r.right  > window.innerWidth  - 8) menu.style.left = (e.clientX - r.width)  + 'px';
  if (r.bottom > window.innerHeight - 8) menu.style.top  = (e.clientY - r.height) + 'px';
}

function showWordCtxMenu(e, w) {
  e.preventDefault(); removeCtxMenu();
  const isDark = document.body.classList.contains('dark');
  const menu = makeMenu(isDark);
  const hd = document.createElement('div');
  hd.style.cssText = 'padding:8px 13px 4px;font-family:Noto Sans KR,sans-serif;font-size:.9rem;font-weight:500;color:' + (isDark ? '#f0eee8' : '#1c1a16');
  hd.textContent = w.kr + ' — ' + w.ro; menu.appendChild(hd);
  menuRow(menu, '▶ listen', isDark ? '#7ac8a0' : '#1a7a4a', () => speak(w.kr, curLang), isDark);
  const d = document.createElement('div'); d.style.cssText = 'border-top:1px solid ' + (isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)') + ';margin:2px 0'; menu.appendChild(d);
  const dh = document.createElement('div'); dh.style.cssText = 'padding:5px 13px 3px;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:' + (isDark ? '#55555f' : '#a09d96'); dh.textContent = 'add to deck'; menu.appendChild(dh);
  decks.forEach((deck, i) => {
    const inThis = !!deck.words[w.kr];
    menuRow(menu, (inThis ? '✓ ' : '') + deck.name, inThis ? deck.color : null, () => {
      decks.forEach(d => delete d.words[w.kr]);
      if (!inThis) deck.words[w.kr] = true;
      saveDeckState(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid();
    }, isDark);
  });
  const d2 = document.createElement('div'); d2.style.cssText = 'border-top:1px solid ' + (isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)') + ';margin:3px 0'; menu.appendChild(d2);
  menuRow(menu, '+ new deck', isDark ? '#7ac8a0' : '#1a7a4a', () => {
    const n = prompt('Name your new deck:', '');
    if (n?.trim()) { addDeck(n.trim()); decks[decks.length-1].words[w.kr] = true; saveDeckState(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); }
  }, isDark);
  positionMenu(menu, e);
}

function showDeckCtxMenu(e, idx) {
  e.preventDefault(); removeCtxMenu();
  const isDark = document.body.classList.contains('dark');
  const deck = decks[idx]; const menu = makeMenu(isDark);
  const hd = document.createElement('div'); hd.style.cssText = 'padding:7px 13px 5px;font-size:.65rem;letter-spacing:.08em;font-weight:500;text-transform:uppercase;color:' + deck.color; hd.textContent = deck.name; menu.appendChild(hd);
  menuRow(menu, 'rename', null, () => { const n = prompt('Rename deck:', deck.name); if (n?.trim()) { deck.name = n.trim(); saveDeckState(); renderDeckSwitcher(); } }, isDark);
  menuRow(menu, 'delete deck', '#c87a7a', () => { if (confirm('Delete "' + deck.name + '"? Words will not be deleted.')) { deleteDeck(idx); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); } }, isDark);
  positionMenu(menu, e);
}

// ── STUDY MODE ────────────────────────────────────────────────────────────────
let studyList = [], sIdx = 0, sFlip = false;

function openStudy() {
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) { alert('Select a deck first.'); return; }
  const keys = Object.keys(decks[activeDeckIdx].words);
  if (keys.length === 0) { alert(decks[activeDeckIdx].name + ' has no words yet.'); return; }
  studyList = shuffle(keys.map(kr => LANGS[curLang].words.find(w => w.kr === kr)).filter(Boolean));
  sIdx = 0; sFlip = false;
  renderStudyCard();
  document.getElementById('studyOverlay')?.classList.add('open');
  document.getElementById('srsControls').style.display = 'none';
  document.getElementById('normalControls').style.display = 'block';
  document.getElementById('mMeta').textContent = keys.length + ' words';
}
function closeStudy() { document.getElementById('studyOverlay')?.classList.remove('open'); }
function overlayClick(e) { if (e.target.id === 'studyOverlay') closeStudy(); }

function renderStudyCard() {
  const w = studyList[sIdx];
  const front = document.getElementById('cFront'); const back = document.getElementById('cBack'); const fcard = document.getElementById('fcard');
  if (!front || !back) return;
  if (fcard) { fcard.style.transition = 'none'; fcard.classList.remove('flip'); void fcard.offsetWidth; fcard.style.transition = ''; }
  front.innerHTML = `<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-kr">${w.kr}</div><div class="fc-ro">${w.ro}</div><div class="fc-pos">${w.pos}</div>${w.register&&w.register!=='neutral'?`<div class="fc-reg" style="color:${{formal:'#7a8cc8',casual:'#c8a87a'}[w.register]}">${w.register}</div>`:''}`;
  back.innerHTML = `<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-meaning">${w.meaning}</div><div class="fc-ex">${w.example}</div>`;
  sFlip = false;
  const ab = document.getElementById('againBtn'); const gb = document.getElementById('goodBtn'); const sh = document.getElementById('srsHint');
  if (ab) ab.style.display = 'none'; if (gb) gb.style.display = 'none'; if (sh) sh.style.display = 'block';
}
function flipCard() {
  sFlip = !sFlip;
  document.getElementById('fcard')?.classList.toggle('flip', sFlip);
  if (sFlip && document.getElementById('srsControls')?.style.display !== 'none') {
    const ab = document.getElementById('againBtn'); const gb = document.getElementById('goodBtn'); const sh = document.getElementById('srsHint');
    if (ab) ab.style.display = 'block';
    if (gb) {
      const w = studyList[sIdx];
      if (w) { const c = getCard(activeDeckIdx, w.kr); const ni = c.reps===0?1:c.reps===1?3:Math.round(c.interval*c.ease); gb.textContent = '✓ good · ' + (ni===1?'1 day':ni+' days'); }
      gb.style.display = 'block';
    }
    if (sh) sh.style.display = 'none';
  }
}
function nextCard() {
  sIdx++;
  if (sIdx >= studyList.length) {
    const last = studyList[studyList.length - 1];
    studyList = shuffle(studyList);
    if (studyList[0]?.kr === last?.kr && studyList.length > 1) [studyList[0], studyList[1]] = [studyList[1], studyList[0]];
    sIdx = 0;
  }
  renderStudyCard();
}
function reshuffleStudy() {
  const cur = studyList[sIdx];
  studyList = shuffle(studyList);
  if (studyList[0]?.kr === cur?.kr && studyList.length > 1) [studyList[0], studyList[1]] = [studyList[1], studyList[0]];
  sIdx = 0; renderStudyCard();
}
document.addEventListener('keydown', e => {
  if (!document.getElementById('studyOverlay')?.classList.contains('open')) return;
  if (e.key === 'Escape') closeStudy();
  if (e.key === 'ArrowRight') nextCard();
  if (e.key === ' ') { e.preventDefault(); flipCard(); }
});

// ── SRS SYSTEM ────────────────────────────────────────────────────────────────
let srsMode = localStorage.getItem('lf-srs-mode') === 'true';
let srsData = {};
try { srsData = JSON.parse(localStorage.getItem('lf-srs-data') || '{}'); } catch(e) { srsData = {}; }
function saveSRS() { localStorage.setItem('lf-srs-data', JSON.stringify(srsData)); }
function srsKey(deckIdx, kr) { const deck = decks[deckIdx]; return (deck ? deck.name : 'deck') + ':' + kr; }
function getCard(deckIdx, kr) { const k = srsKey(deckIdx, kr); if (!srsData[k]) srsData[k] = {interval:1,due:0,ease:2.5,reps:0}; return srsData[k]; }
function cardsDueToday(deckIdx) { if (deckIdx < 0 || deckIdx >= decks.length) return 0; const now = Date.now(); return Object.keys(decks[deckIdx].words).filter(kr => getCard(deckIdx, kr).due <= now).length; }
function reviewAnswer(kr, good) {
  const k = srsKey(activeDeckIdx, kr); if (!srsData[k]) srsData[k] = {interval:1,due:0,ease:2.5,reps:0};
  const c = srsData[k];
  if (good) { c.reps++; c.interval = c.reps===1?1:c.reps===2?3:Math.round(c.interval*c.ease); c.ease = Math.max(1.3, c.ease+0.1); c.due = Date.now()+c.interval*86400000; }
  else { c.reps = 0; c.interval = 1; c.ease = Math.max(1.3, c.ease-0.2); c.due = Date.now(); }
  saveSRS();
}
function toggleSRSMode() { srsMode = !srsMode; localStorage.setItem('lf-srs-mode', srsMode ? 'true' : 'false'); renderDeckSwitcher(); }
function openReview() {
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) { showToast('Select a deck first.'); return; }
  const now = Date.now();
  const dueKeys = Object.keys(decks[activeDeckIdx].words).filter(kr => getCard(activeDeckIdx, kr).due <= now);
  if (dueKeys.length === 0) { showToast('No cards due for review!'); return; }
  studyList = shuffle(dueKeys.map(kr => LANGS[curLang].words.find(w => w.kr === kr)).filter(Boolean));
  sIdx = 0; sFlip = false;
  renderStudyCard();
  document.getElementById('studyOverlay')?.classList.add('open');
  document.getElementById('srsControls').style.display = 'flex';
  document.getElementById('normalControls').style.display = 'none';
  document.getElementById('mMeta').textContent = dueKeys.length + ' cards due today';
  const ab = document.getElementById('againBtn'); const gb = document.getElementById('goodBtn'); const sh = document.getElementById('srsHint');
  if (ab) ab.style.display = 'none'; if (gb) gb.style.display = 'none'; if (sh) sh.style.display = 'block';
}
function srsGood() { const w = studyList[sIdx]; if (w) reviewAnswer(w.kr, true); srsNextCard(); }
function srsAgain() { const w = studyList[sIdx]; if (w) { reviewAnswer(w.kr, false); studyList.push(w); } srsNextCard(); }
function srsNextCard() {
  sIdx++;
  const now = Date.now();
  while (sIdx < studyList.length) { const w = studyList[sIdx]; const c = getCard(activeDeckIdx, w.kr); if (c.due <= now || c.reps === 0) break; sIdx++; }
  if (sIdx >= studyList.length) { showToast('Review complete!'); closeStudy(); renderDeckSwitcher(); return; }
  sFlip = false; renderStudyCard();
}

// ── PRACTICE TAB ──────────────────────────────────────────────────────────────
let practiceQueue = [], practiceIdx = 0, practiceScore = {correct:0,total:0}, practiceFilter = 'all', selectedBlocks = [], answered = false;

function renderPractice(container) {
  container.innerHTML = '';
  const ctrl = document.createElement('div'); ctrl.className = 'ctrl';
  const row = document.createElement('div'); row.className = 'ctrl-row'; row.style.cssText = 'gap:6px;flex-wrap:wrap';
  const lbl = document.createElement('span'); lbl.className = 'ctrl-label'; lbl.textContent = 'exercise type:'; row.appendChild(lbl);
  ['all','particle','conjugate','build','fill','formal_casual','output'].forEach(t => {
    const b = document.createElement('button'); b.className = 'gbtn' + (practiceFilter === t ? ' on' : ''); b.textContent = t;
    b.onclick = () => setPracticeFilter(t); row.appendChild(b);
  });
  ctrl.appendChild(row); container.appendChild(ctrl);
  const area = document.createElement('div'); area.id = 'practiceArea'; area.style.cssText = 'padding:1.5rem 2rem';
  container.appendChild(area);
  loadPracticeQueue(); showNextExercise();
}
function setPracticeFilter(f) {
  practiceFilter = f;
  document.querySelectorAll('#practiceArea').forEach(el => el.innerHTML = '');
  document.querySelectorAll('.gbtn').forEach(b => b.classList.toggle('on', b.textContent === f));
  loadPracticeQueue(); showNextExercise();
}
function loadPracticeQueue() {
  const s = LANGS[curLang].sentences; const all = (typeof s === 'function' ? s() : s) || [];
  let filtered = practiceFilter === 'all' ? all : all.filter(s => s.type === practiceFilter);
  if (filtered.length === 0) filtered = all;
  practiceQueue = shuffle(filtered); practiceIdx = 0;
}
function showNextExercise() {
  if (practiceQueue.length === 0) { document.getElementById('practiceArea').innerHTML = '<div class="empty-msg">No exercises available yet for this language.</div>'; return; }
  if (practiceIdx >= practiceQueue.length) { practiceIdx = 0; practiceQueue = shuffle(practiceQueue); }
  const ex = practiceQueue[practiceIdx]; answered = false; selectedBlocks = [];
  const area = document.getElementById('practiceArea'); if (!area) return;
  area.innerHTML = '';
  const score = document.createElement('div'); score.className = 'practice-score';
  score.innerHTML = `<span class="score-num">${practiceScore.correct}/${practiceScore.total}</span><span class="score-lbl">correct</span><button class="ubtn" style="margin-left:auto" onclick="practiceScore={correct:0,total:0};showNextExercise()">reset</button>`;
  area.appendChild(score);
  const card = document.createElement('div'); card.className = 'exercise-card surface';
  const meta = document.createElement('div'); meta.className = 'ex-meta';
  const typeColors = {particle:'#7ac8a0',conjugate:'#7a8cc8',build:'#c8a87a',fill:'#c87aa8',formal_casual:'#7ac8c8',output:'#c8c87a'};
  meta.innerHTML = `<span class="ex-type" style="color:${typeColors[ex.type]||'#888'}">${ex.type}</span><span class="ex-level">level ${ex.level}</span>`;
  card.appendChild(meta);
  const eng = document.createElement('div'); eng.className = 'ex-english'; eng.textContent = ex.english; card.appendChild(eng);
  if (ex.baseForm) { const bf = document.createElement('div'); bf.className = 'ex-base'; bf.textContent = 'base: ' + ex.baseForm; card.appendChild(bf); }
  const prompt = document.createElement('div'); prompt.className = 'ex-prompt'; prompt.id = 'exPrompt'; card.appendChild(prompt);
  const ansArea = document.createElement('div'); ansArea.className = 'ex-answer-area'; ansArea.id = 'ansArea'; card.appendChild(ansArea);
  const choicesDiv = document.createElement('div'); choicesDiv.className = 'ex-choices'; choicesDiv.id = 'choicesDiv'; card.appendChild(choicesDiv);
  const feedback = document.createElement('div'); feedback.className = 'ex-feedback'; feedback.id = 'exFeedback'; feedback.style.display = 'none'; card.appendChild(feedback);
  const nextBtn = document.createElement('button'); nextBtn.className = 'abtn accent'; nextBtn.style.cssText = 'width:100%;margin-top:1rem;display:none'; nextBtn.id = 'exNextBtn';
  nextBtn.textContent = 'next exercise →'; nextBtn.onclick = () => { practiceIdx++; showNextExercise(); }; card.appendChild(nextBtn);
  area.appendChild(card);
  if (ex.type === 'build') renderBuildExercise(ex);
  else if (ex.type === 'formal_casual') renderFormalCasualExercise(ex);
  else if (ex.type === 'output') renderOutputExercise(ex);
  else renderChoiceExercise(ex);
}
function renderChoiceExercise(ex) {
  document.getElementById('exPrompt').innerHTML = ex.prompt.replace('___', '<span class="blank">___</span>');
  const choices = document.getElementById('choicesDiv'); choices.innerHTML = '';
  shuffle(ex.choices).forEach(c => {
    const btn = document.createElement('button'); btn.className = 'choice-btn'; btn.textContent = c;
    btn.onclick = () => submitChoiceAnswer(c, ex); choices.appendChild(btn);
  });
}
function submitChoiceAnswer(chosen, ex) {
  if (answered) return; answered = true; practiceScore.total++;
  const correct = chosen === ex.answer; if (correct) practiceScore.correct++;
  document.querySelectorAll('.choice-btn').forEach(btn => {
    if (btn.textContent === ex.answer) btn.classList.add('correct');
    else if (btn.textContent === chosen && !correct) btn.classList.add('wrong');
    btn.onclick = null;
  });
  document.getElementById('exPrompt').innerHTML = ex.prompt.replace('___', `<span class="answer-fill" style="color:${correct?'#7ac8a0':'#c87a7a'}">${chosen}</span>`);
  showFeedback(correct, ex);
}
function renderBuildExercise(ex) {
  document.getElementById('exPrompt').innerHTML = '<span style="opacity:.5;font-size:.75rem">arrange blocks in correct order:</span>';
  document.getElementById('ansArea').innerHTML = '<div class="build-slots" id="buildSlots"><span class="slot-hint">tap blocks below to place them here</span></div>';
  const choices = document.getElementById('choicesDiv'); choices.innerHTML = '';
  shuffle(ex.blocks).forEach(block => {
    const btn = document.createElement('button'); btn.className = 'block-btn'; btn.textContent = block; btn.dataset.word = block;
    btn.onclick = () => selectBlock(btn, block, ex); choices.appendChild(btn);
  });
}
function selectBlock(btn, block, ex) {
  if (answered || btn.disabled) return;
  btn.disabled = true; btn.style.opacity = '0.35'; selectedBlocks.push(block);
  const slots = document.getElementById('buildSlots'); slots.querySelector('.slot-hint')?.remove();
  const chip = document.createElement('span'); chip.className = 'placed-block'; chip.textContent = block;
  chip.onclick = () => { if (answered) return; const idx = selectedBlocks.lastIndexOf(block); if (idx >= 0) { selectedBlocks.splice(idx,1); chip.remove(); btn.disabled = false; btn.style.opacity = '1'; if (slots.children.length===0) slots.innerHTML='<span class="slot-hint">tap blocks below to place them here</span>'; } };
  slots.appendChild(chip);
  if (selectedBlocks.length === ex.answer.length) setTimeout(() => checkBuildAnswer(ex), 300);
}
function checkBuildAnswer(ex) {
  if (answered && selectedBlocks.length < ex.answer.length) return;
  answered = true; practiceScore.total++;
  const correct = selectedBlocks.join('|') === ex.answer.join('|'); if (correct) practiceScore.correct++;
  document.querySelectorAll('.placed-block').forEach((chip, i) => { chip.style.color = correct ? '#7ac8a0' : (chip.textContent === ex.answer[i] ? '#7ac8a0' : '#c87a7a'); });
  if (!correct) { const slots = document.getElementById('buildSlots'); const ans = document.createElement('div'); ans.style.cssText = 'margin-top:8px;font-size:.75rem;color:#7ac8a0'; ans.textContent = '✓ ' + ex.answer.join(' '); slots.parentNode.insertBefore(ans, slots.nextSibling); }
  showFeedback(correct, ex);
}
function renderFormalCasualExercise(ex) {
  const prompt = document.getElementById('exPrompt'); prompt.innerHTML = '';
  const lbl = document.createElement('span'); lbl.style.cssText = 'font-size:.7rem;color:var(--mu);display:block;margin-bottom:6px'; lbl.textContent = 'formal version:';
  const ftxt = document.createElement('span'); ftxt.style.cssText = "font-family:'Noto Sans KR',sans-serif;font-size:1.1rem"; ftxt.textContent = ex.formal;
  prompt.appendChild(lbl); prompt.appendChild(ftxt);
  const choices = document.getElementById('choicesDiv'); choices.innerHTML = '';
  const clbl = document.createElement('div'); clbl.style.cssText = 'font-size:.7rem;color:var(--mu);margin-bottom:6px;width:100%'; clbl.textContent = 'casual version:'; choices.appendChild(clbl);
  shuffle(ex.choices).forEach(c => { const btn = document.createElement('button'); btn.className = 'choice-btn'; btn.style.fontFamily = "'Noto Sans KR',sans-serif"; btn.textContent = c; btn.onclick = () => submitChoiceAnswer(c, ex); choices.appendChild(btn); });
}
function renderOutputExercise(ex) {
  const prompt = document.getElementById('exPrompt'); prompt.innerHTML = '<span style="font-size:.7rem;color:var(--mu);display:block;margin-bottom:4px">hint: ' + ex.hint + '</span>';
  const ansArea = document.getElementById('ansArea');
  const input = document.createElement('input'); input.type = 'text'; input.placeholder = 'type your answer...'; input.style.cssText = "width:100%;font-family:'Noto Sans KR',sans-serif;font-size:1rem"; input.id = 'outputInput';
  ansArea.appendChild(input);
  const submitBtn = document.createElement('button'); submitBtn.className = 'abtn accent'; submitBtn.style.marginTop = '8px'; submitBtn.textContent = 'check →';
  submitBtn.onclick = () => {
    const val = input.value.trim(); if (!val) return;
    const correct = val === ex.answer;
    const fb = document.getElementById('exFeedback'); fb.style.display = 'block'; fb.className = 'ex-feedback ' + (correct ? 'fb-correct' : 'fb-wrong');
    fb.innerHTML = '<div class="fb-result">' + (correct ? '✓ correct' : '✗ not quite') + '</div>' + (!correct ? '<div class="fb-explanation">correct answer: <span style="font-family:Noto Sans KR,sans-serif">' + ex.answer + '</span></div>' : '') + '<div class="fb-explanation">' + ex.explanation + '</div>';
    practiceScore.total++; if (correct) practiceScore.correct++;
    const sn = document.querySelector('.score-num'); if (sn) sn.textContent = practiceScore.correct + '/' + practiceScore.total;
    document.getElementById('exNextBtn').style.display = 'block'; input.disabled = true; submitBtn.disabled = true;
  };
  ansArea.appendChild(submitBtn);
  input.onkeydown = e => { if (e.key === 'Enter') submitBtn.click(); };
}
function showFeedback(correct, ex) {
  const fb = document.getElementById('exFeedback'); fb.style.display = 'block'; fb.className = 'ex-feedback ' + (correct ? 'fb-correct' : 'fb-wrong');
  fb.innerHTML = `<div class="fb-result">${correct ? '✓ correct' : '✗ not quite'}</div><div class="fb-explanation">${ex.explanation}</div>`;
  const sn = document.querySelector('.score-num'); if (sn) sn.textContent = practiceScore.correct + '/' + practiceScore.total;
  document.getElementById('exNextBtn').style.display = 'block';
}

// ── GRAMMAR TAB ───────────────────────────────────────────────────────────────
function renderGrammar(container) {
  const notes = GRAMMAR[curLang] || [];
  container.innerHTML = '';
  if (!notes.length) { container.innerHTML = '<div class="empty-msg">Grammar notes coming soon.</div>'; return; }
  const wrap = document.createElement('div'); wrap.style.cssText = 'padding:1.5rem 2rem;display:flex;flex-direction:column;gap:10px';
  const intro = document.createElement('div'); intro.className = 't-muted'; intro.style.cssText = 'font-size:.75rem;padding-bottom:.5rem';
  intro.textContent = notes.length + ' grammar topics — click any card to expand'; wrap.appendChild(intro);
  const levelColors = ['#7ac8a0','#c8a87a','#c87aa8'];
  const levelLabels = ['beginner','intermediate','advanced'];
  notes.forEach(note => {
    const card = document.createElement('div'); card.className = 'grammar-card surface';
    const hdr = document.createElement('div'); hdr.className = 'grammar-hdr';
    const left = document.createElement('div'); left.className = 'grammar-left';
    const lvl = document.createElement('span'); lvl.className = 'grammar-level'; lvl.style.color = levelColors[(note.level||1)-1]; lvl.textContent = levelLabels[(note.level||1)-1];
    const title = document.createElement('div'); title.className = 'grammar-title'; title.textContent = note.title;
    const shortEl = document.createElement('div'); shortEl.className = 'grammar-short t-muted'; shortEl.textContent = note.short;
    left.appendChild(lvl); left.appendChild(title); left.appendChild(shortEl);
    const chev = document.createElement('span'); chev.className = 'sec-chev'; chev.textContent = '▾';
    hdr.appendChild(left); hdr.appendChild(chev);
    const body = document.createElement('div'); body.className = 'grammar-body'; body.style.display = 'none';
    const bodyText = document.createElement('div'); bodyText.className = 'grammar-text'; bodyText.textContent = note.body;
    const exBox = document.createElement('div'); exBox.className = 'grammar-example';
    exBox.innerHTML = '<div class="ex-label t-muted">example</div><pre class="ex-pre">' + note.example + '</pre>';
    const speakBtn = document.createElement('button'); speakBtn.className = 'ubtn'; speakBtn.style.marginTop = '8px'; speakBtn.textContent = '▶ hear example';
    speakBtn.onclick = () => speak(note.example.split('\n')[0].split('→')[0].trim(), curLang);
    body.appendChild(bodyText); body.appendChild(exBox); body.appendChild(speakBtn);
    hdr.onclick = () => { const open = body.style.display === 'none'; body.style.display = open ? 'block' : 'none'; chev.textContent = open ? '▴' : '▾'; card.classList.toggle('grammar-open', open); };
    card.appendChild(hdr); card.appendChild(body); wrap.appendChild(card);
  });
  container.appendChild(wrap);
}

// ── SONGS TAB ─────────────────────────────────────────────────────────────────
function renderSongs(container) {
  const langSongs = SONGS.filter(s => !s.lang || s.lang === curLang);
  if (!langSongs.length) { container.innerHTML = '<div class="empty-msg">No songs yet for this language — switch to Japanese to see よふかしのうた.</div>'; return; }
  const wrap = document.createElement('div'); wrap.style.cssText = 'padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1.2rem';
  langSongs.forEach(song => {
    const songCard = document.createElement('div'); songCard.className = 'song-card';
    const titleBar = document.createElement('div');
    titleBar.style.cssText = `background:${song.color}18;border-bottom:1px solid ${song.color}44;padding:1rem 1.2rem;display:flex;align-items:center;gap:12px;cursor:pointer;user-select:none`;
    const chevron = document.createElement('span'); chevron.style.cssText = 'font-size:.65rem;color:var(--su);flex-shrink:0'; chevron.textContent = '▾';
    const titleInfo = document.createElement('div'); titleInfo.style.flex = '1';
    titleInfo.innerHTML = `<div style="font-family:'DM Serif Display',serif;font-size:1.2rem;color:var(--tx)">${song.title} — ${song.titleRo}</div><div style="font-size:.68rem;color:var(--mu);margin-top:2px">${song.artist} · ${song.words.length} words</div>`;
    const addAllBtn = document.createElement('button'); addAllBtn.className = 'abtn accent'; addAllBtn.textContent = '+ add all to deck';
    addAllBtn.onclick = e => { e.stopPropagation(); addSongToDeck(song, container); };
    titleBar.appendChild(chevron); titleBar.appendChild(titleInfo); titleBar.appendChild(addAllBtn);
    songCard.appendChild(titleBar);
    const body = document.createElement('div'); body.style.display = 'none';
    const descEl = document.createElement('div'); descEl.style.cssText = 'padding:.75rem 1.2rem;font-size:.74rem;color:var(--mu);line-height:1.7;border-bottom:1px solid var(--bd)'; descEl.textContent = song.desc;
    body.appendChild(descEl);
    const grid = document.createElement('div'); grid.style.cssText = 'padding:.85rem 1rem;display:flex;flex-direction:column;gap:6px';
    song.words.forEach(w => {
      const wordObj = LANGS[curLang]?.words.find(x => x.kr === w.kr);
      const inDeck = wordObj && deckColorFor(w.kr);
      const row = document.createElement('div'); row.className = 'song-word-row'; if (inDeck) row.style.borderColor = song.color;
      const rowHdr = document.createElement('div'); rowHdr.style.cssText = 'display:flex;align-items:center;gap:10px;padding:.6rem .9rem;cursor:pointer';
      const kanjiEl = document.createElement('span'); kanjiEl.style.cssText = `font-family:'Noto Sans KR',sans-serif;font-size:1.6rem;font-weight:500;color:${inDeck?song.color:'var(--tx)'};min-width:2.2rem;text-align:center;flex-shrink:0`; kanjiEl.textContent = w.kr;
      const info = document.createElement('div'); info.style.flex = '1';
      info.innerHTML = `<div style="font-size:.65rem;color:var(--acc)">${w.ro}</div><div style="font-size:.78rem;color:var(--tx)">${w.meaning}</div><div style="font-size:.65rem;color:var(--mu);font-style:italic">${w.lyric} — ${w.lyricRo}</div>`;
      const right = document.createElement('div'); right.style.cssText = 'display:flex;align-items:center;gap:6px;flex-shrink:0';
      if (w.crush) { const badge = document.createElement('span'); badge.style.cssText = 'font-size:.55rem;padding:2px 7px;border-radius:99px;border:1px solid rgba(200,168,122,.4);color:var(--acc)'; badge.textContent = 'sounds different sung'; right.appendChild(badge); }
      const spkBtn = document.createElement('button'); spkBtn.className = 'ubtn'; spkBtn.textContent = '▶'; spkBtn.onclick = e => { e.stopPropagation(); speak(w.kr, 'japanese'); }; right.appendChild(spkBtn);
      const addBtn = document.createElement('button'); addBtn.className = 'abtn' + (inDeck ? ' accent' : ''); if (inDeck) addBtn.style.cssText = `background:${song.color};border-color:${song.color}`;
      addBtn.textContent = inDeck ? '✓ in deck' : '+ deck';
      addBtn.onclick = e => { e.stopPropagation(); if (wordObj) { toggleWordInDeck(wordObj); renderSongs(container); } }; right.appendChild(addBtn);
      const rowChev = document.createElement('span'); rowChev.style.cssText = 'font-size:.55rem;color:var(--su)'; rowChev.textContent = '▾'; right.appendChild(rowChev);
      rowHdr.appendChild(kanjiEl); rowHdr.appendChild(info); rowHdr.appendChild(right);
      const noteEl = document.createElement('div'); noteEl.className = 'song-note-body';
      if (w.note) { const p = document.createElement('p'); p.style.cssText = 'font-size:.72rem;color:var(--mu);line-height:1.7'; p.textContent = w.note; noteEl.appendChild(p); }
      let noteOpen = false;
      rowHdr.onclick = () => { noteOpen = !noteOpen; noteEl.style.display = noteOpen ? 'block' : 'none'; rowChev.textContent = noteOpen ? '▴' : '▾'; };
      row.appendChild(rowHdr); row.appendChild(noteEl); grid.appendChild(row);
    });
    body.appendChild(grid); songCard.appendChild(body);
    let isOpen = false;
    titleBar.onclick = e => { if (addAllBtn.contains(e.target)) return; isOpen = !isOpen; body.style.display = isOpen ? 'block' : 'none'; chevron.textContent = isOpen ? '▴' : '▾'; };
    wrap.appendChild(songCard);
  });
  container.appendChild(wrap);
}
function addSongToDeck(song, container) {
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
    const n = prompt('Name for new deck:', song.title); if (!n || !n.trim()) return;
    addDeck(n.trim()); decks[decks.length - 1].color = song.color;
  }
  const idx = activeDeckIdx >= 0 ? activeDeckIdx : decks.length - 1;
  let added = 0;
  song.words.forEach(w => { const word = LANGS[curLang]?.words.find(x => x.kr === w.kr); if (word) { decks[idx].words[w.kr] = true; added++; } });
  saveDeckState(); showToast('Added ' + added + ' words to "' + decks[idx].name + '"');
  renderSongs(container);
}

// ── CUSTOM WORD BUILDER ───────────────────────────────────────────────────────
let cwbText = '';
const CWB_CHARS = {
  korean: [
    {label:'vowels', chars:['아','야','어','여','오','요','우','유','으','이','애','에','외','위','와','워','의']},
    {label:'consonants', chars:['가','나','다','라','마','바','사','아','자','차','카','타','파','하']},
    {label:'common syllables', chars:['안','는','에','서','를','가','이','한','의','지','그','들','하','도','다','요','게','만','와','수','로','으','나','이다','있','없','해','해요','어요','아요','았','었','겠','세요']},
  ],
  italian: [
    {label:'vowels', chars:['a','e','i','o','u','à','è','ì','ò','ù','é']},
    {label:'consonants', chars:['b','c','d','f','g','h','l','m','n','p','q','r','s','t','v','z']},
    {label:'common words', chars:['il','la','lo','i','le','gli','un','una','di','del','della','in','a','e','non','mi','ti','si','ci','vi','ho','hai','ha','sei','sono','che','per','con']},
  ],
  japanese: [
    {label:'hiragana vowels', chars:['あ','い','う','え','お']},
    {label:'hiragana k-row', chars:['か','き','く','け','こ']},
    {label:'hiragana s-row', chars:['さ','し','す','せ','そ']},
    {label:'hiragana t-row', chars:['た','ち','つ','て','と']},
    {label:'hiragana n-row', chars:['な','に','ぬ','ね','の','ん']},
    {label:'hiragana h/m/y/r/w', chars:['は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を']},
    {label:'accents', chars:['が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ']},
    {label:'katakana', chars:['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン']},
  ],
};
function openCustomWord() { cwbText = ''; document.getElementById('cwbDisplay').textContent = ''; document.getElementById('cwbRo').value = ''; document.getElementById('cwbMeaning').value = ''; buildCwbAlpha(); document.getElementById('customWordOverlay').classList.add('open'); }
function closeCustomWord() { document.getElementById('customWordOverlay').classList.remove('open'); }
function buildCwbAlpha() {
  const container = document.getElementById('cwbAlpha'); container.innerHTML = '';
  (CWB_CHARS[curLang] || CWB_CHARS.korean).forEach(group => {
    const lbl = document.createElement('div'); lbl.className = 'cwb-section-label'; lbl.textContent = group.label; container.appendChild(lbl);
    group.chars.forEach(ch => { const btn = document.createElement('button'); btn.className = 'cwb-char'; btn.textContent = ch; btn.onclick = () => { cwbText += ch; document.getElementById('cwbDisplay').textContent = cwbText; }; container.appendChild(btn); });
  });
}
function cwbBackspace() { const chars = [...cwbText]; chars.pop(); cwbText = chars.join(''); document.getElementById('cwbDisplay').textContent = cwbText; }
function cwbClear() { cwbText = ''; document.getElementById('cwbDisplay').textContent = ''; }
function cwbAddSpace() { cwbText += ' '; document.getElementById('cwbDisplay').textContent = cwbText; }
function cwbSave() {
  const word = cwbText.trim(); const ro = document.getElementById('cwbRo').value.trim(); const meaning = document.getElementById('cwbMeaning').value.trim();
  if (!word) { showToast('Type a word first!'); return; } if (!meaning) { showToast('Add a meaning for the word'); return; }
  LANGS[curLang].words.push({kr:word, ro:ro||word, meaning, example:word+' — '+meaning, pos:'expression', freq:7, register:'neutral', _custom:true});
  if (activeDeckIdx >= 0 && activeDeckIdx < decks.length) { decks[activeDeckIdx].words[word] = true; saveDeckState(); showToast('"'+word+'" added to '+decks[activeDeckIdx].name+'!'); }
  else showToast('"'+word+'" added to vocabulary!');
  cwbText = ''; document.getElementById('cwbDisplay').textContent = ''; document.getElementById('cwbRo').value = ''; document.getElementById('cwbMeaning').value = '';
  renderWordGrid(); renderDeckChips();
}

// ── GUIDE TAB ─────────────────────────────────────────────────────────────────
const ROADMAPS = {
  korean: [
    {stage:1, label:'foundations', color:'#7ac8a0', milestones:[
      {title:'Learn Hangul', desc:'Korean uses its own alphabet — 14 consonants and 10 vowels that combine into syllable blocks. Most people can learn to read it in 1–3 days.', tip:'Start with the 5 basic consonants: ㄱ ㄴ ㄷ ㄹ ㅁ. Each shape reflects where in your mouth the sound is made.', check:()=>false},
      {title:'Learn greetings and basics', desc:'Your first 10 words: hello, thank you, sorry, yes, no, okay, I, you, this, that.', actionLabel:'open meeting phrases →', action:()=>{activeSituation='meeting';buildSitPills();switchTab('vocab');}, check:()=>{const mw=KOREAN_WORDS.filter(w=>w.sit&&w.sit.includes('meeting'));return mw.filter(w=>{for(let d of decks)if(d.words[w.kr])return true;return false;}).length>=5;}},
      {title:'Understand SOV word order', desc:'Korean sentences end with the verb. "I rice eat" not "I eat rice." The verb always goes last, no exceptions.', actionLabel:'read grammar note →', action:()=>switchTab('grammar'), check:()=>false, tip:'The only rule you really need at first: whatever the action is, it goes at the end.'},
      {title:'Learn the core particles', desc:'은/는, 이/가, 을/를 mark topic, subject, and object. They replace word order as the way Korean shows who does what.', actionLabel:'practice particles →', action:()=>{practiceFilter='particle';switchTab('practice');}, check:()=>practiceScore.correct>=5, tip:'Don\'t stress은/는 vs 이/가 at first — just get used to seeing them.'},
    ]},
    {stage:2, label:'building blocks', color:'#c8a87a', milestones:[
      {title:'Learn the 30 most common words', desc:'Frequency matters more than breadth at this stage. The top 30 words cover a huge percentage of everyday speech.', actionLabel:'sort by most common →', action:()=>{curGrouping='most_common';save('lf-grouping','most_common');switchTab('vocab');}, check:()=>{const ess=KOREAN_WORDS.filter(w=>w.freq>=9);return ess.filter(w=>{for(let d of decks)if(d.words[w.kr])return true;return false;}).length>=20;}, tip:'나, 너, 우리, 뭐, 왜, 어디, 좋아, 있다, 없다, 알다 — these ten alone go a very long way.'},
      {title:'Learn present tense conjugation', desc:'Polite present: verb stem + 아요/어요. Casual: just the stem. This pattern covers most of what you\'ll say day to day.', actionLabel:'practice conjugation →', action:()=>{practiceFilter='conjugate';switchTab('practice');}, check:()=>false, tip:'Vowel harmony (ㅏ/ㅗ → 아요, everything else → 어요) sounds complex but quickly becomes automatic.'},
      {title:'Add a survival deck', desc:'Restaurant, transport, emergency phrases. Basic functional language makes a real difference.', actionLabel:'add starter decks →', action:()=>addPremadeDeck('korean'), check:()=>decks.some(d=>d.name==='Survival Korean'), tip:'화장실이 어디예요? (where is the bathroom?) might be the single most useful sentence you learn.'},
    ]},
    {stage:3, label:'conversational', color:'#7a8cc8', milestones:[
      {title:'Learn past and future tense', desc:'Past: add 았어요/었어요. Future: add ㄹ/을 거예요. Combined with present, you can talk about yesterday, today, and tomorrow.', actionLabel:'review tense grammar →', action:()=>switchTab('grammar'), check:()=>false, tip:'갔어요 (went), 먹었어요 (ate), 할 거예요 (will do) — three patterns that unlock a huge amount.'},
      {title:'Master formality levels', desc:'반말 (casual) for friends, 존댓말 (polite) for strangers and elders. Knowing when to switch is as important as knowing the words.', actionLabel:'practice formality drills →', action:()=>{practiceFilter='formal_casual';switchTab('practice');}, check:()=>false},
      {title:'Try the assisted reading tool', desc:'Paste a sentence from a Korean song, drama subtitle, or text message. Tap words you don\'t know.', actionLabel:'go to reading tool ↓', action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'}), check:()=>false, tip:'K-pop lyrics are great for this — casual speech patterns and high-frequency emotional vocabulary.'},
    ]},
    {stage:4, label:'intermediate', color:'#c87aa8', milestones:[
      {title:'Read 50 words without romanization', desc:'Challenge yourself to read cards without looking at the romanization. This is where reading fluency actually starts.', check:()=>false, tip:'Cover the romanization with a piece of paper during study mode.'},
      {title:'Learn connecting expressions', desc:'그리고 (and), 그런데 (but), 왜냐하면 (because), 그래서 (so). These make sentences flow instead of sounding like a vocabulary list.', check:()=>false, tip:'In casual speech: 근데 for 그런데, 왜냐면 for 왜냐하면.'},
    ]},
  ],
  italian: [
    {stage:1, label:'foundations', color:'#7ac8a0', milestones:[
      {title:'Learn the 8 essential irregular verbs', desc:'essere, avere, fare, andare, venire, volere, potere, dovere. These 8 verbs appear in almost every sentence. Memorize their present tense forms first.', actionLabel:'browse verbs →', action:()=>{curGrouping='pos';save('lf-grouping','pos');switchTab('vocab');}, check:()=>{const kv=['essere','avere','fare','andare','venire','volere','potere','dovere'];return kv.filter(kr=>{for(let d of decks)if(d.words[kr])return true;return false;}).length>=6;}, tip:'Non capisco (I don\'t understand) uses capire. Learn it alongside the 8 core irregulars.'},
      {title:'Understand essere vs avere', desc:'Italian uses "have" where English uses "be" for physical/emotional states. Ho fame = I\'m hungry. Ho freddo = I\'m cold.', actionLabel:'read grammar note →', action:()=>switchTab('grammar'), check:()=>false, tip:'States to memorize: ho fame, ho sete, ho freddo, ho caldo, ho sonno, ho fretta, ho paura.'},
      {title:'Learn greetings and salve', desc:'The formal/informal split starts here. Ciao is casual-only. Salve is the safe neutral option for strangers.', actionLabel:'open meeting phrases →', action:()=>{activeSituation='meeting';buildSitPills();switchTab('vocab');}, check:()=>{const mw=ITALIAN_WORDS.filter(w=>w.sit&&w.sit.includes('meeting'));return mw.filter(w=>{for(let d of decks)if(d.words[w.kr])return true;return false;}).length>=5;}},
    ]},
    {stage:2, label:'building blocks', color:'#c8a87a', milestones:[
      {title:'Learn -ARE verb conjugation', desc:'Most Italian verbs are -ARE. Endings: io -o, tu -i, lui/lei -a, noi -iamo, voi -ate, loro -ano.', actionLabel:'practice conjugation →', action:()=>{practiceFilter='conjugate';switchTab('practice');}, check:()=>practiceScore.correct>=5, tip:'The subject pronoun (io, tu) is usually dropped — the verb ending already tells you who is speaking.'},
      {title:'Understand adjective agreement', desc:'Adjectives must match the noun in gender and number. Un ragazzo bravo / una ragazza brava.', actionLabel:'read grammar note →', action:()=>switchTab('grammar'), check:()=>false, tip:'Bello behaves like the definite article — bel, bell\', bella, bei, begli, belle.'},
      {title:'Understand piacere', desc:'Mi piace = "it pleases me." The thing you like is the subject, not you.', check:()=>false, tip:'Mi piace la musica (singular) vs mi piacciono i film (plural).'},
    ]},
    {stage:3, label:'conversational', color:'#7a8cc8', milestones:[
      {title:'Learn the passato prossimo', desc:'The most common past tense: avere/essere + past participle. Movement verbs use essere and the participle agrees with the subject.', actionLabel:'practice past tense →', action:()=>{practiceFilter='conjugate';switchTab('practice');}, check:()=>false, tip:'essere verbs: andare, venire, arrivare, partire, nascere, morire, restare, diventare.'},
      {title:'Master tu vs Lei', desc:'Tu for friends and peers. Lei (formal you) for strangers, shopkeepers, older people.', actionLabel:'practice formality drills →', action:()=>{practiceFilter='formal_casual';switchTab('practice');}, check:()=>false, tip:'When in doubt, use Lei. Let the other person initiate switching to tu.'},
      {title:'Try the assisted reading tool', desc:'Paste an Italian sentence from a song, news article, or conversation. Tap words to see meaning.', actionLabel:'go to reading tool ↓', action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'}), check:()=>false},
    ]},
  ],
  japanese: [
    {stage:1, label:'the writing systems', color:'#7ac8a0', milestones:[
      {title:'Learn hiragana (46 characters)', desc:'Every Japanese sound has a hiragana symbol. Foundation for everything — learn all 46 in 1–2 weeks at 5 per day.', actionLabel:'add hiragana deck →', action:()=>{addPremadeDeck('japanese_hiragana');switchTab('vocab');}, check:()=>decks.some(d=>d.name==='Hiragana (all 46)'), tip:'Learn あいうえお first, then the k-sounds (か き く け こ), s-sounds (さ し す せ そ), and t-sounds (た ち つ て と) in order.'},
      {title:'Learn katakana (46 characters)', desc:'Same sounds as hiragana, angular shapes. Used for foreign loanwords. Faster to learn since you already know the sounds.', actionLabel:'add katakana deck →', action:()=>{addPremadeDeck('japanese_katakana');switchTab('vocab');}, check:()=>decks.some(d=>d.name==='Katakana (all 46)'), tip:'ラーメン, テレビ, コーヒー — once you know katakana you can read a huge chunk of modern Japanese.'},
      {title:'Learn the accent marks (dakuten)', desc:'Adding ゛changes the consonant: か → が, さ → ざ. Adding ゜makes p sounds: は → ぱ. 25 new sounds from one mark.', actionLabel:'add accent decks →', action:()=>{addPremadeDeck('japanese_dakuten');switchTab('vocab');}, check:()=>decks.some(d=>d.name==='Hiragana Accents')},
    ]},
    {stage:2, label:'core sentences', color:'#c8a87a', milestones:[
      {title:'Learn X は Y です', desc:'The backbone sentence: topic + は + description + です. わたしは学生です = I am a student. Everything builds on this.', actionLabel:'read grammar note →', action:()=>switchTab('grammar'), check:()=>false, tip:'は is written as ha but read as wa when it\'s the topic marker.'},
      {title:'Learn the 8 core particles', desc:'は が を に で の も か — these mark grammatical roles the way word order does in English.', actionLabel:'practice particles →', action:()=>{practiceFilter='particle';switchTab('practice');}, check:()=>practiceScore.correct>=5, tip:'に and で are hardest to keep straight. に = direction (go TO school), で = action location (study AT the library).'},
      {title:'Learn ます form verbs', desc:'The polite present tense. たべます (eat), いきます (go). The base for past (-ました) and negative (-ません).', actionLabel:'practice verb forms →', action:()=>{practiceFilter='conjugate';switchTab('practice');}, check:()=>false, tip:'Japanese is SOV — the verb always comes at the end. Every sentence. No exceptions.'},
    ]},
    {stage:3, label:'vocabulary depth', color:'#7a8cc8', milestones:[
      {title:'Learn 50 essential words', desc:'Once you can read both alphabets, vocabulary is what matters most.', actionLabel:'browse vocabulary →', action:()=>{activeScripts.clear();updateScriptBtns();curGrouping='most_common';save('lf-grouping','most_common');switchTab('vocab');}, check:()=>{const vocab=JAPANESE_WORDS.filter(w=>!['hiragana','katakana','kanji','hiragana_d','katakana_d'].includes(w.pos));return vocab.filter(w=>{for(let d of decks)if(d.words[w.kr])return true;return false;}).length>=50;}, tip:'すみません, ありがとう, わかりません, どこ, いくら — five words that get you very far in Japan.'},
      {title:'Explore a song vocabulary deck', desc:'Songs like よふかしのうた use high-frequency kanji in emotional context. Great way to connect sound to meaning.', actionLabel:'open songs tab →', action:()=>switchTab('songs'), check:()=>decks.some(d=>d.name==='よふかしのうた'||d.name==='可愛くてごめん')},
    ]},
    {stage:4, label:'kanji and reading', color:'#c87aa8', milestones:[
      {title:'Start learning kanji', desc:'There are 2,136 standard kanji. You don\'t need all of them — 300–500 covers most everyday contexts.', actionLabel:'add essential kanji deck →', action:()=>{addPremadeDeck('japanese_kanji');switchTab('vocab');}, check:()=>decks.some(d=>d.name==='Essential Kanji'), tip:'Each kanji has multiple readings. Start with the most common in context.'},
      {title:'Try the assisted reading tool', desc:'Paste any Japanese sentence. The tool segments it into words and lets you tap each one to see its meaning.', actionLabel:'go to reading tool ↓', action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'}), check:()=>false, tip:'Japanese has no spaces between words — the tool uses the vocabulary list to find boundaries.'},
    ]},
  ],
};

// Japanese tokenizer (longest-match dictionary segmentation)
function tokenizeSentence(text, lang) {
  if (!text || !text.trim()) return [];
  if (lang === 'korean' || lang === 'italian') {
    const tokens = [];
    text.split(/\s+/).forEach(part => {
      if (!part) return;
      const match = part.match(/^([\s\S]*?)([。.!?！？、,，…]+)$/);
      if (match) { if (match[1]) tokens.push({text:match[1],isPunct:false}); tokens.push({text:match[2],isPunct:true}); }
      else tokens.push({text:part, isPunct:false});
    });
    return tokens;
  }
  if (lang === 'japanese') return tokenizeJapanese(text);
  return [{text, isPunct:false}];
}
function tokenizeJapanese(text) {
  const wordMap = new Map();
  JAPANESE_WORDS.forEach(w => wordMap.set(w.kr, w));
  ['は','が','を','に','で','の','も','か','と','へ','から','まで','より','ので','のに','けど','けれど','し','て','ね','よ','な'].forEach(p => { if (!wordMap.has(p)) wordMap.set(p, {kr:p,ro:p,meaning:'particle/function word',pos:'particle'}); });
  const tokens = []; let i = 0; const chars = [...text];
  while (i < chars.length) {
    const ch = chars[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[。.!?！？、,，…「」『』【】（）()・ー〜~]/.test(ch)) { tokens.push({text:ch,isPunct:true}); i++; continue; }
    let matched = false;
    for (let len = Math.min(8, chars.length - i); len >= 1; len--) {
      const candidate = chars.slice(i, i + len).join('');
      if (wordMap.has(candidate)) { tokens.push({text:candidate,isPunct:false,word:wordMap.get(candidate)}); i += len; matched = true; break; }
    }
    if (!matched) {
      const last = tokens[tokens.length - 1];
      if (last && last.unknown && !last.isPunct) last.text += ch;
      else tokens.push({text:ch,isPunct:false,unknown:true});
      i++;
    }
  }
  return tokens;
}

const READING_SAMPLES = {
  korean: ['오늘 날씨가 너무 좋아서 공원에 갔어요.','나는 한국 음식을 정말 좋아해요.','자꾸 생각나, 왠지 모르게 너만 바라봐.','괜찮아? 많이 힘들었겠다. 항상 내 옆에 있을게.'],
  italian: ['Oggi il tempo è bellissimo, andiamo al parco.','Non capisco tutto, ma mi piace molto l\'italiano.','Voglio un caffè, per favore. Quanto costa?','Ti voglio bene.'],
  japanese: ['よふかしをした。夜の街が好きだ。','すみません、トイレはどこですか？','私は毎日日本語を勉強しています。','ありがとうございます。とても助かりました。'],
};

function renderGuide(container) {
  container.innerHTML = '';
  const wrap = document.createElement('div'); wrap.className = 'guide-wrap';
  // Roadmap section
  const roadmapSection = document.createElement('div'); roadmapSection.id = 'roadmapSection';
  buildRoadmap(roadmapSection); wrap.appendChild(roadmapSection);
  // Divider
  const hr = document.createElement('hr'); hr.style.cssText = 'border:none;border-top:1px solid var(--bd)'; wrap.appendChild(hr);
  // Reading tool section
  const readingSection = document.createElement('div'); readingSection.id = 'readingSection';
  buildReadingTool(readingSection); wrap.appendChild(readingSection);
  container.appendChild(wrap);
}

function milestoneKey(lang, stageIdx, milestoneIdx) {
  return 'lf-milestone-' + lang + '-' + stageIdx + '-' + milestoneIdx;
}
function getMilestoneDone(lang, stageIdx, milestoneIdx) {
  return localStorage.getItem(milestoneKey(lang, stageIdx, milestoneIdx)) === '1';
}
function setMilestoneDone(lang, stageIdx, milestoneIdx, done) {
  if (done) localStorage.setItem(milestoneKey(lang, stageIdx, milestoneIdx), '1');
  else localStorage.removeItem(milestoneKey(lang, stageIdx, milestoneIdx));
}

function buildRoadmap(container) {
  container.innerHTML = '';
  const hdr = document.createElement('div'); hdr.style.marginBottom = '1.25rem';
  hdr.innerHTML = `<div class="guide-section-title">learning path</div><div class="guide-section-sub">your suggested progression for ${LANGS[curLang].label}. check off milestones yourself as you complete them.</div>`;
  container.appendChild(hdr);
  const roadmap = ROADMAPS[curLang];
  if (!roadmap) { container.innerHTML += '<div class="empty-msg">Roadmap coming soon.</div>'; return; }
  roadmap.forEach((stage, stageIdx) => {
    const stageEl = document.createElement('div'); stageEl.style.marginBottom = '1.5rem';
    const stageHdr = document.createElement('div'); stageHdr.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:.75rem';
    stageHdr.innerHTML = `<span style="font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;font-weight:500;color:${stage.color};flex-shrink:0">stage ${stage.stage}</span><span style="font-size:.8rem;font-weight:500;color:var(--tx)">${stage.label}</span><span style="flex:1;height:1px;background:var(--bd)"></span>`;
    stageEl.appendChild(stageHdr);
    stage.milestones.forEach((m, milestoneIdx) => {
      const isDone = getMilestoneDone(curLang, stageIdx, milestoneIdx);
      const card = document.createElement('div'); card.className = 'milestone-card';
      card.style.cssText = `border:1px solid ${isDone ? stage.color + '60' : 'var(--bd)'};background:${isDone ? stage.color + '10' : 'var(--sf)'}`;

      // clickable check circle
      const checkEl = document.createElement('div'); checkEl.className = 'milestone-check';
      checkEl.style.cssText = `border:2px solid ${isDone ? stage.color : 'var(--bd2)'};background:${isDone ? stage.color : 'transparent'};cursor:pointer;flex-shrink:0`;
      checkEl.textContent = isDone ? '✓' : '';
      checkEl.title = isDone ? 'mark as not done' : 'mark as done';
      checkEl.onclick = () => {
        const nowDone = !getMilestoneDone(curLang, stageIdx, milestoneIdx);
        setMilestoneDone(curLang, stageIdx, milestoneIdx, nowDone);
        buildRoadmap(container);
      };
      card.appendChild(checkEl);

      const content = document.createElement('div'); content.style.cssText = 'flex:1;min-width:0';
      const title = document.createElement('div'); title.className = 'milestone-title'; title.style.color = isDone ? stage.color : 'var(--tx)'; title.textContent = m.title; content.appendChild(title);
      const desc = document.createElement('div'); desc.className = 'milestone-desc'; desc.textContent = m.desc; content.appendChild(desc);
      if (m.tip) { const tip = document.createElement('div'); tip.className = 'milestone-tip'; tip.style.cssText = `color:${stage.color};background:${stage.color}15;border-left:2px solid ${stage.color}`; tip.textContent = m.tip; content.appendChild(tip); }
      if (m.action) { const actBtn = document.createElement('button'); actBtn.className = 'ubtn'; actBtn.style.cssText = `font-size:.67rem;color:${stage.color};border-color:${stage.color}50`; actBtn.textContent = m.actionLabel || 'go →'; actBtn.onclick = () => { if (typeof m.action === 'function') m.action(); }; content.appendChild(actBtn); }
      card.appendChild(content); stageEl.appendChild(card);
    });
    container.appendChild(stageEl);
  });
  const resetBtn = document.createElement('button'); resetBtn.className = 'ubtn'; resetBtn.style.marginTop = '4px'; resetBtn.textContent = '↺ reset all progress';
  resetBtn.onclick = () => {
    if (!confirm('Reset all milestone progress?')) return;
    Object.keys(localStorage).filter(k => k.startsWith('lf-milestone-')).forEach(k => localStorage.removeItem(k));
    buildRoadmap(container);
  };
  container.appendChild(resetBtn);
}

function buildReadingTool(container) {
  container.innerHTML = '';
  const hdr = document.createElement('div'); hdr.style.marginBottom = '1rem';
  hdr.innerHTML = `<div class="guide-section-title">assisted reading</div><div class="guide-section-sub">paste any ${LANGS[curLang].label} sentence or paragraph. tap a word to see its meaning and add it to a deck.</div>`;
  container.appendChild(hdr);
  const inputWrap = document.createElement('div'); inputWrap.style.cssText = 'display:flex;flex-direction:column;gap:7px;margin-bottom:1rem';
  const textarea = document.createElement('textarea'); textarea.id = 'readingInput';
  textarea.placeholder = curLang === 'korean' ? '한국어 문장을 붙여넣으세요...' : curLang === 'italian' ? 'Incolla una frase in italiano...' : '日本語の文を貼り付けてください...';
  textarea.style.cssText = 'width:100%;min-height:80px;resize:vertical;background:var(--sf);border:1px solid var(--bd2);border-radius:8px;color:var(--tx);font-family:"Noto Sans KR",sans-serif;font-size:1rem;padding:10px 13px;outline:none;transition:border-color .2s;box-sizing:border-box;line-height:1.6';
  textarea.onfocus = () => textarea.style.borderColor = 'var(--acc)'; textarea.onblur = () => textarea.style.borderColor = 'var(--bd2)';
  inputWrap.appendChild(textarea);
  const sampleRow = document.createElement('div'); sampleRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;align-items:center';
  const sampleLbl = document.createElement('span'); sampleLbl.style.cssText = 'font-size:.63rem;letter-spacing:.1em;text-transform:uppercase;color:var(--su);flex-shrink:0'; sampleLbl.textContent = 'try:'; sampleRow.appendChild(sampleLbl);
  (READING_SAMPLES[curLang] || []).forEach(s => {
    const pill = document.createElement('button'); pill.className = 'gbtn'; pill.style.cssText = 'font-size:.65rem;font-family:"Noto Sans KR",sans-serif';
    pill.textContent = s.length > 18 ? s.slice(0, 18) + '…' : s; pill.title = s;
    pill.onclick = () => { textarea.value = s; analyzeReading(container, s); }; sampleRow.appendChild(pill);
  });
  inputWrap.appendChild(sampleRow);
  const btnRow = document.createElement('div'); btnRow.style.cssText = 'display:flex;gap:7px';
  const analyzeBtn = document.createElement('button'); analyzeBtn.className = 'abtn accent'; analyzeBtn.textContent = 'analyze →'; analyzeBtn.onclick = () => analyzeReading(container, textarea.value); btnRow.appendChild(analyzeBtn);
  const clearBtn = document.createElement('button'); clearBtn.className = 'abtn'; clearBtn.textContent = 'clear'; clearBtn.onclick = () => { textarea.value = ''; const o = document.getElementById('readingOutput'); if (o) o.innerHTML = ''; const wc = document.getElementById('readingWordCard'); if (wc) wc.style.display = 'none'; }; btnRow.appendChild(clearBtn);
  inputWrap.appendChild(btnRow);
  textarea.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) analyzeBtn.click(); };
  container.appendChild(inputWrap);
  const output = document.createElement('div'); output.id = 'readingOutput'; output.style.marginBottom = '.75rem'; container.appendChild(output);
  const wordCard = document.createElement('div'); wordCard.id = 'readingWordCard'; wordCard.className = 'reading-word-card'; wordCard.style.display = 'none'; container.appendChild(wordCard);
}

function analyzeReading(container, text) {
  const trimmed = (text || '').trim(); if (!trimmed) return;
  const tokens = tokenizeSentence(trimmed, curLang);
  const output = document.getElementById('readingOutput'); if (!output) return;
  output.innerHTML = '';
  if (!tokens.length) { output.innerHTML = '<div class="empty-msg">Nothing to analyze.</div>'; return; }
  const hint = document.createElement('div'); hint.style.cssText = 'font-size:.63rem;color:var(--su);margin-bottom:.6rem;letter-spacing:.04em'; hint.textContent = 'tap a word to see its meaning'; output.appendChild(hint);
  const tokenWrap = document.createElement('div'); tokenWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:3px;align-items:baseline;line-height:2.4;padding:.75rem 1rem;background:var(--sf);border:1px solid var(--bd);border-radius:10px';
  tokens.forEach(token => {
    if (token.isPunct) { const span = document.createElement('span'); span.style.cssText = 'color:var(--su);font-size:.9rem;font-family:"Noto Sans KR",sans-serif'; span.textContent = token.text; tokenWrap.appendChild(span); return; }
    const vocabWord = LANGS[curLang].words.find(w => w.kr === token.text) || token.word || null;
    const hasEntry = !!vocabWord;
    const inDeck = hasEntry && deckColorFor(token.text);
    const span = document.createElement('span');
    span.className = 'reading-token' + (inDeck ? ' in-deck' : '');
    if (!hasEntry) span.style.borderColor = 'transparent';
    const textEl = document.createElement('span'); textEl.className = 'reading-token-text';
    textEl.style.cssText = `font-size:${curLang==='japanese'?'1.3rem':'1.1rem'};color:${inDeck?'var(--acc)':hasEntry?'var(--tx)':'var(--su)'}`;
    textEl.textContent = token.text; span.appendChild(textEl);
    if (hasEntry && vocabWord.ro) { const ro = document.createElement('span'); ro.className = 'reading-token-ro'; ro.textContent = vocabWord.ro; span.appendChild(ro); }
    if (hasEntry) { span.style.cursor = 'pointer'; span.onclick = () => showReadingWordCard(container, vocabWord); }
    tokenWrap.appendChild(span);
  });
  output.appendChild(tokenWrap);
  const known = tokens.filter(t => !t.isPunct && (LANGS[curLang].words.find(w => w.kr === t.text) || t.word)).length;
  const total = tokens.filter(t => !t.isPunct).length;
  if (total > 0) {
    const stats = document.createElement('div'); stats.className = 'reading-stats';
    stats.innerHTML = `<span>${total} word${total!==1?'s':''}</span><span style="color:var(--acc)">${known} in vocabulary</span><span>${total-known} unknown</span>`;
    output.appendChild(stats);
  }
}

function showReadingWordCard(container, word) {
  let card = document.getElementById('readingWordCard'); if (!card) return;
  const inDeck = deckColorFor(word.kr);
  card.style.display = 'block'; card.innerHTML = '';
  const top = document.createElement('div'); top.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:.5rem';
  const wordInfo = document.createElement('div');
  wordInfo.innerHTML = `<div style="font-family:'Noto Sans KR',sans-serif;font-size:1.8rem;font-weight:500;color:var(--acc);line-height:1.1">${word.kr}</div><div style="font-size:.72rem;color:var(--mu);margin-top:2px">${word.ro}</div>`;
  top.appendChild(wordInfo);
  const actions = document.createElement('div'); actions.style.cssText = 'display:flex;gap:6px;flex-shrink:0';
  const spkBtn = document.createElement('button'); spkBtn.className = 'ubtn'; spkBtn.textContent = '▶'; spkBtn.onclick = () => speak(word.kr, curLang); actions.appendChild(spkBtn);
  const deckBtn = document.createElement('button'); deckBtn.className = 'abtn' + (inDeck ? ' accent' : ''); deckBtn.textContent = inDeck ? '✓ in deck' : '+ add to deck';
  deckBtn.onclick = () => {
    if (activeDeckIdx < 0) { const n = prompt('Name your new deck:', ''); if (!n?.trim()) return; addDeck(n.trim()); }
    toggleWordInDeck(word); showReadingWordCard(container, word);
    analyzeReading(container, document.getElementById('readingInput')?.value);
  };
  actions.appendChild(deckBtn); top.appendChild(actions); card.appendChild(top);
  const meaning = document.createElement('div'); meaning.style.cssText = "font-family:'DM Serif Display',serif;font-size:1.05rem;color:var(--tx);margin-bottom:.4rem"; meaning.textContent = word.meaning; card.appendChild(meaning);
  if (word.pos) { const posColors = {verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'}; const posEl = document.createElement('span'); posEl.style.cssText = `font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:${posColors[word.pos]||'var(--mu)'};margin-bottom:.5rem;display:inline-block`; posEl.textContent = word.pos; card.appendChild(posEl); }
  if (word.example) { const ex = document.createElement('div'); ex.style.cssText = 'font-size:.72rem;color:var(--mu);font-style:italic;line-height:1.65;padding:.5rem .75rem;background:var(--sf2);border-radius:7px;margin-top:.4rem;border:1px solid var(--bd)'; ex.textContent = word.example; card.appendChild(ex); }
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
(function boot() {
  decks         = load('lf-decks', []);
  activeDeckIdx = load('lf-activeDeck', -1);
  curGrouping   = load('lf-grouping', 'pos');
  if (!GROUPINGS[curGrouping]) curGrouping = 'pos';
  if (activeDeckIdx >= decks.length) activeDeckIdx = -1;
  if (curLang !== 'japanese' && (curGrouping === 'fewest_strokes' || curGrouping === 'script')) { curGrouping = 'pos'; }

  document.body.className = theme;
  applyFontSize(fontSize);
  document.getElementById('themeBtn').textContent = theme === 'dark' ? 'light mode' : 'dark mode';

  const L = LANGS[curLang];
  document.getElementById('langFlag').textContent  = L.flag;
  document.getElementById('langLabel').textContent = L.label;
  document.querySelectorAll('.lang-option').forEach(el => el.classList.toggle('active', el.dataset.lang === curLang));
  showScriptFilters(curLang === 'japanese');

  const savedTab = localStorage.getItem('lf-tab') || 'vocab';
  curTab = savedTab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === savedTab));
  renderTab(savedTab);
})();
