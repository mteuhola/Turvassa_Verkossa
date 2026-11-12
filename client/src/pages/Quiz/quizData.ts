interface QuestionBase {
  id: string;
  prompt: string;
  explanation: string;
}
export interface ChoiceQuestion extends QuestionBase {
  type: "single" | "multiple";
  options: { id: string; text: string }[];
  correctOptionIds: string[];
}
export interface PracticePasswordQuestion extends QuestionBase {
  type: "practice-password";
}
export type QuizQuestion = ChoiceQuestion | PracticePasswordQuestion;
export interface CourseQuiz {
  questions: QuizQuestion[];
}

export const courseQuizzes: Record<string, CourseQuiz> = {
  passwords: {
    questions: [
      {
        id: "unique",
        type: "single",
        prompt: "Mikä on hyvä tapa käyttää salasanoja eri palveluissa?",
        options: [
          { id: "first", text: "Käytän samaa vahvaa salasanaa kaikkialla." },
          {
            id: "second",
            text: "Käytän jokaisessa palvelussa omaa vahvaa salasanaa.",
          },
          {
            id: "third",
            text: "Lisään saman salasanan loppuun palvelun nimen.",
          },
        ],
        correctOptionIds: ["second"],
        explanation:
          "Oma salasana jokaisessa palvelussa estää yhden palvelun salasanavuotoa avaamasta muita tilejäsi. Palvelun nimen lisääminen tekee salasanan arvattavaksi, koska se antaa tietoa siitä, missä palvelussa salasanaa käytetään.",
      },
      {
        id: "strong",
        type: "multiple",
        prompt: "Mitkä tavat auttavat suojaamaan tilejäsi?",
        options: [
          {
            id: "first",
            text: "Valitsen pitkän salasanan, jossa on toisiinsa liittymättömiä sanoja.",
          },
          { id: "second", text: "Toistan samaa lyhyttä sanaa monta kertaa." },
          {
            id: "third",
            text: "Käytän salasanojen hallintaohjelmaa erilaisten salasanojen luomiseen ja muistamiseen.",
          },
          { id: "fourth", text: "Otan monivaiheisen tunnistautumisen käyttöön." },
        ],
        correctOptionIds: ["first", "third", "fourth"],
        explanation:
          "Pituus ja arvaamattomuus auttavat. Salasanojen hallintaohjelma helpottaa erilaisten salasanojen käyttöä, ja monivaiheinen tunnistautuminen tuo lisäsuojaa. Ennustettava toisto ei yksin tee salasanasta vahvaa.",
      },
      {
        id: "unique",
        type: "single",
        prompt: "Mikä seuraavista on ohjepituus salasanalle?",
        options: [
          {
            id: "first",
            text: "Pituudella ei ole merkitystä, kunhan salasana on vaikeasti arvattava.",
          },
          {
            id: "second",
            text: "15 merkkiä",
          },
          {
            id: "third",
            text: "12 merkkiä",
          },
          {
            id: "fourth",
            text: "9 merkkiä",
          },
        ],
        correctOptionIds: ["second"],
        explanation:
          "15 merkkiä on suositeltava pituus vahvan salasanan luomiseksi.",
      },
      {
        id: "strong",
        type: "single",
        prompt:
          "Totta vai tarua: Verkkoselainten salasanojen hallintaohjelmat ovat turvallisempia kuin erilliset salasanojen hallintaohjelmat.",
        options: [
          {
            id: "true",
            text: "Totta",
          },
          {
            id: "false",
            text: "Tarua",
          },
        ],
        correctOptionIds: ["false"],
        explanation:
          "Selainten salasanojen hallintaohjelmien käyttö on kätevää, mutta se ei ole yhtä turvallista kuin erillisten salasanojen hallintaohjelmien käyttäminen: selaimen salasanoihin pääsee helpommin käsiksi, ja selaimeen tallennetut salasanat voivat olla alttiita haittaohjelmille ja selaimen haavoittuvuuksille.",
      },
      {
        id: "recall",
        type: "practice-password",
        prompt: "Käytä tallentamaasi harjoitussalasanaa.",
        explanation:
          "Syötit saman harjoitussalasanan kuin tallensit. Oikeita salasanoja ei tarvitse opetella kaikkia ulkoa: salasanojen hallintaohjelma auttaa muistamaan ne.",
      },
    ],
  },
  phishing: {
    questions: [
      {
        id: "verify",
        type: "single",
        prompt:
          "Saat sähköpostin, jonka mukaan pankkitilisi suljetaan heti. Mitä teet?",
        options: [
          {
            id: "first",
            text: "Avaan viestin linkin nopeasti ja kirjaudun sisään.",
          },
          {
            id: "second",
            text: "Tarkistan asian pankin omasta sovelluksesta tai tutusta puhelinnumerosta.",
          },
          {
            id: "third",
            text: "Vastaan viestiin ja lähetän pyydetyn vahvistuskoodin.",
          },
        ],
        correctOptionIds: ["second"],
        explanation:
          "Kiireellä voidaan painostaa toimimaan tarkistamatta. Tarkista asia itse tuntemasi kanavan kautta ja pidä salasana sekä vahvistuskoodit omana tietonasi.",
      },
      {
        id: "clues",
        type: "multiple",
        prompt: "Mitkä seuraavista ovat syitä epäillä viestiä?",
        options: [
          {
            id: "first",
            text: "Viestissä pyydetään antamaan salaisia tietojani ja lähettämään ne sähköpostilla.",
          },
          {
            id: "second",
            text: "Minua kielletään tarkistamasta asiaa pankilta tai läheiseltä.",
          },
          {
            id: "third",
            text: "Odottamattomassa viestissä on liitteenä tiedosto, joka pyydetään asentamaan.",
          },
          {
            id: "fourth",
            text: "Viestissä on pieniä kirjoitusvirheitä.",
          },
        ],
        correctOptionIds: ["first", "second", "third"],
        explanation:
          "Salaisten tietojen pyytäminen, tarkistamisen estäminen ja odottamaton ohjelmaliite ovat varoitusmerkkejä.",
      },
      {
        id: "verify",
        type: "single",
        prompt:
          "Saat verkkokaupan nimissä sähköpostin, jossa pyydetään vahvistamaan tilauksesi tiedot. Viesti on kirjoitettu virheettömällä suomen kielellä, ja siinä on verkkokaupan tuttu logo. Olet myös hiljattain tehnyt tilauksen kyseisestä kaupasta. Mitä tästä voidaan päätellä?",
        options: [
          {
            id: "first",
            text: "Viesti on todennäköisesti aito, koska se liittyy tekemääni tilaukseen ja näyttää verkkokaupan omalta viestiltä.",
          },
          {
            id: "second",
            text: "Viesti voi olla aito tai huijaus. Sen ulkoasu, kieliasu ja sopiva ajankohta eivät yksin takaa viestin luotettavuutta.",
          },
          {
            id: "third",
            text: "Viesti on huijaus, koska oikeat verkkokaupat eivät lähetä sähköpostitse pyyntöjä tilaustietojen vahvistamisesta.",
          },
        ],
        correctOptionIds: ["second"],
        explanation:
          "Huijausviestit voivat näyttää hyvin aidoilta, ja niiden sisältö voi sattumalta liittyä vastaanottajan ajankohtaiseen tilanteeseen. Toisaalta aidotkin verkkokaupat voivat lähettää viestejä tilausten vahvistamisesta. Siksi viestin luotettavuutta ei voi päätellä pelkästään sen ulkoasusta tai sisällön sopivuudesta omaan tilanteeseen.",
      },
      {
        id: "scammed",
        type: "multiple",
        prompt:
          "Kuvitellaan, että ystäväsi kertoo sinulle antaneensa pankkitunnuksensa huijaussivustolle. Hän on huolissaan ja sanoo, ettei halua kertoa asiasta kenellekään muulle, koska häntä hävettää. Miten voit auttaa häntä?",
        options: [
          {
            id: "first",
            text: "Kiitä häntä tilanteesta kertomisesta ja kerro, että sama olisi voinut tapahtua kelle tahansa.",
          },
          {
            id: "second",
            text: "Sano, etteivät rikolliset kuitenkaan tee mitään hänen tunnuksillaan, ja annat asian olla.",
          },
          {
            id: "third",
            text: "Neuvo ystävääsi tekemään rikosilmoitus.",
          },
          {
            id: "fourth",
            text: "Neuvo ystävääsi soittamaan pankilleen.",
          },
          {
            id: "fifth",
            text: "Kysy, antoiko hän muita tietojaan, kuten salasanojansa huijaussivustolle. Jos antoi, vaihdatte salasanat.",
          },
        ],
        correctOptionIds: ["first", "third", "fourth", "fifth"],
        explanation:
          "Ystävän tukena oleminen, sekä rikosilmoituksen tekeminen ja pankille ilmoittaminen ovat tärkeitä asioita.",
      },
    ],
  },
  "financial-fraud": {
    questions: [
      {
        id: "investment",
        type: "single",
        prompt:
          "Huijari voi esimerkiksi kehua henkilön sijoitustaitoja tai osoittaa häntä kohtaan runsaasti kiinnostusta. Mikä voi olla tällaisen toiminnan tarkoitus?",
        options: [
          { id: "first", text: "Saadakseen vastaanottajan luottamaan häneen ja suhtautumaan tarjoukseen myönteisemmin." },
          {
            id: "second",
            text: "Selvittääkseen, kuinka paljon vastaanottaja tietää sijoittamisesta ja osoittaakseen ollakseen oikeasti vaikuttunut.",
          },
          {
            id: "third",
            text: "Varmistaakseen, että vastaanottaja ymmärtää kaikki tarjoukseen liittyvät riskit",
          },
        ],
        correctOptionIds: ["first"],
        explanation:
          "Huijari voi pyrkiä herättämään luottamusta ja saamaan vastaanottajan tuntemaan itsensä arvostetuksi. Kehuminen ei kuitenkaan yksin tarkoita huijausta, sillä se kuuluu myös tavalliseen vuorovaikutukseen.",
      },
      {
        id: "offers",
        type: "single",
        prompt: "Neljä sijoituspalvelua esittelee mahdollisuuksia sijoittaa säästöjä. Mikä seuraavista lähestymistavoista herättää eniten epäilyksiä?",
        options: [
          {
            id: "first",
            text: "Sijoitukselle kerrotaan tavoiteltu voitto, mutta samalla kerrotaan, että sijoituksen arvo voi myös laskea.",
          },
          {
            id: "second",
            text: "Sijoitukselle arvioidaan valtavia tuottoja ja vakuutetaan arvon laskemisen riskin olevan todella pieni.",
          },
          {
            id: "third",
            text: "Sijoituksen tarjoaja kertoo, että sijoituksen arvo voi vaihdella taloustilanteen mukaan.",
          },
          {
            id: "fourth",
            text: "Sijoituksen tarjoaja myöntää huomanneensa, ettei tarjous sovi kohdehenkilölle, ja lopettaa puhelun.",
          },
        ],
        correctOptionIds: ["second"],
        explanation:
          "Suurten tuottojen lupaaminen ilman minkäänlaista riskiä on merkittävä varoitusmerkki. Sijoituksiin liittyy aina riskejä, eikä suurta tuottoa voida taata.",
      },
      {
        id: "signs",
        type: "multiple",
        prompt: "Henkilö on tutustunut verkossa uuteen tuttavuuteen. He ovat viestitelleet pitkään ja olleet myös videopuhelussa. Tuttavuus kertoo tarvitsevansa rahaa henkilökohtaiseen ongelmaan. Mitkä seuraavista väitteistä pitävät paikkansa?",
        options: [
          {
            id: "first",
            text: "Pitkään jatkunut viestittely ei yksin todista, että toinen henkilö on rehellinen.",
          },
          {
            id: "second",
            text: "Videopuhelussa esiintyminen varmistaa, että henkilö on kertonut totuuden itsestään ja tarkoituksistaan.",
          },
          {
            id: "third",
            text: "Rahapyynnöistä kieltäytyminen ja vastapuolen suhtautuminen päätökseen voivat kertoa paljon tilanteesta.",
          },
          {
            id: "fourth",
            text: "Yllättävä rahapyyntö tarkoittaa aina, että kyseessä on romanssihuijaus.",
          },
          {
            id: "fifth",
            text: "Toistuvat esteet tapaamiselle yhdessä rahapyyntöjen kanssa voivat olla huolestuttava merkki.",
          },
        ],
        correctOptionIds: ["first", "third", "fifth"],
        explanation:
          "Pitkä yhteydenpito tai videopuhelu ei yksin takaa toisen rehellisyyttä. Myöskään yksittäinen rahapyyntö ei automaattisesti tarkoita huijausta. Huomiota kannattaa kiinnittää tilanteen kokonaisuuteen, erityisesti rahapyyntöjen toistumiseen, tapaamisten lykkääntymiseen ja painostamiseen.",
      },
      {
        id: "actions",
        type: "multiple",
        prompt: "Henkilö huomaa, että sijoituspalvelu saattaa olla huijaus. Hän on jo siirtänyt palveluun rahaa ja käyttänyt kirjautumiseen samaa salasanaa kuin sähköpostissaan. Palvelu vaatii nyt ylimääräistä maksua ennen rahojen nostamista. Mitkä seuraavista ovat turvallisia toimintatapoja?",
        options: [
          {
            id: "first",
            text: "Ottaa mahdollisimman pian yhteyttä pankkiin ja kertoa tapahtuneesta.",
          },
          {
            id: "second",
            text: "Vaihtaa sijoituspalvelussa käytetyn salasanan myös muissa palveluissa, joissa sama salasana on käytössä.",
          },
          {
            id: "third",
            text: "Maksaa pyydetty käsittelymaksu, jos sijoituspalvelu toimittaa siitä virallisen näköisen laskun.",
          },
          {
            id: "fourth",
            text: "Säilyttää keskustelut ja maksutositteet mahdollista rikosilmoitusta varten.",
          },
          {
            id: "fifth",
            text: "Kokeilla sijoittaa pieni lisäsumma varmistaakseen, että sijoituspalvelu toimii edelleen.",
          },
          {
            id: "sixth",
            text: "Varautua siihen, että joku voi myöhemmin tarjota menetettyjen rahojen palauttamista maksua vastaan.",
          },
        ],
        correctOptionIds: ["first", "second", "fourth", "sixth"],
        explanation:
          "Huijausepäilyn jälkeen kannattaa estää lisävahinkoja: ottaa yhteyttä pankkiin, vaihtaa mahdollisesti paljastuneet salasanat ja säilyttää todisteet rikosilmoitusta varten. Uusia maksuja ei pidä tehdä, vaikka niitä perusteltaisiin rahojen palauttamisella. Myös myöhemmät tarjoukset menetettyjen rahojen palauttamisesta voivat olla uusia huijausyrityksiä.",
      },
    ],
  },
};

export function isChoiceAnswerCorrect(
  question: ChoiceQuestion,
  selected: string[],
): boolean {
  const chosen = new Set(selected);
  const correct = new Set(question.correctOptionIds);
  return (
    chosen.size > 0 &&
    chosen.size === selected.length &&
    chosen.size === correct.size &&
    (question.type !== "single" || chosen.size === 1) &&
    [...chosen].every((id) => correct.has(id))
  );
}
