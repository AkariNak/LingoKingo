// wait for full page load before touching anything
window.addEventListener('load', function() {

  var deck = {};
  var currentGroup = 'pos';
  var openSections = {};
  var studyDeck = [];
  var studyIdx = 0;
  var studyFlipped = false;

  var POS_ORDER = ['expression','verb','adjective','noun','adverb','pronoun','particle'];

  var GROUPS = {
    pos: {
      label: 'part of speech',
      key: function(w) { return w.pos; },
      order: function() { return POS_ORDER; },
      color: function(k) {
        return {verb:'#7a8cc8',noun:'#7ac8a0',adjective:'#c87aa8',adverb:'#c8a87a',
                expression:'#c87a7a',pronoun:'#7ac8c8',particle:'#c8c87a'}[k] || '#888';
      }
    },
    most_common: {
      label: 'most common first',
      key: function(w) {
        if (w.freq >= 10) return 'essential';
        if (w.freq >= 8)  return 'very common';
        if (w.freq >= 6)  return 'common';
        if (w.freq >= 4)  return 'uncommon';
        return 'rare';
      },
      order: function() { return ['essential','very common','common','uncommon','rare']; },
      color: function() { return '#7ac8a0'; }
    },
    least_common: {
      label: 'least common first',
      key: function(w) {
        if (w.freq >= 10) return 'essential';
        if (w.freq >= 8)  return 'very common';
        if (w.freq >= 6)  return 'common';
        if (w.freq >= 4)  return 'uncommon';
        return 'rare';
      },
      order: function() { return ['rare','uncommon','common','very common','essential']; },
      color: function() { return '#c87a7a'; }
    },
    shortest: {
      label: 'shortest first',
      key: function(w) {
        var l = w.kr.length;
        if (l <= 1) return '1 character';
        if (l <= 2) return '2 characters';
        if (l <= 3) return '3 characters';
        if (l <= 4) return '4 characters';
        return '5+ characters';
      },
      order: function() { return ['1 character','2 characters','3 characters','4 characters','5+ characters']; },
      color: function() { return '#7ac8c8'; }
    },
    longest: {
      label: 'longest first',
      key: function(w) {
        var l = w.kr.length;
        if (l <= 1) return '1 character';
        if (l <= 2) return '2 characters';
        if (l <= 3) return '3 characters';
        if (l <= 4) return '4 characters';
        return '5+ characters';
      },
      order: function() { return ['5+ characters','4 characters','3 characters','2 characters','1 character']; },
      color: function() { return '#c87aa8'; }
    },
    a_to_z: {
      label: 'a → z',
      key: function(w) { return w.ro[0].toUpperCase(); },
      order: function(keys) { return keys.slice().sort(); },
      color: function() { return '#7a8cc8'; }
    },
    z_to_a: {
      label: 'z → a',
      key: function(w) { return w.ro[0].toUpperCase(); },
      order: function(keys) { return keys.slice().sort().reverse(); },
      color: function() { return '#c8a87a'; }
    },
    in_deck: {
      label: 'in my deck',
      key: function(w) { return deck[w.kr] ? 'added to deck' : 'not in deck'; },
      order: function() { return ['added to deck','not in deck']; },
      color: function(k) { return k === 'added to deck' ? '#c8a87a' : '#888'; }
    }
  };

  // ── THEME ──────────────────────────────────────────────
  var theme = localStorage.getItem('krfc-theme') || 'dark';
  applyTheme(theme);

  document.getElementById('themeToggle').onclick = function() {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
  };

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('krfc-theme', t);
    document.getElementById('themeToggle').textContent = t === 'dark' ? 'light mode' : 'dark mode';
  }

  // ── GROUP BUTTONS ──────────────────────────────────────
  function buildGroupButtons() {
    var bar = document.getElementById('groupBar');
    bar.innerHTML = '';
    Object.keys(GROUPS).forEach(function(key) {
      var btn = document.createElement('button');
      btn.className = 'group-btn' + (key === currentGroup ? ' active' : '');
      btn.textContent = GROUPS[key].label;
      btn.onclick = function() {
        currentGroup = key;
        openSections = {};
        buildGroupButtons();
        render();
      };
      bar.appendChild(btn);
    });
  }

  // ── RENDER ─────────────────────────────────────────────
  function render() {
    var search = (document.getElementById('searchInput').value || '').toLowerCase().trim();
    var cfg = GROUPS[currentGroup];

    var filtered = WORDS.filter(function(w) {
      if (!search) return true;
      return w.kr.indexOf(search) !== -1
        || w.ro.toLowerCase().indexOf(search) !== -1
        || w.meaning.toLowerCase().indexOf(search) !== -1;
    });

    // group
    var groups = {};
    filtered.forEach(function(w) {
      var k = cfg.key(w);
      if (!groups[k]) groups[k] = [];
      groups[k].push(w);
    });

    // order
    var allKeys = Object.keys(groups);
    var orderedKeys = cfg.order(allKeys).filter(function(k) { return groups[k] && groups[k].length > 0; });

    // auto-open when searching
    if (search) {
      orderedKeys.forEach(function(k) { openSections[k] = true; });
    }

    var container = document.getElementById('wordSections');
    container.innerHTML = '';

    if (orderedKeys.length === 0) {
      container.innerHTML = '<div class="empty-grid">no words match</div>';
      return;
    }

    orderedKeys.forEach(function(key) {
      var words = groups[key];
      var isOpen = !!openSections[key];
      var color = cfg.color(key);
      var selectedCount = words.filter(function(w) { return deck[w.kr]; }).length;

      var section = document.createElement('div');
      section.className = 'pos-section';

      var header = document.createElement('div');
      header.className = 'section-header';

      var left = document.createElement('div');
      left.className = 'section-left';

      var posSpan = document.createElement('span');
      posSpan.className = 'section-pos';
      posSpan.style.color = color;
      posSpan.textContent = key;

      var countSpan = document.createElement('span');
      countSpan.className = 'section-count';
      countSpan.textContent = words.length;

      left.appendChild(posSpan);
      left.appendChild(countSpan);

      if (selectedCount > 0) {
        var selSpan = document.createElement('span');
        selSpan.className = 'section-selected';
        selSpan.textContent = selectedCount + ' in deck';
        left.appendChild(selSpan);
      }

      var chevron = document.createElement('span');
      chevron.className = 'section-chevron';
      chevron.textContent = isOpen ? '▴' : '▾';

      header.appendChild(left);
      header.appendChild(chevron);

      var body = document.createElement('div');
      body.className = 'section-body';
      body.style.display = isOpen ? 'flex' : 'none';

      words.forEach(function(w) {
        var chip = document.createElement('div');
        chip.className = 'word-chip' + (deck[w.kr] ? ' selected' : '');
        chip.title = w.meaning + ' — ' + w.example;

        var kr = document.createElement('span');
        kr.className = 'chip-kr';
        kr.textContent = w.kr;

        var ro = document.createElement('span');
        ro.className = 'chip-ro';
        ro.textContent = w.ro;

        chip.appendChild(kr);
        chip.appendChild(ro);

        chip.onclick = function() { toggleWord(w); };
        body.appendChild(chip);
      });

      header.onclick = function() {
        if (openSections[key]) {
          delete openSections[key];
          body.style.display = 'none';
          chevron.textContent = '▾';
        } else {
          openSections[key] = true;
          body.style.display = 'flex';
          chevron.textContent = '▴';
        }
      };

      section.appendChild(header);
      section.appendChild(body);
      container.appendChild(section);
    });
  }

  // ── EXPAND / COLLAPSE ──────────────────────────────────
  window.App = {
    expandAll: function() {
      var cfg = GROUPS[currentGroup];
      WORDS.forEach(function(w) { openSections[cfg.key(w)] = true; });
      render();
    },
    collapseAll: function() {
      openSections = {};
      render();
    },
    clearDeck: function() {
      deck = {};
      renderDeck();
      render();
    },
    openStudy: openStudy,
    closeStudy: closeStudy,
    closeOnOverlay: function(e) { if (e.target === document.getElementById('modalOverlay')) closeStudy(); },
    flipCard: flipCard,
    nextCard: function() { studyIdx = (studyIdx + 1) % studyDeck.length; renderCard(); },
    prevCard: function() { studyIdx = (studyIdx - 1 + studyDeck.length) % studyDeck.length; renderCard(); },
    reshuffleDeck: function() { studyDeck = shuffle(studyDeck); studyIdx = 0; renderCard(); },
    render: render
  };

  // ── DECK ───────────────────────────────────────────────
  function toggleWord(w) {
    if (deck[w.kr]) delete deck[w.kr];
    else deck[w.kr] = true;
    animateBadge();
    renderDeck();
    render();
  }

  function animateBadge() {
    var b = document.getElementById('deckCountBadge');
    b.classList.remove('pop');
    void b.offsetWidth;
    b.classList.add('pop');
    setTimeout(function() { b.classList.remove('pop'); }, 200);
  }

  function renderDeck() {
    var container = document.getElementById('deckChips');
    var keys = Object.keys(deck);
    document.getElementById('deckCountBadge').textContent = keys.length;

    if (keys.length === 0) {
      container.innerHTML = '<span class="empty-deck">no words yet — click any word above to add it</span>';
      return;
    }

    container.innerHTML = '';
    keys.forEach(function(kr) {
      var w = WORDS.find(function(x) { return x.kr === kr; });
      if (!w) return;

      var chip = document.createElement('div');
      chip.className = 'deck-chip';

      var kr_span = document.createElement('span');
      kr_span.style.fontFamily = "'Noto Sans KR', sans-serif";
      kr_span.textContent = w.kr;

      var ro_span = document.createElement('span');
      ro_span.className = 'chip-ro-small';
      ro_span.textContent = w.ro;

      var btn = document.createElement('button');
      btn.className = 'deck-chip-remove';
      btn.textContent = '×';
      btn.setAttribute('aria-label', 'remove ' + w.ro);
      btn.onclick = function() {
        delete deck[kr];
        renderDeck();
        render();
      };

      chip.appendChild(kr_span);
      chip.appendChild(ro_span);
      chip.appendChild(btn);
      container.appendChild(chip);
    });
  }

  // ── STUDY ──────────────────────────────────────────────
  function openStudy() {
    var keys = Object.keys(deck);
    if (keys.length === 0) { alert('Add at least one word to your deck first!'); return; }
    studyDeck = shuffle(keys.map(function(kr) {
      return WORDS.find(function(w) { return w.kr === kr; });
    }).filter(Boolean));
    studyIdx = 0;
    studyFlipped = false;
    renderCard();
    document.getElementById('modalOverlay').classList.add('open');
  }

  function closeStudy() {
    document.getElementById('modalOverlay').classList.remove('open');
  }

  function renderCard() {
    var w = studyDeck[studyIdx];
    document.getElementById('cardFront').innerHTML =
      '<div class="fc-kr">' + w.kr + '</div>' +
      '<div class="fc-ro">' + w.ro + '</div>' +
      '<div class="fc-pos">' + w.pos + '</div>';
    document.getElementById('cardBack').innerHTML =
      '<div class="fc-meaning">' + w.meaning + '</div>' +
      '<div class="fc-example">' + w.example + '</div>';
    document.getElementById('modalProgress').textContent = (studyIdx + 1) + ' / ' + studyDeck.length;
    document.getElementById('modalMeta').textContent = w.pos;
    document.getElementById('flashCard').classList.remove('flipped');
    studyFlipped = false;
  }

  function flipCard() {
    studyFlipped = !studyFlipped;
    document.getElementById('flashCard').classList.toggle('flipped', studyFlipped);
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('modalOverlay').classList.contains('open')) return;
    if (e.key === 'Escape')     closeStudy();
    if (e.key === 'ArrowRight') App.nextCard();
    if (e.key === 'ArrowLeft')  App.prevCard();
    if (e.key === ' ')          { e.preventDefault(); flipCard(); }
  });

  document.getElementById('searchInput').oninput = render;

  buildGroupButtons();
  render();

}); // end window.load
