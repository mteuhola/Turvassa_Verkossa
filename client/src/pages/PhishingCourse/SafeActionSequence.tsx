import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { safeResponseScenarios, type PracticeScreen } from "./safeResponses";
import styles from "./PhishingCourse.module.css";

export default function SafeActionSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [screen, setScreen] = useState<PracticeScreen>("message");
  const [feedback, setFeedback] = useState("");
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const scenario = safeResponseScenarios[scenarioIndex];
  const actionClass = styles.action;

  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [screen, scenarioIndex, complete]);

  function navigate(next: PracticeScreen) {
    moved.current = true;
    setFeedback("");
    setScreen(next);
  }

  function finishScenario() {
    moved.current = true;
    if (scenarioIndex === safeResponseScenarios.length - 1) {
      setComplete(true);
      onComplete();
    } else {
      setScenarioIndex(scenarioIndex + 1);
      navigate("message");
    }
  }

  if (complete)
    return (
      <section
        className={styles.practiceResult}
        aria-labelledby="practice-complete"
      >
        <h2 id="practice-complete" ref={heading} tabIndex={-1}>
          Osaat tarkistaa muuta kautta!
        </h2>
        <p>
          Avasit tutun sovelluksen itse ja varmistit ystävän pyynnön
          tallennetusta yhteystiedosta. Molemmat harjoitukset on suoritettu.
        </p>
        <p>
          Kun viesti epäilyttää, siirry itse tuttuun palveluun tai ota yhteyttä
          ennestään tuntemallasi tavalla.
        </p>
        <div className={styles.actions}>
          <Link
            className={`${actionClass} ${styles.primaryAction}`}
            to="/course/phishing/help-kaarlo"
          >
            Jatka: Auta Kaarloa
          </Link>
          <button
            type="button"
            className={actionClass}
            onClick={() => {
              setComplete(false);
              setScenarioIndex(0);
              navigate("message");
            }}
          >
            Harjoittele uudelleen
          </button>
        </div>
        <p>Aiempi suoritus säilyy, jos harjoittelet uudelleen.</p>
      </section>
    );

  const screenTitle = {
    message: `Viesti: ${scenario.sender}`,
    home: "Aloitusnäyttö",
    app: "Oma kirjasto",
    contacts: "Yhteystiedot",
    contact: "Leena",
    result: scenarioIndex === 0 ? "Lainan tiedot" : "Puhelu Leenalle",
  }[screen];

  return (
    <>
      <section aria-labelledby="practice-goal">
        <h2 id="practice-goal">{scenario.title}</h2>
        <p>
          Harjoitus {scenarioIndex + 1}/{safeResponseScenarios.length}
        </p>
        <p>{scenario.goal}</p>
        <p className={styles.small}>
          Tämä on harjoituspuhelin. Palvelu, viestit ja yhteystiedot ovat
          kuvitteellisia. Painikkeet eivät avaa oikeita sivuja tai soita
          puheluita.
        </p>
      </section>
      <section className={styles.practicePhone} aria-label="Harjoituspuhelin">
        <div className={styles.practicePhoneBar}>Harjoituspuhelin</div>
        <div className={styles.practicePhoneContent}>
          <h2 ref={heading} tabIndex={-1}>
            {screenTitle}
          </h2>
          {screen === "message" && (
            <>
              <p className={styles.practiceMessage}>{scenario.message}</p>
              <button
                type="button"
                className={actionClass}
                onClick={() => setFeedback(scenario.feedback)}
              >
                {scenario.messageAction}
              </button>
            </>
          )}
          {screen === "home" && (
            <div className={styles.practiceApps}>
              <button
                type="button"
                className={actionClass}
                onClick={() => navigate("message")}
              >
                Viestit
              </button>
              <button
                type="button"
                className={actionClass}
                onClick={() => navigate("app")}
              >
                Oma kirjasto
              </button>
              <button
                type="button"
                className={actionClass}
                onClick={() => navigate("contacts")}
              >
                Yhteystiedot
              </button>
            </div>
          )}
          {screen === "app" && (
            <>
              <p>Omat lainat</p>
              {scenarioIndex === 0 ? (
                <button
                  type="button"
                  className={actionClass}
                  onClick={() => navigate("result")}
                >
                  Lainattu kirja: näytä lainan tiedot
                </button>
              ) : (
                <p>
                  Täällä näet kirjastolainojesi tiedot. Leenan pyynnön voit
                  varmistaa ottamalla häneen yhteyttä omista yhteystiedoistasi.
                </p>
              )}
            </>
          )}
          {screen === "contacts" && (
            <>
              <p>Aiemmin tallentamasi yhteystiedot</p>
              <button
                type="button"
                className={actionClass}
                onClick={() => navigate("contact")}
              >
                Leena
              </button>
            </>
          )}
          {screen === "contact" && (
            <>
              <p>Ystäväsi Leena</p>
              <p>
                Ennestään tuttu numero, tallennettu ennen tämän päivän viestiä.
              </p>
              <button
                type="button"
                className={actionClass}
                onClick={() => {
                  if (scenarioIndex === 1) navigate("result");
                  else
                    setFeedback(
                      "Leena ei näe kirjastolainasi tietoja. Löydät ne tutusta Oma kirjasto -sovelluksesta.",
                    );
                }}
              >
                Soita tallennettuun numeroon
              </button>
            </>
          )}
          {screen === "result" && (
            <>
              <p className={styles.practiceMessage}>{scenario.result}</p>
              <p>{scenario.explanation}</p>
              <button
                type="button"
                className={`${actionClass} ${styles.primaryAction}`}
                onClick={finishScenario}
              >
                {scenarioIndex === 0
                  ? "Jatka: ystävän pyyntö"
                  : "Päätä harjoitus"}
              </button>
            </>
          )}
          <div role="status" aria-atomic="true">
            {feedback && <p className={styles.feedback}>{feedback}</p>}
          </div>
        </div>
        {screen !== "result" && (
          <nav
            className={styles.practicePhoneNav}
            aria-label="Harjoituspuhelimen navigointi"
          >
            <button
              type="button"
              className={actionClass}
              disabled={screen === "home"}
              onClick={() => navigate("home")}
            >
              Aloitusnäyttö
            </button>
            {screen !== "message" && screen !== "home" && (
              <button
                type="button"
                className={actionClass}
                onClick={() =>
                  navigate(screen === "contact" ? "contacts" : "home")
                }
              >
                Takaisin
              </button>
            )}
          </nav>
        )}
      </section>
      {screen !== "result" && (
        <details key={scenarioIndex} className={styles.practiceHint}>
          <summary>Näytä vihje</summary>
          <p>{scenario.hint}</p>
        </details>
      )}
    </>
  );
}
