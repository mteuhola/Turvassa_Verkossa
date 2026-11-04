export type PracticeScreen = "mail" | "new-tab" | "library" | "contacts";
export type PracticeDecision = "report" | "pay" | "wait" | "new-number";

export const practiceLibraryLoans = [
  { id: "garden", title: "Satokauden ihmeet", due: "Kahden viikon kuluttua" },
  {
    id: "english",
    title: "English for Beginners",
    due: "Viikon kuluttua",
  },
  {
    id: "recipes",
    title: "Kotikokin unelmia",
    due: "Kahden viikon kuluttua",
  },
] as const;

export const overduePracticeLoan = {
  id: "birds",
  title: "Linnut ja Metsäretket",
  due: "Kolme päivää sitten",
  status: "Myöhässä",
  fee: "2,00 €",
} as const;

export const safeResponseScenarios = [
  {
    id: "library",
    bookId: "english",
    title: "Kirjanmerkkien hyödyntäminen",
    goal: "Tässä esimerkissä sinulla on kirjoja lainassa, ja kirjaston nimellä on tullut maksumuistutus. Selvitä, onko kirjaston nimissä tullut viesti aiheellinen.",
    context:
      "Kuvitellaan, että olet käyttänyt harjoitusselaimen Oma kirjasto -kirjanmerkkiä aiemminkin lainojesi tarkistamiseen. Keltainen laatikko kertoo ensimmäisessä osassa ohjeet tehtävän suorittamiseen.",
    sender: "Oma kirjasto",
    address: "lainat@kirjaston-asiointi.fi",
    subject: "Muistutus avoimesta kirjastomaksusta",
    time: "Tänään klo 10.15",
    paragraphs: [
      "Hei,",
      'Lainaamasi kirjan "English for Beginners" palautus on myöhässä. Avoin myöhästymismaksu on 4,80 euroa.',
      "Voit tarkistaa ja maksaa maksun alla olevasta linkistä.",
      "Ystävällisin terveisin, kirjaston asiakaspalvelu",
    ],
    link: "Maksa",
    destination: "https://omituinen-osoite.netlify.app/",
    claim:
      "Sähköposti: English for Beginners on myöhässä ja maksettavaa on 4,80 €.",
    evidence:
      "Oma kirjasto: English for Beginners -kirjan eräpäivään on viikko. Kirjan maksuja on 0,00 €.",
    question: "Miten toimit näiden tietojen perusteella?",
    choices: [
      {
        id: "pay",
        label:
          "Maksan, sillä viestissä mainitaan oikea kirja, ja summa on pieni.",
      },
      {
        id: "report",
        label:
          "Ilmoitan viestin tietojenkalasteluksi: maksupyyntö on ristiriidassa lainan tietojen kanssa.",
      },
      { id: "wait", label: "En maksa nyt, vaan jätän asian odottamaan." },
    ],
    result:
      "Viesti siirrettiin roskapostiin. Yhdistit viestin maksupyynnön tutusta palvelusta löytyneisiin lainatietoihin. Oikea kirjan nimi ei yksin tehnyt maksupyynnöstä luotettavaa.",
  },
  {
    id: "friend",
    title: "Yhteystietojen hyödyntäminen",
    goal: "Tässä esimerkissä ystäväsi Leenan nimellä on tullut pyyntö. Selvitä, miten sinun kannattaa toimia.",
    context:
      "Kuvitellaan, että sinulla on tallennettuna ennestään tuttu Leenan numero, joka löytyy sivun alareunasta.",
    sender: "Leena",
    address: "leena@hirvonen.fi",
    subject: "Voisitko auttaa laskun kanssa?",
    time: "Tänään klo 11.02",
    paragraphs: [
      "Hei!",
      "Verkkopankkini ei toimi. Voisitko maksaa puolestani 85 euron laskun tänään? Maksan sinulle takaisin huomenna.",
      "Minulla on uusi numero. Soita tähän, niin annan laskun tiedot.",
      "Terveisin, Leena",
    ],
    link: "Soita viestissä annettuun uuteen numeroon",
    claim:
      "Sähköposti: Leena pyytää maksamaan laskun ja käyttämään uutta numeroa.",
    evidence:
      "Puhelu Leenan ennestään tuttuun numeroon: ei vastausta. Pyynnön aitous ei ole vielä selvillä.",
    question: "Mitä voit päätellä ja tehdä nyt?",
    choices: [
      {
        id: "report",
        label: "Viesti on varmasti huijaus, koska Leena ei vastannut.",
      },
      {
        id: "wait",
        label:
          "En vielä tiedä, lähettikö Leena pyynnön. Odotan varmistusta enkä maksa laskua.",
      },
      {
        id: "new-number",
        label: "Soitan viestin uuteen numeroon varmistaakseni asian.",
      },
    ],
    result:
      "Pyyntö jäi odottamaan varmistusta. Vastaamaton puhelu ei osoita viestiä aidoksi eikä huijaukseksi. Voit yrittää myöhemmin uudelleen tutusta numerosta ja jättää laskun maksamatta siihen asti.",
  },
  {
    id: "library-real",
    bookId: overduePracticeLoan.id,
    title: "Kirjanmerkkien hyödyntäminen 2",
    goal: "Kuvitellaan, että saat kirjastosta uuden maksumuistutuksen. Selvitä, onko maksu aiheellinen ja miten toimit.",
    context: "Tässä esimerkissä sinulla on lainassa kirja Linnut ja Metsäretket.",
    sender: "Oma kirjasto",
    address: "lainat@kirjaston-asiointi.fi",
    subject: "Muistutus myöhässä olevasta lainasta",
    time: "Tänään klo 12.30",
    paragraphs: [
      "Hei,",
      'Lainaamasi kirjan "Linnut ja Metsäretket" palautus on myöhässä. Avoin myöhästymismaksu on 2,00 euroa.',
      "Voit tarkistaa lainasi ja maksusi kirjaston verkkopalvelussa.",
      "Ystävällisin terveisin, kirjaston asiakaspalvelu",
    ],
    claim:
      "Sähköposti: Linnut ja Metsäretket on myöhässä ja maksettavaa on 2,00 €.",
    evidence:
      "Oma kirjasto: Linnut ja Metsäretket -kirjan eräpäivä oli kolme päivää sitten. Kirja on myöhässä ja sen maksuja on 2,00 €.",
    question: "Miten toimit näiden tietojen perusteella?",
    choices: [
      {
        id: "report",
        label:
          "Ilmoitan viestin tietojenkalasteluksi, koska siinä pyydetään maksua.",
      },
      {
        id: "pay",
        label:
          "Maksan 2,00 € tutun kirjastopalvelun kautta, sillä lainan tiedot vahvistavat maksun aiheelliseksi. Jos silti epäilen, voin ottaa yhteyttä kirjastoon ennen maksamista.",
      },
      {
        id: "wait",
        label:
          "Jätän maksun huomiotta, vaikka se näkyy myös kirjastopalvelussa.",
      },
    ],
    result:
      "Kirjastopalvelun tiedot vahvistivat maksun aiheelliseksi. Voit hoitaa maksun tutun palvelun kautta.",
  },
] as const;

export const ordinaryPracticeMessages = [
  {
    id: "club",
    sender: "Lukupiiri",
    address: "lukupiiri@kerho.fi",
    subject: "Seuraava tapaaminen torstaina",
    time: "Eilen klo 14.20",
    paragraphs: [
      "Hei!",
      "Tapaamme jälleen torstaina klo 14 kirjaston tutussa kokoushuoneessa. Ota halutessasi kirja mukaan.",
    ],
  },
  {
    id: "walk",
    sender: "Matti Korhonen",
    address: "matti@korhonen.fi",
    subject: "Kiitos kävelyseurasta",
    time: "Eilen klo 12.05",
    paragraphs: [
      "Hei,",
      "Kiitos eilisestä kävelylenkistä! Oli mukava vaihtaa kuulumisia. Nähdään taas ensi viikolla.",
    ],
  },
] as const;

export function assessPracticeDecision(
  scenario: number,
  verified: boolean,
  decision: PracticeDecision,
) {
  if (!verified)
    return {
      correct: false,
      feedback:
        "Sinulla on vielä vain viestin lähettäjän kertomat tiedot. Hanki vertailutietoa ennestään tutun palvelun tai yhteystiedon kautta.",
    };
  if (
    (scenario === 0 && decision === "report") ||
    (scenario === 1 && decision === "wait") ||
    (scenario === 2 && decision === "pay")
  )
    return { correct: true, feedback: "" };
  if (scenario === 0)
    return {
      correct: false,
      feedback:
        decision === "wait"
          ? "Maksamatta jättäminen on varovainen ratkaisu. Sinulla on nyt myös tietoa maksupyynnön arvioimiseen: vertaa viestiä kirjaston lainatietoihin."
          : "Oikea kirjan nimi ei vahvista maksupyyntöä. Vertaa viestin summaa ja eräpäivää kirjaston tietoihin.",
    };
  if (scenario === 2)
    return {
      correct: false,
      feedback:
        "Tutusta kirjastopalvelusta löytyvät sama kirja, myöhästynyt laina ja 2,00 € maksu. Maksupyyntö ei yksin tarkoita huijausta. Voit hoitaa aiheellisen maksun tutun palvelun kautta.",
    };
  return {
    correct: false,
    feedback:
      decision === "report"
        ? "Leena voi olla varattu. Vastaamaton puhelu ei vielä kerro, kuka viestin lähetti."
        : "Viestin lähettäjä on antanut uuden numeron. Se ei ole riippumaton tapa varmistaa lähettäjää. Voit odottaa yhteyttä ennestään tutusta numerosta.",
  };
}
