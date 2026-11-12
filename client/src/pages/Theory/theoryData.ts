export interface TheoryContent {
  sections: {
    heading?: string;
    paragraphs: string[];
    characterPortrait?: boolean;
  }[];
}

export const courseIntroductions: Record<string, TheoryContent> = {
  passwords: {
    sections: [
      {
        heading: "Tervetuloa tutustumaan salasanoihin!",
        paragraphs: [
          "Käyttäessäsi internetiä, salasanoja tarvitaan monissa paikoissa, kuten sähköpostissa, verkkopankissa, ja sosiaalisen median sekä verkkokauppojen käyttäjätunnuksissa. Salasanojen avulla pyritään varmistamaan, että vain sinä pääset käsiksi omiin tietoihisi.",
          "Salasanan valinta saattaa olla työlästä, ja on luonnollista päätyä sellaiseen, joka on itselle tuttu ja helppo muistaa. Lyhyet, tutut ja helposti pääteltävät salasanat voivat kuitenkin olla myös muiden arvattavissa. Onneksi salasanojen turvallisuutta voi parantaa melko pienillä muutoksilla.",
        ],
      },
      {
        heading: "Miksi sähköpostin salasana on erityisen tärkeä?",
        paragraphs: [
          "Sähköposti on yksi tärkeimmistä digitaalisista työkaluista. Sähköpostiin voi saapua viestejä esimerkiksi läheisiltä, viranomaisilta tai verkkokauppojen tilauksista. Sähköpostiosoitetta käytetään monien muiden palveluiden tunnuksena. Jos unohdat jonkin palvelun salasanan, voit saada sähköpostiisi ohjeet salasanan vaihtamiseen.",
          "Sähköpostin avulla pystyy myös kirjautumaan suoraan moniin muihin palveluihin luomatta erillistä tunnusta. Tällainen kirjautuminen eroaa uuden käyttäjän luomisesta siten, että kirjautuminen tapahtuu toisen palvelun, eli sähköpostin, tunnuksilla. Tämä voi tehdä kirjautumisesta helpompaa, mutta jos sähköpostitilisi salasana on heikko, voi se vaarantaa myös muiden palveluiden turvallisuuden.",
          "Jos joku pääsee sähköpostitiliisi käsiksi, hänellä on mahdollisuus vaihtaa myös muiden käyttämiesi palveluiden salasanoja. Siksi sähköpostin salasanan tulee olla vahva ja sellainen, jota ei käytetä missään muussa palvelussa.",
        ],
      },
      {
        heading: "Millainen on hyvä salasana?",
        paragraphs: [
          "Hyvä salasana yhdistää seuraavia ominaisuuksia: pituus, arvaamattomuus, vaihtelevuus ja yksilöllisyys.",
          "Pituus: salasana on riittävän pitkä, tavoitteena 15 merkkiä. Pidemmät salasanat ovat vaikeampia murtaa.",
          "Arvaamattomuus: salasana ei sisällä helposti arvattavia sanoja tai numerosarjoja, kuten henkilöiden tai palveluiden nimiä.",
          "Vaihtelevuus: salasana sisältää erilaisia merkkejä, kuten isoja ja pieniä kirjaimia, numeroita ja erikoismerkkejä.",
          "Yksilöllisyys: salasana on ainutlaatuinen, eikä sitä käytetä muissa palvelussa.",
          "Pitkän salasanan ei tarvitse olla vaikea muistaa. Esimerkiksi useamman toisistaan riippumattoman sanan yhdistäminen voi auttaa muodostamaan pitkän ja helposti muistettavan salasanan.",
          "Huom: jotkin palvelut eivät hyväksy esimerkiksi välilyöntejä salasanoissa. Tällöin voit käyttää esimerkiksi väliviivaa tai muuta merkkiä sanojen erottamiseen.",
        ],
      },
    ],
  },
  phishing: {
    sections: [
      {
        heading: "Tervetuloa tutkimaan epäilyttäviä viestejä!",
        paragraphs: [
          "Sähköpostiin ja puhelimeen saapuu päivittäin monenlaisia viestejä. Suurin osa niistä on tavallisia sukulaisten ja palveluiden yhteydenottoja. Viestien joukossa voi kuitenkin olla myös sellaisia, joilla yritetään huijata vastaanottajaa.",
          "Tällä kurssilla opit tunnistamaan epäilyttäviä viestejä ja harjoittelet, miten niiden kanssa kannattaa toimia. Jo muutaman tunnusmerkin tietäminen voi auttaa sinua asioimaan verkossa turvallisemmin.",
        ],
      },
      {
        heading: "Mitä on tietojenkalastelu?",
        paragraphs: [
          "Tietojenkalastelu (englanniksi phishing) on yleistä huijaustoimintaa, jossa rikollinen yrittää huijata ihmisiä antamaan henkilökohtaisia tietojaan, kuten salasanoja tai pankkitunnuksia, esiintymällä luotettavana tahona.",
          "Tietojenkalastelun nimi tulee siitä, että huijarit ikään kuin käyttävät kalastajien tapaan syöttiä napatakseen kohteensa. Huijaaminen voi tapahtua esimerkiksi sähköpostitse, tekstiviestillä tai sosiaalisen median kautta tulevalla viestillä, jossa pyydetään toimimaan tietyllä tavalla.",
          "Tyypillisesti huijausviestissä on linkki, jota painamalla vastaanottaja ohjataan väärennetylle verkkosivustolle. Sivustolla pyydetään tietoja, jotka liittyvät itse huijausviestissä esitettyyn pyyntöön, kuten salasanoja tai muita tunnuksia.",
          "Vaikka oma salasana olisi pitkä ja vaikeasti arvattava, se ei suojaa käyttäjätiliä, jos salasana päätyy huijarin tietoon.",
        ],
      },
      {
        heading: "Epäilyttävän viestin tunnistaminen",
        paragraphs: [
          "Huijarit hyödyntävät ihmisten luottamusta, tunteisiin vetoamista, sekä taipumusta tehdä nopeita päätöksiä. Viesti voi esimerkiksi uhata palvelun sulkemisella, jos vastaanottaja ei toimi välittömästi viestin ohjeiden mukaan. Tällaisissa tilanteissa on hyvä muistaa, että kiire ei ole hyvä neuvonantaja: pysähtyminen ja asian huolellinen tarkistaminen voivat estää huijauksen onnistumisen. Oikeat palvelut eivät koskaan pyydä sinua lähettämään tunnuksiasi tekstiviestillä, sähköpostitse tai puhelussa.",
          "Tyypillisiä huijausviestin aiheita ovat esimerkiksi ajankohtaiset tapahtumat sekä läheisiin ihmisiin liittyvät viestit. Huijari voi esimerkiksi lähettää viestin, joka vaikuttaa paketin saapumisilmoitukselta. Viesti voi olla uskottava, jos viestin vastaanottaja tosiaan odottaa pakettia. Huijausviesti voi myös näyttää tulevan sukulaiselta, joka kertoo tarvitsevansa kiireellisesti apua esimerkiksi uudesta puhelinnumerosta. Tällaisilla viesteillä pyritään herättämään huolta vastaanottajassa, jotta hän toimisi viestissä pyydetyllä tavalla.",
          "On huomioitava, että tekoälyn lisääntyvällä käytöllä on suuri vaikutus tietojenkalastelun uskottavuuteen: sen avulla on mahdollista luoda hyvin aidoilta vaikuttavia huijaussivustoja ja uskottavan kuuloisia viestejä monilla kielillä, joten pelkästään kirjoitusvirheistä ei voi enää tunnistaa huijausviestiä. Uskottavan tuntuisen huijauksen tunnistamisessa voi pohtia, mitä viestissä pyydetään tekemään ja millaiseen sävyyn.",
        ],
      },
      {
        heading: "Muita huijausviestin merkkejä",
        paragraphs: [
          "Tässä on muita merkkejä mahdollisesta huijausviestistä, joita kannattaa pohtia vastaanottaessaan viestiä:",
          "Odottamaton viesti: Viesti ei liity omaan viimeaikaiseen toimintaan. Viestissä voidaan esitellä arvontavoittona saatavaa rahasummaa, joka ilmestyy tilille linkkiä painaessa ja maksukortin tiedot syötettyään. Tällaisessa tilanteessa on syytä epäillä voiton aitoutta, jos ei ole osallistunut arvontoihin.",
          'Epätavallinen lähettäjän sähköpostiosoite: Tällainen viesti voi väittää tulevansa esimerkiksi pankilta, mutta lähettäjän sähköpostiosoite ei liity pankkipalveluihin. Osoite voi myös olla hyvin samankaltainen kuin oikea osoite, mutta pieni ero voi paljastaa huijauksen, esimerkiksi "microsoft.com" ja "rnicrosoft.com".',
          "Avun pyytämisen estäminen: Huijari voi esittää syitä, miksi viestistä kertominen jollekin muulle olisi huono ajatus. Huijari yrittää näin jättää kohteensa toimimaan omien tietojensa varassa, sekä pyrkii vähentämään huijauksen paljastumisen mahdollisuutta.",
          "Linkit vievät eri osoitteeseen kuin mitä viestissä kerrotaan: tietokoneella linkin todellisen osoitteen voi yleensä nähdä viemällä hiiren osoittimen linkin päälle itse linkkiä painamatta.",
          "Odottamattomat liitteet: viestin mukana voi tulla esimerkiksi tiedosto, jonka avaaminen voi asentaa haittaohjelman laitteelle. Liitteitä ei kannata avata, jos viesti on vähänkään epäilyttävä.",
        ],
      },
    ],
  },
  "financial-fraud": {
    sections: [
      {
        heading: "Tervetuloa pohtimaan luottamusta verkossa!",
        paragraphs: [
          "Verkon välityksellä on entistä helpompaa tutustua uusiin ihmisiin, ja tutustua itselleen uusiin aiheisiin, kuten sijoittamiseen. Uudet tuttavuudet ja houkuttelevat tarjoukset voivat herättää innostusta, mutta verkossa voi myös kohdata henkilöitä, jotka yrittävät hyödyntää muiden luottamusta saadakseen itselleen rahallista hyötyä.",
          "Huijarit voivat esimerkiksi kehua ja imarrella vastaanottajaa tai osoittaa erityistä kiinnostusta häntä kohtaan luottamuksen saavuttamiseksi. Tällaiset keinot voivat saada huijarin vaikuttamaan ystävälliseltä ja luotettavalta.",
          "Onneksi jo muutaman huijauksille tyypillisen toimintatavan tunteminen voi auttaa tunnistamaan epäilyttäviä tilanteita. Uusiin ihmisiin ja mahdollisuuksiin voi suhtautua avoimesti, mutta samalla on hyvä muistaa vanha sanonta: jos jokin vaikuttaa liian hyvältä ollakseen totta, se tuskin on totta.",
        ],
      },
      {
        heading: "Mitä ovat sijoitushuijaukset?",
        paragraphs: [
          "Sijoitushuijaukset ovat huijauksia, joissa huijari tavoittelee taloudellista hyötyä houkuttelemalla ihmisiä sijoittamaan rahaa kohteeseen, jota ei välttämättä ole olemassa. Todellisuudessa rahat päätyvät huijarin taskuihin, eivätkä sijoittajat saa rahojaan enää takaisin.",
          'Huijari voi esittää olevansa sijoitusalan ammattilainen, ja hän voi käyttää hyväkseen kohteensa luottamusta ja tietämättömyyttä sijoittamisesta. Huijari voi käyttää "sijoittajien" houkuttelemiseen esimerkiksi epärealistisen suuruisia tuottoja ja riskittömyyttä, väittää sijoituksen olevan juuri kohteelle suunnattu ainutkertainen mahdollisuus, tai esitellä väärennettyjä tietoja sijoituksen arvon kasvusta. Näin sijoitusmahdollisuus voidaan saada vaikuttamaan turvalliselta ja kannattavalta.',
          "Sijoitushuijauksia voidaan levittää esimerkiksi sosiaalisessa mediassa, verkkomainoksissa tai henkilökohtaisten yhteydenottojen kautta. Huijausten kohteeksi voi joutua kuka tahansa iästä tai sijoituskokemuksesta riippumatta. Huijarit voivat hyödyntää esimerkiksi ihmisten kiinnostusta sijoittamiseen tai halua parantaa omaa taloudellista tilannettaan.",
        ],
      },
      {
        heading: "Mitä ovat romanssihuijaukset?",
        paragraphs: [
          "Romanssihuijaukset ovat huijausten muoto, jossa huijari tavoittelee taloudellista hyötyä hyväksikäyttämällä näennäisesti romanttista suhdettaan kohteensa kanssa. Huijari voi tutustumisvaiheessa esiintyä romanttisesta suhteesta kiinnostuneena henkilönä, vaikka hänen todellinen tavoitteensa on hyötyä kohteestaan rahallisesti.",
          "Romanssihuijaukset alkavat nykyään usein internetissä, esimerkiksi seuranhakupalveluissa tai sosiaalisessa mediassa, ja kuten sijoitushuijaukset, romanssihuijaukset kohdistuvat kaikkiin ikäluokkiin. Huijari voi käyttää itsestään väärää nimeä, kuvia tai muita tietoja, kuten ammattia, vaikuttaakseen luotettavalta.",
          "Kun luottamus on syntynyt, huijari voi kertoa tarvitsevansa rahaa esimerkiksi matkustaakseen tavatakseen uutta tuttavuuttaan, tai jouduttuaan yllättävään vaikeuteen, kuten sairastuneensa äkillisesti. Huijari voi myös yrittää saada kohteensa tuntemaan syyllisyyttä tai painostaa kohdettaan, jos tämä ei suostu auttamaan rahallisesti.",
        ],
      },
      {
        heading: "Kurssin tehtävät",
        characterPortrait: true,
        paragraphs: [
          "Tässä johdannossa tutustutaan sijoitus- ja romanssihuijauksiin, ja varsinainen harjoittelu alkaa kurssin seuraavissa osioissa. Harjoituksissa pääset seuraamaan Raijan (kuva alapuolella) ja hänen ystävänsä Simon tilanteita: Raija on tutustunut uuteen kiinnostavaan ihmiseen, kun taas Simo on saanut houkuttelevan sijoitustarjouksen. Kurssin edetessä pääset auttamaan heitä pohtimaan, miten erilaisissa tilanteissa kannattaisi toimia. ",
        ],
      },
    ],
  },
};

export const passwordTheory: TheoryContent = {
  sections: [
    {
      heading: "Miten kaikki salasanat voi muistaa?",
      paragraphs: [
        "Kun käytössä on useita verkkopalveluita, myös salasanoja kertyy paljon. Jokaisessa palvelussa tulisi käyttää eri salasanaa, mutta pitkien ja erilaisten salasanojen muistaminen voi olla vaikeaa, varsinkin jos ne ovat sellaisia, joiden sisältöä ei voi helposti päätellä. Kaikkia salasanoja ei kuitenkaan tarvitse opetella ulkoa!",
        "Salasanojen muistamiseen ja säilyttämiseen on erilaisia apukeinoja. Voit esimerkiksi kirjoittaa salasanasi muistivihkoon tai käyttää salasanojen hallintaohjelmaa.",
      ],
    },
    {
      heading: "Salasanojen kirjoittaminen paperille",
      paragraphs: [
        "Paperille kirjoittaminen voi olla turvallinen tapa säilyttää salasanoja: pitkien ja vahvojen salasanojen kirjoittaminen paperille on useimmiten turvallisempaa kuin lyhyiden ja helposti muistettavien (ja sitä kautta arvattavien) salasanojen käyttäminen uudelleen.",
        "Jos päätät kirjoittaa salasanasi muistiin, säilytä niitä turvallisessa paikassa kotonasi, esimerkiksi laatikossa tai kaapissa, johon ulkopuolisilla ei ole pääsyä. Älä jätä salasanoja näkyville niihin liittyvän laitteen, esimerkiksi tietokoneen, viereen. Ei myöskään ole suositeltavaa säilyttää salasanoja samassa paikassa sellaisten laitteiden kanssa, jotka voivat helposti joutua vääriin käsiin, esimerkiksi kannettavan tietokoneen kansien välissä.",
      ],
    },
    {
      heading: "Salasanojen hallintaohjelmat",
      paragraphs: [
        "Salasanojen hallintaohjelmat ovat sovelluksia, joiden avulla voit tallentaa salasanojasi turvallisesti yhteen paikkaan. Näin sinun ei tarvitse muistaa kaikkia salasanojasi erikseen.",
        "Hallintaohjelmat voivat myös luoda puolestasi pitkiä ja vaikeasti arvattavia salasanoja sekä täyttää niitä automaattisesti kirjautumisen yhteydessä. Useimpia hallintaohjelmia voi käyttää sekä tietokoneella että puhelimella.",
        "Hallintaohjelmaan pääsee yleensä yhdellä pääsalasanalla, jonka avulla muut tallennetut salasanat pysyvät suojattuina. Siksi pääsalasanaksi suositellaan erityisen vahvaa salasanaa, jota ei käytetä missään muualla.",
        "On suositeltavaa käyttää vain tunnettuja salasanojen hallintaohjelmia, jotka ovat todistetusti luotettavia ja turvallisia. Tunnetuimmat sovellukset löytyvät verkosta helposti, ja niistä on saatavilla arvosteluja ja ohjeita.",
        "Myös verkkoselaimissa, kuten Google Chromessa ja Microsoft Edgessä, on usein omat salasanojen hallintaohjelmansa. Ne voivat olla käteviä, sillä ne tallentavat salasanat yhdellä klikkauksella. Selainten salasananhallinta on kuitenkin riippuvaista verkkoselaimesta: jos vaihdat verkkoselainta, toisessa selaimessa tallennetut salasanat eivät ole käytössä. Verkkoselainten salasananhallinta ei myöskään ole yhtä turvallista kuin erilliset hallintaohjelmat, sillä selaimen salasanoihin pääsee helpommin käsiksi.",
      ],
    },
    {
      heading: "Kaksivaiheinen tunnistautuminen",
      paragraphs: [
        "Kaksivaiheinen tunnistautuminen on tapa suojata käyttäjätiliä salasanan lisäksi toisella varmistuksella. Kirjautumisen yhteydessä palvelu, kuten sähköposti, voi esimerkiksi pyytää sinua syöttämään puhelimeesi lähetetyn koodin tai hyväksymään kirjautumisen puhelimen sovelluksessa.",
        "Kaksivaiheinen tunnistautuminen parantaa käyttäjätilisi turvallisuutta, sillä pelkkä salasana ei näin riitä kirjautumiseen. Vaikka kaksivaiheisuus voi tuntua työläältä, se kannattaa ottaa käyttöön erityisesti tärkeissä palveluissa, kuten sähköpostissa.",
        "Jos saat puhelimeesi kirjautumispyynnön, jota et itse ole aloittanut, älä hyväksy sitä. Myös kirjautumisen vahvistuskoodit kannattaa pitää vain omana tietonaan.",
      ],
    },
  ],
};

export const phishingTheory: TheoryContent = {
  sections: [
    {
      heading: "Epäilyttävän viestin vastaanottaminen",
      paragraphs: [
        "Jos saat viestin, joka herättää epäilystä, älä kiirehdi toimimaan viestin pyyntöjen mukaisesti. Vältä viestissä olevien linkkien ja liitetiedostojen avaamista äläkä vastaa viestiin. Monessa sähköpostissa on mahdollisuus merkitä viesti roskapostiksi ja/tai tietojenkalasteluksi, jolloin viesti siirtyy roskapostikansioon, ja sähköposti voi siirtää vastaavat viestit jatkossa roskapostiin itsestään.",
        "Linkkien avaamisen sijaan voit hyödyntää verkkoselaimesi kirjanmerkkejä tai älypuhelimen sovelluksia: jos olet tallentanut palvelun oikean verkko-osoitteen kirjanmerkiksi selaimeen tai asentanut palvelun puhelinsovelluksen, voit siirtyä palveluun tätä kautta ja varmistaa viestin aiheellisuuden.",
        "Jos saat läheiseltäsi poikkeuksellisen viestin oudosta puhelinnumerosta, voit varmistaa viestin aitouden ottamalla häneen yhteyttä esimerkiksi ennestään tuttuun puhelinnumeroon. Jos et tavoita läheistäsi, voit kysyä asiasta myös muilta yhteisiltä tutuilta. Älä noudata viestin ohjeita ennen kuin olet varmistanut, että viesti todella on läheiseltäsi.",
      ],
    },
    {
      heading: "Entä jos olen jo antanut tietojani?",
      paragraphs: [
        "Jos olet antanut väärennetylle sivustolle salasanasi, vaihda se mahdollisimman pian kyseisen palvelun oikealla verkkosivustolla tai sovelluksessa. Jos olet käyttänyt samaa salasanaa muilla sivustoilla, vaihda salasana myös niissä.",
        "Jos olet antanut pankkitunnuksesi tai maksukorttisi tiedot tai lähettänyt rahaa huijarille, ota mahdollisimman nopeasti yhteyttä pankkiisi sen virallisen puhelinnumeron kautta. Pankki voi auttaa estämään tunnusten tai korttien väärinkäytön ja mahdollisesti estämään huijaukseen liittyvät tilitapahtumat.",
        "Huijauksesta kannattaa tehdä rikosilmoitus poliisille. Lisäksi tapahtuneesta voi ilmoittaa Traficomin Kyberturvallisuuskeskukselle, jotta he osaavat tiedottaa ajankohtaisista huijausilmiöistä. Rikosuhripäivystys (RIKU) tarjoaa myös verkkohuijausten kohteiksi joutuneille tukea ja käytännön neuvoja.",
      ],
    },
    {
      heading: "Huijauksen kohteeksi joutumista ei tarvitse hävetä",
      paragraphs: [
        "Huijausviestit voivat olla nykyisin hyvinkin uskottavia, ja kuka tahansa voi erehtyä luottamaan sellaiseen. Jos huomaat joutuneesi huijatuksi, tapahtunutta ei tarvitse hävetä, eikä asian kanssa tarvitse jäädä yksin.",
        "Tapahtumasta voi kertoa esimerkiksi läheiselle tai muulle luotettavalle henkilölle. Voitte yhdessä selvittää tapahtunutta, ja toinen henkilö voi auttaa sinua tarvittavissa asioissa, kuten salasanojen vaihtamisessa. Avun pyytäminen on järkevä tapa toimia!",
        "Huijauksesta ilmoittaminen auttaa myös muita: jos poliisi saa tietoa tapahtuneista huijauksista, se voi edistää verkkorikosten selvittämistä ja samanlaisten huijausten tunnistamista jatkossa.",
      ],
    },
  ],
};

export const investmentTheory: TheoryContent = {
  sections: [
    {
      heading: "Miksi sijoitushuijaukset voivat onnistua?",
      paragraphs: [
        "Sijoittamisessa on luonnollista toivoa, että omille säästöilleen saisi hyvää tuottoa. Jos tarjolla vaikuttaa olevan erityisen kannattava mahdollisuus, siihen voi olla houkuttelevaa tarttua. Huijarit voivat hyödyntää tätä innostusta ja luoda tunteen siitä, että hyvään tilaisuuteen kannattaa tarttua nopeasti.",
        "Huijari voi myös pyrkiä rakentamaan henkilökohtaista luottamusta esimerkiksi ystävällisellä käytöksellä, kehumisella ja tarjoamalla apua sijoittamisen aloittamiseen. Hän saattaa olla yhteydessä säännöllisesti ja vastata kysymyksiin vakuuttavasti, jolloin hänestä voi vähitellen muodostua kuva luotettavana neuvonantajana.",
        "Kun sijoitustarjous tuntuu lupaavalta ja sen esittäjä luotettavalta, mahdollisia varoitusmerkkejä ei välttämättä tule huomanneeksi. Sijoitushuijarit käyttävät hyväkseen inhimillistä luottamusta, minkä vuoksi myös sijoittamiseen perehtynyt henkilö voi joutua huijauksen kohteeksi.",
        "Huijausten tunnistamista voi vaikeuttaa myös liiallinen luottamus omiin taitoihin: Jos uskoo pystyvänsä tunnistamaan huijauksen helposti, epäilyttäviin merkkeihin ei välttämättä tule kiinnittäneeksi yhtä paljon huomiota. Huijaukset voivat kuitenkin olla hyvin uskottavia, eikä aiempi kokemus tai hyvä tietämys välttämättä riitä niiden tunnistamiseen.",
      ],
    },
    {
      heading: "Millaisista merkeistä sijoitushuijauksen voi tunnistaa?",
      paragraphs: [
        "Sijoitushuijauksissa päätöksenteossa pyritään usein aiheuttamaan kiirettä esimerkiksi väittämällä, että sijoitusmahdollisuus on tarjolla vain lyhyen aikaa. Vastaanottajalle pyritään näin luomaan mielikuva, että hänen olisi suostuttava nopeasti eikä siten käyttäisi aikaa tarjouksen harkitsemiseen tai sijoituskohteen taustojen selvittämiseen.",
        "Epäilyksiä voi herättää myös se, jos sijoituksen tarjoaja välttelee kysymyksiä, ei kerro selkeästi sijoituksen riskeistä tai painostaa sijoittamaan lisää rahaa. Huijari voi myös pyrkiä estämään asiasta keskustelemisen läheisten kanssa esimerkiksi väittämällä tarjouksen olevan salainen. Epäilyttävää voi olla myös se, jos sijoituksen tarjoaja haluaa siirtää keskustelun pois alkuperäisestä palvelusta esimerkiksi yksityiseen viestisovellukseen.",
        "Sijoitushuijauksen tunnistaminen ei aina ole helppoa, sillä huijari voi vaikuttaa asiantuntevalta ja sijoitukseen liittyvät asiakirjat voivat näyttää aidoilta. Siksi sijoituspalvelun luotettavuutta ei kannata arvioida pelkästään sen ulkoasun tai sitä tarjoavan henkilön perusteella. Huomionarvoista on se, ettei sijoituksen tarjoajan ystävällisyys tai kiinnostuneisuus ole yksistään merkkejä huijauksesta, vaan tärkeämpää on pohtia tarjouksen esittämistä kokonaisuutena. ",
      ],
    },
    {
      heading: "Miten sijoitushuijaus etenee?",
      paragraphs: [
        "Sijoitushuijaus voi alkaa pienellä rahasummalla, jonka huijari pyytää sijoittamaan. Sijoituksen arvo saattaa näyttää kasvavan nopeasti huijarin tarjoamalla verkkosivustolla. Sivustolla näkyvät tuotot voivat kuitenkin olla täysin keksittyjä, ja niiden tarkoituksena on saada sijoittaja luottamaan palveluun.",
        "Kun sijoitus näyttää tuottavan hyvin, huijari voi kannustaa sijoittamaan lisää rahaa. Hän voi esimerkiksi kertoa uudesta sijoitusmahdollisuudesta tai väittää, että suuremmalla summalla voisi saada vielä parempaa tuottoa. Joissakin huijauksissa sijoittajalle voidaan myös palauttaa aluksi pieni summa rahaa luottamuksen vahvistamiseksi.",
        "Huijaus voi paljastua vasta silloin, kun sijoittaja yrittää nostaa rahojaan takaisin. Huijari voi esimerkiksi vaatia maksamaan ylimääräisiä veroja tai palvelumaksuja ennen rahojen palauttamista. Näidenkin maksujen tarkoituksena voi olla saada huijauksen kohteelta lisää rahaa.",
      ],
    },
    {
      heading: "Mistä apua sijoitushuijauksen kohteeksi joutuneelle?",
      paragraphs: [
        "Jos epäilet joutuneesi sijoitushuijauksen kohteeksi, lopeta rahansiirrot ja yhteydenpito epäiltyyn huijariin. Jos olet jo lähettänyt rahaa, ota mahdollisimman nopeasti yhteyttä pankkiisi sen virallisten yhteystietojen kautta. Pankki voi auttaa estämään uusia rahansiirtoja ja selvittämään, onko jo lähetettyjä rahoja mahdollista saada takaisin.",
        "Huijauksesta kannattaa tehdä rikosilmoitus poliisille, vaikka menetettyjä rahoja ei saataisikaan takaisin. Säilytä huijaukseen liittyvät viestit, maksutositteet ja muut mahdolliset todisteet esimerkiksi kuvankaappauksina. Ole myös varovainen, jos joku myöhemmin lupaa palauttaa menettämäsi rahat maksua vastaan, sillä kyseessä voi olla uusi huijaus.",
        "Jos olet antanut huijarille salasanojasi tai muita kirjautumistietojasi, vaihda ne mahdollisimman pian kyseisten palveluiden oikeilla verkkosivustoilla tai sovelluksissa. Jos sama salasana on käytössä myös muissa palveluissa, vaihda se myös niissä. Näin voit vähentää mahdollisuutta, että huijari pääsisi käsiksi muihin käyttäjätileihisi.",
        "Sijoitushuijauksen kohteeksi joutuminen voi aiheuttaa taloudellisen menetyksen lisäksi pettymystä, huolta ja häpeää. Huijaukseen voi kuitenkin joutua kuka tahansa, eikä tapahtuneen kanssa tarvitse jäädä yksin. Tilanteesta kannattaa keskustella läheisen tai muun luotettavan henkilön kanssa. Myös Rikosuhripäivystys (RIKU) tarjoaa maksutonta tukea ja käytännön neuvoja rikoksen kohteeksi joutuneille.",
      ],
    },
  ],
};

export const romanceTheory: TheoryContent = {
  sections: [
    {
      heading: "Miksi romanssihuijaukset onnistuvat?",
      paragraphs: [
        "Onnistuakseen romanssihuijarit hyödyntävät ihmisten tunteita, kuten ihastumista, luottamusta ja halua auttaa muita. Huijari voi esimerkiksi lähettää päivittäin romanttisia viestejä, kehua uutta tuttavuuttaan ja osoittaa kiinnostusta tämän elämää kohtaan. Tällainen huomio voi saada suhteen tuntumaan läheiseltä ja tärkeältä.",
        "Romanssihuijarit voivat pyrkiä lähestymään erityisesti ihmisiä, jotka kaipaavat uusia ihmissuhteita tai läheisyyttä elämäänsä. Esimerkiksi avioeron tai puolison menettämisen jälkeen uusi tuttavuus voi tuntua erityisen merkitykselliseltä. Huijari voi hyödyntää tätä osoittamalla runsaasti kiinnostusta ja tarjoamalla seuraa sekä huomiota.",
        "Huijari voi myös pyrkiä vahvistamaan luottamusta kertomalla omasta elämästään, tekemällä yhteisiä tulevaisuudensuunnitelmia tai lupaamalla lahjoja. Kun suhde tuntuu merkitykselliseltä, toisen henkilön kertomuksia voi olla vaikeampi epäillä. Huijarin tarkoituksena on saada toinen luottamaan häneen niin paljon, että tämä suostuu myöhemmin myös rahallisiin pyyntöihin.",
        "Uusiin ihmisiin tutustuessa on luonnollista toivoa toisesta hyvää ja luottaa hänen vilpittömyyteensä. Romanssihuijarit käyttävät tätä luottamusta hyväkseen rakentamalla läheiseltä vaikuttavan suhteen ja vetoamalla toisen tunteisiin. Siksi huijauksen kohteeksi voi joutua kuka tahansa.",
      ],
    },
    {
      heading: "Millaisista merkeistä romanssihuijauksen voi tunnistaa?",
      paragraphs: [
        "Romanssihuijaukseen voi viitata esimerkiksi se, että uusi tuttavuus alkaa puhua voimakkaista tunteista hyvin nopeasti tai vaatii jatkuvaa yhteydenpitoa. Hänen kertomuksissaan voi myös esiintyä ristiriitaisuuksia, kuten muuttuvia tietoja työpaikasta tai asuinpaikasta. Joskus huijari voi vältellä kasvokkain tapaamista ja keksiä toistuvasti esteitä sovituille tapaamisille.",
        "Huijari voi myös yrittää vaikuttaa siihen, kenelle suhteesta kerrotaan. Hän saattaa esimerkiksi pyytää pitämään suhteen salassa tai väittää, etteivät läheiset ymmärtäisi sitä. Näin huijari voi pyrkiä estämään muita ihmisiä huomaamasta epäilyttäviä piirteitä suhteessa.",
        "Yksittäinen merkki ei kuitenkaan automaattisesti tarkoita keskustelun vastapuolen olevan huijari. Tärkeämpää on huomioida useampia merkkejä yhdessä ja tarkastella keskustelua kokonaisuutena, sekä sitä, miten uusi tuttavuus suhtautuu epäilyksiin, kysymyksiin ja omiin päätöksiisi.",
      ],
    },
    {
      heading: "Millaisia rahapyyntöjä romanssihuijauksiin liittyy?",
      paragraphs: [
        "Romanssihuijauksissa rahaa voidaan pyytää monella eri tavalla. Tavallisen tilisiirron sijaan huijari voi esimerkiksi pyytää ostamaan lahjakortteja ja lähettämään niiden numerot ja koodit. Lahjakortin arvon voi käyttää näiden tietojen avulla ilman, että itse korttia tarvitsee lähettää kenellekään. Näin huijari voi saada rahaa tavalla, jota on vaikea jäljittää.",
        "Rahapyynnöt liittyvät usein yllättäviin vaikeuksiin, joihin huijari kertoo tarvitsevansa kiireellisesti apua. Jos toinen ei suostu lähettämään rahaa, huijari voi vedota tämän tunteisiin tai yrittää saada hänet tuntemaan syyllisyyttä. Hän voi esimerkiksi väittää, ettei toinen todella välitä hänestä, jos ei suostu auttamaan.",
        "Joskus huijari voi myös houkutella uutta tuttavuuttaan sijoittamaan rahaa hänen suosittelemaansa palveluun. Tällöin romanssihuijaus yhdistyy sijoitushuijaukseen, jossa luottamusta ja läheistä suhdetta käytetään sijoittamiseen houkuttelemisessa.",
      ],
    },
    {
      heading: "Mistä apua romanssihuijauksen kohteelle?",
      paragraphs: [
        "Romanssihuijauksesta voi aiheutua sekä taloudellista että henkistä vahinkoa. Rahojen menettämisen lisäksi voi olla raskasta huomata, ettei läheiseksi ja tärkeäksi muodostunut ihminen ollutkaan se, joka hän väitti olevansa. Vaikka suhde olisi perustunut huijaukseen, sen aikana koetut tunteet ovat voineet olla täysin aitoja.",
        "Jos epäilet joutuneesi romanssihuijauksen kohteeksi, lopeta yhteydenpito epäiltyyn huijariin ja säilytä keskustelut sekä muut tapahtumaan liittyvät tiedot. Jos olet lähettänyt rahaa, ota mahdollisimman nopeasti yhteyttä pankkiisi ja tee tapahtuneesta rikosilmoitus poliisille. Tapahtuneesta on tärkeää myös keskustella läheisen tai muun luotettavan henkilön kanssa. Hän voi tarjota kuuntelevaa tukea ja auttaa tarvittaessa esimerkiksi rikosilmoituksen tekemisessä.",
        "Jos olet antanut huijarille salasanojasi tai muita henkilökohtaisia tietojasi, vaihda ne mahdollisimman nopeasti kyseisten palveluiden verkkosivustoilla tai sovelluksissa. Jos sama salasana on käytössä myös muissa palveluissa, vaihda se myös niissä. Näin voit vähentää mahdollisuutta, että huijari pääsisi käsiksi muihin käyttäjätileihisi.",
        "Huijaukseen joutumista ei tarvitse hävetä, eikä tapahtuneesta tarvitse selviytyä yksin. Läheisten lisäksi tukea voi saada esimerkiksi Rikosuhripäivystyksestä (RIKU). Myös Nettideittiturvan verkkosivuilta löytyy maksutonta omatukimateriaalia, joka auttaa käsittelemään tapahtunutta ja siihen liittyviä tunteita. Huijauksesta on mahdollista toipua, vaikka se veisi aikaa.",
      ],
    },
  ],
};
