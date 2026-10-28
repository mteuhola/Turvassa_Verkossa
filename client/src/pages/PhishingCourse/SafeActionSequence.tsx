import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  assessPracticeDecision,
  ordinaryPracticeMessages,
  practiceLibraryLoans,
  safeResponseScenarios,
  type PracticeDecision,
  type PracticeScreen,
} from "./safeResponses";
import { PracticeInbox, PracticeMessageList } from "./PracticeInbox";
import styles from "./PhishingCourse.module.css";

export default function SafeActionSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [screen, setScreen] = useState<PracticeScreen>("mail");
  const [selectedId, setSelectedId] = useState<string>();
  const [folder, setFolder] = useState<"inbox" | "junk">("inbox");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [readMessage, setReadMessage] = useState(false);
  const [decision, setDecision] = useState<PracticeDecision>();
  const [feedback, setFeedback] = useState("");
  const [resolved, setResolved] = useState(false);
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const scenario = safeResponseScenarios[scenarioIndex];
  const reported = resolved && scenarioIndex === 0;
  const messages = [scenario, ...ordinaryPracticeMessages];
  const visible = messages.filter((item) =>
    folder === "junk"
      ? reported && item.id === scenario.id
      : !(reported && item.id === scenario.id),
  );
  const email = visible.find((item) => item.id === selectedId);

  useEffect(() => {
    if (moved.current) heading.current?.focus({ preventScroll: true });
  }, [screen, selectedId, folder, scenarioIndex, complete, resolved]);

  useEffect(() => {
    if (resolved) resultHeading.current?.focus();
  }, [resolved]);

  function navigate(next: PracticeScreen) {
    moved.current = true;
    setFeedback("");
    setScreen(next);
  }

  function reset(next: number) {
    moved.current = true;
    setScenarioIndex(next);
    setScreen("mail");
    setSelectedId(undefined);
    setFolder("inbox");
    setVerified(false);
    setReadMessage(false);
    setLibraryOpen(false);
    setDecision(undefined);
    setFeedback("");
    setResolved(false);
    setComplete(false);
  }

  if (complete)
    return (
      <section className={styles.practiceResult}>
        <h2 ref={heading} tabIndex={-1}>
          Tarkistit ennen kuin toimit
        </h2>
        <p>
          Hyvää työtä! Pyrit tarkastamaan viestien aitouden toista kautta.
        </p>
        <div className={styles.actions}>
          <Link
            className={`${styles.action} ${styles.primaryAction}`}
            to="/course/phishing/help-kaarlo"
          >
            Jatka: Auta Kaarloa
          </Link>
          <button className={styles.action} onClick={() => reset(0)}>
            Harjoittele uudelleen
          </button>
        </div>
      </section>
    );

  return (
    <>
      <section className={styles.practiceBrief} aria-labelledby="practice-goal">
        <h2 id="practice-goal">{scenario.title}</h2>
        <p>
          Harjoitus {scenarioIndex + 1}/{safeResponseScenarios.length}
        </p>
        <p>{scenario.goal}</p>
        <p>{scenario.context}</p>
      </section>
      <section className={styles.practiceBrowser} aria-label="Harjoitusselain">
        <nav
          className={styles.practiceBrowserTabs}
          aria-label="Harjoitusselaimen välilehdet"
        >
          <button
            className={styles.action}
            aria-pressed={screen === "mail" || screen === "contacts"}
            onClick={() => navigate("mail")}
          >
            Sähköposti
          </button>
          {libraryOpen && (
            <button
              className={styles.action}
              aria-pressed={screen === "library"}
              onClick={() => navigate("library")}
            >
              Oma kirjasto
            </button>
          )}
          {scenarioIndex === 0 && (
            <button
              className={styles.action}
              aria-pressed={screen === "new-tab"}
              onClick={() => navigate("new-tab")}
            >
              Uusi välilehti
            </button>
          )}
        </nav>
        {(screen === "mail" || screen === "contacts") && (
          <PracticeInbox
            title="Oma sähköposti"
            address="minunpostini@harjoitus.fi"
            folders={
              <>
                <button
                  aria-pressed={screen === "mail" && folder === "inbox"}
                  onClick={() => {
                    setFolder("inbox");
                    setSelectedId(undefined);
                    navigate("mail");
                  }}
                >
                  Saapuneet ({reported ? 2 : 3})
                </button>
                <button
                  aria-pressed={screen === "mail" && folder === "junk"}
                  onClick={() => {
                    setFolder("junk");
                    setSelectedId(undefined);
                    navigate("mail");
                  }}
                >
                  Roskaposti ({reported ? 1 : 0})
                </button>
                {scenarioIndex === 1 && (
                  <button
                    aria-pressed={screen === "contacts"}
                    onClick={() => navigate("contacts")}
                  >
                    Yhteystiedot
                  </button>
                )}
              </>
            }
          >
            {screen === "contacts" ? (
              <>
                <h2 ref={heading} tabIndex={-1}>
                  Yhteystiedot
                </h2>
                <h3>Leena Hirvonen</h3>
                <p>
                  Aiemmin tallentamasi numero, johon olet soittanut ennen tätä
                  viestiä.
                </p>
                <button
                  className={styles.action}
                  onClick={() => {
                    setVerified(true);
                    setFeedback(
                      "Leena ei vastaa. Puhelu päättyi. Voit palata sähköpostiin pohtimaan, miten toimit.",
                    );
                  }}
                >
                  Soita tallennettuun numeroon
                </button>
              </>
            ) : (
              <>
                <h2 ref={!email ? heading : undefined} tabIndex={-1}>
                  {folder === "inbox" ? "Saapuneet" : "Roskaposti"}
                </h2>
                {visible.length ? (
                  <PracticeMessageList
                    messages={visible}
                    selectedId={selectedId}
                    onSelect={(id) => {
                      moved.current = true;
                      setSelectedId(id);
                      setFeedback("");
                      if (id === scenario.id) setReadMessage(true);
                    }}
                  />
                ) : (
                  <p>Tässä kansiossa ei ole viestejä.</p>
                )}
                {email ? (
                  <>
                    <div className={styles.mailCommandBar}>
                      <button
                        className={styles.action}
                        onClick={() => {
                          moved.current = true;
                          setSelectedId(undefined);
                        }}
                      >
                        Sulje viesti
                      </button>
                    </div>
                    <article
                      className={styles.email}
                      aria-labelledby="practice-subject"
                    >
                      <header className={styles.emailHeader}>
                        <h2 id="practice-subject" ref={heading} tabIndex={-1}>
                          {email.subject}
                        </h2>
                        <dl className={styles.emailMetadata}>
                          <dt>Lähettäjä</dt>
                          <dd>
                            {email.sender}
                            <br />
                            {email.address}
                          </dd>
                          <dt>Vastaanottaja</dt>
                          <dd>minunpostini@harjoitus.fi</dd>
                          <dt>Saapunut</dt>
                          <dd>{email.time}</dd>
                        </dl>
                      </header>
                      <div className={styles.emailBody}>
                        {email.paragraphs.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                        {"link" in email && (
                          <button
                            className={`${styles.action} ${styles.emailLink}`}
                            onClick={() =>
                              setFeedback(
                                scenarioIndex === 0
                                  ? "Tämä linkki kuuluu saamaasi viestiin. Se ei anna viestistä riippumatonta varmistusta maksulle. Mitä muuta kautta voisit selvittää asian?"
                                  : "Uusi numero on peräisin samasta viestistä. Sieltä saatu vastaus ei varmista, että puhut Leenan kanssa.",
                              )
                            }
                          >
                            {email.link}
                          </button>
                        )}
                      </div>
                    </article>
                    {email.id === scenario.id && !resolved && !verified && (
                      <p className={styles.small}>
                        {scenarioIndex === 0
                          ? "Tarkista viestissä mainitun kirjan tiedot tutusta kirjastopalvelusta. Palaa sitten tähän viestiin tekemään päätös."
                          : "Yritä tavoittaa Leena ennestään tutusta numerosta. Palaa sitten tähän viestiin tekemään päätös."}
                      </p>
                    )}
                    {email.id === scenario.id && !resolved && verified && (
                      <form
                        className={styles.practiceDecision}
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (!decision) {
                            setFeedback("Valitse ensin, miten toimisit.");
                            return;
                          }
                          const result = assessPracticeDecision(
                            scenarioIndex,
                            verified && readMessage,
                            decision,
                          );
                          setFeedback(result.feedback);
                          if (result.correct) {
                            moved.current = true;
                            setResolved(true);
                            setSelectedId(undefined);
                          }
                        }}
                      >
                        {verified && (
                          <div className={styles.practiceEvidence}>
                            <h3>Vertaa löytämiäsi tietoja</h3>
                            <ul>
                              <li>{scenario.claim}</li>
                              <li>{scenario.evidence}</li>
                            </ul>
                          </div>
                        )}
                        <fieldset className={styles.recoveryQuestion}>
                          <legend>{scenario.question}</legend>
                          {scenario.choices.map((choice) => (
                            <label
                              className={styles.recoveryChoice}
                              key={choice.id}
                            >
                              <input
                                type="radio"
                                name="decision"
                                value={choice.id}
                                checked={decision === choice.id}
                                onChange={() => {
                                  setDecision(choice.id);
                                  setFeedback("");
                                }}
                              />
                              {choice.label}
                            </label>
                          ))}
                        </fieldset>
                        <button className={styles.action} type="submit">
                          {verified ? "Vahvista päätös" : "Arvioi päätös"}
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  <p>Valitse viesti luettelosta nähdäksesi sen sisällön.</p>
                )}
              </>
            )}
          </PracticeInbox>
        )}
        {screen === "new-tab" && (
          <div className={styles.practiceBrowserPage}>
            <h2 ref={heading} tabIndex={-1}>
              Uusi välilehti
            </h2>
            <h3>Aiemmin tallennetut kirjanmerkit</h3>
            <button
              className={styles.action}
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
              Lainassa {practiceLibraryLoans.length} kirjaa. Avaa kirjan tiedot
              valitsemalla sen nimi.
            </p>
            <ul className={styles.practiceLoans}>
              {practiceLibraryLoans.map((loan) => (
                <li key={loan.id}>
                  <details
                    onToggle={(event) => {
                      if (
                        event.currentTarget.open &&
                        loan.id === safeResponseScenarios[0].bookId
                      )
                        setVerified(true);
                    }}
                  >
                    <summary>{loan.title}</summary>
                    <dl className={styles.emailMetadata}>
                      <dt>Eräpäivä</dt>
                      <dd>{loan.due}</dd>
                      <dt>Lainan tila</dt>
                      <dd>Ei myöhässä</dd>
                      <dt>Kirjan maksut</dt>
                      <dd>0,00 €</dd>
                    </dl>
                  </details>
                </li>
              ))}
            </ul>
            <p>Voit palata sähköpostiin selaimen Sähköposti-välilehdeltä.</p>
          </div>
        )}
        <div role="status" aria-atomic="true">
          {feedback && <p className={styles.feedback}>{feedback}</p>}
        </div>
      </section>
      {resolved && (
        <section className={styles.practiceResult}>
          <h2 ref={resultHeading} tabIndex={-1}>
            {scenarioIndex === 0
              ? "Maksupyyntö selvitetty"
              : "Varmistusta voi odottaa"}
          </h2>
          <p>{scenario.result}</p>
          <button
            className={`${styles.action} ${styles.primaryAction}`}
            onClick={() => {
              if (scenarioIndex === 0) reset(1);
              else {
                moved.current = true;
                setComplete(true);
                onComplete();
              }
            }}
          >
            {scenarioIndex === 0 ? "Jatka: Leenan viesti" : "Päätä harjoitus"}
          </button>
        </section>
      )}
    </>
  );
}
