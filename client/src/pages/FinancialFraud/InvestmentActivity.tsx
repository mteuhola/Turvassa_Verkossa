import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Theory from "../Theory/Theory";
import { investmentTheory } from "../Theory/theoryData";
import { topicCourses } from "../TopicSelection/topicCourses";
import CourseBook from "../../components/CourseBook";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import Navbar from "../../components/Navbar";
import type { TextSizeProps } from "../../components/TextSizeControl";
import CompletionBadge from "../../components/CompletionBadge";
import { CharacterPortrait } from "../../components/CourseGuide";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import {
  readInvestmentDecision,
  saveInvestmentDecision,
} from "../../progress/investmentDecision";
import {
  investmentMessages,
  offerParts,
  villageImage,
  recommendations,
  investmentCaseId,
  type Recommendation,
} from "./investmentOffers";
import styles from "./InvestmentActivity.module.css";

const categories = [
  { suspicious: true, label: "Herättää heti epäilyn" },
  { suspicious: false, label: "Ei yksin herätä epäilyä" },
];

export default function InvestmentLesson(
  props: TextSizeProps & ActivityProgressProps,
) {
  const [reading, setReading] = useState(true);

  if (reading) {
    const course = topicCourses.find((item) => item.id === "financial-fraud")!;
    const topic = course.topics.find((item) => item.id === "investment-offers")!;
    return (
      <Theory
        {...props}
        course={course}
        topic={{ ...topic, kind: "theory", content: investmentTheory }}
        continuation={{
          label: "Jatka tehtävään",
          onContinue: () => setReading(false),
        }}
      />
    );
  }

  return <InvestmentActivity {...props} />;
}

function InvestmentActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [saved] = useState(readInvestmentDecision);
  const [round, setRound] = useState(saved ? investmentMessages.length : 0);
  const [placements, setPlacements] = useState<Record<string, boolean>>(
    saved?.placements ?? {},
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [answer, setAnswer] = useState<Recommendation | null>(
    saved?.recommendation ?? null,
  );
  const [submitted, setSubmitted] = useState(!!saved);
  const [imageFailed, setImageFailed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const cards = useRef(new Map<string, HTMLButtonElement>());
  useEffect(() => {
    window.scrollTo(0, 0);
    (resultRef.current ?? headingRef.current)?.focus({ preventScroll: true });
  }, []);
  const review = round === investmentMessages.length;
  const message =
    investmentMessages[Math.min(round, investmentMessages.length - 1)];
  const remaining = message.parts.filter(
    (part) => placements[part.id] === undefined,
  );
  const displayed = review ? offerParts : message.parts;

  function sort(id: string | null, suspicious: boolean) {
    const part = displayed.find((item) => item.id === id);
    if (!part || submitted) return;
    setDragging(null);
    setOver(null);
    setPlacements((previous) => ({ ...previous, [part.id]: suspicious }));
    setSelected(null);
    requestAnimationFrame(() => cards.current.get(part.id)?.focus());
  }

  function renderCard(part: (typeof offerParts)[number]) {
    if (submitted) return part.text;
    return (
      <button
        type="button"
        draggable
        aria-pressed={selected === part.id}
        aria-describedby="sorting-help"
        ref={(node) => {
          if (node) cards.current.set(part.id, node);
          else cards.current.delete(part.id);
        }}
        onClick={() => {
          setSelected(selected === part.id ? null : part.id);
          setFeedback("");
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setSelected(null);
        }}
        onDragStart={(event) => {
          event.dataTransfer.setData("text/plain", part.id);
          event.dataTransfer.effectAllowed = "move";
          setDragging(part.id);
          setSelected(part.id);
        }}
        onDragEnd={() => {
          setDragging(null);
          setOver(null);
        }}
      >
        {part.text}
      </button>
    );
  }

  function advance() {
    if (remaining.length) return;
    setRound(round + 1);
    setSelected(null);
    setFeedback("");
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function finish() {
    if (
      !review ||
      !answer ||
      submitted ||
      Object.keys(placements).length !== offerParts.length
    )
      return;
    const stored = saveInvestmentDecision({
      version: 3,
      caseId: investmentCaseId,
      recommendation: answer,
      placements,
    });
    setSubmitted(true);
    setFeedback(
      stored
        ? "Vastauksesi on tallennettu."
        : "Vastausta ei voitu tallentaa selaimeen. Voit silti jatkaa.",
    );
    onComplete();
    requestAnimationFrame(() => {
      resultRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  return (
    <div className={styles.root} data-course="financial-fraud">
      <Navbar
        {...textSizeProps}
        backTo="/course/financial-fraud"
        backLabel="Takaisin aiheisiin"
      />
      <CourseBook className={styles.main}>
        <header>
          <h1>Lomakylän sijoitustarjous</h1>
          {(isComplete || submitted) && <CompletionBadge />}
        </header>
        {submitted ? (
          <section className={styles.result} aria-labelledby="result-heading">
            <div className={styles.portrait}>
              <CharacterPortrait courseId="financial-fraud" complete />
            </div>
            <h2 id="result-heading" ref={resultRef} tabIndex={-1}>
              Oma arviosi
            </h2>
            <p className={styles.answer}>
              Kannattaisiko Simon sijoittaa?{" "}
              <strong>
                {recommendations.find((item) => item.id === answer)?.text}
              </strong>
            </p>
            <p>
              {(answer === "wait"
                ? "Kiire, harhaanjohtava kuva, salaperäisyys, tuottolupaus ja omituiset maksutiedot antavat syyn pysähtyä."
                : "Näillä tiedoilla sijoittamista ei voi perustella turvalliseksi.") + " Raijan kannattaa keskustella asiasta Simon kanssa."}
            </p>
            <TopicCompletionProgress />
            <p className={styles.feedback} role="status">
              {feedback}
            </p>
            <Link
              className={styles.continueLink}
              to="/course/financial-fraud/theory"
            >
              Jatka romanssihuijauksiin →
            </Link>
          </section>
        ) : (
          <>
            {!review && (
              <div className={styles.introduction}>
                <div className={styles.portrait}>
                  <CharacterPortrait courseId="financial-fraud" />
                </div>
                <blockquote className={styles.introQuote}>
                  <p>
                    "Ystäväni Simo kertoi, että häneen otettiin yhteyttä ja
                    kannustettiin sijoittamaan erääseen lomakylään. En tiedä,
                    mitä ajatella tästä. Voisitko auttaa minua arvioimaan
                    tarjouksen luotettavuutta?"
                  </p>
                  <p>- Raija</p>
                </blockquote>
              </div>
            )}
            <h2 ref={headingRef} tabIndex={-1}>
              {review
                ? "Mitä tarjouksesta selvisi?"
                : `Viesti ${round + 1}/${investmentMessages.length}`}
            </h2>
            {!review && (
              <>
                <blockquote className={styles.message}>
                  <p>{message.message}</p>
                  <footer>Raija</footer>
                </blockquote>
                {message.hasImage && (
                  <figure className={styles.imageSlot}>
                    {villageImage.src && !imageFailed ? (
                      <img
                        src={villageImage.src}
                        alt={villageImage.alt}
                        onError={() => setImageFailed(true)}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <strong>Lomakylän kuva</strong>
                        <span>Kuva lisätään tähän myöhemmin.</span>
                      </div>
                    )}
                    <figcaption>
                      Myyjä esittelee tekoälyllä tehtyä kuvaa valokuvana
                      valmiista lomakylästä.
                    </figcaption>
                  </figure>
                )}
                <div className={styles.cards} aria-label="Lajiteltavat kohdat">
                  {remaining.map((part) => (
                    <div key={part.id}>{renderCard(part)}</div>
                  ))}
                </div>
              </>
            )}
            {!submitted && (
              <p id="sorting-help">
                Klikkaa ja raahaa kohdat haluamiisi laatikoihin tai valitse kohta ja
                laatikko. Voit siirtää kohtia laatikosta toiseen.
              </p>
            )}
            <div className={styles.bins}>
              {categories.map(({ suspicious, label }) => {
                const placed = displayed.filter(
                  (part) => placements[part.id] === suspicious,
                );
                return (
                  <section
                    key={label}
                    className={styles.bin}
                    data-over={over === suspicious}
                    aria-label={label}
                    onDragOver={(event) => {
                      if (dragging && !submitted) {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                        setOver(suspicious);
                      }
                    }}
                    onDragLeave={(event) => {
                      if (
                        !(event.relatedTarget instanceof Node) ||
                        !event.currentTarget.contains(event.relatedTarget)
                      )
                        setOver(null);
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      if (dragging) sort(dragging, suspicious);
                    }}
                  >
                    {submitted ? (
                      <h3>{label}</h3>
                    ) : (
                      <button
                        className={styles.target}
                        type="button"
                        aria-disabled={!selected}
                        onClick={() => sort(selected, suspicious)}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") setSelected(null);
                        }}
                      >
                        {label}
                      </button>
                    )}
                    {placed.length > 0 && (
                      <ul>
                        {placed.map((part) => (
                          <li key={part.id}>{renderCard(part)}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
            <p
              className={styles.feedback}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {feedback || (selected ? "Kohta valittu. Valitse laatikko." : "")}
            </p>
            {!review && remaining.length === 0 && (
              <button
                ref={nextRef}
                type="button"
                className={`${styles.primary} ${styles.nextMessage}`}
                onClick={advance}
              >
                {round < investmentMessages.length - 1
                  ? "Seuraava viesti"
                  : "Katso yhteenveto"}
              </button>
            )}
            {review && (
              <section
                className={styles.decision}
                aria-labelledby="decision-heading"
              >
                <h2 id="decision-heading">
                  Kannattaisiko Simon sijoittaa tähän?
                </h2>
                <fieldset disabled={submitted}>
                  <legend>
                    Valitse keräämiesi tietojen perusteella, kannattaisiko Simon
                    sijoittaa yritykseen.
                  </legend>
                  {recommendations.map((item) => (
                    <label key={item.id}>
                      <input
                        type="radio"
                        name="recommendation"
                        value={item.id}
                        checked={answer === item.id}
                        onChange={() => setAnswer(item.id)}
                      />
                      <span>{item.text}</span>
                    </label>
                  ))}
                </fieldset>
                {!submitted && (
                  <button
                    type="button"
                    className={styles.primary}
                    disabled={!answer}
                    onClick={finish}
                  >
                    Vastaa
                  </button>
                )}
              </section>
            )}
          </>
        )}
        <footer className={styles.footer}>
          <p>
            Keskeneräinen tehtävä ei tallennu. Aiempi kurssisuoritus säilyy.
          </p>
        </footer>
      </CourseBook>
    </div>
  );
}
