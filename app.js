// ─────────────────────────────────────────────────
//  KOREAN FLASHCARD APP — app.js
// ─────────────────────────────────────────────────

const App = (() => {

  // ── STATE ──────────────────────────────────────
  let deck       = new Set();   // Set of kr strings in the user's deck
  let activePos  = null;        // active part-of-speech filter
  let studyDeck  = [];          // shuffled array of word objects for study mode
  let studyIdx   = 0;
  let flipped    = false;

  // ── INIT ───────────────────────────────────────
  function init() {
    buildFilterTags();
    render();
    document.getElementById('wordCountLabel').textContent = `${WORDS.length} words`;
  }

  // ── FILTER TAGS ────────────────────────────────
  function buildFilterTags() {
    const posList = [...new Set(WORDS.map(w => w.pos))].sort();
    const container = document.getElementById('filterTags');
    container.innerHTML = '';
    posList.forEach(pos => {
      const tag = document.createElement('span');
      tag.className = `filter-tag ft-${pos}${activePos === pos ? ' active' : ''}`;
      tag.textContent = pos;
      tag.setAttribute('role', 'button');
      tag.setAttribute('tabindex', '0');
      tag.addEventListener('click', () => togglePosFilter(pos));
      tag.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') togglePosFilter(pos); });
      container.appendChild(tag);
    });
  }

  function togglePosFilter(pos) {
    activePos = activePos === pos ? null : pos;
    buildFilterTags();
    render();
  }

  // ── RENDER WORD GRID ───────────────────────────
  function render() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const sort   = document.getElementById('sortSelect').value;

    let filtered = WORDS.filter(w => {
      const matchSearch = !search
        || w.kr.includes(search)
        || w.ro.toLowerCase().includes(search)
        || w.meaning.toLowerCase().includes(search);
      const matchPos = !activePos || w.pos === activePos;
      return matchSearch && matchPos;
    });

    // Sort
    switch (sort) {
      case 'az':       filtered.sort((a,b) => a.ro.localeCompare(b.ro)); break;
      case 'za':       filtered.sort((a,b) => b.ro.localeCompare(a.ro)); break;
      case 'short':    filtered.sort((a,b) => a.kr.length - b.kr.length); break;
      case 'long':     filtered.sort((a,b) => b.kr.length - a.kr.length); break;
      case 'common':   filtered.sort((a,b) => b.freq - a.freq); break;
      case 'uncommon': filtered.sort((a,b) => a.freq - b.freq); break;
      case 'pos':      filtered.sort((a,b) => a.pos.localeCompare(b.pos) || a.ro.localeCompare(b.ro)); break;
      // default: original WORDS order
    }

    const grid = document.getElementById('wordGrid');
    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-grid">no words match — try a different search or filter</div>';
      return;
    }

    const frag = document.createDocumentFragment();
    filtered.forEach((w, i) => {
      const chip = document.createElement('div');
      chip.className = `word-chip pos-${w.pos}${deck.has(w.kr) ? ' selected' : ''}`;
      chip.style.animationDelay = Math.min(i * 0.012, 0.25) + 's';
      chip.title = `${w.meaning} · ${w.example}`;
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-pressed', deck.has(w.kr));
      chip.innerHTML = `
        <span class="chip-kr">${w.kr}</span>
        <span class="chip-ro">${w.ro}</span>
        <span class="chip-pos">${w.pos}</span>
      `;
      chip.addEventListener('click', () => toggleWord(w));
      chip.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggleWord(w); });
      frag.appendChild(chip);
    });
    grid.appendChild(frag);
  }

  // ── DECK ───────────────────────────────────────
  function toggleWord(w) {
    if (deck.has(w.kr)) deck.delete(w.kr);
    else deck.add(w.kr);
    animateBadge();
    renderDeck();
    render();
  }

  function animateBadge() {
    const badge = document.getElementById('deckCountBadge');
    badge.classList.remove('pop');
    void badge.offsetWidth;
    badge.classList.add('pop');
    setTimeout(() => badge.classList.remove('pop'), 200);
  }

  function renderDeck() {
    const container = document.getElementById('deckChips');
    const badge     = document.getElementById('deckCountBadge');
    badge.textContent = deck.size;

    if (deck.size === 0) {
      container.innerHTML = '<span class="empty-deck">no words yet — click any word above to add it</span>';
      return;
    }

    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    deck.forEach(kr => {
      const w = WORDS.find(x => x.kr === kr);
      if (!w) return;
      const chip = document.createElement('div');
      chip.className = 'deck-chip';
      chip.innerHTML = `${w.kr} <span style="font-family:var(--font-body);font-size:0.62rem;color:var(--muted)">${w.ro}</span>
        <button class="deck-chip-remove" aria-label="remove ${w.ro}">×</button>`;
      chip.querySelector('button').addEventListener('click', () => removeDeckWord(kr));
      frag.appendChild(chip);
    });
    container.appendChild(frag);
  }

  function removeDeckWord(kr) {
    deck.delete(kr);
    renderDeck();
    render();
  }

  function clearDeck() {
    deck.clear();
    renderDeck();
    render();
  }

  // ── STUDY MODE ─────────────────────────────────
  function openStudy() {
    if (deck.size === 0) {
      alert('Add at least one word to your deck first!');
      return;
    }
    studyDeck = shuffle([...deck].map(kr => WORDS.find(w => w.kr === kr)).filter(Boolean));
    studyIdx  = 0;
    flipped   = false;
    renderCard();
    document.getElementById('modalOverlay').classList.add('open');
  }

  function closeStudy() {
    document.getElementById('modalOverlay').classList.remove('open');
  }

  function closeOnOverlay(e) {
    if (e.target === document.getElementById('modalOverlay')) closeStudy();
  }

  function renderCard() {
    const w = studyDeck[studyIdx];
    document.getElementById('cardFront').innerHTML = `
      <div class="fc-kr">${w.kr}</div>
      <div class="fc-ro">${w.ro}</div>
      <div class="fc-pos">${w.pos}</div>
    `;
    document.getElementById('cardBack').innerHTML = `
      <div class="fc-meaning">${w.meaning}</div>
      <div class="fc-example">${w.example}</div>
    `;
    document.getElementById('modalProgress').textContent = `${studyIdx + 1} / ${studyDeck.length}`;
    document.getElementById('modalMeta').textContent = w.pos;

    const card = document.getElementById('flashCard');
    card.classList.remove('flipped');
    flipped = false;
  }

  function flipCard() {
    flipped = !flipped;
    document.getElementById('flashCard').classList.toggle('flipped', flipped);
  }

  function nextCard() {
    studyIdx = (studyIdx + 1) % studyDeck.length;
    renderCard();
  }

  function prevCard() {
    studyIdx = (studyIdx - 1 + studyDeck.length) % studyDeck.length;
    renderCard();
  }

  function reshuffleDeck() {
    studyDeck = shuffle(studyDeck);
    studyIdx  = 0;
    renderCard();
  }

  // ── UTILS ──────────────────────────────────────
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── KEYBOARD ───────────────────────────────────
  document.addEventListener('keydown', e => {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')       closeStudy();
    if (e.key === 'ArrowRight')   nextCard();
    if (e.key === 'ArrowLeft')    prevCard();
    if (e.key === ' ')            { e.preventDefault(); flipCard(); }
  });

  // ── PUBLIC API ─────────────────────────────────
  return {
    render,
    clearDeck,
    openStudy,
    closeStudy,
    closeOnOverlay,
    flipCard,
    nextCard,
    prevCard,
    reshuffleDeck,
  };

})();

// Boot
document.addEventListener('DOMContentLoaded', () => {
  App.render();
  // build filter tags (needs access to internals, so call via a small bridge)
  const posList = [...new Set(WORDS.map(w => w.pos))].sort();
  const container = document.getElementById('filterTags');
  let activePos = null;
  function buildTags() {
    container.innerHTML = '';
    posList.forEach(pos => {
      const tag = document.createElement('span');
      tag.className = `filter-tag ft-${pos}${activePos === pos ? ' active' : ''}`;
      tag.textContent = pos;
      tag.setAttribute('role','button');
      tag.setAttribute('tabindex','0');
      const toggle = () => {
        activePos = activePos === pos ? null : pos;
        buildTags();
        // pass filter into render via a hidden data attribute on the select
        document.getElementById('sortSelect').dataset.posFilter = activePos || '';
        App.render();
      };
      tag.addEventListener('click', toggle);
      tag.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') toggle(); });
      container.appendChild(tag);
    });
  }
  buildTags();
  document.getElementById('wordCountLabel').textContent = `${WORDS.length} words`;

  // Override render to respect pos filter
  const originalRender = App.render;
  App.render = function() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const sort   = document.getElementById('sortSelect').value;
    const posF   = document.getElementById('sortSelect').dataset.posFilter || '';

    let filtered = WORDS.filter(w => {
      const matchSearch = !search
        || w.kr.includes(search)
        || w.ro.toLowerCase().includes(search)
        || w.meaning.toLowerCase().includes(search);
      const matchPos = !posF || w.pos === posF;
      return matchSearch && matchPos;
    });

    switch (sort) {
      case 'az':       filtered.sort((a,b) => a.ro.localeCompare(b.ro)); break;
      case 'za':       filtered.sort((a,b) => b.ro.localeCompare(a.ro)); break;
      case 'short':    filtered.sort((a,b) => a.kr.length - b.kr.length); break;
      case 'long':     filtered.sort((a,b) => b.kr.length - a.kr.length); break;
      case 'common':   filtered.sort((a,b) => b.freq - a.freq); break;
      case 'uncommon': filtered.sort((a,b) => a.freq - b.freq); break;
      case 'pos':      filtered.sort((a,b) => a.pos.localeCompare(b.pos) || a.ro.localeCompare(b.ro)); break;
    }

    const grid = document.getElementById('wordGrid');
    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-grid">no words match — try a different search or filter</div>';
      return;
    }

    const deckSet = window._deck || new Set();
    const frag = document.createDocumentFragment();
    filtered.forEach((w, i) => {
      const chip = document.createElement('div');
      chip.className = `word-chip pos-${w.pos}${deckSet.has(w.kr) ? ' selected' : ''}`;
      chip.style.animationDelay = Math.min(i * 0.012, 0.25) + 's';
      chip.title = `${w.meaning} · ${w.example}`;
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.innerHTML = `
        <span class="chip-kr">${w.kr}</span>
        <span class="chip-ro">${w.ro}</span>
        <span class="chip-pos">${w.pos}</span>
      `;
      chip.addEventListener('click', () => toggle(w));
      chip.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') toggle(w); });
      frag.appendChild(chip);
    });
    grid.appendChild(frag);
  };

  // Unified deck & toggle state at module level
  window._deck = new Set();

  function toggle(w) {
    if (window._deck.has(w.kr)) window._deck.delete(w.kr);
    else window._deck.add(w.kr);
    animateBadge();
    renderDeck();
    App.render();
  }

  function animateBadge() {
    const b = document.getElementById('deckCountBadge');
    b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    setTimeout(() => b.classList.remove('pop'), 200);
  }

  function renderDeck() {
    const container = document.getElementById('deckChips');
    const badge = document.getElementById('deckCountBadge');
    badge.textContent = window._deck.size;
    if (window._deck.size === 0) {
      container.innerHTML = '<span class="empty-deck">no words yet — click any word above to add it</span>';
      return;
    }
    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    window._deck.forEach(kr => {
      const w = WORDS.find(x => x.kr === kr);
      if (!w) return;
      const chip = document.createElement('div');
      chip.className = 'deck-chip';
      chip.innerHTML = `${w.kr} <span style="font-family:var(--font-body);font-size:0.62rem;color:var(--muted)">${w.ro}</span>
        <button class="deck-chip-remove" aria-label="remove ${w.ro}">×</button>`;
      chip.querySelector('button').addEventListener('click', () => {
        window._deck.delete(kr);
        renderDeck();
        App.render();
      });
      frag.appendChild(chip);
    });
    container.appendChild(frag);
  }

  App.clearDeck = function() {
    window._deck.clear();
    renderDeck();
    App.render();
  };

  App.openStudy = function() {
    if (window._deck.size === 0) { alert('Add at least one word to your deck first!'); return; }
    const shuffled = shuffle([...window._deck].map(kr => WORDS.find(w => w.kr === kr)).filter(Boolean));
    window._studyDeck = shuffled;
    window._studyIdx  = 0;
    window._flipped   = false;
    renderStudyCard();
    document.getElementById('modalOverlay').classList.add('open');
  };

  App.reshuffleDeck = function() {
    window._studyDeck = shuffle(window._studyDeck);
    window._studyIdx  = 0;
    renderStudyCard();
  };

  App.nextCard = function() {
    window._studyIdx = (window._studyIdx + 1) % window._studyDeck.length;
    renderStudyCard();
  };

  App.prevCard = function() {
    window._studyIdx = (window._studyIdx - 1 + window._studyDeck.length) % window._studyDeck.length;
    renderStudyCard();
  };

  App.flipCard = function() {
    window._flipped = !window._flipped;
    document.getElementById('flashCard').classList.toggle('flipped', window._flipped);
  };

  function renderStudyCard() {
    const w = window._studyDeck[window._studyIdx];
    document.getElementById('cardFront').innerHTML = `
      <div class="fc-kr">${w.kr}</div>
      <div class="fc-ro">${w.ro}</div>
      <div class="fc-pos">${w.pos}</div>
    `;
    document.getElementById('cardBack').innerHTML = `
      <div class="fc-meaning">${w.meaning}</div>
      <div class="fc-example">${w.example}</div>
    `;
    document.getElementById('modalProgress').textContent =
      `${window._studyIdx + 1} / ${window._studyDeck.length}`;
    document.getElementById('modalMeta').textContent = w.pos;
    document.getElementById('flashCard').classList.remove('flipped');
    window._flipped = false;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  document.addEventListener('keydown', e => {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')     App.closeStudy();
    if (e.key === 'ArrowRight') App.nextCard();
    if (e.key === 'ArrowLeft')  App.prevCard();
    if (e.key === ' ')          { e.preventDefault(); App.flipCard(); }
  });

  App.render();
});
