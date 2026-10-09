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
        paragraphs: [
          "Salasanoja tarvitaan monissa arjen palveluissa, kuten sähköpostissa. Tällä kurssilla tutustut siihen, millainen salasana on vaikea arvata ja miten voit huolehtia omien tiliesi turvallisuudesta.",
          "Et tarvitse ennakkotietoja. Voit lukea ja kokeilla omaan tahtiisi sekä palata aiheisiin myöhemmin.",
        ],
      },
      {
        heading: "Mitä kurssilla tehdään?",
        paragraphs: [
          "Seuraavassa aiheessa vertailet esimerkkisalasanoja ja tutkit niiden vahvuutta. Sen jälkeen luot ja tallennat oman keksityn harjoitussalasanan. Käytä harjoituksessa vain keksittyä salasanaa, älä oikean tilisi salasanaa.",
          "Kurssin lopuksi kertaat oppimaasi tietovisassa. Sen viimeisessä kysymyksessä tarvitset harjoituksessa luomaasi salasanaa.",
        ],
      },
    ],
  },
  phishing: {
    sections: [
      {
        heading: "Tervetuloa tutkimaan epäilyttäviä viestejä",
        paragraphs: [
          "Arjessa saat monenlaisia sähköposteja ja muita viestejä. Joskus viestin lähettäjä ei ole se, joka hän väittää olevansa. Tällä kurssilla harjoittelet huomaamaan merkkejä, jotka antavat syyn pysähtyä ja tarkistaa viestin.",
          "Saat tutkia tilanteita rauhassa. Harjoittelussa ei haittaa, vaikka et huomaisi kaikkea ensimmäisellä kerralla.",
        ],
      },
      {
        heading: "Mitä kurssilla tehdään?",
        paragraphs: [
          "Seuraavaksi tutkit kuvitteellista sähköpostia ja etsit sen epäilyttäviä kohtia. Jokaisesta löydöstä saat selityksen, ja voit tarvittaessa pyytää vihjeen.",
          "Lopuksi kertaat tietovisassa, miten voit arvioida viestejä ja toimia harkiten.",
        ],
      },
    ],
  },
  "financial-fraud": {
    sections: [
      {
        heading: "Tervetuloa pohtimaan luottamusta verkossa",
        paragraphs: [
          "Verkossa voi tutustua uusiin ihmisiin ja kohdata houkuttelevia tarjouksia. Tällä kurssilla pohdit tilanteita, joissa luottamusta, tunteita tai toiveita paremmasta taloudesta käytetään huijaamiseen.",
          "Aiheina ovat romanssi- ja sijoitushuijaukset. Harjoituksissa käsitellään kuvitteellisia tilanteita, ja voit edetä omaan tahtiisi.",
        ],
      },
      {
        heading: "Mitä kurssilla tehdään?",
        paragraphs: [
          "Seuraavassa harjoituksessa tutkit kolmea sijoitustarjousta ja etsit niiden varoitusmerkkejä. Myöhemmin pohdit myös uuden verkkotuttavan rahapyyntöä. Lopuksi kertaat tietovisassa myös poikkeuksellisen hyvää tuottoa lupaavia tarjouksia.",
          "Saat vastauksista palautetta. Tarkoitus on harjoitella huomaamaan varoitusmerkkejä ja miettimään, miten tilanteessa voisi toimia.",
        ],
      },
    ],
  },
};
