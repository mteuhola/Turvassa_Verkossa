import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  assessPracticeDecision,
  overduePracticeLoan,
  practiceLibraryLoans,
  safeResponseScenarios,
  type PracticeDecision,
} from "./safeResponses";
import styles from "./PhishingCourse.module.css";

type Screen = "mail" | "new-tab" | "library";

export default function SafeActionSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [screen, setScreen] = useState<Screen>("mail");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const decisionHeading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const answered = useRef(false);
  const scenario = safeResponseScenarios[scenarioIndex];
  const isLibraryScenario = "bookId" in scenario;
  const loans = [
    ...practiceLibraryLoans.map((loan) => ({
      ...loan,
      status: "Ei myöhässä",
      fee: "0,00 €",
    })),
    ...(scenario.id === "library-real" ? [overduePracticeLoan] : []),
  ];

  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [screen, scenarioIndex, complete]);

  useEffect(() => {
    if (verified && screen === "mail") decisionHeading.current?.focus();
  }, [verified, screen]);

  function navigate(next: Screen) {
    moved.current = true;
    setFeedback("");
    setScreen(next);
  }

  function reset(next: number) {
    moved.current = true;
    answered.current = false;
    setScenarioIndex(next);
    setScreen("mail");
    setVerified(false);
    setLibraryOpen(false);
    setFeedback("");
    setComplete(false);
  }

  function choose(decision: PracticeDecision) {
    if (answered.current) return;
    const result = assessPracticeDecision(scenarioIndex, verified, decision);
    setFeedback(result.feedback);
    if (!result.correct) return;
    answered.current = true;
    if (scenarioIndex < safeResponseScenarios.length - 1)
      reset(scenarioIndex + 1);
    else {
      moved.current = true;
      onComplete();
      setComplete(true);
    }
  }

  const guideEnabled = scenarioIndex === 0;
  const nextTarget =
    scenarioIndex === 1
      ? verified
        ? "decision"
        : "phone"
      : screen === "new-tab"
        ? "bookmark"
        : screen === "library"
          ? verified
            ? "mail"
            : "loans"
          : verified
            ? "decision"
            : "new-tab";
  const guidance = {
    "new-tab":
      "Sait viestin. Lue se, ja tarkista sen tiedot toista kautta avaamalla uusi välilehti alla olevassa harjoitusselaimessa.",
    bookmark:
      "Avaa tuttu kirjastopalvelu aiemmin tallennetusta kirjanmerkistä.",
    loans: "Etsi viestissä mainittu kirja ja avaa sen tiedot.",
    mail: "Vertaa lainan tietoja viestiin. Palaa harjoitusselaimen Sähköposti-välilehdelle.",
    phone:
      "Yritä varmistaa pyyntö omalla puhelimella. Käytä alla olevaa harjoituspuhelinta.",
    decision: "Vertaa löytämiäsi tietoja ja valitse, miten toimit.",
  }[nextTarget];
  function guided(target: string) {
    if (!guideEnabled) return styles.action;
    return [
      styles.action,
      nextTarget === target ? styles.practiceHighlight : "",
    ].join(" ");
  }

  if (complete)
    return (
      <section className={styles.practiceResult}>
        <h2 ref={heading} tabIndex={-1}>
          Tarkistit ennen kuin toimit
        </h2>
        <p>Hyvää työtä! Pyrit tarkastamaan viestien aitouden toista kautta.</p>
        <TopicCompletionProgress />
        <div className={styles.actions}>
          <Link
            className={`${styles.action} ${styles.primaryAction}`}
            to="/course/phishing/help-kaarlo"
          >
            Jatka: Auta Kaarloa
          </Link>
        </div>
      </section>
    );

  return (
    <>
      <section className={styles.practiceBrief} aria-labelledby="practice-goal">
        <h2
          id="practice-goal"
          ref={screen === "mail" ? heading : undefined}
          tabIndex={-1}
        >
          {scenario.title}
        </h2>
        <p>
          Harjoitus {scenarioIndex + 1}/{safeResponseScenarios.length}
        </p>
        <p>{scenario.goal}</p>
        <p>{scenario.context}</p>
      </section>
      {guideEnabled && (
        <p
          id="practice-guide"
          className={styles.practiceGuide}
          role="status"
          aria-atomic="true"
        >
          {guidance}
        </p>
      )}
      <section className={styles.practiceBrowser} aria-label="Harjoitusselain">
        <div className={styles.practiceBrowserLabel}>
          <strong>Harjoitusselain</strong>
          <p>
            Kaikki tarvittava tapahtuu tässä harjoituksessa: älä avaa uutta
            välilehteä oikealla selaimellasi, tai selaa yhteystietoja
            puhelimellasi. Käytä alla olevia painikkeita.
          </p>
        </div>
        <nav
          className={styles.practiceBrowserTabs}
          aria-label="Harjoitusselaimen välilehdet"
        >
          <button
            className={guided("mail")}
            aria-describedby={
              guideEnabled && nextTarget === "mail"
                ? "practice-guide"
                : undefined
            }
            aria-pressed={screen === "mail"}
            onClick={() => navigate("mail")}
          >
            Sähköposti
          </button>
          {libraryOpen && (
            <button
              className={guided("library")}
              aria-pressed={screen === "library"}
              onClick={() => navigate("library")}
            >
              Oma kirjasto
            </button>
          )}
          {isLibraryScenario && (
            <button
              className={guided("new-tab")}
              aria-describedby={
                guideEnabled && nextTarget === "new-tab"
                  ? "practice-guide"
                  : undefined
              }
              aria-pressed={screen === "new-tab"}
              onClick={() => navigate("new-tab")}
            >
              Uusi välilehti
            </button>
          )}
        </nav>
        {screen === "mail" && (
          <div className={styles.practiceBrowserPage}>
            <div className={styles.mailAppBar}>
              <strong>Oma sähköposti</strong>
              <span>minunpostini@harjoitus.fi</span>
            </div>
            <article
              className={styles.email}
              aria-labelledby="practice-subject"
            >
              <header className={styles.emailHeader}>
                <h2 id="practice-subject" tabIndex={-1}>
                  {scenario.subject}
                </h2>
                <dl className={styles.emailMetadata}>
                  <dt>Lähettäjä</dt>
                  <dd>
                    {scenario.sender}
                    <br />
                    {scenario.address}
                  </dd>
                  <dt>Vastaanottaja</dt>
                  <dd>minunpostini@harjoitus.fi</dd>
                  <dt>Saapunut</dt>
                  <dd>{scenario.time}</dd>
                </dl>
              </header>
              <div className={styles.emailBody}>
                {scenario.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {"destination" in scenario ? (
                  <a
                    className={`${styles.action} ${styles.emailLink}`}
                    href={scenario.destination}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      setFeedback(
                        "Maksun aiheellisuus ei ole vielä selvillä. Mitä kautta voisit selvittää asian?",
                      )
                    }
                  >
                    {scenario.link}
                  </a>
                ) : "link" in scenario ? (
                  <button
                    className={`${styles.action} ${styles.emailLink}`}
                    onClick={() =>
                      setFeedback(
                        scenarioIndex === 0
                          ? "Maksun aiheellisuus ei ole vielä selvillä. Mitä kautta voisit selvittää asian?"
                          : "Uudesta numerosta saatu vastaus ei varmista, että puhut Leenan kanssa.",
                      )
                    }
                  >
                    {scenario.link}
                  </button>
                ) : null}
              </div>
            </article>
          </div>
        )}
        {screen === "new-tab" && (
          <div className={styles.practiceBrowserPage}>
            <h2 ref={heading} tabIndex={-1}>
              Uusi välilehti
            </h2>
            <h3>Aiemmin tallennetut kirjanmerkit</h3>
            <button
              className={guided("bookmark")}
              aria-describedby={guideEnabled ? "practice-guide" : undefined}
              onClick={() => {
                setLibraryOpen(true);
                navigate("library");
              }}
            >
              Oma kirjasto
            </button>
          </div>
        )}
        {screen === "library" && (
          <div className={styles.practiceBrowserPage}>
            <p className={styles.small}>Oma kirjasto / Oma tili (harjoitus)</p>
            <h2 ref={heading} tabIndex={-1}>
              Omat lainat ja maksut
            </h2>
            <p>
              Lainassa {loans.length} kirjaa. Avaa kirjan tiedot valitsemalla
              sen nimi.
            </p>
            <ul
              className={[
                styles.practiceLoans,
                guideEnabled && nextTarget === "loans"
                  ? styles.practiceHighlight
                  : "",
              ].join(" ")}
              aria-describedby={
                guideEnabled && nextTarget === "loans"
                  ? "practice-guide"
                  : undefined
              }
            >
              {loans.map((loan) => (
                <li key={loan.id}>
                  <details
                    onToggle={(event) => {
                      if (
                        event.currentTarget.open &&
                        "bookId" in scenario &&
                        loan.id === scenario.bookId
                      )
                        setVerified(true);
                    }}
                  >
                    <summary>{loan.title}</summary>
                    <dl className={styles.emailMetadata}>
                      <dt>Eräpäivä</dt>
                      <dd>{loan.due}</dd>
                      <dt>Lainan tila</dt>
                      <dd>{loan.status}</dd>
                      <dt>Kirjan maksut</dt>
                      <dd>{loan.fee}</dd>
                    </dl>
                  </details>
                </li>
              ))}
            </ul>
            <p>Voit palata sähköpostiin selaimen Sähköposti-välilehdeltä.</p>
          </div>
        )}
      </section>
      {scenarioIndex === 1 && (
        <section
          className={styles.practicePhone}
          aria-labelledby="practice-phone"
        >
          <h2 id="practice-phone">Oma puhelin (harjoitus)</h2>
          <h3>Leena Hirvonen</h3>
          <p>
            Tässä on aiemmin tallentamasi Leenan numero, johon olet soittanut
            ennen tätä viestiä.
          </p>
          <button
            className={styles.action}
            disabled={verified}
            onClick={() => {
              setVerified(true);
            }}
          >
            Soita tallennettuun numeroon
          </button>
          {verified && <p>{scenario.evidence}</p>}
        </section>
      )}
      {verified && screen === "mail" && (
        <section
          className={[
            styles.practiceDecision,
            guideEnabled ? styles.practiceHighlight : "",
          ].join(" ")}
          aria-labelledby="practice-decision"
        >
          <div className={styles.practiceEvidence}>
            <h3 ref={decisionHeading} tabIndex={-1}>
              Vertaa löytämiäsi tietoja
            </h3>
            <ul>
              <li>{scenario.claim}</li>
              <li>{scenario.evidence}</li>
            </ul>
          </div>
          <h2 id="practice-decision">{scenario.question}</h2>
          <div className={styles.practiceAnswerChoices}>
            {scenario.choices.map((choice) => (
              <button
                type="button"
                className={styles.action}
                key={choice.id}
                onClick={() => choose(choice.id)}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </section>
      )}
      <div role="status" aria-atomic="true">
        {feedback && <p className={styles.feedback}>{feedback}</p>}
      </div>
    </>
  );
}
