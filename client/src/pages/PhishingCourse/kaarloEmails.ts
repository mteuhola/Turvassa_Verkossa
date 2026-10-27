export const kaarloEmails = [
  {
    id: "prize",
    sender: "MegaPotti asiakas palvelu",
    address: "voitto@mega-palkinot.example",
    subject: "ONNITELUT!! Sinä olet voitaja lunasta NYT",
    time: "Tänään klo 08.12",
    context:
      "Kaarlo: En tunne MegaPotti-palvelua enkä ole osallistunut arvontaan.",
    paragraphs: [
      "Hyvä aasiakas!!",
      "Sinä olet valittu £950 euron voitajaksi. Maksa vaan käsitely maksu $4,90 euroa ja saat palkinno heti!!",
      "Toimi 30 minutin aikana tai voitto poistuu. Anna kaikki korttisi tiedot lunastus  sivulle.",
      "Terveisin MegaPalkinto voitto tiimi",
    ],
    link: {
      text: "LUNASTA PALKKINTO",
      destination: "https://omituinen-osoite.netlify.app/",
      title: "MegaPotti: lunasta vo1tto",
      request:
        "Vastaanottaaksesi palkinnon maksa 4,90 euroa. Sivusto pyytää kortin numeroa, voimassaoloaikaa ja turvakoodia.",
    },
    suspicious: true,
    explanation:
      "Tämä viesti on epäilyttävä. Kaarlo ei tunne palvelua eikä osallistunut arvontaan. Odottamaton palkinto, kiire, maksupyyntö ja runsaat kirjoitusvirheet vahvistavat epäilyä.",
    response:
      "Kaarlo: En siis ole menettämässä oikeaa palkintoa. Jätän pyynnön toteuttamatta ja ilmoitan viestin huijaukseksi.",
  },
  {
    id: "account",
    sender: "Lukutoukka | Asiakaspalvelu",
    address: "asiakaspalvelu@lukutoukka-kauppa.fi",
    subject: "Vahvista asiakastilisi toimitusta varten",
    time: "Tänään klo 09.04",
    context:
      "Kaarlo: Tilasin kirjan Lukutoukasta osoitteessa lukutoukka.fi. Tämä näyttää samalta kaupalta, ja odotan pakettia.",
    paragraphs: [
      "Hei Kaarlo,",
      "Päivitämme asiakkaidemme toimitustietoja. Jotta tilauksesi voidaan toimittaa ajallaan, vahvista asiakastilisi tämän päivän aikana.",
      "Kirjaudu alla olevasta linkistä ja vahvista maksukorttisi tiedot. Vahvistuksen yhteydessä tehdään 0,00 euron katevaraus. Jos vahvistus jää tekemättä, toimituksesi keskeytyy.",
      "Ystävällisin terveisin, Lukutoukka OY:n asiakaspalvelu",
    ],
    link: {
      text: "https://lukutoukka.fi/oma-tili",
      destination: "https://omituinen-osoite.netlify.app/",
      title: "Lukutoukka: tilin vahvistus",
      request:
        "Sivusto pyytää kaupan salasanaa sekä maksukortin numeroa ja turvakoodia toimituksen jatkamiseksi.",
    },
    suspicious: true,
    explanation:
      "Tämäkin viesti on epäilyttävä, vaikka kieli on sujuvaa ja Kaarlo odottaa tilausta. Lähettäjän ja linkin kohteen verkkotunnus on lukutoukka-kauppa.fi, ei kaupan lukutoukka.fi. Linkin näkyvä teksti peittää eri kohteen. Korttitietojen pyytäminen ja toimituksen keskeyttämisellä painostaminen ovat lisäsyitä tarkistaa asia kaupan tutun sivuston kautta.",
    response:
      "Kaarlo: Tuttu nimi ja hyvä kieli eivät yksin riitä. Tarkistan tilaukseni avaamalla itse tuntemani kaupan sivuston.",
  },
  {
    id: "delivery",
    sender: "Lukutoukka | Tilausilmoitukset",
    address: "tilaukset@lukutoukka.fi",
    subject: "Tilauksesi LP-1042 on noudettavissa",
    time: "Tänään klo 10.31",
    context:
      'Kaarlo: Tilasin lukutoukka.fi-kaupasta kirjan "Linnut ja Metsäretket". Tilausvahvistuksessani on numero LP-1042 ja valitsin noutopaikaksi keskustan pakettipisteen.',
    paragraphs: [
      "Hei Kaarlo,",
      "Tilauksesi LP-1042, Linnut ja Metsäretket (1 kpl), on saapunut valitsemaasi noutopaikkaan: Keskustan pakettipiste, Kauppakatu 12.",
      "Voit noutaa paketin noutokoodilla 482619 viikon kuluessa. Älä vastaa tähän viestiin, sillä se on automaattisesti luotu.",
      "Kiitos tilauksestasi! Antoisia lukuhetkiä,",
      "Lukutoukka OY",
    ],
    link: null,
    suspicious: false,
    explanation:
      "Tässä harjoituksessa viesti on tavallinen toimitusilmoitus. Kaupan osoite, tilausnumero, tuote ja noutopaikka vastaavat Kaarlon omaa tilausta. Viesti ei pyydä maksua, salasanaa tai muuta tietoa, eikä siinä ole linkkejä tai liitteitä. Pelkkä linkkien puuttuminen tai lähettäjän osoite ei silti todista aitoutta: arvio perustuu kokonaisuuteen. Jos jokin jää epäselväksi, tilauksen voi tarkistaa itse avatulta kaupan sivustolta.",
    response:
      "Kaarlo: Voin siis ottaa odottamani ilmoituksen vastaan rauhassa. Varovaisuus ei tarkoita, että minun pitäisi epäillä jokaista viestiä tai lopettaa sähköpostin käyttäminen.",
  },
] as const;

export function isKaarloDecisionCorrect(index: number, suspicious: boolean) {
  return kaarloEmails[index]?.suspicious === suspicious;
}
