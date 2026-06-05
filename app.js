const App = (() => {

  const deck = new Set();
  let openSections = new Set();
  let studyDeck = [];
  let studyIdx  = 0;
  let flipped   = false;
  let currentGrouping = 'pos';

  const POS_ORDER = ['expression','verb','adjective','noun','adverb','pronoun','particle'];

  const GROUPINGS = {
    pos: {
      label: 'part of speech',
      getKey: w => w.pos,
      order: () => POS_ORDER,
      color: pos => ({
        verb:'var(--accent2)', noun:'var(--green)', adjective:'var(--accent3)',
        adverb:'var(--accent)', expression:'var(--red)', pronoun:'var(--teal)', particle:'var(--yellow)'
      })[pos] || 'var(--muted)',
    },
    most_common: {
      label: 'most common first',
      getKey: w => {
        if (w.freq >= 10) return '★★★ essential (freq 10)';
        if (w.freq >= 8)  return '★★☆ very common (freq 8–9)';
        if (w.freq >= 6)  return '★☆☆ common (freq 6–7)';
        if (w.freq >= 4)  return '◇◇◇ uncommon (freq 4–5)';
        return '— rare (freq 1–3)';
      },
      order: () => ['★★★ essential (freq 10)','★★☆ very common (freq 8–9)','★☆☆ common (freq 6–7)','◇◇◇ uncommon (freq 4–5)','— rare (freq 1–3)'],
      color: () => 'var(--green)',
    },
    least_common: {
      label: 'least common first',
      getKey: w => {
        if (w.freq >= 10) return '★★★ essential (freq 10)';
        if (w.freq >= 8)  return '★★☆ very common (freq 8–9)';
        if (w.freq >= 6)  return '★☆☆ common (freq 6–7)';
        if (w.freq >= 4)  return '◇◇◇ uncommon (freq 4–5)';
        return '— rare (freq 1–3)';
      },
      order: () => ['— rare (freq 1–3)','◇◇◇ uncommon (freq 4–5)','★☆☆ common (freq 6–7)','★★☆ very common (freq 8–9)','★★★ essential (freq 10)'],
      color: () => 'var(--red)',
    },
    length_short: {
      label: 'shortest first',
      getKey: w => {
        const l = w.kr.length;
        if (l <= 1) return '1 character';
        if (l <= 2) return '2 characters';
        if (l <= 3) return '3 characters';
        if (l <= 4) return '4 characters';
        return '5+ characters';
      },
      order: () => ['1 character','2 characters','3 characters','4 characters','5+ characters'],
      color: () => 'var(--teal)',
    },
    length_long: {
      label: 'longest first',
      getKey: w => {
        const l = w.kr.length;
        if (l <= 1) return '1 character';
        if (l <= 2) return '2 characters';
        if (l <= 3) return '3 characters';
        if (l <= 4) return '4 characters';
        return '5+ characters';
      },
      order: () => ['5+ characters','4 characters','3 characters','2 characters','1 character'],
      color: () => 'var(--accent3)',
    },
    alpha: {
      label: 'a → z',
      getKey: w => w.ro[0].toUpperCase(),
      order: keys => [...new Set(keys)].sort(),
      color: () => 'var(--accent2)',
    },
    alpha_desc: {
      label: 'z → a',
      getKey: w => w.ro[0].toUpperCase(),
      order: keys => [...new Set(keys)].sort().reverse(),
      color: () => 'var(--accent)',
    },
    in_deck: {
      label: 'in my deck',
      getKey: w => deck.has(w.kr) ? 'added to deck' : 'not in deck',
      order: () => ['added to deck', 'not in deck'],
      color: key => key === 'added to deck' ? 'var(--accent)' : 'var(--muted)',
    },
  };

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
    document.getElementById('themeToggle').textContent = theme === 'dark' ? 'light mode' : 'dark mode';
  }

  // ── GROUP BUTTONS ──
  function buildGroupButtons() {
    const bar = document.getElementById('groupBar');
    bar.innerHTML = '';
    Object.entries(GROUPINGS).forEach(([key, cfg]) => {
      const btn = document.createElement('button');
      btn.className = `group-btn${currentGrouping === key ? ' active' : ''}`;
      btn.textContent = cfg.label;
      btn.addEventListener('click', () => {
        currentGrouping = key;
        openSections = new Set();
        buildGroupButtons();
        render();
      });
      bar.appendChild(btn);
    });
  }

  // ── RENDER ──
  function render() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const cfg    = GROUPINGS[currentGrouping];

    let filtered = WORDS.filter(w =>
      !search ||
      w.kr.includes(search) ||
      w.ro.toLowerCase().includes(search) ||
      w.meaning.toLowerCase().includes(search)
    );

    // Group
    const groups = {};
    filtered.forEach(w => {
      const key = cfg.getKey(w);
      if (!groups[key]) groups[key] = [];
      groups[key].push(w);
    });

    const allKeys = cfg.order(Object.keys(groups));
    const keysWithWords = allKeys.filter(k => groups[k] && groups[k].length > 0);

    if (search) keysWithWords.forEach(k => openSections.add(k));

    const container = document.getElementById('wordSections');
    container.innerHTML = '';

    if (keysWithWords.length === 0) {
      container.innerHTML = '<div class="empty-grid">no words match — try a different search</div>';
      return;
    }

    keysWithWords.forEach(key => {
      const words = groups[key];
      const selectedCount = words.filter(w => deck.has(w.kr)).length;
      const isOpen = openSections.has(key);
      const color  = cfg.color(key);

      const section = document.createElement('div');
      section.className = `pos-section${isOpen ? ' open' : ''}`;

      const header = document.createElement('div');
      header.className = 'section-header';
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.innerHTML = `
        <div class="section-left">
          <span class="section-pos" style="color:${color}">${key}</span>
          <span class="section-count">${words.length}</span>
          ${selectedCount ? `<span class="section-selected">${selectedCount} in deck</span>` : ''}
        </div>
        <span class="section-chevron">${isOpen ? '▴' : '▾'}</span>
      `;

      const body = document.createElement('div');
      body.className = 'section-body';
      body.style.display = isOpen ? 'flex' : 'none';

      words.forEach((w, i) => {
        const chip = document.createElement('div');
        chip.className = `word-chip${deck.has(w.kr) ? ' selected' : ''}`;
        chip.style.animationDelay = Math.min(i * 0.008, 0.2) + 's';
        chip.title = `${w.meaning} — ${w.example}`;
        chip.setAttribute('role', 'button');
        chip.setAttribute('tabindex', '0');
        chip.innerHTML = `<span class="chip-kr">${w.kr}</span><span class="chip-ro">${w.ro}</span>`;
        chip.addEventListener('click',   () => toggleWord(w));
        chip.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') toggleWord(w); });
        body.appendChild(chip);
      });

      const toggle = () => {
        const nowOpen = section.classList.contains('open');
        if (nowOpen) {
          section.classList.remove('open');
          body.style.display = 'none';
          header.querySelector('.section-chevron').textContent = '▾';
          openSections.delete(key);
        } else {
          section.classList.add('open');
          body.style.display = 'flex';
          header.querySelector('.section-chevron').textContent = '▴';
          openSections.add(key);
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
    const cfg = GROUPINGS[currentGrouping];
    let filtered = WORDS;
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    if (search) filtered = WORDS.filter(w => w.kr.includes(search) || w.ro.toLowerCase().includes(search) || w.meaning.toLowerCase().includes(search));
    filtered.forEach(w => openSections.add(cfg.getKey(w)));
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

  function clearDeck() { deck.clear(); renderDeck(); render(); }

  // ── STUDY ──
  function openStudy() {
    if (deck.size === 0) { alert('Add at least one word to your deck first!'); return; }
    studyDeck = shuffle([...deck].map(kr => WORDS.find(w => w.kr === kr)).filter(Boolean));
    studyIdx = 0; flipped = false;
    renderCard();
    document.getElementById('modalOverlay').classList.add('open');
  }

  function closeStudy()      { document.getElementById('modalOverlay').classList.remove('open'); }
  function closeOnOverlay(e) { if (e.target === document.getElementById('modalOverlay')) closeStudy(); }

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

  function flipCard()      { flipped = !flipped; document.getElementById('flashCard').classList.toggle('flipped', flipped); }
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

  // Scripts load after DOM (bottom of body), so call directly
  initTheme();
  buildGroupButtons();
  render();

  return { render, expandAll, collapseAll, clearDeck, openStudy, closeStudy, closeOnOverlay, flipCard, nextCard, prevCard, reshuffleDeck };

})();
