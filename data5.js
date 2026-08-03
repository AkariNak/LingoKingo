// ── DATA5.JS — Russian complete dataset ───────────────────────────────────────
// Russian: Cyrillic alphabet cards + core vocabulary N5-N1 equivalent
// Pronunciation notes: Russian letters that mislead English speakers

const RUSSIAN_WORDS = [

  // ── CYRILLIC ALPHABET — vowels ────────────────────────────────────────────
  {kr:"А а",ro:"a",meaning:"sounds like 'a' in 'father'",example:"А — а — as in: мама (mama)",pos:"cyrillic",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"Е е",ro:"ye",meaning:"sounds like 'ye' in 'yes'",example:"Е — ye — as in: есть (yest) = to eat",pos:"cyrillic",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"Ё ё",ro:"yo",meaning:"sounds like 'yo' in 'yoga' — always stressed",example:"Ё — yo — as in: ёж (yozh) = hedgehog",pos:"cyrillic",freq:8,register:"neutral",script:"cyrillic"},
  {kr:"И и",ro:"ee",meaning:"sounds like 'ee' in 'meet'",example:"И — ee — as in: имя (eeмya) = name",pos:"cyrillic",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"Й й",ro:"y",meaning:"short 'y' sound — like 'y' in 'boy'",example:"Й — y — as in: йогурт (yogurt)",pos:"cyrillic",freq:8,register:"neutral",script:"cyrillic"},
  {kr:"О о",ro:"o",meaning:"sounds like 'o' in 'more' when stressed; like 'a' when unstressed",example:"О — o — as in: он (on) = he",pos:"cyrillic",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"У у",ro:"oo",meaning:"sounds like 'oo' in 'moon'",example:"У — oo — as in: улица (ooleetsa) = street",pos:"cyrillic",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"Ы ы",ro:"y (hard)",meaning:"no English equivalent — hard 'i', tongue back in mouth",example:"Ы — y — as in: ты (ty) = you",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Э э",ro:"e",meaning:"sounds like 'e' in 'bed'",example:"Э — e — as in: это (eto) = this",pos:"cyrillic",freq:8,register:"neutral",script:"cyrillic"},
  {kr:"Ю ю",ro:"yu",meaning:"sounds like 'yu' in 'yule'",example:"Ю — yu — as in: юг (yug) = south",pos:"cyrillic",freq:7,register:"neutral",script:"cyrillic"},
  {kr:"Я я",ro:"ya",meaning:"sounds like 'ya' in 'yard'",example:"Я — ya — also means 'I' (personal pronoun)",pos:"cyrillic",freq:10,register:"neutral",script:"cyrillic"},

  // ── CYRILLIC ALPHABET — consonants ────────────────────────────────────────
  {kr:"Б б",ro:"b",meaning:"like 'b' in 'ball' — at end of word sounds like 'p'",example:"Б — b — as in: брат (brat) = brother",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"В в",ro:"v",meaning:"like 'v' in 'voice' — NOT 'w'. At end of word sounds like 'f'",example:"В — v — as in: вода (voda) = water",pos:"cyrillic",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"Г г",ro:"g",meaning:"like 'g' in 'go' — at end of word sometimes sounds like 'k'",example:"Г — g — as in: город (gorod) = city",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Д д",ro:"d",meaning:"like 'd' in 'dog' — at end of word sounds like 't'",example:"Д — d — as in: дом (dom) = house",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Ж ж",ro:"zh",meaning:"like 's' in 'measure' or 'g' in 'genre' — no English letter for this",example:"Ж — zh — as in: жить (zhyt) = to live",pos:"cyrillic",freq:8,register:"neutral",script:"cyrillic"},
  {kr:"З з",ro:"z",meaning:"like 'z' in 'zoo' — at end of word sounds like 's'",example:"З — z — as in: завтра (zaftra) = tomorrow",pos:"cyrillic",freq:8,register:"neutral",script:"cyrillic"},
  {kr:"К к",ro:"k",meaning:"like 'k' in 'key'",example:"К — k — as in: кот (kot) = cat",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Л л",ro:"l",meaning:"like 'l' in 'lamp'",example:"Л — l — as in: луна (loona) = moon",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"М м",ro:"m",meaning:"like 'm' in 'map'",example:"М — m — as in: мама (mama) = mom",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Н н",ro:"n",meaning:"like 'n' in 'note'",example:"Н — n — as in: нет (nyet) = no",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"П п",ro:"p",meaning:"like 'p' in 'park'",example:"П — p — as in: папа (papa) = dad",pos:"cyrillic",freq:8,register:"neutral",script:"cyrillic"},
  {kr:"Р р",ro:"r",meaning:"rolled 'r' — like Spanish 'r', NOT English 'r'",example:"Р — r (rolled) — as in: рот (rot) = mouth",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"С с",ro:"s",meaning:"like 's' in 'sun' — looks like English 'C' but sounds like 'S'",example:"С — s — as in: сын (syn) = son",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Т т",ro:"t",meaning:"like 't' in 'top'",example:"Т — t — as in: там (tam) = there",pos:"cyrillic",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Ф ф",ro:"f",meaning:"like 'f' in 'fan'",example:"Ф — f — as in: фото (foto) = photo",pos:"cyrillic",freq:7,register:"neutral",script:"cyrillic"},
  {kr:"Х х",ro:"kh",meaning:"like Scottish 'ch' in 'loch' — a soft scraping sound, NOT 'h'",example:"Х — kh — as in: хлеб (khlyep) = bread",pos:"cyrillic",freq:7,register:"neutral",script:"cyrillic"},
  {kr:"Ц ц",ro:"ts",meaning:"like 'ts' in 'cats'",example:"Ц — ts — as in: центр (tsentr) = center",pos:"cyrillic",freq:6,register:"neutral",script:"cyrillic"},
  {kr:"Ч ч",ro:"ch",meaning:"like 'ch' in 'church'",example:"Ч — ch — as in: чай (chay) = tea",pos:"cyrillic",freq:7,register:"neutral",script:"cyrillic"},
  {kr:"Ш ш",ro:"sh",meaning:"like 'sh' in 'shop'",example:"Ш — sh — as in: школа (shkola) = school",pos:"cyrillic",freq:7,register:"neutral",script:"cyrillic"},
  {kr:"Щ щ",ro:"shch",meaning:"like 'shch' — softer and longer than Ш",example:"Щ — shch — as in: щи (shchee) = cabbage soup",pos:"cyrillic",freq:5,register:"neutral",script:"cyrillic"},
  {kr:"Ъ ъ",ro:"hard sign",meaning:"hard sign — separates a consonant from a following vowel, no sound itself",example:"Ъ — silent — as in: объект (ob'yekt) = object",pos:"cyrillic",freq:4,register:"neutral",script:"cyrillic"},
  {kr:"Ь ь",ro:"soft sign",meaning:"soft sign — softens the preceding consonant, no sound itself",example:"Ь — silent softener — as in: мать (mat') = mother",pos:"cyrillic",freq:7,register:"neutral",script:"cyrillic"},

  // ── MISLEADING LETTERS — the traps ────────────────────────────────────────
  {kr:"Р р ≠ R",ro:"r (rolled)",meaning:"Р looks like English P but sounds like R (rolled)",example:"рот (rot) = mouth — NOT 'pot'",pos:"cyrillic_note",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"С с ≠ C",ro:"s",meaning:"С looks like English C but sounds like S",example:"сок (sok) = juice — NOT 'cok'",pos:"cyrillic_note",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"В в ≠ B",ro:"v",meaning:"В looks like English B but sounds like V",example:"вот (vot) = here is — NOT 'bot'",pos:"cyrillic_note",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"Н н ≠ H",ro:"n",meaning:"Н looks like English H but sounds like N",example:"нет (nyet) = no — NOT 'het'",pos:"cyrillic_note",freq:10,register:"neutral",script:"cyrillic"},
  {kr:"У у ≠ Y",ro:"oo",meaning:"У looks like English Y but sounds like 'oo'",example:"ум (oom) = mind — NOT 'ym'",pos:"cyrillic_note",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"Х х ≠ X",ro:"kh",meaning:"Х looks like English X but sounds like 'kh' (Scottish 'loch')",example:"хорошо (khorosho) = good/okay — NOT 'xorosho'",pos:"cyrillic_note",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"end-devoicing",ro:"final consonant rule",meaning:"At the end of a word: Б→П, В→Ф, Г→К, Д→Т, З→С, Ж→Ш",example:"год (god = year) is pronounced 'got' — the Д becomes Т",pos:"cyrillic_note",freq:9,register:"neutral",script:"cyrillic"},
  {kr:"О unstressed",ro:"o → a",meaning:"Unstressed О sounds like А — this is called 'akan'ye'",example:"молоко (milk): stressed о sounds right, unstressed о sounds like а — mAlAko",pos:"cyrillic_note",freq:9,register:"neutral",script:"cyrillic"},

  // ── CORE VOCABULARY ───────────────────────────────────────────────────────
  // Greetings & Basics
  {kr:"привет",ro:"privet",meaning:"hi / hello (casual)",example:"привет! как дела? — privet! kak dela? — hi! how are you?",pos:"expression",freq:10,register:"casual"},
  {kr:"здравствуйте",ro:"zdravstvuyte",meaning:"hello (formal)",example:"здравствуйте, меня зовут Иван — zdravstvuyte, menya zovut Ivan — hello, my name is Ivan",pos:"expression",freq:10,register:"formal"},
  {kr:"пока",ro:"poka",meaning:"bye (casual)",example:"пока! — poka! — bye!",pos:"expression",freq:10,register:"casual"},
  {kr:"до свидания",ro:"do svidaniya",meaning:"goodbye (formal)",example:"до свидания! — do svidaniya! — goodbye!",pos:"expression",freq:9,register:"formal"},
  {kr:"спасибо",ro:"spasibo",meaning:"thank you",example:"большое спасибо — bolshoye spasibo — thank you very much",pos:"expression",freq:10,register:"neutral"},
  {kr:"пожалуйста",ro:"pozhaluysta",meaning:"please / you're welcome",example:"дайте, пожалуйста — dayte, pozhaluysta — please give me",pos:"expression",freq:10,register:"neutral"},
  {kr:"извините",ro:"izvinite",meaning:"excuse me / sorry (formal)",example:"извините, где туалет? — izvinite, gde tualet? — excuse me, where is the toilet?",pos:"expression",freq:9,register:"formal"},
  {kr:"простите",ro:"prostite",meaning:"I'm sorry / forgive me",example:"простите меня — prostite menya — forgive me",pos:"expression",freq:8,register:"neutral"},
  {kr:"да",ro:"da",meaning:"yes",example:"да, конечно — da, konechno — yes, of course",pos:"expression",freq:10,register:"neutral"},
  {kr:"нет",ro:"nyet",meaning:"no",example:"нет, спасибо — nyet, spasibo — no, thank you",pos:"expression",freq:10,register:"neutral"},
  {kr:"не знаю",ro:"ne znayu",meaning:"I don't know",example:"не знаю, где это — ne znayu, gde eto — I don't know where that is",pos:"expression",freq:9,register:"neutral"},
  {kr:"понимаю",ro:"ponimayu",meaning:"I understand",example:"да, понимаю — da, ponimayu — yes, I understand",pos:"expression",freq:8,register:"neutral"},
  {kr:"не понимаю",ro:"ne ponimayu",meaning:"I don't understand",example:"извините, не понимаю — izvinite, ne ponimayu — sorry, I don't understand",pos:"expression",freq:9,register:"neutral"},
  {kr:"хорошо",ro:"khorosho",meaning:"good / okay / alright",example:"всё хорошо — vsyo khorosho — everything is okay",pos:"expression",freq:10,register:"neutral"},
  {kr:"отлично",ro:"otlichno",meaning:"excellent / great",example:"отлично! — otlichno! — excellent!",pos:"expression",freq:8,register:"neutral"},
  {kr:"доброе утро",ro:"dobroye utro",meaning:"good morning",example:"доброе утро! — dobroye utro! — good morning!",pos:"expression",freq:9,register:"neutral"},
  {kr:"добрый день",ro:"dobry den",meaning:"good afternoon",example:"добрый день! — dobry den! — good afternoon!",pos:"expression",freq:8,register:"neutral"},
  {kr:"добрый вечер",ro:"dobry vecher",meaning:"good evening",example:"добрый вечер! — dobry vecher! — good evening!",pos:"expression",freq:8,register:"neutral"},
  {kr:"спокойной ночи",ro:"spokoinoi nochi",meaning:"good night",example:"спокойной ночи! — spokoinoi nochi! — good night!",pos:"expression",freq:8,register:"neutral"},
  {kr:"как дела",ro:"kak dela",meaning:"how are you (doing)?",example:"как дела? — kak dela? — how are you?",pos:"expression",freq:10,register:"casual"},

  // Pronouns
  {kr:"я",ro:"ya",meaning:"I / me",example:"я студент — ya student — I am a student",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"ты",ro:"ty",meaning:"you (casual / singular)",example:"ты говоришь по-русски? — ty govorysh po-russki? — do you speak Russian?",pos:"pronoun",freq:10,register:"casual"},
  {kr:"вы",ro:"vy",meaning:"you (formal / plural)",example:"вы говорите по-английски? — vy govorite po-angliyski? — do you speak English?",pos:"pronoun",freq:9,register:"formal"},
  {kr:"он",ro:"on",meaning:"he / it (masculine)",example:"он студент — on student — he is a student",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"она",ro:"ona",meaning:"she / it (feminine)",example:"она врач — ona vrach — she is a doctor",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"мы",ro:"my",meaning:"we",example:"мы говорим по-русски — my govorim po-russki — we speak Russian",pos:"pronoun",freq:9,register:"neutral"},
  {kr:"они",ro:"oni",meaning:"they",example:"они студенты — oni studenty — they are students",pos:"pronoun",freq:9,register:"neutral"},
  {kr:"это",ro:"eto",meaning:"this / it is",example:"это моя книга — eto moya kniga — this is my book",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"меня",ro:"menya",meaning:"me (object) / my name is",example:"меня зовут Анна — menya zovut Anna — my name is Anna",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"мне",ro:"mnye",meaning:"to me / for me",example:"мне нравится — mnye nravitsa — I like it",pos:"pronoun",freq:9,register:"neutral"},

  // Numbers
  {kr:"один",ro:"odin",meaning:"one",example:"один кофе, пожалуйста — odin kofe, pozhaluysta — one coffee please",pos:"noun",freq:10,register:"neutral"},
  {kr:"два",ro:"dva",meaning:"two",example:"два билета — dva bileta — two tickets",pos:"noun",freq:10,register:"neutral"},
  {kr:"три",ro:"tri",meaning:"three",example:"три часа — tri chasa — three hours",pos:"noun",freq:10,register:"neutral"},
  {kr:"четыре",ro:"chetyre",meaning:"four",example:"четыре рубля — chetyre rublya — four rubles",pos:"noun",freq:9,register:"neutral"},
  {kr:"пять",ro:"pyat",meaning:"five",example:"пять минут — pyat minut — five minutes",pos:"noun",freq:9,register:"neutral"},
  {kr:"шесть",ro:"shest",meaning:"six",example:"шесть часов — shest chasov — six o'clock",pos:"noun",freq:8,register:"neutral"},
  {kr:"семь",ro:"sem",meaning:"seven",example:"семь дней — sem dney — seven days",pos:"noun",freq:8,register:"neutral"},
  {kr:"восемь",ro:"vosem",meaning:"eight",example:"восемь рублей — vosem rubley — eight rubles",pos:"noun",freq:8,register:"neutral"},
  {kr:"девять",ro:"devyat",meaning:"nine",example:"девять часов — devyat chasov — nine o'clock",pos:"noun",freq:8,register:"neutral"},
  {kr:"десять",ro:"desyat",meaning:"ten",example:"десять минут — desyat minut — ten minutes",pos:"noun",freq:8,register:"neutral"},
  {kr:"двадцать",ro:"dvadtsat",meaning:"twenty",example:"двадцать рублей — dvadtsat rubley — twenty rubles",pos:"noun",freq:7,register:"neutral"},
  {kr:"сто",ro:"sto",meaning:"hundred",example:"сто рублей — sto rubley — a hundred rubles",pos:"noun",freq:8,register:"neutral"},
  {kr:"тысяча",ro:"tysyacha",meaning:"thousand",example:"одна тысяча — odna tysyacha — one thousand",pos:"noun",freq:7,register:"neutral"},

  // Core Verbs
  {kr:"быть",ro:"byt",meaning:"to be",example:"я хочу быть врачом — ya khochu byt vrachom — I want to be a doctor",pos:"verb",freq:10,register:"neutral"},
  {kr:"говорить",ro:"govorit",meaning:"to speak / to say",example:"я говорю по-русски — ya govoryu po-russki — I speak Russian",pos:"verb",freq:10,register:"neutral"},
  {kr:"понимать",ro:"ponimat",meaning:"to understand",example:"я не понимаю — ya ne ponimayu — I don't understand",pos:"verb",freq:10,register:"neutral"},
  {kr:"знать",ro:"znat",meaning:"to know",example:"я не знаю — ya ne znayu — I don't know",pos:"verb",freq:10,register:"neutral"},
  {kr:"идти",ro:"idti",meaning:"to go (on foot)",example:"я иду домой — ya idu domoy — I'm going home",pos:"verb",freq:10,register:"neutral"},
  {kr:"ехать",ro:"yekhat",meaning:"to go (by vehicle)",example:"я еду на работу — ya yedu na rabotu — I'm going to work (by transport)",pos:"verb",freq:9,register:"neutral"},
  {kr:"есть",ro:"yest",meaning:"to eat",example:"я ем пиццу — ya yem pitstsu — I eat pizza",pos:"verb",freq:10,register:"neutral"},
  {kr:"пить",ro:"pit",meaning:"to drink",example:"я пью чай — ya pyu chay — I drink tea",pos:"verb",freq:10,register:"neutral"},
  {kr:"хотеть",ro:"khotet",meaning:"to want",example:"я хочу кофе — ya khochu kofe — I want coffee",pos:"verb",freq:10,register:"neutral"},
  {kr:"любить",ro:"lyubit",meaning:"to love / to like",example:"я люблю музыку — ya lyublyu muzyku — I love music",pos:"verb",freq:10,register:"neutral"},
  {kr:"жить",ro:"zhit",meaning:"to live",example:"я живу в Москве — ya zhivu v Moskve — I live in Moscow",pos:"verb",freq:9,register:"neutral"},
  {kr:"работать",ro:"rabotat",meaning:"to work",example:"я работаю в банке — ya rabotayu v banke — I work at a bank",pos:"verb",freq:9,register:"neutral"},
  {kr:"учиться",ro:"uchitsya",meaning:"to study / to learn",example:"я учусь в университете — ya uchus v universitete — I study at university",pos:"verb",freq:9,register:"neutral"},
  {kr:"смотреть",ro:"smotret",meaning:"to watch / to look",example:"я смотрю фильм — ya smotryu film — I'm watching a film",pos:"verb",freq:9,register:"neutral"},
  {kr:"слушать",ro:"slushat",meaning:"to listen",example:"я слушаю музыку — ya slushayu muzyku — I listen to music",pos:"verb",freq:9,register:"neutral"},
  {kr:"читать",ro:"chitat",meaning:"to read",example:"я читаю книгу — ya chitayu knigu — I'm reading a book",pos:"verb",freq:9,register:"neutral"},
  {kr:"писать",ro:"pisat",meaning:"to write",example:"я пишу письмо — ya pishu pismo — I'm writing a letter",pos:"verb",freq:8,register:"neutral"},
  {kr:"покупать",ro:"pokupat",meaning:"to buy",example:"я покупаю хлеб — ya pokupayu khleb — I buy bread",pos:"verb",freq:8,register:"neutral"},
  {kr:"помогать",ro:"pomogat",meaning:"to help",example:"помогите мне — pomogite mne — help me",pos:"verb",freq:8,register:"neutral"},
  {kr:"думать",ro:"dumat",meaning:"to think",example:"я думаю — ya dumayu — I think",pos:"verb",freq:9,register:"neutral"},
  {kr:"видеть",ro:"videt",meaning:"to see",example:"я вижу — ya vizhu — I see",pos:"verb",freq:9,register:"neutral"},
  {kr:"приходить",ro:"prikhodit",meaning:"to come / to arrive",example:"я прихожу в шесть — ya prikhozhu v shest — I arrive at six",pos:"verb",freq:8,register:"neutral"},
  {kr:"уходить",ro:"ukhodit",meaning:"to leave / to go away",example:"я ухожу — ya ukhozhu — I'm leaving",pos:"verb",freq:8,register:"neutral"},
  {kr:"открывать",ro:"otkryvat",meaning:"to open",example:"открой дверь — otkroy dver — open the door",pos:"verb",freq:8,register:"neutral"},
  {kr:"закрывать",ro:"zakryvat",meaning:"to close",example:"закрой окно — zakroy okno — close the window",pos:"verb",freq:8,register:"neutral"},

  // Core Nouns
  {kr:"человек",ro:"chelovek",meaning:"person / human",example:"хороший человек — khoroshiy chelovek — a good person",pos:"noun",freq:10,register:"neutral"},
  {kr:"мужчина",ro:"muzhchina",meaning:"man",example:"этот мужчина мой отец — etot muzhchina moy otets — this man is my father",pos:"noun",freq:8,register:"neutral"},
  {kr:"женщина",ro:"zhenshchina",meaning:"woman",example:"эта женщина врач — eta zhenshchina vrach — this woman is a doctor",pos:"noun",freq:8,register:"neutral"},
  {kr:"ребёнок",ro:"rebyonok",meaning:"child",example:"маленький ребёнок — malenkiy rebyonok — a small child",pos:"noun",freq:8,register:"neutral"},
  {kr:"дом",ro:"dom",meaning:"house / home / building",example:"я иду домой — ya idu domoy — I'm going home",pos:"noun",freq:10,register:"neutral"},
  {kr:"город",ro:"gorod",meaning:"city / town",example:"я живу в большом городе — ya zhivu v bolshom gorode — I live in a big city",pos:"noun",freq:9,register:"neutral"},
  {kr:"улица",ro:"ulitsa",meaning:"street",example:"на этой улице — na etoy ulitse — on this street",pos:"noun",freq:8,register:"neutral"},
  {kr:"дорога",ro:"doroga",meaning:"road / way",example:"эта дорога ведёт в центр — eta doroga vedyot v tsentr — this road leads to the center",pos:"noun",freq:8,register:"neutral"},
  {kr:"время",ro:"vremya",meaning:"time",example:"сколько времени? — skolko vremeni? — what time is it?",pos:"noun",freq:10,register:"neutral"},
  {kr:"день",ro:"den",meaning:"day",example:"хороший день — khoroshiy den — a good day",pos:"noun",freq:10,register:"neutral"},
  {kr:"ночь",ro:"noch",meaning:"night",example:"доброй ночи — dobroy nochi — good night",pos:"noun",freq:9,register:"neutral"},
  {kr:"утро",ro:"utro",meaning:"morning",example:"доброе утро — dobroye utro — good morning",pos:"noun",freq:9,register:"neutral"},
  {kr:"вечер",ro:"vecher",meaning:"evening",example:"добрый вечер — dobry vecher — good evening",pos:"noun",freq:9,register:"neutral"},
  {kr:"год",ro:"god",meaning:"year (pronounced 'got' at end of sentence)",example:"в этом году — v etom godu — this year",pos:"noun",freq:9,register:"neutral"},
  {kr:"неделя",ro:"nedelya",meaning:"week",example:"на этой неделе — na etoy nedele — this week",pos:"noun",freq:8,register:"neutral"},
  {kr:"месяц",ro:"mesyats",meaning:"month",example:"в этом месяце — v etom mesyatse — this month",pos:"noun",freq:8,register:"neutral"},
  {kr:"деньги",ro:"dengi",meaning:"money",example:"у меня нет денег — u menya nyet deneg — I have no money",pos:"noun",freq:9,register:"neutral"},
  {kr:"работа",ro:"rabota",meaning:"work / job",example:"я ищу работу — ya ishchu rabotu — I'm looking for work",pos:"noun",freq:9,register:"neutral"},
  {kr:"школа",ro:"shkola",meaning:"school",example:"я иду в школу — ya idu v shkolu — I'm going to school",pos:"noun",freq:9,register:"neutral"},
  {kr:"университет",ro:"universitet",meaning:"university",example:"я учусь в университете — ya uchus v universitete — I study at university",pos:"noun",freq:8,register:"neutral"},

  // Food & Drink
  {kr:"вода",ro:"voda",meaning:"water",example:"дайте воды, пожалуйста — dayte vody, pozhaluysta — give me water please",pos:"noun",freq:10,register:"neutral"},
  {kr:"хлеб",ro:"khleb",meaning:"bread",example:"купи хлеб — kupi khleb — buy bread",pos:"noun",freq:9,register:"neutral"},
  {kr:"молоко",ro:"moloko",meaning:"milk (pronounced: mAlAko)",example:"стакан молока — stakan moloka — a glass of milk",pos:"noun",freq:8,register:"neutral"},
  {kr:"кофе",ro:"kofe",meaning:"coffee",example:"чашка кофе — chashka kofe — a cup of coffee",pos:"noun",freq:9,register:"neutral"},
  {kr:"чай",ro:"chay",meaning:"tea",example:"хочешь чай? — khochesh chay? — do you want tea?",pos:"noun",freq:9,register:"neutral"},
  {kr:"суп",ro:"sup",meaning:"soup",example:"горячий суп — goryachiy sup — hot soup",pos:"noun",freq:8,register:"neutral"},
  {kr:"мясо",ro:"myaso",meaning:"meat",example:"я не ем мясо — ya ne yem myaso — I don't eat meat",pos:"noun",freq:8,register:"neutral"},
  {kr:"рыба",ro:"ryba",meaning:"fish",example:"свежая рыба — svyezhaya ryba — fresh fish",pos:"noun",freq:8,register:"neutral"},
  {kr:"овощи",ro:"ovoshchi",meaning:"vegetables",example:"ешьте больше овощей — yeshte bolshe ovoshchey — eat more vegetables",pos:"noun",freq:7,register:"neutral"},
  {kr:"фрукты",ro:"frukty",meaning:"fruit",example:"я люблю фрукты — ya lyublyu frukty — I love fruit",pos:"noun",freq:7,register:"neutral"},
  {kr:"яйцо",ro:"yaytso",meaning:"egg",example:"яичница на завтрак — yaichnitsa na zavtrak — fried eggs for breakfast",pos:"noun",freq:7,register:"neutral"},
  {kr:"сыр",ro:"syr",meaning:"cheese",example:"кусочек сыра — kusochek syra — a piece of cheese",pos:"noun",freq:7,register:"neutral"},
  {kr:"пиво",ro:"pivo",meaning:"beer",example:"кружка пива — kruzhka piva — a mug of beer",pos:"noun",freq:7,register:"casual"},
  {kr:"вино",ro:"vino",meaning:"wine",example:"бокал вина — bokal vina — a glass of wine",pos:"noun",freq:7,register:"neutral"},
  {kr:"водка",ro:"vodka",meaning:"vodka",example:"рюмка водки — ryumka vodki — a shot of vodka",pos:"noun",freq:6,register:"casual"},

  // Transport & Directions
  {kr:"автобус",ro:"avtobus",meaning:"bus",example:"я еду на автобусе — ya yedu na avtobuse — I go by bus",pos:"noun",freq:8,register:"neutral"},
  {kr:"метро",ro:"metro",meaning:"metro / subway",example:"станция метро — stantsiya metro — metro station",pos:"noun",freq:8,register:"neutral"},
  {kr:"такси",ro:"taksi",meaning:"taxi",example:"вызовите такси — vyzovite taksi — call a taxi",pos:"noun",freq:7,register:"neutral"},
  {kr:"машина",ro:"mashina",meaning:"car",example:"моя машина сломалась — moya mashina slOmalas — my car broke down",pos:"noun",freq:9,register:"neutral"},
  {kr:"поезд",ro:"poyezd",meaning:"train",example:"я еду на поезде — ya yedu na poyezde — I go by train",pos:"noun",freq:8,register:"neutral"},
  {kr:"самолёт",ro:"samolyot",meaning:"airplane",example:"лететь на самолёте — letet na samolyote — fly by plane",pos:"noun",freq:7,register:"neutral"},
  {kr:"налево",ro:"nalevo",meaning:"to the left",example:"поверните налево — poverniyte nalevo — turn left",pos:"adverb",freq:8,register:"neutral"},
  {kr:"направо",ro:"napravo",meaning:"to the right",example:"поверните направо — poverniyte napravo — turn right",pos:"adverb",freq:8,register:"neutral"},
  {kr:"прямо",ro:"pryamo",meaning:"straight ahead",example:"идите прямо — idiyte pryamo — go straight",pos:"adverb",freq:8,register:"neutral"},
  {kr:"далеко",ro:"daleko",meaning:"far away",example:"это далеко? — eto daleko? — is it far?",pos:"adverb",freq:8,register:"neutral"},
  {kr:"близко",ro:"blizko",meaning:"close / nearby",example:"это близко — eto blizko — it's nearby",pos:"adverb",freq:8,register:"neutral"},

  // Family & Relationships
  {kr:"семья",ro:"semya",meaning:"family",example:"моя семья большая — moya semya bolshaya — my family is big",pos:"noun",freq:9,register:"neutral"},
  {kr:"мама",ro:"mama",meaning:"mom / mother",example:"моя мама — moya mama — my mom",pos:"noun",freq:10,register:"casual"},
  {kr:"папа",ro:"papa",meaning:"dad / father",example:"мой папа работает — moy papa rabotayet — my dad works",pos:"noun",freq:9,register:"casual"},
  {kr:"мать",ro:"mat",meaning:"mother (formal)",example:"моя мать врач — moya mat vrach — my mother is a doctor",pos:"noun",freq:8,register:"formal"},
  {kr:"отец",ro:"otets",meaning:"father (formal)",example:"мой отец инженер — moy otets inzhener — my father is an engineer",pos:"noun",freq:8,register:"formal"},
  {kr:"брат",ro:"brat",meaning:"brother",example:"у меня есть брат — u menya yest brat — I have a brother",pos:"noun",freq:8,register:"neutral"},
  {kr:"сестра",ro:"sestra",meaning:"sister",example:"моя сестра учительница — moya sestra uchitelnitsa — my sister is a teacher",pos:"noun",freq:8,register:"neutral"},
  {kr:"муж",ro:"muzh",meaning:"husband",example:"мой муж дома — moy muzh doma — my husband is home",pos:"noun",freq:7,register:"neutral"},
  {kr:"жена",ro:"zhena",meaning:"wife",example:"моя жена красивая — moya zhena krasivaya — my wife is beautiful",pos:"noun",freq:7,register:"neutral"},
  {kr:"друг",ro:"drug",meaning:"friend (male)",example:"мой лучший друг — moy luchshiy drug — my best friend",pos:"noun",freq:9,register:"neutral"},
  {kr:"подруга",ro:"podruga",meaning:"friend (female)",example:"моя подруга Маша — moya podruga Masha — my friend Masha",pos:"noun",freq:8,register:"neutral"},

  // Adjectives
  {kr:"большой",ro:"bolshoy",meaning:"big / large",example:"большой город — bolshoy gorod — big city",pos:"adjective",freq:10,register:"neutral"},
  {kr:"маленький",ro:"malenkiy",meaning:"small / little",example:"маленький ребёнок — malenkiy rebyonok — small child",pos:"adjective",freq:9,register:"neutral"},
  {kr:"хороший",ro:"khoroshiy",meaning:"good",example:"хороший человек — khoroshiy chelovek — good person",pos:"adjective",freq:10,register:"neutral"},
  {kr:"плохой",ro:"plokhoy",meaning:"bad",example:"плохой день — plokhoy den — bad day",pos:"adjective",freq:9,register:"neutral"},
  {kr:"красивый",ro:"krasiviy",meaning:"beautiful / handsome",example:"красивый город — krasiviy gorod — beautiful city",pos:"adjective",freq:8,register:"neutral"},
  {kr:"новый",ro:"novy",meaning:"new",example:"новый телефон — novy telefon — new phone",pos:"adjective",freq:9,register:"neutral"},
  {kr:"старый",ro:"stary",meaning:"old",example:"старый дом — stary dom — old house",pos:"adjective",freq:8,register:"neutral"},
  {kr:"молодой",ro:"molodoy",meaning:"young",example:"молодой человек — molodoy chelovek — young person",pos:"adjective",freq:8,register:"neutral"},
  {kr:"дорогой",ro:"dorogoy",meaning:"expensive / dear",example:"это дорого — eto dorogo — it's expensive",pos:"adjective",freq:8,register:"neutral"},
  {kr:"дешёвый",ro:"deshyovy",meaning:"cheap / inexpensive",example:"это дёшево — eto dyoshevo — it's cheap",pos:"adjective",freq:7,register:"neutral"},
  {kr:"быстрый",ro:"bystry",meaning:"fast / quick",example:"быстрый поезд — bystry poyezd — fast train",pos:"adjective",freq:7,register:"neutral"},
  {kr:"медленный",ro:"medlenny",meaning:"slow",example:"медленно, пожалуйста — medlenno, pozhaluysta — slowly please",pos:"adjective",freq:7,register:"neutral"},
  {kr:"горячий",ro:"goryachy",meaning:"hot",example:"горячий кофе — goryachy kofe — hot coffee",pos:"adjective",freq:8,register:"neutral"},
  {kr:"холодный",ro:"kholodny",meaning:"cold",example:"холодная вода — kholodnaya voda — cold water",pos:"adjective",freq:8,register:"neutral"},
  {kr:"вкусный",ro:"vkusny",meaning:"tasty / delicious",example:"очень вкусно! — ochen vkusno! — very delicious!",pos:"adjective",freq:8,register:"neutral"},

  // Question Words
  {kr:"что",ro:"chto",meaning:"what",example:"что это? — chto eto? — what is this?",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"кто",ro:"kto",meaning:"who",example:"кто это? — kto eto? — who is this?",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"где",ro:"gde",meaning:"where",example:"где туалет? — gde tualet? — where is the toilet?",pos:"adverb",freq:10,register:"neutral"},
  {kr:"когда",ro:"kogda",meaning:"when",example:"когда вы приедете? — kogda vy priyedete? — when will you arrive?",pos:"adverb",freq:9,register:"neutral"},
  {kr:"почему",ro:"pochemu",meaning:"why",example:"почему ты грустный? — pochemu ty grustny? — why are you sad?",pos:"adverb",freq:9,register:"neutral"},
  {kr:"как",ro:"kak",meaning:"how",example:"как дела? — kak dela? — how are you?",pos:"adverb",freq:10,register:"neutral"},
  {kr:"сколько",ro:"skolko",meaning:"how much / how many",example:"сколько стоит? — skolko stoit? — how much does it cost?",pos:"adverb",freq:9,register:"neutral"},
  {kr:"какой",ro:"kakoy",meaning:"what kind / which",example:"какой ваш любимый фильм? — kakoy vash lyubimiy film? — what's your favorite film?",pos:"adjective",freq:9,register:"neutral"},

  // Time
  {kr:"сейчас",ro:"seychas",meaning:"now / right now",example:"я занят сейчас — ya zanyat seychas — I'm busy right now",pos:"adverb",freq:10,register:"neutral"},
  {kr:"сегодня",ro:"segodnya",meaning:"today",example:"сегодня хорошая погода — segodnya khoroshaya pogoda — today the weather is nice",pos:"adverb",freq:10,register:"neutral"},
  {kr:"завтра",ro:"zavtra",meaning:"tomorrow",example:"увидимся завтра — uvidimsya zavtra — see you tomorrow",pos:"adverb",freq:9,register:"neutral"},
  {kr:"вчера",ro:"vchera",meaning:"yesterday",example:"вчера я был дома — vchera ya byl doma — yesterday I was home",pos:"adverb",freq:8,register:"neutral"},
  {kr:"утром",ro:"utrom",meaning:"in the morning",example:"утром я пью кофе — utrom ya pyu kofe — in the morning I drink coffee",pos:"adverb",freq:9,register:"neutral"},
  {kr:"вечером",ro:"vecherom",meaning:"in the evening",example:"вечером я смотрю TV — vecherom ya smotryu TV — in the evening I watch TV",pos:"adverb",freq:8,register:"neutral"},
  {kr:"ночью",ro:"nochyu",meaning:"at night",example:"ночью я сплю — nochyu ya splyu — at night I sleep",pos:"adverb",freq:7,register:"neutral"},
  {kr:"всегда",ro:"vsegda",meaning:"always",example:"я всегда опаздываю — ya vsegda opazdyvayu — I always run late",pos:"adverb",freq:8,register:"neutral"},
  {kr:"никогда",ro:"nikogda",meaning:"never",example:"я никогда не пил водку — ya nikogda ne pil vodku — I never drank vodka",pos:"adverb",freq:7,register:"neutral"},
  {kr:"иногда",ro:"inogda",meaning:"sometimes",example:"я иногда готовлю — ya inogda gotovlyu — I sometimes cook",pos:"adverb",freq:7,register:"neutral"},

  // Useful Phrases
  {kr:"как вас зовут",ro:"kak vas zovut",meaning:"what is your name? (formal)",example:"как вас зовут? — kak vas zovut? — what is your name?",pos:"expression",freq:9,register:"formal"},
  {kr:"меня зовут",ro:"menya zovut",meaning:"my name is...",example:"меня зовут Иван — menya zovut Ivan — my name is Ivan",pos:"expression",freq:10,register:"neutral"},
  {kr:"откуда вы",ro:"otkuda vy",meaning:"where are you from?",example:"откуда вы? — otkuda vy? — where are you from?",pos:"expression",freq:8,register:"neutral"},
  {kr:"я из",ro:"ya iz",meaning:"I am from...",example:"я из Англии — ya iz Anglii — I am from England",pos:"expression",freq:9,register:"neutral"},
  {kr:"сколько стоит",ro:"skolko stoit",meaning:"how much does it cost?",example:"сколько стоит билет? — skolko stoit bilet? — how much is a ticket?",pos:"expression",freq:9,register:"neutral"},
  {kr:"где находится",ro:"gde nakhoditsya",meaning:"where is (located)?",example:"где находится вокзал? — gde nakhoditsya vokzal? — where is the train station?",pos:"expression",freq:8,register:"neutral"},
  {kr:"я не говорю по-русски",ro:"ya ne govoryu po-russki",meaning:"I don't speak Russian",example:"извините, я не говорю по-русски — izvinite, ya ne govoryu po-russki",pos:"expression",freq:8,register:"neutral"},
  {kr:"говорите медленнее",ro:"govorite medlennee",meaning:"speak more slowly",example:"пожалуйста, говорите медленнее — pozhaluysta, govorite medlennee — please speak more slowly",pos:"expression",freq:8,register:"neutral"},
  {kr:"повторите пожалуйста",ro:"povtorite pozhaluysta",meaning:"please repeat that",example:"повторите, пожалуйста — povtorite, pozhaluysta — could you repeat that?",pos:"expression",freq:7,register:"neutral"},
  {kr:"помогите мне",ro:"pomogite mne",meaning:"help me",example:"помогите мне, пожалуйста — pomogite mne, pozhaluysta — please help me",pos:"expression",freq:8,register:"neutral"},
  {kr:"мне нравится",ro:"mnye nravitsya",meaning:"I like (it)",example:"мне нравится эта музыка — mnye nravitsya eta muzyka — I like this music",pos:"expression",freq:9,register:"neutral"},
  {kr:"мне не нравится",ro:"mnye ne nravitsya",meaning:"I don't like (it)",example:"мне не нравится это — mnye ne nravitsya eto — I don't like this",pos:"expression",freq:8,register:"neutral"},
  {kr:"я не знаю",ro:"ya ne znayu",meaning:"I don't know",example:"я не знаю где это — ya ne znayu gde eto — I don't know where it is",pos:"expression",freq:10,register:"neutral"},
  {kr:"конечно",ro:"konechno",meaning:"of course / certainly",example:"да, конечно! — da, konechno! — yes, of course!",pos:"expression",freq:9,register:"neutral"},
  {kr:"может быть",ro:"mozhet byt",meaning:"maybe / perhaps",example:"может быть, завтра — mozhet byt, zavtra — maybe tomorrow",pos:"expression",freq:8,register:"neutral"},

  // Body
  {kr:"голова",ro:"golova",meaning:"head",example:"у меня болит голова — u menya bolit golova — I have a headache",pos:"noun",freq:8,register:"neutral"},
  {kr:"глаз",ro:"glaz",meaning:"eye",example:"у неё голубые глаза — u neyo golubyye glaza — she has blue eyes",pos:"noun",freq:8,register:"neutral"},
  {kr:"нос",ro:"nos",meaning:"nose",example:"у него большой нос — u nego bolshoy nos — he has a big nose",pos:"noun",freq:7,register:"neutral"},
  {kr:"рот",ro:"rot",meaning:"mouth",example:"открой рот — otkroy rot — open your mouth",pos:"noun",freq:7,register:"neutral"},
  {kr:"рука",ro:"ruka",meaning:"hand / arm",example:"дай мне руку — day mne ruku — give me your hand",pos:"noun",freq:8,register:"neutral"},
  {kr:"нога",ro:"noga",meaning:"foot / leg",example:"у меня болит нога — u menya bolit noga — my leg hurts",pos:"noun",freq:7,register:"neutral"},
  {kr:"спина",ro:"spina",meaning:"back",example:"у меня болит спина — u menya bolit spina — my back hurts",pos:"noun",freq:7,register:"neutral"},
  {kr:"сердце",ro:"serdtse",meaning:"heart",example:"у него большое сердце — u nego bolshoye serdtse — he has a big heart",pos:"noun",freq:7,register:"neutral"},

  // Nature & Weather
  {kr:"погода",ro:"pogoda",meaning:"weather",example:"какая сегодня погода? — kakaya segodnya pogoda? — what's the weather like today?",pos:"noun",freq:9,register:"neutral"},
  {kr:"солнце",ro:"solntse",meaning:"sun",example:"светит солнце — svetit solntse — the sun is shining",pos:"noun",freq:8,register:"neutral"},
  {kr:"небо",ro:"nebo",meaning:"sky",example:"голубое небо — goluboye nebo — blue sky",pos:"noun",freq:7,register:"neutral"},
  {kr:"дождь",ro:"dozhd",meaning:"rain",example:"идёт дождь — idyot dozhd — it is raining",pos:"noun",freq:8,register:"neutral"},
  {kr:"снег",ro:"sneg",meaning:"snow",example:"идёт снег — idyot sneg — it is snowing",pos:"noun",freq:7,register:"neutral"},
  {kr:"ветер",ro:"veter",meaning:"wind",example:"сильный ветер — silny veter — strong wind",pos:"noun",freq:7,register:"neutral"},
  {kr:"река",ro:"reka",meaning:"river",example:"на берегу реки — na beregu reki — on the river bank",pos:"noun",freq:7,register:"neutral"},
  {kr:"море",ro:"more",meaning:"sea",example:"мы едем на море — my yedyom na more — we're going to the sea",pos:"noun",freq:8,register:"neutral"},
  {kr:"лес",ro:"les",meaning:"forest",example:"в лесу тихо — v lesu tikho — it's quiet in the forest",pos:"noun",freq:7,register:"neutral"},
  {kr:"гора",ro:"gora",meaning:"mountain",example:"высокая гора — vysokaya gora — a high mountain",pos:"noun",freq:7,register:"neutral"},

  // Colors
  {kr:"красный",ro:"krasny",meaning:"red",example:"красная роза — krasnaya roza — red rose",pos:"adjective",freq:8,register:"neutral"},
  {kr:"синий",ro:"siniy",meaning:"blue (dark)",example:"синее небо — sineye nebo — blue sky",pos:"adjective",freq:8,register:"neutral"},
  {kr:"голубой",ro:"goluboy",meaning:"light blue / sky blue",example:"голубые глаза — golubyye glaza — light blue eyes",pos:"adjective",freq:7,register:"neutral"},
  {kr:"зелёный",ro:"zelyony",meaning:"green",example:"зелёная трава — zelyonaya trava — green grass",pos:"adjective",freq:8,register:"neutral"},
  {kr:"жёлтый",ro:"zhyolty",meaning:"yellow",example:"жёлтый цветок — zhyolty tsvetok — yellow flower",pos:"adjective",freq:7,register:"neutral"},
  {kr:"белый",ro:"bely",meaning:"white",example:"белый снег — bely sneg — white snow",pos:"adjective",freq:8,register:"neutral"},
  {kr:"чёрный",ro:"chorny",meaning:"black",example:"чёрная кошка — chornaya koshka — black cat",pos:"adjective",freq:8,register:"neutral"},
  {kr:"серый",ro:"sery",meaning:"grey",example:"серое небо — seroye nebo — grey sky",pos:"adjective",freq:7,register:"neutral"},
];

// ── RUSSIAN GRAMMAR NOTES ──────────────────────────────────────────────────────
// These push into GRAMMAR.russian once app.js initializes it

(function() {
  if (typeof GRAMMAR === 'undefined') return;
  if (!GRAMMAR.russian) GRAMMAR.russian = [];
  GRAMMAR.russian.push(
    {
      title: 'The letters that trap English speakers',
      short: 'Some Cyrillic letters look like English letters but sound completely different.',
      body: 'This is the first wall beginners hit. The Cyrillic alphabet looks partly familiar — and that familiarity is the trap.\n\nThe dangerous ones:\n  Р р — looks like P, sounds like R (rolled)\n  С с — looks like C, sounds like S\n  В в — looks like B, sounds like V\n  Н н — looks like H, sounds like N\n  У у — looks like Y, sounds like OO\n  Х х — looks like X, sounds like KH (Scottish "loch")\n\nThe safe ones (same as English):\n  А, Е (roughly), К, М, О (roughly), Т\n\nStrategy: learn the dangerous pairs first. Once those are locked in, the rest of the alphabet is fast.',
      example: 'Рот (rot) = MOUTH — not "pot"\nВот (vot) = HERE IS — not "bot"\nНет (nyet) = NO — not "het"\nСок (sok) = JUICE — not "cok"',
      level: 1
    },
    {
      title: 'End-of-word devoicing — words change sound at the end',
      short: 'Voiced consonants at the end of words become their voiceless partners.',
      body: 'In Russian, six consonants change their sound when they appear at the end of a word.\n\nThe pairs:\n  Б → П (voiced b → voiceless p)\n  В → Ф (voiced v → voiceless f)\n  Г → К (voiced g → voiceless k)\n  Д → Т (voiced d → voiceless t)\n  З → С (voiced z → voiceless s)\n  Ж → Ш (voiced zh → voiceless sh)\n\nThis is why год (year) is pronounced "got" not "god". The Д at the end devoices to Т.\n\nThis happens automatically — native speakers don\'t think about it. You should learn to hear it when listening, and produce it when speaking.',
      example: 'год (god) = year → pronounced "got"\nхлеб (khleb) = bread → pronounced "khlyep"\nгород (gorod) = city → pronounced "gorot"\nмороз (moroz) = frost → pronounced "moros"',
      level: 1
    },
    {
      title: 'О sounds like А when unstressed — this is called akanye',
      short: 'Unstressed О is pronounced like А. This affects almost every sentence.',
      body: 'Stress in Russian is unpredictable (you have to learn it per word) and it changes how vowels sound.\n\nThe most important rule: when О is not stressed, it sounds like А.\n\nThis is called аканье (akanye) and it is used in standard Russian speech.\n\nThe word молоко (milk) has three O\'s:\n  1st О — unstressed → sounds like А\n  2nd О — unstressed → sounds like А\n  3rd О — STRESSED → sounds like O\n\nSo молоко is pronounced "mAlAko" not "moloko".\n\nThis is not sloppy speech — it is standard Russian. Textbooks write О but speakers say А.',
      example: 'молоко (milk) → mAlAko\nхорошо (good/okay) → khArAsho\nпотому что (because) → pAtAmu shto\nмосква (Moscow) → mAskva',
      level: 1
    },
    {
      title: 'Russian has no "the" or "a" — context does the work',
      short: 'There are no articles in Russian. No the, no a/an.',
      body: 'English uses articles constantly: the book, a book, an apple, the car.\n\nRussian has none of these. The word книга means "book", "a book", and "the book" depending on context.\n\nHow does Russian show the difference?\n  Word order — новая книга (a new book, introducing it for the first time)\n  Context — once a noun is established, listeners know which one you mean\n  Demonstratives — эта книга (this book) or та книга (that book) when you need to specify\n\nFor beginners this is actually good news — three fewer words to worry about.',
      example: 'Это книга. — This is a book. (eto kniga)\nКнига интересная. — The book is interesting. (kniga interesnaya)\nЭта книга интересная. — This book is interesting. (eta kniga interesnaya)',
      level: 1
    },
    {
      title: 'Russian verbs conjugate — the ending tells you who',
      short: 'Verb endings change to show the subject. Subject pronouns are often dropped.',
      body: 'Russian verb endings carry information about who is doing the action. This means you often don\'t need to say я (I) or ты (you) explicitly.\n\nExample with говорить (to speak):\n  я говорю — I speak\n  ты говоришь — you speak\n  он/она говорит — he/she speaks\n  мы говорим — we speak\n  вы говорите — you speak (formal/plural)\n  они говорят — they speak\n\nIn natural speech:\n  "Говорю по-русски" = I speak Russian (no я needed)\n  "Где живёшь?" = Where do you live? (no ты needed)\n\nThe ending is the subject. Start noticing this pattern and conjugation will click faster.',
      example: 'Говорю по-русски. — I speak Russian.\nГоворишь по-английски? — Do you speak English?\nОн говорит очень быстро. — He speaks very fast.',
      level: 2
    }
  );
})();

// ── LANGUAGES OBJECT — add Russian ────────────────────────────────────────────
// This needs to be done in app.js boot — handled via window global
window.RUSSIAN_WORDS = RUSSIAN_WORDS;
