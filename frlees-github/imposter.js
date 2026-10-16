/* =========================================================
   Imposter — lo3ba dyal frlees app
   dev by : frlees
   Bach tzid kelma: zidha f l'sujet dyalha b had chkel:
   Kelma|Ta3rif sghir
   ========================================================= */
(function () {

/* ---------- L'KLMAT ---------- */
const DATA = {
makla: { name: "Makla", words: `
Couscous|Kayji nhar jem3a, w kolchi kaytsna l'khodra li fo9o
Tajine|Kaytyb b chwiya, w ila t7rgat kaytlaw lmok
Pastilla|7lwa w mal7a f nfs lw9t, kat9dm f l'3ras
Rfissa|Msemmen m9tt3 b djaj beldi w l7elba, kat3tawha l li wldat
Tanjia|Tanjra dyal Marrakech katdkhl l l'ferran d l7mmam
Harira|Ramadan bla harira machi Ramadan
Bissara|Fol mtyb b zit l'3oud w l'kamoun, kat9tl l'berd
Msemmen|Mrbb3 w mdhoun, m3a atay ra howa l'malik
Baghrir|Khobz dyal 1000 t9ba, kayt9ra b zebda w l3sel
Harcha|Mn smida, kat3ed f lf6our w ktl9a f krchek
Sfenj|Kat9leb 3la mol sfenj m3a 7 d sba7, sakhn w mzit
Chebakia|Ramadan, l3sel w zenjlan, w sabe3 kay9ss9o
Sellou|Ghbra dyal l'louz w zenjlan, katkol bla ma t7ess
Kaab Ghzal|7lwa 3la chkel 9rn dyal ghzal, m3a atay f l3id
Ghriba|Kat9ssem f fommk, w kat3emmer l'farch b l'ftat
Batbout|Khobz sghir mfto7, t3emmro b ay 7aja
Ma9ouda|Btata w b3ad mclia, ra khobza m3a ma9ouda howa l'7al
Kefta|L7em mfroum, kaytchwa f lfa7m nhar l3id
Sardine|L'7out dyal cha3b, f l'ma7lba 3la 5 dh
Babbouche|L'ghlal f l'kass, w l'mra9 dyalo kay3alj kolchi
Zaalouk|Denjal w tomatich, salade li katklha b l'khobz
Loubia|Kat3emmer l'kerch, w kat3tik juj d l'mouchkil f lil
3des|Kaygolo fih l7did, l'mamat kaybghiwh bzaf
Amlou|Louz, zit argan w l3sel, l7lwa dyal Souss
Lben|Kaychreb m3a l'couscous, kaybrrd l'kerch
Rayeb|Danone dyal l'bled, kaytbe3 f l'kas d l'7lib
Karan|Calentica, kayttbe3 f l'karrossa 9ddam l'mdrasa b 1 dh
Tacos|Tacos français, fih frites, fromage w 3la l'kerch
Pizza|Khobz rgig b l'fromage, kayji f l'carton mor l'match
Shawarma|L7em kaydor 3la rasou 9ddam l'khayss
Sushi|L'7out ny, li klah f Casa kaygolo 3ndo l'flous
Panini|L'khobz l'mlous3, l'gouter dyal l'lycée
Chips|Sachet fih l'hwa ktar mn chips
Atay|L'whisky marocain, b n3na3 w sukkar bzaf
Noss noss|Café b l7lib, kat9sso f l9hwa m3a l'journal
Spaghetti|Kaytl3 3la l'7it ila bghiti tchouf wach tyb
Frites|Ila t9ssemhom m3a s7abek kaybdaw l'mchakil
Khli3|L7em mfrr7 b zit, kaytkhba f l'khabya l l'chta
Mrouzia|L7lwa dyal l3id l'kbir, b zbib w l3sel
Sfa|Couscous 7lou b sukkar w l9erfa, f l'3ras
Tehal|Mbbre, kaybanha mol l'krcha, ghir li tjrrbha
Glace|Kat9wdak f l'sif, w ila t7at 3la l'7wayj kat9wdak mama
Chocolat|Ila 3titi menno chwiya l khok, kaykolo kamel
Omelette|Ma 3ndekch makla f dar? dir omelette w safi
Bocadillo|Sandwich kbir b ton w l'mayonnaise, f l'bab d l'mdrasa
Lkhobz|Ila ma kanch f l'7anout, l'3cha mafihach
Danone|Kaychri lik bbak ila jbti n9ta mzyana
Popcorn|Kayji m3a l'film, w kaysali 9bel ma ybda
Burger|Mkharbe9 bin juj d l'khobzat, kaytsale m3a 1000 serviette
`},
l7ayawanat: { name: "L7ayawanat", words: `
Mch|Kayn3es nhar kaml, w f lil kayswel 3la l'makla
Kelb|Kayn9ez 3la ay wa7d dakhl l derb
Jmel|Kayreb l'touristes f Merzouga w kaybssa9
Asad|Malik l'ghaba, l'logo dyal l'montakhab
Fil|Kbir bzaf, 3ndo nif twil b7al tuyau
Zrafa|3n9ha twil, katchouf l'jiran mn l'fo9
Hmar|Kaykhdm ktar mn kolchi w ma kaybghih 7ta wa7d
3awd|Kayji f l'tbourida, kayjri b l'barud
Bgra|Kat3tina l7lib w kat9ra l'jornan f l'bled
7awli|Nhar l3id kaywli nejm l'7oma
Me3za|Kattl3 l'chjer d l'argan w katakol l'louz
Djaja|Kat3ti l'bid, w ila hrbat kayjri 3liha l'7oma kamla
Dik|Kayfi9ek m3a 5 d sba7 bla ma tbghi
Bibi|Dindon, kaykhaf l'mra kaymchi 9ddamo
Fkroun|Tortue, kaymchi b chwiya, kaywsel f 2030
Far|Kaykhalli mama tghwet f lil
Sersar|Kaykhrej mn l'ballo3a, w kolchi kayjri
9erd|Kayn f Ifrane w Azrou, kaychfr l'chips mn l'touristes
Dbb|Kbir w 3ndo chchar, kaybghi l3sel
Dib|Kaynta f l'qisas dyal l'jedda bach t3es
Tha3lab|Kayt7ayel, kaychfr l'djaj mn l'bled
Lf3a|Kattsa7 f l'7lay9iya f Jma3 Lfna
3a9rab|Kayn f l'sahra, ila 9rssek safi tsna l'ambulance
Nmla|Sghira w katchf ktar mn wazen dyalha
Debbana|Kat9leb 3la l'makla dyalk f l'sif
Ns|Moustique, kayzzz f wdnek f lil
9nfoud|Kamel chouk, ila 9issito kayweli kora
Bouma|L'mamat kaygolo ila ghwtat kat3ti l'chour
Ghrab|K7el, kayghwet f l'fajr
7mama|Kat9leb 3la l'ftat f sa7at l'jame3
Dolphin|Ka y9fez f l'b7ar w kay9ellel l'nas
Requin|Kolchi kaykhaf mnno f l'plage w ma kaynch
Tamssa7|Crocodile, kaydmmi3 w huwa kayakol
Hippopotame|Kayban m9ellel w huwa khatar
Pingouin|Kaymchi b7al chi wa7d labs smoking
Kangourou|3ndo jib f kerchou, kayhzz fih wlido
Panda|Kayakol l'bambou w kayn3es, 7yat chab
Nmer|Tigre, mkhatat b l'k7el w l'orange
Zebra|7mar labs pyjama
Bghel|Mn l'3awd w l7mar, 3nid bzaf
Sloughi|Kelb rgig kayjri b7al l'barq
Bou3wina|Ladybird, l'7mra b n9at k7lin
Fennec|Tha3lab sghir dyal l'sahra b wdnin kbar
Bouchouka|L9nfed f l'b7ar, ma tgles 3lih
`},
machahir: { name: "Machahir", words: `
Lionel Messi|La3ib foot mn Argentine, rbe7 Coupe du monde 2022
Cristiano Ronaldo|SIIIUUU! l'boss dyal l'jym w l'goals
Achraf Hakimi|L'joun dyal l'montakhab, kayjri b7al l'barq
Yassine Bounou|Bono, l'gardien li 7bes l'penalty dyal Sbania
Hakim Ziyech|Rjel l'chmal dyal l'montakhab, l'passes dyalo s7r
Walid Regragui|Mol "Dirou n'iya", dda l'montakhab l demi-finale
Youssef En-Nesyri|Tla3 f lhwa w dar l'but 3la Portugal
Sofyan Amrabat|Kayjri f l'match ktar mn l'ballon
Brahim Diaz|Khtar l'Maghrib w kaydir l'magie b rjlih
Kylian Mbappé|Kayjri b7al TGV, nejm dyal Fransa
Neymar|Kaytey7 bzaf f l'terrain, w 3ndo skills
Zinedine Zidane|Zizou, l'coup de boule l'mchhour
Ronaldinho|Kay dhak dima, w l'ballon kaybghih
Hicham El Guerrouj|L'malik dyal 1500m, rbe7 l'dhab f Athènes
Nawal El Moutawakel|Lwla f l'3arab li rb7at l'dhab olympique
Hatim Ammor|Kayghni l l7ob, l'3rayss kay7tajouh
Douzi|Ghna f l'raï w l'chaabi, "Mabghitch nebki"
Hassan El Fad|Mol "Kabour" w "Chanili tv", kay9tlna b d7k
Abdelkader Secteur|Komik, "Kayen wla makaynch" howa lmok
Abdelhadi Belkhayat|"Lktar" w "Ya bent nas", l'jil l'9dim kaybghih
Samira Said|Moughanniya mghribiya machhoura f Masr
Nass El Ghiwane|L'groupe li bdaw l'ghiwane f l'70s
Ibn Battuta|Dar l3alam kaml 3la rjlih mn Tanja
Tarik Ibn Ziyad|Dkhl l'Andalous w 7r9 l'flouka
Albert Einstein|E=mc², w cha3ro dima mkhbbel
Isaac Newton|T7at 3lih t9ffa w lqa l'gravité
Mr Bean|Ma kaytkellemch w kayd7kna, 3ndo Teddy
Charlie Chaplin|Film bla sout, b chapeau w 3sa
Michael Jackson|Moonwalk, kaymchi l'lor w hwa ghadi l'9ddam
Shakira|Waka Waka, Coupe du monde 2010
Jackie Chan|Kaydreb w kayd7k f nfs l'film
Bruce Lee|Lmalik dyal l'kung-fu, "Waaatchaaa!"
Elon Musk|3ndo Tesla w bgha yrsel l'nas l Mars
Mark Zuckerberg|Mol Facebook w Instagram, kayn3ess b7al robot
Steve Jobs|Mol Apple, dima labs nfs l'pull l'k7el
Bill Gates|Mol Windows, ila ttb9 l'PC 3ytou
Cléopâtre|Malika f Masr l9dima, mchhoura b zinha
Napoléon|Imbaratour dyal Fransa, kaygolo kan 9sir
Usain Bolt|Asra3 bnadem f l3alam, kayjri w hwa kayd7k
Muhammad Ali|Boxeur, "kayttir b7al l'farracha w kay9ress b7al n7la"
Mozart|Kan kayktb l'mousi9a w hwa 3ndo 5 snin
Picasso|Rssam, wjouh f l'tsawer dyalo m9lbin
Leonardo da Vinci|Rssem l'Joconde w khtar3 bzaf d l7wayj
MrBeast|YouTuber kayferr9 l'flous 3la l'nas
Taylor Swift|Moughanniya amrikiya, l'concert dyalha kaytzlzl l'ard
`},
lmoudoun: { name: "Lmoudoun w Lboldan", words: `
Casa|L'3jaj, l'zham, w ila ma t3ref7ch f l'tram tdi3
Rabat|L'3assima, n9iya w kolchi f l'idara
Marrakech|L'mdina l'7mra, Jma3 Lfna w 7ar bzaf f l'sif
Fès|L'mdina l9dima, ila dkhlti l'mdina ma tkhrjch
Tanja|L'b7ar w l'ri7, w katchouf Sbania mn tem
Agadir|L'plage w l'chems, l'touristes kaymchiw liha
Meknès|Bab Mansour w l'jnan, mdinat Moulay Ismail
Oujda|L'charq, l'karantita w l'raï
Tétouan|L'7mama l'bayda, l'mdina l'andalousiya
Chefchaouen|Kolchi zre9, l'touristes kaytsawro f kol zan9a
Essaouira|L'ri7 kayy9le3 l'chapeau, w l'7out l'tri
Ifrane|Swisra dyal l'Maghrib, l'tlj w l'9rouda
Laâyoune|L'sahra, l'malhfa w l'dra3a
Dakhla|L'kitesurf w l'ostra, b7ar w sahra
Merzouga|L'kthiban dyal ramla, l'jmal w l'nojoum
Ouarzazate|Hollywood dyal l'Maghrib, fiha l'studios
Khouribga|L'fosfat, w l'nas kaymchiw l Italia
Kénitra|Mdina sghira 7da Rabat, w fiha l'gare dyal l'Boraq
El Jadida|L'plage dyal l'sif, w l'mella7 l'portugais
Safi|L'fakhar w l'sardine
Nador|L'MRE f l'sif, w l'7otta l'mzyana
Al Hoceima|L'b7ar sfa w zre9, l'Rif
Paris|Tour Eiffel, w kolchi kaybghi ymchi liha
Madrid|L'Real, w l'jiran dyalna
Barcelona|Barça, Messi kan fiha
New York|L'bnaya twila w Statue de la Liberté
Dubai|Burj Khalifa, w l'malyardirat
Istanbul|L'mosalsalat turkiya, w l'kebab
Makka|L'Ka3ba, kolchi kaytmnna ymchi
Tokyo|Japon, l'robots w l'manga
Japon|L'sushi, l'anime w l'train l'srie3
China|Kolchi made in China, 7tta l'tlifoun dyalk
Brazil|L'samba w l'foot, Neymar w Ronaldinho
Masr|L'ahramat, w l'aflam dyal Adel Imam
Turquia|Mosalsalat, l'kebab w l'7mmam turki
Canada|L'berd, w kolchi kaybghi y7jr liha
Italia|L'pizza w l'pasta, w l'MRE dyal Khouribga
Russia|Kbira bzaf, l'berd w l'tlj
Australia|Kangourou, w ila hdriti m3ahom f l'lil hya sba7
Fransa|Kolchi kaygol "bonjour" w kaychekki
Sbania|L'jiran, l'paella w l'MRE
Mauritanie|L'jiran dyal l'jnoub, l'sahra w l'atay
Belgique|L'frites w l'chocolat, w l'MRE bzaf
Hollanda|L'bisklitat bzaf, w l'ward
Qatar|Dart Coupe du monde 2022, l'Maghrib wsel l demi
Tunis|L'jiran, l'harissa w l'brik
London|Big Ben, l'chta dima, w l'chay b l7lib
`},
blayss: { name: "Blayss", words: `
L7mmam|L'kessal, l'kis w l'7arara, w l'mama li kat7kk lik l'jild
Lmdrasa|L'ostad, l'tableau w l'jaras li ma kaybghich ydreb
Sbitar|L'tsenna 3 sa3at bach tchouf tbib 5 d9ay9
Plage|L'parasol, l'ramla f l'sandwich, w l'mouja
Souk|L'khodra, l'7wayj w "chouf a sidi!"
Marjane|Dkhlti tchri l'khobz w khrjti b chariot 3amer
Moussem|L'tbourida, l'khayl, w l'barud
Jame3|Sla, w l'sbbat kaytkhbbaw f l'bab
Cyber|L'PC, Counter-Strike w 1 dh l'sa3a
Teleboutique|Kanti kat3iyet mnha l l'family 9bel l'portable
Ferran d derb|Kat3tih l'khobz l'khdar w kayrdo lik sukhn
Stade|L'match, l'craquage w l'ghnani
Cinéma|L'film, l'popcorn w wa7d kayhder f l'tlifoun
L9hwa|Kass atay, l'match, w l'kras li ma kaytbdlch
Lbanka|L'tsenna, w l'carte li ma bghatch tkhrej
Lbousta|Kanti kat9leb 3la l'mandat, daba ghir l'colis
L'mo9ata3a|Bach tsawb l'carte, khass l'photocopie w l'sber
Lbaladiya|Bach tsni l'wra9 khass tji 3 merrat
Lmahatta|L'kiran, l'bigs, w "Casa! Casa! Casa!"
Lgare|L'train li kayji m3ttel dima
Aéroport|L'MRE, l'valizat w l'bka f l'wada3
Lmersa|L'flayk, l'7out w l'ri7at
Jnan|L'chjer w l'fakiha, w l'jar li kaychfr
Jbel|Toubkal, l'tlj w l'touristes b l'sacs
Sahra|L'ramla, l'jmal w l'7ar f l'nhar w l'berd f l'lil
Lghaba|L'chjer, w l'pique-nique d nhar l'a7ad
Zoo|L'asad kayn3es w l9erd kayd7k 3lik
Jma3 Lfna|L'7lay9ya, l'f3ai, l'3assir w l'babbouche
Jame3 L7asan Tani|Fo9 l'b7ar f Casa, wa7d mn akbar l'jawami3
Derb Ghallef|Ay tlifoun mhrres kaysl7o lik, wla kaybi3ouh lik
Lferrma|L'bgri, l'djaj w ri7at l'bled
Lhaffaf|Coiffeur, kayhder m3ak 3la l'siyasa w l'foot
Pharmacie|Kayftcho lik l'ordonnance w maf7emti walo
Lbled|Fin kaymchiw l'drari f l'sif, w kayrj3o k7lin
Morocco Mall|L'mall l'kbir, kaydor fih kolchi w ma kaychri walo
Lmella7|L7ay l9dim d l'yahoud f l'mdina
Kasbah|L'7iout d l'touba, w l'touristes kaytsawro
Lmarkhal|Fin kaytbe3 l'7awli 9bel l3id
Salle de sport|L'jym, kadkhl tsawer w tkhrj
Laboratoire|F l'mdrasa, l'blouse l'bayda w l'ri7a l'khayba
Lferma d l'nhal|Fin kayji l3sel, w l'9riss
Lbab d l'mdrasa|Mol l'karan, mol l'chips w l'gardien li ma kaykhllikch
`},
apps: { name: "Apps w L3ab", words: `
TikTok|Dkhlti tchouf video wa7da, khrjti m3a 3 d lil
Instagram|L'tsawer w l'stories, kolchi zwin tm ghir
WhatsApp|L'groupe d l'family, kolchi kaysift "Sba7 lkhir" b tswira
Snapchat|L'flamme, ila nssiti nhar kat7r9
YouTube|Fin kat9ra ktar mn l'mdrasa
Facebook|L'app dyal l'walidin w l'jdoud
Messenger|Kat9ra "vu" w ma kayjawbekch
Telegram|Fin kaytsiftou l'films w l'cours
Discord|L'gamers, l'servers w l'micro li kaytsfr
Google Maps|Kaydik f l'derb l'ghalt w kaygolik "Wsselti"
Netflix|"Episode wa7d w nn3es", 3la 4 d sba7
Spotify|L'mousi9a, w l'pub ila ma 3ndekch Premium
ChatGPT|Kayjawbek 3la kolchi, 7tta l'devoir dyalk
Free Fire|L'battle royale dyal l'tlifounat, "Booyah!"
PUBG|Tnzel b l'parachute, w tmout f l'awel d9i9a
Fortnite|Kaybniw w kay9ssiw f nfs l'wa9t
Minecraft|Kolchi mrbb3, kaybni dar w kayhrb mn l'Creeper
EA FC|FIFA, l'mo3ssib mor l'penalty
Clash of Clans|Kaybni l'village w kayhjm 3la l'jiran
Subway Surfers|Kayjri 3la l'tran w l'bolis kaytb3o
Candy Crush|L'mamat kayl3boha b l'sa3at
Among Us|Chkoun l'imposter? b7al had l'lo3ba
Roblox|L'drari sghar, w l'Robux li kaytlbo mn l'walidin
GTA|Kayser9 tomobila w kayhrb mn l'bolis
Call of Duty|L'7arb, l'micro w l'sbb
Temple Run|Kayjri mn l'9erd li bgha yaklo
Angry Birds|Ttir l'7mra mghdoba 3la l'7allouf l'khder
Pou|L'kabour l'smer li khassk t3tih yakol w ydkhl l'7mmam
Talking Tom|L'mch li kay3awd kolchi li golti b sout 7med
Flappy Bird|Lo3ba sahla, w kat3sbek bzaf
Super Mario|Kayf9ez 3la l'fttar w kay9leb 3la l'amira
Pac-Man|Kayakol l'n9at w l'chbayk kayjriw 3lih
Tetris|L'mrb3at kayt7ato, khass t3emmer l'stra
Ludo|Kola mra tw9el l'ssim, kaydkhel l'mouchkil
Ronda|Lo3ba d l'karta, "Ronda!" "Tringa!"
Dama|Lo3ba f l9hwa, l'jdoud kay3erfo kolchi
Chtranj|Chess, l'malik w l'malika w l'7sab
Glovo|Kayjib lik l'makla w nta f l'farch
Avito|Kaybi3 l'tlifoun b l'thaman dyal l'tomobila
Jumia|Kat3eyyet, w kayji l'colis mor chhar
Shein|L'7wayj rkhaas, w l'taille ma kat3emmerch
Uno|Lo3ba d l'karta, "+4!" w kaytfr9 l'mjlis
Rubik's Cube|Chkoun 7llo bla ma y9lle3 l'stickers?
Pokémon GO|Kolchi kayjri f zn9a kay9leb 3la Pikachu
`},
aflam: { name: "Aflam w Rosoum", words: `
Tom w Jerry|Mch dima kayjri mor far, w ma kaycho9ach
Bob l'éponge|Kaysken f ananas ta7t l'b7ar, w kaykhdm f Krusty Krab
Dora|Katgol "Swiper, no swiping!" w katsewel l'telespectateur
Ben 10|Mongela f yddo kat9leb 10 d l'ka2inat
Naruto|Ninja b cha3r sfar, kaybghi ywli Hokage
Dragon Ball|Goku, Kamehameha w l'cha3r li kaywli sfar
One Piece|Luffy, l'9rassna w l'kanz
Pokémon|Pikachu w Sacha, "Attrapez-les tous!"
Captain Majid|L'ballon kayjri 3 episodes 9bel ma ywsel l'but
Grendizer|L'robot l'kbir, l'jil d l'80s kaybghih
Kirikou|Dri sghir w chater bzaf
Shrek|Ghoul khder kaysken f l'ghaba w kaybghi l'b7r
Toy Story|L'l3ab kayt7rko ila mchiti
Le Roi Lion|Simba, Hakuna Matata
Cars|Tomobilat kaythdro, Flash McQueen "Kachow!"
Minions|Sghar sfar kaybghiw l'banane
Scooby-Doo|Kelb kaykhaf w kayakol, "Scooby Doo bi doo!"
Popeye|Kayakol l'sabanikh w kaywli 9wi
Bugs Bunny|Larnab chater, "Quoi de neuf docteur?"
Spider-Man|Kaychd l'7it b l'3ankabout
Batman|Rajel l'khoufach, ma 3ndo 7tta superpower ghir l'flous
Superman|Kaytir b l'cape, w kaykhaf ghir mn kryptonite
Barbie|Poupée, l'dar l'rouz w Ken
Peppa Pig|L'7allouf l'rouz li kayf9ez f l'ghis
Mickey|Far mchhour b wdnin kbar
Les Simpson|L'family sfra, "D'oh!"
Tintin|Sa7afi m3a l'kelb dyalo Milou
Astérix|L'gaulois li kaycherbo l'potion magique
Heidi|L'bent d l'jbel m3a l'jedd w l'm3az
Rémi|"Rémi sans famille", l'kolchi bka m3ah
Détective Conan|Dri sghir kaychouf l'jarima f kol episode
Titanic|L'flouka ghr9at, w Rose ma khllatch Jack yrkeb
Harry Potter|L'sa7er b l'nwader w l'3sa
Home Alone|L'family nsat l'dri f dar, w huwa 3a9eb l'chffara
Avengers|Ga3 l'abtal f film wa7d
La Reine des neiges|"Libérée, délivrée", l'drari ma b9awch y7bso
Ice Age|L'sanjab li dima kayjri mor l'bellout
Kung Fu Panda|Panda smin kayt3llem l'kung-fu
Madagascar|L'7ayawanat d l'zoo hrbo, "I like to move it!"
Coco|L'Mexique, l'mousi9a w l'mouta
Fast & Furious|L'tomobilat w "family", 10 d l'ajza2
Squid Game|L'lo3ba d l'drari wllat khatira
`},
lmihan: { name: "Lmihan", words: `
Tbib|Kaykteb l'ordonnance b ktaba ta 7ed ma ka y9raha
Bolis|Kaw9ef l'tomobilat w kaygol "Lwra9 3afak"
Ostad|"Sktou!" w kaycha3el l'mousi9a dyal l'tbachir
Kessal|Kaykessel l'nas f l7mmam b l'kis, w kaywerrik l'wsakh
Mol l7anout|Kayn 3ndo kolchi, w kaykteb lik l'kridi f l'karne
Mol l'msbana|Kaysbben l'7wayj, w kayfrrd l'zif w l'jellaba
Ferran|Kaytyeb l'khobz d l'7oma, w kay3ref l'khobza d kol dar
Gerrab|Kaybi3 l'ma b l'tassa d nhas f Jma3 Lfna
7lay9i|Kay7ki l'qisas f l'7l9a, w kaywe9ef f l'blassa li zwina
Neggafa|Katzyen l'3arossa w katbddl lha 7 d l'tkchita
Khrraz|Kayrdd l'sbbat l'9dim jdid
Debbagh|Kaykhdm l'jeld f l'mdbgha, w l'ri7a katwssel l'Rabat
Seffar|Kaydreb l'nhas w kaysawb l'siniyat
Mssa7 sbbat|Kayl3 l'sbbat b l'cirage f l'9hwa
Mol teleboutique|Kayb3 l'ta3bi2a w kaysem3 l'mkalmat dyalk
Mol cyber|"Ba9i lik 5 d9ay9!"
3essas d derb|Kayn3es f l'nhar w kaysfer f l'lil
Gardien d parking|Kayji m3a l'gilet ghir mlli bghiti tmchi
Mol taxi|Kaygol lik "Ma kaynch l'sarf"
Mol lkarrossa|Kaybi3 l'khodra w kaysg3 l'hmar
Ma3lem bni|"Ghedda nji", w ma kayjich
Mekanisyen|Kaygol lik "Hadi khassha moteur jdid"
Jzzar|Kayb9a 3ndo l'7awli nhar l3id kamel
Khddar|Kaybi3 l'khodra w kayzid lik ma3dnous fabor
Mol sfenj|Kaydir l'sfenj m3a 6 d sba7, w ydih kay7t f l'7alfa
Tbib snan|Kaygol lik "Ma tkhafch ma ghadich t7ess"
Pilote|Kaysog l'tiyara w kaygol "Mr7ba bikom"
YouTuber|"Ma tnsawch t'abonniw w t'activiw l'jaras!"
Influenceur|Kaysewer l'makla 9bel ma yaklha
Mol Glovo|Kayjri b l'moto, w l'makla katwsel bard
Ghayyat|Kaynfekh f l'ghayta f l'3ors, w l'wdnin kaysfro
Ddellal|Kaybi3 f l'souk b l'mzad, "Chkoun zad?"
Lfqih|Kay9ri l'drari f l'msid b l'loo7a
Mol l'ballon|Kaybi3 l'balonat f l'plage, l'drari kaybkiw 3lih
Moul l'karossa d l'babbouche|Kaybi3 l'ghlal f l'lil b l'mra9
Sebbagh|Kaysbegh l'chjer f l'souk, yddih dima mlonin
Mol l'karan|Kaybi3 l'karan f l'bab d l'mdrasa b l'kaghet
Coiffeur|Kaygol lik "ghir chwiya mn l'jnab" w kayhlek lik ras
Mol l'kraws|Kayjib l'kraws mn Marjane l'tomobila
Chikha|Katghni f l'3ers, w kat3iyet "Aaaayta!"
Mol l'jornan|Kaybi3 l'jornan, w l'9hwa kat9rah fabor
Sa3i|Kaybghi ghir dirham, w kaydir lik d3wa zwina
`},
dar: { name: "7wayj d Dar", words: `
Tilivizyon|Kayn fih ghir l'akhbar w l'mosalsal turki
Telecommande|Dima mkhbbia ta7t l'mkhedda
Parabole|Kat9leb 3la Nilesat, w l'ri7 katbddlha
Lmeida|Tbla sghira, kolchi kayakol mn tbsil wa7d
Siniya|Fiha l'berrad w l'kisan, d l'atay
Berrad|Fih l'atay, w ila t7rg l'kas, safi
Kissan|L'kisan d l'atay, dima wa7d mhrres
Tanjra|Fin kaytyb l'tajine, w l'mama ma katslefhach
Cocotte|Kat sfer b7al l'train, w kolchi kaykhaf
Lmehraz|L'mehraz d nhas, kaydko fih l'kamoun
Lkanoun|L'fa7m, l'tajine w l'chwa
Lbota|Butagaz, ila tsalat f l'wst d l'tyab, kaybda l'mouchkil
Ventilateur|F l'sif kolchi kaytkhasem 3lih
Lmkhedda|Ila 3tak lha bbak, ra tfhem
Zerbiya|Kat9leb 3la l'kas li t7at, w kat3emmer l'ghbra
Sdari|L'salon marocain, kolchi kayn3es fih
Lhaydoura|Jeld l'7awli d l3id, kaygles 3liha l'jedd
Lmraya|Kat9ef 9ddamha 10 d9ay9 9bel ma tkhrj
Lfouta|Dima mbllla, w ma kaynch dyalk
Sabboun beldi|K7el, f l7mmam, kayzle9 mn yddek
Kaskasa|L'couscoussier, ta7t l'mra9 w fo9 l'smida
Ghorbal|Kaytgherbel l'd9i9, w l'mama katghni
Jffaf|Kaymsse7 l'ard, w kaytle9 l'ma f l'bit
Stal|Kaycharbou fih l'ma nhar t9ta3 l'ma
Mixeur|Kayzayr b7al l'tiyara m3a 7 d sba7
Micro-onde|Kaysakhan l'makla men l'jnab w l'wst bard
Machine à laver|Katdor w katdor, w katakol l'tqachr
Lmchet|Dima mfkouk, w kolchi kayakhdo
Lmekwa|Kat7r9 l'9amija ila nssitiha
Frigo|Kat7lo kola d9i9a w kat9leb 3la walo
Lbab|"Chkoun?" "Ana." "Chkoun ana?"
Tlifoun fix|Kanti kat3iyet fih w l'family kamla kat7dr
Lmousssa|Tapis dyal l'mdkhl, kolchi kaymse7 fih rjlih
L'7nfiya|Kat9ter dima, w l'blombi ma jach
Lmssa7a|Kaymsse7 l'tbla, w kat3ref kolchi li tkla
Ljellaba|Kat7tajha nhar jem3a w l3id
Lbelgha|Sbbat dyal l'7mmam w l'jame3
Lkursi|Kolchi kaytkhasem 3la l'kursi l'mzyan
Tbla|Fo9ha kolchi: l'makla, l'khaws w l'devoirs
Lkhabya|Fin kaykhbbiw l'khli3 w l'zit
Lbattaniya|Dyal l'nmer, kayn f kola dar mghribiya
Lmanchar|Kaynchro fih l'7wayj f l'stah
`},
objet: { name: "Ay Objet", words: `
Stylo|Bic, dima kaytsalla 9bel l'examen
Briquet|Kaytsrr9 dima, ma kat3refch fin mcha
Mfta7|Dima ma kayb9ach f jibek mlli khassek
Sbbat|L'mama katgol 9l3o 9bel ma tdkhol
Nwader|Kat9leb 3lihom w hooma f rassek
Sa3a|Kat3tik l'wa9t, walakin dima m3ttla 5 d9ay9
Mdella|Ma kat7ellhach 7tta katchreb l'ma
Lkora|Ila t7at f l'jnan d l'jar, safi mchat
Chargeur|Kayt9ta3 l'fil dima 7da l'prise
Écouteurs|Dima m3ewjin f l'jib
Batterie|Power bank, kat3emmro w nta kat3emmer l'tlifoun
Lampe|Ila t9ta3 l'dow, kolchi kay9leb 3la l'lampe
Mqess|Ma kayb9ach fin 7ttito
Ghrraf|L'ghrraf d l'ma f l'sif, kolchi kaycharbo mno
Mika|L'sachet l'k7el, mamno3a w ba9a f kola dar
Carte nationale|Ila nssitiha, ma tdkhol l 7ta blassa
Billet d 20 dh|Ma kaykfik l walo daba
Bola|L'ballon f l'derb, kaytchrrg ghir b 3 d l'matchat
Bouteille|Bouteille d Sidi Ali, katwlli l'ma d l'frigo
Cartable|Kat9al ktar mn l'tilmid
Kas|Kas d l'atay, kolchi kaybghi l'kas l'mzyan
Kleenex|Kayji m3a l'zokam, w l'mama kat3tik l'khrqa
Tasbi7|L'jedd kaydwro dima f yddo
Bendir|F l'3ers w l'mawasim, l'khmmer f l'idin
Ta3rija|Achoura, kolchi kaydreb fiha
Pétard|Achoura, l'jiran kaytkhal3o
Clé USB|Fiha l'cours w l'films, w dima "Virus"
Calculatrice|Casio, kat7ssb kolchi ghir l'exam
Gomme|Kat9ttha3 l'ktab b ktar mn l'ghalat
Règle|Kat9as biha, w l'ostad 9dim kaydreb biha
Taille-crayon|Kaytakl l'crayon kaml
Rubik's|Mrbb3 b l'alwan, ma 7ellouch
Spinner|Kan mchhour 3 chhour w mat
Trombia|Toupie, kat ddor b l'khayt f l'derb
Lbli|L'billes, kanti katrbe7 w katkhser f l'drb
Cerf-volant|Kayttir f l'plage w kaytl3 l'chjra
Jebbad|Lastik d l'drari, l'jiran kaykhafo mno
Nokia 3310|Ma kaytherrsch, w fih Snake
Sachet d l'7lwa|Kayji m3a l'3id, w l'drari kaytkhasmo 3lih
Plastikat|Sac plastique fih sac plastique fih sac plastique
Fanous|F Ramadan w l'Achoura, b l'chm3a
Lpile|Dima mfta7a f l'telecommande, kaydiro m3aha l'snan
`},
tomobilat: { name: "Tomobilat", words: `
Dacia Logan|L'tomobila dyal l'cha3b, kolchi 3ndo wa7da
Dacia Sandero|Logan sghira, kayjri biha l'jil l'jdid
Mercedes 240|L'grand taxi l9dim, kayrkbo fih 7 w l'chifour
Renault 4L|L'4L l9dima, w kat9ad b l'pince
Peugeot 205|Tomobila 9dima, l'MRE kanu kayjibouha
Fiat Uno|Sghira w kat9ad b l'7jra
Fiat Palio|Kanet f kola derb f l'2000
Golf|Volkswagen Golf, l'chabab kaybghiwha b l'jantes
Ferrari|L'7mra, kat chouf ghir f l'tilifizyon
Lamborghini|Kat9tal l'mozzi, w l'thaman b7al 100 dar
Bugatti|Asra3 tomobila, w kat9ad b l'malyard
Tesla|Bla bnzin, w kat3iyet l'Elon Musk
Toyota Hilux|Pick-up d l'bled, kayrkbo fih l'7wala w l'nas
Land Cruiser|L'boss dyal l'sahra
Range Rover|L'tomobila li kayji biha l'3ris f l'3ers
BMW|Kaygol "Bghit nkhli l'tomobila t3iyet"
Hyundai Accent|L'petit taxi l'jdid
Kia Picanto|Sghira, katkhbba ta7t l'camion
Petit taxi|Kayrkb 3 w kaygol lik "Ma kaynch l'sarf"
Grand taxi|"Ba9i wa7d!" w kayji 7
Motocar|Triporteur, kaychdd l'7ajja w l'nas
Honda C90|L'moto dyal l'khddara w l'jdoud
Peugeot 103|Mobylette, kat sfer kola mra
Tobis|L'bus dyal l'mdina, 3amer w kaytsenna
Tram|Kayji ghir mlli ma bghitich
Al Boraq|L'train l'srie3, Tanja-Casa f 2 sa3at
Camion|Kaytb3k f l'autoroute w ma tqderch tdouzo
Tracteur|F l'bled, kaykhdm l'ard w kayzz3 l'tri9
Karrossa|L'7mar kayjerha, w l'khodra fo9ha
Ambulance|Kayji ghir mor 3 sa3at
Jeep|L'jbel w l'sahra, kat9ad b l'Paris-Dakar
Limousine|Twila bzaf, d l'3ers d l'malyardirat
Vespa|L'Italia, w l'cha3r f l'ri7
Trottinette|L'drari f l'mall w l'grands f Paris
Bisklita|Ila tbghi tt3allem, khass t7et 3 merrat
Renault Clio|L'tomobila dyal l'auto-école
Renault Kangoo|L'tomobila dyal l'khdma w l'family l'kbira
Peugeot Partner|L'boulanger w l'jzzar 3ndhom wa7da
Twingo|Sghira w kat dhak, w ila 7tito 4 kaytl3 l'ri7
Dacia Duster|L'4x4 dyal l'cha3b
Formule 1|Kat dor f l'circuit b 300 km/h
Tank|L'7arb, ma kaytsennach l'feu rouge
`},
riyadat: { name: "Riyadat", words: `
Foot|11 kayjriw mor ballon, w 50 000 kaygolo lihom chno ydiro
Basket|L'ballon f l'panier, l'twal kayrb7o
Handball|Foot b l'idin, w l'kora sghira
Volley|Kat dreb l'ballon fo9 l'filet, f l'plage zwin
Tennis|Raquette w kora sfra, "15-0"
Ping-pong|Tennis 3la l'tbla, w l'kora kat9fez f l'wjeh
Boxe|Kaydarbo b l'gants, w l'arbitre kay7ssb 10
Karaté|"Ki-ai!" w l'7zam l'k7el
Taekwondo|Rjlin f l'hwa, w l'Maghrib 3ndo l'midaliyat
Judo|Kayloh l'khasm 3la l'ard, Kimono byad
Natation|L'pisine, w l'cha3r kaywli khder b l'chlore
Marathon|42 km d l'jri, w 3la l'wsla kaybkiw
100m|10 tawani d l'jri, Usain Bolt kaygol mr7ba
Cyclisme|Tour de France, l'bisklitat w l'tla3at
Musculation|L'jym, l'7did w l'tsawer f l'mraya
Yoga|Kaytchebka m3a rasou w kaygol "Om"
Échecs|L'malik w l'malika, w l'mokh kaysakhan
Golf|L'kora sghira, l'tqb w l'flous bzaf
Rugby|Kolchi 3la kolchi, w l'ballon b7al l'bida
Baseball|L'batte w l'casquette, f Amrika
Surf|Kaywe9ef 3la l'planche fo9 l'mouja f Taghazout
Ski|Kayhbet mn l'jbel 3la l'tlj f Oukaimeden
Patinage|L'tlj w l'dwaran, w l'tey7 f l'awel
Tbourida|L'khayl w l'barud f nfs l'wa9t, "Bam!"
Lmsara3a|Lutte, kaytchedo 7tta wa7d yt7
Sumo|Juj smanin kaytdafe3o f l'dayra
Rallye|Dakar, l'sahra w l'ghbra
Parkour|Kayf9ez mn sta7 l sta7
Skateboard|L'planche b l'rwayd, w l'rkab mjar7in
Billard|L'kora l'k7la tkhli l'akhir
Bowling|Kat dreb l'9wari3 b l'kora l'ti9ila
Fléchettes|Kat siyb l'chikha f l'wst, w kat sift f l'7it
Escalade|Kayt9 l'jbel b l'idin w l'7bal
Plongée|Kayhbet l l'b7ar b l'oxygène
Kick-boxing|Boxe b rjlin, Badr Hari ra kayn
Futsal|Foot f l'salle, l'Maghrib malik d l'Afrique
Foot d derb|L'goals juj d l'7jer, w mol l'ballon howa l'boss
7bel|Corde à sauter, l'bnat kay3erfo kolchi
Kayak|Flouka sghira w l'mjdaf
Tir à l'arc|L'9ous w l'sahm, Robin Hood
Escrime|L'sif w l'masque, "En garde!"
Course d l'khayl|L'khayl kayjriw w l'nas kaygheyto
`},
lmarkat: { name: "Lmarkat", words: `
Nike|"Just do it", l'logo b7al l'virgule
Adidas|3 d l'khtout, l'survêt dyal l'3id
Puma|L'nmer li kayf9ez, l'sbbat d l'sport
Coca-Cola|L'7mra, kat3emmer l'kerch b l'gaz
Pepsi|L'zre9a, l'3adou dyal Coca
Hawaï|L'mchroub l'orange l'mghribi
Poms|Mchroub d l'tffa7, l'zmen l9dim
Sidi Ali|L'ma f l'bouteille, kayn f kola tbla
Oulmès|L'ma b l'gaz, kat dir "pchhh"
Danone|L'yaourt, kaygolo 3la ay yaourt "Danone"
Jaouda|L'7lib w l'yaourt, l'ma3mel f Casa
Centrale|L'7lib l'zre9, f kola frigo
Raibi Jamila|Rayeb f l'bouteille, l'drari kaybghiwh
Merendina|Gâteau b l'chocolat, l'gouter d l'mdrasa
Tonik|Biscuit b l'chocolat, kayt3emmer l'cartable
Henry's|Biscuit Henry's, kanu kayjibouh m3a atay
Nutella|L'ghanam ila 3tak lha mama
Kinder|L'bida d l'chocolat, fiha l3ba sghira
Samsung|L'tlifoun l'mchhour, w l'tilifizyon
Apple|L'tffa7a mgdoma, l'iPhone li ghali bzaf
Huawei|L'tlifoun l'chinwi li bla Google
Xiaomi|Rkhis w zwin, kolchi kaychrih
Nokia|Ma kaytherrsch, w l'Snake
PlayStation|L'PS, l'FIFA w l'mjlis kaml
McDonald's|L'M l'sfra, l'happy meal w l'jouet
KFC|L'djaj l'm9li, w l'jedd l'mchhour
Zara|L'7wayj, w l'soldes li kay7m9o l'nas
Gucci|Ghali bzaf, l'flous dyal l'malyardirat
Lacoste|L'tamssa7 3la l'polo
Marjane|Kat dkhol tchri wa7ed l'7aja, katkhrj b 30
BIM|L'7anout l'torki, kola jem3a jdid
Inwi|L'mauve, "Inwi, inwi"
Maroc Telecom|IAM, l'boss dyal l'réseau
Orange|L'orange, l'3adou dyal Inwi
Tide|Kayghsel l'7wayj, w l'ri7a zwina
Omo|L'mama kat9leb 3la l'promo
Colgate|L'snan l'byad, kaytsala dima
Lesieur|L'zit f kola kouzina
Knorr|L'mka3eb, l'mama kat7tha f kolchi
Aïcha|L'confiture w l'tomatich f l'3elba
Bimo|Biscuit "Bimo", l'gouter l9dim
Pringles|L'chips f l'tube, w yddek ma katdkholch
Red Bull|"Kay3tik l'jen7in", w kaysehrek 7tta l'fajr
Ikea|Kat chri l'meuble w katbnih b l'mouchkil
Amazon|L'colis, w l'flèche li katd7k
`}
};

/* L'A3mar: ra9m 3chwa2i mn 1 l 150 + ta3rif 3la 7sab l'3mr */
const AGES = [
  [1, 2, "Mazal kayrda3, w kaybki f lil 3la walo"],
  [3, 5, "Kaydkhel l'roud, w kaybghi ghir l7lwa w Cocomelon"],
  [6, 11, "Ibtida2i, l'cartable kbir mno"],
  [12, 14, "College, bda kaydir l'gel f ras w kaybghi tlifoun"],
  [15, 17, "Lycée, 3ndo TikTok ktar mn l9raya"],
  [18, 22, "Bac w l'fac, kay9leb 3la stage w l'flous"],
  [23, 29, "Kaygol 'mazal sghir 3la zwaj'"],
  [30, 39, "L'mama katgol lih 'fo9ach ghadi tzowj?'"],
  [40, 49, "Bda l'chib, w kaychouf l'akhbar b sout 3ali"],
  [50, 59, "Kaygol 'f zmani kan kolchi rkhis'"],
  [60, 69, "Mt9a3ed, kayl3b dama f l9hwa m3a s7abo"],
  [70, 89, "Jedd, kaygol l'drari 'sir jib lia l'khobz'"],
  [90, 110, "Chaf l'Maghrib f ga3 l'Coupes du monde"],
  [111, 150, "Hada record Guinness, wla ghir kaykdeb f l'3mr"]
];

const ORDER = ["makla","l7ayawanat","machahir","lmoudoun","blayss","apps","aflam","lmihan","dar","objet","a3mar","tomobilat","riyadat","lmarkat"];
const CAT_NAMES = Object.fromEntries(ORDER.map(k => [k, k === "a3mar" ? "L'A3mar" : DATA[k].name]));
for (const k in DATA) {
  DATA[k].list = DATA[k].words.trim().split("\n").map(l => {
    const i = l.indexOf("|");
    return { w: l.slice(0, i).trim(), d: l.slice(i + 1).trim() };
  });
}

/* ---------- STATE (f l'memoire ghir, ma kayt7fdch mlli tsedd l'app) ---------- */
const st = { players: ["", "", ""], imps: 1, cats: new Set(ORDER), used: new Set(), round: null, idx: 0, shown: false, seen: false };

/* ---------- ICONS ---------- */
const P = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const MASK = P('<circle cx="12" cy="9" r="5"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/><path d="M9.5 9h.01M14.5 9h.01"/>');
const ICONS = {
  makla: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 2-2 6 0 8v10"/>',
  l7ayawanat: '<circle cx="7" cy="10" r="2"/><circle cx="17" cy="10" r="2"/><circle cx="10" cy="5" r="2"/><circle cx="14" cy="5" r="2"/><path d="M8 18c0-3 2-5 4-5s4 2 4 5-8 3-8 0z"/>',
  machahir: '<path d="M12 3l2.6 5.6 6 .7-4.5 4 1.3 6-5.4-3.1L6.6 19.3l1.3-6-4.5-4 6-.7z"/>',
  lmoudoun: '<path d="M3 21h18M5 21V9l5-3v15M10 21V4l9 4v13M13 10h3M13 14h3"/>',
  blayss: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  apps: '<rect x="2" y="7" width="20" height="10" rx="5"/><path d="M7 10v4M5 12h4M15.5 11h.01M17.5 13h.01"/>',
  aflam: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/>',
  lmihan: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18"/>',
  dar: '<path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-5h4v5"/>',
  objet: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  a3mar: '<path d="M5 21h14v-8H5zM5 16h14M12 13V9M12 6.5a1.5 1.5 0 0 1 0-3c0 1 1.5 1.5 0 3z"/>',
  tomobilat: '<path d="M5 17h14M3 17v-4l2-5h14l2 5v4"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/>',
  riyadat: '<circle cx="12" cy="12" r="9"/><path d="M12 7l4 3-1.5 5h-5L8 10z"/>',
  lmarkat: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>'
};

/* ---------- STYLE ---------- */
const css = `
#imposter .ip{max-width:460px;margin:0 auto;display:flex;flex-direction:column;gap:14px;min-height:100%}
#imposter .ip-title{font-size:26px;font-weight:800}
#imposter .ip-muted{color:var(--muted);font-size:14px}
#imposter .ip-card{border-radius:20px;border:1px solid var(--cardBorder);background:var(--card);backdrop-filter:blur(14px);box-shadow:var(--shadow);padding:16px}
#imposter .ip-mode{display:flex;align-items:center;gap:14px;cursor:pointer;transition:transform .15s}
#imposter .ip-mode:active{transform:scale(.98)}
#imposter .ip-ic{width:50px;height:50px;border-radius:15px;display:grid;place-items:center;flex:none;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 20px rgba(47,140,255,.3)}
#imposter .ip-ic svg{width:26px;height:26px}
#imposter .ip-mode h3{font-size:18px}#imposter .ip-mode p{font-size:13px;color:var(--muted)}
#imposter .ip-btn{display:block;width:100%;padding:15px;border:0;border-radius:15px;font:inherit;font-weight:700;font-size:15px;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 20px rgba(47,140,255,.35)}
#imposter .ip-btn.alt{background:var(--card);color:var(--text);border:1px solid var(--cardBorder);box-shadow:none}
#imposter .ip-btn:disabled{opacity:.45;cursor:default}
#imposter .ip-input{display:flex;align-items:center;gap:8px;padding:4px 6px 4px 14px;border-radius:13px;border:1px solid var(--cardBorder);background:var(--card)}
#imposter .ip-input input{flex:1;min-width:0;border:0;background:transparent;color:var(--text);font:inherit;font-size:15px;padding:9px 0;outline:none}
#imposter .ip-input button{width:34px;height:34px;border:0;border-radius:10px;background:transparent;color:var(--muted);font-size:16px;cursor:pointer}
#imposter .ip-add{background:none;border:0;color:var(--accent);font:inherit;font-weight:700;font-size:15px;text-align:left;cursor:pointer;padding:4px 2px}
#imposter .ip-step{display:flex;align-items:center;justify-content:space-between}
#imposter .ip-step .ctr{display:flex;align-items:center;gap:14px;font-size:22px;font-weight:800}
#imposter .ip-step .ctr button{width:38px;height:38px;border-radius:11px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-size:20px;cursor:pointer}
#imposter .ip-cats{display:grid;grid-template-columns:1fr 1fr;gap:9px}
#imposter .ip-cat{display:flex;align-items:center;gap:9px;padding:10px;border-radius:13px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font:inherit;font-size:13.5px;font-weight:600;cursor:pointer;text-align:left}
#imposter .ip-cat .ci{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:rgba(47,140,255,.12);color:var(--accent);flex:none}
#imposter .ip-cat .ci svg{width:16px;height:16px}
#imposter .ip-cat.on{border-color:var(--accent);background:rgba(47,140,255,.14)}
#imposter .ip-cat.on::after{content:"✓";margin-left:auto;color:var(--accent);font-weight:800}
#imposter .ip-cat.all{grid-column:1/3;justify-content:center}
#imposter .ip-center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:10px 0}
#imposter .ip-who{font-size:14px;color:var(--muted)}#imposter .ip-name{font-size:32px;font-weight:800;word-break:break-word}
#imposter .ip-flip{width:min(270px,100%);min-height:340px;border-radius:26px;cursor:pointer;user-select:none;-webkit-user-select:none;position:relative;transition:transform .25s}
#imposter .ip-flip:active{transform:scale(.97)}
#imposter .ip-back{position:absolute;inset:0;border-radius:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#fff;background:linear-gradient(145deg,var(--accent),#1557c0);box-shadow:0 18px 40px rgba(30,90,200,.35)}
#imposter .ip-back::after{content:"";position:absolute;inset:12px;border:2px dashed rgba(255,255,255,.35);border-radius:18px}
#imposter .ip-back svg{width:60px;height:60px}#imposter .ip-back b{font-size:17px}
#imposter .ip-face{min-height:340px;border-radius:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:22px 18px;background:var(--card);border:2px solid var(--accent);box-shadow:var(--shadow)}
#imposter .ip-chip{font-size:11px;font-weight:700;letter-spacing:1px;padding:5px 11px;border-radius:99px;background:rgba(47,140,255,.14);color:var(--accent);text-transform:uppercase}
#imposter .ip-word{font-size:32px;font-weight:800;color:var(--accent);line-height:1.15}
#imposter .ip-def{font-size:14px;color:var(--muted);line-height:1.5;border-top:1px solid var(--cardBorder);padding-top:12px;margin-top:4px}
#imposter .ip-face.imp{border-color:#ff5a7a}#imposter .ip-face.imp .ip-word{color:#ff5a7a}
#imposter .ip-face.imp svg{width:54px;height:54px;color:#ff5a7a}
#imposter .ip-pill{display:inline-flex;padding:6px 13px;border-radius:99px;background:rgba(47,140,255,.12);color:var(--accent);font-weight:700;font-size:13px}
#imposter .ip-big{font-size:64px;font-weight:800;line-height:1}
#imposter .ip-big svg{width:80px;height:80px;color:var(--accent)}
#imposter .ip-label{font-size:12px;font-weight:700;letter-spacing:1.4px;color:var(--muted)}
#imposter .ip-imp{display:flex;align-items:center;gap:12px;border-color:rgba(255,90,122,.4);width:100%}
#imposter .ip-av{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;background:#ff5a7a;flex:none}
#imposter .ip-err{color:#ff5a7a;font-size:13px;min-height:18px}
#imposter .ip-actions{display:flex;flex-direction:column;gap:10px;margin-top:auto}
`;
const styleEl = document.createElement("style");
styleEl.textContent = css;
document.head.appendChild(styleEl);

/* ---------- HELPERS ---------- */
const root = () => document.getElementById("imposter");
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rnd = (n) => Math.floor(Math.random() * n);
function render(html, after) { const r = root(); r.innerHTML = `<div class="ip">${html}</div>`; r.scrollTop = 0; if (after) after(r); }

function pickWord() {
  const cats = [...st.cats];
  const cat = cats[rnd(cats.length)];
  if (cat === "a3mar") {
    const age = 1 + rnd(150);
    const def = AGES.find(a => age >= a[0] && age <= a[1])[2];
    return { cat, w: age + (age === 1 ? " 3am" : " 3am"), d: def };
  }
  let list = DATA[cat].list.filter(x => !st.used.has(cat + x.w));
  if (!list.length) { DATA[cat].list.forEach(x => st.used.delete(cat + x.w)); list = DATA[cat].list; }
  const it = list[rnd(list.length)];
  st.used.add(cat + it.w);
  return { cat, w: it.w, d: it.d };
}

/* ---------- SCREENS ---------- */
function screenMode() {
  render(`
    <div class="ip-title">Imposter</div>
    <div class="ip-muted">Kifach bghiti tl3b?</div>
    <div class="ip-card ip-mode" data-go="online"><div class="ip-ic">${P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>')}</div><div><h3>Online</h3><p>Kol wa7d b telephone dyalo</p></div></div>
    <div class="ip-card ip-mode" data-go="offline"><div class="ip-ic">${P('<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>')}</div><div><h3>Offline</h3><p>Telephone wa7d m3a s7abek</p></div></div>
  `, r => {
    r.querySelector('[data-go="online"]').onclick = screenOnline;
    r.querySelector('[data-go="offline"]').onclick = screenNames;
  });
}

function screenOnline() {
  render(`<div class="ip-center"><div class="ip-big">:(</div><div class="ip-title">MZL MA KAYNA DB</div><div class="ip-muted">Online ghadi tzad 9rib.</div></div>
    <div class="ip-actions"><button class="ip-btn alt" id="ipBack">Rje3</button></div>`,
    r => r.querySelector("#ipBack").onclick = screenMode);
}

function screenNames() {
  const rows = st.players.map((n, i) => `<div class="ip-input"><input id="ipName${i}" data-i="${i}" value="${esc(n)}" placeholder="Smiya ${i + 1}" maxlength="20" autocomplete="off"><button data-del="${i}" aria-label="7iyed">✕</button></div>`).join("");
  render(`
    <div class="ip-title">Chkoun ghadi yl3b?</div>
    ${rows}
    <button class="ip-add" id="ipAdd">+ Zid wa7d</button>
    <div class="ip-card ip-step"><div><b>Imposters</b><div class="ip-muted" style="font-size:12px">Ch7al mn wa7d</div></div>
      <div class="ctr"><button id="ipMinus">−</button><span id="ipImps">${st.imps}</span><button id="ipPlus">+</button></div></div>
    <div class="ip-err" id="ipErr"></div>
    <div class="ip-actions"><button class="ip-btn" id="ipNext">Suivant</button></div>
  `, r => {
    r.querySelectorAll("input[data-i]").forEach(inp => inp.oninput = () => st.players[+inp.dataset.i] = inp.value);
    r.querySelectorAll("[data-del]").forEach(b => b.onclick = () => {
      if (st.players.length <= 3) { r.querySelector("#ipErr").textContent = "Khass 3 d l'nas 3l l'a9all"; return; }
      st.players.splice(+b.dataset.del, 1); fixImps(); screenNames();
    });
    r.querySelector("#ipAdd").onclick = () => { st.players.push(""); screenNames(); const l = root().querySelectorAll("input[data-i]"); l[l.length - 1].focus(); };
    r.querySelector("#ipMinus").onclick = () => { if (st.imps > 1) st.imps--; r.querySelector("#ipImps").textContent = st.imps; };
    r.querySelector("#ipPlus").onclick = () => { if (st.imps < st.players.length - 2) st.imps++; else r.querySelector("#ipErr").textContent = "Imposters khasshom ykouno 9el mn l'nas"; r.querySelector("#ipImps").textContent = st.imps; };
    r.querySelector("#ipNext").onclick = () => {
      const names = st.players.map(s => s.trim());
      if (names.some(n => !n)) { r.querySelector("#ipErr").textContent = "Ktb ga3 les smiyat (wla 7iyed li khawya)"; return; }
      st.players = names; fixImps(); screenCats();
    };
  });
}
function fixImps() { st.imps = Math.max(1, Math.min(st.imps, st.players.length - 2)); }

function screenCats() {
  const allOn = st.cats.size === ORDER.length;
  const btns = ORDER.map(k => `<button class="ip-cat${st.cats.has(k) ? " on" : ""}" data-c="${k}"><span class="ci">${P(ICONS[k])}</span>${CAT_NAMES[k]}</button>`).join("");
  render(`
    <div class="ip-title">Khtar sujet</div>
    <div class="ip-muted">L'kelma ghadi tkhrj mn hadou</div>
    <div class="ip-cats">${btns}<button class="ip-cat all${allOn ? " on" : ""}" id="ipAll">Kolchi</button></div>
    <div class="ip-err" id="ipErr"></div>
    <div class="ip-actions"><button class="ip-btn" id="ipGo">Suivant</button></div>
  `, r => {
    r.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { const k = b.dataset.c; st.cats.has(k) ? st.cats.delete(k) : st.cats.add(k); screenCats(); });
    r.querySelector("#ipAll").onclick = () => { st.cats = allOn ? new Set() : new Set(ORDER); screenCats(); };
    r.querySelector("#ipGo").onclick = () => { if (!st.cats.size) { r.querySelector("#ipErr").textContent = "Khtar sujet wa7d 3l l'a9all"; return; } startRound(); };
  });
}

function startRound() {
  const n = st.players.length, imps = new Set();
  while (imps.size < st.imps) imps.add(rnd(n));
  st.round = { ...pickWord(), imps, first: rnd(n) };
  st.idx = 0; st.shown = false; st.seen = false;
  screenReveal();
}

function screenReveal() {
  const i = st.idx, name = st.players[i], isImp = st.round.imps.has(i);
  const face = isImp
    ? `<div class="ip-face imp"><span class="ip-chip">Sujet: ${esc(CAT_NAMES[st.round.cat])}</span>${MASK}<div class="ip-word">Nta l'imposter</div><div class="ip-def">Ma3rfch l'kelma. 7awl tban 3adi!</div></div>`
    : `<div class="ip-face"><span class="ip-chip">${esc(CAT_NAMES[st.round.cat])}</span><div class="ip-word">${esc(st.round.w)}</div><div class="ip-def">${esc(st.round.d)}</div></div>`;
  render(`
    <div class="ip-center">
      <div class="ip-who">Dor dyal</div><div class="ip-name">${esc(name)}</div>
      <div class="ip-flip" id="ipFlip">${st.shown ? face : `<div class="ip-back">${MASK}<b>Brk bach tchouf</b></div>`}</div>
      <div class="ip-muted">${st.shown ? "Brk 3awtani bach tkhbbiha" : "Ma tkhllich chi wa7d ychouf!"}</div>
      <span class="ip-pill">${i + 1} / ${st.players.length}</span>
    </div>
    <div class="ip-actions"><button class="ip-btn" id="ipNext" ${st.seen && !st.shown ? "" : "disabled"}>${i === st.players.length - 1 ? "Bdaw l'game" : "Suivant"}</button></div>
  `, r => {
    r.querySelector("#ipFlip").onclick = () => { st.shown = !st.shown; if (st.shown) st.seen = true; screenReveal(); };
    r.querySelector("#ipNext").onclick = () => {
      if (st.idx < st.players.length - 1) { st.idx++; st.shown = false; st.seen = false; screenReveal(); }
      else screenStart();
    };
  });
}

function screenStart() {
  render(`
    <div class="ip-center"><div class="ip-big">${MASK}</div><div class="ip-title">Bdaw l'game!</div>
      <div class="ip-muted">Kol wa7d ygoul kelma 3la l'mawdou3, w mn b3d sotiw 3la l'imposter.</div>
      <span class="ip-pill">Ybda: ${esc(st.players[st.round.first])}</span></div>
    <div class="ip-actions"><button class="ip-btn" id="ipShow">Chkoun l'imposter?</button><button class="ip-btn alt" id="ipAgain">3awd l3b</button></div>
  `, r => {
    r.querySelector("#ipShow").onclick = screenResult;
    r.querySelector("#ipAgain").onclick = screenNames;
  });
}

function screenResult() {
  const list = [...st.round.imps].sort((a, b) => a - b).map(i => `<div class="ip-card ip-imp"><div class="ip-av">${esc(st.players[i].charAt(0).toUpperCase())}</div><b>${esc(st.players[i])}</b></div>`).join("");
  render(`
    <div class="ip-center">
      <div class="ip-label">${st.round.imps.size > 1 ? "L'IMPOSTERS KANO" : "L'IMPOSTER KAN"}</div>
      ${list}
      <div class="ip-card" style="width:100%;text-align:left"><div class="ip-label">L'KELMA KANT · ${esc(CAT_NAMES[st.round.cat])}</div>
        <div class="ip-word" style="font-size:24px;margin-top:4px">${esc(st.round.w)}</div>
        <div class="ip-muted" style="margin-top:6px;line-height:1.5">${esc(st.round.d)}</div></div>
    </div>
    <div class="ip-actions"><button class="ip-btn" id="ipAgain">3awd l3b</button><button class="ip-btn alt" id="ipMenu">Rje3 l l'menu</button></div>
  `, r => {
    r.querySelector("#ipAgain").onclick = screenNames;
    r.querySelector("#ipMenu").onclick = () => show("home");
  });
}

/* ---------- CONNECT M3A L'APP ---------- */
const baseShow = window.show;
window.show = function (id) {
  baseShow(id);
  if (id === "imposter") screenMode();
};

})();
