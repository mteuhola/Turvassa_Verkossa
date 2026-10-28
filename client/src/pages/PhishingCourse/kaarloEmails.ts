export const kaarloEmails = [
  {
    id: "prize",
    sender: "MegaPotti asiakas palvelu",
    address: "voitto@mega-palkinot.example",
    subject: "ONNITELUT!! Sinä olet voitaja lunasta NYT",
    time: "Tänään klo 10.31",
    attachment: null,
    context:
      "Kaarlo: En tunne MegaPotti-palvelua enkä ole osallistunut arvontaan.",
    paragraphs: [
      "Hyvä aasiakas!!",
      "Sinä olet valittu £950 euron voitajaksi. Maksa vaan käsitely maksu $4,90 euroa ja saat palkinno heti!!",
      "Toimi 30 minutin aikana tai voitto poistuu. Anna kaikki korttisi tiedot lunastus  sivulle.",
      "Terveisin MegaPalkinto voitto tiimi",
    ],
    link: {
      text: "LUNASTA PALKINTO",
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
    id: "delivery",
    sender: "Lukutoukka | Tilausilmoitukset",
    address: "tilaukset@lukutoukka.fi",
    subject: "Tilauksesi LP-1042 on noudettavissa",
    time: "Tänään klo 08.12",
    attachment: null,
    context:
      'Kaarlo: Tilasin lukutoukka.fi-kaupasta kirjan "Linnut ja Metsäretket". Tilausvahvistuksessani on numero LP-1042 ja valitsin noutopaikaksi keskustan pakettipisteen.',
    paragraphs: [
      "Hei Kaarlo,",
      "Tilauksesi LP-1042, Linnut ja Metsäretket (1 kpl), on saapunut valitsemaasi noutopaikkaan: Keskustan pakettipiste, Kauppakatu 12.",
      "Voit noutaa paketin noutokoodilla 482619 viikon kuluessa. Älä vastaa tähän viestiin, sillä se on automaattisesti luotu.",
      "Kiitos tilauksestasi! Antoisia lukuhetkiä,",
      "Lukutoukka Oy",
    ],
    link: null,
    suspicious: false,
    explanation:
      "Tässä harjoituksessa viesti on tavallinen toimitusilmoitus. Kaupan osoite, tilausnumero, tuote ja noutopaikka vastaavat Kaarlon omaa tilausta. Viesti ei pyydä maksua, salasanaa tai muuta tietoa, eikä siinä ole linkkejä tai liitteitä. Pelkkä linkkien puuttuminen tai lähettäjän osoite ei silti todista aitoutta: arvio perustuu kokonaisuuteen. Jos jokin jää epäselväksi, tilauksen voi tarkistaa itse avatulta kaupan sivustolta.",
    response:
      "Kaarlo: Voin siis ottaa odottamani ilmoituksen vastaan rauhassa. Varovaisuus ei tarkoita, että minun pitäisi epäillä jokaista viestiä tai lopettaa sähköpostin käyttäminen.",
  },
  {
    id: "electricbill",
    sender: "SuperSähkö Oy",
    address: "noreply@supersahko.fi",
    subject: "Lasku 198235895",
    time: "Eilen klo 12.00",
    attachment: "Lasku198235895.pdf",
    context:
      "Kaarlo: Olen SuperSähkön asiakas, ja olen maksanut samanlaisen laskun joka toinen kuukausi.",
    paragraphs: [
      "Hyvä asiakkaamme,",
      "Pyydämme suorittamaan oheisen laskun alla olevin tiedoin. Lasku löytyy tämän sähköpostin liitteenä.",
      "Maksettava: 69,99€",
      "Maksun saaja: SuperSähkö Oy",
      "Ystävällisin terveisin,",
      "SuperSähkön asiakaspalvelu",
    ],
    link: null,
    suspicious: false,
    explanation:
      "Viesti on tavallisen näköinen sähkölasku. Laskujen aitouden pystyy usein varmistamaan palvelun omilta sivuilta.",
    response:
      "Kaarlo: Huh, tämä ei sentään ollut huijausyritys. Ajatella, että olisin voinut maksaa huijauslaskuja jo useamman vuoden ajan!",
  },
  {
    id: "account",
    sender: "Lukutoukka | Asiakaspalvelu",
    address: "asiakaspalvelu@lukut0ukka-kauppa.fi",
    subject: "Vahvista asiakastilisi toimitusta varten",
    time: "Eilen klo 09.04",
    attachment: null,
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
      "Tämäkin viesti on epäilyttävä, vaikka kieli on sujuvaa, Kaarlo odottaa tilausta, ja viestin lähettäjä on kirjoittanut Kaarlon nimen. Lähettäjän ja linkin kohteen verkkotunnus on lukut0ukka-kauppa.fi, ei kaupan lukutoukka.fi. Korttitietojen pyytäminen ja toimituksen keskeyttämisellä painostaminen ovat lisäsyitä tarkistaa asia kaupan tutun sivuston kautta.",
    response:
      "Kaarlo: Melkein uskoin jo, sillä viestin lähettäjä tuntui tietävän nimeni. Tarkistan tilaukseni avaamalla itse tuntemani kaupan sivuston.",
  },
  {
    id: "relative",
    sender: "Anna",
    address: "anna@kuustonen.com",
    subject: "Sunnuntain kahvihetki",
    time: "Toissapäivänä klo 23.22",
    attachment: null,
    context:
      "Kaarlo: Sovimme alkuviikosta puhelimessa lapsenlapseni Annan kanssa, että hän tulee sunnuntaina kahville kello 14. Hän lupasi vielä lähettää viestin siitä, mitä tarjoiluja hän toisi. Osoite on sama, jota olemme käyttäneet aiemminkin.",
    paragraphs: [
      "Hei pappa!",
      "Tulen sunnuntaina kahville kello 14, kuten puhelimessa sovimme.. Tuon mukanani munkkeja, joten sinun ei tarvitse leipoa.",
      "Otan myös viime kesän islannin retkikuvat mukaan, niin voimme katsella niitä yhdessä.",
      "Nähdäään sunnuntaina",
      "Terveisin, Anna",
    ],
    link: null,
    suspicious: false,
    explanation:
      "Viesti on tavallinen läheisen yhteydenotto. Se vastaa Kaarlon ja Annan puhelimessa sopimaa vierailua ja luvattua viestiä tarjoiluista. Viesti ei painosta toimimaan eikä pyydä rahaa tai salaisia tietoja. Pienet kirjoitusvirheet ovat inhimillisiä, eivätkä ne tarkoita viestin olevan huijausta. Jos jokin herättäisi epäilyksen, Kaarlo voisi tarkistaa asian soittamalla Annan ennestään tuttuun numeroon.",
    response:
      "Kaarlo: Tämä vastaa sitä, mitä sovimme Annan kanssa. Odottelenkin sunnuntain kahvihetkeä hyvillä mielin! Epäselvät asiat voisin aina tarkistaa tutusta numerosta.",
  },
  {
    id: "mailbox",
    sender: "OmaPosti",
    address: "tiliturva@omaposti-tarkistus.fi",
    subject: "Sähköpostitilisi suljetaan ilman vahvistusta",
    time: "Toissapäivänä klo 11.48",
    attachment: "Tilin_turvapaivitys.exe",
    context:
      "Kaarlo: Käytän OmaPosti-nimistä sähköpostipalvelua. En ole pyytänyt tililleni muutoksia tai tilannut turvapäivitystä, eikä tuo sähköpostiosoite ole aivan samanlainen kuin ennen.",
    paragraphs: [
      "Hei Kaarlo,",
      "Tilisi turvallisuustarkistus on kesken. Jos et vahvista tietojasi tänään, sähköpostitilisi suljetaan ja menetät pääsyn viesteihisi.",
      "Avaa liitteenä oleva turvapäivitys ja suorita sen asennus. Vastaa sen jälkeen tähän viestiin lähettämällä sähköpostisi salasana ja puhelimeesi saapuva kirjautumisen vahvistuskoodi.",
      "Näin voimme varmistaa tilisi omistajuuden ja pitää sähköpostisi käytössä.",
      "Ystävällisin terveisin, OmaPostin tiliturvatiimi",
    ],
    link: null,
    suspicious: true,
    explanation:
      "Tilin sulkemisella uhkaaminen painostaa toimimaan kiireessä. Lähettäjän verkkotunnus eroaa palvelun osoitteesta, ja Kaarlokin on sitä mieltä, ettei osoite ole tuttu. Viesti lisäksi sisältää liitteen, jota Kaarlo ei ole odottanut.",
    response:
      "Kaarlo: Jopa minä ehdin hieman epäilemään tämän viestin aitoutta. En avaa liitettä enkä lähetä tunnuksiani. Jos olisin jo antanut salasanani, pyytäisin tarvittaessa läheiseltä apua sen vaihtamiseen oikeassa palvelussa.",
  },
] as const;

export function isKaarloDecisionCorrect(index: number, suspicious: boolean) {
  return kaarloEmails[index]?.suspicious === suspicious;
}
