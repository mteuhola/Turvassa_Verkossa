import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CourseBook from "../../components/CourseBook";
import Navbar from "../../components/Navbar";
import CompletionBadge from "../../components/CompletionBadge";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import { CharacterPortrait } from "../../components/CourseGuide";
import type { TextSizeProps } from "../../components/TextSizeControl";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import Theory from "../Theory/Theory";
import { romanceTheory } from "../Theory/theoryData";
import { topicCourses } from "../TopicSelection/topicCourses";
import { romanceMessages } from "./romanceMessages";
import RomanceReview from "./RomanceReview";
import type { Evidence } from "./romanceConcerns";
import shared from "./InvestmentActivity.module.css";
import styles from "./RomanceActivity.module.css";

export default function RomanceLesson(
  props: TextSizeProps & ActivityProgressProps,
) {
  const [reading, setReading] = useState(true);
  if (reading) {
    const course = topicCourses.find((item) => item.id === "financial-fraud")!;
    const topic = course.topics.find((item) => item.id === "theory")!;
    return (
      <Theory
        {...props}
        course={course}
        topic={{ ...topic, kind: "theory", content: romanceTheory }}
        continuation={{
          label: "Jatka tehtävään",
          onContinue: () => setReading(false),
        }}
      />
    );
  }
  return <RomanceActivity {...props} />;
}

function RomanceActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [round, setRound] = useState(0);
  const [selections, setSelections] = useState<Record<number, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const review = round === romanceMessages.length;
  const selected = selections[round];
  const message = romanceMessages[Math.min(round, romanceMessages.length - 1)];

  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, [round, submitted]);

  function togglePart(index: number) {
    setSelections((previous) => {
      const current = previous[round] ?? [];
      const next = current.includes(index)
        ? current.filter((part) => part !== index)
        : [...current, index];
      const updated = { ...previous };
      if (next.length) updated[round] = next;
      else delete updated[round];
      return updated;
    });
  }

  function advance() {
    if (selected === undefined) return;
    setRound(round + 1);
  }

  function finish(completedEvidence: Evidence[]) {
    if (submitted || completedEvidence.length === 0) return;
    setSubmitted(true);
    onComplete();
  }

  return (
    <div className={shared.root} data-course="financial-fraud">
      <Navbar
        {...textSizeProps}
        backTo="/course/financial-fraud"
        backLabel="Takaisin aiheisiin"
      />
      <CourseBook className={shared.main}>
        <h1>Raijan uusi tuttava</h1>
        {(isComplete || submitted) && <CompletionBadge />}
        {submitted ? (
          <section className={shared.result}>
            <h2 ref={heading} tabIndex={-1}>
              Mitä viesteistä selvisi?
            </h2>
            <p>
              Viesteissä yhdistyvät salailu, toistuvat rahapyynnöt ja
              syyllistäminen. Kokonaisuus antaa syyn epäillä romanssihuijausta,
              vaikka yksittäinen viesti voi tuntua ystävälliseltä.
            </p>
            <div className={shared.introduction}>
              <div className={shared.portrait}>
                <CharacterPortrait courseId="financial-fraud" complete />
              </div>
              <blockquote className={shared.introQuote}>
                <p>
                  ”Kiitos, että luit viestit kanssani ja kerroit ajatuksesi.
                  Hermanni on tullut minulle tärkeäksi, joten tätä on vaikea
                  katsoa ulkopuolisen silmin. Nyt haluan pysähtyä miettimään,
                  mitä suhteessamme tapahtuu. Tarvitsen vielä apua seuraavien
                  askelten kanssa: maksoin tuon 300€ hänen veljensä
                  sairaalakuluihin, mutta sen jälkeen hänestä ei ole kuulunut
                  mitään. Onkohan hän kunnossa?”
                </p>
                <p>- Raija</p>
              </blockquote>
            </div>
            <TopicCompletionProgress />
            <Link
              className={shared.continueLink}
              to="/course/financial-fraud/help-raija"
            >
              Jatka: Auta Raijaa →
            </Link>
          </section>
        ) : review ? (
          <RomanceReview
            selections={selections}
            onRetry={() => {
              if (
                !Object.values(selections).some((parts) => parts.length > 0)
              ) {
                setSelections({});
                setRound(0);
              }
            }}
            onFinish={finish}
          />
        ) : (
          <>
            {round === 0 && (
              <div className={shared.introduction}>
                <div className={shared.portrait}>
                  <CharacterPortrait courseId="financial-fraud" />
                </div>
                <p>
                  "Vuosi eroni jälkeen olen tutustunut sosiaalisen median kautta uuteen
                  mieheen, <strong>Hermanniin</strong>, Espanjassa asuvaan suomalaislääkäriin. 
                  Olemme jutelleet jo useamman kuukauden ajan, ja hänestä on tullut minulle tärkeä. 
                  Viime aikoina olemme puhuneet myös tapaamisesta Suomessa, mutta jotkin asiat
                  keskusteluissamme ovat jääneet mietityttämään minua. Voisitko
                  lukea viestimme ja kertoa, mitä mieltä olet? Näytän sinulle
                  viestit, ja tiedon, kuinka kauan olemme siinä kohdassa
                  jutelleet."
                  <br />- Raija
                </p>
              </div>
            )}
            <h2 ref={heading} tabIndex={-1}>
              Viesti {round + 1}/{romanceMessages.length}: {message.title}
            </h2>
            <p id="romance-instructions">
              Valitse Hermannin viestistä yksi tai useampi kohta, joka herättää
              sinussa epäilyn. Voit poistaa valinnan painamalla kohtaa
              uudelleen. Jos mikään kohta ei herätä epäilyä, valitse viestin
              alapuolella oleva vaihtoehto.{" "}
              <strong>Valintoja ei arvioida oikeiksi tai vääriksi.</strong>
            </p>
            <fieldset
              className={styles.message}
              aria-describedby="romance-instructions"
            >
              <legend>Mikä viestissä herättää epäilyn?</legend>
              <div className={styles.raija}>
                <p className={styles.sender}>Raija</p>
                <blockquote>{message.raija}</blockquote>
              </div>
              <div className={styles.incoming}>
                <p className={styles.sender}>Hermanni</p>
                <p className={styles.messageText}>
                  {message.parts.map((part, index) => (
                    <span key={`${round}-${index}`}>
                      {index > 0 && " "}
                      <button
                        type="button"
                        className={styles.part}
                        aria-pressed={selected?.includes(index) ?? false}
                        onClick={() => togglePart(index)}
                      >
                        {part}
                      </button>
                    </span>
                  ))}
                </p>
              </div>
              <button
                type="button"
                className={styles.noConcern}
                aria-pressed={selected?.length === 0}
                onClick={() => {
                  setSelections((previous) => ({ ...previous, [round]: [] }));
                }}
              >
                Ei mitään erityisen epäilyttävää.
              </button>
            </fieldset>
            <div className={styles.actions}>
              <button
                type="button"
                className={shared.primary}
                disabled={selected === undefined}
                onClick={advance}
              >
                {round === romanceMessages.length - 1
                  ? "Katso yhteenveto"
                  : "Seuraava viesti"}
              </button>
            </div>
          </>
        )}
        <footer className={shared.footer}>
          <p>
            Keskeneräinen tehtävä ei tallennu. Aiempi kurssisuoritus säilyy.
          </p>
        </footer>
      </CourseBook>
    </div>
  );
}
