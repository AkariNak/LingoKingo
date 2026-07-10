// ── STORIES ───────────────────────────────────────────────────────────────────
// Each story: { id, lang, title, titleNative, author, genres[], difficulty,
//   blurb, lines[{text, reading?, translation}], questions[{q, choices[], answer}] }

const STORIES = [

// ── JAPANESE ──────────────────────────────────────────────────────────────────

{
  id:'jp_isekai_01',
  lang:'japanese',
  title:'The Wrong World',
  titleNative:'まちがった世界',
  genres:['isekai','fantasy','action'],
  difficulty:'N4',
  blurb:'A high school student wakes up in a dark forest — no phone, no map, no memory of how he got there. Something is watching from between the trees.',
  lines:[
    {text:'目を開けたとき、知らない森の中にいた。',reading:'めをあけたとき、しらないもりのなかにいた。',translation:'When I opened my eyes, I was inside an unfamiliar forest.'},
    {text:'空は赤かった。太陽はどこにもなかった。',reading:'そらはあかかった。たいようはどこにもなかった。',translation:'The sky was red. The sun was nowhere.'},
    {text:'「ここはどこだ？」と声に出して言ったが、誰も答えなかった。',reading:'「ここはどこだ？」とこえにだしていったが、だれもこたえなかった。',translation:'"Where is this?" I said out loud, but no one answered.'},
    {text:'木の間から何かが動いた。',reading:'きのあいだからなにかがうごいた。',translation:'Something moved between the trees.'},
    {text:'走ろうとした瞬間、足が地面に張り付いて動かなかった。',reading:'はしろうとしたしゅんかん、あしがじめんにはりついてうごかなかった。',translation:'The moment I tried to run, my feet were stuck to the ground and wouldn\'t move.'},
    {text:'低い声が耳に届いた。「来るのを待っていた。」',reading:'ひくいこえがみみにとどいた。「くるのをまっていた。」',translation:'A low voice reached my ears. "I\'ve been waiting for you to come."'},
    {text:'振り返ると、そこには人間ではない何かが立っていた。',reading:'ふりかえると、そこにはにんげんではないなにかがたっていた。',translation:'When I turned around, something that wasn\'t human was standing there.'},
  ],
  questions:[
    {q:'Where does the story take place?',choices:['A school','An unfamiliar forest','A red desert','A dark city'],answer:'An unfamiliar forest'},
    {q:'What color was the sky?',choices:['Blue','Black','Red','Grey'],answer:'Red'},
    {q:'What happened when the boy tried to run?',choices:['He fell','His feet were stuck','He was grabbed','He woke up'],answer:'His feet were stuck'},
  ]
},

{
  id:'jp_slice_01',
  lang:'japanese',
  title:'3:47 AM',
  titleNative:'午前三時四十七分',
  genres:['slice of life','romance'],
  difficulty:'N5',
  blurb:'She always texts at the same time. He has never asked why. Tonight he finally does.',
  lines:[
    {text:'また午前三時四十七分にメッセージが来た。',reading:'またごぜんさんじよんじゅうななふんにメッセージがきた。',translation:'A message came again at 3:47 AM.'},
    {text:'「眠れない」とだけ書いてあった。',reading:'「ねむれない」とだけかいてあった。',translation:'It just said "I can\'t sleep."'},
    {text:'いつもそうだ。同じ時間、同じ言葉。',reading:'いつもそうだ。おなじじかん、おなじことば。',translation:'It\'s always like this. Same time, same words.'},
    {text:'今夜は違うことを聞いてみた。「なんで眠れないの？」',reading:'こんやはちがうことをきいてみた。「なんでねむれないの？」',translation:'Tonight I tried asking something different. "Why can\'t you sleep?"'},
    {text:'三分間、返事がなかった。',reading:'さんぷんかん、へんじがなかった。',translation:'For three minutes, there was no reply.'},
    {text:'「あなたのことを考えてるから」',reading:'「あなたのことをかんがえてるから」',translation:'"Because I\'m thinking about you."'},
    {text:'僕もその夜は眠れなかった。',reading:'ぼくもそのよるはねむれなかった。',translation:'I couldn\'t sleep that night either.'},
  ],
  questions:[
    {q:'What time does she always message?',choices:['2:00 AM','3:47 AM','midnight','4:30 AM'],answer:'3:47 AM'},
    {q:'What does she always write?',choices:['"Good night"','"I miss you"','"I can\'t sleep"','"Are you awake?"'],answer:'"I can\'t sleep"'},
    {q:'Why can\'t she sleep?',choices:['She has work','She is sick','She is thinking about him','She had a nightmare'],answer:'She is thinking about him'},
  ]
},

{
  id:'jp_horror_01',
  lang:'japanese',
  title:'The Photograph',
  titleNative:'写真',
  genres:['horror','mystery'],
  difficulty:'N4',
  blurb:'A woman finds an old photograph of herself in a house she has never visited. The date on the back is tomorrow.',
  lines:[
    {text:'引っ越した日の夜、押し入れの奥に古い箱を見つけた。',reading:'ひっこしたひのよる、おしいれのおくにふるいはこをみつけた。',translation:'On the night of my move, I found an old box at the back of the closet.'},
    {text:'箱の中には一枚の写真だけが入っていた。',reading:'はこのなかにはいちまいのしゃしんだけがはいっていた。',translation:'Inside the box was only a single photograph.'},
    {text:'写真に写っていたのは、この部屋で眠る私の姿だった。',reading:'しゃしんにうつっていたのは、このへやでねむるわたしのすがただった。',translation:'What was in the photograph was the image of me sleeping in this very room.'},
    {text:'今夜と同じ服を着ていた。',reading:'こんやとおなじふくをきていた。',translation:'I was wearing the same clothes as tonight.'},
    {text:'震える手で裏返すと、日付が書いてあった。',reading:'ふるえるてでうらがえすと、ひづけがかいてあった。',translation:'When I flipped it over with trembling hands, a date was written there.'},
    {text:'明日の日付だった。',reading:'あしたのひづけだった。',translation:'It was tomorrow\'s date.'},
    {text:'そのとき、押し入れの中から音がした。',reading:'そのとき、おしいれのなかからおとがした。',translation:'At that moment, a sound came from inside the closet.'},
  ],
  questions:[
    {q:'Where did she find the box?',choices:['Under the bed','In the closet','In the kitchen','On the roof'],answer:'In the closet'},
    {q:'What was in the photograph?',choices:['An old woman','A monster','Herself sleeping','An empty room'],answer:'Herself sleeping'},
    {q:'What was written on the back of the photo?',choices:['Her name','A phone number','Tomorrow\'s date','The word "help"'],answer:'Tomorrow\'s date'},
  ]
},

{
  id:'jp_school_01',
  lang:'japanese',
  title:'After the Bell',
  titleNative:'放課後',
  genres:['school','slice of life','romance'],
  difficulty:'N5',
  blurb:'She stays in the classroom every day after school. He pretends he forgot something just to talk to her.',
  lines:[
    {text:'佐藤は毎日、放課後も教室に残っている。',reading:'さとうはまいにち、ほうかごもきょうしつにのこっている。',translation:'Sato stays in the classroom every day after school too.'},
    {text:'窓際の席で、いつも本を読んでいる。',reading:'まどぎわのせきで、いつもほんをよんでいる。',translation:'She always reads a book in the seat by the window.'},
    {text:'僕は今日も教室に戻ってきた。理由は何もない。',reading:'ぼくはきょうもきょうしつにもどってきた。りゆうはなにもない。',translation:'I came back to the classroom today too. No reason in particular.'},
    {text:'「また忘れ物？」と彼女は本から目を上げずに言った。',reading:'「またわすれもの？」とかのじょはほんからめをあげずにいった。',translation:'"Forgot something again?" she said without looking up from her book.'},
    {text:'「そう」と答えながら、僕は自分の席についた。',reading:'「そう」とこたえながら、ぼくはじぶんのせきについた。',translation:'"Yeah," I answered, and sat down at my own seat.'},
    {text:'しばらく静かだった。それが好きだった。',reading:'しばらくしずかだった。それがすきだった。',translation:'It was quiet for a while. I liked that.'},
    {text:'「本当は何も忘れてないでしょ」と彼女が小さく笑った。',reading:'「ほんとうはなにもわすれてないでしょ」とかのじょがちいさくわらった。',translation:'"You didn\'t really forget anything, did you," she said with a small smile.'},
  ],
  questions:[
    {q:'What does Sato do after school?',choices:['Goes home immediately','Plays sports','Stays and reads','Talks with friends'],answer:'Stays and reads'},
    {q:'Where does she sit?',choices:['By the door','By the window','In the back','At the front'],answer:'By the window'},
    {q:'Does she know he has no real reason to return?',choices:['No, she believes him','Yes, she figures it out','The story doesn\'t say','She asks him directly'],answer:'Yes, she figures it out'},
  ]
},

{
  id:'jp_fantasy_01',
  lang:'japanese',
  title:'The Last Gate',
  titleNative:'最後の門',
  genres:['fantasy','action','adventure'],
  difficulty:'N3',
  blurb:'The kingdom has one gate left. If it falls, everything behind it falls too. A lone soldier is told to hold it until dawn.',
  lines:[
    {text:'「夜明けまで持ちこたえろ。それだけでいい。」',reading:'「よあけまでもちこたえろ。それだけでいい。」',translation:'"Hold out until dawn. That\'s all you need to do."'},
    {text:'将軍はそう言い残して、馬で去った。',reading:'しょうぐんはそういいのこして、うまでさった。',translation:'The general said that and left on horseback.'},
    {text:'門の前に残ったのは私一人だった。',reading:'もんのまえにのこったのはわたしひとりだった。',translation:'Left in front of the gate was only me.'},
    {text:'向こうから足音が聞こえた。一人ではなかった。',reading:'むこうからあしおとがきこえた。ひとりではなかった。',translation:'Footsteps could be heard from the other side. It wasn\'t just one.'},
    {text:'剣を握りしめた。手が震えていたが、それでよかった。',reading:'けんをにぎりしめた。てがふるえていたが、それでよかった。',translation:'I gripped my sword. My hands were shaking, but that was fine.'},
    {text:'震えているということは、まだ生きているということだ。',reading:'ふるえているということは、まだいきているということだ。',translation:'The fact that I\'m shaking means I\'m still alive.'},
    {text:'夜明けまで、私は門の前に立ち続けた。',reading:'よあけまで、わたしはもんのまえにたちつづけた。',translation:'Until dawn, I kept standing in front of the gate.'},
  ],
  questions:[
    {q:'What was the soldier\'s only task?',choices:['Kill the enemy general','Retreat safely','Hold the gate until dawn','Signal for help'],answer:'Hold the gate until dawn'},
    {q:'How many soldiers were left at the gate?',choices:['A hundred','Ten','Three','One'],answer:'One'},
    {q:'Why did the soldier think shaking hands were fine?',choices:['It kept him warm','It meant he was strong','It meant he was still alive','It scared the enemy'],answer:'It meant he was still alive'},
  ]
},

{
  id:'jp_mystery_01',
  lang:'japanese',
  title:'Room 404',
  titleNative:'404号室',
  genres:['mystery','horror'],
  difficulty:'N4',
  blurb:'Every hotel has a room 404. Nobody books it. The staff say it doesn\'t exist. But the light is always on.',
  lines:[
    {text:'フロントの女性は「そのお部屋はございません」と笑顔で言った。',reading:'フロントのじょせいは「そのおへやはございません」とえがおでいった。',translation:'The woman at the front desk said with a smile, "That room does not exist."'},
    {text:'しかし廊下の突き当たりに、確かに404という番号があった。',reading:'しかしろうかのつきあたりに、たしかに404というばんごうがあった。',translation:'But at the end of the hallway, there was certainly a number that said 404.'},
    {text:'ドアの下から光が漏れていた。',reading:'ドアのしたからひかりがもれていた。',translation:'Light was leaking from under the door.'},
    {text:'ノックしてみた。返事はなかった。でも誰かがいる気がした。',reading:'ノックしてみた。へんじはなかった。でもだれかがいるきがした。',translation:'I tried knocking. There was no answer. But I felt like someone was there.'},
    {text:'翌朝、フロントに「昨夜の404号室の客は？」と聞いた。',reading:'よくあさ、フロントに「さくやの404ごうしつのきゃくは？」ときいた。',translation:'The next morning I asked the front desk, "Who was the guest in room 404 last night?"'},
    {text:'女性の顔から笑顔が消えた。',reading:'じょせいのかおからえがおがきえた。',translation:'The smile disappeared from the woman\'s face.'},
    {text:'「その部屋には、十年間ずっと誰も入っていません。」',reading:'「そのへやには、じゅうねんかんずっとだれもはいっていません。」',translation:'"No one has entered that room for ten years."'},
  ],
  questions:[
    {q:'What did the front desk say about room 404?',choices:['It was fully booked','It was being cleaned','It didn\'t exist','It was very expensive'],answer:'It didn\'t exist'},
    {q:'What was strange about the room?',choices:['It was very loud','The light was on','The door was open','It smelled strange'],answer:'The light was on'},
    {q:'How long has no one entered the room?',choices:['One year','Five years','Ten years','Never specified'],answer:'Ten years'},
  ]
},

// ── KOREAN ────────────────────────────────────────────────────────────────────

{
  id:'ko_romance_01',
  lang:'korean',
  title:'The Last Train',
  titleNative:'마지막 기차',
  genres:['romance','slice of life'],
  difficulty:'TOPIK 2',
  blurb:'Two strangers miss the last train. The station is empty. They have nothing to do but talk.',
  lines:[
    {text:'밤 11시 58분. 우리 둘 다 기차를 놓쳤다.',reading:'bam yeolhansi siphalpun. uri dul da gichal nohtchyeotta.',translation:'11:58 PM. We both missed the train.'},
    {text:'역은 우리 둘만 남았다.',reading:'yeogeun uri dulmman namatda.',translation:'Only the two of us were left at the station.'},
    {text:'그녀가 먼저 말했다. "다음 기차는 몇 시예요?"',reading:'geunyeoga meonjeo malhaetda. "daeum gichaneu myeot siyeyo?"',translation:'She spoke first. "What time is the next train?"'},
    {text:'"새벽 5시요." 그녀는 웃지 않았다. 나도.',reading:'"saebyeok dasiosiyyo." geunyeoneun utji anatda. nado.',translation:'"5 AM." She didn\'t smile. Neither did I.'},
    {text:'우리는 벤치에 나란히 앉았다.',reading:'urineun benchie naranhi anjatda.',translation:'We sat side by side on the bench.'},
    {text:'처음에는 아무 말도 하지 않았다. 그런데 이상하게 편했다.',reading:'cheoeume aneun amu maldo haji anatda. geureonde isanghage pyeonhaetda.',translation:'At first we said nothing. But strangely it felt comfortable.'},
    {text:'새벽이 될 때까지 우리는 이야기를 멈추지 않았다.',reading:'saebyeogi doel ttaekkaji urineun iyagireul meomchuji anatda.',translation:'Until dawn, we didn\'t stop talking.'},
  ],
  questions:[
    {q:'What time did they miss the train?',choices:['10 PM','11:58 PM','midnight','1 AM'],answer:'11:58 PM'},
    {q:'When is the next train?',choices:['1 AM','3 AM','5 AM','6 AM'],answer:'5 AM'},
    {q:'How did the silence feel?',choices:['Awkward','Scary','Comfortable','Boring'],answer:'Comfortable'},
  ]
},

{
  id:'ko_thriller_01',
  lang:'korean',
  title:'The Caller',
  titleNative:'전화',
  genres:['thriller','mystery','action'],
  difficulty:'TOPIK 3-4',
  blurb:'She answers a wrong number. The caller knows her name. Her address. And what she had for dinner.',
  lines:[
    {text:'모르는 번호에서 전화가 왔다.',reading:'moreuneun beonhoeeseo jeonhwaga watda.',translation:'A call came from an unknown number.'},
    {text:'"여보세요?" 잠깐의 침묵이 있었다.',reading:'"yeoboseyo?" jamkkanui chimmughi isseotda.',translation:'"Hello?" There was a brief silence.'},
    {text:'"김지수씨, 맞죠?"',reading:'"gimjisuski, matjyo?"',translation:'"You\'re Kim Jisoo, right?"'},
    {text:'나는 전화를 끊으려 했다. 그런데 목소리가 계속 말했다.',reading:'naneun jeonhwaleul kkeuneuryeo haetda. geureonde moksoriga gyesok malhaetda.',translation:'I tried to hang up. But the voice kept talking.'},
    {text:'"오늘 저녁에 혼자 밥 먹었죠? 된장찌개요."',reading:'"oneul jeonyeoge honja bap meokeotjyo? doenjangjjigaeyo."',translation:'"You ate alone for dinner tonight, right? Doenjang jjigae."'},
    {text:'손이 떨렸다.',reading:'soni tteollyeotda.',translation:'My hands trembled.'},
    {text:'"지금 창문 보지 마세요."',reading:'"jigeum changmun boji maseyo."',translation:'"Don\'t look at the window right now."'},
  ],
  questions:[
    {q:'Who called her?',choices:['A friend','Her boss','An unknown caller','Her mother'],answer:'An unknown caller'},
    {q:'What did she eat for dinner?',choices:['Bibimbap','Ramen','Doenjang jjigae','Fried rice'],answer:'Doenjang jjigae'},
    {q:'What did the caller tell her not to do?',choices:['Answer the phone','Open the door','Look at the window','Turn on the lights'],answer:'Look at the window'},
  ]
},

{
  id:'ko_fantasy_01',
  lang:'korean',
  title:'The Debt',
  titleNative:'빚',
  genres:['fantasy','action','adventure'],
  difficulty:'TOPIK 3-4',
  blurb:'A man who can see the future owes a debt to someone he has never met — because they saved his life before he was born.',
  lines:[
    {text:'나는 미래를 볼 수 있다. 하지만 내 미래는 볼 수 없다.',reading:'naneun miraeleul bol su itda. hajiman nae miraeneun bol su eoptda.',translation:'I can see the future. But I cannot see my own.'},
    {text:'어느 날, 낯선 여자가 나를 찾아왔다.',reading:'eoneu nal, natson yeojaga nareul chajawatda.',translation:'One day, a strange woman came looking for me.'},
    {text:'"당신은 나한테 빚이 있어요."',reading:'"dangsineun nahante bijhi iseoyo."',translation:'"You owe me a debt."'},
    {text:'"처음 뵙겠습니다만, 어떻게요?"',reading:'"cheoeum boepgesseumnidaman, eotteokkeyo?"',translation:'"I\'m meeting you for the first time, but how so?"'},
    {text:'"당신이 태어나기 전에 내가 당신을 구했으니까요."',reading:'"dangsini taeeonagi jeone naega dangsineul guhaesseunikkayo."',translation:'"Because I saved you before you were born."'},
    {text:'나는 그녀의 눈을 보았다. 거짓말이 아니었다.',reading:'naneun geunyeoui nuneul boatda. geojitmari aniyeotda.',translation:'I looked into her eyes. It wasn\'t a lie.'},
    {text:'"무엇을 원하십니까?"',reading:'"mueoseul wonhasimnikka?"',translation:'"What do you want?"'},
  ],
  questions:[
    {q:'What ability does the man have?',choices:['He can fly','He can see the future','He can read minds','He is immortal'],answer:'He can see the future'},
    {q:'What does the woman claim?',choices:['He stole from her','He owes her money','She saved him before he was born','She knows his future'],answer:'She saved him before he was born'},
    {q:'How does he know she\'s telling the truth?',choices:['He saw it in a vision','He read her mind','He looked in her eyes','She showed him proof'],answer:'He looked in her eyes'},
  ]
},

// ── ITALIAN ───────────────────────────────────────────────────────────────────

{
  id:'it_romance_01',
  lang:'italian',
  title:'The Same Table',
  titleNative:'Lo stesso tavolo',
  genres:['romance','slice of life'],
  difficulty:'A2',
  blurb:'Every morning at the same café, the same table, the same coffee. And always, the same stranger sitting across from him.',
  lines:[
    {text:'Ogni mattina vengo in questo bar alle otto.',reading:'',translation:'Every morning I come to this café at eight.'},
    {text:'Prendo sempre lo stesso caffè. Mi siedo sempre allo stesso tavolo.',reading:'',translation:'I always get the same coffee. I always sit at the same table.'},
    {text:'Lei è già lì. Come sempre.',reading:'',translation:'She\'s already there. As always.'},
    {text:'Non ci siamo mai parlati. Ma ci sorridiamo.',reading:'',translation:'We\'ve never spoken. But we smile at each other.'},
    {text:'Stamattina lei non c\'era.',reading:'',translation:'This morning she wasn\'t there.'},
    {text:'Ho aspettato fino alle nove. Poi sono andato via.',reading:'',translation:'I waited until nine. Then I left.'},
    {text:'Domani torno. Spero che ci sia.',reading:'',translation:'Tomorrow I\'ll come back. I hope she\'s there.'},
  ],
  questions:[
    {q:'What time does he arrive at the café?',choices:['Seven','Eight','Nine','Ten'],answer:'Eight'},
    {q:'Have they ever spoken?',choices:['Yes, once','Yes, every day','Never','The story doesn\'t say'],answer:'Never'},
    {q:'Why was today different?',choices:['He arrived late','His coffee was wrong','She wasn\'t there','The café was closed'],answer:'She wasn\'t there'},
  ]
},

{
  id:'it_mystery_01',
  lang:'italian',
  title:'The Letter',
  titleNative:'La lettera',
  genres:['mystery','adventure'],
  difficulty:'B1',
  blurb:'A woman receives a letter addressed to her, written in her own handwriting, dated three years in the future.',
  lines:[
    {text:'La busta era indirizzata a me. Era la mia scrittura.',reading:'',translation:'The envelope was addressed to me. It was my handwriting.'},
    {text:'Ma la data era quella di tre anni fa — no, di tre anni nel futuro.',reading:'',translation:'But the date was three years ago — no, three years in the future.'},
    {text:'Ho riletto la data quattro volte. Non cambiava.',reading:'',translation:'I reread the date four times. It didn\'t change.'},
    {text:'Ho aperto la busta con mani che tremavano.',reading:'',translation:'I opened the envelope with trembling hands.'},
    {text:'C\'era scritto solo una frase: "Non aprire la porta rossa."',reading:'',translation:'There was only one sentence written: "Don\'t open the red door."'},
    {text:'Nel mio appartamento non c\'è nessuna porta rossa.',reading:'',translation:'In my apartment there is no red door.'},
    {text:'Poi ho sentito bussare.',reading:'',translation:'Then I heard knocking.'},
  ],
  questions:[
    {q:'Whose handwriting was on the envelope?',choices:['Her sister\'s','A stranger\'s','Her own','Unknown'],answer:'Her own'},
    {q:'What was written in the letter?',choices:['"Run away"','"Don\'t open the red door"','"Call the police"','"Trust no one"'],answer:'"Don\'t open the red door"'},
    {q:'What happened at the end?',choices:['She found the red door','Someone knocked','She called for help','She threw the letter away'],answer:'Someone knocked'},
  ]
},

{
  id:'it_action_01',
  lang:'italian',
  title:'Five Seconds',
  titleNative:'Cinque secondi',
  genres:['action','adventure'],
  difficulty:'B1',
  blurb:'A train. A bomb. A detective with exactly five seconds to decide which wire to cut.',
  lines:[
    {text:'Il treno correva a centoventi chilometri all\'ora.',reading:'',translation:'The train was running at a hundred and twenty kilometres per hour.'},
    {text:'Mancavano cinque secondi.',reading:'',translation:'Five seconds were left.'},
    {text:'Due fili. Uno rosso. Uno blu. Uno era la soluzione. L\'altro era la fine.',reading:'',translation:'Two wires. One red. One blue. One was the solution. The other was the end.'},
    {text:'Aveva passato vent\'anni a studiare questi dispositivi.',reading:'',translation:'He had spent twenty years studying these devices.'},
    {text:'Ma la paura non sparisce mai. Si impara solo a ignorarla.',reading:'',translation:'But fear never disappears. You only learn to ignore it.'},
    {text:'Chiuse gli occhi per un secondo. Poi tagliò.',reading:'',translation:'He closed his eyes for a second. Then he cut.'},
    {text:'Silenzio.',reading:'',translation:'Silence.'},
  ],
  questions:[
    {q:'How fast was the train going?',choices:['80 km/h','100 km/h','120 km/h','200 km/h'],answer:'120 km/h'},
    {q:'How many wires were there?',choices:['One','Two','Three','Four'],answer:'Two'},
    {q:'What does he say about fear?',choices:['It goes away with experience','You can never ignore it','You learn to ignore it','It makes you stronger'],answer:'You learn to ignore it'},
  ]
},

];

// Genre lists per language
const STORY_GENRES_BY_LANG = {
  japanese: ['isekai','fantasy','action','adventure','romance','slice of life','school','mystery','horror','comedy'],
  korean:   ['romance','slice of life','thriller','mystery','fantasy','action','drama','school','comedy'],
  italian:  ['romance','slice of life','mystery','adventure','action','thriller','drama','comedy'],
};
const STORY_GENRES = ['isekai','fantasy','action','adventure','romance','slice of life','school','mystery','horror','comedy','thriller','drama'];

// ── ADDITIONAL JAPANESE STORIES ───────────────────────────────────────────────

STORIES.push(

// MAGIC / ISEKAI (Mushoku Tensei energy)
{
  id:'jp_magic_01',
  lang:'japanese',
  title:'Born Again with Magic',
  titleNative:'魔法と共に転生した',
  genres:['isekai','fantasy','action'],
  difficulty:'N4',
  blurb:'A man dies having wasted his life. He is reborn as an infant in another world — and this time, he can already feel the magic flowing through him before he can even speak.',
  lines:[
    {text:'気づいたとき、私は赤ん坊だった。',reading:'きづいたとき、わたしはあかんぼうだった。',translation:'When I came to, I was a baby.'},
    {text:'前の世界での記憶は全部残っていた。',reading:'まえのせかいでのきおくはぜんぶのこっていた。',translation:'All my memories from the previous world remained.'},
    {text:'後悔だけが胸の中に残った人生だった。',reading:'こうかいだけがむねのなかにのこったじんせいだった。',translation:'It had been a life where only regret remained in my chest.'},
    {text:'だが今は違う。この小さな手の中に、何かが流れている。',reading:'だがいまはちがう。このちいさなてのなかに、なにかがながれている。',translation:'But now it\'s different. Something is flowing through these small hands.'},
    {text:'魔力だと、すぐにわかった。',reading:'まりょくだと、すぐにわかった。',translation:'I immediately understood it was magical energy.'},
    {text:'まだ言葉も話せない。でも魔法はもう使える。',reading:'まだことばもはなせない。でもまほうはもうつかえる。',translation:'I can\'t even speak yet. But I can already use magic.'},
    {text:'今度こそ、全力で生きてやる。',reading:'こんどこそ、ぜんりょくでいきてやる。',translation:'This time for sure, I\'ll live with everything I have.'},
  ],
  questions:[
    {q:'What does he realize about his memories?',choices:['They are gone','They are fragments','They are all intact','He has someone else\'s memories'],answer:'They are all intact'},
    {q:'What does he feel flowing through his hands?',choices:['Blood','Warmth','Magical energy','Water'],answer:'Magical energy'},
    {q:'What is his resolve?',choices:['To find his family','To return home','To live with everything he has','To become a king'],answer:'To live with everything he has'},
  ]
},

{
  id:'jp_magic_02',
  lang:'japanese',
  title:'The Sword That Chose No One',
  titleNative:'誰も選ばなかった剣',
  genres:['fantasy','action','adventure'],
  difficulty:'N3',
  blurb:'Every hero in the kingdom tried to pull the sacred sword. Every one failed. Then a girl who came only to watch accidentally touched the hilt — and the sword spoke.',
  lines:[
    {text:'百人の勇者が剣に触れ、百人が失敗した。',reading:'ひゃくにんのゆうしゃがけんにふれ、ひゃくにんがしっぱいした。',translation:'A hundred heroes touched the sword, and a hundred failed.'},
    {text:'エイラは観客として来ていた。剣など関係ない。',reading:'エイラはかんきゃくとしてきていた。けんなどかんけいない。',translation:'Aira had come as a spectator. The sword had nothing to do with her.'},
    {text:'人混みに押されて、気づいたら柄に手が触れていた。',reading:'ひとごみにおされて、きづいたらつかにてがふれていた。',translation:'Pushed by the crowd, she realized her hand was touching the hilt.'},
    {text:'剣が光った。',reading:'けんがひかった。',translation:'The sword glowed.'},
    {text:'「ずっと待っていた」と声が聞こえた。剣の中から。',reading:'「ずっとまっていた」とこえがきこえた。けんのなかから。',translation:'"I have been waiting," a voice said. From inside the sword.'},
    {text:'エイラは悲鳴を上げそうになったが、声は優しかった。',reading:'エイラはひめいをあげそうになったが、こえはやさしかった。',translation:'Aira nearly screamed, but the voice was gentle.'},
    {text:'「あなたが選ばれた理由は、選ばれようとしなかったからだ」',reading:'「あなたがえらばれたりゆうは、えらばれようとしなかったからだ」',translation:'"The reason you were chosen is because you did not try to be chosen."'},
  ],
  questions:[
    {q:'Why was Aira at the ceremony?',choices:['She wanted the sword','She was forced to come','She came as a spectator','She was a hero'],answer:'She came as a spectator'},
    {q:'How did she touch the sword?',choices:['She reached for it','She was pushed by the crowd','She was told to','She tripped'],answer:'She was pushed by the crowd'},
    {q:'Why was she chosen?',choices:['She was the strongest','She was the kindest','She did not try to be chosen','The sword made a mistake'],answer:'She did not try to be chosen'},
  ]
},

{
  id:'jp_magic_03',
  lang:'japanese',
  title:'The Magic That Costs Everything',
  titleNative:'全てを代償にする魔法',
  genres:['fantasy','action'],
  difficulty:'N3',
  blurb:'In this world, magic costs something personal — a memory, a year of your life, a color you can no longer see. He has used it too many times.',
  lines:[
    {text:'この世界では、魔法は何かを代償にして使う。',reading:'このせかいでは、まほうはなにかをだいしょうにしてつかう。',translation:'In this world, magic is used by sacrificing something in return.'},
    {text:'私はこれまでに百回以上使った。',reading:'わたしはこれまでにひゃっかいいじょうつかった。',translation:'I have used it more than a hundred times up to now.'},
    {text:'最初は色が見えなくなった。赤から始まった。',reading:'さいしょはいろがみえなくなった。あかからはじまった。',translation:'At first I couldn\'t see colors. It started with red.'},
    {text:'次に、子供の頃の記憶が消えた。顔だけ残った。',reading:'つぎに、こどものころのきおくがきえた。かおだけのこった。',translation:'Next, my childhood memories disappeared. Only faces remained.'},
    {text:'今は、人の名前が覚えられない。',reading:'いまは、ひとのなまえがおぼえられない。',translation:'Now I can\'t remember people\'s names.'},
    {text:'それでも魔法をやめられない。',reading:'それでもまほうをやめられない。',translation:'Even so, I can\'t stop using magic.'},
    {text:'守りたいものが、まだある。',reading:'まもりたいものが、まだある。',translation:'There are still things I want to protect.'},
  ],
  questions:[
    {q:'What does magic cost in this world?',choices:['Gold','Something personal','Physical strength','Years of sleep'],answer:'Something personal'},
    {q:'What was the first thing he lost?',choices:['His name','His memories','The color red','His voice'],answer:'The color red'},
    {q:'Why does he keep using magic despite the cost?',choices:['He is addicted','He has no choice','There are still things he wants to protect','He doesn\'t feel the losses'],answer:'There are still things he wants to protect'},
  ]
},

{
  id:'jp_magic_04',
  lang:'japanese',
  title:'The Weakest Class',
  titleNative:'最弱のクラス',
  genres:['isekai','school','action'],
  difficulty:'N4',
  blurb:'Every student in the hero academy has a rare ability. His ability, revealed on the first day: he can see one second into the future. Everyone laughed. No one laughed after the exam.',
  lines:[
    {text:'英雄学院の入学試験で、全員の能力が明らかになった。',reading:'えいゆうがくいんのにゅうがくしけんで、ぜんいんののうりょくがあきらかになった。',translation:'At the entrance exam for the Hero Academy, everyone\'s ability was revealed.'},
    {text:'炎を操る者、剣の天才、風を読む者。',reading:'ほのおをあやつるもの、けんのてんさい、かぜをよむもの。',translation:'Those who control fire, sword geniuses, those who read the wind.'},
    {text:'ケンジの番が来た。「一秒先が見える」',reading:'ケンジのばんがきた。「いちびょうさきがみえる」',translation:'Kenji\'s turn came. "I can see one second into the future."'},
    {text:'教室が静まりかえった後、笑いが起きた。',reading:'きょうしつがしずまりかえったあと、わらいがおきた。',translation:'After the classroom fell silent, laughter broke out.'},
    {text:'「たった一秒か」と誰かが言った。',reading:'「たったいちびょうか」とだれかがいった。',translation:'"Just one second," someone said.'},
    {text:'実技試験で、ケンジは誰にも触れられなかった。',reading:'じつぎしけんで、ケンジはだれにもふれられなかった。',translation:'In the practical exam, no one could touch Kenji.'},
    {text:'一秒あれば、十分だった。',reading:'いちびょうあれば、じゅうぶんだった。',translation:'One second was enough.'},
  ],
  questions:[
    {q:'What is Kenji\'s ability?',choices:['He is very fast','He can see one second into the future','He can stop time','He can read minds'],answer:'He can see one second into the future'},
    {q:'How did the class react?',choices:['They were impressed','They were silent','They laughed','They challenged him'],answer:'They laughed'},
    {q:'What happened in the practical exam?',choices:['He lost badly','Nobody could touch him','He used a different power','He gave up'],answer:'Nobody could touch him'},
  ]
},

// ADVENTURE
{
  id:'jp_adventure_01',
  lang:'japanese',
  title:'The Map With No End',
  titleNative:'終わりのない地図',
  genres:['adventure','fantasy'],
  difficulty:'N4',
  blurb:'An explorer finds a map that updates itself in real time — showing paths that didn\'t exist yesterday, and marking places no cartographer has ever named.',
  lines:[
    {text:'その地図は、昨日とは違っていた。',reading:'そのちずは、きのうとはちがっていた。',translation:'The map was different from yesterday.'},
    {text:'新しい道が現れていた。誰も作っていない道が。',reading:'あたらしいみちがあらわれていた。だれもつくっていないみちが。',translation:'A new path had appeared. A path that no one had made.'},
    {text:'地図師たちは「不可能だ」と言った。',reading:'ちずしたちは「ふかのうだ」といった。',translation:'The cartographers said "it\'s impossible."'},
    {text:'しかしマリアは地図を信じた。',reading:'しかしマリアはちずをしんじた。',translation:'But Maria trusted the map.'},
    {text:'三日間歩いて、地図の示す場所に着いた。',reading:'みっかかんあるいて、ちずのしめすばしょについた。',translation:'After walking for three days, she reached the place the map indicated.'},
    {text:'そこには、まだ誰も見たことのない山があった。',reading:'そこには、まださあだれもみたことのないやまがあった。',translation:'There was a mountain there that no one had ever seen.'},
    {text:'地図に新しい名前が書かれていた。「マリアの山」',reading:'ちずにあたらしいなまえがかかれていた。「マリアのやま」',translation:'A new name was written on the map. "Maria\'s Mountain."'},
  ],
  questions:[
    {q:'What was strange about the map?',choices:['It was very old','It updated itself','It was written in code','It was blank'],answer:'It updated itself'},
    {q:'What did the cartographers say?',choices:['"Follow the map"','"It\'s a treasure map"','"It\'s impossible"','"Burn it"'],answer:'"It\'s impossible"'},
    {q:'What was at the location the map showed?',choices:['A city','A river','A mountain no one had seen','A door'],answer:'A mountain no one had seen'},
  ]
},

// ROMANCE
{
  id:'jp_romance_02',
  lang:'japanese',
  title:'The Umbrella',
  titleNative:'傘',
  genres:['romance','slice of life'],
  difficulty:'N5',
  blurb:'It was raining. She had no umbrella. He had one, but said nothing and just walked slower.',
  lines:[
    {text:'突然、雨が降り始めた。',reading:'とつぜん、あめがふりはじめた。',translation:'Suddenly, rain began to fall.'},
    {text:'彼女は傘を持っていなかった。',reading:'かのじょはかさをもっていなかった。',translation:'She didn\'t have an umbrella.'},
    {text:'彼は傘を持っていたが、何も言わなかった。',reading:'かれはかさをもっていたが、なにもいわなかった。',translation:'He had an umbrella, but said nothing.'},
    {text:'ただ、少しだけ歩くのを遅くした。',reading:'ただ、すこしだけあるくのをおそくした。',translation:'He just walked a little slower.'},
    {text:'自然に、二人は同じ傘の下に入っていた。',reading:'しぜんに、ふたりはおなじかさのしたにはいっていた。',translation:'Naturally, the two of them were under the same umbrella.'},
    {text:'「ありがとう」と彼女が言った。',reading:'「ありがとう」とかのじょがいった。',translation:'"Thank you," she said.'},
    {text:'「傘が大きいだけだよ」と彼は答えた。顔が少し赤かった。',reading:'「かさがおおきいだけだよ」とかれはこたえた。かおがすこしあかかった。',translation:'"The umbrella is just big," he answered. His face was a little red.'},
  ],
  questions:[
    {q:'Why did he walk slower?',choices:['He was tired','He wanted her to share his umbrella','He saw something','He was lost'],answer:'He wanted her to share his umbrella'},
    {q:'What did he say when she thanked him?',choices:['"You\'re welcome"','"It\'s nothing"','"The umbrella is just big"','"I like the rain"'],answer:'"The umbrella is just big"'},
    {q:'How did he look when he answered?',choices:['Angry','Sad','A little red in the face','Confused'],answer:'A little red in the face'},
  ]
},

{
  id:'jp_romance_03',
  lang:'japanese',
  title:'One Hundred Rejections',
  titleNative:'百回の断り',
  genres:['romance','comedy'],
  difficulty:'N4',
  blurb:'He confessed to her 99 times and was rejected every time. On the hundredth, he said nothing. She asked why.',
  lines:[
    {text:'田中は九十九回告白して、九十九回断られた。',reading:'たなかはきゅうじゅうきゅうかいこくはくして、きゅうじゅうきゅうかいことわられた。',translation:'Tanaka confessed 99 times and was rejected 99 times.'},
    {text:'百回目の春が来た。',reading:'ひゃっかいめのはるがきた。',translation:'The hundredth spring came.'},
    {text:'彼は何も言わなかった。',reading:'かれはなにもいわなかった。',translation:'He said nothing.'},
    {text:'「今年は言わないの？」と彼女が聞いた。',reading:'「ことしはいわないの？」とかのじょがきいた。',translation:'"You\'re not saying it this year?" she asked.'},
    {text:'「もう諦めた」と彼は答えた。',reading:'「もうあきらめた」とかれはこたえた。',translation:'"I\'ve given up," he answered.'},
    {text:'しばらく沈黙があった。',reading:'しばらくちんもくがあった。',translation:'There was a silence for a while.'},
    {text:'「それは困る」と彼女は言った。',reading:'「それはこまる」とかのじょはいった。',translation:'"That\'s a problem," she said.'},
  ],
  questions:[
    {q:'How many times did he confess?',choices:['Ten','Fifty','Ninety-nine','A hundred'],answer:'Ninety-nine'},
    {q:'What did he do differently on the hundredth spring?',choices:['He gave her flowers','He confessed louder','He said nothing','He moved away'],answer:'He said nothing'},
    {q:'What did she say at the end?',choices:['"I love you"','"That\'s a problem"','"Finally"','"Why did you stop?"'],answer:'"That\'s a problem"'},
  ]
},

// HORROR
{
  id:'jp_horror_02',
  lang:'japanese',
  title:'The Mirror That Is Slow',
  titleNative:'遅い鏡',
  genres:['horror','mystery'],
  difficulty:'N4',
  blurb:'She noticed her reflection was always a second behind. Then two seconds. Then it started doing things she wasn\'t doing.',
  lines:[
    {text:'最初は気のせいだと思った。',reading:'さいしょはきのせいだとおもった。',translation:'At first I thought it was my imagination.'},
    {text:'鏡の中の自分が、少しだけ遅かった。',reading:'かがみのなかのじぶんが、すこしだけおそかった。',translation:'My reflection in the mirror was just a little slow.'},
    {text:'一秒。それが二秒になった。',reading:'いちびょう。それがにびょうになった。',translation:'One second. Then it became two seconds.'},
    {text:'ある朝、鏡の中の私が笑った。私は笑っていなかった。',reading:'あるあさ、かがみのなかのわたしがわらった。わたしはわらっていなかった。',translation:'One morning, my reflection smiled. I wasn\'t smiling.'},
    {text:'鏡を壊そうとしたとき、反射の中の手が先に動いた。',reading:'かがみをこわそうとしたとき、はんしゃのなかのてがさきにうごいた。',translation:'When I tried to break the mirror, the reflection\'s hand moved first.'},
    {text:'「やめて」と鏡の中の口が動いた。',reading:'「やめて」とかがみのなかのくちがうごいた。',translation:'"Stop," the mouth in the mirror moved.'},
    {text:'声はなかった。でも読めた。',reading:'こえはなかった。でもよめた。',translation:'There was no sound. But I could read it.'},
  ],
  questions:[
    {q:'What first seemed wrong with the mirror?',choices:['It was cracked','The reflection was slow','The reflection looked different','It made a sound'],answer:'The reflection was slow'},
    {q:'What happened one morning that was truly frightening?',choices:['The mirror fell','The reflection smiled when she wasn\'t','She saw someone else','The mirror spoke'],answer:'The reflection smiled when she wasn\'t'},
    {q:'What did the reflection\'s mouth say?',choices:['"Help me"','"Run"','"Stop"','"Come closer"'],answer:'"Stop"'},
  ]
},

// MYSTERY
{
  id:'jp_mystery_02',
  lang:'japanese',
  title:'The Detective Who Never Asks',
  titleNative:'聞かない探偵',
  genres:['mystery','action'],
  difficulty:'N3',
  blurb:'Detective Kurosawa never asks witnesses questions. She just watches them. In five minutes she knows everything. Tonight she watches a man who may have killed his brother.',
  lines:[
    {text:'黒沢刑事は、証人に質問をしない。',reading:'くろさわけいじは、しょうにんにしつもんをしない。',translation:'Detective Kurosawa does not ask witnesses questions.'},
    {text:'ただ見る。それだけだ。',reading:'ただみる。それだけだ。',translation:'She just watches. That\'s all.'},
    {text:'人は嘘をつくとき、必ず何かをする。',reading:'ひとはうそをつくとき、かならずなにかをする。',translation:'When people lie, they always do something.'},
    {text:'指が動く。目線が右に外れる。呼吸が変わる。',reading:'ゆびがうごく。めせんがみぎにはずれる。こきゅうがかわる。',translation:'Fingers move. Eyes drift to the right. Breathing changes.'},
    {text:'男は三回、左手の親指を擦った。',reading:'おとこはさんかい、ひだりてのおやゆびをこすった。',translation:'The man rubbed his left thumb three times.'},
    {text:'「兄は自分で落ちた」と男が言った。',reading:'「あにはじぶんでおちた」とおとこがいった。',translation:'"My brother fell on his own," the man said.'},
    {text:'黒沢は初めて口を開いた。「どちらの手で押しましたか？」',reading:'くろさわははじめてくちをひらいた。「どちらのてでおしましたか？」',translation:'Kurosawa opened her mouth for the first time. "Which hand did you push with?"'},
  ],
  questions:[
    {q:'What is Kurosawa\'s method?',choices:['She asks many questions','She reads files','She just watches people','She uses technology'],answer:'She just watches people'},
    {q:'What does she notice when people lie?',choices:['They sweat','Their voice changes pitch','Small physical signs','They look away immediately'],answer:'Small physical signs'},
    {q:'What did Kurosawa\'s first question reveal?',choices:['He was innocent','He was nervous','That he pushed his brother','That he was lying about his name'],answer:'That he pushed his brother'},
  ]
},

// COMEDY / SLICE OF LIFE
{
  id:'jp_comedy_01',
  lang:'japanese',
  title:'The God Who Got Lost',
  titleNative:'迷子になった神様',
  genres:['comedy','fantasy','slice of life'],
  difficulty:'N4',
  blurb:'A god descends to Japan to fix a minor miracle and immediately gets lost on the subway. He has to ask a high school girl for directions.',
  lines:[
    {text:'神様が地上に降りてきたのは、小さなミスを直すためだった。',reading:'かみさまがちじょうにおりてきたのは、ちいさなミスをなおすためだった。',translation:'The god descended to earth to fix a small mistake.'},
    {text:'しかし渋谷駅で、乗り換えを間違えた。',reading:'しかししぶやえきで、のりかえをまちがえた。',translation:'However, at Shibuya station, he took the wrong transfer.'},
    {text:'全知全能のはずだったが、路線図は別の話だった。',reading:'ぜんちぜんのうのはずだったが、ろせんずはべつのはなしだった。',translation:'He was supposed to be all-knowing and all-powerful, but the train map was another matter.'},
    {text:'「すみません、これはどこ行きですか？」',reading:'「すみません、これはどこいきですか？」',translation:'"Excuse me, where does this go?"'},
    {text:'女子高生は神様を上から下まで見た。',reading:'じょしこうせいはかみさまをうえからしたまでみた。',translation:'The high school girl looked the god up and down.'},
    {text:'「コスプレですか？」',reading:'「コスプレですか？」',translation:'"Is that a costume?"'},
    {text:'神様は初めて恥ずかしいという気持ちを知った。',reading:'かみさまははじめてはずかしいというきもちをしった。',translation:'The god learned for the first time what it felt like to be embarrassed.'},
  ],
  questions:[
    {q:'Why did the god come to earth?',choices:['To end the world','To find a hero','To fix a small mistake','To take a vacation'],answer:'To fix a small mistake'},
    {q:'What went wrong?',choices:['He lost his powers','He got lost on the subway','He was spotted by humans','He forgot his mission'],answer:'He got lost on the subway'},
    {q:'What did the girl ask him?',choices:['"Are you a god?"','"Are you lost?"','"Is that a costume?"','"Can I help you?"'],answer:'"Is that a costume?"'},
  ]
},

// ── ADDITIONAL KOREAN STORIES ─────────────────────────────────────────────────

{
  id:'ko_thriller_02',
  lang:'korean',
  title:'The Neighbor',
  titleNative:'이웃',
  genres:['thriller','mystery','horror'],
  difficulty:'TOPIK 2',
  blurb:'She has never seen her neighbor\'s face. Only heard footsteps at 3 AM every night. Tonight the footsteps stopped outside her door.',
  lines:[
    {text:'옆집 이웃의 얼굴을 한 번도 본 적이 없다.',reading:'yeokjip iwutui eolguleul han beondo bon jeogi eopda.',translation:'I have never seen my neighbor\'s face even once.'},
    {text:'매일 밤 3시, 발소리가 들린다.',reading:'maeil bam sesī, balsori ga deullinda.',translation:'Every night at 3 AM, I hear footsteps.'},
    {text:'복도를 걷는 소리. 같은 속도. 같은 리듬.',reading:'bokdoleul geotneun sori. gateun sokdo. gateun rideum.',translation:'The sound of walking down the hallway. Same speed. Same rhythm.'},
    {text:'오늘 밤, 소리가 내 문 앞에서 멈췄다.',reading:'oneul bam, sori ga nae mun apeseo meomchwotda.',translation:'Tonight, the sound stopped outside my door.'},
    {text:'숨을 참았다.',reading:'sumeul chamatta.',translation:'I held my breath.'},
    {text:'1분이 지났다. 2분. 3분.',reading:'ilbuni jinatda. ibun. sambun.',translation:'One minute passed. Two. Three.'},
    {text:'그리고 문 밑으로 쪽지 한 장이 들어왔다.',reading:'geurigo mun mitero jjokji han jangi deureowatda.',translation:'Then a note slid under the door.'},
  ],
  questions:[
    {q:'When does she hear the footsteps?',choices:['Midnight','1 AM','3 AM','Dawn'],answer:'3 AM'},
    {q:'What was different tonight?',choices:['The footsteps were louder','The footsteps stopped at her door','There were no footsteps','She saw someone'],answer:'The footsteps stopped at her door'},
    {q:'What came under the door?',choices:['A key','A note','A flower','Nothing'],answer:'A note'},
  ]
},

{
  id:'ko_fantasy_02',
  lang:'korean',
  title:'The Last Memory Keeper',
  titleNative:'마지막 기억 보관자',
  genres:['fantasy','drama','action'],
  difficulty:'TOPIK 3-4',
  blurb:'In a world where memories can be traded like objects, she is the last person who refuses to sell hers. Everyone thinks she\'s a fool. She knows something they\'ve all forgotten.',
  lines:[
    {text:'이 세상에서 기억은 팔 수 있다.',reading:'i sesangeso gieoguen pal su itda.',translation:'In this world, memories can be sold.'},
    {text:'행복한 기억은 비싸다. 고통스러운 기억은 싸다.',reading:'haengbokan gieoguen bissada. gotongseureoun gieoguen ssada.',translation:'Happy memories are expensive. Painful ones are cheap.'},
    {text:'나는 하나도 팔지 않았다.',reading:'naneun hanado palji anatda.',translation:'I haven\'t sold a single one.'},
    {text:'사람들은 내가 바보라고 했다.',reading:'saramdeureun naega baborago haetta.',translation:'People said I was a fool.'},
    {text:'"그 고통스러운 것도 왜 갖고 있어?"',reading:'"geu gotongseureoun geotdo wae gatgo isseo?"',translation:'"Why do you keep even those painful ones?"'},
    {text:'나는 웃었다. "고통이 없으면 행복도 없으니까."',reading:'naneun useotda. "gotoni eopseumyeon haengbokdo eopseunikkka."',translation:'I smiled. "Because without pain, there\'s no happiness."'},
    {text:'그들이 잊어버린 것을 나는 아직 기억하고 있다.',reading:'geudeuri ijeobeolin geoseul naneun ajik gieokago itda.',translation:'What they have forgotten, I still remember.'},
  ],
  questions:[
    {q:'What can people do with memories in this world?',choices:['Share them','See them as videos','Sell them','Delete them permanently'],answer:'Sell them'},
    {q:'Why does she keep painful memories?',choices:['She is a collector','She can\'t sell them','Without pain there is no happiness','She forgot to sell them'],answer:'Without pain there is no happiness'},
    {q:'What does she know that others have forgotten?',choices:['How to get memories back','Something important they sold away','Where the memory market is','The true price of happiness'],answer:'Something important they sold away'},
  ]
},

{
  id:'ko_romance_02',
  lang:'korean',
  title:'Voice Memo',
  titleNative:'음성 메모',
  genres:['romance','drama'],
  difficulty:'TOPIK 2',
  blurb:'She found a voice memo on her old phone. Her own voice, from three years ago, crying and saying: "I hope future me is happy." She listened to it four times.',
  lines:[
    {text:'오래된 폰을 켰을 때 음성 메모가 하나 있었다.',reading:'oraedoen poneul kyeosseul ttae eumsong memoga hana isseotda.',translation:'When I turned on my old phone, there was one voice memo.'},
    {text:'3년 전 날짜였다.',reading:'samnyeon jeon naljjaiyeotda.',translation:'It was dated three years ago.'},
    {text:'내 목소리였다. 울고 있었다.',reading:'nae moksori yeotda. ulgo isseotda.',translation:'It was my voice. I was crying.'},
    {text:'"미래의 나, 행복하길 바라."',reading:'"miraeeui na, haengbokhagil bara."',translation:'"Future me, I hope you\'re happy."'},
    {text:'네 번 들었다.',reading:'ne beon deureotda.',translation:'I listened four times.'},
    {text:'그리고 오래 앉아 있었다.',reading:'geurigo orae anja isseotda.',translation:'And I sat for a long time.'},
    {text:'행복한지 모르겠다. 그래도 살아있다.',reading:'haengbokanji moreugettda. geuraedo saraitda.',translation:'I don\'t know if I\'m happy. But I\'m alive.'},
  ],
  questions:[
    {q:'Where did she find the memo?',choices:['On her computer','On an old phone','In her email','On a recorder'],answer:'On an old phone'},
    {q:'How old was the memo?',choices:['One year','Two years','Three years','Five years'],answer:'Three years'},
    {q:'What does she conclude at the end?',choices:['She is definitely happy','She regrets the past','She doesn\'t know if she\'s happy but she\'s alive','She wants to go back'],answer:'She doesn\'t know if she\'s happy but she\'s alive'},
  ]
},

{
  id:'ko_action_01',
  lang:'korean',
  title:'The Last Round',
  titleNative:'마지막 라운드',
  genres:['action','drama'],
  difficulty:'TOPIK 3-4',
  blurb:'A boxer with one fight left in her career. Her coach says quit. The crowd says quit. She has never listened to anyone in her life.',
  lines:[
    {text:'이것이 마지막 경기라는 걸 알고 있었다.',reading:'igeosi majimak gyeonggiraneon geol algo isseotda.',translation:'I knew this was the last match.'},
    {text:'코치는 "그만해"라고 했다. 열두 번째였다.',reading:'kochieneun "geumanhae"rago haetda. yeoldeu beonjjaeyeotda.',translation:'The coach said "stop." It was the twelfth time.'},
    {text:'관중도 같은 눈빛이었다.',reading:'gwanjungdo gateun nunbichi yeotda.',translation:'The crowd had the same look in their eyes.'},
    {text:'나는 링 위에 올라갔다.',reading:'naneun ring wiee ollagatta.',translation:'I climbed into the ring.'},
    {text:'첫 번째 펀치를 맞았을 때 무릎이 흔들렸다.',reading:'cheot beonjjae peonchirul majasseul ttae mureubi heundeullyeotda.',translation:'When the first punch landed, my knees shook.'},
    {text:'그래도 안 넘어졌다.',reading:'geraedo an neomeojeotda.',translation:'Still I didn\'t fall.'},
    {text:'넘어지는 건 상대방 몫이었다.',reading:'neomeoojineun geon sangdaebang moksiyeotda.',translation:'Falling was the opponent\'s job.'},
  ],
  questions:[
    {q:'How many times did the coach say stop?',choices:['Once','Six times','Twelve times','Twenty times'],answer:'Twelve times'},
    {q:'What happened after the first punch?',choices:['She fell','Her knees shook but she stayed up','She knocked her opponent down','She stopped the fight'],answer:'Her knees shook but she stayed up'},
    {q:'What does she say falling is?',choices:['Inevitable','Her destiny','The opponent\'s job','A sign of weakness'],answer:'The opponent\'s job'},
  ]
},

// ── ADDITIONAL ITALIAN STORIES ────────────────────────────────────────────────

{
  id:'it_mystery_02',
  lang:'italian',
  title:'The Witness',
  titleNative:'Il testimone',
  genres:['mystery','thriller','action'],
  difficulty:'B1',
  blurb:'He saw everything from his window. A detective comes to take his statement. He answers every question truthfully — except one.',
  lines:[
    {text:'Ho visto tutto dalla finestra del terzo piano.',reading:'',translation:'I saw everything from the third floor window.'},
    {text:'L\'ispettore aveva un taccuino e una penna.',reading:'',translation:'The inspector had a notebook and a pen.'},
    {text:'Ha fatto molte domande. Ho risposto a tutte.',reading:'',translation:'He asked many questions. I answered all of them.'},
    {text:'"Ha riconosciuto l\'uomo?"',reading:'',translation:'"Did you recognize the man?"'},
    {text:'"No," ho detto. "Era troppo buio."',reading:'',translation:'"No," I said. "It was too dark."'},
    {text:'Era una bugia. L\'avevo riconosciuto benissimo.',reading:'',translation:'It was a lie. I had recognized him perfectly well.'},
    {text:'Era mio fratello.',reading:'',translation:'It was my brother.'},
  ],
  questions:[
    {q:'From where did the witness see everything?',choices:['The street','A shop','The third floor window','A car'],answer:'The third floor window'},
    {q:'What did he lie about?',choices:['Where he was','What time it was','Whether he recognized the man','What the man was wearing'],answer:'Whether he recognized the man'},
    {q:'Why did he lie?',choices:['He was scared','The man was his brother','He didn\'t trust the detective','He wanted money'],answer:'The man was his brother'},
  ]
},

{
  id:'it_fantasy_01',
  lang:'italian',
  title:'The City That Moves',
  titleNative:'La città che si muove',
  genres:['fantasy','adventure'],
  difficulty:'B2',
  blurb:'Every morning the streets of the city have rearranged themselves. Locals know the rules. Tourists always get lost — and some are never found.',
  lines:[
    {text:'In questa città, le strade cambiano ogni notte.',reading:'',translation:'In this city, the streets change every night.'},
    {text:'I residenti lo sanno. Hanno imparato le regole.',reading:'',translation:'The residents know it. They have learned the rules.'},
    {text:'Regola uno: non uscire dopo la mezzanotte.',reading:'',translation:'Rule one: don\'t go out after midnight.'},
    {text:'Regola due: se la strada è nuova, non seguirla.',reading:'',translation:'Rule two: if the street is new, don\'t follow it.'},
    {text:'Regola tre: il mercato è sempre al centro. Sempre.',reading:'',translation:'Rule three: the market is always in the center. Always.'},
    {text:'I turisti non conoscono le regole.',reading:'',translation:'Tourists don\'t know the rules.'},
    {text:'Alcuni non vengono mai trovati.',reading:'',translation:'Some are never found.'},
  ],
  questions:[
    {q:'When do the streets change?',choices:['Every week','During storms','Every night','Every year'],answer:'Every night'},
    {q:'What is rule two?',choices:['Don\'t go out after midnight','Don\'t follow new streets','Stay near the market','Never go alone'],answer:'Don\'t follow new streets'},
    {q:'What is always in the center?',choices:['The church','The school','The market','The old tower'],answer:'The market'},
  ]
},

{
  id:'it_romance_02',
  lang:'italian',
  title:'The Wrong Order',
  titleNative:'L\'ordine sbagliato',
  genres:['romance','comedy','slice of life'],
  difficulty:'A2',
  blurb:'He ordered a cappuccino. She brought an espresso. He drank it without saying anything. She came back and said she knew — she just wanted to see what he would do.',
  lines:[
    {text:'Ho ordinato un cappuccino.',reading:'',translation:'I ordered a cappuccino.'},
    {text:'Lei ha portato un espresso.',reading:'',translation:'She brought an espresso.'},
    {text:'Non ho detto niente. Ho bevuto.',reading:'',translation:'I said nothing. I drank it.'},
    {text:'Dieci minuti dopo è tornata.',reading:'',translation:'Ten minutes later she came back.'},
    {text:'"Sa che era sbagliato, vero?"',reading:'',translation:'"You know it was wrong, right?"'},
    {text:'"Sì," ho risposto. "Ma era buono."',reading:'',translation:'"Yes," I answered. "But it was good."'},
    {text:'"Volevo solo vedere cosa faceva." Ha sorriso.',reading:'',translation:'"I just wanted to see what you would do." She smiled.'},
  ],
  questions:[
    {q:'What did he order?',choices:['An espresso','A cappuccino','A tea','Water'],answer:'A cappuccino'},
    {q:'Why did he not complain?',choices:['He didn\'t notice','He was shy','The story doesn\'t say','He drank it without saying anything'],answer:'He drank it without saying anything'},
    {q:'Why did she bring the wrong order?',choices:['It was a mistake','She was new','She wanted to see what he would do','She forgot'],answer:'She wanted to see what he would do'},
  ]
},

{
  id:'it_drama_01',
  lang:'italian',
  title:'The Last Lesson',
  titleNative:'L\'ultima lezione',
  genres:['drama','slice of life'],
  difficulty:'B1',
  blurb:'A professor gives his last lecture before retirement. He has taught for forty years. He has one thing left to say that he has never said in class.',
  lines:[
    {text:'Quarant\'anni fa ho iniziato a insegnare in questa aula.',reading:'',translation:'Forty years ago I began teaching in this classroom.'},
    {text:'Ho parlato di storia, di guerra, di filosofia.',reading:'',translation:'I spoke about history, war, philosophy.'},
    {text:'Oggi è l\'ultima lezione.',reading:'',translation:'Today is the last lesson.'},
    {text:'Gli studenti aspettavano qualcosa di importante.',reading:'',translation:'The students were waiting for something important.'},
    {text:'Ho detto solo questo: "Non so ancora tutto."',reading:'',translation:'I said only this: "I still don\'t know everything."'},
    {text:'La classe era silenziosa.',reading:'',translation:'The class was silent.'},
    {text:'"E questa è la cosa più importante che vi ho insegnato."',reading:'',translation:'"And that is the most important thing I have taught you."'},
  ],
  questions:[
    {q:'How long had he been teaching?',choices:['Twenty years','Thirty years','Forty years','Fifty years'],answer:'Forty years'},
    {q:'What did he say in his final lesson?',choices:['"Study hard"','"History repeats itself"','"I still don\'t know everything"','"Follow your dreams"'],answer:'"I still don\'t know everything"'},
    {q:'What does he call the most important thing he taught?',choices:['Philosophy','History','Admitting you don\'t know everything','Hard work'],answer:'Admitting you don\'t know everything'},
  ]
},

{
  id:'it_thriller_01',
  lang:'italian',
  title:'The Password',
  titleNative:'La password',
  genres:['thriller','mystery'],
  difficulty:'B2',
  blurb:'She is a hacker hired to break into a private server. She cracks every layer in minutes. Then she finds one folder she cannot open — and recognizes the password hint.',
  lines:[
    {text:'Ho impiegato ventidue minuti a entrare nel sistema.',reading:'',translation:'It took me twenty-two minutes to get into the system.'},
    {text:'I firewall erano forti ma non abbastanza.',reading:'',translation:'The firewalls were strong but not strong enough.'},
    {text:'C\'era una cartella sola rimasta bloccata.',reading:'',translation:'There was one folder that remained locked.'},
    {text:'Il suggerimento per la password era: "Il nome che non ho mai detto ad alta voce."',reading:'',translation:'The password hint was: "The name I have never said aloud."'},
    {text:'Mi sono fermata.',reading:'',translation:'I stopped.'},
    {text:'Conoscevo quella frase. Me l\'aveva detta mio padre.',reading:'',translation:'I knew that phrase. My father had said it to me.'},
    {text:'Ho digitato il mio nome.',reading:'',translation:'I typed my own name.'},
  ],
  questions:[
    {q:'How long did it take her to enter the system?',choices:['Five minutes','Ten minutes','Twenty-two minutes','An hour'],answer:'Twenty-two minutes'},
    {q:'What was the password hint?',choices:['"My first love"','"The name I have never said aloud"','"My mother\'s birthday"','"The place I was born"'],answer:'"The name I have never said aloud"'},
    {q:'What did she type as the password?',choices:['Her father\'s name','Her mother\'s name','Her own name','She doesn\'t try'],answer:'Her own name'},
  ]
}

);
