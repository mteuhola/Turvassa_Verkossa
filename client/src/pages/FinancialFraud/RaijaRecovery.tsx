import { useEffect, useRef, useState } from "react";
import { CharacterPortrait } from "../../components/CourseGuide";
import shared from "./InvestmentActivity.module.css";
import styles from "./RaijaActivity.module.css";

type Step = "message" | "boundary" | "bank" | "call" | "feelings" | "support";

type Choice = { text: string; feedback: string; helpful: boolean };

const headings: Record<Step, string> = {
  message: "Hermanni pyytää taas rahaa",
  boundary: "Saanko lopettaa yhteydenpidon?",
  bank: "Apua jo lähetettyihin maksuihin",
  call: "Mitä Raija voi kertoa pankille?",
  feelings: "Tunteet olivat aitoja",
  support: "Mikä voisi auttaa Raijaa tänään?",
};

const choices: Partial<Record<Step, Choice[]>> = {
  message: [
    {
      text: "Ymmärrän, että haluat tavata Hermannin. Hän on kuitenkin pyytänyt rahaa jo useita kertoja, vaikka on luvannut tapaamista. En lähettäisi hänelle enää rahaa.",
      helpful: true,
      feedback:
        "Tämä vastaus huomioi Raijan tunteet mutta nostaa esille toistuvat rahapyynnöt ja toteutumattomat tapaamislupaukset. Uusien rahansiirtojen lopettaminen on turvallisin ratkaisu.",
    },
    {
      text: "Voisit pyytää Hermannilta tarkempaa selvitystä siitä, mihin hän tarvitsee rahat. Jos hän pystyy perustelemaan pyynnön, voit harkita asiaa uudelleen.",
      helpful: false,
      feedback:
        "Lisätietojen pyytäminen voi kuulostaa järkevältä. Hermanni voi kuitenkin keksiä uusia selityksiä tai esittää tekaistuja todisteita rahantarpeestaan. Tässä tilanteessa rahapyyntöjä on jo useita, joten hänen perusteluihinsa ei kannata nojata.",
    },
    {
      text: "Jos tämä on varmasti viimeinen maksu, 150 euroa ei ole kovin suuri summa verrattuna siihen, mitä olet jo lähettänyt. Voisit antaa hänelle vielä yhden mahdollisuuden.",
      helpful: false,
      feedback:
        "Vastaus hyödyntää samaa ajatusvirhettä, jota huijarit voivat käyttää hyväkseen: koska rahaa on jo lähetetty paljon, vielä yhden maksun tekeminen saattaa tuntua pieneltä riskiltä. Aiemmin lähetetty raha ei kuitenkaan tee seuraavasta maksusta turvallisempaa.",
    },
  ],
  boundary: [
    {
      text: "Voisit kertoa Hermannille, miksi et aio enää lähettää rahaa. Ehkä hän ymmärtää päätöksesi ja voitte jatkaa yhteydenpitoa ilman rahapyyntöjä.",
      helpful: false,
      feedback:
        "Päätöksen selittäminen voi tuntua kohteliaalta ja reilulta. Hermanni voi kuitenkin käyttää keskustelua hyväkseen yrittämällä saada Raijan muuttamaan mielensä esimerkiksi vetoamalla tämän tunteisiin.",
    },
    {
      text: "Jos yhteydenpidon lopettaminen tuntuu liian vaikealta, voit jatkaa keskustelua Hermannin kanssa, kunhan et enää lähetä hänelle rahaa.",
      helpful: false,
      feedback:
        "Yhteydenpidon jatkaminen ilman rahansiirtoja voi vaikuttaa sopivalta kompromissilta. Se antaa kuitenkin Hermannille lisää mahdollisuuksia painostaa Raijaa tai rakentaa hänen luottamustaan uudelleen.",
    },
    {
      text: "Sinun ei tarvitse perustella päätöstäsi Hermannille. Ymmärrän, että yhteydenpidon lopettaminen voi tuntua vaikealta, mutta se on turvallisinta, vaikka sinulla olisi vielä tunteita häntä kohtaan.",
      helpful: true,
      feedback:
        "Raijan tunteita ei vähätellä, mutta hänelle kerrotaan, ettei hänen tarvitse perustella päätöstään epäillylle huijarille. Yhteydenpidon lopettaminen on turvallisin vaihtoehto.",
    },
  ],
  call: [
    {
      text: "Olen lähettänyt nettituttavalleni rahaa, mutta nyt epäilen, ettei hän ole ollut rehellinen minulle. Voitteko tarkistaa, onko hänen tilissään jotain epäilyttävää?",
      helpful: false,
      feedback:
        "Raija kertoo epäilyksestään, mikä on hyvä alku. Pankki ei kuitenkaan välttämättä voi selvittää tai kertoa toisen henkilön tilitietoja. Tärkeämpää on kertoa omista rahansiirroista ja huijausepäilystä.",
    },
    {
      text: "Epäilen joutuneeni romanssihuijauksen kohteeksi. Olen lähettänyt nettituttavalleni ensin 200 euroa ja myöhemmin 300 euroa. Voitteko auttaa selvittämään, onko rahansiirroille vielä tehtävissä jotain?",
      helpful: true,
      feedback:
        "Raija kertoo avoimesti huijausepäilystä, jo lähettämistään summista ja pyytää pankilta apua. Pankki voi selvittää, onko maksuille vielä mahdollista tehdä jotain.",
    },
    {
      text: "Haluaisin selvittää muutaman tekemäni rahansiirron. En kuitenkaan ole varma, onko kyseessä huijaus, joten en vielä haluaisi kertoa tarkemmin, mistä on kyse.",
      helpful: false,
      feedback:
        "Omien rahansiirtojen selvittäminen on järkevä aloite, mutta huijausepäilystä kertominen auttaa pankkia arvioimaan tilanteen kiireellisyyttä ja tarvittavia toimenpiteitä.",
    },
  ],
  feelings: [
    {
      text: "Et tietenkään ollut typerä. Nyt kun tiedät totuuden Hermannista, sinun kannattaa keskittyä muihin asioihin ja yrittää jättää hänet taaksesi.",
      helpful: false,
      feedback:
        "Vastaus pyrkii lohduttamaan Raijaa ja kannustaa jatkamaan eteenpäin. Se kuitenkin ohittaa hänen tämänhetkisen surunsa ja saattaa antaa ymmärtää, että tapahtuneesta pitäisi päästä nopeasti yli.",
    },
    {
      text: "Et ollut typerä. Sinun tunteesi olivat aitoja, vaikkei Hermanni ollutkaan rehellinen. Hän käytti luottamustasi hyväkseen, ja on ymmärrettävää, että sinulla on häntä ikävä.",
      helpful: true,
      feedback:
        "Vastaus tunnistaa Raijan tunteiden aitouden ja hyväksyy sen, että huijauksen paljastuminen voi tuntua ihmissuhteen menettämiseltä. Samalla se tekee selväksi, ettei Raijan luottamus ollut typeryyttä.",
    },
    {
      text: "Ymmärrän, että sinulla on häntä ikävä. Ehkä voit ajatella, että sait suhteesta myös hyviä muistoja, vaikka se päättyikin ikävästi.",
      helpful: false,
      feedback:
        "Myönteisten muistojen arvostaminen voi auttaa joitakin ihmisiä käsittelemään tapahtunutta. Tässä tilanteessa se voi kuitenkin vähätellä huijausta ja sivuuttaa Raijan kysymyksen siitä, oliko hän typerä luottaessaan Hermanniin.",
    },
  ],
};

const supportChoices = [
  {
    text: "Voisitko soittaa tänään ystävälle tai muulle läheiselle? Joskus jo se, että saa jutella jonkun kanssa, voi helpottaa oloa.",
    response:
      "Hyvä ehdotus! Luotettavan ihmisen kanssa keskusteleminen voi helpottaa pahaa oloa. Minun ei tarvitsisi käsitellä tapahtunutta yksin, eikä kertoa enempää kuin itse haluan.",
  },
  {
    text: "Haluaisitko pyytää ystävää mukaan kävelylle tai kahville? Yhdessä tekeminen voisi auttaa saamaan ajatukset hetkeksi muualle.",
    response:
      "Hyvä ehdotus! Läheisen kanssa vietetty aika voi tuoda lohtua ja auttaa ajatusten siirtämisessä hetkeksi muihin asioihin. Minun ei tarvitse selviytyä vaikeista tunteistani yksin.",
  },
];

function RaijaQuote({ children }: { children: string }) {
  return (
    <blockquote className={styles.quote}>
      <p>”{children}”</p>
      <footer>Raija</footer>
    </blockquote>
  );
}

export default function RaijaRecovery({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState<Step>("message");
  const [selected, setSelected] = useState<number | null>(null);
  const [support, setSupport] = useState<number | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const options = choices[step];
  const answer = selected === null ? undefined : options?.[selected];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "nearest" });
  }, [step]);

  useEffect(() => {
    if (answer?.helpful || support !== null) {
      next.current?.focus({ preventScroll: true });
    }
  }, [answer, support]);

  function advance(target: Step) {
    setSelected(null);
    setStep(target);
  }

  return (
    <section
      className={styles.recovery}
      aria-labelledby="raija-recovery-heading"
    >
      <h2 id="raija-recovery-heading" ref={heading} tabIndex={-1}>
        {headings[step]}
      </h2>

      {step === "message" && (
        <>
          <div
            className={styles.messenger}
            aria-label="Uusi viesti Hermannilta"
          >
            <h3>Hermanni</h3>
            <p>
              Rakas, tarvitsisin vielä 150 euroa matkaa varten. Sitten pääsen vihdoin luoksesi. 
              Tämä on varmasti viimeinen kerta, lupaan. Autathan minua vielä tämän kerran? ❤️
            </p>
          </div>
          <RaijaQuote>
            Lähetin Hermannille jo ne 300 euroa aiempien 200 euron lisäksi. Nyt hän pyytää taas lisää. Haluaisin uskoa, että tämä olisi oikeasti viimeinen maksu. Mitä minun kannattaisi tehdä?
          </RaijaQuote>
        </>
      )}

      {step === "boundary" && (
        <RaijaQuote>
          Pitäisikö minun vielä selittää Hermannille, miksi en aio lähettää rahaa? En haluaisi vain kadota hänen elämästään, sillä minulla on kuitenkin edelleen tunteita häntä kohtaan. Mitä minun kannattaisi tehdä?
        </RaijaQuote>
      )}

      {step === "bank" && (
        <>
          <RaijaQuote>
            En lähetä enää rahaa. Mutta mitä voin tehdä niille maksuille, jotka
            olen jo lähettänyt?
          </RaijaQuote>
          <p>
            Ota heti yhteyttä omaan pankkiin. Pankki selvittää, voiko maksuihin
            vielä puuttua. Rahojen palautumista ei voida luvata.
          </p>
          <p>
            Raija löytää yhteystiedot pankkinsa omasta sovelluksesta. Olet
            tukena, kun hän kertoo maksuista.
          </p>
          <button
            type="button"
            className={styles.primary}
            onClick={() => advance("call")}
          >
            Soita pankkiin (harjoitus)
          </button>
        </>
      )}

      {step === "call" && (
        <>
          <p className={styles.small}>Harjoituspuhelu Raijan omaan pankkiin</p>
          <blockquote className={styles.quote}>
            <p>”Tonttupankin asiakaspalvelusta hyvää päivää, kuinka voin auttaa?”</p>
            <footer>Pankin työntekijä</footer>
          </blockquote>
        </>
      )}

      {step === "feelings" && (
        <div className={shared.introduction}>
          <div className={shared.portrait}>
            <CharacterPortrait courseId="financial-fraud" />
          </div>
          <blockquote className={shared.introQuote}>
            <p>
              ”Tiedän nyt, että hän huijasi minua. Silti minulla on häntä ikävä.
              Minulle ne keskustelut ja tunteet olivat oikeita. Olinko minä ihan
              hyväuskoinen ja typerä?”
            </p>
            <footer>Raija</footer>
          </blockquote>
        </div>
      )}

      {options && (
        <>
          <p id="raija-answer-help">
            {step === "call"
              ? "Valitse, miten Raija aloittaa kertomuksensa."
              : "Valitse, mitä sanoisit Raijalle."}
          </p>
          <div
            className={styles.conversationChoices}
            role="group"
            aria-labelledby="raija-answer-help"
          >
            {options.map((choice, index) => (
              <button
                key={`${step}-${index}`}
                type="button"
                aria-pressed={selected === index}
                disabled={!!answer?.helpful}
                onClick={() => setSelected(index)}
              >
                {choice.text}
              </button>
            ))}
          </div>
          <p className={styles.feedback} role="status" aria-atomic="true">
            {answer?.feedback}
          </p>
          {answer?.helpful && (
            <>
              {step === "boundary" && (
                <p>
                  Raija ottaa keskustelun talteen ja estää Hermannin. Hänen ei
                  tarvitse enää vastata rahapyyntöihin.
                </p>
              )}
              {step === "call" && (
                <p>
                  Harjoituspuhelu päättyi. Raija päättää tehdä rikosilmoituksen
                  pankin ohjeen mukaisesti.
                </p>
              )}
              <button
                ref={next}
                type="button"
                className={styles.primary}
                onClick={() =>
                  advance(
                    step === "message"
                      ? "boundary"
                      : step === "boundary"
                        ? "bank"
                        : step === "call"
                          ? "feelings"
                          : "support",
                  )
                }
              >
                {step === "message"
                  ? "Jatka Raijan kanssa"
                  : step === "boundary"
                    ? "Auta Raijaa ottamaan yhteyttä pankkiin"
                    : step === "call"
                      ? "Kuuntele Raijan tunteita"
                      : "Mieti yhdessä, mikä auttaisi tänään"}
              </button>
            </>
          )}
        </>
      )}

      {step === "support" && (
        <>
          <p>
            Raija on nyt lopettanut yhteydenpidon Hermanniin, ottanut yhteyttä pankkiinsa ja tehnyt rikosilmoituksen poliisille. Hän on hoitanut tärkeimmät käytännön asiat, mutta tapahtunut painaa edelleen hänen mieltään.
          </p>
          <RaijaQuote>
            Minulla on vielä paha mieli kaikesta tapahtuneesta. En oikein haluaisi olla tänään yksin ajatusteni kanssa. Mitähän voisin tehdä?
          </RaijaQuote>
          <p id="raija-support-help">
            Ehdota Raijalle, miten hän voisi viettää aikaa läheistensä kanssa. Molemmat vaihtoehdot voivat auttaa.
          </p>
          <div
            className={styles.conversationChoices}
            role="group"
            aria-labelledby="raija-support-help"
          >
            {supportChoices.map((choice, index) => (
              <button
                key={choice.text}
                type="button"
                aria-pressed={support === index}
                onClick={() => setSupport(index)}
              >
                {choice.text}
              </button>
            ))}
          </div>
          <p className={styles.feedback} role="status" aria-atomic="true">
            {support !== null
              ? `Raija: ${supportChoices[support].response}`
              : ""}
          </p>
          {support !== null && (
            <button
              ref={next}
              type="button"
              className={styles.primary}
              onClick={onFinish}
            >
              Päätä harjoitus
            </button>
          )}
        </>
      )}
    </section>
  );
}
