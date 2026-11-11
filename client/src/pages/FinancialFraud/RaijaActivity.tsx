import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CourseBook from "../../components/CourseBook";
import CompletionBadge from "../../components/CompletionBadge";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import { CharacterPortrait } from "../../components/CourseGuide";
import type { TextSizeProps } from "../../components/TextSizeControl";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { recoveryCases, type RecoveryCase } from "./recoveryCases";
import shared from "./InvestmentActivity.module.css";
import styles from "./RaijaActivity.module.css";
import SimoRecovery, { RecoverySupportLinks } from "./SimoRecovery";

type Tool = "talk" | "bank" | "evidence" | "report" | "support";
const toolLabels: Record<Tool, string> = {
  talk: "Kuuntele ja auta",
  bank: "Pankin yhteystiedot",
  evidence: "Viestit ja maksut",
  report: "Ilmoituksen luonnos",
  support: "Yhteydenpito ja tuki",
};

function RecoveryWorkspace({
  scenario,
  onFinish,
}: {
  scenario: RecoveryCase;
  onFinish: () => void;
}) {
  const [tool, setTool] = useState<Tool>("talk");
  const [reply, setReply] = useState<number | null>(null);
  const [bank, setBank] = useState<"ready" | "calling" | "contacted">("ready");
  const [saved, setSaved] = useState<string[]>([]);
  const [attached, setAttached] = useState<string[]>([]);
  const [reported, setReported] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [feedback, setFeedback] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const isRaija = scenario.id === "raija";
  const allSaved = saved.length === scenario.documents.length;
  const allAttached = attached.length === scenario.documents.length;
  const goals = [
    { text: "Huoli kuultu", done: reply !== null },
    { text: "Pankkiin otettu yhteyttä", done: bank === "contacted" },
    { text: "Tiedot tallessa", done: allSaved },
    { text: "Ilmoitus valmisteltu yhdessä", done: reported },
    ...(isRaija ? [{ text: "Tili ilmoitettu ja estetty", done: blocked }] : []),
    { text: "Tuki sovittu", done: Boolean(followUp) },
  ];
  const complete = goals.every((goal) => goal.done);

  useEffect(() => {
    heading.current?.focus();
  }, [tool]);

  function open(next: Tool) {
    setTool(next);
    setFeedback("");
  }

  return (
    <>
      <h2>{scenario.title}</h2>
      <p>
        {isRaija
          ? "Auta Raijaa ottamaan yhteyttä pankkiin ja selvittämään tapahtunutta. Simo on mukana."
          : "Raija on mukana auttamassa. Ota pankkiin yhteyttä heti. Voit täydentää tietoja ja sopia tuesta sen jälkeen."}
      </p>
      <div className={styles.workspace}>
        <aside
          className={styles.sidebar}
          aria-label={`${scenario.name}: työvälineet ja edistyminen`}
        >
          <nav className={styles.tools} aria-label="Harjoituksen työvälineet">
            {(Object.keys(toolLabels) as Tool[]).map((item) => (
              <button
                key={item}
                aria-current={tool === item ? "page" : undefined}
                onClick={() => open(item)}
              >
                {toolLabels[item]}
              </button>
            ))}
          </nav>
          <h3>Yhdessä eteenpäin</h3>
          <p className={styles.small}>
            {goals.filter((goal) => goal.done).length}/{goals.length} askelta
            tehty
          </p>
          <ul className={styles.goals}>
            {goals.map((goal) => (
              <li key={goal.text} data-done={goal.done}>
                <span aria-hidden="true" className={styles.marker} />
                {goal.text}
                <span className={styles.srOnly}>
                  {goal.done ? ": tehty" : ": vielä tekemättä"}
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <section className={styles.desk} aria-labelledby="workspace-heading">
          <h3 id="workspace-heading" ref={heading} tabIndex={-1}>
            {toolLabels[tool]}
          </h3>
          {tool === "talk" && (
            <>
              <blockquote className={styles.quote}>
                <p>”{scenario.concern}”</p>
                <footer>{scenario.name}</footer>
              </blockquote>
              <p>
                Tarjoa apua omin sanoin. Molemmat tavat avaavat keskustelun.
              </p>
              <div className={styles.stack}>
                {scenario.replies.map((item, index) => (
                  <button
                    key={item.text}
                    aria-pressed={reply === index}
                    onClick={() => setReply(index)}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
              <div role="status">
                {reply !== null && (
                  <p className={styles.response}>
                    {scenario.name}: {scenario.replies[reply].response}
                  </p>
                )}
              </div>
              <button className={styles.primary} onClick={() => open("bank")}>
                Avaa pankin yhteystiedot
              </button>
            </>
          )}
          {tool === "bank" && (
            <>
              <p className={styles.small}>
                Harjoituspankin oma sovellus / Ota yhteyttä
              </p>
              <h4>Epäiletkö huijausta?</h4>
              <p>
                Oikeassa tilanteessa yhteystiedot etsitään pankin omasta
                sovelluksesta tai viralliselta sivulta. Huijarin antamaa numeroa
                ei käytetä.
              </p>
              {bank === "ready" && (
                <>
                  <p>
                    Soittamista ei tarvitse lykätä tietojen keräämisen vuoksi.{" "}
                    {scenario.name} soittaa itse, sinä olet tukena.
                  </p>
                  <button
                    className={styles.primary}
                    onClick={() => setBank("calling")}
                  >
                    Aloita harjoituspuhelu yhdessä
                  </button>
                </>
              )}
              {bank === "calling" && (
                <div className={styles.call}>
                  <p>
                    <strong>Pankin työntekijä:</strong> Kerro, mitä on
                    tapahtunut. Oletko lähettänyt rahaa?
                  </p>
                  <p>
                    {scenario.name}:{" "}
                    {isRaija
                      ? "Lähetin nettituttavalleni ensin 200 ja sitten 300 euroa. Epäilen nyt huijausta."
                      : "Siirsin 2 500 euroa sijoitukseen, jota epäilen nyt huijaukseksi."}
                  </p>
                  <button
                    className={styles.primary}
                    onClick={() => {
                      setBank("contacted");
                      setFeedback(
                        "Harjoituspuhelu käyty. Pankki arvioi, voidaanko maksuihin vielä puuttua. Rahojen palautumista ei voida luvata.",
                      );
                    }}
                  >
                    Kerro maksuista pankille
                  </button>
                </div>
              )}
              {bank === "contacted" && (
                <>
                  <p className={styles.response}>
                    Pankkiin on otettu yhteyttä harjoituksessa. Seuraavaksi
                    keräätte maksujen tiedot ja viestit talteen. Oikeassa
                    tilanteessa noudata pankin ohjeita.
                  </p>
                  <button onClick={() => open("evidence")}>
                    Etsi maksut ja viestit
                  </button>
                </>
              )}
            </>
          )}
          {tool === "evidence" && (
            <>
              <p>
                Avaa aineisto ja tallenna se{" "}
                {scenario.name === "Simo" ? "Simon" : "Raijan"} kansioon.
                Alkuperäiset viestit säilyvät tallessa.
              </p>
              {scenario.documents.map((document) => (
                <details className={styles.document} key={document.id}>
                  <summary>
                    {document.title}
                    {saved.includes(document.id) ? " (tallessa)" : ""}
                  </summary>
                  {document.text.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <button
                    disabled={saved.includes(document.id)}
                    onClick={() => {
                      setSaved((current) => [...current, document.id]);
                      setFeedback(`${document.title} tallennettu kansioon.`);
                    }}
                  >
                    {saved.includes(document.id)
                      ? "Tallennettu kansioon"
                      : "Tallenna kansioon"}
                  </button>
                </details>
              ))}
              <p className={styles.folder}>
                Kansiossa {saved.length}/{scenario.documents.length} aineistoa
              </p>
              <button onClick={() => open("report")}>
                Avaa ilmoituksen luonnos
              </button>
            </>
          )}
          {tool === "report" && (
            <>
              <p>
                Valmistele tapahtumien kuvaus rikosilmoitusta varten. Liitä
                tallennetut tiedot luonnokseen ja käy se läpi yhdessä{" "}
                {isRaija ? "Raijan" : "Simon"} kanssa.
              </p>
              <div className={styles.report}>
                <h4>Tapahtumien kuvaus</h4>
                <p>{scenario.summary}</p>
                <h4>Liitteet</h4>
                {attached.length === 0 ? (
                  <p>Ei vielä liitteitä.</p>
                ) : (
                  <ul>
                    {scenario.documents
                      .filter((document) => attached.includes(document.id))
                      .map((document) => (
                        <li key={document.id}>{document.title}</li>
                      ))}
                  </ul>
                )}
              </div>
              <div className={styles.stack}>
                {scenario.documents
                  .filter(
                    (document) =>
                      saved.includes(document.id) &&
                      !attached.includes(document.id),
                  )
                  .map((document) => (
                    <button
                      key={document.id}
                      onClick={() => {
                        setAttached((current) => [...current, document.id]);
                        setFeedback(`${document.title} liitetty luonnokseen.`);
                      }}
                    >
                      Liitä: {document.title}
                    </button>
                  ))}
              </div>
              {!allSaved && (
                <button onClick={() => open("evidence")}>
                  Hae puuttuva aineisto viesteistä ja maksuista
                </button>
              )}
              {!reported && (
                <button
                  className={styles.primary}
                  onClick={() => {
                    if (!allAttached) {
                      setFeedback(
                        "Luonnoksesta puuttuu vielä tietoja. Tallenna viestit ja maksut kansioon ja liitä ne tähän. Oikeassa tilanteessa voit tehdä rikosilmoituksen myös puutteellisin tiedoin ja täydentää sitä myöhemmin.",
                      );
                      return;
                    }
                    setReported(true);
                    setFeedback(
                      `${scenario.name}: Kävimme tiedot yhdessä läpi. Tiedän nyt, mitä voin kertoa poliisille. Tämä harjoitus ei lähettänyt ilmoitusta.`,
                    );
                  }}
                >
                  Käy luonnos läpi yhdessä
                </button>
              )}
              {reported && (
                <p className={styles.response}>
                  Luonnos valmisteltu. Oikea rikosilmoitus tehdään poliisin
                  virallisessa palvelussa tai poliisiasemalla.
                </p>
              )}
            </>
          )}
          {tool === "support" && (
            <>
              {isRaija && (
                <>
                  <blockquote className={styles.quote}>
                    <p>
                      ”En halua enää uusia rahapyyntöjä. Voisitko auttaa minua
                      ilmoittamaan tilin ja estämään yhteydenotot?”
                    </p>
                    <footer>Raija</footer>
                  </blockquote>
                  <p>
                    Tallentakaa keskustelu ennen estämistä. Raija päättää itse,
                    ja autat häntä käyttämään palvelun toimintoja.
                  </p>
                  <button
                    disabled={blocked}
                    onClick={() => {
                      if (!saved.includes("conversation")) {
                        setFeedback(
                          "Tallentakaa ensin keskustelu Viestit ja maksut -näkymässä, jotta tiedot säilyvät ilmoitusta varten.",
                        );
                        return;
                      }
                      setBlocked(true);
                      setFeedback(
                        "Raijan luvalla Hermannin tili on ilmoitettu huijauksesta ja estetty harjoituksessa. Keskustelu säilyy kansiossa.",
                      );
                    }}
                  >
                    {blocked
                      ? "Tili ilmoitettu ja estetty"
                      : "Ilmoita ja estä tili Raijan kanssa"}
                  </button>
                </>
              )}
              <h4>{isRaija ? "Simo jää tueksi" : "Raija jää tueksi"}</h4>
              <p>
                {isRaija
                  ? "Simo: Kiitos, että kerroit minulle. Voimme jutella tästä uudelleen, eikä sinun tarvitse olla yksin."
                  : "Raija: Olen tässä sinua varten. Sovitaan jo nyt, milloin jutellaan seuraavan kerran."}
              </p>
              <div className={styles.stack}>
                {["Soitetaan huomenna", "Tavataan huomenna kahvilla"].map(
                  (option) => (
                    <button
                      key={option}
                      aria-pressed={followUp === option}
                      onClick={() => {
                        setFollowUp(option);
                        setFeedback(
                          `Sovittu yhdessä: ${option.toLocaleLowerCase("fi")}.`,
                        );
                      }}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
              <details className={styles.document}>
                <summary>Mistä saa lisää tukea?</summary>
                <p>
                  Rikosuhripäivystys tarjoaa tukea ja käytännön neuvoja.
                  Romanssihuijauksen kokemuksia voi käsitellä myös
                  Nettideittiturvan tuella.
                </p>
                <p>
                  <a
                    href="https://www.riku.fi/nettihuijaus/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rikosuhripäivystys (avautuu uuteen välilehteen)
                  </a>
                </p>
                <p>
                  <a
                    href="https://nettideittiturva.fi/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Nettideittiturva (avautuu uuteen välilehteen)
                  </a>
                </p>
              </details>
            </>
          )}
          <p role="status" className={styles.feedback}>
            {feedback}
          </p>
        </section>
      </div>
      <div className={styles.finish}>
        {complete ? (
          <>
            <p>
              {scenario.name} on saanut apua: pankkiin on otettu yhteyttä,
              tiedot ovat tallessa ja jatkosta on sovittu.
            </p>
            <button className={styles.primary} onClick={onFinish}>
              {isRaija ? "Katso, mitä saitte aikaan" : "Jatka Raijan kanssa"}
            </button>
          </>
        ) : (
          <p>
            Voit käyttää työvälineitä eri järjestyksissä. Kun kaikki yhteiset
            askeleet on tehty, tarina jatkuu.
          </p>
        )}
      </div>
    </>
  );
}

export default function RaijaActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [stage, setStage] = useState<"simo" | "bridge" | "raija" | "complete">(
    "simo",
  );
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, [stage]);

  return (
    <div className={shared.root} data-course="financial-fraud">
      <Navbar
        {...textSizeProps}
        backTo="/course/financial-fraud"
        backLabel="Takaisin aiheisiin"
      />
      <CourseBook className={shared.main}>
        <h1 ref={heading} tabIndex={-1}>
          Auta Raijaa
        </h1>
        {(isComplete || stage === "complete") && <CompletionBadge />}
        <ol className={styles.chapters} aria-label="Harjoituksen kaksi osaa">
          <li aria-current={stage === "simo" ? "step" : undefined}>
            1. Autetaan Simoa
          </li>
          <li
            aria-current={
              stage === "bridge" || stage === "raija" ? "step" : undefined
            }
          >
            2. Nyt autetaan sinua
          </li>
        </ol>
        {stage === "simo" && (
          <SimoRecovery onFinish={() => setStage("bridge")} />
        )}
        {stage === "raija" && (
          <RecoveryWorkspace
            key={stage}
            scenario={recoveryCases[stage]}
            onFinish={() => {
              onComplete();
              setStage("complete");
            }}
          />
        )}
        {stage === "bridge" && (
          <section className={styles.story}>
            <h2>Raija kertoo Simolle</h2>
            <blockquote className={styles.quote}>
              <p>
                ”Minäkin olen lähettänyt rahaa. Hermannille. Ensin 200 euroa ja
                sitten vielä 300.”
              </p>
              <footer>Raija</footer>
            </blockquote>
            <p>Simo: Haluatko, että katsotaan ne yhdessä?</p>
            <button
              className={styles.primary}
              onClick={() => setStage("raija")}
            >
              Auta Raijaa Simon kanssa
            </button>
          </section>
        )}
        {stage === "complete" && (
          <section className={styles.story}>
            <h2>Kummankaan ei tarvitse jäädä yksin</h2>
            <div className={shared.introduction}>
              <div className={shared.portrait}>
                <CharacterPortrait courseId="financial-fraud" complete />
              </div>
              <p>
                Raija: Emme vielä tiedä, saadaanko rahat takaisin. Mutta nyt
                tiedämme, mitä tehdä, eikä kummankaan tarvitse selvittää tätä
                yksin.
              </p>
            </div>
            {[recoveryCases.simo, recoveryCases.raija].map((scenario) => (
              <details className={styles.document} key={scenario.id}>
                <summary>{scenario.name}: näin autoitte</summary>
                <p>{scenario.summary}</p>
                {scenario.id === "simo" ? (
                  <p>
                    Autoit Simoa ottamaan yhteyttä pankkiin. Soittamista ei
                    tarvinnut lykätä tietojen keräämisen vuoksi.
                  </p>
                ) : (
                  <p>
                    Kuuntelitte huolen, otitte yhteyttä pankkiin harjoituksessa,
                    säilytitte aineiston ja valmistelitte ilmoituksen yhdessä.
                    Sovitte yhteydenpidosta huomiselle.
                  </p>
                )}
                {scenario.id === "raija" && (
                  <p>
                    Autoitte Raijaa ilmoittamaan ja estämään tilin hänen
                    luvallaan. Ikävän tunteille jäi tilaa.
                  </p>
                )}
              </details>
            ))}
            <RecoverySupportLinks />
            <TopicCompletionProgress />
            <Link
              className={shared.continueLink}
              to="/course/financial-fraud/quiz"
            >
              Jatka eteenpäin
            </Link>
          </section>
        )}
      </CourseBook>
    </div>
  );
}
