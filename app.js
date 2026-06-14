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
const ACHIEVEMENTS = [
  {id:'first_deck',   icon:'🃏', name:'First Deck',      desc:'Create your first deck',                color:'#c8a87a'},
  {id:'streak_3',     icon:'🔥', name:'On Fire',          desc:'3 day streak',                          color:'#c87a7a'},
  {id:'streak_7',     icon:'⚡', name:'Week Warrior',     desc:'7 day streak — streak shield unlocked', color:'#c8c87a'},
  {id:'streak_14',    icon:'🌟', name:'Dedicated',        desc:'14 day streak',                         color:'#7ac8a0'},
  {id:'streak_30',    icon:'🏆', name:'Monthly Master',   desc:'30 day streak',                         color:'#a87ac8'},
  {id:'streak_100',   icon:'💎', name:'Diamond Mind',     desc:'100 day streak',                        color:'#7a8cc8'},
  {id:'words_50',     icon:'📚', name:'Word Collector',   desc:'Add 50 words to decks',                 color:'#7ac8a0'},
  {id:'words_200',    icon:'📖', name:'Vocabulary Rich',  desc:'Add 200 words to decks',                color:'#c87aa8'},
  {id:'practice_10',  icon:'✏️',  name:'First Steps',     desc:'Complete 10 practice exercises',        color:'#7ac8c8'},
  {id:'practice_100', icon:'🎯', name:'Sharp Shooter',    desc:'Complete 100 practice exercises',       color:'#c8a87a'},
  {id:'perfect_5',    icon:'⭐', name:'Perfect Run',      desc:'Get 5 correct in a row',                color:'#c8c87a'},
  {id:'all_langs',    icon:'🌍', name:'Polyglot',         desc:'Study all three languages',             color:'#a87ac8'},
  {id:'songs_deck',   icon:'🎵', name:'Music Fan',        desc:'Add words from a song deck',            color:'#c87aa8'},
  {id:'shield_used',  icon:'🛡️', name:'Shield Bearer',   desc:'Use your streak shield',                color:'#7a8cc8'},
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
  el.innerHTML = `<span style="font-size:1.6rem">${a.icon}</span><div><div style="font-weight:500;color:${a.color};margin-bottom:2px">achievement unlocked</div><div style="font-size:.82rem">${a.name}</div><div style="font-size:.68rem;color:var(--mu)">${a.desc}</div></div>`;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .5s'; setTimeout(() => el.remove(), 500); }, 4000);
}
function checkAchievements() {
  const allWords = new Set();
  decks.forEach(d => Object.keys(d.words).forEach(w => allWords.add(w)));
  if (allWords.size >= 50)  unlockAchievement('words_50');
  if (allWords.size >= 200) unlockAchievement('words_200');
  if (decks.length > 0) unlockAchievement('first_deck');
  const langsStudied = load('lf-langs-studied', []);
  if (!langsStudied.includes(curLang)) { langsStudied.push(curLang); save('lf-langs-studied', langsStudied); }
  if (langsStudied.length >= 3) unlockAchievement('all_langs');
  const songNames = ['よふかしのうた','可愛くてごめん','アイドル'];
  if (decks.some(d => songNames.includes(d.name))) unlockAchievement('songs_deck');
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
function renderWordGrid() {
  const container=document.getElementById('wordSections'); if(!container) return;
  const rawSearch=document.getElementById('searchInput2');
  const search=(rawSearch?.value||'').toLowerCase().trim();
  if(!GROUPINGS[curGrouping]) curGrouping='pos';
  const cfg=GROUPINGS[curGrouping], words=LANGS[curLang].words;
  const alphaPoses=new Set(['hiragana','katakana','kanji','hiragana_d','katakana_d']);
  let filtered=words.filter(w=>{
    if(activeSituation==='all'&&!(w.sit&&w.sit.length>0)) return false;
    if(activeSituation&&activeSituation!=='all'&&!(w.sit&&w.sit.includes(activeSituation))) return false;
    if(activeScripts.size>0){if(!activeScripts.has(w.pos)) return false;}
    else if(curLang==='japanese'){if(alphaPoses.has(w.pos)) return false;}
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
    wds.forEach((w,i)=>{
      const chip=document.createElement('div'); const chipColor=deckColorFor(w.kr);
      chip.className='chip'+(chipColor?' on':''); if(chipColor) chip.style.borderColor=chipColor;
      chip.style.animationDelay=Math.min(i*0.008,0.2)+'s'; chip.title=w.meaning+' — '+w.example;
      const regColor={formal:'#7a8cc8',casual:'#c8a87a',neutral:'transparent'}[w.register||'neutral'];
      const sb=(curGrouping==='fewest_strokes'&&w.strokes)?`<span style="font-size:.5rem;color:var(--mu);margin-left:auto">${w.strokes}画</span>`:'';
      const roHtml=showRomanization?`<span class="chip-ro">${w.ro}</span>`:'';
      chip.innerHTML=`<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px"><span class="chip-kr" style="${chipColor?'color:'+chipColor:''}">${w.kr}</span>${w.register&&w.register!=='neutral'?`<span class="reg-badge" style="background:${regColor}20;color:${regColor};border-color:${regColor}40">${w.register}</span>`:''}${sb}</div>${roHtml}`;
      chip.onclick=()=>toggleWordInDeck(w); chip.oncontextmenu=e=>showWordCtxMenu(e,w); chip.ondblclick=()=>speak(w.kr,curLang);
      body.appendChild(chip);
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
  if(decks.length===0){sw.innerHTML='<span class="empty-deck">right-click any word to create your first deck</span>';}
  else{decks.forEach((deck,i)=>{
    const btn=document.createElement('button'); btn.className='dbtn'+(i===activeDeckIdx?' dactive':''); btn.style.setProperty('--dc',deck.color);
    const dot=document.createElement('span');dot.className='ddot';dot.style.background=deck.color;
    const lbl=document.createElement('span');lbl.textContent=deck.name;
    const ct=document.createElement('span');ct.className='dct';const wc=Object.keys(deck.words).length;if(wc>0)ct.textContent=wc;
    btn.appendChild(dot);btn.appendChild(lbl);btn.appendChild(ct);
    btn.onclick=()=>{activeDeckIdx=i===activeDeckIdx?-1:i;saveDeckState();renderDeckSwitcher();renderDeckChips();renderWordGrid();};
    btn.oncontextmenu=e=>showDeckCtxMenu(e,i); sw.appendChild(btn);
  });}
  const add=document.createElement('button');add.className='dbtn';add.style.cssText='--dc:#7ac8a0;color:#7ac8a0;border-color:rgba(122,200,160,.3)';add.textContent='+ new deck';
  add.onclick=()=>{const n=prompt('Name your new deck:','');if(n?.trim()){addDeck(n.trim());renderDeckSwitcher();renderDeckChips();renderWordGrid();}};sw.appendChild(add);
  const pk={korean:['korean'],italian:['italian'],japanese:['japanese_hiragana','japanese_katakana','japanese_kanji','japanese_dakuten','japanese_yofukashi','japanese_kawaikute']};
  if(pk[curLang]){const pb=document.createElement('button');pb.className='dbtn';pb.style.cssText='color:var(--acc);border-color:var(--acc-bd)';pb.textContent=curLang==='japanese'?'★ alphabet + accent decks':'★ starter decks';pb.onclick=()=>{if(curLang==='japanese')addPremadeDeckJapaneseAll();else pk[curLang].forEach(k=>addPremadeDeck(k));};sw.appendChild(pb);}
  const badge=document.getElementById('deckBadge');if(badge)badge.textContent=activeDeckIdx>=0?Object.keys(decks[activeDeckIdx]?.words||{}).length:'0';
  const srsWrap=document.createElement('div');srsWrap.style.cssText='display:flex;gap:8px;margin-top:6px;align-items:center;flex-wrap:wrap';
  const smb=document.createElement('button');smb.id='srsModeBtn';smb.className='abtn'+(srsMode?' accent':'');smb.textContent=srsMode?'smart review: on':'smart review: off';smb.onclick=toggleSRSMode;srsWrap.appendChild(smb);
  if(srsMode&&activeDeckIdx>=0&&activeDeckIdx<decks.length){const due=cardsDueToday(activeDeckIdx);const rb=document.createElement('button');rb.className='abtn accent';rb.textContent=due>0?'review ('+due+' due) →':'review (0 due)';rb.onclick=openReview;if(due===0)rb.style.opacity='0.5';srsWrap.appendChild(rb);}
  sw.appendChild(srsWrap);
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
let studyList=[],sIdx=0,sFlip=false,studyTypingMode=false;

function openStudy(){
  if(activeDeckIdx<0||activeDeckIdx>=decks.length){alert('Select a deck first.');return;}
  const keys=Object.keys(decks[activeDeckIdx].words);
  if(keys.length===0){alert(decks[activeDeckIdx].name+' has no words yet.');return;}
  studyList=shuffle(keys.map(kr=>LANGS[curLang].words.find(w=>w.kr===kr)).filter(Boolean));
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
  const front=document.getElementById('cFront'),back=document.getElementById('cBack'),fcard=document.getElementById('fcard');
  if(!front||!back) return;
  if(fcard){fcard.style.transition='none';fcard.classList.remove('flip');void fcard.offsetWidth;fcard.style.transition='';}
  const roHtml=showRomanization?`<div class="fc-ro">${w.ro}</div>`:'';
  front.innerHTML=`<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-kr">${w.kr}</div>${roHtml}<div class="fc-pos">${w.pos}</div>${w.register&&w.register!=='neutral'?`<div class="fc-reg" style="color:${{formal:'#7a8cc8',casual:'#c8a87a'}[w.register]}">${w.register}</div>`:''}`;
  if(studyTypingMode){
    back.innerHTML=`<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-meaning" style="font-size:.9rem;margin-bottom:8px">what does this mean?</div>`;
    const inp=document.createElement('input');inp.type='text';inp.placeholder='type the meaning...';inp.style.cssText='width:85%;padding:8px 12px;border-radius:6px;border:1px solid var(--bd2);background:var(--sf);color:var(--tx);font-family:DM Mono,monospace;font-size:.85rem;text-align:center;outline:none';inp.onfocus=()=>inp.style.borderColor='var(--acc)';
    const checkBtn=document.createElement('button');checkBtn.className='abtn accent';checkBtn.style.cssText='margin-top:8px;font-size:.78rem';checkBtn.textContent='check →';
    const result=document.createElement('div');result.style.cssText='margin-top:8px;font-size:.78rem;min-height:20px';
    checkBtn.onclick=()=>{const val=inp.value.trim().toLowerCase();const target=w.meaning.toLowerCase().split('/')[0].trim().split('(')[0].trim();const correct=val.includes(target)||(target.includes(val)&&val.length>2);result.style.color=correct?'#7ac8a0':'#c87a7a';result.textContent=correct?'✓ correct — '+w.meaning:'✗ '+w.meaning;inp.disabled=true;checkBtn.disabled=true;};
    back.appendChild(inp);back.appendChild(checkBtn);back.appendChild(result);inp.onkeydown=e=>{if(e.key==='Enter')checkBtn.click();};
  } else {
    back.innerHTML=`<button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button><div class="fc-meaning">${w.meaning}</div><div class="fc-ex">${w.example}</div>`;
  }
  sFlip=false;
  const ab=document.getElementById('againBtn'),gb=document.getElementById('goodBtn'),sh=document.getElementById('srsHint');
  if(ab)ab.style.display='none';if(gb)gb.style.display='none';if(sh)sh.style.display='block';
  // update toggle buttons in normal controls
  const tmBtn=document.getElementById('typingModeBtn');
  if(tmBtn){tmBtn.textContent=studyTypingMode?'✎ typing: on':'✎ typing: off';tmBtn.className='abtn'+(studyTypingMode?' accent':'');}
  const roToggle=document.getElementById('studyRoBtn');
  if(roToggle)roToggle.textContent=showRomanization?'hide romaji':'show romaji';
}
function toggleStudyTypingMode(){studyTypingMode=!studyTypingMode;renderStudyCard();}
function toggleStudyRo(){showRomanization=!showRomanization;localStorage.setItem('lf-show-ro',showRomanization?'true':'false');renderStudyCard();const b=document.getElementById('roBtn');if(b){b.textContent=showRomanization?'hide romaji':'show romaji';}}
function flipCard(){
  sFlip=!sFlip;document.getElementById('fcard')?.classList.toggle('flip',sFlip);
  if(sFlip){
    if(studyTypingMode){const inp=document.querySelector('#cBack input');if(inp)setTimeout(()=>inp.focus(),500);}
    if(document.getElementById('srsControls')?.style.display!=='none'){
      const ab=document.getElementById('againBtn'),gb=document.getElementById('goodBtn'),sh=document.getElementById('srsHint');
      if(ab)ab.style.display='block';
      if(gb){const w=studyList[sIdx];if(w){const c=getCard(activeDeckIdx,w.kr);const ni=c.reps===0?1:c.reps===1?3:Math.round(c.interval*c.ease);gb.textContent='✓ good · '+(ni===1?'1 day':ni+' days');}gb.style.display='block';}
      if(sh)sh.style.display='none';
    }
  }
}
function nextCard(){sIdx++;if(sIdx>=studyList.length){const last=studyList[studyList.length-1];studyList=shuffle(studyList);if(studyList[0]?.kr===last?.kr&&studyList.length>1)[studyList[0],studyList[1]]=[studyList[1],studyList[0]];sIdx=0;}renderStudyCard();}
function reshuffleStudy(){const cur=studyList[sIdx];studyList=shuffle(studyList);if(studyList[0]?.kr===cur?.kr&&studyList.length>1)[studyList[0],studyList[1]]=[studyList[1],studyList[0]];sIdx=0;renderStudyCard();}
document.addEventListener('keydown',e=>{
  if(!document.getElementById('studyOverlay')?.classList.contains('open')) return;
  if(e.key==='Escape')closeStudy();
  if(e.key==='ArrowRight'&&!studyTypingMode)nextCard();
  if(e.key===' '&&!studyTypingMode){e.preventDefault();flipCard();}
});

// ── SRS SYSTEM ────────────────────────────────────────────────────────────────
let srsMode=localStorage.getItem('lf-srs-mode')==='true';
let srsData={};
try{srsData=JSON.parse(localStorage.getItem('lf-srs-data')||'{}');}catch(e){srsData={};}
function saveSRS(){localStorage.setItem('lf-srs-data',JSON.stringify(srsData));}
function srsKey(deckIdx,kr){const deck=decks[deckIdx];return(deck?deck.name:'deck')+':'+kr;}
function getCard(deckIdx,kr){const k=srsKey(deckIdx,kr);if(!srsData[k])srsData[k]={interval:1,due:0,ease:2.5,reps:0};return srsData[k];}
function cardsDueToday(deckIdx){if(deckIdx<0||deckIdx>=decks.length)return 0;const now=Date.now();return Object.keys(decks[deckIdx].words).filter(kr=>getCard(deckIdx,kr).due<=now).length;}
function reviewAnswer(kr,good){const k=srsKey(activeDeckIdx,kr);if(!srsData[k])srsData[k]={interval:1,due:0,ease:2.5,reps:0};const c=srsData[k];if(good){c.reps++;c.interval=c.reps===1?1:c.reps===2?3:Math.round(c.interval*c.ease);c.ease=Math.max(1.3,c.ease+0.1);c.due=Date.now()+c.interval*86400000;}else{c.reps=0;c.interval=1;c.ease=Math.max(1.3,c.ease-0.2);c.due=Date.now();}saveSRS();}
function toggleSRSMode(){srsMode=!srsMode;localStorage.setItem('lf-srs-mode',srsMode?'true':'false');renderDeckSwitcher();}
function openReview(){
  if(activeDeckIdx<0||activeDeckIdx>=decks.length){showToast('Select a deck first.');return;}
  const now=Date.now();const dueKeys=Object.keys(decks[activeDeckIdx].words).filter(kr=>getCard(activeDeckIdx,kr).due<=now);
  if(dueKeys.length===0){showToast('No cards due for review!');return;}
  studyList=shuffle(dueKeys.map(kr=>LANGS[curLang].words.find(w=>w.kr===kr)).filter(Boolean));sIdx=0;sFlip=false;
  renderStudyCard();document.getElementById('studyOverlay')?.classList.add('open');
  document.getElementById('srsControls').style.display='flex';document.getElementById('normalControls').style.display='none';
  document.getElementById('mMeta').textContent=dueKeys.length+' cards due today';
  const ab=document.getElementById('againBtn'),gb=document.getElementById('goodBtn'),sh=document.getElementById('srsHint');
  if(ab)ab.style.display='none';if(gb)gb.style.display='none';if(sh)sh.style.display='block';
  updateStreak();
}
function srsGood(){const w=studyList[sIdx];if(w)reviewAnswer(w.kr,true);srsNextCard();}
function srsAgain(){const w=studyList[sIdx];if(w){reviewAnswer(w.kr,false);studyList.push(w);}srsNextCard();}
function srsNextCard(){sIdx++;const now=Date.now();while(sIdx<studyList.length){const w=studyList[sIdx];const c=getCard(activeDeckIdx,w.kr);if(c.due<=now||c.reps===0)break;sIdx++;}if(sIdx>=studyList.length){showToast('Review complete!');closeStudy();renderDeckSwitcher();return;}sFlip=false;renderStudyCard();}

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
    song.words.forEach(w=>{
      const wordObj=LANGS[curLang]?.words.find(x=>x.kr===w.kr);const inDeck=wordObj&&deckColorFor(w.kr);
      const row=document.createElement('div');row.className='song-word-row';if(inDeck)row.style.borderColor=song.color;
      const rowHdr=document.createElement('div');rowHdr.style.cssText='display:flex;align-items:center;gap:10px;padding:.6rem .9rem;cursor:pointer';
      const kj=document.createElement('span');kj.style.cssText=`font-family:'Noto Sans KR',sans-serif;font-size:1.6rem;font-weight:500;color:${inDeck?song.color:'var(--tx)'};min-width:2.2rem;text-align:center;flex-shrink:0`;kj.textContent=w.kr;
      const wi=document.createElement('div');wi.style.flex='1';wi.innerHTML=`<div style="font-size:.65rem;color:var(--acc)">${w.ro}</div><div style="font-size:.78rem;color:var(--tx)">${w.meaning}</div><div style="font-size:.65rem;color:var(--mu);font-style:italic">${w.lyric} — ${w.lyricRo}</div>`;
      const right=document.createElement('div');right.style.cssText='display:flex;align-items:center;gap:6px;flex-shrink:0';
      if(w.crush){const b=document.createElement('span');b.style.cssText='font-size:.55rem;padding:2px 7px;border-radius:99px;border:1px solid rgba(200,168,122,.4);color:var(--acc)';b.textContent='sounds different sung';right.appendChild(b);}
      const spk=document.createElement('button');spk.className='ubtn';spk.textContent='▶';spk.onclick=e=>{e.stopPropagation();speak(w.kr,'japanese');};right.appendChild(spk);
      const addBtn=document.createElement('button');addBtn.className='abtn'+(inDeck?' accent':'');if(inDeck)addBtn.style.cssText=`background:${song.color};border-color:${song.color}`;addBtn.textContent=inDeck?'✓ in deck':'+ deck';addBtn.onclick=e=>{e.stopPropagation();if(wordObj){toggleWordInDeck(wordObj);renderSongs(container);}};right.appendChild(addBtn);
      const rc=document.createElement('span');rc.style.cssText='font-size:.55rem;color:var(--su)';rc.textContent='▾';right.appendChild(rc);
      rowHdr.appendChild(kj);rowHdr.appendChild(wi);rowHdr.appendChild(right);
      const noteEl=document.createElement('div');noteEl.className='song-note-body';
      if(w.note){const p=document.createElement('p');p.style.cssText='font-size:.72rem;color:var(--mu);line-height:1.7';p.textContent=w.note;noteEl.appendChild(p);}
      let noteOpen=false;rowHdr.onclick=()=>{noteOpen=!noteOpen;noteEl.style.display=noteOpen?'block':'none';rc.textContent=noteOpen?'▴':'▾';};
      row.appendChild(rowHdr);row.appendChild(noteEl);grid.appendChild(row);
    });
    body.appendChild(grid);songCard.appendChild(body);
    let isOpen=false;titleBar.onclick=e=>{if(addAll.contains(e.target))return;isOpen=!isOpen;body.style.display=isOpen?'block':'none';chev.textContent=isOpen?'▴':'▾';};
    wrap.appendChild(songCard);
  });
  container.appendChild(wrap);
}
function addSongToDeck(song,container){
  if(activeDeckIdx<0||activeDeckIdx>=decks.length){const n=prompt('Name for new deck:',song.title);if(!n||!n.trim())return;addDeck(n.trim());decks[decks.length-1].color=song.color;}
  const idx=activeDeckIdx>=0?activeDeckIdx:decks.length-1;let added=0;
  song.words.forEach(w=>{const word=LANGS[curLang]?.words.find(x=>x.kr===w.kr);if(word){decks[idx].words[w.kr]=true;added++;}});
  saveDeckState();checkAchievements();showToast('Added '+added+' words to "'+decks[idx].name+'"');renderSongs(container);
}

// ── MEDALS TAB ────────────────────────────────────────────────────────────────
function renderMedals(container){
  container.innerHTML='';
  const wrap=document.createElement('div');wrap.style.cssText='padding:1.5rem 2rem';
  const streak=getStreak(),unlocked=getUnlocked();
  const sc=document.createElement('div');sc.style.cssText='border:1px solid var(--acc-bd);border-radius:12px;padding:1.2rem 1.5rem;background:var(--acc-bg);display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem;flex-wrap:wrap';
  sc.innerHTML=`<div style="text-align:center;flex-shrink:0"><div style="font-size:2.5rem">🔥</div><div style="font-size:2rem;font-weight:500;color:var(--acc);font-family:'DM Serif Display',serif">${streak.count}</div><div style="font-size:.65rem;color:var(--mu);letter-spacing:.08em;text-transform:uppercase">day streak</div></div><div style="flex:1;min-width:160px"><div style="font-size:.78rem;color:var(--tx);margin-bottom:4px">keep it going — study every day to grow your streak.</div>${streak.shield>0?`<div style="font-size:.72rem;color:#7a8cc8;margin-top:6px">🛡️ you have ${streak.shield} streak shield${streak.shield>1?'s':''} — your streak is protected if you miss a day.</div>`:''}${streak.count>=6&&streak.shield===0?'<div style="font-size:.72rem;color:var(--mu);margin-top:6px">reach 7 days to earn a streak shield.</div>':''}</div>`;
  wrap.appendChild(sc);
  const gt=document.createElement('div');gt.style.cssText='font-family:"DM Serif Display",serif;font-size:1.2rem;color:var(--tx);margin-bottom:.85rem';gt.textContent='achievements';wrap.appendChild(gt);
  const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px';
  ACHIEVEMENTS.forEach(a=>{
    const done=unlocked.includes(a.id);
    const card=document.createElement('div');card.style.cssText=`border:1px solid ${done?a.color+'60':'var(--bd)'};border-radius:10px;padding:.9rem 1rem;background:${done?a.color+'10':'var(--sf)'};display:flex;gap:12px;align-items:flex-start;opacity:${done?'1':'.45'};transition:opacity .2s`;
    card.innerHTML=`<span style="font-size:1.6rem;flex-shrink:0;line-height:1">${a.icon}</span><div style="min-width:0"><div style="font-size:.78rem;font-weight:500;color:${done?a.color:'var(--tx)'};margin-bottom:2px">${a.name}</div><div style="font-size:.65rem;color:var(--mu);line-height:1.5">${a.desc}</div>${done?`<div style="font-size:.6rem;color:${a.color};margin-top:4px;letter-spacing:.06em">✓ unlocked</div>`:''}</div>`;
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
      {title:'Learn Hangul',desc:'Korean uses its own alphabet — 14 consonants and 10 vowels that combine into syllable blocks. Most people can learn to read it in 1–3 days.',tip:'Start with the 5 basic consonants: ㄱ ㄴ ㄷ ㄹ ㅁ. Each shape reflects where in your mouth the sound is made.'},
      {title:'Learn greetings and basics',desc:'Your first 10 words: hello, thank you, sorry, yes, no, okay, I, you, this, that.',actionLabel:'open meeting phrases →',action:()=>{activeSituation='meeting';buildSitPills();switchTab('vocab');}},
      {title:'Understand SOV word order',desc:'Korean sentences end with the verb. "I rice eat" not "I eat rice." The verb always goes last.',actionLabel:'read grammar note →',action:()=>switchTab('grammar'),tip:'The only rule you really need at first: whatever the action is, it goes at the end.'},
      {title:'Learn the core particles',desc:'은/는, 이/가, 을/를 mark topic, subject, and object.',actionLabel:'practice particles →',action:()=>{practiceFilter='particle';switchTab('practice');},tip:"Don't stress 은/는 vs 이/가 at first — just get used to seeing them."},
    ]},
    {stage:2,label:'building blocks',color:'#c8a87a',milestones:[
      {title:'Learn the 30 most common words',desc:'Frequency matters more than breadth at this stage.',actionLabel:'sort by most common →',action:()=>{curGrouping='most_common';save('lf-grouping','most_common');switchTab('vocab');},tip:'나, 너, 우리, 뭐, 왜, 어디, 좋아, 있다, 없다, 알다 — these ten alone go a very long way.'},
      {title:'Learn present tense conjugation',desc:'Polite present: verb stem + 아요/어요. Casual: just the stem.',actionLabel:'practice conjugation →',action:()=>{practiceFilter='conjugate';switchTab('practice');},tip:'Vowel harmony sounds complex but quickly becomes automatic.'},
      {title:'Add a survival deck',desc:'Restaurant, transport, emergency phrases.',actionLabel:'add starter decks →',action:()=>addPremadeDeck('korean'),tip:'화장실이 어디예요? might be the single most useful sentence you learn.'},
    ]},
    {stage:3,label:'conversational',color:'#7a8cc8',milestones:[
      {title:'Learn past and future tense',desc:'Past: add 았어요/었어요. Future: add ㄹ/을 거예요.',actionLabel:'review grammar →',action:()=>switchTab('grammar'),tip:'갔어요, 먹었어요, 할 거예요 — three patterns that unlock a huge amount.'},
      {title:'Master formality levels',desc:'반말 (casual) for friends, 존댓말 (polite) for strangers.',actionLabel:'practice formality drills →',action:()=>{practiceFilter='formal_casual';switchTab('practice');}},
      {title:'Try the assisted reading tool',desc:'Paste a sentence from a Korean song, drama, or text.',actionLabel:'go to reading tool ↓',action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'}),tip:"K-pop lyrics are great for this."},
    ]},
    {stage:4,label:'intermediate',color:'#c87aa8',milestones:[
      {title:'Read 50 words without romanization',desc:'Turn off romanization and challenge yourself to read cards without it.',actionLabel:'toggle romanization →',action:()=>{if(showRomanization)toggleRomanization();switchTab('vocab');},tip:'Cover the romanization and use the speak button if you get stuck.'},
      {title:'Learn connecting expressions',desc:'그리고 (and), 그런데 (but), 왜냐하면 (because), 그래서 (so).',tip:'In casual speech: 근데 for 그런데, 왜냐면 for 왜냐하면.'},
    ]},
  ],
  italian:[
    {stage:1,label:'foundations',color:'#7ac8a0',milestones:[
      {title:'Learn the 8 essential irregular verbs',desc:'essere, avere, fare, andare, venire, volere, potere, dovere.',actionLabel:'browse verbs →',action:()=>{curGrouping='pos';save('lf-grouping','pos');switchTab('vocab');}},
      {title:'Understand essere vs avere',desc:"Italian uses 'have' where English uses 'be' for states. Ho fame = I'm hungry.",actionLabel:'read grammar note →',action:()=>switchTab('grammar'),tip:'States: ho fame, ho sete, ho freddo, ho caldo, ho sonno, ho fretta, ho paura.'},
      {title:'Learn greetings and salve',desc:'Ciao is casual-only. Salve is the safe neutral option for strangers.',actionLabel:'open meeting phrases →',action:()=>{activeSituation='meeting';buildSitPills();switchTab('vocab');}},
    ]},
    {stage:2,label:'building blocks',color:'#c8a87a',milestones:[
      {title:'Learn -ARE verb conjugation',desc:'Most Italian verbs are -ARE. Endings: io -o, tu -i, lui/lei -a, noi -iamo.',actionLabel:'practice conjugation →',action:()=>{practiceFilter='conjugate';switchTab('practice');},tip:'The subject pronoun is usually dropped — the verb ending tells you who is speaking.'},
      {title:'Understand adjective agreement',desc:'Adjectives must match the noun in gender and number.',actionLabel:'read grammar note →',action:()=>switchTab('grammar')},
      {title:'Understand piacere',desc:'Mi piace = "it pleases me." The thing you like is the subject, not you.',tip:'Mi piace la musica (singular) vs mi piacciono i film (plural).'},
    ]},
    {stage:3,label:'conversational',color:'#7a8cc8',milestones:[
      {title:'Learn the passato prossimo',desc:'The most common past tense: avere/essere + past participle.',actionLabel:'practice →',action:()=>{practiceFilter='conjugate';switchTab('practice');},tip:'essere verbs: andare, venire, arrivare, partire, nascere, morire, restare, diventare.'},
      {title:'Master tu vs Lei',desc:'Tu for friends. Lei (formal) for strangers and older people.',actionLabel:'practice formality drills →',action:()=>{practiceFilter='formal_casual';switchTab('practice');},tip:'When in doubt, use Lei. Let the other person initiate switching to tu.'},
      {title:'Try the assisted reading tool',desc:'Paste an Italian sentence from a song or article.',actionLabel:'go to reading tool ↓',action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'})},
    ]},
  ],
  japanese:[
    {stage:1,label:'the writing systems',color:'#7ac8a0',milestones:[
      {title:'Learn hiragana (46 characters)',desc:'Every Japanese sound has a hiragana symbol. Foundation for everything — learn all 46 in 1–2 weeks.',actionLabel:'add hiragana deck →',action:()=>{addPremadeDeck('japanese_hiragana');switchTab('vocab');},tip:'Learn あいうえお first, then the k-sounds (か き く け こ), s-sounds (さ し す せ そ), and t-sounds (た ち つ て と) in order.'},
      {title:'Learn katakana (46 characters)',desc:'Same sounds, angular shapes. Used for foreign loanwords.',actionLabel:'add katakana deck →',action:()=>{addPremadeDeck('japanese_katakana');switchTab('vocab');},tip:'ラーメン, テレビ, コーヒー — once you know katakana you can read a huge chunk of modern Japanese.'},
      {title:'Learn the accent marks (dakuten)',desc:'Adding ゛changes the consonant: か → が. 25 new sounds from one mark.',actionLabel:'add accent decks →',action:()=>{addPremadeDeck('japanese_dakuten');switchTab('vocab');}},
    ]},
    {stage:2,label:'core sentences',color:'#c8a87a',milestones:[
      {title:'Learn X は Y です',desc:'The backbone sentence: topic + は + description + です.',actionLabel:'read grammar note →',action:()=>switchTab('grammar'),tip:"は is written as ha but read as wa when it's the topic marker."},
      {title:'Learn the 8 core particles',desc:'は が を に で の も か — these mark grammatical roles.',actionLabel:'practice particles →',action:()=>{practiceFilter='particle';switchTab('practice');},tip:'に and で are hardest. に = direction (go TO school), で = action location (study AT the library).'},
      {title:'Learn ます form verbs',desc:'The polite present tense. たべます (eat), いきます (go).',actionLabel:'practice verb forms →',action:()=>{practiceFilter='conjugate';switchTab('practice');},tip:'Japanese is SOV — the verb always comes at the end. Every sentence.'},
    ]},
    {stage:3,label:'vocabulary depth',color:'#7a8cc8',milestones:[
      {title:'Learn 50 essential words',desc:'Once you can read both alphabets, vocabulary is what matters most.',actionLabel:'browse vocabulary →',action:()=>{activeScripts.clear();updateScriptBtns();curGrouping='most_common';save('lf-grouping','most_common');switchTab('vocab');},tip:'すみません, ありがとう, わかりません, どこ, いくら — five words that get you far in Japan.'},
      {title:'Explore a song vocabulary deck',desc:'Songs like よふかしのうた use high-frequency kanji in emotional context.',actionLabel:'open songs tab →',action:()=>switchTab('songs')},
    ]},
    {stage:4,label:'kanji and reading',color:'#c87aa8',milestones:[
      {title:'Start learning kanji',desc:'There are 2,136 standard kanji. 300–500 covers most everyday contexts.',actionLabel:'add kanji deck →',action:()=>{addPremadeDeck('japanese_kanji');switchTab('vocab');},tip:'Each kanji has multiple readings. Start with the most common in context.'},
      {title:'Try the assisted reading tool',desc:'Paste any Japanese sentence. The tool segments it and lets you tap each word.',actionLabel:'go to reading tool ↓',action:()=>document.getElementById('readingSection')?.scrollIntoView({behavior:'smooth'}),tip:'Japanese has no spaces between words — the tool uses the vocabulary list to find boundaries.'},
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
    const span=document.createElement('span');span.className='reading-token'+(inDeck?' in-deck':'');if(!hasEntry)span.style.borderColor='transparent';
    const te=document.createElement('span');te.className='reading-token-text';te.style.cssText=`font-size:${curLang==='japanese'?'1.3rem':'1.1rem'};color:${inDeck?'var(--acc)':hasEntry?'var(--tx)':'var(--su)'}`;te.textContent=token.text;span.appendChild(te);
    if(hasEntry&&vw.ro&&showRomanization){const ro=document.createElement('span');ro.className='reading-token-ro';ro.textContent=vw.ro;span.appendChild(ro);}
    if(hasEntry){span.style.cursor='pointer';span.onclick=()=>showReadingWordCard(container,vw);}
    tw.appendChild(span);
  });
  out.appendChild(tw);
  const known=tokens.filter(t=>!t.isPunct&&(LANGS[curLang].words.find(w=>w.kr===t.text)||t.word)).length,total=tokens.filter(t=>!t.isPunct).length;
  if(total>0){const stats=document.createElement('div');stats.className='reading-stats';stats.innerHTML=`<span>${total} word${total!==1?'s':''}</span><span style="color:var(--acc)">${known} in vocabulary</span><span>${total-known} unknown</span>`;out.appendChild(stats);}
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
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
(function boot(){
  decks=load('lf-decks',[]);activeDeckIdx=load('lf-activeDeck',-1);curGrouping=load('lf-grouping','pos');
  if(!GROUPINGS[curGrouping])curGrouping='pos';if(activeDeckIdx>=decks.length)activeDeckIdx=-1;
  if(curLang!=='japanese'&&(curGrouping==='fewest_strokes'||curGrouping==='script'))curGrouping='pos';
  document.body.className=theme;applyFontSize(fontSize);
  document.getElementById('themeBtn').textContent=theme==='dark'?'light mode':'dark mode';
  const L=LANGS[curLang];document.getElementById('langFlag').textContent=L.flag;document.getElementById('langLabel').textContent=L.label;
  document.querySelectorAll('.lang-option').forEach(el=>el.classList.toggle('active',el.dataset.lang===curLang));
  showScriptFilters(curLang==='japanese');
  if(!document.querySelector('[data-tab="medals"]')){
    const tb=document.getElementById('tabBar');const mb=document.createElement('button');mb.className='tab-btn';mb.dataset.tab='medals';mb.textContent='medals';mb.onclick=()=>switchTab('medals');
    tb.insertBefore(mb,document.getElementById('fontBtn'));
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
