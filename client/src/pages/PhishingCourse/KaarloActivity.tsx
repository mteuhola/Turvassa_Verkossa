import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import CompletionBadge from "../../components/CompletionBadge";
import { CharacterPortrait } from "../../components/CourseGuide";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { kaarloEmails } from "./kaarloEmails";
import KaarloInbox from "./KaarloInbox";
import KaarloRecovery from "./KaarloRecovery";
import styles from "./PhishingCourse.module.css";

export default function KaarloActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [stage, setStage] = useState<
    "intro" | "email" | "recovery" | "complete"
  >("intro");
  const [index, setIndex] = useState<number | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const email = index === null ? null : kaarloEmails[index];

  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, [stage]);

  return (
    <div className={styles.root} data-course="phishing">
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/course/phishing">← Takaisin aiheisiin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main
        className={`${styles.main} ${stage === "email" ? styles.kaarloInboxMain : styles.kaarloMain}`}
      >
        <h1 ref={heading} tabIndex={-1}>
          {stage === "complete" ? "Kiitos avusta!" : "Auta Kaarloa"}
        </h1>
        {isComplete && <CompletionBadge />}
        {(stage !== "email" || !email) && (
          <div className={styles.kaarloConcern}>
            {stage !== "email" && (
              <div className={styles.kaarloPortrait}>
                <CharacterPortrait courseId="phishing" />
              </div>
            )}
            <p>
              {stage === "intro"
                ? "”Olen nyt muutaman päivän sisään saanut jostain syystä paljon sähköpostia. Olen kuullut niin paljon huijauksista, että hädin tuskin uskallan lukea viestejäni! Voisitko katsoa niitä kanssani? En haluaisi jättää tärkeitä viestejä huomaamatta.”"
                : stage === "email"
                  ? (email?.context ?? "")
                  : stage === "recovery"
                    ? "Kaarlo: Minua hieman nolottaa, mutta minun täytyy tunnustaa jotakin. Avasin kolme päivää sitten yhden viestin linkin. En osannut epäillä viestin aitoutta ollenkaan, ja annoin sivustolle tietojani. Sen jälkeen huijausviestejä on tuntunut tulevan enemmän. Mitä minun pitäisi nyt tehdä?"
                    : "Kaarlo: Kiitos, että autoit minua arvioimaan viestejä rauhassa."}
            </p>
          </div>
        )}
        {stage === "intro" && (
          <section>
            <p>
              Lue viestit ja siirrä epäilyttävät viestit roskapostiin. Jätä
              tavalliset viestit saapuneisiin. Kaarlo kertoo myös, mitä hän
              tietää tilanteesta.
            </p>
            <p>
              Kaikki palvelut, osoitteet ja viestit ovat kuvitteellisia.
              Linkkejä ei tarvitse avata tehtävän suorittamiseksi.
            </p>
            <button
              className={`${styles.action} ${styles.primaryAction}`}
              onClick={() => setStage("email")}
            >
              Jatka viestien tarkasteluun
            </button>
          </section>
        )}
        {stage === "email" && (
          <KaarloInbox
            onSelect={setIndex}
            onComplete={() => setStage("recovery")}
          />
        )}
        {stage === "recovery" && (
          <KaarloRecovery
            onComplete={() => {
              onComplete();
              setStage("complete");
            }}
          />
        )}
        {stage === "complete" && (
          <section>
            <p>
              ”Nyt uskallan taas lukea viestini. Kiitos paljon avustasi!”
            </p>
            <p>
              Onneksi Kaarlo kertoi tapahtuneesta, jolloin pystyitte yhdessä selvittämään tilannetta.
            </p>
            <div className={styles.actions}>
              <Link
                className={`${styles.action} ${styles.primaryAction}`}
                to="/course/phishing/quiz"
              >
                Jatka eteenpäin
              </Link>
              <button
                className={styles.action}
                onClick={() => {
                  setIndex(null);
                  setStage("intro");
                }}
              >
                Auta Kaarloa uudelleen
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
