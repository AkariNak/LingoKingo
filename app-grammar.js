// ── GRAMMAR TAB ───────────────────────────────────────────────────────────────

function renderGrammar(container) {
  const g = LANGS[curLang].grammar; const notes = (typeof g === 'function' ? g() : g) || [];
  container.innerHTML = '';

  if (notes.length === 0) {
    container.innerHTML = '<div class="empty-msg">Grammar notes coming soon for this language.</div>';
    return;
  }

  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:1.5rem 2rem;display:flex;flex-direction:column;gap:10px;';

  const intro = document.createElement('div');
  intro.style.cssText = 'font-size:.75rem;padding-bottom:.5rem;';
  intro.className = 't-muted';
  intro.textContent = `${notes.length} grammar topics — click any card to expand`;
  wrap.appendChild(intro);

  const levelColors = ['#7ac8a0','#c8a87a','#c87aa8'];

  notes.forEach((note, i) => {
    const card = document.createElement('div');
    card.className = 'grammar-card surface';
    const isOpen = false;

    const hdr = document.createElement('div');
    hdr.className = 'grammar-hdr';

    const left = document.createElement('div');
    left.className = 'grammar-left';

    const lvl = document.createElement('span');
    lvl.className = 'grammar-level';
    lvl.style.color = levelColors[(note.level||1)-1];
    lvl.textContent = ['beginner','intermediate','advanced'][(note.level||1)-1];

    const title = document.createElement('div');
    title.className = 'grammar-title';
    title.textContent = note.title;

    const short = document.createElement('div');
    short.className = 'grammar-short t-muted';
    short.textContent = note.short;

    left.appendChild(lvl);
    left.appendChild(title);
    left.appendChild(short);

    const chev = document.createElement('span');
    chev.className = 'sec-chev';
    chev.textContent = '▾';

    hdr.appendChild(left);
    hdr.appendChild(chev);

    const body = document.createElement('div');
    body.className = 'grammar-body';
    body.style.display = 'none';

    // body text
    const bodyText = document.createElement('div');
    bodyText.className = 'grammar-text';
    bodyText.textContent = note.body;

    // example box
    const exBox = document.createElement('div');
    exBox.className = 'grammar-example';
    exBox.innerHTML = `<div class="ex-label t-muted">example</div><pre class="ex-pre">${note.example}</pre>`;

    // speak example button
    const speakBtn = document.createElement('button');
    speakBtn.className = 'ubtn';
    speakBtn.style.marginTop = '8px';
    speakBtn.textContent = '▶ hear example';
    speakBtn.onclick = () => {
      const firstLine = note.example.split('\n')[0].split('→')[0].trim();
      speak(firstLine, curLang);
    };

    body.appendChild(bodyText);
    body.appendChild(exBox);
    body.appendChild(speakBtn);

    const toggle = () => {
      const open = body.style.display === 'none';
      body.style.display = open ? 'block' : 'none';
      chev.textContent   = open ? '▴' : '▾';
      card.classList.toggle('grammar-open', open);
    };
    hdr.onclick = toggle;

    card.appendChild(hdr);
    card.appendChild(body);
    wrap.appendChild(card);
  });

  container.appendChild(wrap);
}
