export interface TheoryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface TheoryContent {
  characterName?: string;
  sections: {
    heading?: string;
    paragraphs: string[];
    image?: TheoryImage;
  }[];
}

export const courseIntroductions: Record<string, TheoryContent> = {
  passwords: {
    sections: [
      {
        heading: "Tervetuloa tutustumaan salasanoihin!",
        paragraphs: [
          "Käyttäessäsi internetiä, salasanoja tarvitaan monissa paikoissa, kuten sähköpostissa, verkkopankissa, ja sosiaalisen median sekä verkkokauppojen käyttäjätunnuksissa. Salasanojen avulla pyritään varmistamaan, että vain sinä pääset käsiksi omiin tietoihisi. Salasanat ovat siis tärkeä osa yksityisyyttäsi ja turvallisuuttasi verkossa.",
          "Salasanan valinta saattaa olla työlästä, ja on luonnollista päätyä sellaiseen, joka on itselle tuttu ja helppo muistaa. Lyhyet, tutut ja helposti pääteltävät salasanat voivat kuitenkin olla myös muiden arvattavissa. Onneksi salasanojen turvallisuutta voi parantaa melko pienillä muutoksilla.",
        ],
      },
      {
        heading: "Miksi sähköpostin salasana on erityisen tärkeä?",
        paragraphs: [
          "Sähköposti on yksi tärkeimmistä palveluista digitaalisessa arjessa. Sähköpostiin saapuu esimerkiksi viestejä läheisiltä tai viranomaisilta, verkkokauppojen tilausvahvistuksia ja eri palveluiden ilmoituksia. Sähköpostia käytetään myös muiden palveluiden salasanojen palauttamiseen: jos unohdat esimerkiksi verkkokaupan salasanan, voit yleensä tilata sähköpostiisi linkin, jonka avulla voit vaihtaa salasanasi.",
          "Sähköpostin kautta pystyy myös kirjautumaan suoraan moniin muihin palveluihin luomatta erillistä tunnusta. Tällainen kirjautuminen eroaa uuden käyttäjän luomisesta siten, että kirjautuminen tapahtuu toisen palvelun, eli sähköpostin, tunnuksilla. Tämä voi tehdä kirjautumisesta helpompaa, mutta jos sähköpostitilisi salasana on heikko, voi se vaarantaa myös muiden palveluiden turvallisuuden.",
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
          "Tyypillisesti huijausviestissä on linkki, jota painamalla vastaanottaja ohjataan väärennetylle verkkosivustolle. Sivustolla pyydetään tietoja, jotka liittyvät itse huijausviestissä esitettyyn pyyntöön.",
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
          "Odottamaton viesti: Viesti ei liity omaan viimeaikaiseen toimintaan. Viestissä voidaan esitellä arvontavoittona saatavaa rahasummaa, joka ilmestyy tilille linkkiä painaessa ja maksukortin tiedot syötettyään. Tällaisessa tilanteessa on syytä epäillä voiton aitoutta, jos ei ole osallistunut arvontoihin.",
          "Epätavallinen lähettäjän sähköpostiosoite: Tällainen viesti voi väittää tulevansa esimerkiksi pankilta, mutta lähettäjän sähköpostiosoite ei liity pankkipalveluihin.",
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
        paragraphs: [],
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
        "Myös verkkoselaimissa, kuten Google Chromessa ja Microsoft Edgessä, on usein omat salasanojen hallintaohjelmansa. Ne voivat olla käteviä, sillä ne tallentavat salasanat yhdellä klikkauksella. Selainten salasananhallinta ei kuitenkaan ole yhtä turvallisia kuin erilliset hallintaohjelmat. Selaimeen tallennetut salasanat voivat olla alttiita haittaohjelmille ja selaimen haavoittuvuuksille.",
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
        "Jos saat viestin, joka herättää epäilystä, älä kiirehdi toimimaan viestin pyyntöjen mukaisesti. Vältä viestissä olevien linkkien ja liitetiedostojen avaamista äläkä vastaa viestiin.",
        "Linkkien avaamisen sijaan voit hyödyntää verkkoselaimesi kirjanmerkkejä tai älypuhelimen sovelluksia: jos olet tallentanut palvelun oikean verkko-osoitteen kirjanmerkiksi selaimeen tai asentanut palvelun puhelinsovelluksen, voit siirtyä palveluun tätä kautta ja varmistaa viestin aiheellisuuden.",
        "Jos saat läheiseltäsi poikkeuksellisen viestin oudosta puhelinnumerosta, voit varmistaa viestin aitouden ottamalla häneen yhteyttä esimerkiksi ennestään tuttuun puhelinnumeroon. Jos et tavoita läheistäsi, voit kysyä asiasta myös muilta yhteisiltä tutuilta. Älä noudata viestin ohjeita ennen kuin olet varmistanut, että viesti todella on läheiseltäsi.",
      ],
    },
    {
      heading: "Entä jos olen jo antanut tietojani?",
      paragraphs: [
        "Jos olet antanut väärennetylle sivustolle salasanasi, vaihda se mahdollisimman pian kyseisen palvelun oikealla verkkosivustolla tai sovelluksessa. Jos olet käyttänyt samaa salasanaa muilla sivustoilla, vaihda salasana myös niissä.",
        "Jos olet antanut pankkitunnuksesi tai maksukorttisi tiedot tai lähettänyt rahaa huijarille, ota mahdollisimman nopeasti yhteyttä pankkiisi sen virallisen puhelinnumeron kautta. Pankki voi auttaa estämään tunnusten tai korttien väärinkäytön ja mahdollisesti estämään huijaukseen liittyvät tilitapahtumat.",
        "Huijauksesta kannattaa tehdä rikosilmoitus poliisille. Lisäksi tapahtuneesta voi ilmoittaa Traficomin Kyberturvallisuuskeskukselle, jotta he osaavat tiedottaa ajankohtaisista huijausilmiöistä. Rikosuhripäivystys (RIKU) tarjoaa huijauksen kohteeksi joutuneille tukea ja käytännön neuvoja.",
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
