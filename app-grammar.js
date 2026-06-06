// ── GRAMMAR DATA ──────────────────────────────────────────────────────────────

const GRAMMAR = {
  korean: [
    {
      title: 'Sentence order: SOV',
      short: 'The verb always goes last',
      body: 'English is SVO: "I eat rice." Korean is SOV: "I rice eat" (나는 밥을 먹어요). The verb ALWAYS comes at the end. This is the single most important structural rule in Korean — every sentence follows it, no exceptions.',
      example: '나는 학교에서 한국어를 공부해요.\nI [나는] + at school [학교에서] + Korean [한국어를] + study [공부해요].\n→ "I study Korean at school."',
      level: 1
    },
    {
      title: 'Particles: the backbone of Korean',
      short: 'Small tags that show each word\'s job',
      body: 'Korean doesn\'t rely on word order to show who does what — it uses particles attached to nouns.\n\n은/는 = topic marker ("as for...")\n이/가 = subject marker (who does the action)\n을/를 = object marker (what receives the action)\n에 = to / at (place or time)\n에서 = at (where an action happens)\n도 = also / too\n만 = only\n랑/이랑 = with / and (casual)\n와/과 = with / and (formal)',
      example: '나는 학교에서 밥을 먹어요.\n나(I) + 는(topic) + 학교(school) + 에서(at) + 밥(rice) + 을(object) + 먹어요(eat).',
      level: 1
    },
    {
      title: 'Formality: 반말 vs 존댓말',
      short: 'Korean has two main speech levels',
      body: 'Korean speakers switch registers constantly based on relationship, age, and situation.\n\n반말 (casual): close friends, younger people, song lyrics\n→ 먹어, 가, 좋아\n\n존댓말 (polite): strangers, elders, at work, meeting someone new\n→ 먹어요, 가요, 좋아요\n\nUsing casual speech with someone you just met is rude. When in doubt, add 요.',
      example: 'Casual (to a friend): 밥 먹어? — Have you eaten?\nPolite (to a stranger): 식사하셨어요? — Have you had a meal?',
      level: 1
    },
    {
      title: 'Verb endings: tense',
      short: 'Present, past, and future',
      body: 'Present polite: stem + 아요/어요\nPast polite: stem + 았어요/었어요\nFuture polite: stem + ㄹ/을 거예요\n\nVowel harmony rule:\nIf last vowel in stem is ㅏ or ㅗ → use 아요/았어요\nAll other vowels → use 어요/었어요',
      example: '가다 (go): 가요 / 갔어요 / 갈 거예요\n먹다 (eat): 먹어요 / 먹었어요 / 먹을 거예요\n오다 (come): 와요 / 왔어요 / 올 거예요',
      level: 2
    },
    {
      title: 'Negation',
      short: 'Two ways to say "not"',
      body: '안 + verb (short, casual):\n안 먹어요 = I\'m not eating\n\nVerb stem + 지 않아요 (longer, more formal):\n먹지 않아요 = I don\'t eat\n\nNegative command: verb stem + 지 마(요)\n먹지 마 = don\'t eat\n가지 마세요 = please don\'t go',
      example: '안 가요 = I\'m not going (casual)\n가지 않아요 = I\'m not going (formal)\n가지 마 = don\'t go (casual command)',
      level: 2
    },
    {
      title: 'Connecting clauses',
      short: '"And", "but", "because" in Korean',
      body: 'Korean connects clauses by changing the first verb ending, not with standalone conjunctions.\n\n"and then" (sequential): verb + 고\n"but": verb + 지만\n"because / so": verb + 아서/어서\n"in order to": verb + (으)러',
      example: '밥을 먹고 학교에 가요.\n→ I eat and then go to school.\n\n비가 와서 안 갔어요.\n→ Because it rained, I didn\'t go.',
      level: 3
    },
    {
      title: 'Honorifics',
      short: 'Speaking respectfully to elders',
      body: 'Add 시 to the verb stem when the subject is someone respected:\n가다 → 가세요 (you go / please go)\n먹다 → 드세요 (please eat)\n\nSpecial honorific vocabulary:\n먹다 → 드시다 (to eat)\n있다 → 계시다 (to be present)\n이름 → 성함 (name)',
      example: '선생님, 식사하셨어요?\n→ Teacher, have you had a meal?\n\n(Not: 밥 먹었어요? — too casual for a teacher)',
      level: 3
    },
  ],

  italian: [
    {
      title: 'Verb conjugation: the key to Italian',
      short: 'Endings change for every pronoun',
      body: 'Italian verbs change their ending to show who is doing the action. This is why Italians often drop the pronoun entirely — the ending already tells you.\n\n-ARE (parlare — to speak):\nparlo, parli, parla, parliamo, parlate, parlano\n\n-ERE (vedere — to see):\nvedo, vedi, vede, vediamo, vedete, vedono\n\n-IRE (dormire — to sleep):\ndormo, dormi, dorme, dormiamo, dormite, dormono\n\nMost important irregulars to memorize first: essere, avere, fare, andare, venire, volere, potere, dovere.',
      example: 'Parli italiano? → Do you speak Italian?\n(No "tu" needed — "parli" already means "you speak")',
      level: 1
    },
    {
      title: 'Essere vs Avere',
      short: 'Two verbs for "to be" and "to have"',
      body: 'ESSERE (to be) — for identity, nationality, personality, location of places:\nSono stanco = I am tired\nÈ italiana = She is Italian\n\nAVERE (to have) — for possession AND physical/emotional states:\nHo fame = I\'m hungry (lit: I have hunger)\nHo freddo = I\'m cold\nHo paura = I\'m scared\nHo 25 anni = I\'m 25 years old\n\nThis trips up English speakers because Italian uses "have" where English uses "be".',
      example: 'Sono stanco → I am tired (essere)\nHo sonno → I am sleepy (avere, lit: I have sleepiness)\nHo sete → I am thirsty (avere)',
      level: 1
    },
    {
      title: 'Adjective agreement',
      short: 'Adjectives match the noun\'s gender and number',
      body: 'In Italian, adjectives must agree in gender and number with the noun they describe.\n\n-o/-a/-i/-e pattern (most adjectives):\nun ragazzo bravo (a good boy)\nuna ragazza brava (a good girl)\ndue ragazzi bravi (two good boys)\ndue ragazze brave (two good girls)\n\n-e/-i pattern (adjectives ending in -e):\nun uomo felice / due uomini felici\nuna donna felice / due donne felici',
      example: 'bello / bella / belli / belle\nÈ un bel ragazzo. → He\'s a handsome guy.\nÈ una bella ragazza. → She\'s a beautiful girl.',
      level: 1
    },
    {
      title: 'Piacere: "I like" works backwards',
      short: 'The most confusing construction for English speakers',
      body: '"Mi piace" literally means "it is pleasing to me." The thing you like is the subject, not you.\n\nmi piace + singular noun or infinitive\nmi piacciono + plural nouns\n\nTo say who likes:\nmi = to me\nti = to you\ngli = to him\nle = to her\nci = to us\nvi = to you all',
      example: 'Ti piace la musica? → Do you like music?\nMi piacciono i film. → I like films.\nNon mi piace. → I don\'t like it.\nGli piace ballare. → He likes dancing.',
      level: 2
    },
    {
      title: 'Past tense: Passato Prossimo',
      short: 'The most common past tense',
      body: 'Formed with avere or essere + past participle.\n\nParticiples:\n-ARE → -ato (mangiare → mangiato)\n-ERE → -uto (avere → avuto)\n-IRE → -ito (dormire → dormito)\n\nMost verbs use AVERE. But motion and change-of-state verbs use ESSERE:\nandare, venire, arrivare, partire, nascere, morire, restare, diventare...\n\nWith ESSERE the participle agrees with the subject:\nSono andato (m) / Sono andata (f)',
      example: 'Ho mangiato → I ate (avere)\nSono andato → I went (essere, masculine)\nSiamo arrivati → We arrived (essere, plural)',
      level: 2
    },
    {
      title: 'Formality: tu vs Lei',
      short: 'When to be formal',
      body: 'TU (informal): friends, family, children, peers your age\n→ Come stai? / Parli italiano?\n\nLEI (formal): strangers, elders, in shops and offices\n→ Come sta? / Parla italiano?\nNote: Lei (formal you) uses the same verb form as lei (she).\n\nSALVE is the safe neutral greeting for strangers — neither as casual as ciao nor as stiff as buongiorno.\n\nCIAO is casual only. Don\'t say it to your professor or a shop owner you don\'t know.',
      example: 'To a friend: Ciao, come stai?\nTo a professor: Buongiorno, come sta?\nIn a shop: Mi scusi, quanto costa questo?',
      level: 1
    },
    {
      title: 'Articles: il, lo, la, i, gli, le',
      short: 'Every noun has a gender and needs an article',
      body: 'Masculine singular:\nil — before most consonants (il ragazzo)\nlo — before s+consonant, z, ps, gn (lo studente)\nl\' — before vowels (l\'amico)\n\nFeminine singular:\nla — before consonants (la ragazza)\nl\' — before vowels (l\'amica)\n\nPlural:\ni / gli (masculine)\nle (feminine)',
      example: 'il caffè → the coffee\nlo zaino → the backpack\nl\'amore → love\nla musica → the music\ngli amici → the friends',
      level: 1
    },
  ]
};

// ── GRAMMAR RENDERER ─────────────────────────────────────────────────────────

function renderGrammar(container) {
  const notes = (GRAMMAR[curLang]) || [];
  container.innerHTML = '';

  if (!notes || notes.length === 0) {
    container.innerHTML = '<div class="empty-msg">Grammar notes coming soon.</div>';
    return;
  }

  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:1.5rem 2rem;display:flex;flex-direction:column;gap:10px;';

  const intro = document.createElement('div');
  intro.className = 't-muted';
  intro.style.cssText = 'font-size:.75rem;padding-bottom:.5rem;';
  intro.textContent = notes.length + ' grammar topics — click any card to expand';
  wrap.appendChild(intro);

  const levelColors = ['#7ac8a0','#c8a87a','#c87aa8'];
  const levelLabels = ['beginner','intermediate','advanced'];

  notes.forEach(function(note) {
    const card = document.createElement('div');
    card.className = 'grammar-card surface';

    const hdr = document.createElement('div');
    hdr.className = 'grammar-hdr';

    const left = document.createElement('div');
    left.className = 'grammar-left';

    const lvl = document.createElement('span');
    lvl.className = 'grammar-level';
    lvl.style.color = levelColors[(note.level||1)-1];
    lvl.textContent = levelLabels[(note.level||1)-1];

    const title = document.createElement('div');
    title.className = 'grammar-title';
    title.textContent = note.title;

    const shortEl = document.createElement('div');
    shortEl.className = 'grammar-short t-muted';
    shortEl.textContent = note.short;

    left.appendChild(lvl);
    left.appendChild(title);
    left.appendChild(shortEl);

    const chev = document.createElement('span');
    chev.className = 'sec-chev';
    chev.textContent = '▾';

    hdr.appendChild(left);
    hdr.appendChild(chev);

    const body = document.createElement('div');
    body.className = 'grammar-body';
    body.style.display = 'none';

    const bodyText = document.createElement('div');
    bodyText.className = 'grammar-text';
    bodyText.textContent = note.body;

    const exBox = document.createElement('div');
    exBox.className = 'grammar-example';
    exBox.innerHTML = '<div class="ex-label t-muted">example</div><pre class="ex-pre">' + note.example + '</pre>';

    const speakBtn = document.createElement('button');
    speakBtn.className = 'ubtn';
    speakBtn.style.marginTop = '8px';
    speakBtn.textContent = '▶ hear example';
    speakBtn.onclick = function() {
      var firstLine = note.example.split('\n')[0].split('→')[0].trim();
      speak(firstLine, curLang);
    };

    body.appendChild(bodyText);
    body.appendChild(exBox);
    body.appendChild(speakBtn);

    hdr.onclick = function() {
      var open = body.style.display === 'none';
      body.style.display = open ? 'block' : 'none';
      chev.textContent = open ? '▴' : '▾';
      card.classList.toggle('grammar-open', open);
    };

    card.appendChild(hdr);
    card.appendChild(body);
    wrap.appendChild(card);
  });

  container.appendChild(wrap);
}
