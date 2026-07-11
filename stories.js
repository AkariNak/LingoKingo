// ── STORIES ───────────────────────────────────────────────────────────────────
const STORIES = [

// ── JAPANESE ──────────────────────────────────────────────────────────────────

{
  id:'jp_isekai_01',
  lang:'japanese',
  title:'The Wrong World',
  titleNative:'まちがった世界',
  genres:['isekai','fantasy','action'],
  difficulty:'N4',
  blurb:'He died in a convenience store parking lot at 2 AM. Slipped on ice. Embarrassing. Now he\'s somewhere else entirely, and the sky is the wrong color.',
  lines:[
    {text:'目を開けたとき、最初に気づいたのは空の色だった。',reading:'めをあけたとき、さいしょにきづいたのはそらのいろだった。',translation:'When I opened my eyes, the first thing I noticed was the color of the sky.'},
    {text:'赤だった。夕焼けじゃない。ただ、赤かった。',reading:'あかだった。ゆうやけじゃない。ただ、あかかった。',translation:'Red. Not a sunset. Just red.'},
    {text:'背中の下は土で、草のにおいがした。知らないにおいだった。',reading:'せなかのしたはつちで、くさのにおいがした。しらないにおいだった。',translation:'The ground beneath my back was dirt, and it smelled of grass. Grass I didn\'t recognize.'},
    {text:'立ち上がると、森だった。木が高すぎた。',reading:'たちあがると、もりだった。きがたかすぎた。',translation:'When I stood up, there was a forest. The trees were too tall.'},
    {text:'スマホを探した。なかった。財布もなかった。',reading:'スマホをさがした。なかった。さいふもなかった。',translation:'I reached for my phone. Gone. My wallet too.'},
    {text:'木の間から何かがこちらを見ていた。目だけが見えた。黄色い目が。',reading:'きのあいだからなにかがこちらをみていた。めだけがみえた。きいろいめが。',translation:'Something between the trees was watching me. Only the eyes were visible. Yellow eyes.'},
    {text:'死に方が間抜けだったわりに、続きがあるらしかった。',reading:'しにかたがまぬけだったわりに、つづきがあるらしかった。',translation:'For such a stupid way to die, it seemed there was a continuation.'},
  ],
  questions:[
    {q:'What was the first thing he noticed?',choices:['The trees','The smell of grass','The color of the sky','Yellow eyes'],answer:'The color of the sky'},
    {q:'What color was the sky?',choices:['Blue','Orange','Black','Red'],answer:'Red'},
    {q:'What does the last line suggest?',choices:['He is dreaming','He survived','He has been reincarnated','He is in hell'],answer:'He has been reincarnated'},
  ]
},

{
  id:'jp_magic_01',
  lang:'japanese',
  title:'Born Again with Magic',
  titleNative:'魔法と共に転生した',
  genres:['isekai','fantasy','action'],
  difficulty:'N4',
  blurb:'The second life started before he could hold his own head up. He couldn\'t walk, couldn\'t talk, couldn\'t do anything a person could do. But magic — that, he could already feel.',
  lines:[
    {text:'最初の記憶は天井だった。木でできた、知らない天井。',reading:'さいしょのきおくはてんじょうだった。きでできた、しらないてんじょう。',translation:'My first memory was a ceiling. Wood. A ceiling I didn\'t know.'},
    {text:'体が動かなかった。腕が短すぎた。声を出そうとしたら泣き声になった。',reading:'からだがうごかなかった。うでがみじかすぎた。こえをだそうとしたらなきごえになった。',translation:'My body wouldn\'t move. My arms were too short. When I tried to speak, what came out was crying.'},
    {text:'赤ん坊だと理解するまで少し時間がかかった。',reading:'あかんぼうだとりかいするまですこしじかんがかかった。',translation:'It took me a moment to understand I was a baby.'},
    {text:'前の世界での記憶は全部あった。四十三年分。',reading:'まえのせかいでのきおくはぜんぶあった。よんじゅうさんねんぶん。',translation:'All my memories from before were intact. Forty-three years of them.'},
    {text:'だが一つだけ、前と違うことがあった。',reading:'だがひとつだけ、まえとちがうことがあった。',translation:'But there was one thing different from before.'},
    {text:'この小さな手の中を、何かが流れていた。川みたいに、静かに、ずっと。',reading:'このちいさなてのなかを、なにかがながれていた。かわみたいに、しずかに、ずっと。',translation:'Through these small hands, something was flowing. Like a river. Quietly. Always.'},
    {text:'前の人生で欲しかったものが、今ここにあった。',reading:'まえのじんせいでほしかったものが、いまここにあった。',translation:'What I had wanted in my previous life was here now.'},
  ],
  questions:[
    {q:'How old was he in his previous life?',choices:['Twenty-three','Thirty-five','Forty-three','Sixty'],answer:'Forty-three'},
    {q:'What was different about this life?',choices:['He had a family','He had magic','He could fly','He remembered nothing'],answer:'He had magic'},
    {q:'How does he describe what flows through his hands?',choices:['Like fire','Like electricity','Like a river','Like wind'],answer:'Like a river'},
  ]
},

{
  id:'jp_magic_02',
  lang:'japanese',
  title:'The Sword That Chose No One',
  titleNative:'誰も選ばなかった剣',
  genres:['fantasy','action','adventure'],
  difficulty:'N3',
  blurb:'The ceremony had been going on since morning. By afternoon, ninety heroes had tried. By evening, the crowd was tired of watching people fail. Aira was tired of standing.',
  lines:[
    {text:'エイラは式典が嫌いだった。人が多すぎて、暑かった。',reading:'エイラはしきてんがきらいだった。ひとがおおすぎて、あつかった。',translation:'Aira hated ceremonies. Too many people, and it was hot.'},
    {text:'剣など興味がなかった。ただ、母親に連れてこられただけだった。',reading:'けんなどきょうみがなかった。ただ、ははおやにつれてこられただけだった。',translation:'She had no interest in the sword. She\'d only been dragged there by her mother.'},
    {text:'人混みに押されて、よろけた。手が伸びた。何かに触れた。',reading:'ひとごみにおされて、よろけた。てがのびた。なにかにふれた。',translation:'Pushed by the crowd, she stumbled. Her hand reached out. Touched something.'},
    {text:'光った。強く、まっすぐ、空に向かって。',reading:'ひかった。つよく、まっすぐ、そらにむかって。',translation:'It glowed. Brightly, straight upward toward the sky.'},
    {text:'「選ばれようとしなかった者を、私は待っていた」',reading:'「えらばれようとしなかったものを、わたしはまっていた」',translation:'"I have been waiting for one who did not try to be chosen."'},
    {text:'声は剣の中から来ていた。エイラには信じられなかった。',reading:'こえはけんのなかからきていた。エイラにはしんじられなかった。',translation:'The voice came from inside the sword. Aira couldn\'t believe it.'},
    {text:'隣にいた母親が、小さく「嘘でしょ」とつぶやいた。',reading:'となりにいたははおやが、ちいさく「うそでしょ」とつぶやいた。',translation:'Her mother, standing beside her, whispered quietly, "You\'ve got to be kidding."'},
  ],
  questions:[
    {q:'Why was Aira at the ceremony?',choices:['She wanted the sword','She was a hero candidate','Her mother brought her','She worked there'],answer:'Her mother brought her'},
    {q:'How did she touch the sword?',choices:['She reached for it on purpose','She stumbled and her hand reached out','She was pushed directly into it','She tripped and fell on it'],answer:'She stumbled and her hand reached out'},
    {q:'What did her mother say at the end?',choices:['"I knew it"','"You\'ve got to be kidding"','"I\'m so proud"','"Be careful"'],answer:'"You\'ve got to be kidding"'},
  ]
},

{
  id:'jp_magic_03',
  lang:'japanese',
  title:'What Magic Costs',
  titleNative:'魔法の代償',
  genres:['fantasy','action'],
  difficulty:'N3',
  blurb:'Every spell takes something. A memory. A color. Six months off your life. He stopped counting what he\'d lost somewhere around his thirtieth use. He doesn\'t know what year it is anymore.',
  lines:[
    {text:'最初に消えたのは赤だった。',reading:'さいしょにきえたのはあかだった。',translation:'The first thing to disappear was red.'},
    {text:'ある朝、トマトを見て「これは何色だ」と思った。灰色に見えた。',reading:'あるあさ、トマトをみて「これはなにいろだ」とおもった。はいいろにみえた。',translation:'One morning I looked at a tomato and thought, what color is this. It looked grey.'},
    {text:'次は子供の頃の声が消えた。顔は残った。声だけない。',reading:'つぎはこどものころのこえがきえた。かおはのこった。こえだけない。',translation:'Next went the voices of my childhood. The faces stayed. Just the voices, gone.'},
    {text:'今は年が数えられない。去年が何年だったか思い出せない。',reading:'いまはとしがかぞえられない。きょねんがなんねんだったかおもいだせない。',translation:'Now I can\'t count the years. I can\'t remember what year last year was.'},
    {text:'それでも使い続けた。',reading:'それでもつかいつづけた。',translation:'Even so, I kept using it.'},
    {text:'守りたいものがある限り、失っても構わないと思っていた。',reading:'まもりたいものがあるかぎり、うしなってもかまわないとおもっていた。',translation:'As long as there was something I wanted to protect, I thought it didn\'t matter what I lost.'},
    {text:'今朝、その人の名前を思い出せなかった。',reading:'けさ、そのひとのなまえをおもいだせなかった。',translation:'This morning, I couldn\'t remember that person\'s name.'},
  ],
  questions:[
    {q:'What was the first thing he lost to magic?',choices:['His memories','The color red','His voice','His sense of time'],answer:'The color red'},
    {q:'What can\'t he do now?',choices:['See','Walk','Count the years','Use magic'],answer:'Count the years'},
    {q:'What happened this morning?',choices:['He lost another color','He forgot the year','He forgot the name of someone he wanted to protect','He stopped using magic'],answer:'He forgot the name of someone he wanted to protect'},
  ]
},

{
  id:'jp_magic_04',
  lang:'japanese',
  title:'One Second',
  titleNative:'一秒',
  genres:['isekai','school','action'],
  difficulty:'N4',
  blurb:'At the hero academy entrance exam, everyone gets one minute to show their power. He got one second — literally. The class laughed. That was before the practical.',
  lines:[
    {text:'能力開示の試験は一人ずつ行われた。',reading:'のうりょくかいじのしけんはひとりずつおこなわれた。',translation:'The ability disclosure exam was conducted one person at a time.'},
    {text:'炎使い。風読み。剣の天才。教室が盛り上がった。',reading:'ほのおつかい。かぜよみ。けんのてんさい。きょうしつがもりあがった。',translation:'Fire user. Wind reader. Sword prodigy. The classroom got excited.'},
    {text:'ケンジの番が来た。「一秒先の未来が見えます」',reading:'ケンジのばんがきた。「いちびょうさきのみらいがみえます」',translation:'Kenji\'s turn came. "I can see one second into the future."'},
    {text:'誰かが笑った。それが広がった。',reading:'だれかがわらった。それがひろがった。',translation:'Someone laughed. It spread.'},
    {text:'実技試験では、ケンジは一度も打たれなかった。',reading:'じつぎしけんでは、ケンジはいちどもうたれなかった。',translation:'In the practical exam, Kenji wasn\'t hit once.'},
    {text:'相手の拳がどこに来るか、一秒前からわかっていた。',reading:'あいてのこぶしがどこにくるか、いちびょうまえからわかっていた。',translation:'He already knew where the opponent\'s fist would come, a second before it arrived.'},
    {text:'笑っていた生徒たちは、もう笑っていなかった。',reading:'わらっていたせいとたちは、もうわらっていなかった。',translation:'The students who had laughed were no longer laughing.'},
  ],
  questions:[
    {q:'What is Kenji\'s ability?',choices:['He can see the future','He can see one second into the future','He can slow time','He is very fast'],answer:'He can see one second into the future'},
    {q:'What happened in the practical exam?',choices:['He lost','He used a different power','He wasn\'t hit once','He gave up'],answer:'He wasn\'t hit once'},
    {q:'How did the class change by the end?',choices:['They were still laughing','They were scared of him','They stopped laughing','They apologized'],answer:'They stopped laughing'},
  ]
},

{
  id:'jp_slice_01',
  lang:'japanese',
  title:'3:47 AM',
  titleNative:'午前三時四十七分',
  genres:['slice of life','romance'],
  difficulty:'N5',
  blurb:'She always texts at the exact same time. He stopped asking why months ago. Tonight he finally does.',
  lines:[
    {text:'午前三時四十七分。また来た。',reading:'ごぜんさんじよんじゅうななふん。またきた。',translation:'3:47 AM. It came again.'},
    {text:'「眠れない」',reading:'「ねむれない」',translation:'"Can\'t sleep."'},
    {text:'いつもそれだけだ。句読点もない。',reading:'いつもそれだけだ。くとうてんもない。',translation:'Always just that. No punctuation.'},
    {text:'今夜は違うことを返した。「なんで」',reading:'こんやはちがうことをかえした。「なんで」',translation:'Tonight I replied with something different. "Why."'},
    {text:'既読がついた。返事はなかった。三分、四分、五分。',reading:'きどくがついた。へんじはなかった。さんぷん、よんぷん、ごふん。',translation:'She read it. No reply. Three minutes. Four. Five.'},
    {text:'「あなたのことを考えてるから」',reading:'「あなたのことをかんがえてるから」',translation:'"Because I\'m thinking about you."'},
    {text:'その夜は、僕も眠れなかった。',reading:'そのよるは、ぼくもねむれなかった。',translation:'That night, I couldn\'t sleep either.'},
  ],
  questions:[
    {q:'What does she always text?',choices:['"Good night"','"I miss you"','"Can\'t sleep"','"Are you awake?"'],answer:'"Can\'t sleep"'},
    {q:'What was different tonight?',choices:['She texted earlier','He asked her why','She called instead','She didn\'t text'],answer:'He asked her why'},
    {q:'What happened after he read her reply?',choices:['He called her','He fell asleep','He couldn\'t sleep either','He texted back'],answer:'He couldn\'t sleep either'},
  ]
},

{
  id:'jp_romance_02',
  lang:'japanese',
  title:'The Umbrella',
  titleNative:'傘',
  genres:['romance','slice of life'],
  difficulty:'N5',
  blurb:'He had an umbrella. She didn\'t. He didn\'t say anything. He just slowed down a little.',
  lines:[
    {text:'駅を出た瞬間に雨が降ってきた。',reading:'えきをでたしゅんかんにあめがふってきた。',translation:'The moment we stepped out of the station, it started raining.'},
    {text:'彼女は立ち止まった。空を見た。鞄を確認した。傘はなかった。',reading:'かのじょはたちどまった。そらをみた。かばんをかくにんした。かさはなかった。',translation:'She stopped. Looked at the sky. Checked her bag. No umbrella.'},
    {text:'彼は黙って傘を開いた。それだけだった。',reading:'かれはだまってかさをひらいた。それだけだった。',translation:'He quietly opened his umbrella. That was all.'},
    {text:'少し歩くのを遅くした。彼女も合わせた。',reading:'すこしあるくのをおそくした。かのじょもあわせた。',translation:'He slowed his pace slightly. She matched it.'},
    {text:'自然に、二人の肩が同じ傘の下に収まっていた。',reading:'しぜんに、ふたりのかたがおなじかさのしたにおさまっていた。',translation:'Naturally, both their shoulders fit under the same umbrella.'},
    {text:'何も言わなかった。雨の音だけがした。',reading:'なにもいわなかった。あめのおとだけがした。',translation:'They said nothing. Only the sound of rain.'},
    {text:'彼女が「ありがとう」と言ったのは、別れ際だった。',reading:'かのじょが「ありがとう」といったのは、わかれぎわだった。',translation:'She said "thank you" at the moment they parted ways.'},
  ],
  questions:[
    {q:'What did he do when it started raining?',choices:['He ran','He gave her his umbrella','He opened his umbrella and slowed down','He asked if she had one'],answer:'He opened his umbrella and slowed down'},
    {q:'What was the only sound?',choices:['Their footsteps','Her voice','The rain','Traffic'],answer:'The rain'},
    {q:'When did she thank him?',choices:['Right away','Under the umbrella','At the moment they parted','She didn\'t'],answer:'At the moment they parted'},
  ]
},

{
  id:'jp_romance_03',
  lang:'japanese',
  title:'Ninety-Nine Times',
  titleNative:'九十九回',
  genres:['romance','comedy'],
  difficulty:'N4',
  blurb:'He had confessed every spring for three years running. She\'d said no every time. This spring he showed up and said nothing. She was the one who brought it up.',
  lines:[
    {text:'桜が咲くたびに、田中は告白した。去年も、一昨年も。',reading:'さくらがさくたびに、たなかはこくはくした。きょねんも、おととしも。',translation:'Every time the cherry blossoms bloomed, Tanaka confessed. Last year. The year before.'},
    {text:'返事はいつも同じだった。断りの言葉だけが変わった。',reading:'へんじはいつもおなじだった。ことわりのことばだけがかわった。',translation:'The answer was always the same. Only the phrasing of the rejection changed.'},
    {text:'今年の春、田中は何も言わなかった。',reading:'ことしのはる、たなかはなにもいわなかった。',translation:'This spring, Tanaka said nothing.'},
    {text:'桜の木の下で、ただ黙って立っていた。',reading:'さくらのきのしたで、ただだまってたっていた。',translation:'He just stood quietly under the cherry tree.'},
    {text:'「今年は言わないの？」と彼女が聞いた。',reading:'「ことしはいわないの？」とかのじょがきいた。',translation:'"You\'re not saying it this year?" she asked.'},
    {text:'「もういいかなと思って」',reading:'「もういいかなとおもって」',translation:'"I figured it was probably fine to stop."'},
    {text:'「それは困る」と彼女は言った。桜が一枚、肩に落ちた。',reading:'「それはこまる」とかのじょはいった。さくらがいちまい、かたにおちた。',translation:'"That\'s a problem," she said. A single petal fell on her shoulder.'},
  ],
  questions:[
    {q:'What did Tanaka do every spring?',choices:['Gave her flowers','Confessed his feelings','Wrote her a letter','Asked her to walk with him'],answer:'Confessed his feelings'},
    {q:'What did he do differently this spring?',choices:['He confessed more boldly','He brought her something','He said nothing','He avoided her'],answer:'He said nothing'},
    {q:'What did she say when he explained?',choices:['"Finally"','"Good"','"That\'s a problem"','"I knew it"'],answer:'"That\'s a problem"'},
  ]
},

{
  id:'jp_horror_01',
  lang:'japanese',
  title:'The Photograph',
  titleNative:'写真',
  genres:['horror','mystery'],
  difficulty:'N4',
  blurb:'She moved into the apartment on a Tuesday. Found the box on Wednesday. On Thursday she couldn\'t stop looking at the photograph.',
  lines:[
    {text:'押し入れの奥に、古い菓子箱があった。',reading:'おしいれのおくに、ふるいかしばこがあった。',translation:'At the back of the closet was an old candy box.'},
    {text:'中に写真が一枚だけ入っていた。',reading:'なかにしゃしんがいちまいだけはいっていた。',translation:'Inside was only one photograph.'},
    {text:'この部屋の写真だった。今と同じ壁紙、同じ窓。',reading:'このへやのしゃしんだった。いまとおなじかべがみ、おなじまど。',translation:'It was a photo of this room. Same wallpaper, same window.'},
    {text:'布団の上で眠る人が写っていた。今夜と同じ服を着ていた。',reading:'ふとんのうえでねむるひとがうつっていた。こんやとおなじふくをきていた。',translation:'Someone was sleeping on the futon. Wearing the same clothes as tonight.'},
    {text:'裏を返した。日付があった。',reading:'うらをかえした。ひづけがあった。',translation:'She turned it over. There was a date.'},
    {text:'明日の日付だった。',reading:'あしたのひづけだった。',translation:'Tomorrow\'s date.'},
    {text:'そのとき押し入れの中から、何かが動く音がした。',reading:'そのときおしいれのなかから、なにかがうごくおとがした。',translation:'At that moment, from inside the closet, came the sound of something moving.'},
  ],
  questions:[
    {q:'What was in the box?',choices:['Old letters','Money','One photograph','Keys'],answer:'One photograph'},
    {q:'What was strange about the photo?',choices:['It showed a ghost','It showed her sleeping in the same clothes as tonight','It had no people in it','It was very old'],answer:'It showed her sleeping in the same clothes as tonight'},
    {q:'What was the date on the back?',choices:['The day she moved in','Yesterday','Today','Tomorrow'],answer:'Tomorrow'},
  ]
},

{
  id:'jp_horror_02',
  lang:'japanese',
  title:'The Mirror',
  titleNative:'鏡',
  genres:['horror','mystery'],
  difficulty:'N4',
  blurb:'It started with a half-second delay. She told herself it was her eyes. Then two seconds. Then the reflection smiled when she wasn\'t.',
  lines:[
    {text:'最初は気のせいだと思った。鏡の動きが少し遅い気がした。',reading:'さいしょはきのせいだとおもった。かがみのうごきがすこしおそいきがした。',translation:'At first I thought it was my imagination. The mirror seemed a little slow.'},
    {text:'目の疲れだと思って、眠った。',reading:'めのつかれだとおもって、ねむった。',translation:'I thought it was eye fatigue and went to sleep.'},
    {text:'翌朝も同じだった。一秒。確実に一秒、遅かった。',reading:'よくあさもおなじだった。いちびょう。かくじつにいちびょう、おそかった。',translation:'The next morning it was the same. One second. Definitely one second slow.'},
    {text:'水曜日には二秒になった。',reading:'すいようびにはにびょうになった。',translation:'By Wednesday it was two seconds.'},
    {text:'木曜日の朝、歯を磨きながら鏡を見た。反射の口が笑った。私は笑っていなかった。',reading:'もくようびのあさ、はをみがきながらかがみをみた。はんしゃのくちがわらった。わたしはわらっていなかった。',translation:'Thursday morning, brushing my teeth, I looked in the mirror. The reflection\'s mouth smiled. I wasn\'t smiling.'},
    {text:'壊そうと手を伸ばした。反射の手が先に動いた。',reading:'こわそうとてをのばした。はんしゃのてがさきにうごいた。',translation:'I reached out to break it. The reflection\'s hand moved first.'},
    {text:'口が動いた。声はなかったが、読めた。「来て」',reading:'くちがうごいた。こえはなかったが、よめた。「きて」',translation:'The mouth moved. No sound, but I could read it. "Come."'},
  ],
  questions:[
    {q:'How did it start?',choices:['The reflection smiled','The reflection moved on its own','The mirror seemed a little slow','The mirror cracked'],answer:'The mirror seemed a little slow'},
    {q:'What happened on Thursday morning?',choices:['The reflection disappeared','The reflection smiled when she wasn\'t','The mirror broke','The reflection waved'],answer:'The reflection smiled when she wasn\'t'},
    {q:'What did the reflection\'s mouth say?',choices:['"Help"','"Stop"','"Come"','"Run"'],answer:'"Come"'},
  ]
},

{
  id:'jp_mystery_01',
  lang:'japanese',
  title:'Room 404',
  titleNative:'404号室',
  genres:['mystery','horror'],
  difficulty:'N4',
  blurb:'The staff said the room didn\'t exist. He saw the number with his own eyes.',
  lines:[
    {text:'「404号室はございません」',reading:'「よんまるよんごうしつはございません」',translation:'"Room 404 does not exist."'},
    {text:'フロントの女性は笑顔だった。自然な笑顔だった。それが怖かった。',reading:'フロントのじょせいはえがおだった。しぜんなえがおだった。それがこわかった。',translation:'The woman at the front desk was smiling. A natural smile. That was what was frightening.'},
    {text:'だが廊下の突き当たりに、確かに404という数字があった。',reading:'だがろうかのつきあたりに、たしかに404というすうじがあった。',translation:'But at the end of the hallway, there was definitely the number 404.'},
    {text:'ドアの下から光が漏れていた。',reading:'ドアのしたからひかりがもれていた。',translation:'Light leaked from under the door.'},
    {text:'ノックした。返事はなかった。でも、中に何かいる感じがした。',reading:'ノックした。へんじはなかった。でも、なかになにかいるかんじがした。',translation:'I knocked. No answer. But there was a feeling that something was inside.'},
    {text:'翌朝、「昨夜あの部屋に泊まった客は」と聞いた。',reading:'よくあさ、「さくやあのへやにとまったきゃくは」ときいた。',translation:'The next morning I asked, "The guest who stayed in that room last night —"'},
    {text:'女性の笑顔が、初めて消えた。「あの部屋には、十年間誰も入っていません」',reading:'じょせいのえがおが、はじめてきえた。「あのへやには、じゅうねんかんだれもはいっていません」',translation:'For the first time, the woman\'s smile disappeared. "No one has entered that room for ten years."'},
  ],
  questions:[
    {q:'What did the front desk say about room 404?',choices:['It was occupied','It was being cleaned','It didn\'t exist','It was the most expensive'],answer:'It didn\'t exist'},
    {q:'What scared him about the receptionist?',choices:['She was too tall','Her smile was too natural','She spoke strangely','She looked like someone he knew'],answer:'Her smile was too natural'},
    {q:'For how long has no one entered room 404?',choices:['One year','Five years','Ten years','Thirty years'],answer:'Ten years'},
  ]
},

{
  id:'jp_mystery_02',
  lang:'japanese',
  title:'The Detective Who Never Asks',
  titleNative:'聞かない探偵',
  genres:['mystery','action'],
  difficulty:'N3',
  blurb:'Detective Kurosawa doesn\'t ask questions. She watches. Tonight she watches a man who says his brother fell.',
  lines:[
    {text:'黒沢は証人に質問をしない。それが彼女のやり方だ。',reading:'くろさわはしょうにんにしつもんをしない。それがかのじょのやりかただ。',translation:'Kurosawa doesn\'t ask witnesses questions. That is her method.'},
    {text:'人は質問されると答えを作る。黙って見られると、本当のことが出る。',reading:'ひとはしつもんされるとこたえをつくる。だまってみられると、ほんとうのことがでる。',translation:'When people are questioned, they construct answers. When watched in silence, the truth comes out.'},
    {text:'男は三十分間で、左の親指を六回こすった。',reading:'おとこはさんじゅっぷんかんで、ひだりのおやゆびをろっかいこすった。',translation:'In thirty minutes, the man rubbed his left thumb six times.'},
    {text:'目線は三回、右上に逃げた。記憶を作るときの動きだ。',reading:'めせんはさんかい、みぎうえにげた。きおくをつくるときのうごきだ。',translation:'His gaze drifted upper-right three times. The movement of someone constructing a memory.'},
    {text:'「兄は自分で落ちました」と男は言った。',reading:'「あにはじぶんでおちました」とおとこはいった。',translation:'"My brother fell on his own," the man said.'},
    {text:'黒沢は初めて口を開いた。',reading:'くろさわははじめてくちをひらいた。',translation:'For the first time, Kurosawa opened her mouth.'},
    {text:'「落ちる前に、何か言いましたか？お兄さんは」',reading:'「おちるまえに、なにかいいましたか？おにいさんは」',translation:'"Before he fell — did your brother say anything?"'},
  ],
  questions:[
    {q:'Why doesn\'t Kurosawa ask questions?',choices:['She is shy','When watched in silence the truth comes out','She doesn\'t speak the language','She already knows the answers'],answer:'When watched in silence the truth comes out'},
    {q:'What does the man\'s eye movement suggest?',choices:['He is bored','He is nervous','He is constructing a memory','He is looking for an exit'],answer:'He is constructing a memory'},
    {q:'What does Kurosawa ask at the end?',choices:['Where the brother fell','Whether he pushed him','What the brother said before falling','When it happened'],answer:'What the brother said before falling'},
  ]
},

{
  id:'jp_adventure_01',
  lang:'japanese',
  title:'The Map',
  titleNative:'地図',
  genres:['adventure','fantasy'],
  difficulty:'N4',
  blurb:'The map changes every morning. Not dramatically. Just a new path here, a name that wasn\'t there yesterday. Maria was the first cartographer to follow it.',
  lines:[
    {text:'地図は朝起きるたびに変わっていた。',reading:'ちずはあさおきるたびにかわっていた。',translation:'The map changed every time I woke up in the morning.'},
    {text:'新しい道が増え、昨日あった道が消えた。',reading:'あたらしいみちがふえ、きのうあったみちがきえた。',translation:'New paths appeared, paths from yesterday vanished.'},
    {text:'地図師の組合は「不可能だ、偽物だ」と言った。',reading:'ちずしのくみあいは「ふかのうだ、にせものだ」といった。',translation:'The cartographers\' guild said "impossible, it\'s a fake."'},
    {text:'マリアは黙って荷物をまとめた。',reading:'マリアはだまってにもつをまとめた。',translation:'Maria quietly packed her bags.'},
    {text:'地図の示す道を三日間歩いた。靴が壊れた。水が尽きた。',reading:'ちずのしめすみちをみっかかんあるいた。くつがこわれた。みずがつきた。',translation:'She walked the path the map showed for three days. Her shoes broke. Her water ran out.'},
    {text:'四日目の朝、地図に載っていない山が見えた。',reading:'よっかめのあさ、ちずにのっていないやまがみえた。',translation:'On the morning of the fourth day, a mountain not on any map came into view.'},
    {text:'地図の余白に、新しい文字が現れていた。「マリアの山」',reading:'ちずのよはくに、あたらしいもじがあらわれていた。「マリアのやま」',translation:'In the margin of the map, new text had appeared. "Maria\'s Mountain."'},
  ],
  questions:[
    {q:'What did the cartographers\' guild say about the map?',choices:['They wanted to buy it','They said follow it','They said it was impossible and fake','They said it was dangerous'],answer:'They said it was impossible and fake'},
    {q:'What happened to Maria on the journey?',choices:['She got lost','Her shoes broke and her water ran out','She turned back','She found a village'],answer:'Her shoes broke and her water ran out'},
    {q:'What appeared in the map\'s margin?',choices:['A warning','The name "Maria\'s Mountain"','A new path','Her name and a date'],answer:'The name "Maria\'s Mountain"'},
  ]
},

{
  id:'jp_fantasy_01',
  lang:'japanese',
  title:'Until Dawn',
  titleNative:'夜明けまで',
  genres:['fantasy','action','adventure'],
  difficulty:'N3',
  blurb:'The general gave him one order: hold the gate until dawn. Then the general left. There was no one else.',
  lines:[
    {text:'「夜明けまで持ちこたえろ」将軍はそれだけ言って、馬で去った。',reading:'「よあけまでもちこたえろ」しょうぐんはそれだけいって、うまでさった。',translation:'"Hold out until dawn." The general said only that, and left on horseback.'},
    {text:'門の前に残ったのは私だけだった。',reading:'もんのまえにのこったのはわたしだけだった。',translation:'Left in front of the gate was only me.'},
    {text:'向こう側から音が聞こえた。足音ではなかった。もっと重いものの音だった。',reading:'むこうがわからおとがきこえた。あしおとではなかった。もっとおもいもののおとだった。',translation:'Sound came from the other side. Not footsteps. Something heavier.'},
    {text:'剣を握った。手が震えていた。',reading:'けんをにぎった。てがふるえていた。',translation:'I gripped my sword. My hands were shaking.'},
    {text:'震えているのは怖いからではなく、寒いからだと思うことにした。',reading:'ふるえているのはこわいからではなく、さむいからだとおもうことにした。',translation:'I decided to think it was the cold, not fear, that made me shake.'},
    {text:'夜が長かった。長すぎた。',reading:'よるがながかった。ながすぎた。',translation:'The night was long. Too long.'},
    {text:'夜明けが来たとき、私はまだ立っていた。',reading:'よあけがきたとき、わたしはまだたっていた。',translation:'When dawn came, I was still standing.'},
  ],
  questions:[
    {q:'What was his only order?',choices:['Retreat at midnight','Hold the gate until dawn','Signal for backup','Fight until he couldn\'t'],answer:'Hold the gate until dawn'},
    {q:'What did he decide about his shaking hands?',choices:['That he was afraid','That he was getting stronger','That it was the cold, not fear','That he needed to stop'],answer:'That it was the cold, not fear'},
    {q:'What happened when dawn came?',choices:['He had fallen','Help arrived','He was still standing','The gate had broken'],answer:'He was still standing'},
  ]
},

{
  id:'jp_comedy_01',
  lang:'japanese',
  title:'The God Who Got Lost',
  titleNative:'迷子の神様',
  genres:['comedy','fantasy','slice of life'],
  difficulty:'N4',
  blurb:'He descended to earth to fix a small miracle — a sparrow that was supposed to land on the wrong branch. He got off at the wrong station. Then the wrong platform. The sparrow found the right branch on its own.',
  lines:[
    {text:'神様が地上に降りてきたのは、小さなミスを直すためだった。',reading:'かみさまがちじょうにおりてきたのは、ちいさなミスをなおすためだった。',translation:'The god had come down to earth to fix a small mistake.'},
    {text:'しかし渋谷で乗り換えを間違え、気づいたら埼玉にいた。',reading:'しかしぶやでのりかえをまちがえ、きづいたらさいたまにいた。',translation:'But he took the wrong transfer at Shibuya and found himself in Saitama.'},
    {text:'全知全能のはずだったが、路線図だけは例外だった。',reading:'ぜんちぜんのうのはずだったが、ろせんずだけはれいがいだった。',translation:'He was supposed to be all-knowing, but train maps were apparently an exception.'},
    {text:'コンビニで女子高生に声をかけた。「渋谷にはどう行けば」',reading:'コンビニでじょしこうせいにこえをかけた。「しぶやにはどうすれば」',translation:'He approached a high school girl in a convenience store. "How do I get to Shibuya."'},
    {text:'彼女は上から下まで見た。白い服、長い髪、光る目。「コスプレ？」',reading:'かのじょはうえからしたまでみた。しろいふく、ながいかみ、ひかるめ。「コスプレ？」',translation:'She looked him up and down. White robes, long hair, luminous eyes. "Costume party?"'},
    {text:'「違います」「じゃあなんで光ってるの」',reading:'「ちがいます」「じゃあなんでひかってるの」',translation:'"No." "Then why are you glowing?"'},
    {text:'神様は三千年生きて初めて、答えに困った。',reading:'かみさまはさんぜんねんいきてはじめて、こたえにこまった。',translation:'For the first time in three thousand years, the god had no answer.'},
  ],
  questions:[
    {q:'Why did the god come to earth?',choices:['To find a hero','To test humanity','To fix a small mistake','To take a vacation'],answer:'To fix a small mistake'},
    {q:'Where did he end up instead of Shibuya?',choices:['Shinjuku','Osaka','Saitama','Yokohama'],answer:'Saitama'},
    {q:'What was he unable to understand?',choices:['Human speech','Modern technology','Train maps','Japanese customs'],answer:'Train maps'},
  ]
},

{
  id:'jp_school_01',
  lang:'japanese',
  title:'After the Bell',
  titleNative:'放課後',
  genres:['school','slice of life','romance'],
  difficulty:'N5',
  blurb:'He forgot something in the classroom every single day for two months. He never forgot anything.',
  lines:[
    {text:'放課後の教室に、佐藤はいつもいた。',reading:'ほうかごのきょうしつに、さとうはいつもいた。',translation:'Sato was always in the classroom after school.'},
    {text:'窓際の席で本を読んでいた。いつも同じ席だった。',reading:'まどぎわのせきでほんをよんでいた。いつもおなじせきだった。',translation:'She read a book at the seat by the window. Always the same seat.'},
    {text:'二ヶ月間、毎日何かを忘れた。消しゴム、プリント、体育着。',reading:'ふたかげつかん、まいにちなにかをわすれた。けしゴム、プリント、たいいくぎ。',translation:'For two months, every day he forgot something. An eraser, a handout, gym clothes.'},
    {text:'今日は何も忘れていなかった。それでも戻ってきた。',reading:'きょうはなにもわすれていなかった。それでももどってきた。',translation:'Today he hadn\'t forgotten anything. He came back anyway.'},
    {text:'「また忘れ物？」本から目を上げずに彼女が言った。',reading:'「またわすれもの？」ほんからめをあげずにかのじょがいった。',translation:'"Forgot something again?" she said without looking up from her book.'},
    {text:'「そう」と答えて、自分の席に座った。',reading:'「そう」とこたえて、じぶんのせきにすわった。',translation:'"Yeah," he answered, and sat down at his own seat.'},
    {text:'しばらくして、「本当は何も忘れてないでしょ」と彼女が小さく笑った。',reading:'しばらくして、「ほんとうはなにもわすれてないでしょ」とかのじょがちいさくわらった。',translation:'After a while, "you didn\'t actually forget anything, did you," she said with a small smile.'},
  ],
  questions:[
    {q:'What does Sato do every day after school?',choices:['Practices sports','Reads a book by the window','Helps clean the classroom','Waits for friends'],answer:'Reads a book by the window'},
    {q:'How long had he been "forgetting" things?',choices:['One week','One month','Two months','Three months'],answer:'Two months'},
    {q:'What does she figure out?',choices:['That he likes her book','That he wants her seat','That he didn\'t actually forget anything','That he has been watching her'],answer:'That he didn\'t actually forget anything'},
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
  blurb:'Both of them missed the last train. The station closed at midnight. They had five hours and nothing in common except the bench they were sitting on.',
  lines:[
    {text:'11시 58분이었다. 우리 둘 다 기차를 놓쳤다.',reading:'yeolhansi siphalpunietta. uri dul da gichal nohchyeotda.',translation:'It was 11:58. We both missed the train.'},
    {text:'역무원이 셔터를 내리고 돌아갔다.',reading:'yeongmuoni syeoteoreul naerigo doragatta.',translation:'The station worker pulled down the shutter and left.'},
    {text:'우리만 남았다. 빈 역, 빈 벤치, 우리 둘.',reading:'urimman namatda. bin yeok, bin benchi, uri dul.',translation:'Only us remained. An empty station, an empty bench, the two of us.'},
    {text:'"다음 기차는 새벽 5시예요." 그녀가 먼저 말했다.',reading:'"daeum gichaneuon saebyeok dasiosiyeyo." geunyeoga meonjeo malhaetda.',translation:'"Next train is 5 AM." She spoke first.'},
    {text:'"알아요." 나도 알고 있었다.',reading:'"arayo." nado algo isseotta.',translation:'"I know." I already knew.'},
    {text:'처음에는 아무 말도 안 했다. 그런데 이상하게 편했다.',reading:'cheoeume aneun amu maldo an haetda. geureonde isanghage pyeonhaetda.',translation:'At first neither of us said anything. Strangely, it felt comfortable.'},
    {text:'새벽이 될 때까지 우리는 이야기를 멈추지 않았다.',reading:'saebyeogi doel ttaekkaji urineun iyagireul meomchuji anatda.',translation:'Until dawn, we didn\'t stop talking.'},
  ],
  questions:[
    {q:'What time did they miss the train?',choices:['11:30','11:58','Midnight','1 AM'],answer:'11:58'},
    {q:'When is the next train?',choices:['2 AM','3 AM','5 AM','6 AM'],answer:'5 AM'},
    {q:'How did the silence feel?',choices:['Awkward','Uncomfortable','Strangely comfortable','Boring'],answer:'Strangely comfortable'},
  ]
},

{
  id:'ko_romance_02',
  lang:'korean',
  title:'Voice Memo',
  titleNative:'음성 메모',
  genres:['romance','drama'],
  difficulty:'TOPIK 2',
  blurb:'Old phone. Three-year-old voice memo. Her own voice, crying. She listened to it four times before she could put the phone down.',
  lines:[
    {text:'서랍 안에서 오래된 폰이 나왔다.',reading:'seorarp aneseo oraedoen poni nawatda.',translation:'An old phone came out from inside the drawer.'},
    {text:'충전해서 켰더니 음성 메모가 하나 있었다.',reading:'chungjeonhaeseo kyeottdeoni eumsong memoga hana isseotda.',translation:'I charged it and turned it on. There was one voice memo.'},
    {text:'3년 전 날짜. 내 목소리. 울고 있었다.',reading:'samnyeon jeon nalja. nae mokssori. ulgo isseotda.',translation:'Three years ago. My voice. Crying.'},
    {text:'"미래의 나, 제발 행복해."',reading:'"miraeeui na, jebal haengbokhae."',translation:'"Future me, please be happy."'},
    {text:'네 번 들었다. 다섯 번은 못 들었다.',reading:'ne beon deureotda. daseot beonemun mot deureotda.',translation:'I listened four times. I couldn\'t do a fifth.'},
    {text:'창밖을 보다가 한참 그러고 있었다.',reading:'changbakkeul bodaga hancham geurogo isseotda.',translation:'I stared out the window for a long time.'},
    {text:'행복한지는 모르겠다. 그래도 살고 있다.',reading:'haengbokanji neun moreugettda. geraedo salgo itda.',translation:'I don\'t know if I\'m happy. But I\'m living.'},
  ],
  questions:[
    {q:'Where did she find the old phone?',choices:['Under the bed','In a box','In a drawer','In a bag'],answer:'In a drawer'},
    {q:'How many times did she listen to the memo?',choices:['Once','Twice','Four times','Five times'],answer:'Four times'},
    {q:'What does she say at the end?',choices:['She is happy','She is sad','She doesn\'t know if she\'s happy but she\'s living','She wants to change the past'],answer:'She doesn\'t know if she\'s happy but she\'s living'},
  ]
},

{
  id:'ko_thriller_01',
  lang:'korean',
  title:'The Caller',
  titleNative:'전화',
  genres:['thriller','mystery'],
  difficulty:'TOPIK 3-4',
  blurb:'Unknown number. She almost didn\'t answer. She wishes she hadn\'t.',
  lines:[
    {text:'모르는 번호였다. 끊으려다가 받았다.',reading:'moreuneun beonhoyeotta. kkeuneuryeodaga batda.',translation:'Unknown number. I was about to hang up and then answered.'},
    {text:'"여보세요?" 아무 소리도 없었다.',reading:'"yeoboseyo?" amu soriddo opseotda.',translation:'"Hello?" Nothing.'},
    {text:'끊으려는 순간 목소리가 들렸다.',reading:'kkeuneuryeoneun sungan moksoriga deullyeotta.',translation:'The moment I was about to hang up, a voice came.'},
    {text:'"김지수씨, 지금 혼자시죠?"',reading:'"gimjisuski, jigeum honjasijyo?"',translation:'"You\'re alone right now, aren\'t you, Kim Jisoo?"'},
    {text:'몸이 굳었다.',reading:'momi guteotda.',translation:'My body went rigid.'},
    {text:'"오늘 저녁에 된장찌개 드셨죠. 혼자서."',reading:'"oneul jeonyeoge doenjangjjigae deussyeotjyo. honjaseo."',translation:'"You had doenjang jjigae for dinner tonight. Alone."'},
    {text:'"창문 보지 마세요. 지금."',reading:'"changmun boji maseyo. jigeum."',translation:'"Don\'t look at the window. Right now."'},
  ],
  questions:[
    {q:'Why did she answer?',choices:['She recognized the number','She was bored','She was about to hang up and then answered','She thought it was a friend'],answer:'She was about to hang up and then answered'},
    {q:'What did the caller know about her dinner?',choices:['That she ate out','That she skipped dinner','That she had doenjang jjigae alone','That she cooked something'],answer:'That she had doenjang jjigae alone'},
    {q:'What did the caller tell her not to do?',choices:['Answer the door','Turn on the light','Look at the window','Call the police'],answer:'Look at the window'},
  ]
},

{
  id:'ko_thriller_02',
  lang:'korean',
  title:'The Neighbor',
  titleNative:'이웃',
  genres:['thriller','mystery'],
  difficulty:'TOPIK 2',
  blurb:'Every night at 3 AM. Footsteps. Same hallway, same rhythm, same time. She\'d stopped checking who it was months ago. Tonight it stopped outside her door.',
  lines:[
    {text:'이사 온 날부터 시작됐다.',reading:'isa on nalbuteo sijakttwaetda.',translation:'It started from the day I moved in.'},
    {text:'매일 밤 3시, 복도에서 발소리가 들렸다.',reading:'maeil bam sesī, bokdoeseo balsori ga deullyeotda.',translation:'Every night at 3 AM, I heard footsteps in the hallway.'},
    {text:'같은 속도. 같은 박자. 처음엔 무서웠다. 이제는 그냥 그러려니 했다.',reading:'gateun sokdo. gateun bakja. cheoeumeun museowotda. ijeeneun geunyang geureolyeoni haetda.',translation:'Same speed. Same rhythm. At first it scared me. Now I just accepted it.'},
    {text:'오늘 밤, 소리가 내 문 앞에서 멈췄다.',reading:'oneul bam, sorIGA nae mun apeseo meomchwotda.',translation:'Tonight, the sound stopped outside my door.'},
    {text:'숨을 참았다. 귀를 기울였다.',reading:'sumeul chamatta. gwireul giuryeotda.',translation:'I held my breath. I strained to listen.'},
    {text:'1분. 2분. 아무것도 없었다.',reading:'ilbun. ibun. amugetto opseotda.',translation:'One minute. Two minutes. Nothing.'},
    {text:'그리고 문 밑으로 쪽지 한 장이 들어왔다.',reading:'geurigo mun mitero jjokji han jangi deureowatda.',translation:'Then a piece of paper slid under the door.'},
  ],
  questions:[
    {q:'When do the footsteps always come?',choices:['Midnight','1 AM','3 AM','4 AM'],answer:'3 AM'},
    {q:'How did her feeling about the footsteps change over time?',choices:['She got more scared','She called the police','She just accepted it','She moved rooms'],answer:'She just accepted it'},
    {q:'What happened at the end?',choices:['Someone knocked','A note slid under the door','She opened the door','The footsteps went away'],answer:'A note slid under the door'},
  ]
},

{
  id:'ko_fantasy_01',
  lang:'korean',
  title:'The Last Memory Keeper',
  titleNative:'마지막 기억 보관자',
  genres:['fantasy','drama'],
  difficulty:'TOPIK 3-4',
  blurb:'Everyone sells their painful memories. Why would you keep them? She knows why. She is the only one left who does.',
  lines:[
    {text:'이 세상에서는 기억을 팔 수 있다.',reading:'i sesangeseo neun gieogeul pal su itda.',translation:'In this world you can sell memories.'},
    {text:'고통스러운 기억은 싸다. 아무도 안 사려고 해서.',reading:'gotongseureoun gieoguen ssada. amudo an saryeogo haeseo.',translation:'Painful ones are cheap. Nobody wants to buy them.'},
    {text:'나는 하나도 안 팔았다. 기쁜 것도, 아픈 것도.',reading:'naneun hanado an paratda. gippeun geotdo, apeun geotdo.',translation:'I haven\'t sold a single one. Not the good ones, not the painful ones.'},
    {text:'"왜 그 나쁜 기억들을 갖고 있어?" 사람들이 물었다.',reading:'"wae geu nappeun gieokdeureul gatgo isseo?" saramdeuri mureotda.',translation:'"Why do you keep those bad memories?" people asked.'},
    {text:'대답하지 않았다. 설명해도 이해 못 할 것 같아서.',reading:'daedaphaji anatda. seolmyeonghaedo ihae mot hal geot gatahseo.',translation:'I didn\'t answer. I didn\'t think they\'d understand even if I explained.'},
    {text:'행복한 순간들이 반짝이는 건, 그 뒤에 어두운 것들이 있어서다.',reading:'haengbokan sungandeuI banjjakineuon geon, geu dwie eodouneun geotdeuri isseosdaa.',translation:'The reason happy moments shine is because there\'s darkness behind them.'},
    {text:'그들이 팔아버린 어둠이 뭔지, 그들은 이미 기억하지 못한다.',reading:'geudeuri parabeolin eodumi mwonji, geudeureun imi gieokaji motanda.',translation:'What darkness they sold away, they no longer remember.'},
  ],
  questions:[
    {q:'What kind of memories are cheap?',choices:['Happy ones','Childhood ones','Painful ones','Old ones'],answer:'Painful ones'},
    {q:'Why didn\'t she explain herself to others?',choices:['She was too shy','She couldn\'t speak','She didn\'t think they\'d understand','It was a secret'],answer:'She didn\'t think they\'d understand'},
    {q:'What does she believe about painful memories?',choices:['They should be deleted','They make happy moments shine','They are worthless','They are dangerous'],answer:'They make happy moments shine'},
  ]
},

{
  id:'ko_action_01',
  lang:'korean',
  title:'The Last Round',
  titleNative:'마지막 라운드',
  genres:['action','drama'],
  difficulty:'TOPIK 3-4',
  blurb:'The doctor said stop. The coach said stop. Her left eye was swollen shut. She got up anyway. Some people just have to finish what they started.',
  lines:[
    {text:'의사가 기권을 권했다. 코치도 같은 말을 했다.',reading:'uisaga gikwoneul gwonhaetda. kochiido gateun maleul haetda.',translation:'The doctor recommended withdrawal. The coach said the same.'},
    {text:'왼쪽 눈이 안 보였다. 입술에서 피가 났다.',reading:'oenjok nuni an boyeotda. ipsureseo piga natda.',translation:'My left eye couldn\'t see. Blood came from my lip.'},
    {text:'그래도 일어났다.',reading:'geraedo ireottda.',translation:'I got up anyway.'},
    {text:'관중이 조용해졌다.',reading:'gwanjungi joyonghaejeotda.',translation:'The crowd went quiet.'},
    {text:'상대가 다가왔다. 마지막 힘을 모았다.',reading:'sangdaega dagawatda. majimak himeul moatda.',translation:'The opponent came forward. I gathered the last of my strength.'},
    {text:'쓰러진 건 나였다. 하지만 일어난 것도 나였다.',reading:'sseurojin geon nayeotda. hajiman ireonan geotdo nayeotda.',translation:'The one who fell was me. But the one who got up was also me.'},
    {text:'심판이 열을 셀 때, 나는 이미 서 있었다.',reading:'simpani yeoreul sel ttae, naneun imi seo isseotda.',translation:'By the time the referee counted ten, I was already standing.'},
  ],
  questions:[
    {q:'Who told her to stop?',choices:['Only the crowd','Only the coach','The doctor and the coach','Her opponent'],answer:'The doctor and the coach'},
    {q:'What was her physical state?',choices:['Fine','Tired but okay','Left eye couldn\'t see, bleeding lip','Both eyes were swollen'],answer:'Left eye couldn\'t see, bleeding lip'},
    {q:'What happened by the count of ten?',choices:['She was still down','She had won','She was already standing','She had given up'],answer:'She was already standing'},
  ]
},

{
  id:'ko_fantasy_02',
  lang:'korean',
  title:'The Debt',
  titleNative:'빚',
  genres:['fantasy','action','drama'],
  difficulty:'TOPIK 3-4',
  blurb:'He can see the future. Everyone else\'s. Not his own. A woman appears and says he owes her a debt — from before he was born.',
  lines:[
    {text:'나는 남의 미래는 볼 수 있다. 내 미래는 볼 수 없다.',reading:'naneun namui miraeneun bol su itda. nae miraeneun bol su eopda.',translation:'I can see other people\'s futures. I can\'t see my own.'},
    {text:'어느 날 아침, 낯선 여자가 사무실 문을 열었다.',reading:'eoneu nal achim, natson yeojaga samusil muneul yeoreotda.',translation:'One morning, a strange woman opened the door to my office.'},
    {text:'"당신한테 빚이 있어요."',reading:'"dangsinhan te bijhi iseoyo."',translation:'"You owe me a debt."'},
    {text:'"처음 뵙겠습니다만." "알아요. 처음 만나죠."',reading:'"cheoeum boepgesseumnidaman." "arayo. cheoeum mannajyo."',translation:'"This is the first time we\'ve met." "I know. First time."'},
    {text:'"당신이 태어나기 전에, 내가 당신을 살렸어요."',reading:'"dangsini taeeonagi jeone, naega dangsineul sallyeotsseoyo."',translation:'"Before you were born, I saved you."'},
    {text:'거짓말을 하면 눈에 보이는 편인데, 그녀의 눈에는 아무것도 없었다.',reading:'geojitmareul hamyeon nune boineun pyeoninde, geunyeoui nune neun amugetto opseotda.',translation:'Lies usually show in people\'s eyes. Hers showed nothing.'},
    {text:'"무엇을 원하십니까." 처음부터 이건 질문이 아니었다.',reading:'"mueoseul wonhasimnikka." cheoumbuteo igeon jilmuni aniyeotda.',translation:'"What do you want." From the start it hadn\'t been a question.'},
  ],
  questions:[
    {q:'What is his limitation?',choices:['He can\'t see the future at all','He can see the future but not his own','He can only see bad futures','He loses the ability sometimes'],answer:'He can see the future but not his own'},
    {q:'How did he know she wasn\'t lying?',choices:['He used his power','He could tell from her voice','Lies show in people\'s eyes and hers showed nothing','She had proof'],answer:'Lies show in people\'s eyes and hers showed nothing'},
    {q:'What does the last line suggest about his question?',choices:['He already knew what she wanted','He was scared to ask','It was actually a threat','He didn\'t want an answer'],answer:'He already knew what she wanted'},
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
  blurb:'Same café, same table, same coffee. He had never spoken to her. She had never spoken to him. Then one morning she wasn\'t there.',
  lines:[
    {text:'Vengo qui ogni mattina alle otto.',reading:'',translation:'I come here every morning at eight.'},
    {text:'Lei è già al suo posto. Finestra, terzo sgabello a sinistra, cappuccino.',reading:'',translation:'She\'s already at her spot. Window, third stool on the left, cappuccino.'},
    {text:'Non ci siamo mai parlati. Sorriso, a volte. Solo quello.',reading:'',translation:'We\'ve never spoken. A smile sometimes. Only that.'},
    {text:'Stamattina il terzo sgabello era vuoto.',reading:'',translation:'This morning the third stool was empty.'},
    {text:'Ho aspettato. Il caffè si è raffreddato.',reading:'',translation:'I waited. The coffee went cold.'},
    {text:'Il barista mi ha guardato. "La signorina non viene di giovedì."',reading:'',translation:'The barman looked at me. "The young lady doesn\'t come on Thursdays."'},
    {text:'Non sapevo che era giovedì.',reading:'',translation:'I hadn\'t realized it was Thursday.'},
  ],
  questions:[
    {q:'What time does he come to the café?',choices:['Seven','Eight','Nine','Whenever'],answer:'Eight'},
    {q:'What does she always order?',choices:['Espresso','Tea','Cappuccino','Water'],answer:'Cappuccino'},
    {q:'Why wasn\'t she there?',choices:['She moved','She was sick','She doesn\'t come on Thursdays','She changed cafés'],answer:'She doesn\'t come on Thursdays'},
  ]
},

{
  id:'it_romance_02',
  lang:'italian',
  title:'The Wrong Order',
  titleNative:'L\'ordine sbagliato',
  genres:['romance','comedy','slice of life'],
  difficulty:'A2',
  blurb:'He ordered a cappuccino. She brought an espresso. He drank it without saying a word. She came back ten minutes later.',
  lines:[
    {text:'Ho ordinato un cappuccino.',reading:'',translation:'I ordered a cappuccino.'},
    {text:'Lei ha portato un espresso, ha sorriso e se n\'è andata.',reading:'',translation:'She brought an espresso, smiled, and left.'},
    {text:'L\'ho guardato. L\'ho bevuto.',reading:'',translation:'I looked at it. I drank it.'},
    {text:'Dieci minuti dopo è tornata con un altro caffè.',reading:'',translation:'Ten minutes later she came back with another coffee.'},
    {text:'"Sa che era sbagliato."',reading:'',translation:'"You know it was wrong."'},
    {text:'"Sì. Era buono lo stesso."',reading:'',translation:'"Yes. It was good anyway."'},
    {text:'Ha lasciato il cappuccino sul tavolo. Questa volta non ha sorriso. Ha riso.',reading:'',translation:'She left the cappuccino on the table. This time she didn\'t smile. She laughed.'},
  ],
  questions:[
    {q:'What did she bring him?',choices:['Tea','A cappuccino','An espresso','Nothing'],answer:'An espresso'},
    {q:'What did he do?',choices:['Complained','Left','Drank it without saying anything','Sent it back'],answer:'Drank it without saying anything'},
    {q:'What was different about her expression at the end?',choices:['She smiled like before','She laughed instead of smiling','She was serious','She left without expression'],answer:'She laughed instead of smiling'},
  ]
},

{
  id:'it_mystery_01',
  lang:'italian',
  title:'The Witness',
  titleNative:'Il testimone',
  genres:['mystery','thriller'],
  difficulty:'B1',
  blurb:'He saw everything. He answered every question truthfully. Except one.',
  lines:[
    {text:'Ho visto tutto dalla finestra del terzo piano.',reading:'',translation:'I saw everything from the third floor window.'},
    {text:'L\'ispettore è arrivato alle undici. Aveva un taccuino piccolo e una penna rossa.',reading:'',translation:'The inspector arrived at eleven. He had a small notebook and a red pen.'},
    {text:'Ho risposto a tutte le domande. Con calma. Senza esitare.',reading:'',translation:'I answered every question. Calmly. Without hesitating.'},
    {text:'"Ha riconosciuto l\'uomo?"',reading:'',translation:'"Did you recognize the man?"'},
    {text:'"No," ho detto. "Era troppo buio."',reading:'',translation:'"No," I said. "It was too dark."'},
    {text:'Era una bugia. L\'avevo riconosciuto subito.',reading:'',translation:'It was a lie. I had recognized him immediately.'},
    {text:'Era mio fratello.',reading:'',translation:'It was my brother.'},
  ],
  questions:[
    {q:'How did he answer the inspector\'s questions?',choices:['Nervously','With hesitation','Calmly, without hesitating','He refused to answer'],answer:'Calmly, without hesitating'},
    {q:'What did he lie about?',choices:['Where he was','The time','Whether he recognized the man','What the man was wearing'],answer:'Whether he recognized the man'},
    {q:'Why did he lie?',choices:['He was scared of the inspector','The man was his brother','He didn\'t trust the police','He didn\'t see clearly'],answer:'The man was his brother'},
  ]
},

{
  id:'it_mystery_02',
  lang:'italian',
  title:'The Letter',
  titleNative:'La lettera',
  genres:['mystery','thriller'],
  difficulty:'B1',
  blurb:'The envelope was addressed to her. In her own handwriting. The date was three years in the future. Then she heard knocking.',
  lines:[
    {text:'La busta era nel cassetto, sotto le bollette.',reading:'',translation:'The envelope was in the drawer, under the bills.'},
    {text:'Il mio indirizzo. La mia scrittura. Nessun mittente.',reading:'',translation:'My address. My handwriting. No sender.'},
    {text:'La data era quella di tre anni nel futuro.',reading:'',translation:'The date was three years in the future.'},
    {text:'L\'ho riletta. Non cambiava.',reading:'',translation:'I reread it. It didn\'t change.'},
    {text:'Dentro c\'era scritto solo: "Non aprire la porta rossa."',reading:'',translation:'Inside it said only: "Don\'t open the red door."'},
    {text:'Non ho una porta rossa.',reading:'',translation:'I don\'t have a red door.'},
    {text:'Poi qualcuno ha bussato.',reading:'',translation:'Then someone knocked.'},
  ],
  questions:[
    {q:'Where was the envelope?',choices:['On the table','Under the door','In a drawer under bills','In her bag'],answer:'In a drawer under bills'},
    {q:'What was strange about the date?',choices:['It was very old','It was illegible','It was three years in the future','There was no date'],answer:'It was three years in the future'},
    {q:'What did the letter say?',choices:['"Run"','"Don\'t open the red door"','"Trust no one"','"Call me"'],answer:'"Don\'t open the red door"'},
  ]
},

{
  id:'it_fantasy_01',
  lang:'italian',
  title:'The City That Moves',
  titleNative:'La città che si muove',
  genres:['fantasy','adventure'],
  difficulty:'B2',
  blurb:'Every morning the streets are different. The locals know the rules. The tourists don\'t.',
  lines:[
    {text:'Le strade cambiano ogni notte. I residenti lo sanno da generazioni.',reading:'',translation:'The streets change every night. The residents have known this for generations.'},
    {text:'Regola uno: niente passeggiate dopo la mezzanotte.',reading:'',translation:'Rule one: no walks after midnight.'},
    {text:'Regola due: se una strada è nuova, non seguirla.',reading:'',translation:'Rule two: if a street is new, don\'t follow it.'},
    {text:'Regola tre: il mercato è sempre al centro. Sempre. Se non lo trovi, sei già perso.',reading:'',translation:'Rule three: the market is always in the center. Always. If you can\'t find it, you\'re already lost.'},
    {text:'I turisti non conoscono le regole.',reading:'',translation:'Tourists don\'t know the rules.'},
    {text:'Arrivano con le mappe. Le mappe non servono qui.',reading:'',translation:'They arrive with maps. Maps are useless here.'},
    {text:'Alcuni vengono trovati il mattino dopo. Altri no.',reading:'',translation:'Some are found the next morning. Others aren\'t.'},
  ],
  questions:[
    {q:'How long have residents known about the streets?',choices:['For a few years','Since childhood','For generations','Since last year'],answer:'For generations'},
    {q:'What is rule three?',choices:['Don\'t go out alone','The market is always at the center','Don\'t follow new streets','Come home before midnight'],answer:'The market is always at the center'},
    {q:'What happens to tourists?',choices:['They are warned at the entrance','Some are found the next morning, others aren\'t','They always find their way','The residents help them'],answer:'Some are found the next morning, others aren\'t'},
  ]
},

{
  id:'it_action_01',
  lang:'italian',
  title:'Five Seconds',
  titleNative:'Cinque secondi',
  genres:['action','thriller','adventure'],
  difficulty:'B1',
  blurb:'Two wires. Five seconds. A choice he had trained for his whole career but never wanted to make.',
  lines:[
    {text:'Il treno andava a centoventi all\'ora. Dentro, quattrocento persone.',reading:'',translation:'The train was doing a hundred and twenty. Inside, four hundred people.'},
    {text:'Cinque secondi sul display.',reading:'',translation:'Five seconds on the display.'},
    {text:'Due fili. Rosso e blu.',reading:'',translation:'Two wires. Red and blue.'},
    {text:'Vent\'anni di addestramento per questo momento.',reading:'',translation:'Twenty years of training for this moment.'},
    {text:'Le mani non tremavano. Quello lo sorprese.',reading:'',translation:'His hands weren\'t shaking. That surprised him.'},
    {text:'Ha chiuso gli occhi un secondo. Ha tagliato.',reading:'',translation:'He closed his eyes for one second. He cut.'},
    {text:'Silenzio. Poi il treno ha frenato.',reading:'',translation:'Silence. Then the train began to brake.'},
  ],
  questions:[
    {q:'How many people were on the train?',choices:['A hundred','Two hundred','Four hundred','A thousand'],answer:'Four hundred'},
    {q:'What surprised him?',choices:['The number of seconds left','That his hands weren\'t shaking','The color of the wires','That no one helped'],answer:'That his hands weren\'t shaking'},
    {q:'What happened after he cut the wire?',choices:['An explosion','Nothing happened','Silence, then the train braked','The display reset'],answer:'Silence, then the train braked'},
  ]
},

{
  id:'it_drama_01',
  lang:'italian',
  title:'The Last Lesson',
  titleNative:'L\'ultima lezione',
  genres:['drama','slice of life'],
  difficulty:'B1',
  blurb:'Forty years of teaching. One last thing left to say that he never had the courage to say before.',
  lines:[
    {text:'Ho insegnato in questa aula per quarant\'anni.',reading:'',translation:'I have taught in this classroom for forty years.'},
    {text:'Ho parlato di tutto. Storia, guerra, filosofia, letteratura.',reading:'',translation:'I have talked about everything. History, war, philosophy, literature.'},
    {text:'Oggi è l\'ultima volta.',reading:'',translation:'Today is the last time.'},
    {text:'Gli studenti aspettavano qualcosa di memorabile.',reading:'',translation:'The students were expecting something memorable.'},
    {text:'Ho detto: "Non so ancora tutto."',reading:'',translation:'I said: "I still don\'t know everything."'},
    {text:'Qualcuno ha riso. Gli altri erano in silenzio.',reading:'',translation:'Someone laughed. The others were silent.'},
    {text:'"Questa è la cosa più importante che vi ho insegnato. Tenetela."',reading:'',translation:'"That is the most important thing I have taught you. Hold onto it."'},
  ],
  questions:[
    {q:'How long did he teach?',choices:['Twenty years','Thirty years','Forty years','Fifty years'],answer:'Forty years'},
    {q:'What did he say in his final class?',choices:['"Study hard"','"Follow your passion"','"I still don\'t know everything"','"History repeats itself"'],answer:'"I still don\'t know everything"'},
    {q:'How did the students react?',choices:['Everyone was moved','Everyone laughed','Someone laughed, the others were silent','Everyone applauded'],answer:'Someone laughed, the others were silent'},
  ]
},

{
  id:'it_thriller_01',
  lang:'italian',
  title:'The Password',
  titleNative:'La password',
  genres:['thriller','mystery','action'],
  difficulty:'B2',
  blurb:'She cracked every layer of the server in twenty-two minutes. One folder remained locked. She recognized the password hint.',
  lines:[
    {text:'Ventidue minuti. Non era un record, ma era abbastanza.',reading:'',translation:'Twenty-two minutes. Not a record, but enough.'},
    {text:'Ogni livello di protezione era caduto. Quasi ogni livello.',reading:'',translation:'Every layer of protection had fallen. Almost every layer.'},
    {text:'Una cartella. Bloccata.',reading:'',translation:'One folder. Locked.'},
    {text:'Il suggerimento: "Il nome che non ho mai detto ad alta voce."',reading:'',translation:'The hint: "The name I have never said aloud."'},
    {text:'Le mani si sono fermate sulla tastiera.',reading:'',translation:'Her hands stopped on the keyboard.'},
    {text:'Quella frase. L\'aveva sentita una volta sola. Da mio padre, la notte prima che sparisse.',reading:'',translation:'That phrase. She had heard it only once. From her father, the night before he disappeared.'},
    {text:'Ha digitato il suo nome. La cartella si è aperta.',reading:'',translation:'She typed her own name. The folder opened.'},
  ],
  questions:[
    {q:'How long did it take to get through the server?',choices:['Five minutes','Twenty-two minutes','An hour','Three days'],answer:'Twenty-two minutes'},
    {q:'Where had she heard the password hint before?',choices:['From a teacher','From her father the night before he disappeared','In an old book','She had written it herself'],answer:'From her father the night before he disappeared'},
    {q:'What was the password?',choices:['Her father\'s name','Her mother\'s name','Her own name','It isn\'t revealed'],answer:'Her own name'},
  ]
}

];

// Genre lists per language
const STORY_GENRES_BY_LANG = {
  japanese: ['isekai','fantasy','action','adventure','romance','slice of life','school','mystery','horror','comedy'],
  korean:   ['romance','slice of life','thriller','mystery','fantasy','action','drama'],
  italian:  ['romance','slice of life','mystery','adventure','action','thriller','drama','comedy','fantasy'],
};
const STORY_GENRES = ['isekai','fantasy','action','adventure','romance','slice of life','school','mystery','horror','comedy','thriller','drama'];

// ── MULTI-PAGE STORIES ────────────────────────────────────────────────────────
// These use `pages` instead of `lines` — each page is an array of line objects.

STORIES.push(

{
  id:'jp_isekai_long_01',
  lang:'japanese',
  title:'The First Morning',
  titleNative:'最初の朝',
  genres:['isekai','fantasy','action'],
  difficulty:'N3',
  blurb:'He woke up in a world he didn\'t choose. No instructions. No map. Just a forest, a sword he didn\'t know how to use, and something watching from the dark.',
  pages:[
    // Page 1 — waking up
    [
      {text:'目が覚めたとき、天井がなかった。',reading:'めがさめたとき、てんじょうがなかった。',translation:'When I woke up, there was no ceiling.'},
      {text:'空だった。赤い空。雲一つない、どこまでも赤い空。',reading:'そらだった。あかいそら。くもひとつない、どこまでもあかいそら。',translation:'Just sky. Red sky. Not a cloud anywhere. Red as far as it went.'},
      {text:'背中が痛かった。地面に寝ていたからだ。土の上で。',reading:'せなかがいたかった。じめんにねていたからだ。つちのうえで。',translation:'My back hurt. Because I\'d been lying on the ground. On bare dirt.'},
      {text:'起き上がって、まず自分の手を見た。自分の手だった。よかった。',reading:'おきあがって、まずじぶんのてをみた。じぶんのてだった。よかった。',translation:'I sat up and first looked at my hands. They were my hands. Good.'},
      {text:'次に周りを見た。森だった。ただの森ではなかった。木が太すぎた。',reading:'つぎにまわりをみた。もりだった。ただのもりではなかった。きがふとすぎた。',translation:'Next I looked around. Forest. But not ordinary forest. The trees were too thick.'},
      {text:'一本の木が、知っている木の十倍はあった。',reading:'いっぽんのきが、しっているきのじゅうばいはあった。',translation:'Each tree was at least ten times the size of any tree I knew.'},
    ],
    // Page 2 — the sword
    [
      {text:'地面に剣が刺さっていた。',reading:'じめんにけんがささっていた。',translation:'A sword was thrust into the ground.'},
      {text:'普通の剣ではなかった。刃が青く光っていた。ぼんやりと、でも確かに。',reading:'ふつうのけんではなかった。はがあおくひかっていた。ぼんやりと、でもたしかに。',translation:'Not an ordinary sword. The blade glowed blue. Faintly, but definitely.'},
      {text:'抜いた。思ったより軽かった。',reading:'ぬいた。おもったよりかるかった。',translation:'I pulled it out. Lighter than I expected.'},
      {text:'剣の使い方は知らなかった。ゲームでしか使ったことがなかった。',reading:'けんのつかいかたはしらなかった。ゲームでしかつかったことがなかった。',translation:'I didn\'t know how to use a sword. I\'d only ever used one in games.'},
      {text:'でも、手に持つと少し落ち着いた。武器があるというだけで。',reading:'でも、てにもつとすこしおちついた。ぶきがあるというだけで。',translation:'But holding it calmed me down a little. Just having a weapon.'},
      {text:'どこかで、枝が折れる音がした。',reading:'どこかで、えだがおれるおとがした。',translation:'Somewhere, a branch snapped.'},
    ],
    // Page 3 — the encounter
    [
      {text:'動かなかった。息を止めた。',reading:'うごかなかった。いきをとめた。',translation:'I didn\'t move. Held my breath.'},
      {text:'木の間から何かが出てきた。大きかった。犬ではなかった。狼でもなかった。',reading:'きのあいだからなにかがでてきた。おおきかった。いぬではなかった。おおかみでもなかった。',translation:'Something came out from between the trees. Large. Not a dog. Not a wolf either.'},
      {text:'目が四つあった。黄色い目が、四つ。',reading:'めがよっつあった。きいろいめが、よっつ。',translation:'It had four eyes. Yellow eyes. Four of them.'},
      {text:'こちらを見ていた。ずっと見ていた。',reading:'こちらをみていた。ずっとみていた。',translation:'It was watching me. Just watching.'},
      {text:'剣を構えた。震えながら。',reading:'けんをかまえた。ふるえながら。',translation:'I raised the sword. Trembling.'},
      {text:'生き物は動かなかった。ただ、座った。',reading:'いきものはうごかなかった。ただ、すわった。',translation:'The creature didn\'t move. It just sat down.'},
      {text:'それから、人間の言葉で話しかけてきた。「迷子か」',reading:'それから、にんげんのことばではなしかけてきた。「まいごか」',translation:'Then it spoke to me in human words. "Are you lost?"'},
    ],
  ],
  questions:[
    {q:'What was the first thing he noticed when he woke up?',choices:['The trees','The sword','There was no ceiling, just red sky','The creature'],answer:'There was no ceiling, just red sky'},
    {q:'What was unusual about the sword?',choices:['It was too heavy','It was too long','The blade glowed blue','It spoke to him'],answer:'The blade glowed blue'},
    {q:'How many eyes did the creature have?',choices:['Two','Three','Four','Six'],answer:'Four'},
  ]
},

{
  id:'jp_mystery_long_01',
  lang:'japanese',
  title:'The Apartment in 3B',
  titleNative:'3号室',
  genres:['mystery','horror'],
  difficulty:'N3',
  blurb:'The woman in 3B has lived there for thirty years. Nobody has seen her leave. Last Tuesday the mail started piling up.',
  pages:[
    [
      {text:'三号室の住人と会ったことはなかった。',reading:'さんごうしつのじゅうにんとあったことはなかった。',translation:'I had never met the resident of 3B.'},
      {text:'でも、いることはわかった。夜中に音がしたから。毎晩同じ時間に。',reading:'でも、いることはわかった。よなかにおとがしたから。まいばんおなじじかんに。',translation:'But I knew someone was there. Because there were sounds at night. Same time every night.'},
      {text:'引っ越してきた日に管理人が言った。「三十年住んでる方がいますよ」',reading:'ひっこしてきたひにかんりにんがいった。「さんじゅうねんすんでるかたがいますよ」',translation:'On the day I moved in, the building manager said, "There\'s someone who has lived there for thirty years."'},
      {text:'「お名前は？」「さあ。一度も会ったことがないので」',reading:'「おなまえは？」「さあ。いちどもあったことがないので」',translation:'"What\'s their name?" "I\'m not sure. I\'ve never met them myself."'},
      {text:'それ以上聞かなかった。',reading:'それいじょうきかなかった。',translation:'I didn\'t ask anything more.'},
    ],
    [
      {text:'火曜日の夜、三号室の前を通ったとき、ドアの前に郵便物があった。',reading:'かようびのよる、さんごうしつのまえをとおったとき、ドアのまえにゆうびんぶつがあった。',translation:'Tuesday night, passing by 3B, there was mail in front of the door.'},
      {text:'水曜日も。木曜日も。増えていた。',reading:'すいようびも。もくようびも。ふえていた。',translation:'Wednesday too. Thursday too. It was piling up.'},
      {text:'金曜日の夜、ドアをノックした。返事はなかった。',reading:'きんようびのよる、ドアをノックした。へんじはなかった。',translation:'Friday night, I knocked on the door. No answer.'},
      {text:'もう一度。もう一度。静かだった。',reading:'もういちど。もういちど。しずかだった。',translation:'Again. Again. Silence.'},
      {text:'でも、ドアの下から光が見えた。電気はついていた。',reading:'でも、ドアのしたからひかりがみえた。でんきはついていた。',translation:'But light showed under the door. The lights were on.'},
    ],
    [
      {text:'管理人に連絡した。管理人は来なかった。',reading:'かんりにんにれんらくした。かんりにんはこなかった。',translation:'I contacted the manager. The manager didn\'t come.'},
      {text:'警察に電話しようとして、やめた。理由はわからない。',reading:'けいさつにでんわしようとして、やめた。りゆうはわからない。',translation:'I was about to call the police and stopped. I don\'t know why.'},
      {text:'代わりに、ドアの前に座って待った。',reading:'かわりに、ドアのまえにすわってまった。',translation:'Instead, I sat in front of the door and waited.'},
      {text:'午前二時、ドアが内側から開いた。',reading:'ごぜんにじ、ドアがうちがわからひらいた。',translation:'At 2 AM, the door opened from the inside.'},
      {text:'老いた女性が立っていた。細かった。目が大きかった。',reading:'おいたじょせいがたっていた。ほそかった。めがおおきかった。',translation:'An old woman was standing there. Thin. With large eyes.'},
      {text:'「ずっと待っていましたよ」と彼女は言った。「あなたが来るのを」',reading:'「ずっとまっていましたよ」とかのじょはいった。「あなたがくるのを」',translation:'"I have been waiting," she said. "For you to come."'},
    ],
  ],
  questions:[
    {q:'How long has the resident of 3B lived there?',choices:['Ten years','Twenty years','Thirty years','Fifty years'],answer:'Thirty years'},
    {q:'What made the narrator finally knock on the door?',choices:['A strange smell','Mail piling up for days','A loud noise','The manager asked them to'],answer:'Mail piling up for days'},
    {q:'What did the old woman say?',choices:['"Go away"','"Call the police"','"I have been waiting for you to come"','"Help me"'],answer:'"I have been waiting for you to come"'},
  ]
},

{
  id:'ko_thriller_long_01',
  lang:'korean',
  title:'The Interview',
  titleNative:'인터뷰',
  genres:['thriller','mystery','action'],
  difficulty:'TOPIK 3-4',
  blurb:'A journalist interviews a man convicted of a crime he says he didn\'t commit. By the end of the interview, she isn\'t sure she believes the court.',
  pages:[
    [
      {text:'면회실은 작았다. 테이블 하나, 의자 둘, 형광등 하나.',reading:'myeonhoesirum jakkatda. teibeul hana, uija dul, hyeongwangdeung hana.',translation:'The visitation room was small. One table, two chairs, one fluorescent light.'},
      {text:'남자는 먼저 와 있었다. 손을 테이블 위에 올려놓고.',reading:'namjaneun meonjeo wa isseotda. soneul teibeul wie ollyeonoko.',translation:'The man was already there. Hands placed on the table.'},
      {text:'"10분 드리겠습니다." 교도관이 문을 닫았다.',reading:'"sipbun deurigesssumnida." gyodogwani muneul datatta.',translation:'"You have ten minutes." The guard closed the door.'},
      {text:'"저는 안 했습니다." 그가 첫 마디로 말했다.',reading:'"jeoneun an haetssumnida." geuga cheot madiro malhaetda.',translation:'"I didn\'t do it." That was his first sentence.'},
      {text:'"알고 있어요." 나도 모르게 그 말이 나왔다.',reading:'"algo isseoyo." nado moreuge geu mari nawatda.',translation:'"I know." The words came out before I knew it.'},
    ],
    [
      {text:'"왜 그렇게 생각해요?" 그가 처음으로 눈을 마주쳤다.',reading:'"wae geureoke saenggakaeyo?" geuga cheoeumeuro nuneul majuchyeotda.',translation:'"Why do you think that?" For the first time, he met my eyes.'},
      {text:'"사건 기록을 읽었어요. 뭔가 안 맞는 게 있더라고요."',reading:'"sageon girokkeul ilgeosseoyo. mwonga an manneun ge itdeoragoyo."',translation:'"I read the case records. Something didn\'t fit."'},
      {text:'그는 오래 나를 봤다. 그리고 말했다.',reading:'geuneun orae nareul bwatda. geurigo malhaetda.',translation:'He looked at me for a long time. Then spoke.'},
      {text:'"그날 밤 저는 집에 있었어요. 혼자서. 증명할 수 없죠."',reading:'"geunal bam jeoneun jibe isseosseoyo. honjaseo. jeungmyeonghal su eopjyo."',translation:'"That night I was home. Alone. Can\'t prove it."'},
      {text:'"알리바이가 없다는 걸 알면서도 왜 아무 말도 안 했어요?"',reading:'"alibai ga eopttaneun geol almyeonseodo wae amu maldo an haesseoyo?"',translation:'"Why didn\'t you say anything, knowing you had no alibi?"'},
      {text:'"말해봤자 안 믿을 거라는 걸 알았으니까요."',reading:'"malhaebwatja an mideul georaneur geol araseunikkayo."',translation:'"Because I knew even if I spoke, no one would believe me."'},
    ],
    [
      {text:'10분이 끝났다. 교도관이 문을 열었다.',reading:'sibpuni kkeunnatda. gyodogwani muneul yeoreotda.',translation:'Ten minutes were up. The guard opened the door.'},
      {text:'남자가 일어섰다. 그리고 마지막으로 말했다.',reading:'namjaga ireosseotda. geurigo majimageuro malhaetda.',translation:'The man stood up. And said one last thing.'},
      {text:'"그날 밤 제가 집에 있었다는 걸 아는 사람이 딱 한 명 있어요."',reading:'"geunal bam jega jibe isseotdaneun geol aneun sarami ttak han myeong isseoyo."',translation:'"There is exactly one person who knows I was home that night."'},
      {text:'"누구요?"',reading:'"nuguyo?"',translation:'"Who?"'},
      {text:'"진짜 범인이요."',reading:'"jinjja beomini yo."',translation:'"The real killer."'},
      {text:'문이 닫혔다. 나는 한동안 자리에서 일어나지 못했다.',reading:'muni dachyeotda. naneun handonggan jariseo ireonaji motaetda.',translation:'The door closed. I couldn\'t get up from my chair for a long time.'},
    ],
  ],
  questions:[
    {q:'What was the man\'s first sentence?',choices:['"Help me"','"I didn\'t do it"','"You have to believe me"','"Thank you for coming"'],answer:'"I didn\'t do it"'},
    {q:'Why didn\'t he say anything during the trial?',choices:['He had a lawyer who told him not to','He was unconscious','He knew no one would believe him','He was protecting someone'],answer:'He knew no one would believe him'},
    {q:'Who does he say knows the truth?',choices:['His lawyer','A witness','The real killer','His neighbor'],answer:'The real killer'},
  ]
},

{
  id:'it_mystery_long_01',
  lang:'italian',
  title:'The House on Via Sette',
  titleNative:'La casa di via Sette',
  genres:['mystery','thriller','drama'],
  difficulty:'B2',
  blurb:'The house has been empty for eleven years. Then last spring the lights came on. Nobody went in. Nobody came out. The neighbors stopped talking about it after a while.',
  pages:[
    [
      {text:'La casa di via Sette era vuota da undici anni.',reading:'',translation:'The house on Via Sette had been empty for eleven years.'},
      {text:'Lo sapevano tutti. Era uno di quei fatti che in un quartiere piccolo diventano parte del paesaggio.',reading:'',translation:'Everyone knew. It was one of those facts that in a small neighbourhood become part of the scenery.'},
      {text:'La primavera scorsa, le luci si sono accese.',reading:'',translation:'Last spring, the lights came on.'},
      {text:'Non al piano di sopra. Al piano di sotto, nella stanza che dà sul giardino.',reading:'',translation:'Not upstairs. Downstairs, in the room facing the garden.'},
      {text:'Mia madre l\'ha visto per prima. "Devono averla venduta," ha detto.',reading:'',translation:'My mother saw it first. "Someone must have bought it," she said.'},
      {text:'Ma nessuno era entrato. E nessuno era uscito.',reading:'',translation:'But no one had gone in. And no one had come out.'},
    ],
    [
      {text:'Sono andato a guardare una sera.',reading:'',translation:'I went to look one evening.'},
      {text:'La luce era lì. Gialla, fioca, come una candela.',reading:'',translation:'The light was there. Yellow, dim, like a candle.'},
      {text:'Ho bussato. Silenzio.',reading:'',translation:'I knocked. Silence.'},
      {text:'Il giorno dopo ho chiesto al vecchio Enzo, che abita lì da quarant\'anni.',reading:'',translation:'The next day I asked old Enzo, who has lived there for forty years.'},
      {text:'"Quella casa," ha detto, "non comprarla. Non affittarla. Non entrarci."',reading:'',translation:'"That house," he said, "don\'t buy it. Don\'t rent it. Don\'t go inside."'},
      {text:'"Perché?"',reading:'',translation:'"Why?"'},
      {text:'"Perché chi ci entra non esce lo stesso di prima."',reading:'',translation:'"Because whoever goes in doesn\'t come out the same."'},
    ],
    [
      {text:'Non l\'ho ascoltato.',reading:'',translation:'I didn\'t listen to him.'},
      {text:'La settimana dopo sono entrato. La porta non era chiusa a chiave.',reading:'',translation:'The following week I went inside. The door wasn\'t locked.'},
      {text:'Dentro faceva freddo. Non il freddo di una casa abbandonata. Un freddo diverso.',reading:'',translation:'Inside it was cold. Not the cold of an abandoned house. A different kind of cold.'},
      {text:'Nella stanza del piano di sotto c\'era una sedia, un tavolo, una tazza.',reading:'',translation:'In the downstairs room there was a chair, a table, a cup.'},
      {text:'La tazza era ancora calda.',reading:'',translation:'The cup was still warm.'},
      {text:'Sono uscito in fretta. Non so ancora cosa ho visto in quello specchio mentre me ne andavo.',reading:'',translation:'I left quickly. I still don\'t know what I saw in that mirror as I was leaving.'},
    ],
  ],
  questions:[
    {q:'How long had the house been empty?',choices:['Five years','Eight years','Eleven years','Twenty years'],answer:'Eleven years'},
    {q:'What did old Enzo warn about the house?',choices:['It was haunted by a ghost','Whoever goes in doesn\'t come out the same','It was dangerous to enter at night','Someone was living there secretly'],answer:'Whoever goes in doesn\'t come out the same'},
    {q:'What was strange about the cup?',choices:['It was broken','It was floating','It was still warm','It was moving'],answer:'It was still warm'},
  ]
}

);
