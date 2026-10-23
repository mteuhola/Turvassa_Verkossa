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
import styles from "./PhishingCourse.module.css";

export default function KaarloActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [stage, setStage] = useState<"intro" | "email" | "complete">("intro");
  const [index, setIndex] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const email = kaarloEmails[index];

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
        <div className={styles.kaarloConcern}>
          <div className={styles.kaarloPortrait}>
            <CharacterPortrait courseId="phishing" />
          </div>
          <p>
            {stage === "intro"
              ? "”Sain kolme sähköpostia. Olen kuullut niin paljon huijauksista, etten enää oikein uskalla lukea viestejäni. Voisitko katsoa niitä kanssani? En haluaisi jättää tärkeää viestiä huomaamatta.”"
              : stage === "email"
                ? email.context
                : "Kaarlo: Kiitos, että autoit minua arvioimaan viestejä rauhassa."}
          </p>
        </div>
        {stage === "intro" && (
          <section>
            <p>
              Lue viestit yksi kerrallaan ja arvioi, onko viesti epäilyttävä.
              Kaarlo kertoo myös, mitä hän tietää tilanteesta. Yksittäisiä
              kohtia ei tarvitse etsiä tai merkitä.
            </p>
            <p>
              Kaikki palvelut, osoitteet ja viestit ovat kuvitteellisia.
              Viestien linkit avaavat harjoituksen kohdesivun uuteen
              välilehteen. Linkkejä ei tarvitse avata tehtävän suorittamiseksi.
            </p>
            <button
              className={`${styles.action} ${styles.primaryAction}`}
              onClick={() => setStage("email")}
            >
              Lue ensimmäinen viesti
            </button>
          </section>
        )}
        {stage === "email" && (
          <KaarloInbox
            onSelect={setIndex}
            onComplete={() => {
              onComplete();
              setStage("complete");
            }}
          />
        )}
        {stage === "complete" && (
          <section>
            <p>
              ”Nyt uskallan taas lukea viestini. Voin pysähtyä epäilyttävän
              pyynnön kohdalla ja silti ottaa odottamani toimitusilmoituksen
              vastaan.”
            </p>
            <p>
              Varovaisuus tarkoittaa tilanteen arvioimista. Tuttu nimi tai
              siisti ulkoasu ei yksin takaa aitoutta, mutta jokaista viestiä ei
              tarvitse pitää huijauksena. Epäselvän asian voi tarkistaa palvelun
              tutusta sovelluksesta tai itse avatulta sivustolta.
            </p>
            <div className={styles.actions}>
              <Link
                className={`${styles.action} ${styles.primaryAction}`}
                to="/course/phishing/quiz"
              >
                Jatka tietovisaan
              </Link>
              <button
                className={styles.action}
                onClick={() => {
                  setIndex(0);
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
