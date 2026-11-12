import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CourseBook from "../../components/CourseBook";
import CompletionBadge from "../../components/CompletionBadge";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import { CharacterPortrait } from "../../components/CourseGuide";
import type { TextSizeProps } from "../../components/TextSizeControl";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import RaijaRecovery from "./RaijaRecovery";
import shared from "./InvestmentActivity.module.css";
import styles from "./RaijaActivity.module.css";
import SimoRecovery, { RecoverySupportLinks } from "./SimoRecovery";

export default function RaijaActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [stage, setStage] = useState<
    "intro" | "simo" | "bridge" | "raija" | "complete"
  >("intro");
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
      <CourseBook className={styles.main}>
        <h1 ref={heading} tabIndex={-1}>
          Auta Raijaa
        </h1>
        {(isComplete || stage === "complete") && <CompletionBadge />}
        {stage === "intro" && (
          <section aria-label="Tehtävän ohjeet">
            <div className={shared.introduction}>
              <div className={shared.portrait}>
                <CharacterPortrait courseId="financial-fraud" />
              </div>
              <blockquote className={shared.introQuote}>
                <p>
                  ”Muistatko sen lomakylän sijoitustarjouksen? Simo sijoitti
                  siihen rahaa ennen kuin ehdin jutella tarjouksesta hänen
                  kanssaan. Olen huolissani hänestä, mutten oikein tiedä, mitä
                  sanoisin. Auttaisitko minua?”
                </p>
                <p>- Raija</p>
              </blockquote>
            </div>
            <div className={styles.story}>
              <p>
                Auta ensin Raijaa miettimään, mitä hän voisi sanoa Simolle. Lue
                Raijan kysymys ja valitse sopiva neuvo. Saat palautetta
                jokaisesta vastauksesta ja voit yrittää uudelleen.
              </p>
              {isComplete && (
                <p>
                  Olet jo suorittanut tämän aiheen. Voit harjoitella uudelleen,
                  ja suoritusmerkintä säilyy.
                </p>
              )}
              <button
                type="button"
                className={styles.primary}
                onClick={() => setStage("simo")}
              >
                Auta Raijaa neuvomaan Simoa
              </button>
            </div>
          </section>
        )}
        {stage === "simo" && (
          <SimoRecovery onFinish={() => setStage("bridge")} />
        )}
        {stage === "raija" && (
          <RaijaRecovery
            onFinish={() => {
              onComplete();
              setStage("complete");
            }}
          />
        )}
        {stage === "bridge" && (
          <section className={styles.story}>
            <h2>Raijalla on oma huoli</h2>
            <div className={shared.introduction}>
              <div className={shared.portrait}>
                <CharacterPortrait courseId="financial-fraud" />
              </div>
              <blockquote className={shared.introQuote}>
                <p>
                  "Kas, Hermanni lähetti pitkästä aikaa viestin. Mitähän asiaa
                  hänellä on?"
                </p>
                <footer>Raija</footer>
              </blockquote>
            </div>
            <p>Kuuntele Raijaa ja auta häntä seuraavassa tilanteessa.</p>
            <button
              className={styles.primary}
              onClick={() => setStage("raija")}
            >
              Auta Raijaa
            </button>
          </section>
        )}
        {stage === "complete" && (
          <section className={styles.story}>
            <h2>Kiitos, että olit tukena!</h2>
            <div className={shared.introduction}>
              <div className={shared.portrait}>
                <CharacterPortrait courseId="financial-fraud" complete />
              </div>
              <p>
                Raija: Minulla on vielä paha mieli kaikesta tapahtuneesta, mutta
                nyt tiedän, mistä voin saada apua. Vaikka Hermanni ei ollutkaan
                se, joka väitti olevansa, minun tunteeni olivat aitoja. On
                helpottavaa tietää, ettei minun tarvitse selviytyä tästä yksin.
              </p>
            </div>
            <p>
              Kurssin aikana autoit Raijaa ja Simoa kohtaamaan vaikeita
              tilanteita. Autoit heitä tunnistamaan huijausten merkkejä,
              tekemään turvallisempia päätöksiä ja hakemaan apua. Erityisen
              tärkeää oli se, että suhtauduit heidän kokemuksiinsa
              ymmärtäväisesti ja ilman syyllistämistä. Huijauksia voi olla
              vaikea tunnistaa, ja niiden kohteeksi voi joutua kuka tahansa.
              Tärkeintä on muistaa, että apua on saatavilla eikä tapahtuneesta
              tarvitse selviytyä yksin.
            </p>
            <RecoverySupportLinks />
            <TopicCompletionProgress />
            <Link
              className={shared.continueLink}
              to="/course/financial-fraud/quiz"
            >
              Jatka tietovisaan
            </Link>
          </section>
        )}
      </CourseBook>
    </div>
  );
}
