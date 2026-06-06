// ── PRACTICE TAB ──────────────────────────────────────────────────────────────

let practiceQueue  = [];
let practiceIdx    = 0;
let practiceScore  = {correct:0, total:0};
let practiceFilter = 'all'; // 'all' | 'particle' | 'conjugate' | 'build' | 'fill'
let selectedBlocks = [];
let answered       = false;

function renderPractice(container) {
  container.innerHTML = `
    <div class="ctrl">
      <div class="ctrl-row" style="gap:6px;flex-wrap:wrap">
        <span class="ctrl-label">exercise type:</span>
        ${['all','particle','conjugate','build','fill'].map(t =>
          `<button class="gbtn${practiceFilter===t?' on':''}" onclick="setPracticeFilter('${t}')">${t}</button>`
        ).join('')}
      </div>
    </div>
    <div id="practiceArea" style="padding:1.5rem 2rem"></div>
  `;
  loadPracticeQueue();
  showNextExercise();
}

function setPracticeFilter(f) {
  practiceFilter = f;
  document.querySelectorAll('#practiceArea').forEach(el=>el.innerHTML='');
  document.querySelectorAll('.gbtn').forEach(b => b.classList.toggle('on', b.textContent === f));
  loadPracticeQueue();
  showNextExercise();
}

function loadPracticeQueue() {
  const s = LANGS[curLang].sentences; const all = (typeof s === 'function' ? s() : s) || [];
  let filtered = practiceFilter === 'all' ? all : all.filter(s => s.type === practiceFilter);
  if (filtered.length === 0) filtered = all;
  practiceQueue = shuffle(filtered);
  practiceIdx   = 0;
}

function showNextExercise() {
  if (practiceQueue.length === 0) {
    document.getElementById('practiceArea').innerHTML = '<div class="empty-msg">No exercises available for this language yet.</div>';
    return;
  }
  if (practiceIdx >= practiceQueue.length) {
    practiceIdx = 0;
    practiceQueue = shuffle(practiceQueue);
  }
  const ex = practiceQueue[practiceIdx];
  answered = false;
  selectedBlocks = [];

  const area = document.getElementById('practiceArea');
  if (!area) return;

  area.innerHTML = '';

  // score strip
  const score = document.createElement('div');
  score.className = 'practice-score';
  score.innerHTML = `<span class="score-num">${practiceScore.correct}/${practiceScore.total}</span><span class="score-lbl">correct</span><button class="ubtn" style="margin-left:auto" onclick="practiceScore={correct:0,total:0};showNextExercise()">reset</button>`;
  area.appendChild(score);

  // exercise card
  const card = document.createElement('div');
  card.className = 'exercise-card surface';

  // type + level badge
  const meta = document.createElement('div');
  meta.className = 'ex-meta';
  const typeColors = {particle:'#7ac8a0',conjugate:'#7a8cc8',build:'#c8a87a',fill:'#c87aa8'};
  meta.innerHTML = `<span class="ex-type" style="color:${typeColors[ex.type]||'#888'}">${ex.type}</span><span class="ex-level">level ${ex.level}</span>`;
  card.appendChild(meta);

  // english meaning
  const eng = document.createElement('div');
  eng.className = 'ex-english';
  eng.textContent = ex.english;
  card.appendChild(eng);

  // base form if conjugation
  if (ex.baseForm) {
    const bf = document.createElement('div');
    bf.className = 'ex-base';
    bf.textContent = `base: ${ex.baseForm}`;
    card.appendChild(bf);
  }

  // prompt
  const prompt = document.createElement('div');
  prompt.className = 'ex-prompt';
  prompt.id = 'exPrompt';
  card.appendChild(prompt);

  // answer area
  const ansArea = document.createElement('div');
  ansArea.className = 'ex-answer-area';
  ansArea.id = 'ansArea';
  card.appendChild(ansArea);

  // choices / blocks
  const choicesDiv = document.createElement('div');
  choicesDiv.className = 'ex-choices';
  choicesDiv.id = 'choicesDiv';
  card.appendChild(choicesDiv);

  // feedback
  const feedback = document.createElement('div');
  feedback.className = 'ex-feedback';
  feedback.id = 'exFeedback';
  feedback.style.display = 'none';
  card.appendChild(feedback);

  // next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'abtn accent';
  nextBtn.style.cssText = 'width:100%;margin-top:1rem;display:none';
  nextBtn.id = 'exNextBtn';
  nextBtn.textContent = 'next exercise →';
  nextBtn.onclick = () => { practiceIdx++; showNextExercise(); };
  card.appendChild(nextBtn);

  area.appendChild(card);

  // Render by type
  if (ex.type === 'build') renderBuildExercise(ex);
  else renderChoiceExercise(ex);
}

function renderChoiceExercise(ex) {
  const prompt = document.getElementById('exPrompt');
  prompt.innerHTML = ex.prompt.replace('___', '<span class="blank">___</span>');

  const choices = document.getElementById('choicesDiv');
  choices.innerHTML = '';
  const shuffled = shuffle(ex.choices);
  shuffled.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c;
    btn.onclick = () => submitChoiceAnswer(c, ex);
    choices.appendChild(btn);
  });
}

function submitChoiceAnswer(chosen, ex) {
  if (answered) return;
  answered = true;
  practiceScore.total++;
  const correct = chosen === ex.answer;
  if (correct) practiceScore.correct++;

  // highlight choices
  document.querySelectorAll('.choice-btn').forEach(btn => {
    if (btn.textContent === ex.answer) btn.classList.add('correct');
    else if (btn.textContent === chosen && !correct) btn.classList.add('wrong');
    btn.onclick = null;
  });

  // show filled prompt
  const prompt = document.getElementById('exPrompt');
  prompt.innerHTML = ex.prompt.replace('___', `<span class="answer-fill" style="color:${correct?'#7ac8a0':'#c87a7a'}">${chosen}</span>`);

  showFeedback(correct, ex);
}

function renderBuildExercise(ex) {
  const prompt = document.getElementById('exPrompt');
  prompt.innerHTML = '<span style="opacity:.5;font-size:.75rem">arrange the blocks in the correct order:</span>';

  const ansArea = document.getElementById('ansArea');
  ansArea.innerHTML = '<div class="build-slots" id="buildSlots"><span class="slot-hint">tap blocks below to place them here</span></div>';

  const choices = document.getElementById('choicesDiv');
  choices.innerHTML = '';

  // only show the correct blocks + 2-3 distractors
  const toShow = shuffle(ex.blocks);
  toShow.forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'block-btn';
    btn.textContent = block;
    btn.dataset.word = block;
    btn.onclick = () => selectBlock(btn, block, ex);
    choices.appendChild(btn);
  });
}

function selectBlock(btn, block, ex) {
  if (answered) return;
  if (btn.disabled) return;

  btn.disabled = true;
  btn.style.opacity = '0.35';
  selectedBlocks.push(block);

  const slots = document.getElementById('buildSlots');
  // remove hint
  slots.querySelector('.slot-hint')?.remove();

  const chip = document.createElement('span');
  chip.className = 'placed-block';
  chip.textContent = block;
  chip.onclick = () => {
    // allow removing last placed block
    if (answered) return;
    const idx = selectedBlocks.lastIndexOf(block);
    if (idx >= 0) {
      selectedBlocks.splice(idx, 1);
      chip.remove();
      btn.disabled = false;
      btn.style.opacity = '1';
      if (slots.children.length === 0) slots.innerHTML = '<span class="slot-hint">tap blocks below to place them here</span>';
    }
  };
  slots.appendChild(chip);

  // auto-check when enough blocks placed
  if (selectedBlocks.length === ex.answer.length) {
    setTimeout(() => checkBuildAnswer(ex), 300);
  }
}

function checkBuildAnswer(ex) {
  if (answered && selectedBlocks.length < ex.answer.length) return;
  answered = true;
  practiceScore.total++;

  const correct = selectedBlocks.join('|') === ex.answer.join('|');
  if (correct) practiceScore.correct++;

  document.querySelectorAll('.placed-block').forEach((chip, i) => {
    chip.style.color = correct ? '#7ac8a0' : (chip.textContent === ex.answer[i] ? '#7ac8a0' : '#c87a7a');
  });

  if (!correct) {
    const slots = document.getElementById('buildSlots');
    const ans = document.createElement('div');
    ans.style.cssText = 'margin-top:8px;font-size:.75rem;color:#7ac8a0';
    ans.textContent = '✓ ' + ex.answer.join(' ');
    slots.parentNode.insertBefore(ans, slots.nextSibling);
  }

  showFeedback(correct, ex);
}

function showFeedback(correct, ex) {
  const fb = document.getElementById('exFeedback');
  fb.style.display = 'block';
  fb.className = 'ex-feedback ' + (correct ? 'fb-correct' : 'fb-wrong');
  fb.innerHTML = `
    <div class="fb-result">${correct ? '✓ correct' : '✗ not quite'}</div>
    <div class="fb-explanation">${ex.explanation}</div>
  `;

  // update score display
  const sn = document.querySelector('.score-num');
  if (sn) sn.textContent = `${practiceScore.correct}/${practiceScore.total}`;

  document.getElementById('exNextBtn').style.display = 'block';
}
