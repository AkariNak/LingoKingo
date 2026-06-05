const App = (() => {

  const deck = new Set();
  let openSections = new Set();
  let studyDeck = [];
  let studyIdx  = 0;
  let flipped   = false;

  const POS_ORDER = ['expression','verb','adjective','noun','adverb','pronoun','particle'];

  // ── THEME ──
  function initTheme() {
    const saved = localStorage.getItem('krfc-theme') || 'dark';
    applyTheme(saved);
    document.getElementById('themeToggle').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('krfc-theme', theme);
    const icon  = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (theme === 'dark') {
      icon.textContent  = 'light';
      label.textContent = 'mode';
    } else {
      icon.textContent  = 'dark';
      label.textContent = 'mode';
    }
  }

  // ── RENDER ──
  function render() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const sort   = document.getElementById('sortSelect').value;

    let filtered = WORDS.filter(w =>
      !search ||
      w.kr.includes(search) ||
      w.ro.toLowerCase().includes(search) ||
      w.meaning.toLowerCase().includes(search)
    );

    if (sort === 'az')        filtered.sort((a,b) => a.ro.localeCompare(b.ro));
    else if (sort === 'za')   filtered.sort((a,b) => b.ro.localeCompare(a.ro));
    else if (sort === 'short') filtered.sort((a,b) => a.kr.length - b.kr.length);
    else if (sort === 'long')  filtered.sort((a,b) => b.kr.length - a.kr.length);
    else if (sort === 'common')   filtered.sort((a,b) => b.freq - a.freq);
    else if (sort === 'uncommon') filtered.sort((a,b) => a.freq - b.freq);

    const groups = {};
    POS_ORDER.forEach(p => groups[p] = []);
    filtered.forEach(w => {
      if (groups[w.pos]) groups[w.pos].push(w);
    });

    if (search) POS_ORDER.forEach(p => { if (groups[p].length) openSections.add(p); });

    const container = document.getElementById('wordSections');
    container.innerHTML = '';

    POS_ORDER.forEach(pos => {
      const words = groups[pos] || [];
      if (search && words.length === 0) return;

      const selectedCount = words.filter(w => deck.has(w.kr)).length;
      const isOpen = openSections.has(pos);

      const section = document.createElement('div');
      section.className = `pos-section pos-${pos}${isOpen ? ' open' : ''}`;
      section.id = `section-${pos}`;

      const header = document.createElement('div');
      header.className = 'section-header';
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.innerHTML = `
        <div class="section-left">
          <span class="section-pos">${pos}</span>
          <span class="section-count">${words.length}</span>
          ${selectedCount ? `<span class="section-selected">${selectedCount} in deck</span>` : ''}
        </div>
        <span class="section-chevron">${isOpen ? '▴' : '▾'}</span>
      `;

      const body = document.createElement('div');
      body.className = 'section-body';
      if (!isOpen) body.style.display = 'none';

      if (words.length === 0) {
        body.innerHTML = '<span class="empty-section">no words match</span>';
      } else {
        words.forEach((w, i) => {
          const chip = document.createElement('div');
          chip.className = `word-chip${deck.has(w.kr) ? ' selected' : ''}`;
          chip.style.animationDelay = Math.min(i * 0.01, 0.2) + 's';
          chip.title = `${w.meaning} — ${w.example}`;
          chip.setAttribute('role', 'button');
          chip.setAttribute('tabindex', '0');
          chip.innerHTML = `<span class="chip-kr">${w.kr}</span><span class="chip-ro">${w.ro}</span>`;
          chip.addEventListener('click',   () => toggleWord(w));
          chip.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') toggleWord(w); });
          body.appendChild(chip);
        });
      }

      const toggle = () => {
        const nowOpen = section.classList.contains('open');
        if (nowOpen) {
          section.classList.remove('open');
          body.style.display = 'none';
          header.querySelector('.section-chevron').textContent = '▾';
          openSections.delete(pos);
        } else {
          section.classList.add('open');
          body.style.display = 'flex';
          header.querySelector('.section-chevron').textContent = '▴';
          openSections.add(pos);
        }
      };

      header.addEventListener('click',   toggle);
      header.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') toggle(); });

      section.appendChild(header);
      section.appendChild(body);
      container.appendChild(section);
    });
  }

  function expandAll() {
    POS_ORDER.forEach(p => openSections.add(p));
    render();
  }

  function collapseAll() {
    openSections = new Set();
    render();
  }

  // ── DECK ──
  function toggleWord(w) {
    if (deck.has(w.kr)) deck.delete(w.kr);
    else deck.add(w.kr);
    animateBadge();
    renderDeck();
    render();
  }

  function animateBadge() {
    const b = document.getElementById('deckCountBadge');
    b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    setTimeout(() => b.classList.remove('pop'), 200);
  }

  function renderDeck() {
    const container = document.getElementById('deckChips');
    document.getElementById('deckCountBadge').textContent = deck.size;
    if (deck.size === 0) {
      container.innerHTML = '<span class="empty-deck">no words yet — click any word above to add it</span>';
      return;
    }
    container.innerHTML = '';
    deck.forEach(kr => {
      const w = WORDS.find(x => x.kr === kr);
      if (!w) return;
      const chip = document.createElement('div');
      chip.className = 'deck-chip';
      chip.innerHTML = `${w.kr} <span class="chip-ro-small">${w.ro}</span>
        <button class="deck-chip-remove" aria-label="remove ${w.ro}">×</button>`;
      chip.querySelector('button').addEventListener('click', () => {
        deck.delete(kr); renderDeck(); render();
      });
      container.appendChild(chip);
    });
  }

  function clearDeck() {
    deck.clear(); renderDeck(); render();
  }

  // ── STUDY ──
  function openStudy() {
    if (deck.size === 0) { alert('Add at least one word to your deck first!'); return; }
    studyDeck = shuffle([...deck].map(kr => WORDS.find(w => w.kr === kr)).filter(Boolean));
    studyIdx = 0; flipped = false;
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
    document.getElementById('flashCard').classList.remove('flipped');
    flipped = false;
  }

  function flipCard() {
    flipped = !flipped;
    document.getElementById('flashCard').classList.toggle('flipped', flipped);
  }

  function nextCard()      { studyIdx = (studyIdx + 1) % studyDeck.length; renderCard(); }
  function prevCard()      { studyIdx = (studyIdx - 1 + studyDeck.length) % studyDeck.length; renderCard(); }
  function reshuffleDeck() { studyDeck = shuffle(studyDeck); studyIdx = 0; renderCard(); }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  document.addEventListener('keydown', e => {
    if (!document.getElementById('modalOverlay').classList.contains('open')) return;
    if (e.key === 'Escape')     closeStudy();
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft')  prevCard();
    if (e.key === ' ')          { e.preventDefault(); flipCard(); }
  });

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    render();
  });

  return { render, expandAll, collapseAll, clearDeck, openStudy, closeStudy, closeOnOverlay, flipCard, nextCard, prevCard, reshuffleDeck };

})();
