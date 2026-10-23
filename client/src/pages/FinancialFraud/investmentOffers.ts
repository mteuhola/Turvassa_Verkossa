export interface OfferPart {
  id: string;
  text: string;
  suspicious: boolean;
  explanation: string;
}
export interface InvestmentOffer {
  id: string;
  title: string;
  intro: string;
  parts: OfferPart[];
}
export const investmentOffers: InvestmentOffer[] = [
  {
    id: "crypto",
    title: "Automaattinen kryptosijoitus",
    intro: "Sosiaalisen median mainos tarjoaa uuden sijoitusrobotin palvelua.",
    parts: [
      {
        id: "online",
        text: "Palvelua esitellään verkkosivulla.",
        suspicious: false,
        explanation:
          "Verkkosivu ei itsessään ole varoitusmerkki eikä todiste luotettavuudesta. Tutki erityisesti lupauksia ja maksupyyntöä.",
      },
      {
        id: "guarantee",
        text: "Saat varmasti 15 % tuottoa joka viikko. Et voi menettää rahojasi.",
        suspicious: true,
        explanation:
          "Poikkeuksellisen suuri, varmaksi luvattu tuotto ja riskittömyys ovat varoitusmerkkejä. Lupaus ei todista sijoituksen turvallisuutta.",
      },
      {
        id: "celebrity",
        text: "Tunnettu televisiokasvo suosittelee palvelua videolla. Sinun ei tarvitse tarkistaa yrityksen taustaa.",
        suspicious: true,
        explanation:
          "Tunnetun henkilön kuvaa tai videota voidaan käyttää ilman lupaa tai muokata. Suositus ei korvaa yrityksen taustan tarkistamista.",
      },
      {
        id: "wallet",
        text: "Siirrä rahat neuvojamme henkilökohtaiseen kryptolompakkoon.",
        suspicious: true,
        explanation:
          "Henkilökohtainen lompakko ei kerro, kuka vastaa palvelusta tai mihin rahat menevät. Maksutapa ja vastaanottaja vaativat selvittämistä.",
      },
    ],
  },
  {
    id: "shares",
    title: "Osakkeita ennen pörssiin menoa",
    intro:
      "Tuntematon soittaja tarjoaa mahdollisuutta ostaa kuvitteellisen energiayhtiön osakkeita.",
    parts: [
      {
        id: "deadline",
        text: "Tarjous päättyy kymmenen minuutin kuluttua. Päätös pitää tehdä puhelun aikana.",
        suspicious: true,
        explanation:
          "Kiireellä painostaminen vie aikaa harkinnalta ja tietojen tarkistamiselta.",
      },
      {
        id: "secret",
        text: "Älä kerro tästä pankillesi tai läheisillesi. Tämä on vain valituille asiakkaille.",
        suspicious: true,
        explanation:
          "Salailupyyntö estää saamasta ulkopuolista arviota. Erityisasemalla voidaan houkutella luottamaan tarjoukseen.",
      },
      {
        id: "documents",
        text: "Yrityksen viralliset tiedot ja sopimuksen saat vasta maksun jälkeen.",
        suspicious: true,
        explanation:
          "Tarjoajan ja ehtojen tarkistamisen pitäisi olla mahdollista ennen päätöstä. Niiden salaaminen maksun taakse on varoitusmerkki.",
      },
      {
        id: "sector",
        text: "Yhtiön kerrotaan kehittävän aurinkoenergiaa.",
        suspicious: false,
        explanation:
          "Toimiala ei yksin tee tarjouksesta huijausta tai turvallista. Arvioi tarjoajan toimintaa ja tarkistettavia tietoja.",
      },
    ],
  },
  {
    id: "property",
    title: "Vuokratuottoa loma-asunnoista",
    intro: "Sähköpostissa esitellään sijoitusta ulkomaiseen lomakohteeseen.",
    parts: [
      {
        id: "details",
        text: "Kohteen osoitetta tai omistustietoja ei anneta. Esitteen kuvat riittävät todisteeksi.",
        suspicious: true,
        explanation:
          "Kuvilla ei voi varmistaa kohteen olemassaoloa tai omistusta. Tarkistettavien tietojen puuttuminen on varoitusmerkki.",
      },
      {
        id: "brochure",
        text: "Esitteessä on kuvia asunnoista ja uima-altaasta.",
        suspicious: false,
        explanation:
          "Kuvat eivät itsessään osoita huijausta. Ne eivät myöskään varmista sijoituksen aitoutta tai tuottoa.",
      },
      {
        id: "account",
        text: "Varausmaksu pitää lähettää yksityishenkilön tilille, jonka nimi ei vastaa tarjoajaa.",
        suspicious: true,
        explanation:
          "Maksunsaajan ja tarjoajan ristiriita vaatii selvittämistä. Pelkkä selitys viestissä ei varmista, kenelle maksat.",
      },
      {
        id: "access",
        text: "Asenna etähallintaohjelma ja kirjaudu pankkiisi, niin neuvojamme hoitaa sijoituksen puolestasi.",
        suspicious: true,
        explanation:
          "Pankkiasioinnin yhdistäminen tuntemattoman etäyhteyteen voi antaa hänelle pääsyn tietoihisi ja rahojesi siirtoihin.",
      },
    ],
  },
];
export const clueIds = investmentOffers.flatMap((offer) =>
  offer.parts
    .filter((part) => part.suspicious)
    .map((part) => offer.id + "/" + part.id),
);
export function discoverClue(found: string[], id: string): string[] {
  return clueIds.includes(id) && !found.includes(id) ? [...found, id] : found;
}
export function allCluesFound(found: string[]): boolean {
  return clueIds.every((id) => found.includes(id));
}
