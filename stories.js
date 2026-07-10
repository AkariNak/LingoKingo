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
  genres:['mystery','horror','action'],
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

// Genre list for filtering
const STORY_GENRES = ['isekai','fantasy','action','adventure','romance','slice of life','school','mystery','horror','comedy'];
