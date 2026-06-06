// ── KOREAN SENTENCE EXERCISES ─────────────────────────────────────────────────
// type: 'particle'   — choose the correct particle
//       'conjugate'  — choose the correct verb ending
//       'build'      — arrange blocks into correct sentence
//       'fill'       — fill the blank from context

const KOREAN_SENTENCES = [

  // ── PARTICLE exercises ──
  {
    type:'particle',
    english:'I go to school.',
    prompt:'나 학교 ___ 가요.',
    answer:'에',
    choices:['에','에서','을','이'],
    explanation:'"에" marks a destination or location. "에서" means "at" for actions happening there. Since we\'re going TO school, we use 에.',
    level:1
  },
  {
    type:'particle',
    english:'I study at the library.',
    prompt:'나는 도서관 ___ 공부해요.',
    answer:'에서',
    choices:['에','에서','를','도'],
    explanation:'"에서" marks where an action takes place. "에" marks direction/destination. Since studying happens AT the library, use 에서.',
    level:1
  },
  {
    type:'particle',
    english:'I eat rice.',
    prompt:'밥 ___ 먹어요.',
    answer:'을',
    choices:['을','이','에','도'],
    explanation:'"을/를" marks the object — what the action is done TO. 밥 ends in a consonant (ㅂ), so we use 을 not 를.',
    level:1
  },
  {
    type:'particle',
    english:'Rain is falling.',
    prompt:'비 ___ 와요.',
    answer:'가',
    choices:['가','는','을','에서'],
    explanation:'"이/가" marks the subject — who or what is doing the action. 비 ends in a vowel, so we use 가 not 이.',
    level:1
  },
  {
    type:'particle',
    english:'I like music too.',
    prompt:'나 ___ 음악을 좋아해요.',
    answer:'도',
    choices:['도','만','는','가'],
    explanation:'"도" means "also" or "too". It replaces 은/는 or 이/가 when you want to include yourself in something.',
    level:1
  },
  {
    type:'particle',
    english:'I only look at you.',
    prompt:'너 ___ 바라봐.',
    answer:'만',
    choices:['만','도','를','한테'],
    explanation:'"만" means "only". It attaches to the thing being limited — 너만 means "only you".',
    level:2
  },
  {
    type:'particle',
    english:'I gave it to my friend.',
    prompt:'친구 ___ 줬어.',
    answer:'한테',
    choices:['한테','에','에서','께'],
    explanation:'"한테" marks the recipient (casual). Use "께" with elders or people of higher status. "에" is for places, not people.',
    level:2
  },
  {
    type:'particle',
    english:'As for me, I\'m a student.',
    prompt:'나 ___ 학생이에요.',
    answer:'는',
    choices:['는','가','을','도'],
    explanation:'"은/는" marks the topic of the sentence. 나 ends in a vowel so we use 는. This sets "me" as what we\'re talking about.',
    level:1
  },
  {
    type:'particle',
    english:'I go with a friend.',
    prompt:'친구 ___ 가요.',
    answer:'랑',
    choices:['랑','한테','에','께'],
    explanation:'"이랑/랑" means "with" or "and" (casual). 친구 ends in a vowel so we use 랑. For formal writing use 와/과.',
    level:2
  },

  // ── CONJUGATION exercises ──
  {
    type:'conjugate',
    english:'I eat (polite present)',
    baseForm:'먹다',
    prompt:'나는 밥을 ___.',
    answer:'먹어요',
    choices:['먹어요','먹었어요','먹을 거예요','먹어'],
    explanation:'Polite present: remove 다, add 어요. Since 먹 has the vowel ㅓ, we use 어요 (not 아요).',
    level:1
  },
  {
    type:'conjugate',
    english:'I ate (polite past)',
    baseForm:'먹다',
    prompt:'어제 밥을 ___.',
    answer:'먹었어요',
    choices:['먹어요','먹었어요','먹을 거예요','먹었어'],
    explanation:'Polite past: add 었어요 after the stem. 먹 + 었어요 = 먹었어요.',
    level:2
  },
  {
    type:'conjugate',
    english:'I will eat (polite future)',
    baseForm:'먹다',
    prompt:'내일 밥을 ___.',
    answer:'먹을 거예요',
    choices:['먹어요','먹었어요','먹을 거예요','먹겠어요'],
    explanation:'Future intention: verb stem + 을 거예요. Since 먹 ends in ㄱ (consonant), use 을 거예요.',
    level:2
  },
  {
    type:'conjugate',
    english:'I go (casual present)',
    baseForm:'가다',
    prompt:'나 학교에 ___.',
    answer:'가',
    choices:['가','갔어','갈 거야','가요'],
    explanation:'Casual present: remove 다. 가다 → 가. (Short form, used with friends.)',
    level:1
  },
  {
    type:'conjugate',
    english:'I went (casual past)',
    baseForm:'가다',
    prompt:'어제 학교에 ___.',
    answer:'갔어',
    choices:['가','갔어','갈 거야','가요'],
    explanation:'Casual past: stem + 았어/었어. 가 has vowel ㅏ so use 았어 → 갔어 (contracted).',
    level:2
  },
  {
    type:'conjugate',
    english:'I will go (casual future)',
    baseForm:'가다',
    prompt:'내일 학교에 ___.',
    answer:'갈 거야',
    choices:['가','갔어','갈 거야','가겠어'],
    explanation:'Casual future: stem + ㄹ/을 거야. 가 ends in a vowel so add ㄹ → 갈 거야.',
    level:2
  },
  {
    type:'conjugate',
    english:'Don\'t cry (casual command)',
    baseForm:'울다',
    prompt:'___ 마.',
    answer:'울지',
    choices:['울지','울어','울었','울'],
    explanation:'Negative command: verb stem + 지 마. So 울다 → 울지 마 = don\'t cry.',
    level:3
  },
  {
    type:'conjugate',
    english:'Let\'s go together (casual suggestion)',
    baseForm:'가다',
    prompt:'같이 ___.',
    answer:'가자',
    choices:['가자','가요','갑시다','가'],
    explanation:'Casual suggestion "let\'s": stem + 자. 가자 = let\'s go. Formal equivalent is 갑시다.',
    level:2
  },

  // ── BUILD exercises ──
  {
    type:'build',
    english:'I like Korean food.',
    blocks:['나는','한국','음식을','좋아해요','음식','이','을'],
    answer:['나는','한국','음식을','좋아해요'],
    explanation:'Korean is SOV: Subject (나는) → Object (한국 음식을) → Verb (좋아해요). Notice how the verb always comes last.',
    level:1
  },
  {
    type:'build',
    english:'I study Korean at home every day.',
    blocks:['나는','집에서','매일','한국어를','공부해요','학교에','를'],
    answer:['나는','집에서','매일','한국어를','공부해요'],
    explanation:'Time words (매일) and place words (집에서) come before the object and verb. Subject → Place → Time → Object → Verb.',
    level:2
  },
  {
    type:'build',
    english:'My friend gave a gift to me.',
    blocks:['친구가','나한테','선물을','줬어','선물','을','에게'],
    answer:['친구가','나한테','선물을','줬어'],
    explanation:'Subject (친구가) → Recipient (나한테) → Object (선물을) → Verb (줬어). Recipients come before objects in Korean.',
    level:2
  },

  // ── FILL exercises ──
  {
    type:'fill',
    english:'___ do you know? (casual)',
    prompt:'___ 알아?',
    answer:'뭐',
    choices:['뭐','무엇을','누구','어디'],
    explanation:'"뭐" is the casual form of "what" — short for 무엇. In casual speech 뭐 is much more natural.',
    level:1
  },
  {
    type:'fill',
    english:'Why are you like that?',
    prompt:'___ 그래?',
    answer:'왜',
    choices:['왜','어떻게','언제','어디'],
    explanation:'"왜" = why. It never changes form and always comes near the start of the question.',
    level:1
  },
  {
    type:'fill',
    english:'Where are you going?',
    prompt:'___ 가?',
    answer:'어디',
    choices:['어디','언제','왜','어떻게'],
    explanation:'"어디" = where. Like 왜, it comes before the verb.',
    level:1
  },
];
