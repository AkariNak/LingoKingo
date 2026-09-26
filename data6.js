// ── DATA6.JS — Mexican Spanish & Venezuelan Spanish (separated) ───────────────
// Mexican Spanish uses SPANISH_MX_WORDS
// Venezuelan Spanish uses SPANISH_VE_WORDS
// No dialect-specific words cross between them

// ── SHARED CORE (neutral Latin American Spanish) ──────────────────────────────
// These go into both arrays at the end of this file
const SPANISH_CORE = [

  // Greetings shared by both
  {kr:"hola",ro:"hola",meaning:"hello / hi",example:"¡Hola! ¿Cómo estás? — Hello! How are you?",pos:"expression",freq:10,register:"casual"},
  {kr:"buenos días",ro:"buenos días",meaning:"good morning",example:"Buenos días — Good morning",pos:"expression",freq:9,register:"neutral"},
  {kr:"buenas tardes",ro:"buenas tardes",meaning:"good afternoon",example:"Buenas tardes — Good afternoon",pos:"expression",freq:9,register:"neutral"},
  {kr:"buenas noches",ro:"buenas noches",meaning:"good evening / good night",example:"Buenas noches — Good night",pos:"expression",freq:9,register:"neutral"},
  {kr:"adiós",ro:"adiós",meaning:"goodbye",example:"Adiós, cuídate — Goodbye, take care",pos:"expression",freq:10,register:"neutral"},
  {kr:"hasta luego",ro:"hasta luego",meaning:"see you later",example:"Hasta luego — See you later",pos:"expression",freq:9,register:"casual"},
  {kr:"gracias",ro:"gracias",meaning:"thank you",example:"Muchas gracias — Thank you very much",pos:"expression",freq:10,register:"neutral"},
  {kr:"por favor",ro:"por favor",meaning:"please",example:"Un café, por favor — A coffee, please",pos:"expression",freq:10,register:"neutral"},
  {kr:"perdón",ro:"perdón",meaning:"sorry / excuse me",example:"Perdón, no entendí — Sorry, I didn't understand",pos:"expression",freq:9,register:"neutral"},
  {kr:"sí",ro:"sí",meaning:"yes",example:"Sí, claro — Yes, of course",pos:"expression",freq:10,register:"neutral"},
  {kr:"no",ro:"no",meaning:"no",example:"No, gracias — No, thank you",pos:"expression",freq:10,register:"neutral"},
  {kr:"¿cómo estás?",ro:"¿cómo estás?",meaning:"how are you?",example:"¡Hola! ¿Cómo estás? — Hi! How are you?",pos:"expression",freq:10,register:"casual"},
  {kr:"bien",ro:"bien",meaning:"well / fine",example:"Estoy bien, gracias — I'm fine, thanks",pos:"expression",freq:10,register:"neutral"},
  {kr:"me llamo",ro:"me llamo",meaning:"my name is",example:"Me llamo Ana — My name is Ana",pos:"expression",freq:10,register:"neutral"},
  {kr:"mucho gusto",ro:"mucho gusto",meaning:"nice to meet you",example:"Mucho gusto — Nice to meet you",pos:"expression",freq:9,register:"neutral"},
  {kr:"de nada",ro:"de nada",meaning:"you're welcome",example:"De nada — You're welcome",pos:"expression",freq:9,register:"neutral"},
  {kr:"claro",ro:"claro",meaning:"of course / sure",example:"¡Claro que sí! — Of course!",pos:"expression",freq:9,register:"neutral"},

  // Core pronouns
  {kr:"yo",ro:"yo",meaning:"I",example:"Yo soy estudiante — I am a student",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"tú",ro:"tú",meaning:"you (casual)",example:"¿Tú hablas español? — Do you speak Spanish?",pos:"pronoun",freq:10,register:"casual"},
  {kr:"él",ro:"él",meaning:"he",example:"Él es médico — He is a doctor",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"ella",ro:"ella",meaning:"she",example:"Ella estudia — She studies",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"nosotros",ro:"nosotros",meaning:"we",example:"Nosotros somos amigos — We are friends",pos:"pronoun",freq:9,register:"neutral"},
  {kr:"ustedes",ro:"ustedes",meaning:"you all",example:"¿Ustedes quieren comer? — Do you all want to eat?",pos:"pronoun",freq:9,register:"neutral"},
  {kr:"ellos",ro:"ellos",meaning:"they",example:"Ellos viven aquí — They live here",pos:"pronoun",freq:9,register:"neutral"},

  // Core verbs
  {kr:"ser",ro:"ser",meaning:"to be (permanent)",example:"Soy mexicana — I am Mexican",pos:"verb",freq:10,register:"neutral"},
  {kr:"estar",ro:"estar",meaning:"to be (temporary/location)",example:"Estoy cansada — I am tired",pos:"verb",freq:10,register:"neutral"},
  {kr:"tener",ro:"tener",meaning:"to have",example:"Tengo hambre — I'm hungry",pos:"verb",freq:10,register:"neutral"},
  {kr:"hacer",ro:"hacer",meaning:"to do / to make",example:"¿Qué haces? — What are you doing?",pos:"verb",freq:10,register:"neutral"},
  {kr:"ir",ro:"ir",meaning:"to go",example:"Voy al mercado — I'm going to the market",pos:"verb",freq:10,register:"neutral"},
  {kr:"querer",ro:"querer",meaning:"to want / to love",example:"Quiero un café — I want a coffee",pos:"verb",freq:10,register:"neutral"},
  {kr:"poder",ro:"poder",meaning:"to be able to / can",example:"No puedo ir — I can't go",pos:"verb",freq:10,register:"neutral"},
  {kr:"saber",ro:"saber",meaning:"to know",example:"No sé — I don't know",pos:"verb",freq:10,register:"neutral"},
  {kr:"hablar",ro:"hablar",meaning:"to speak",example:"Hablo español — I speak Spanish",pos:"verb",freq:10,register:"neutral"},
  {kr:"comer",ro:"comer",meaning:"to eat",example:"¿Quieres comer? — Do you want to eat?",pos:"verb",freq:10,register:"neutral"},
  {kr:"beber",ro:"beber",meaning:"to drink",example:"Bebo agua — I drink water",pos:"verb",freq:9,register:"neutral"},
  {kr:"dormir",ro:"dormir",meaning:"to sleep",example:"Dormí bien — I slept well",pos:"verb",freq:9,register:"neutral"},
  {kr:"trabajar",ro:"trabajar",meaning:"to work",example:"Trabajo mucho — I work a lot",pos:"verb",freq:9,register:"neutral"},
  {kr:"vivir",ro:"vivir",meaning:"to live",example:"¿Dónde vives? — Where do you live?",pos:"verb",freq:9,register:"neutral"},
  {kr:"decir",ro:"decir",meaning:"to say / to tell",example:"¿Qué dijiste? — What did you say?",pos:"verb",freq:10,register:"neutral"},
  {kr:"ver",ro:"ver",meaning:"to see / to watch",example:"Veo televisión — I watch TV",pos:"verb",freq:9,register:"neutral"},
  {kr:"venir",ro:"venir",meaning:"to come",example:"¿Puedes venir? — Can you come?",pos:"verb",freq:9,register:"neutral"},
  {kr:"dar",ro:"dar",meaning:"to give",example:"Dame tu número — Give me your number",pos:"verb",freq:9,register:"neutral"},
  {kr:"llegar",ro:"llegar",meaning:"to arrive",example:"Llegué tarde — I arrived late",pos:"verb",freq:8,register:"neutral"},
  {kr:"salir",ro:"salir",meaning:"to leave / go out",example:"Salgo a las ocho — I leave at eight",pos:"verb",freq:8,register:"neutral"},
  {kr:"gustar",ro:"gustar",meaning:"to like (lit: to please)",example:"Me gusta el café — I like coffee",pos:"verb",freq:10,register:"neutral"},
  {kr:"necesitar",ro:"necesitar",meaning:"to need",example:"Necesito ayuda — I need help",pos:"verb",freq:8,register:"neutral"},
  {kr:"llamar",ro:"llamar",meaning:"to call",example:"Te llamo después — I'll call you later",pos:"verb",freq:8,register:"neutral"},
  {kr:"esperar",ro:"esperar",meaning:"to wait / to hope",example:"Espera un momento — Wait a moment",pos:"verb",freq:8,register:"neutral"},
  {kr:"pensar",ro:"pensar",meaning:"to think",example:"Pienso que sí — I think so",pos:"verb",freq:8,register:"neutral"},
  {kr:"comprar",ro:"comprar",meaning:"to buy",example:"Voy a comprar leche — I'm going to buy milk",pos:"verb",freq:8,register:"neutral"},
  {kr:"leer",ro:"leer",meaning:"to read",example:"Leo mucho — I read a lot",pos:"verb",freq:8,register:"neutral"},
  {kr:"escribir",ro:"escribir",meaning:"to write",example:"Escribo cartas — I write letters",pos:"verb",freq:7,register:"neutral"},
  {kr:"estudiar",ro:"estudiar",meaning:"to study",example:"Estudio español — I study Spanish",pos:"verb",freq:9,register:"neutral"},
  {kr:"aprender",ro:"aprender",meaning:"to learn",example:"Aprendo español — I'm learning Spanish",pos:"verb",freq:8,register:"neutral"},

  // Core nouns shared
  {kr:"agua",ro:"agua",meaning:"water",example:"Un vaso de agua — A glass of water",pos:"noun",freq:10,register:"neutral"},
  {kr:"café",ro:"café",meaning:"coffee",example:"¿Quieres café? — Do you want coffee?",pos:"noun",freq:9,register:"neutral"},
  {kr:"pan",ro:"pan",meaning:"bread",example:"Pan fresco — Fresh bread",pos:"noun",freq:9,register:"neutral"},
  {kr:"arroz",ro:"arroz",meaning:"rice",example:"Arroz con pollo — Rice with chicken",pos:"noun",freq:9,register:"neutral"},
  {kr:"carne",ro:"carne",meaning:"meat",example:"Carne asada — Grilled meat",pos:"noun",freq:8,register:"neutral"},
  {kr:"pollo",ro:"pollo",meaning:"chicken",example:"Pollo a la plancha — Grilled chicken",pos:"noun",freq:8,register:"neutral"},
  {kr:"huevo",ro:"huevo",meaning:"egg",example:"Huevos revueltos — Scrambled eggs",pos:"noun",freq:8,register:"neutral"},
  {kr:"queso",ro:"queso",meaning:"cheese",example:"Queso fresco — Fresh cheese",pos:"noun",freq:8,register:"neutral"},
  {kr:"casa",ro:"casa",meaning:"house / home",example:"Voy a mi casa — I'm going home",pos:"noun",freq:10,register:"neutral"},
  {kr:"calle",ro:"calle",meaning:"street",example:"Esta calle — This street",pos:"noun",freq:8,register:"neutral"},
  {kr:"ciudad",ro:"ciudad",meaning:"city",example:"Una ciudad bonita — A pretty city",pos:"noun",freq:9,register:"neutral"},
  {kr:"familia",ro:"familia",meaning:"family",example:"Mi familia — My family",pos:"noun",freq:9,register:"neutral"},
  {kr:"amigo",ro:"amigo",meaning:"friend (male)",example:"Mi mejor amigo — My best friend",pos:"noun",freq:9,register:"neutral"},
  {kr:"amiga",ro:"amiga",meaning:"friend (female)",example:"Mi mejor amiga — My best friend",pos:"noun",freq:8,register:"neutral"},
  {kr:"trabajo",ro:"trabajo",meaning:"work / job",example:"Busco trabajo — I'm looking for work",pos:"noun",freq:9,register:"neutral"},
  {kr:"tiempo",ro:"tiempo",meaning:"time / weather",example:"No tengo tiempo — I don't have time",pos:"noun",freq:9,register:"neutral"},
  {kr:"día",ro:"día",meaning:"day",example:"Un buen día — A good day",pos:"noun",freq:10,register:"neutral"},
  {kr:"noche",ro:"noche",meaning:"night",example:"Buenas noches — Good night",pos:"noun",freq:9,register:"neutral"},

  // Shared adjectives
  {kr:"grande",ro:"grande",meaning:"big / great",example:"Una ciudad grande — A big city",pos:"adjective",freq:10,register:"neutral"},
  {kr:"pequeño",ro:"pequeño",meaning:"small",example:"Un cuarto pequeño — A small room",pos:"adjective",freq:9,register:"neutral"},
  {kr:"bueno",ro:"bueno",meaning:"good",example:"Muy bueno — Very good",pos:"adjective",freq:10,register:"neutral"},
  {kr:"malo",ro:"malo",meaning:"bad",example:"Un día malo — A bad day",pos:"adjective",freq:8,register:"neutral"},
  {kr:"nuevo",ro:"nuevo",meaning:"new",example:"Un teléfono nuevo — A new phone",pos:"adjective",freq:9,register:"neutral"},
  {kr:"viejo",ro:"viejo",meaning:"old",example:"Un edificio viejo — An old building",pos:"adjective",freq:8,register:"neutral"},
  {kr:"bonito",ro:"bonito",meaning:"pretty / nice",example:"¡Qué bonito! — How pretty!",pos:"adjective",freq:8,register:"neutral"},
  {kr:"rico",ro:"rico",meaning:"delicious / rich",example:"¡Qué rico! — How delicious!",pos:"adjective",freq:8,register:"casual"},
  {kr:"caro",ro:"caro",meaning:"expensive",example:"Está muy caro — Very expensive",pos:"adjective",freq:8,register:"neutral"},
  {kr:"barato",ro:"barato",meaning:"cheap",example:"¡Qué barato! — How cheap!",pos:"adjective",freq:7,register:"neutral"},
  {kr:"feliz",ro:"feliz",meaning:"happy",example:"Estoy feliz — I am happy",pos:"adjective",freq:8,register:"neutral"},
  {kr:"triste",ro:"triste",meaning:"sad",example:"Estoy triste — I am sad",pos:"adjective",freq:7,register:"neutral"},
  {kr:"cansado",ro:"cansado",meaning:"tired",example:"Estoy muy cansado — I'm very tired",pos:"adjective",freq:8,register:"neutral"},
  {kr:"ocupado",ro:"ocupado",meaning:"busy",example:"Estoy ocupada — I'm busy",pos:"adjective",freq:7,register:"neutral"},

  // Shared question words
  {kr:"¿qué?",ro:"¿qué?",meaning:"what?",example:"¿Qué quieres? — What do you want?",pos:"pronoun",freq:10,register:"neutral"},
  {kr:"¿quién?",ro:"¿quién?",meaning:"who?",example:"¿Quién es? — Who is it?",pos:"pronoun",freq:9,register:"neutral"},
  {kr:"¿dónde?",ro:"¿dónde?",meaning:"where?",example:"¿Dónde vives? — Where do you live?",pos:"adverb",freq:10,register:"neutral"},
  {kr:"¿cuándo?",ro:"¿cuándo?",meaning:"when?",example:"¿Cuándo llegas? — When do you arrive?",pos:"adverb",freq:9,register:"neutral"},
  {kr:"¿por qué?",ro:"¿por qué?",meaning:"why?",example:"¿Por qué no vienes? — Why aren't you coming?",pos:"adverb",freq:9,register:"neutral"},
  {kr:"¿cómo?",ro:"¿cómo?",meaning:"how?",example:"¿Cómo lo hiciste? — How did you do it?",pos:"adverb",freq:10,register:"neutral"},
  {kr:"¿cuánto?",ro:"¿cuánto?",meaning:"how much?",example:"¿Cuánto cuesta? — How much does it cost?",pos:"adjective",freq:9,register:"neutral"},

  // Shared connectors
  {kr:"y",ro:"y",meaning:"and",example:"Café y leche — Coffee and milk",pos:"adverb",freq:10,register:"neutral"},
  {kr:"o",ro:"o",meaning:"or",example:"¿Café o té? — Coffee or tea?",pos:"adverb",freq:9,register:"neutral"},
  {kr:"pero",ro:"pero",meaning:"but",example:"Me gusta, pero es caro — I like it but it's expensive",pos:"adverb",freq:10,register:"neutral"},
  {kr:"porque",ro:"porque",meaning:"because",example:"No fui porque estaba enfermo — I didn't go because I was sick",pos:"adverb",freq:9,register:"neutral"},
  {kr:"también",ro:"también",meaning:"also / too",example:"Yo también — Me too",pos:"adverb",freq:9,register:"neutral"},
  {kr:"muy",ro:"muy",meaning:"very",example:"Estoy muy cansado — I'm very tired",pos:"adverb",freq:10,register:"neutral"},
  {kr:"mucho",ro:"mucho",meaning:"a lot",example:"Te quiero mucho — I love you a lot",pos:"adverb",freq:10,register:"neutral"},
  {kr:"más",ro:"más",meaning:"more",example:"Quiero más — I want more",pos:"adverb",freq:10,register:"neutral"},
  {kr:"aquí",ro:"aquí",meaning:"here",example:"Estoy aquí — I'm here",pos:"adverb",freq:10,register:"neutral"},
  {kr:"ahora",ro:"ahora",meaning:"now",example:"Hazlo ahora — Do it now",pos:"adverb",freq:10,register:"neutral"},
  {kr:"hoy",ro:"hoy",meaning:"today",example:"¿Qué haces hoy? — What are you doing today?",pos:"adverb",freq:10,register:"neutral"},
  {kr:"mañana",ro:"mañana",meaning:"tomorrow / morning",example:"Hasta mañana — See you tomorrow",pos:"adverb",freq:10,register:"neutral"},
  {kr:"ayer",ro:"ayer",meaning:"yesterday",example:"¿Qué hiciste ayer? — What did you do yesterday?",pos:"adverb",freq:9,register:"neutral"},
  {kr:"siempre",ro:"siempre",meaning:"always",example:"Siempre llego tarde — I always arrive late",pos:"adverb",freq:9,register:"neutral"},
  {kr:"nunca",ro:"nunca",meaning:"never",example:"Nunca he ido — I've never been",pos:"adverb",freq:8,register:"neutral"},
  {kr:"ya",ro:"ya",meaning:"already / now",example:"Ya llegué — I already arrived",pos:"adverb",freq:10,register:"casual"},

  // Numbers
  {kr:"uno",ro:"uno",meaning:"one",example:"Un café — One coffee",pos:"noun",freq:10,register:"neutral"},
  {kr:"dos",ro:"dos",meaning:"two",example:"Dos boletos — Two tickets",pos:"noun",freq:10,register:"neutral"},
  {kr:"tres",ro:"tres",meaning:"three",example:"Tres horas — Three hours",pos:"noun",freq:10,register:"neutral"},
  {kr:"cuatro",ro:"cuatro",meaning:"four",example:"Cuatro personas — Four people",pos:"noun",freq:9,register:"neutral"},
  {kr:"cinco",ro:"cinco",meaning:"five",example:"Cinco minutos — Five minutes",pos:"noun",freq:9,register:"neutral"},
  {kr:"diez",ro:"diez",meaning:"ten",example:"Diez pesos — Ten pesos",pos:"noun",freq:8,register:"neutral"},
  {kr:"veinte",ro:"veinte",meaning:"twenty",example:"Veinte años — Twenty years",pos:"noun",freq:7,register:"neutral"},
  {kr:"cien",ro:"cien",meaning:"one hundred",example:"Cien pesos — One hundred pesos",pos:"noun",freq:7,register:"neutral"},
];

// ── MEXICAN SPANISH EXCLUSIVE ─────────────────────────────────────────────────
const SPANISH_MX_EXCLUSIVE = [
  // Mexican slang & expressions
  {kr:"órale",ro:"órale",meaning:"okay / alright / wow / let's go",example:"¿Listo? — Órale — Ready? — Alright",pos:"expression",freq:9,register:"casual"},
  {kr:"ahorita",ro:"ahorita",meaning:"right now / in a bit / later (context-dependent)",example:"Ahorita vengo — I'll be right there / I'll come later",pos:"adverb",freq:9,register:"casual"},
  {kr:"ahorita mismo",ro:"ahorita mismo",meaning:"right this second (truly immediate)",example:"¡Ahorita mismo! — Right now this instant!",pos:"adverb",freq:7,register:"casual"},
  {kr:"padre",ro:"padre",meaning:"cool / awesome",example:"¡Está muy padre! — That's awesome!",pos:"adjective",freq:8,register:"casual"},
  {kr:"chido",ro:"chido",meaning:"cool / great (youth slang)",example:"¡Qué chido! — How cool!",pos:"adjective",freq:7,register:"casual"},
  {kr:"chafa",ro:"chafa",meaning:"low quality / fake / bad",example:"Eso está muy chafa — That's really bad quality",pos:"adjective",freq:6,register:"casual"},
  {kr:"güey / wey",ro:"güey / wey",meaning:"dude / man / idiot (very common filler word)",example:"¡Órale, güey! — Come on, dude!",pos:"expression",freq:8,register:"casual"},
  {kr:"chavo",ro:"chavo",meaning:"kid / young guy",example:"Ese chavo es muy listo — That kid is very smart",pos:"noun",freq:7,register:"casual"},
  {kr:"chava",ro:"chava",meaning:"girl / young woman",example:"Una chava muy bonita — A very pretty girl",pos:"noun",freq:7,register:"casual"},
  {kr:"cuate",ro:"cuate",meaning:"buddy / twin / close friend",example:"Mi cuate de la escuela — My school buddy",pos:"noun",freq:6,register:"casual"},
  {kr:"mande",ro:"mande",meaning:"pardon? / yes? / I beg your pardon? (polite response)",example:"¿Mande? — Pardon me? / Yes?",pos:"expression",freq:8,register:"formal"},
  {kr:"antro",ro:"antro",meaning:"nightclub / bar",example:"Vamos al antro — Let's go to the club",pos:"noun",freq:6,register:"casual"},
  {kr:"torta",ro:"torta",meaning:"Mexican sandwich (on a bolillo roll)",example:"Una torta de jamón — A ham sandwich",pos:"noun",freq:7,register:"neutral"},
  {kr:"tacos",ro:"tacos",meaning:"tacos",example:"Unos tacos al pastor — Some tacos al pastor",pos:"noun",freq:8,register:"casual"},
  {kr:"quesadilla",ro:"quesadilla",meaning:"quesadilla (folded tortilla with cheese)",example:"Una quesadilla con queso — A cheese quesadilla",pos:"noun",freq:7,register:"neutral"},
  {kr:"elote",ro:"elote",meaning:"corn on the cob",example:"Elote con chile y limón — Corn with chile and lime",pos:"noun",freq:6,register:"neutral"},
  {kr:"chilango",ro:"chilango",meaning:"person from Mexico City",example:"Soy chilango — I'm from Mexico City",pos:"noun",freq:5,register:"casual"},
  {kr:"naco",ro:"naco",meaning:"tacky / low-class (informal insult)",example:"No seas naco — Don't be tacky",pos:"adjective",freq:5,register:"casual"},
  {kr:"feria",ro:"feria",meaning:"coins / loose change / money (slang)",example:"No tengo feria — I don't have change/money",pos:"noun",freq:6,register:"casual"},
  {kr:"camión",ro:"camión",meaning:"bus (Mexico)",example:"Me voy en camión — I'm going by bus",pos:"noun",freq:7,register:"casual"},
  {kr:"colonía",ro:"colonía",meaning:"neighborhood / district (Mexico)",example:"Vivo en la colonia Roma — I live in the Roma district",pos:"noun",freq:6,register:"neutral"},
  {kr:"popote",ro:"popote",meaning:"straw (drinking straw)",example:"¿Me da un popote? — Can I get a straw?",pos:"noun",freq:5,register:"casual"},
  {kr:"chamaco",ro:"chamaco",meaning:"kid / child",example:"Ese chamaco es travieso — That kid is mischievous",pos:"noun",freq:6,register:"casual"},
  {kr:"jefe",ro:"jefe",meaning:"boss / also used for dad (slang)",example:"Mi jefe llegó — My boss/dad arrived",pos:"noun",freq:7,register:"casual"},
  {kr:"jefa",ro:"jefa",meaning:"boss / also used for mom (slang)",example:"Mi jefa cocinó — My mom cooked",pos:"noun",freq:7,register:"casual"},
  {kr:"no manches",ro:"no manches",meaning:"no way! / come on! (mild expletive)",example:"¡No manches! ¿En serio? — No way! Seriously?",pos:"expression",freq:7,register:"casual"},
  {kr:"qué onda",ro:"qué onda",meaning:"what's up / what's going on",example:"¿Qué onda, güey? — What's up, dude?",pos:"expression",freq:8,register:"casual"},
  {kr:"al rato",ro:"al rato",meaning:"later / in a while",example:"Al rato nos vemos — We'll see each other later",pos:"adverb",freq:7,register:"casual"},
  {kr:"híjole",ro:"híjole",meaning:"wow / oh my / dang (exclamation)",example:"¡Híjole, qué problema! — Oh man, what a problem!",pos:"expression",freq:6,register:"casual"},
  {kr:"chingón",ro:"chingón",meaning:"awesome / badass (strong slang)",example:"¡Estás chingón! — You're awesome!",pos:"adjective",freq:5,register:"vulgar"},
  // Mexican food
  {kr:"salsa",ro:"salsa",meaning:"sauce / salsa",example:"Salsa picante — Hot sauce",pos:"noun",freq:8,register:"casual"},
  {kr:"chile",ro:"chile",meaning:"chili pepper",example:"Chile habanero — Habanero pepper",pos:"noun",freq:7,register:"neutral"},
  {kr:"limón",ro:"limón",meaning:"lime (in Mexico, limón = lime)",example:"Con limón y sal — With lime and salt",pos:"noun",freq:7,register:"neutral"},
  {kr:"aguacate",ro:"aguacate",meaning:"avocado",example:"Guacamole de aguacate — Avocado guacamole",pos:"noun",freq:7,register:"neutral"},
  {kr:"nopal",ro:"nopal",meaning:"cactus pad (food)",example:"Tacos de nopal — Cactus tacos",pos:"noun",freq:5,register:"neutral"},
  {kr:"mole",ro:"mole",meaning:"mole sauce",example:"Mole negro de Oaxaca — Oaxacan black mole",pos:"noun",freq:5,register:"neutral"},
  {kr:"frijoles",ro:"frijoles",meaning:"beans",example:"Frijoles de olla — Pot beans",pos:"noun",freq:8,register:"neutral"},
  {kr:"bolillo",ro:"bolillo",meaning:"Mexican bread roll",example:"Un bolillo con mantequilla — A bread roll with butter",pos:"noun",freq:5,register:"neutral"},
  // Mexican transport/places
  {kr:"CDMX",ro:"ciudad de México",meaning:"Mexico City (abbreviation)",example:"Vivo en CDMX — I live in Mexico City",pos:"noun",freq:6,register:"neutral"},
  {kr:"tianguis",ro:"tianguis",meaning:"outdoor market / flea market",example:"Compré en el tianguis — I bought it at the market",pos:"noun",freq:5,register:"casual"},
  {kr:"taquería",ro:"taquería",meaning:"taco stand / taco restaurant",example:"La mejor taquería del barrio — The best taco place in the neighborhood",pos:"noun",freq:5,register:"casual"},
];

// ── VENEZUELAN SPANISH EXCLUSIVE ──────────────────────────────────────────────
const SPANISH_VE_EXCLUSIVE = [
  // Venezuelan slang & expressions
  {kr:"chévere",ro:"chévere",meaning:"cool / great / awesome",example:"¡Eso está chévere! — That's cool!",pos:"adjective",freq:9,register:"casual"},
  {kr:"dale",ro:"dale",meaning:"okay / go for it / sounds good",example:"¿Vamos? — Dale — Shall we go? — Sure",pos:"expression",freq:9,register:"casual"},
  {kr:"pana",ro:"pana",meaning:"buddy / friend / mate",example:"Ese es mi pana — That's my buddy",pos:"noun",freq:9,register:"casual"},
  {kr:"chamo",ro:"chamo",meaning:"kid / young person / dude",example:"Ese chamo juega bien — That kid plays well",pos:"noun",freq:9,register:"casual"},
  {kr:"chama",ro:"chama",meaning:"girl / young woman",example:"Una chama muy inteligente — A very smart girl",pos:"noun",freq:8,register:"casual"},
  {kr:"vaina",ro:"vaina",meaning:"thing / stuff / situation (all-purpose word)",example:"¿Qué es esa vaina? — What is that thing?",pos:"noun",freq:10,register:"casual"},
  {kr:"¿qué es la vaina?",ro:"¿qué es la vaina?",meaning:"what's going on? / what's the deal?",example:"¿Qué es la vaina aquí? — What's going on here?",pos:"expression",freq:7,register:"casual"},
  {kr:"arrecho",ro:"arrecho",meaning:"angry / furious / also: awesome (context)",example:"Está arrecho — He's furious",pos:"adjective",freq:7,register:"casual"},
  {kr:"arrechera",ro:"arrechera",meaning:"anger / frustration",example:"Tengo una arrechera — I'm so frustrated",pos:"noun",freq:6,register:"casual"},
  {kr:"bravo",ro:"bravo",meaning:"angry (Venezuela/Caribbean)",example:"Está bravo — He's angry",pos:"adjective",freq:7,register:"casual"},
  {kr:"marico",ro:"marico",meaning:"dude / man (casual, not offensive in context)",example:"¡Marico, no me digas! — Dude, no way!",pos:"expression",freq:6,register:"casual"},
  {kr:"coño",ro:"coño",meaning:"damn / wow / expression of surprise/frustration",example:"¡Coño, qué calor! — Damn, it's so hot!",pos:"expression",freq:7,register:"casual"},
  {kr:"coñazo",ro:"coñazo",meaning:"a hard hit / something very intense",example:"Me di un coñazo — I hit myself hard",pos:"noun",freq:5,register:"casual"},
  {kr:"verga",ro:"verga",meaning:"strong exclamation (vulgar but very common)",example:"¡Verga, qué bueno! — Damn, that's good!",pos:"expression",freq:5,register:"vulgar"},
  {kr:"parcharse",ro:"parcharse",meaning:"to hang out / to meet up",example:"Vamos a parcharnos — Let's hang out",pos:"verb",freq:7,register:"casual"},
  {kr:"parche",ro:"parche",meaning:"hangout / group of friends",example:"El parche de siempre — The usual crew",pos:"noun",freq:6,register:"casual"},
  {kr:"ladilla",ro:"ladilla",meaning:"annoying / a nuisance",example:"¡Qué ladilla! — What a pain!",pos:"noun",freq:6,register:"casual"},
  {kr:"nojoda",ro:"nojoda",meaning:"no way / seriously (mild expletive)",example:"¡Nojoda, qué bueno! — No way, that's great!",pos:"expression",freq:6,register:"casual"},
  {kr:"cheverísimo",ro:"cheverísimo",meaning:"extremely cool / the coolest",example:"¡Estuvo cheverísimo! — It was amazing!",pos:"adjective",freq:6,register:"casual"},
  {kr:"pela",ro:"pela",meaning:"beating / thrashing",example:"Le dieron una pela — They beat him",pos:"noun",freq:5,register:"casual"},
  {kr:"broma",ro:"broma",meaning:"joke",example:"Es una broma — It's a joke",pos:"noun",freq:7,register:"neutral"},
  {kr:"joder",ro:"joder",meaning:"to bother / to mess with",example:"No me jodas — Don't mess with me",pos:"verb",freq:6,register:"casual"},
  {kr:"chota",ro:"chota",meaning:"police (slang)",example:"Viene la chota — The cops are coming",pos:"noun",freq:4,register:"casual"},
  {kr:"real",ro:"real",meaning:"money / Venezuelan currency (historical)",example:"No tengo reales — I have no money",pos:"noun",freq:5,register:"casual"},
  {kr:"bolívar",ro:"bolívar",meaning:"Venezuelan currency",example:"Cuesta mil bolívares — It costs a thousand bolívares",pos:"noun",freq:6,register:"neutral"},
  // Venezuelan food
  {kr:"arepa",ro:"arepa",meaning:"arepa — corn flatbread (staple)",example:"Una arepa con queso — An arepa with cheese",pos:"noun",freq:9,register:"neutral"},
  {kr:"caraotas",ro:"caraotas",meaning:"black beans (Venezuela)",example:"Caraotas negras — Black beans",pos:"noun",freq:8,register:"neutral"},
  {kr:"pabellón criollo",ro:"pabellón criollo",meaning:"Venezuela's national dish (rice, beans, beef, plantain)",example:"Un pabellón completo — A full pabellón",pos:"noun",freq:6,register:"neutral"},
  {kr:"cachapa",ro:"cachapa",meaning:"sweet corn pancake (Venezuela)",example:"Una cachapa con queso de mano — A corn cake with local cheese",pos:"noun",freq:6,register:"neutral"},
  {kr:"tequeño",ro:"tequeño",meaning:"cheese-filled bread stick (Venezuelan snack)",example:"Unos tequeños bien calientes — Some hot tequeños",pos:"noun",freq:6,register:"casual"},
  {kr:"hallaca",ro:"hallaca",meaning:"Venezuelan tamale (Christmas food)",example:"Las hallacas de navidad — Christmas hallacas",pos:"noun",freq:5,register:"neutral"},
  {kr:"tajadas",ro:"tajadas",meaning:"fried sweet plantain slices",example:"Arroz con tajadas — Rice with fried plantain",pos:"noun",freq:6,register:"neutral"},
  {kr:"papelón",ro:"papelón",meaning:"raw cane sugar block / also: embarrassment",example:"Papelón con limón — Cane sugar with lime drink",pos:"noun",freq:5,register:"casual"},
  {kr:"mandarina",ro:"mandarina",meaning:"mandarin / tangerine",example:"Una mandarina dulce — A sweet mandarin",pos:"noun",freq:5,register:"neutral"},
  // Venezuelan transport
  {kr:"carrito",ro:"carrito",meaning:"minibus / shared taxi (Venezuela)",example:"Tomo el carrito — I take the minibus",pos:"noun",freq:7,register:"casual"},
  {kr:"buseta",ro:"buseta",meaning:"small bus (Venezuela)",example:"Voy en buseta — I go by small bus",pos:"noun",freq:6,register:"casual"},
  {kr:"cola",ro:"cola",meaning:"ride / hitchhike (pedir cola = ask for a ride)",example:"¿Me das una cola? — Can you give me a ride?",pos:"noun",freq:7,register:"casual"},
  {kr:"pedir cola",ro:"pedir cola",meaning:"to hitchhike / to ask for a ride",example:"Pedí cola hasta el centro — I hitchhiked to the center",pos:"expression",freq:6,register:"casual"},
  // Venezuelan places/culture
  {kr:"bola",ro:"bola",meaning:"rumor / gossip / ball",example:"Eso es pura bola — That's just a rumor",pos:"noun",freq:5,register:"casual"},
  {kr:"maracucho",ro:"maracucho",meaning:"person from Maracaibo",example:"Es maracucho — He's from Maracaibo",pos:"noun",freq:4,register:"casual"},
  {kr:"caraqueño",ro:"caraqueño",meaning:"person from Caracas",example:"Soy caraqueña — I'm from Caracas",pos:"noun",freq:5,register:"neutral"},
];

// ── GRAMMAR NOTES ─────────────────────────────────────────────────────────────
(function() {
  if (typeof GRAMMAR === 'undefined') return;

  const sharedNotes = [
    {
      title: 'Ser vs Estar — two verbs for "to be"',
      short: 'Ser is permanent. Estar is temporary or location.',
      body: 'English has one "to be." Spanish has two.\n\nSer — who or what something fundamentally IS:\n  Soy venezolano — I am Venezuelan\n  Es médico — He is a doctor\n  La casa es grande — The house is big\n\nEstar — how something IS right now, or WHERE it is:\n  Estoy cansada — I am tired (right now)\n  El banco está cerrado — The bank is closed\n  ¿Dónde está el baño? — Where is the bathroom?\n\nA classic trick:\n  Soy aburrido — I am a boring person (personality)\n  Estoy aburrido — I am bored (right now)',
      example: 'Soy de Caracas. — I am from Caracas.\nEstoy en Caracas. — I am in Caracas.\nLa sopa es caliente. — Soup is hot (by nature).\nLa sopa está caliente. — The soup is hot (right now).',
      level: 1
    },
    {
      title: 'Tener hambre — "have" hunger, not "be" hungry',
      short: 'Physical states use tener (to have) where English uses to be.',
      body: 'In Spanish you "have" hunger, cold, fear, etc.\n\nTener + noun:\n  Tengo hambre — I\'m hungry (I have hunger)\n  Tengo sed — I\'m thirsty\n  Tengo frío — I\'m cold\n  Tengo calor — I\'m hot\n  Tengo miedo — I\'m scared\n  Tengo sueño — I\'m sleepy\n  Tengo razón — I\'m right\n\nAlso age:\n  Tengo veinte años — I\'m twenty (I have twenty years)',
      example: '¿Tienes hambre? — Are you hungry?\nSí, tengo mucha hambre — Yes, I\'m very hungry\nTenemos frío — We\'re cold',
      level: 1
    },
    {
      title: 'Gustar works backwards',
      short: 'Me gusta means "it pleases me" — the thing you like is the subject.',
      body: 'Gustar means "to please" — the liked thing is the subject.\n\n  Me gusta el café — Coffee pleases me (I like coffee)\n  Me gustan los tacos — Tacos please me (I like tacos)\n\ngusta = singular thing, gustan = plural things\n\nThe pronouns:\n  Me gusta — I like\n  Te gusta — You like\n  Le gusta — He/she likes\n  Nos gusta — We like\n  Les gusta — They like',
      example: 'Me gusta la música. — I like music.\nMe gustan las arepas. — I like arepas.\n¿Te gusta el fútbol? — Do you like football?',
      level: 1
    },
    {
      title: '¿Por qué? vs porque',
      short: 'Question = ¿Por qué? (two words, accent). Answer = porque (one word, no accent).',
      body: '¿Por qué? — why? (in a question)\nporque — because (in an answer)\n\n¿Por qué no vienes? — Why aren\'t you coming?\nNo voy porque estoy cansado — I\'m not going because I\'m tired\n\nAlso:\npor qué — why (inside a sentence, no question mark)\nNo entiendo por qué — I don\'t understand why\n\nel porqué — the reason (as a noun)\nQuiero saber el porqué — I want to know the reason',
      example: '¿Por qué lloras? — Why are you crying?\nLloro porque estoy feliz. — I\'m crying because I\'m happy.',
      level: 2
    },
  ];

  if (!GRAMMAR.spanish_mx) GRAMMAR.spanish_mx = [];
  GRAMMAR.spanish_mx.push(...sharedNotes, {
    title: 'Ahorita — Mexico\'s most flexible word',
    short: 'Ahorita can mean right now, in a bit, or eventually — tone decides.',
    body: 'Ahorita looks like it means "right now" but it has three meanings in Mexico depending on tone:\n\nAhorita mismo — truly right now, this second\n"Ahorita vengo" from a waiter — I\'ll be right with you (5 minutes)\n"Ahorita lo hago" from someone relaxed — I\'ll do it... eventually\n\nThe safest interpretation: soon-ish. When you need an exact time, ask for one.',
    example: '"Ahorita te atiendo" — I\'ll help you in a moment\n"Ahorita llego" at 9pm could mean midnight\n"¡Ahorita mismo!" means truly right now',
    level: 1
  });

  if (!GRAMMAR.spanish_ve) GRAMMAR.spanish_ve = [];
  GRAMMAR.spanish_ve.push(...sharedNotes, {
    title: 'Vaina — Venezuela\'s most useful word',
    short: 'Vaina means thing / situation / stuff — it fills every gap.',
    body: 'Vaina is arguably the most Venezuelan word in the language. It fills the role of "thing," "stuff," "deal," "situation" — any noun you can\'t think of or don\'t want to specify.\n\n¿Qué es esa vaina? — What is that thing?\nDame esa vaina — Give me that thing\n¿Qué fue esa vaina? — What was that about?\nLa vaina es que... — The thing is that...\nQué vaina — What a situation / That sucks\n\nUsed constantly. If you only learn one Venezuelan word, learn vaina.',
    example: '¿Qué es la vaina? — What\'s going on?\nLa vaina está difícil. — Things are tough.\n¡Qué vaina tan chévere! — What a cool thing!',
    level: 1
  });
})();

// ── BUILD FINAL ARRAYS ────────────────────────────────────────────────────────
const SPANISH_MX_WORDS = [...SPANISH_CORE, ...SPANISH_MX_EXCLUSIVE];
const SPANISH_VE_WORDS = [...SPANISH_CORE, ...SPANISH_VE_EXCLUSIVE];

if (typeof window !== 'undefined') {
  window.SPANISH_MX_WORDS = SPANISH_MX_WORDS;
  window.SPANISH_VE_WORDS = SPANISH_VE_WORDS;
}
