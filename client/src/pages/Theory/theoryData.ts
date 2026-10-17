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
        heading: "Tervetuloa tutustumaan salasanoihin",
        paragraphs: ["Käyttäessäsi internetiä, salasanoja tarvitaan monissa paikoissa, kuten sähköpostissa, verkkopankissa, ja sosiaalisen median sekä verkkokauppojen käyttäjätunnuksissa. Salasanojen avulla pyritään varmistamaan, että vain sinä pääset käsiksi omiin tietoihisi. Salasanat ovat siis tärkeä osa yksityisyyttäsi ja turvallisuuttasi verkossa.", 
          "Salasanan valinta saattaa olla työlästä, ja on luonnollista päätyä sellaiseen, joka on itselle tuttu ja helppo muistaa. Lyhyet, tutut ja helposti pääteltävät salasanat voivat kuitenkin olla myös muiden arvattavissa. Onneksi salasanojen turvallisuutta voi parantaa melko pienillä muutoksilla."
        ]
      },
      {
        heading: "Miksi sähköpostin salasana on erityisen tärkeä?",
        paragraphs: ["Sähköposti on yksi tärkeimmistä palveluista digitaalisessa arjessa. Sähköpostiin saapuu esimerkiksi viestejä läheisiltä tai viranomaisilta, verkkokauppojen tilausvahvistuksia ja eri palveluiden ilmoituksia. Sähköpostia käytetään myös muiden palveluiden salasanojen palauttamiseen. Jos unohdat esimerkiksi verkkokaupan salasanan, voit yleensä tilata sähköpostiisi linkin, jonka avulla voit vaihtaa salasanasi.", 
          "Sähköpostin kautta pystyy myös kirjautumaan suoraan moniin muihin palveluihin luomatta erillistä tunnusta. Tällainen kirjautuminen eroaa uuden käyttäjän luomisesta siten, että kirjautuminen tapahtuu toisen palvelun, eli sähköpostin, tunnuksilla. Tämä voi tehdä kirjautumisesta helpompaa, mutta jos sähköpostitilisi salasana on heikko, voi se vaarantaa myös muiden palveluiden turvallisuuden.",
          "Jos joku pääsee sähköpostitiliisi käsiksi, hänellä on mahdollisuus vaihtaa myös muiden käyttämiesi palveluiden salasanoja. Siksi sähköpostin salasanan tulee olla vahva, riittävän pitkä ja sellainen, jota ei käytetä missään muussa palvelussa."
        ]
      },
      {
        heading: "Millainen on hyvä salasana?",
        paragraphs: ["Hyvä salasana yhdistää seuraavia ominaisuuksia: pituus, arvaamattomuus ja yksilöllisyys.", "Pituus: salasana on riittävän pitkä, tavoitteena vähintään 12 merkkiä. ","Arvaamattomuus: salasana ei sisällä helposti arvattavia sanoja tai numerosarjoja, kuten henkilöiden tai palveluiden nimiä.", "Yksilöllisyys: salasana on ainutlaatuinen, eikä käytetä muissa palvelussa.",
          "Pitkän salasanan ei tarvitse olla vaikea muistaa. Esimerkiksi useamman toisistaan riippumattoman sanan yhdistäminen voi auttaa muodostamaan pitkän ja helposti muistettavan salasanan."
        ]
      }
    ],
  },
  phishing: {
    sections: [
      {
        heading: "Tervetuloa tutkimaan epäilyttäviä viestejä",
        paragraphs: [],
      },
    ],
  },
  "financial-fraud": {
    sections: [
      {
        heading: "Tervetuloa pohtimaan luottamusta verkossa",
        paragraphs: [],
      },
    ],
  },
};
