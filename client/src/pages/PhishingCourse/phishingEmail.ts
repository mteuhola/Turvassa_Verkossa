export const emailParts = [
  {
    id: "sender",
    label: "Lähettäjä",
    text: "Tonttupankki <pomo@tonttupankki-turvatilit.yksityinen>",
    suspicious: true,
    title: "Lähettäjän osoite",
    explanation:
      "Näyttönimi voi olla mikä tahansa. Lähettäjän verkkotunnus tonttupankki-turvatilit.yksityinen eroaa harjoituksen pankin osoitteesta tonttupankki.yksityinen. Myöskään tutulta näyttävä lähettäjä ei yksin takaa aitoutta.",
    hint: "Vertaa lähettäjän @-merkin jälkeistä osaa pankin osoitteeseen.",
  },
  {
    id: "subject",
    label: "Aihe",
    text: "Tietoturvapäivitys - Tilisi vaatii välitöntä toimintaa",
    suspicious: true,
    title: "Kiire ja uhkaus",
    explanation:
      "Otsikoissa olevat vaatimukset painostavat toimimaan tarkistamatta. Pysähdy ja tarkista asia itse pankin sovelluksesta tai tutusta yhteystiedosta.",
    hint: "Yrittääkö viestin aihe saada sinut toimimaan kiireessä?",
  },
  {
    id: "greeting",
    label: "Tervehdys",
    text: "Hyvä asiakas,",
    suspicious: false,
    title: "Yleinen tervehdys",
    explanation:
      "Yleinen tervehdys voi esiintyä sekä oikeassa että huijausviestissä. Se ei yksin ole tässä tehtävässä etsittävä varoitusmerkki. Myöskään oma nimesi viestissä ei todista sitä aidoksi.",
    hint: "",
  },
  {
    id: "request",
    label: "Viesti",
    text: "Olemme aloittaneet uuden tietoturvapäivityksen käyttöönoton palvelussamme. Taataksemme kaikkien tiliemme turvallisuuden, sinun tulee vahvistaa henkilöllisyytesi, kirjautua sisään palveluun, ja suorittaa vaadittavat toimenpiteet. Vaihtoehtoisesti voit vastata tähän viestiin lähettämällä salasanasi ja kirjautumisen vahvistuskoodin, jolloin voimme hoitaa asian puolestasi.",
    suspicious: true,
    title: "Salaisten tietojen pyyntö",
    explanation:
      "Salasanaa tai kirjautumisen vahvistuskoodia ei pidä lähettää sähköpostissa, eivätkä pankit koskaan utele tunnuksiasi. Niillä huijari voisi päästä tilillesi. Älä vastaa pyyntöön.",
    hint: "Mitä tietoja sinua pyydetään lähettämään vastauksessa?",
  },
  {
    id: "attachmentInstructions",
    label: "Viesti",
    text: "Asennathan laitteeseesi tämän viestin liitteenä tulevan turvapäivitystiedoston mahdollisimman pian, jotta laitteesi ja tilisi pysyvät suojattuna.",
    suspicious: true,
    title: "Ohjeet liitteen asentamiseen",
    explanation:
      "Viesti kehottaa asentamaan liitteessä olevan ohjelman vetoamalla asennuksen pakollisuuteen. Odottamaton ohjelma voi kuitenkin olla haitallinen. Älä asenna sitä.",
    hint: "Kehottaanko viesti asentamaan liitteen?",
  },
  {
    id: "link",
    label: "Linkki ja sen kohde",
    text: "Vahvista tilisi: https://tonttupankki-turvatilit.yksityinen/kirjaudu",
    suspicious: true,
    title: "Väärään osoitteeseen vievä linkki",
    explanation:
      "Linkin osoite ei ole harjoituksen pankin tonttupankki.yksityinen. Pankin nimi osoitteen osana tai https-alku ei takaa aitoutta. Avaa pankin sovellus tai kirjoita tuntemasi osoite itse.",
    hint: "Vertaa linkin verkkotunnusta harjoituksen pankin osoitteeseen.",
  },
  {
    id: "fakeLink",
    label: "Linkki ja sen kohde (huijauslinkki)",
    text: "Vaihtoehtoisesti voit kirjautua sisään tästä: https://tonttupankki.yksityinen/kirjaudu",
    href: "https://omituinen-osoite.netlify.app/",
    suspicious: true,
    title:
      "Näennäisesti oikeaan osoitteeseen vievä linkki, mutta ohjaa kuitenkin väärään kohteeseen",
    explanation:
      "Itse linkki näyttää vievän oikeaan osoitteeseen, mutta liikuttaessa hiiren osoittimella linkin päälle selaimen alareunassa näkyy väärä osoite. Tarkista linkin kohde ennen kuin klikkaat sitä.",
    hint: "Vertaa jälkimmäisen linkin kohdetta selaimen alareunassa näkyvään osoitteeseen.",
  },
  {
    id: "attachment",
    label: "Liite",
    text: "Turvapaivitys.exe",
    suspicious: true,
    title: "Odottamaton ohjelmaliite",
    explanation:
      "Pääte .exe tarkoittaa Windowsissa suoritettavaa ohjelmaa. Odottamaton turvapäivitykseksi nimetty liite voi asentaa haittaohjelman. Älä avaa sitä.",
    hint: "Katso liitteen nimeä ja sen .exe-päätettä.",
  },
  {
    id: "secrecy",
    label: "Lisäohje",
    text: "Pankin verkkosivut ovat poissa käytöstä sekä asiakaspalvelunumero on hyvin kiireinen päivityksen vuoksi, joten emme suosittele soittamista tai verkkosivulla vierailua.",
    suspicious: true,
    title: "Tarkistamisen estäminen",
    explanation:
      "Viestissä yritetään estää avun pyytäminen ja asian tarkistaminen. Voit aina pysähtyä ja kysyä neuvoa läheiseltä tai pankilta itse etsimäsi yhteystiedon kautta.",
    hint: "Miksi viesti kieltää soittamasta pankkiin tai kysymästä apua?",
  },
  {
    id: "signature",
    label: "Allekirjoitus",
    text: "Ystävällisin terveisin, Tonttupankin asiakaspalvelu",
    suspicious: false,
    title: "Asiallinen allekirjoitus",
    explanation:
      "Kohtelias allekirjoitus on tavallinen myös aidoissa viesteissä. Sen voi kuitenkin kopioida, joten se ei todista viestin aitoutta. Tarkastele viestiä kokonaisuutena.",
    hint: "",
  },
] as const;

export const clues = emailParts.filter((part) => part.suspicious);
