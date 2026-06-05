// ─────────────────────────────────────────────────
//  KOREAN FLASHCARD DICTIONARY
//  Each entry: { kr, ro, meaning, example, pos, freq }
//  pos:  verb | noun | adjective | adverb | pronoun | particle | expression
//  freq: 1–10 (10 = most common/essential)
// ─────────────────────────────────────────────────

const WORDS = [

  // ══════════════════════════════
  //  MAGNETIC by ILLIT — full song vocab
  // ══════════════════════════════
  { kr:"눈",        ro:"nun",          meaning:"eye / eyes",                        example:"눈이 예뻐요 — your eyes are pretty",               pos:"noun",       freq:9 },
  { kr:"빠져",      ro:"ppajyeo",      meaning:"falling into / drawn in",            example:"나 빠져 — I'm falling for you",                   pos:"verb",       freq:7 },
  { kr:"느껴",      ro:"neukkyeo",     meaning:"feeling / I feel",                   example:"뭔가 느껴 — I feel something",                    pos:"verb",       freq:7 },
  { kr:"자꾸",      ro:"jakku",        meaning:"repeatedly / keeps happening",       example:"자꾸 생각나 — keeps coming to mind",              pos:"adverb",     freq:7 },
  { kr:"끌려",      ro:"kkeullyeo",    meaning:"being pulled / attracted",           example:"네게 끌려 — being pulled toward you",             pos:"verb",       freq:6 },
  { kr:"설레",      ro:"seolle",       meaning:"heart fluttering / excited feeling", example:"설레는 기분 — a heart-fluttering feeling",        pos:"verb",       freq:6 },
  { kr:"떨려",      ro:"tteollyeo",    meaning:"trembling / shaking / heart racing", example:"심장이 떨려 — my heart is trembling",             pos:"verb",       freq:6 },
  { kr:"자석",      ro:"jaseok",       meaning:"magnet",                             example:"자석처럼 끌려 — pulled like a magnet",            pos:"noun",       freq:4 },
  { kr:"순간",      ro:"sungan",       meaning:"moment / instant",                   example:"그 순간 — that moment",                           pos:"noun",       freq:8 },
  { kr:"가까이",    ro:"gakkai",       meaning:"close / near / nearby",              example:"가까이 와 — come closer",                         pos:"adverb",     freq:7 },
  { kr:"바라봐",    ro:"barabwa",      meaning:"look at / gaze at",                  example:"나를 바라봐 — look at me",                        pos:"verb",       freq:6 },
  { kr:"심장",      ro:"simjang",      meaning:"heart (organ) / heartbeat",          example:"심장이 뛰어 — my heart is beating",               pos:"noun",       freq:6 },
  { kr:"머릿속",    ro:"meoritssok",   meaning:"inside one's head / mind",           example:"머릿속이 복잡해 — my head is a mess",             pos:"noun",       freq:5 },
  { kr:"두근두근",  ro:"dugeundugeun", meaning:"thump-thump (heartbeat sound)",      example:"두근두근 떨려 — thump thump, I'm trembling",      pos:"expression", freq:4 },
  { kr:"뻔해",      ro:"ppeonhae",     meaning:"obvious / predictable / transparent",example:"너무 뻔해 — so obvious",                          pos:"adjective",  freq:5 },
  { kr:"자꾸만",    ro:"jakkuman",     meaning:"just keeps on / over and over",      example:"자꾸만 생각나 — just keeps coming to mind",       pos:"adverb",     freq:5 },
  { kr:"온통",      ro:"ontong",       meaning:"entirely / all over / completely",   example:"온통 너야 — it's all you",                        pos:"adverb",     freq:5 },
  { kr:"모르게",    ro:"moreuge",      meaning:"unknowingly / without realizing",    example:"나도 모르게 — without even realizing it myself",  pos:"adverb",     freq:5 },
  { kr:"멈춰",      ro:"meomchwo",     meaning:"stop / halt",                        example:"멈춰 서 — stop right there",                      pos:"verb",       freq:6 },
  { kr:"달라",      ro:"dalla",        meaning:"different / unlike / give it to me", example:"뭔가 달라 — something's different",               pos:"adjective",  freq:7 },
  { kr:"그냥",      ro:"geunyang",     meaning:"just / simply / without reason",     example:"그냥 좋아 — I just like it",                      pos:"adverb",     freq:9 },
  { kr:"왠지",      ro:"waenji",       meaning:"for some reason / somehow",          example:"왠지 좋아 — I like it for some reason",           pos:"adverb",     freq:7 },
  { kr:"처음",      ro:"cheoeum",      meaning:"first time / beginning",             example:"처음 만났을 때 — when we first met",              pos:"noun",       freq:8 },
  { kr:"익숙해",    ro:"iksukhae",     meaning:"familiar / used to / accustomed",    example:"점점 익숙해져 — getting more and more familiar",  pos:"adjective",  freq:6 },

  // ══════════════════════════════
  //  PRONOUNS
  // ══════════════════════════════
  { kr:"나",    ro:"na",     meaning:"I / me (informal)",             example:"나 좋아해 — I like you",                      pos:"pronoun", freq:10 },
  { kr:"너",    ro:"neo",    meaning:"you (informal)",                example:"너 때문에 — because of you",                  pos:"pronoun", freq:10 },
  { kr:"우리",  ro:"uri",    meaning:"we / us / our",                 example:"우리 같이 가자 — let's go together",          pos:"pronoun", freq:10 },
  { kr:"저",    ro:"jeo",    meaning:"I / me (formal/humble)",        example:"저는 학생이에요 — I am a student",            pos:"pronoun", freq:9  },
  { kr:"당신",  ro:"dangsin",meaning:"you (formal/written)",          example:"당신을 사랑해요 — I love you",                pos:"pronoun", freq:7  },
  { kr:"그",    ro:"geu",    meaning:"he / that / the",               example:"그 사람 — that person",                       pos:"pronoun", freq:8  },
  { kr:"그녀",  ro:"geunyeo",meaning:"she / her",                     example:"그녀는 예뻐 — she is pretty",                 pos:"pronoun", freq:7  },
  { kr:"이것",  ro:"igeot",  meaning:"this (thing)",                  example:"이것은 뭐야? — what is this?",                pos:"pronoun", freq:8  },
  { kr:"저것",  ro:"jeogeot",meaning:"that (thing, far away)",        example:"저것은 뭐야? — what is that?",                pos:"pronoun", freq:7  },
  { kr:"누구",  ro:"nugu",   meaning:"who",                           example:"누구야? — who is it?",                        pos:"pronoun", freq:9  },
  { kr:"무엇",  ro:"mueot",  meaning:"what",                          example:"무엇을 원해? — what do you want?",            pos:"pronoun", freq:9  },
  { kr:"뭐",    ro:"mwo",    meaning:"what (casual short form)",      example:"뭐 해? — what are you doing?",               pos:"pronoun", freq:10 },

  // ══════════════════════════════
  //  NOUNS — body & emotion
  // ══════════════════════════════
  { kr:"마음",   ro:"maeum",    meaning:"heart / mind / feelings",      example:"내 마음 알아? — do you know my feelings?",    pos:"noun", freq:9 },
  { kr:"손",     ro:"son",      meaning:"hand",                          example:"손 잡아 — hold my hand",                    pos:"noun", freq:9 },
  { kr:"입",     ro:"ip",       meaning:"mouth / lips",                  example:"입술이 예뻐 — your lips are pretty",         pos:"noun", freq:8 },
  { kr:"얼굴",   ro:"eolgul",   meaning:"face",                          example:"얼굴이 예쁘다 — your face is pretty",        pos:"noun", freq:8 },
  { kr:"머리",   ro:"meori",    meaning:"head / hair",                   example:"머리가 아파 — my head hurts",                pos:"noun", freq:8 },
  { kr:"몸",     ro:"mom",      meaning:"body",                          example:"몸이 아파 — my body hurts",                  pos:"noun", freq:7 },
  { kr:"목소리", ro:"moksori",  meaning:"voice",                         example:"목소리가 예뻐 — your voice is beautiful",    pos:"noun", freq:7 },
  { kr:"눈물",   ro:"nunmul",   meaning:"tears",                         example:"눈물이 나 — tears are falling",              pos:"noun", freq:7 },
  { kr:"기억",   ro:"gieok",    meaning:"memory",                        example:"기억해? — do you remember?",                 pos:"noun", freq:7 },
  { kr:"꿈",     ro:"kkum",     meaning:"dream",                         example:"꿈 같아 — it's like a dream",               pos:"noun", freq:7 },
  { kr:"행복",   ro:"haengbok", meaning:"happiness",                     example:"행복해 — I'm happy",                         pos:"noun", freq:7 },
  { kr:"슬픔",   ro:"seulpeum", meaning:"sadness / sorrow",              example:"슬픔을 느껴 — I feel sadness",               pos:"noun", freq:5 },
  { kr:"사랑",   ro:"sarang",   meaning:"love",                          example:"사랑해 — I love you",                        pos:"noun", freq:10 },
  { kr:"기분",   ro:"gibun",    meaning:"feeling / mood",                example:"기분이 좋아 — I'm in a good mood",           pos:"noun", freq:8 },
  { kr:"감정",   ro:"gamjeong", meaning:"emotion / feeling",             example:"감정을 숨겨 — hiding my emotions",           pos:"noun", freq:6 },
  { kr:"힘",     ro:"him",      meaning:"strength / power / energy",     example:"힘을 내 — cheer up / draw strength",         pos:"noun", freq:8 },

  // ══════════════════════════════
  //  NOUNS — time & place
  // ══════════════════════════════
  { kr:"오늘",   ro:"oneul",    meaning:"today",                         example:"오늘 뭐 해? — what are you doing today?",    pos:"noun", freq:10 },
  { kr:"내일",   ro:"naeil",    meaning:"tomorrow",                      example:"내일 만나자 — let's meet tomorrow",           pos:"noun", freq:9  },
  { kr:"어제",   ro:"eoje",     meaning:"yesterday",                     example:"어제 뭐 했어? — what did you do yesterday?", pos:"noun", freq:9  },
  { kr:"지금",   ro:"jigeum",   meaning:"now / right now",               example:"지금 어디야? — where are you now?",           pos:"adverb",freq:10 },
  { kr:"여기",   ro:"yeogi",    meaning:"here / this place",             example:"여기 있어 — I'm here",                       pos:"noun", freq:9  },
  { kr:"거기",   ro:"geogi",    meaning:"there / that place",            example:"거기 있어? — are you there?",                pos:"noun", freq:8  },
  { kr:"집",     ro:"jip",      meaning:"home / house",                  example:"집에 가 — go home",                          pos:"noun", freq:10 },
  { kr:"학교",   ro:"hakgyo",   meaning:"school",                        example:"학교에 가요 — I go to school",               pos:"noun", freq:9  },
  { kr:"회사",   ro:"hoesa",    meaning:"company / office / workplace",  example:"회사에 가 — going to work",                  pos:"noun", freq:8  },
  { kr:"밤",     ro:"bam",      meaning:"night",                         example:"밤이 깊어 — the night is deep",              pos:"noun", freq:8  },
  { kr:"낮",     ro:"nat",      meaning:"daytime / noon",                example:"낮에 만나 — let's meet during the day",      pos:"noun", freq:7  },
  { kr:"봄",     ro:"bom",      meaning:"spring (season)",               example:"봄이 왔어 — spring has come",                pos:"noun", freq:7  },
  { kr:"별",     ro:"byeol",    meaning:"star",                          example:"별처럼 빛나 — shining like a star",          pos:"noun", freq:7  },
  { kr:"하늘",   ro:"haneul",   meaning:"sky",                           example:"하늘이 예쁘다 — the sky is pretty",          pos:"noun", freq:8  },
  { kr:"바람",   ro:"baram",    meaning:"wind / breeze",                 example:"바람이 불어 — the wind blows",               pos:"noun", freq:7  },
  { kr:"길",     ro:"gil",      meaning:"road / path / way",             example:"이 길을 따라 — follow this path",            pos:"noun", freq:8  },
  { kr:"세상",   ro:"sesang",   meaning:"world / the world",             example:"세상이 달라 보여 — the world looks different",pos:"noun", freq:7  },

  // ══════════════════════════════
  //  NOUNS — people & social
  // ══════════════════════════════
  { kr:"친구",   ro:"chingu",      meaning:"friend",                      example:"친구랑 놀아 — hanging out with friends",     pos:"noun", freq:10 },
  { kr:"가족",   ro:"gajok",       meaning:"family",                      example:"가족이 좋아 — I love my family",             pos:"noun", freq:9  },
  { kr:"남자",   ro:"namja",       meaning:"man / boy",                   example:"남자친구 — boyfriend",                       pos:"noun", freq:9  },
  { kr:"여자",   ro:"yeoja",       meaning:"woman / girl",                example:"여자친구 — girlfriend",                      pos:"noun", freq:9  },
  { kr:"사람",   ro:"saram",       meaning:"person / people",             example:"좋은 사람 — a good person",                  pos:"noun", freq:10 },
  { kr:"선생님", ro:"seonsaengnim",meaning:"teacher (honorific)",         example:"선생님 감사합니다 — thank you, teacher",     pos:"noun", freq:8  },
  { kr:"아이",   ro:"ai",          meaning:"child / kid",                 example:"아이처럼 — like a child",                    pos:"noun", freq:8  },
  { kr:"언니",   ro:"eonni",       meaning:"older sister (female speaker)",example:"언니, 도와줘 — sis, help me",              pos:"noun", freq:7  },
  { kr:"오빠",   ro:"oppa",        meaning:"older brother (female speaker)",example:"오빠 보고싶어 — I miss you, oppa",         pos:"noun", freq:7  },
  { kr:"엄마",   ro:"eomma",       meaning:"mom / mother",                example:"엄마 사랑해 — I love you, mom",              pos:"noun", freq:9  },
  { kr:"아빠",   ro:"appa",        meaning:"dad / father",                example:"아빠 보고싶어 — I miss you, dad",            pos:"noun", freq:9  },

  // ══════════════════════════════
  //  NOUNS — everyday objects & concepts
  // ══════════════════════════════
  { kr:"음악",   ro:"eumak",    meaning:"music",                         example:"음악을 들어 — listening to music",            pos:"noun", freq:9  },
  { kr:"노래",   ro:"norae",    meaning:"song",                          example:"노래 불러 — singing a song",                 pos:"noun", freq:9  },
  { kr:"영화",   ro:"yeonghwa", meaning:"movie / film",                  example:"영화 보러 가자 — let's go watch a movie",    pos:"noun", freq:9  },
  { kr:"음식",   ro:"eumsik",   meaning:"food",                          example:"음식이 맛있어 — the food is delicious",      pos:"noun", freq:9  },
  { kr:"물",     ro:"mul",      meaning:"water",                         example:"물 마셔 — drink some water",                 pos:"noun", freq:10 },
  { kr:"밥",     ro:"bap",      meaning:"rice / meal / food",            example:"밥 먹었어? — have you eaten?",               pos:"noun", freq:10 },
  { kr:"시간",   ro:"sigan",    meaning:"time / hour",                   example:"시간이 없어 — I don't have time",            pos:"noun", freq:10 },
  { kr:"돈",     ro:"don",      meaning:"money",                         example:"돈이 없어 — I don't have money",             pos:"noun", freq:9  },
  { kr:"책",     ro:"chaek",    meaning:"book",                          example:"책을 읽어 — reading a book",                 pos:"noun", freq:8  },
  { kr:"핸드폰", ro:"haendeupon",meaning:"mobile phone / cell phone",    example:"핸드폰 어디 있어? — where is my phone?",    pos:"noun", freq:9  },
  { kr:"사진",   ro:"sajin",    meaning:"photo / picture",               example:"사진 찍어줘 — take a photo for me",          pos:"noun", freq:8  },
  { kr:"이름",   ro:"ireum",    meaning:"name",                          example:"이름이 뭐야? — what's your name?",           pos:"noun", freq:9  },
  { kr:"말",     ro:"mal",      meaning:"words / speech / language",     example:"말이 안 나와 — words won't come out",        pos:"noun", freq:8  },
  { kr:"생각",   ro:"saenggak", meaning:"thought / idea",                example:"좋은 생각이야 — that's a good idea",         pos:"noun", freq:9  },
  { kr:"이유",   ro:"iyu",      meaning:"reason / cause",                example:"이유를 알아? — do you know the reason?",     pos:"noun", freq:7  },

  // ══════════════════════════════
  //  VERBS — movement & action
  // ══════════════════════════════
  { kr:"가다",       ro:"gada",       meaning:"to go",                       example:"학교에 가다 — to go to school",              pos:"verb", freq:10 },
  { kr:"오다",       ro:"oda",        meaning:"to come",                     example:"집에 오다 — to come home",                   pos:"verb", freq:10 },
  { kr:"먹다",       ro:"meokda",     meaning:"to eat",                      example:"밥을 먹다 — to eat",                         pos:"verb", freq:10 },
  { kr:"마시다",     ro:"masida",     meaning:"to drink",                    example:"물을 마시다 — to drink water",               pos:"verb", freq:9  },
  { kr:"자다",       ro:"jada",       meaning:"to sleep",                    example:"일찍 자다 — to sleep early",                 pos:"verb", freq:9  },
  { kr:"일어나다",   ro:"ireonada",   meaning:"to wake up / get up",         example:"일찍 일어나다 — to wake up early",           pos:"verb", freq:8  },
  { kr:"앉다",       ro:"anda",       meaning:"to sit (down)",               example:"여기 앉아 — sit here",                       pos:"verb", freq:8  },
  { kr:"서다",       ro:"seoda",      meaning:"to stand (up)",               example:"일어서 — stand up",                           pos:"verb", freq:7  },
  { kr:"달리다",     ro:"dallida",    meaning:"to run",                      example:"빨리 달려 — run fast",                       pos:"verb", freq:7  },
  { kr:"걷다",       ro:"geotda",     meaning:"to walk",                     example:"천천히 걷자 — let's walk slowly",            pos:"verb", freq:8  },

  // ══════════════════════════════
  //  VERBS — perception & communication
  // ══════════════════════════════
  { kr:"보다",       ro:"boda",       meaning:"to see / watch / look",       example:"영화를 보다 — to watch a movie",             pos:"verb", freq:10 },
  { kr:"듣다",       ro:"deutda",     meaning:"to listen / hear",            example:"음악을 듣다 — to listen to music",           pos:"verb", freq:9  },
  { kr:"말하다",     ro:"malhada",    meaning:"to speak / say / talk",       example:"한국어로 말하다 — to speak in Korean",       pos:"verb", freq:10 },
  { kr:"읽다",       ro:"ikda",       meaning:"to read",                     example:"책을 읽다 — to read a book",                 pos:"verb", freq:9  },
  { kr:"쓰다",       ro:"sseuda",     meaning:"to write / use",              example:"일기를 쓰다 — to write a diary",             pos:"verb", freq:8  },
  { kr:"알다",       ro:"alda",       meaning:"to know / understand",        example:"알아? — do you know?",                       pos:"verb", freq:10 },
  { kr:"모르다",     ro:"moreuda",    meaning:"to not know",                 example:"몰라 — I don't know",                        pos:"verb", freq:9  },
  { kr:"생각하다",   ro:"saenggakhada",meaning:"to think",                   example:"생각해봐 — think about it",                  pos:"verb", freq:9  },

  // ══════════════════════════════
  //  VERBS — emotion & feeling
  // ══════════════════════════════
  { kr:"좋아하다",   ro:"joahada",    meaning:"to like / to be fond of",     example:"나 좋아해 — I like you",                     pos:"verb", freq:10 },
  { kr:"사랑하다",   ro:"saranghada", meaning:"to love",                     example:"사랑해 — I love you",                        pos:"verb", freq:9  },
  { kr:"싫어하다",   ro:"sirohada",   meaning:"to dislike / hate",           example:"그건 싫어 — I don't like that",              pos:"verb", freq:8  },
  { kr:"원하다",     ro:"wonhada",    meaning:"to want",                     example:"뭘 원해? — what do you want?",               pos:"verb", freq:9  },
  { kr:"필요하다",   ro:"piryohada",  meaning:"to need",                     example:"도움이 필요해 — I need help",                 pos:"verb", freq:8  },
  { kr:"기다리다",   ro:"gidarida",   meaning:"to wait",                     example:"나 기다려 — wait for me",                    pos:"verb", freq:8  },
  { kr:"만나다",     ro:"mannada",    meaning:"to meet",                     example:"내일 만나자 — let's meet tomorrow",           pos:"verb", freq:9  },
  { kr:"웃다",       ro:"utda",       meaning:"to smile / laugh",            example:"웃어봐 — try smiling",                       pos:"verb", freq:8  },
  { kr:"울다",       ro:"ulda",       meaning:"to cry",                      example:"울지 마 — don't cry",                        pos:"verb", freq:8  },
  { kr:"보고싶다",   ro:"bogo sipda", meaning:"to miss someone",             example:"너무 보고싶어 — I miss you so much",          pos:"verb", freq:8  },
  { kr:"좋다",       ro:"jota",       meaning:"to like / feel good about",   example:"음악이 좋아 — I like this music",             pos:"verb", freq:10 },

  // ══════════════════════════════
  //  VERBS — daily life
  // ══════════════════════════════
  { kr:"놀다",       ro:"nolda",      meaning:"to play / hang out",          example:"같이 놀자 — let's hang out",                 pos:"verb", freq:8  },
  { kr:"공부하다",   ro:"gongbuhada", meaning:"to study",                    example:"한국어 공부해 — I'm studying Korean",        pos:"verb", freq:9  },
  { kr:"일하다",     ro:"ilhada",     meaning:"to work",                     example:"열심히 일해 — working hard",                 pos:"verb", freq:9  },
  { kr:"쉬다",       ro:"swida",      meaning:"to rest",                     example:"쉬고 싶어 — I want to rest",                 pos:"verb", freq:8  },
  { kr:"받다",       ro:"batda",      meaning:"to receive / get",            example:"선물 받았어 — I received a gift",            pos:"verb", freq:9  },
  { kr:"주다",       ro:"juda",       meaning:"to give",                     example:"나한테 줘 — give it to me",                  pos:"verb", freq:9  },
  { kr:"살다",       ro:"salda",      meaning:"to live / reside",            example:"서울에 살아 — I live in Seoul",              pos:"verb", freq:9  },
  { kr:"사다",       ro:"sada",       meaning:"to buy",                      example:"이거 사줘 — buy this for me",                pos:"verb", freq:9  },
  { kr:"찾다",       ro:"chatda",     meaning:"to find / look for",          example:"뭘 찾아? — what are you looking for?",       pos:"verb", freq:8  },
  { kr:"열다",       ro:"yeolda",     meaning:"to open",                     example:"문 열어 — open the door",                    pos:"verb", freq:8  },
  { kr:"닫다",       ro:"datda",      meaning:"to close / shut",             example:"문 닫아 — close the door",                   pos:"verb", freq:7  },
  { kr:"만들다",     ro:"mandeulda",  meaning:"to make / create",            example:"음식을 만들어 — making food",                pos:"verb", freq:8  },
  { kr:"시작하다",   ro:"sijakhada",  meaning:"to start / begin",            example:"시작해볼까? — shall we start?",              pos:"verb", freq:8  },
  { kr:"끝나다",     ro:"kkeutnada",  meaning:"to end / finish",             example:"수업이 끝났어 — class is over",               pos:"verb", freq:7  },
  { kr:"도와주다",   ro:"dowajuda",   meaning:"to help",                     example:"나 좀 도와줘 — please help me",              pos:"verb", freq:8  },
  { kr:"잊다",       ro:"itda",       meaning:"to forget",                   example:"잊지 마 — don't forget",                     pos:"verb", freq:7  },
  { kr:"기억하다",   ro:"gieokhada",  meaning:"to remember",                 example:"기억해? — do you remember?",                 pos:"verb", freq:7  },
  { kr:"연습하다",   ro:"yeonseubhada",meaning:"to practice",                example:"매일 연습해 — practice every day",           pos:"verb", freq:7  },

  // ══════════════════════════════
  //  ADJECTIVES
  // ══════════════════════════════
  { kr:"좋다",       ro:"jota",       meaning:"good / nice",                 example:"날씨가 좋아 — the weather is nice",          pos:"adjective", freq:10 },
  { kr:"나쁘다",     ro:"nappeuda",   meaning:"bad",                         example:"날씨가 나빠 — the weather is bad",           pos:"adjective", freq:9  },
  { kr:"예쁘다",     ro:"yeppeuda",   meaning:"pretty / beautiful",          example:"너 예뻐 — you're pretty",                    pos:"adjective", freq:9  },
  { kr:"귀엽다",     ro:"gwiyeopda",  meaning:"cute / adorable",             example:"너무 귀여워 — so cute",                      pos:"adjective", freq:8  },
  { kr:"멋있다",     ro:"meositda",   meaning:"cool / stylish / awesome",    example:"너 멋있어 — you look cool",                  pos:"adjective", freq:8  },
  { kr:"크다",       ro:"keuda",      meaning:"big / large / tall",          example:"키가 커 — (you're) tall",                    pos:"adjective", freq:10 },
  { kr:"작다",       ro:"jakda",      meaning:"small / little / short",      example:"키가 작아 — (you're) short",                 pos:"adjective", freq:9  },
  { kr:"많다",       ro:"manta",      meaning:"many / much / a lot",         example:"사람이 많아 — there are many people",        pos:"adjective", freq:10 },
  { kr:"없다",       ro:"eopda",      meaning:"not exist / don't have",      example:"돈이 없어 — I don't have money",             pos:"adjective", freq:10 },
  { kr:"있다",       ro:"itda",       meaning:"exist / have / be there",     example:"집에 있어 — I'm at home",                    pos:"adjective", freq:10 },
  { kr:"어렵다",     ro:"oryeopda",   meaning:"difficult / hard",            example:"한국어 어려워 — Korean is difficult",        pos:"adjective", freq:8  },
  { kr:"쉽다",       ro:"swipda",     meaning:"easy / simple",               example:"이건 쉬워 — this is easy",                   pos:"adjective", freq:8  },
  { kr:"재미있다",   ro:"jaemiitda",  meaning:"fun / interesting",           example:"재미있어! — this is fun!",                   pos:"adjective", freq:8  },
  { kr:"재미없다",   ro:"jaemieopda", meaning:"boring / not fun",            example:"재미없어 — it's boring",                     pos:"adjective", freq:7  },
  { kr:"피곤하다",   ro:"pigonhada",  meaning:"tired / fatigued",            example:"너무 피곤해 — I'm so tired",                 pos:"adjective", freq:8  },
  { kr:"배고프다",   ro:"baegopeuda", meaning:"hungry",                      example:"배고파 — I'm hungry",                        pos:"adjective", freq:8  },
  { kr:"배부르다",   ro:"baebureuda", meaning:"full (from eating)",          example:"배불러 — I'm full",                          pos:"adjective", freq:7  },
  { kr:"행복하다",   ro:"haengbokhada",meaning:"to be happy",                example:"행복해 — I'm happy",                         pos:"adjective", freq:8  },
  { kr:"슬프다",     ro:"seulpeuda",  meaning:"sad / sorrowful",             example:"슬퍼 — I'm sad",                             pos:"adjective", freq:7  },
  { kr:"무섭다",     ro:"museopda",   meaning:"scary / frightening",         example:"무서워 — it's scary",                        pos:"adjective", freq:7  },
  { kr:"힘들다",     ro:"himdeulda",  meaning:"hard / tough / exhausting",   example:"너무 힘들어 — it's so hard",                 pos:"adjective", freq:8  },
  { kr:"바쁘다",     ro:"bappeuda",   meaning:"busy",                        example:"나 너무 바빠 — I'm so busy",                 pos:"adjective", freq:8  },
  { kr:"조용하다",   ro:"joyonghada", meaning:"quiet / silent",              example:"조용히 해 — be quiet",                       pos:"adjective", freq:7  },
  { kr:"시끄럽다",   ro:"sikkeureopda",meaning:"noisy / loud",               example:"너무 시끄러워 — it's too noisy",             pos:"adjective", freq:6  },
  { kr:"따뜻하다",   ro:"ttatteuthada",meaning:"warm",                       example:"날씨가 따뜻해 — the weather is warm",        pos:"adjective", freq:7  },
  { kr:"차갑다",     ro:"chagapda",   meaning:"cold (to the touch)",         example:"손이 차가워 — your hands are cold",          pos:"adjective", freq:7  },
  { kr:"맛있다",     ro:"masitda",    meaning:"delicious / tasty",           example:"너무 맛있어 — so delicious",                 pos:"adjective", freq:9  },
  { kr:"맛없다",     ro:"maseopda",   meaning:"tasteless / not delicious",   example:"맛없어 — it doesn't taste good",             pos:"adjective", freq:6  },
  { kr:"새롭다",     ro:"saereopda",  meaning:"new / fresh / novel",         example:"새로운 시작 — a new beginning",              pos:"adjective", freq:7  },
  { kr:"다르다",     ro:"dareuda",    meaning:"different / unlike",          example:"너는 달라 — you're different",               pos:"adjective", freq:8  },
  { kr:"같다",       ro:"gatda",      meaning:"same / alike / similar",      example:"우리 같아 — we're the same",                 pos:"adjective", freq:9  },

  // ══════════════════════════════
  //  ADVERBS
  // ══════════════════════════════
  { kr:"매우",       ro:"maeu",       meaning:"very / extremely",            example:"매우 좋아 — very good",                      pos:"adverb", freq:9  },
  { kr:"너무",       ro:"neomu",      meaning:"too / so / very much",        example:"너무 좋아 — I love it so much",              pos:"adverb", freq:10 },
  { kr:"정말",       ro:"jeongmal",   meaning:"really / truly",              example:"정말? — really?",                            pos:"adverb", freq:10 },
  { kr:"진짜",       ro:"jinjja",     meaning:"real / really / for real",    example:"진짜야? — is that for real?",                pos:"adverb", freq:10 },
  { kr:"조금",       ro:"jogeum",     meaning:"a little / a bit",            example:"조금만 — just a little",                    pos:"adverb", freq:9  },
  { kr:"많이",       ro:"mani",       meaning:"a lot / very much",           example:"많이 사랑해 — I love you a lot",             pos:"adverb", freq:10 },
  { kr:"빨리",       ro:"ppalli",     meaning:"quickly / fast / hurry",      example:"빨리 와 — come quickly",                    pos:"adverb", freq:9  },
  { kr:"천천히",     ro:"cheoncheonhi",meaning:"slowly",                     example:"천천히 말해 — speak slowly",                 pos:"adverb", freq:8  },
  { kr:"항상",       ro:"hangsang",   meaning:"always",                      example:"항상 곁에 있을게 — I'll always be by your side",pos:"adverb", freq:9 },
  { kr:"가끔",       ro:"gakkeum",    meaning:"sometimes / occasionally",    example:"가끔 생각나 — I think of you sometimes",    pos:"adverb", freq:8  },
  { kr:"절대",       ro:"jeoldae",    meaning:"never / absolutely",          example:"절대 잊지 마 — never forget",               pos:"adverb", freq:7  },
  { kr:"같이",       ro:"gachi",      meaning:"together / with",             example:"같이 가자 — let's go together",              pos:"adverb", freq:9  },
  { kr:"혼자",       ro:"honja",      meaning:"alone / by oneself",          example:"혼자야? — are you alone?",                   pos:"adverb", freq:8  },
  { kr:"왜",         ro:"wae",        meaning:"why",                         example:"왜 그래? — why are you like that?",          pos:"adverb", freq:10 },
  { kr:"어떻게",     ro:"eotteoke",   meaning:"how / in what way",           example:"어떻게 해? — how do I do it?",               pos:"adverb", freq:9  },
  { kr:"언제",       ro:"eonje",      meaning:"when",                        example:"언제 와? — when are you coming?",            pos:"adverb", freq:9  },
  { kr:"어디",       ro:"eodi",       meaning:"where",                       example:"어디 가? — where are you going?",            pos:"adverb", freq:9  },
  { kr:"아직",       ro:"ajik",       meaning:"still / yet / not yet",       example:"아직 몰라 — I don't know yet",               pos:"adverb", freq:8  },
  { kr:"벌써",       ro:"beolsseo",   meaning:"already",                     example:"벌써 왔어? — you're here already?",         pos:"adverb", freq:7  },
  { kr:"다시",       ro:"dasi",       meaning:"again / once more",           example:"다시 해봐 — try again",                      pos:"adverb", freq:9  },
  { kr:"곧",         ro:"got",        meaning:"soon",                        example:"곧 와 — come soon",                          pos:"adverb", freq:8  },
  { kr:"먼저",       ro:"meonjeo",    meaning:"first / ahead / beforehand",  example:"먼저 가 — go ahead",                         pos:"adverb", freq:8  },
  { kr:"계속",       ro:"gyesok",     meaning:"continuously / keep going",   example:"계속 해봐 — keep going",                     pos:"adverb", freq:8  },

  // ══════════════════════════════
  //  PARTICLES
  // ══════════════════════════════
  { kr:"은/는",  ro:"eun/neun",  meaning:"topic marker",                example:"나는 학생이에요 — I am a student",              pos:"particle", freq:10 },
  { kr:"이/가",  ro:"i/ga",      meaning:"subject marker",              example:"비가 와 — rain is falling",                   pos:"particle", freq:10 },
  { kr:"을/를",  ro:"eul/reul",  meaning:"object marker",               example:"밥을 먹어 — eating rice",                     pos:"particle", freq:10 },
  { kr:"에",     ro:"e",         meaning:"at / in / to (location)",     example:"학교에 가 — go to school",                    pos:"particle", freq:10 },
  { kr:"에서",   ro:"eseo",      meaning:"at / from (action location)", example:"집에서 먹어 — eating at home",                pos:"particle", freq:9  },
  { kr:"와/과",  ro:"wa/gwa",    meaning:"and / with",                  example:"친구와 가 — going with a friend",             pos:"particle", freq:9  },
  { kr:"도",     ro:"do",        meaning:"also / too / even",           example:"나도 알아 — I also know",                     pos:"particle", freq:10 },
  { kr:"만",     ro:"man",       meaning:"only / just",                 example:"너만 바라봐 — I only look at you",            pos:"particle", freq:9  },
  { kr:"한테",   ro:"hante",     meaning:"to / from (a person)",        example:"나한테 줘 — give it to me",                   pos:"particle", freq:8  },
  { kr:"보다",   ro:"boda",      meaning:"than / compared to",          example:"너보다 좋아 — I like (you) more than anyone", pos:"particle", freq:8  },
  { kr:"처럼",   ro:"cheo-reum", meaning:"like / as / resembling",      example:"별처럼 빛나 — shining like a star",           pos:"particle", freq:7  },
  { kr:"이랑/랑",ro:"irang/rang",meaning:"with / and (casual)",         example:"친구랑 가 — going with a friend",             pos:"particle", freq:8  },

  // ══════════════════════════════
  //  EXPRESSIONS & INTERJECTIONS
  // ══════════════════════════════
  { kr:"안녕",       ro:"annyeong",      meaning:"hello / goodbye (informal)",      example:"안녕! — hi!",                               pos:"expression", freq:10 },
  { kr:"안녕하세요", ro:"annyeonghaseyo",meaning:"hello (formal/polite)",            example:"안녕하세요 — hello",                        pos:"expression", freq:10 },
  { kr:"감사합니다", ro:"gamsahamnida",  meaning:"thank you (formal)",              example:"감사합니다 — thank you",                    pos:"expression", freq:10 },
  { kr:"고마워",     ro:"gomawo",        meaning:"thank you (informal)",            example:"고마워! — thanks!",                         pos:"expression", freq:9  },
  { kr:"미안해",     ro:"mianhae",       meaning:"I'm sorry (informal)",            example:"미안해 — I'm sorry",                        pos:"expression", freq:9  },
  { kr:"괜찮아",     ro:"gwaenchana",    meaning:"it's okay / I'm fine",            example:"괜찮아? — are you okay?",                   pos:"expression", freq:9  },
  { kr:"알겠어",     ro:"algeseo",       meaning:"I understand / got it",           example:"알겠어 — got it",                           pos:"expression", freq:9  },
  { kr:"맞아",       ro:"maja",          meaning:"that's right / correct",          example:"맞아! — that's right!",                     pos:"expression", freq:9  },
  { kr:"아니야",     ro:"aniya",         meaning:"no / it's not (informal)",        example:"아니야, 달라 — no, it's different",         pos:"expression", freq:9  },
  { kr:"그래",       ro:"geurae",        meaning:"okay / sure / yes (casual)",      example:"그래, 하자 — okay, let's do it",            pos:"expression", freq:9  },
  { kr:"어",         ro:"eo",            meaning:"yeah / uh-huh (very casual yes)", example:"어, 맞아 — yeah, that's right",             pos:"expression", freq:8  },
  { kr:"대박",       ro:"daebak",        meaning:"wow / amazing / jackpot (slang)", example:"대박이야! — that's amazing!",               pos:"expression", freq:7  },
  { kr:"파이팅",     ro:"paiting",       meaning:"fighting / you can do it / go!",  example:"파이팅! — you've got this!",                pos:"expression", freq:7  },
  { kr:"화이팅",     ro:"hwaiting",      meaning:"fighting! / come on! / go!",      example:"화이팅! — come on!",                        pos:"expression", freq:7  },
  { kr:"잠깐만",     ro:"jamkkanman",    meaning:"just a moment / wait a sec",      example:"잠깐만 — hold on a sec",                    pos:"expression", freq:8  },
  { kr:"어떡해",     ro:"eotteokhae",    meaning:"what do I do / oh no",            example:"어떡해! — what do I do!",                   pos:"expression", freq:7  },
  { kr:"진짜요?",    ro:"jinnjjayo?",    meaning:"really? / seriously? (polite)",   example:"진짜요? 대박! — really? amazing!",          pos:"expression", freq:7  },
  { kr:"아이고",     ro:"aigo",          meaning:"oh my / goodness (exclamation)",  example:"아이고, 힘들어 — oh my, this is hard",     pos:"expression", freq:7  },
  { kr:"맛있어요",   ro:"massisseoyo",   meaning:"it's delicious (polite)",         example:"정말 맛있어요 — it's really delicious",     pos:"expression", freq:8  },
  { kr:"보고싶어",   ro:"bogosipeo",     meaning:"I miss you (informal)",           example:"너무 보고싶어 — I miss you so much",         pos:"expression", freq:8  },
  { kr:"사랑해",     ro:"saranghae",     meaning:"I love you (informal)",           example:"사랑해 — I love you",                        pos:"expression", freq:10 },
  { kr:"잘 자",      ro:"jal ja",        meaning:"good night / sleep well",         example:"잘 자, 꿈 꿔 — good night, sweet dreams",   pos:"expression", freq:8  },
  { kr:"잘 먹겠습니다", ro:"jal meokgesseumnida", meaning:"I will eat well (said before meals)", example:"잘 먹겠습니다 — let's eat!", pos:"expression", freq:7 },
  { kr:"수고했어",   ro:"sugohesseo",    meaning:"good work / you worked hard",     example:"오늘 수고했어 — good work today",           pos:"expression", freq:7  },

];
