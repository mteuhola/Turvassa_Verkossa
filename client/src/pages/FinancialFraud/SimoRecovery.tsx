import { useEffect, useRef, useState } from "react";
import { CharacterPortrait } from "../../components/CourseGuide";
import shared from "./InvestmentActivity.module.css";
import styles from "./RaijaActivity.module.css";

const moments = [
  {
    title: "Miten ottaisin asian puheeksi?",
    message:
      "Simo sijoitti jo 2500 euroa siihen lomakylään, josta kerroin aiemmin. Nyt sijoituspalvelusta sanottiin, että hänen pitäisi maksaa vielä yksi käsittelymaksu, jotta hän saisi rahansa takaisin. Simo uskoo edelleen, että kaikki on kunnossa, mutta minua epäilyttää. Miten voisin ottaa asian hänen kanssaan puheeksi?",
    choices: [
      {
        text: "Tuo kuulostaa kyllä huijaukselta. Sinun kannattaisi lopettaa heti, ennen kuin menetät vielä enemmän rahaa.",
        correct: false,
        feedback:
          "Huoli on aiheellinen ja uusien maksujen lopettaminen olisi turvallista. Ilmaisu voi kuitenkin tuntua Simosta liian jyrkältä, koska hän uskoo edelleen sijoitukseen. Se saattaa saada hänet puolustamaan päätöstään.",
      },
      {
        text: "Minua huolestuttaa tuo ylimääräinen maksu. Voisimmeko selvittää yhdessä, miksi sitä pyydetään ja onko sijoituspalvelu luotettava, vaikka yrityksen tiedot löytyvätkin verkosta?",
        correct: true,
        feedback:
          "Huolen voi ottaa puheeksi syyttämättä. Näin Simon on helpompi puhua tilanteestaan avoimesti.",
      },
      {
        text: "Jos sijoituspalvelu on tähän asti vaikuttanut luotettavalta, ehkä kannattaa vielä kysyä heiltä tarkemmin, mistä lisämaksussa on kyse.",
        correct: false,
        feedback:
          "Lisätietojen selvittäminen kuulostaa järkevältä, mutta huijauksesta epäillyn palvelun omiin vastauksiin ei kannata luottaa. Huijari voi keksiä uusia perusteluja maksulle.",
      },
    ],
  },
  {
    title: "Mitä neuvoisin Simoa tekemään?",
    message:
      "Simo aikoo maksaa vielä yhden käsittelymaksun, koska sijoituspalvelu lupaa palauttaa hänen rahansa sen jälkeen. Hän sanoo, ettei halua menettää jo sijoittamiaan rahoja. Mitä neuvoisin häntä tekemään nyt?",
    choices: [
      {
        text: "Ymmärrän, että haluat rahasi takaisin. Voisit vielä selvittää, onko muilla sijoittajilla ollut samanlaisia ongelmia, ennen kuin päätät maksusta.",
        correct: false,
        feedback:
          "Muiden kokemusten selvittäminen voi auttaa arvioimaan sijoituspalvelun luotettavuutta, mutta tässä tilanteessa on jo vahvoja merkkejä huijauksesta. Lisätietojen etsiminen viivästyttää pankkiin yhteyden ottamista.",
      },
      {
        text: "Pyydä sijoituspalvelulta kirjallinen vahvistus siitä, että saat rahasi takaisin maksun jälkeen. Älä maksa ennen kuin olet saanut sen.",
        correct: false,
        feedback:
          "Kirjallisen vahvistuksen pyytäminen voi vaikuttaa varovaiselta toiminnalta, mutta huijari voi antaa valheellisia lupauksia myös kirjallisesti.",
      },
      {
        text: "Älä maksa enää mitään. Ota mahdollisimman pian yhteyttä omaan pankkiisi ja kerro, mitä on tapahtunut.",
        correct: true,
        feedback:
          "Uusien maksujen lopettaminen on tärkeää, jottei Simo menetä enää lisää rahaa. Pankkiin kannattaa ottaa yhteyttä mahdollisimman nopeasti, sillä pankki voi selvittää rahansiirtoihin liittyviä mahdollisuuksia, kuten niiden perumista tai estämistä.",
      },
    ],
  },
  {
    title: "Miten voisin olla tukena?",
    message:
      "Simoa harmittaa kovasti, että hän menetti rahaa. Hän sanoo, että hänen olisi pitänyt huomata huijaus aikaisemmin, eikä haluaisi kertoa tapahtuneesta kenellekään häpeän vuoksi. Mitä voisin sanoa hänelle?",
    choices: [
      {
        text: "Huijaukset voivat olla todella uskottavia, eikä sinun tarvitse hävetä tapahtunutta. Voin auttaa sinua tekemään rikosilmoituksen, jos haluat.",
        correct: true,
        feedback:
          "Näin Raija suhtautuu Simoon ymmärtäväisesti eikä syyllistä häntä. Hän myös tarjoaa konkreettista apua rikosilmoituksen tekemiseen, jolloin Simon ei tarvitse selvittää tapahtunutta yksin.",
      },
      {
        text: "Ymmärrän, että sinua harmittaa. Ehkä sinun kannattaisi yrittää unohtaa tapahtunut ja keskittyä muihin asioihin.",
        correct: false,
        feedback:
          "Raija voi näin yrittää lohduttaa Simoa, mutta tapahtuneen unohtamiseen kannustaminen voi vähätellä hänen kokemustaan. Lisäksi huijauksesta ilmoittaminen on tärkeää, vaikka rahat olisivat jo menneet.",
      },
      {
        text: "Älä syytä itseäsi liikaa. Tärkeintä on, että opit tästä kokemuksesta ja osaat jatkossa olla varovaisempi.",
        correct: false,
        feedback:
          "Raija yrittää vähentää Simon itsesyytöksiä, mutta tulevaisuuden varovaisuuden korostaminen voi tuntua Simosta syyllistävältä. Se ei myöskään tarjoa apua tämänhetkiseen tilanteeseen.",
      },
    ],
  },
];

export function RecoverySupportLinks() {
  return (
    <details className={styles.document}>
      <summary>Lisää apua</summary>
      <p>Säilytä viestit ja maksutiedot. Tee myös rikosilmoitus poliisille.</p>
      <p>
        <a
          href="https://www.riku.fi/nettihuijaus/"
          target="_blank"
          rel="noreferrer"
        >
          RIKU: tukea ja neuvoja huijauksen jälkeen
        </a>
      </p>
      <p>
        <a href="https://nettideittiturva.fi/" target="_blank" rel="noreferrer">
          Nettideittiturva: apua romanssihuijauksen kokeneille
        </a>
      </p>
      <p className={styles.small}>Linkit avautuvat uuteen välilehteen.</p>
    </details>
  );
}

export default function SimoRecovery({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const moment = moments[step];
  const answer = selected === null ? null : moment?.choices[selected];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "nearest" });
  }, [step]);

  useEffect(() => {
    if (answer?.correct) next.current?.focus({ preventScroll: true });
  }, [answer]);

  return (
    <section className={styles.simoPractice} aria-labelledby="simo-heading">
      <h2 id="simo-heading" ref={heading} tabIndex={-1}>
        {moment ? moment.title : "Nyt tiedän, miten voin auttaa"}
      </h2>
      {moment ? (
        <>
          <p className={styles.small}>
            Kysymys {step + 1}/{moments.length}
          </p>
          <blockquote className={styles.quote}>
            <p>”{moment.message}”</p>
            <footer>Raija</footer>
          </blockquote>
          <p id="simo-choice-help">Valitse, mitä Raija voisi sanoa Simolle.</p>
          <div
            className={styles.conversationChoices}
            role="group"
            aria-labelledby="simo-choice-help"
          >
            {moment.choices.map((choice, index) => (
              <button
                key={`${step}-${index}`}
                type="button"
                aria-pressed={selected === index}
                disabled={!!answer?.correct}
                onClick={() => setSelected(index)}
              >
                {choice.text}
              </button>
            ))}
          </div>
          <p className={styles.feedback} role="status" aria-atomic="true">
            {answer?.feedback}
          </p>
          {answer?.correct && (
            <button
              ref={next}
              type="button"
              className={styles.primary}
              onClick={() => {
                setSelected(null);
                setStep((current) => current + 1);
              }}
            >
              {step === moments.length - 1 ? "Jatka" : "Seuraava kysymys"}
            </button>
          )}
        </>
      ) : (
        <>
          <div className={shared.introduction}>
            <div className={shared.portrait}>
              <CharacterPortrait courseId="financial-fraud" complete />
            </div>
            <blockquote className={shared.introQuote}>
              <p>
                ”Kerron huolestani rauhallisesti, neuvon Simoa olemaan
                maksamatta lisää ja ottamaan heti yhteyttä pankkiin. Tarjoan
                tukeani, jotta hänen ei tarvitse selvittää tätä yksin.”
              </p>
              <footer>Raija</footer>
            </blockquote>
          </div>
          <button type="button" className={styles.primary} onClick={onFinish}>
            Jatka Raijan kanssa
          </button>
        </>
      )}
    </section>
  );
}
