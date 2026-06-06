// ── VOCABULARY TAB ────────────────────────────────────────────────────────────

// Deck state — initialized in vocabInit() after all scripts load
let decks        = [];
let activeDeckIdx = -1;

function vocabInit() {
  decks         = load('lf-decks', []);
  activeDeckIdx = load('lf-activeDeck', -1);
  if (activeDeckIdx >= decks.length) activeDeckIdx = -1;
  curGrouping   = load('lf-grouping', 'pos');
}

let openSecs = {};

const POS_ORDER = ['expression','verb','adjective','noun','adverb','pronoun','particle'];
const PALETTE   = ['#c8a87a','#7ac8a0','#7a8cc8','#c87aa8','#7ac8c8','#c8c87a','#c87a7a','#a87ac8'];

const GROUPINGS = {
  pos: {
    label:'part of speech',
    key: w => w.pos,
    order: () => POS_ORDER,
    color: k => ({verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'}[k]||'#888')
  },
  register: {
    label:'formality',
    key: w => w.register || 'neutral',
    order: () => ['formal','neutral','casual'],
    color: k => ({formal:'#7a8cc8',neutral:'#7ac8a0',casual:'#c8a87a'}[k]||'#888')
  },
  most_common: {
    label:'most common first',
    key: w => w.freq>=10?'essential':w.freq>=8?'very common':w.freq>=6?'common':w.freq>=4?'uncommon':'rare',
    order: () => ['essential','very common','common','uncommon','rare'],
    color: () => '#7ac8a0'
  },
  least_common: {
    label:'least common first',
    key: w => w.freq>=10?'essential':w.freq>=8?'very common':w.freq>=6?'common':w.freq>=4?'uncommon':'rare',
    order: () => ['rare','uncommon','common','very common','essential'],
    color: () => '#c87a7a'
  },
  shortest: {
    label:'shortest first',
    key: w => { const l=w.kr.length; return l<=1?'1 char':l<=2?'2 chars':l<=3?'3 chars':l<=4?'4 chars':'5+ chars'; },
    order: () => ['1 char','2 chars','3 chars','4 chars','5+ chars'],
    color: () => '#7ac8c8'
  },
  longest: {
    label:'longest first',
    key: w => { const l=w.kr.length; return l<=1?'1 char':l<=2?'2 chars':l<=3?'3 chars':l<=4?'4 chars':'5+ chars'; },
    order: () => ['5+ chars','4 chars','3 chars','2 chars','1 char'],
    color: () => '#c87aa8'
  },
  a_z: {
    label:'a → z',
    key: w => w.ro[0].toUpperCase(),
    order: keys => keys.slice().sort(),
    color: () => '#7a8cc8'
  },
  in_deck: {
    label:'in my deck',
    key: w => deckColorFor(w.kr) ? 'in a deck' : 'not in deck',
    order: () => ['in a deck','not in deck'],
    color: k => k==='in a deck' ? '#c8a87a' : '#888'
  }
};

let curGrouping = 'pos';

// Deck helpers
function deckColorFor(kr) {
  for (let i=0;i<decks.length;i++) { if (decks[i].words[kr]) return decks[i].color; }
  return null;
}
function deckIdxFor(kr) {
  for (let i=0;i<decks.length;i++) { if (decks[i].words[kr]) return i; }
  return -1;
}
function nextDeckColor() {
  const used = decks.map(d=>d.color);
  for (let c of PALETTE) { if (!used.includes(c)) return c; }
  return PALETTE[decks.length % PALETTE.length];
}
function addDeck(name) {
  decks.push({name, color:nextDeckColor(), words:{}});
  activeDeckIdx = decks.length - 1;
  saveDeckState();
}
function deleteDeck(idx) {
  decks.splice(idx,1);
  if (activeDeckIdx >= decks.length) activeDeckIdx = decks.length - 1;
  saveDeckState();
}
function saveDeckState() {
  save('lf-decks', decks);
  save('lf-activeDeck', activeDeckIdx);
}

// ── RENDER VOCAB TAB ──────────────────────────────────────────────────────────
function renderVocab(container) {
  const words = LANGS[curLang].words;

  container.innerHTML = `
    <div class="ctrl">
      <div class="ctrl-row">
        <input id="searchInput" type="text" placeholder="${LANGS[curLang].placeholder}" />
        <div id="groupBar"></div>
      </div>
      <div class="ctrl-row ctrl-row2">
        <button class="ubtn" onclick="vocabExpandAll()">expand all</button>
        <button class="ubtn" onclick="vocabCollapseAll()">collapse all</button>
      </div>
    </div>
    <div id="wordSections"></div>
    <div id="deckPanel" class="deck-panel surface">
      <div class="deck-hdr">
        <span class="deck-title">your deck</span>
        <div class="deck-acts">
          <button class="abtn danger" onclick="clearActiveDeck()">remove all</button>
          <button class="abtn accent" onclick="openStudy()">study deck →</button>
        </div>
      </div>
      <div id="deckSwitcher" class="deck-switcher"></div>
      <div id="deckChips"></div>
    </div>
  `;

  document.getElementById('searchInput').oninput = renderWordGrid;
  buildGroupBtns();
  renderWordGrid();
  renderDeckSwitcher();
  renderDeckChips();
}

function buildGroupBtns() {
  const bar = document.getElementById('groupBar');
  if (!bar) return;
  bar.innerHTML = '';
  Object.entries(GROUPINGS).forEach(([key, cfg]) => {
    const btn = document.createElement('button');
    btn.className = 'gbtn' + (key === curGrouping ? ' on' : '');
    btn.textContent = cfg.label;
    btn.onclick = () => { curGrouping = key; save('lf-grouping', key); openSecs = {}; buildGroupBtns(); renderWordGrid(); };
    bar.appendChild(btn);
  });
}

function renderWordGrid() {
  const container = document.getElementById('wordSections');
  if (!container) return;

  const search = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const cfg = GROUPINGS[curGrouping];
  const words = LANGS[curLang].words;

  let filtered = words.filter(w =>
    !search ||
    w.kr.includes(search) ||
    w.ro.toLowerCase().includes(search) ||
    w.meaning.toLowerCase().includes(search)
  );

  const groups = {};
  filtered.forEach(w => { const k = cfg.key(w); if (!groups[k]) groups[k]=[]; groups[k].push(w); });
  const allKeys = Object.keys(groups);
  const ordered = cfg.order(allKeys).filter(k => groups[k]?.length > 0);
  if (search) ordered.forEach(k => openSecs[k] = true);

  container.innerHTML = '';
  if (ordered.length === 0) { container.innerHTML = '<div class="empty-msg">no words match</div>'; return; }

  ordered.forEach(key => {
    const wds = groups[key];
    const isOpen = !!openSecs[key];
    const color = cfg.color(key);
    const selCount = wds.filter(w => deckColorFor(w.kr)).length;

    const sec = document.createElement('div'); sec.className = 'sec';
    const hdr = document.createElement('div'); hdr.className = 'sec-hdr';

    const left = document.createElement('div'); left.className = 'sec-left';
    const nm = document.createElement('span'); nm.className = 'sec-name'; nm.style.color = color; nm.textContent = key;
    const ct = document.createElement('span'); ct.className = 'sec-count'; ct.textContent = wds.length;
    left.appendChild(nm); left.appendChild(ct);
    if (selCount) { const sl = document.createElement('span'); sl.className = 'sec-sel'; sl.textContent = selCount+' in deck'; left.appendChild(sl); }

    const chev = document.createElement('span'); chev.className = 'sec-chev'; chev.textContent = isOpen ? '▴' : '▾';
    hdr.appendChild(left); hdr.appendChild(chev);

    const body = document.createElement('div'); body.className = 'sec-body'; body.style.display = isOpen ? 'flex' : 'none';

    wds.forEach((w, i) => {
      const chip = document.createElement('div');
      const chipColor = deckColorFor(w.kr);
      chip.className = 'chip' + (chipColor ? ' on' : '');
      if (chipColor) chip.style.borderColor = chipColor;
      chip.style.animationDelay = Math.min(i * 0.008, 0.2) + 's';
      chip.title = `${w.meaning} — ${w.example}`;

      // register badge
      const regColor = {formal:'#7a8cc8',casual:'#c8a87a',neutral:'transparent'}[w.register||'neutral'];

      chip.innerHTML = `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px">
          <span class="chip-kr" style="${chipColor?'color:'+chipColor:''}">${w.kr}</span>
          ${w.register && w.register !== 'neutral' ? `<span class="reg-badge" style="background:${regColor}20;color:${regColor};border-color:${regColor}40">${w.register}</span>` : ''}
        </div>
        <span class="chip-ro">${w.ro}</span>
      `;

      // left click = add to active deck
      chip.onclick = () => toggleWordInDeck(w);
      // right click = deck context menu
      chip.oncontextmenu = e => showWordCtxMenu(e, w);
      // middle click or speak button = listen
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

    sec.appendChild(hdr); sec.appendChild(body);
    container.appendChild(sec);
  });
}

function vocabExpandAll() {
  const words = LANGS[curLang].words;
  words.forEach(w => openSecs[GROUPINGS[curGrouping].key(w)] = true);
  renderWordGrid();
}
function vocabCollapseAll() { openSecs = {}; renderWordGrid(); }

// Deck operations
function toggleWordInDeck(w) {
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
    // flash hint
    const panel = document.getElementById('deckPanel');
    if (panel) { panel.style.outline = '2px solid var(--acc)'; setTimeout(()=>panel.style.outline='',800); }
    return;
  }
  const d = decks[activeDeckIdx].words;
  if (d[w.kr]) delete d[w.kr]; else d[w.kr] = true;
  saveDeckState();
  animateBadge();
  renderDeckChips();
  renderWordGrid();
}

function animateBadge() {
  const b = document.getElementById('deckBadge');
  if (!b) return;
  b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  setTimeout(() => b.classList.remove('pop'), 200);
}

function renderDeckSwitcher() {
  const sw = document.getElementById('deckSwitcher');
  if (!sw) return;
  sw.innerHTML = '';

  if (decks.length === 0) {
    sw.innerHTML = '<span class="empty-deck">right-click any word to create your first deck</span>';
  } else {
    decks.forEach((deck, i) => {
      const btn = document.createElement('button');
      btn.className = 'dbtn' + (i === activeDeckIdx ? ' dactive' : '');
      btn.style.setProperty('--dc', deck.color);

      const dot = document.createElement('span'); dot.className = 'ddot'; dot.style.background = deck.color;
      const lbl = document.createElement('span'); lbl.textContent = deck.name;
      const ct  = document.createElement('span'); ct.className = 'dct';
      const wc  = Object.keys(deck.words).length;
      if (wc > 0) ct.textContent = wc;

      btn.appendChild(dot); btn.appendChild(lbl); btn.appendChild(ct);
      btn.onclick = () => { activeDeckIdx = i === activeDeckIdx ? -1 : i; saveDeckState(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); };
      btn.oncontextmenu = e => showDeckCtxMenu(e, i);
      sw.appendChild(btn);
    });
  }

  // + new deck button
  const add = document.createElement('button');
  add.className = 'dbtn'; add.style.cssText='--dc:#7ac8a0;color:#7ac8a0;border-color:rgba(122,200,160,.3)';
  add.textContent = '+ new deck';
  add.onclick = () => { const n = prompt('Name your new deck:',''); if (n?.trim()) { addDeck(n.trim()); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); }};
  sw.appendChild(add);

  // update badge
  const badge = document.getElementById('deckBadge');
  if (badge) badge.textContent = activeDeckIdx >= 0 ? Object.keys(decks[activeDeckIdx]?.words||{}).length : '0';
}

function renderDeckChips() {
  const c = document.getElementById('deckChips');
  if (!c) return;
  const badge = document.getElementById('deckBadge');

  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
    if (badge) badge.textContent = '0';
    c.innerHTML = '<span class="empty-deck">select or create a deck, then click words to add them</span>';
    return;
  }
  const deck = decks[activeDeckIdx];
  const keys = Object.keys(deck.words);
  if (badge) badge.textContent = keys.length;

  if (keys.length === 0) {
    c.innerHTML = `<span class="empty-deck">left-click words to add to <strong style="color:${deck.color}">${deck.name}</strong></span>`;
    return;
  }
  c.innerHTML = '';
  keys.forEach(kr => {
    const w = LANGS[curLang].words.find(x => x.kr === kr) || {kr, ro:'', meaning:''};
    const chip = document.createElement('div'); chip.className = 'dchip';
    chip.style.cssText = `border-color:${deck.color};color:${deck.color}`;
    chip.innerHTML = `${w.kr} <span class="dchip-ro">${w.ro}</span><button class="dchip-x">×</button>`;
    chip.querySelector('button').onclick = () => { delete deck.words[kr]; saveDeckState(); renderDeckChips(); renderWordGrid(); };
    c.appendChild(chip);
  });
}

function clearActiveDeck() {
  if (activeDeckIdx < 0) return;
  decks[activeDeckIdx].words = {};
  saveDeckState(); renderDeckChips(); renderWordGrid();
}

// Context menus
let ctxMenu = null;
function removeCtxMenu() { if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; } }
document.addEventListener('click', removeCtxMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') removeCtxMenu(); });

function makeMenu(isDark) {
  const m = document.createElement('div');
  m.style.cssText = 'position:fixed;z-index:9999;border-radius:9px;overflow:hidden;min-width:170px;box-shadow:0 8px 32px rgba(0,0,0,.4)';
  m.style.background = isDark ? '#1e1e28' : '#fff';
  m.style.border     = isDark ? '1px solid rgba(255,255,255,.14)' : '1px solid rgba(0,0,0,.14)';
  return m;
}
function menuRow(menu, label, color, fn, isDark) {
  const row = document.createElement('div');
  row.style.cssText = 'padding:8px 13px;font-size:.74rem;cursor:pointer;font-family:DM Mono,monospace;display:flex;align-items:center;gap:8px;';
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

  // word header
  const hd = document.createElement('div');
  hd.style.cssText = 'padding:8px 13px 4px;font-family:Noto Sans KR,sans-serif;font-size:.9rem;font-weight:500;';
  hd.style.color = isDark ? '#f0eee8' : '#1c1a16';
  hd.textContent = w.kr + ' — ' + w.ro;
  menu.appendChild(hd);

  // speak button
  const speakRow = document.createElement('div');
  speakRow.style.cssText = 'padding:4px 13px 8px;font-size:.68rem;cursor:pointer;display:flex;align-items:center;gap:6px;';
  speakRow.style.color = isDark ? '#7ac8a0' : '#1a7a4a';
  speakRow.innerHTML = '▶ listen';
  speakRow.onclick = e => { e.stopPropagation(); speak(w.kr, curLang); };
  menu.appendChild(speakRow);

  // divider
  const d1 = document.createElement('div');
  d1.style.cssText = 'border-top:1px solid;margin:2px 0;';
  d1.style.borderColor = isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  menu.appendChild(d1);

  // deck header
  const dh = document.createElement('div');
  dh.style.cssText = 'padding:5px 13px 3px;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;';
  dh.style.color = isDark ? '#55555f' : '#a09d96';
  dh.textContent = 'add to deck';
  menu.appendChild(dh);

  if (decks.length === 0) {
    const none = document.createElement('div');
    none.style.cssText = 'padding:5px 13px 7px;font-size:.72rem;';
    none.style.color = isDark ? '#55555f' : '#a09d96';
    none.textContent = 'no decks yet';
    menu.appendChild(none);
  } else {
    decks.forEach((deck, i) => {
      const inThis = !!deck.words[w.kr];
      const row = document.createElement('div');
      row.style.cssText = 'padding:7px 13px;font-size:.74rem;cursor:pointer;display:flex;align-items:center;gap:9px;font-family:DM Mono,monospace;';
      row.style.color = isDark ? '#f0eee8' : '#1c1a16';
      const dot = document.createElement('span');
      dot.style.cssText = `width:9px;height:9px;border-radius:50%;flex-shrink:0;border:2px solid ${deck.color};`;
      if (inThis) dot.style.background = deck.color;
      const lbl = document.createElement('span'); lbl.style.flex='1'; lbl.textContent = deck.name + (inThis ? ' ✓' : '');
      row.appendChild(dot); row.appendChild(lbl);
      row.onmouseenter = () => row.style.background = isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';
      row.onmouseleave = () => row.style.background = '';
      row.onclick = ev => {
        ev.stopPropagation();
        decks.forEach(d => delete d.words[w.kr]);
        if (!inThis) deck.words[w.kr] = true;
        saveDeckState(); removeCtxMenu(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid();
      };
      menu.appendChild(row);
    });
  }

  // divider + new deck
  const d2 = document.createElement('div');
  d2.style.cssText = 'border-top:1px solid;margin:3px 0;';
  d2.style.borderColor = isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  menu.appendChild(d2);
  menuRow(menu, '+ new deck', isDark ? '#7ac8a0' : '#1a7a4a', () => {
    const n = prompt('Name your new deck:', '');
    if (n?.trim()) {
      addDeck(n.trim());
      decks[decks.length-1].words[w.kr] = true;
      saveDeckState(); renderDeckSwitcher(); renderDeckChips(); renderWordGrid();
    }
  }, isDark);

  positionMenu(menu, e);
}

function showDeckCtxMenu(e, idx) {
  e.preventDefault(); removeCtxMenu();
  const isDark = document.body.classList.contains('dark');
  const deck = decks[idx];
  const menu = makeMenu(isDark);

  const hd = document.createElement('div');
  hd.style.cssText = 'padding:7px 13px 5px;font-size:.65rem;letter-spacing:.08em;font-weight:500;text-transform:uppercase;';
  hd.style.color = deck.color; hd.textContent = deck.name;
  menu.appendChild(hd);

  menuRow(menu, 'rename', null, () => {
    const n = prompt('Rename deck:', deck.name);
    if (n?.trim()) { deck.name = n.trim(); saveDeckState(); renderDeckSwitcher(); }
  }, isDark);
  menuRow(menu, 'delete deck', '#c87a7a', () => {
    if (confirm(`Delete "${deck.name}"? Words will not be deleted.`)) { deleteDeck(idx); renderDeckSwitcher(); renderDeckChips(); renderWordGrid(); }
  }, isDark);

  positionMenu(menu, e);
}

// ── STUDY MODE ────────────────────────────────────────────────────────────────
let studyList = [], sIdx = 0, sFlip = false;

function openStudy() {
  if (activeDeckIdx < 0 || activeDeckIdx >= decks.length) {
    alert('Select a deck first.'); return;
  }
  const keys = Object.keys(decks[activeDeckIdx].words);
  if (keys.length === 0) { alert(`${decks[activeDeckIdx].name} has no words yet.`); return; }
  studyList = shuffle(keys.map(kr => LANGS[curLang].words.find(w => w.kr === kr)).filter(Boolean));
  sIdx = 0; sFlip = false;
  renderStudyCard();
  document.getElementById('studyOverlay')?.classList.add('open');
}
function closeStudy() { document.getElementById('studyOverlay')?.classList.remove('open'); }
function overlayClick(e) { if (e.target.id === 'studyOverlay') closeStudy(); }

function renderStudyCard() {
  const w = studyList[sIdx];
  const front = document.getElementById('cFront');
  const back  = document.getElementById('cBack');
  if (!front || !back) return;
  front.innerHTML = `
    <button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button>
    <div class="fc-kr">${w.kr}</div>
    <div class="fc-ro">${w.ro}</div>
    <div class="fc-pos">${w.pos}</div>
    ${w.register && w.register !== 'neutral' ? `<div class="fc-reg" style="color:${{formal:'#7a8cc8',casual:'#c8a87a'}[w.register]}">${w.register}</div>` : ''}
  `;
  back.innerHTML = `
    <button class="speak-btn" onclick="speak('${w.kr.replace(/'/g,"\\'")}','${curLang}')">▶</button>
    <div class="fc-meaning">${w.meaning}</div>
    <div class="fc-ex">${w.example}</div>
  `;
  document.getElementById('fcard')?.classList.remove('flip');
  sFlip = false;
}

function flipCard()  { sFlip = !sFlip; document.getElementById('fcard')?.classList.toggle('flip', sFlip); }
function nextCard()  {
  sIdx++;
  if (sIdx >= studyList.length) {
    const last = studyList[studyList.length-1];
    studyList = shuffle(studyList);
    if (studyList[0]?.kr === last?.kr && studyList.length > 1) { [studyList[0],studyList[1]] = [studyList[1],studyList[0]]; }
    sIdx = 0;
  }
  renderStudyCard();
}
function reshuffleStudy() {
  const cur = studyList[sIdx];
  studyList = shuffle(studyList);
  if (studyList[0]?.kr === cur?.kr && studyList.length > 1) { [studyList[0],studyList[1]] = [studyList[1],studyList[0]]; }
  sIdx = 0; renderStudyCard();
}

document.addEventListener('keydown', e => {
  if (!document.getElementById('studyOverlay')?.classList.contains('open')) return;
  if (e.key === 'Escape')     closeStudy();
  if (e.key === 'ArrowRight') nextCard();
  if (e.key === ' ')          { e.preventDefault(); flipCard(); }
});
