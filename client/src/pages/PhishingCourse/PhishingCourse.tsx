import CourseBook from "../../components/CourseBook";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import Navbar from "../../components/Navbar";
import CompletionBadge from "../../components/CompletionBadge";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { TextSizeProps } from "../../components/TextSizeControl";
import { clues, emailParts } from "./phishingEmail";
import styles from "./PhishingCourse.module.css";
import ClueExplanation from "./ClueExplanation";

export default function PhishingCourse({
  isComplete,
  onComplete,
  onReturnTheory,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps & { onReturnTheory?: () => void }) {
  const [found, setFound] = useState<string[]>([]);
  const [activeClue, setActiveClue] = useState<{
    part: (typeof emailParts)[number];
    anchor: HTMLElement;
  } | null>(null);
  const [feedback, setFeedback] = useState(
    "Valitse viestistä kohta, jota pidät epäilyttävänä.",
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const complete = found.length === clues.length;
  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, [complete]);

  function inspect(part: (typeof emailParts)[number], anchor: HTMLElement) {
    if (activeClue) return;
    if (!part.suspicious) {
      setFeedback(`${part.title}: ${part.explanation}`);
    } else {
      setActiveClue({ part, anchor });
    }
  }

  function renderEmailPart(id: (typeof emailParts)[number]["id"]) {
    const part = emailParts.find((item) => item.id === id)!;
    const discovered = found.includes(id);
    if ("href" in part) {
      const [prompt, linkText] = part.text.split(/(https?:\/\/\S+)/);
      return (
        <span
          className={`${styles.emailPart} ${styles.emailLinkPart}`}
          data-found={discovered}
        >
          <button
            type="button"
            className={styles.emailPartOverlay}
            aria-label={`${part.label}: ${part.text}${discovered ? ". Varoitusmerkki löydetty." : ""}`}
            onClick={(event) => inspect(part, event.currentTarget)}
          />
          {prompt}
          <a
            href={part.href}
            className={styles.emailLink}
            onClick={(event) => {
              event.preventDefault();
              inspect(part, event.currentTarget);
            }}
            onAuxClick={(event) => event.preventDefault()}
          >
            {linkText}
          </a>
          {discovered && (
            <span className={styles.found} aria-hidden="true">
              {" "}
              Löydetty
            </span>
          )}
        </span>
      );
    }
    return (
      <button
        type="button"
        className={`${styles.emailPart} ${id === "link" ? styles.emailLink : ""}`}
        data-found={discovered}
        aria-label={`${part.label}: ${part.text}${discovered ? ". Varoitusmerkki löydetty." : ""}`}
        onClick={(event) => inspect(part, event.currentTarget)}
      >
        {part.text}
        {discovered && (
          <span className={styles.found} aria-hidden="true">
            {" "}
            Löydetty
          </span>
        )}
      </button>
    );
  }
  if (complete) {
    return (
      <div className={styles.root} data-course="phishing">
        <Navbar
          {...textSizeProps}
          backTo="/course/phishing"
          backLabel="Takaisin aiheisiin"
        />
        <CourseBook className={`${styles.main} ${styles.introductionComplete}`}>
          <header>
            <h1>Johdanto</h1>
          </header>
          <section
            className={styles.completionContent}
            aria-labelledby="complete-title"
          >
            <h2 id="complete-title" ref={heading} tabIndex={-1}>
              Johdanto suoritettu
            </h2>
            <CompletionBadge label="Aihe suoritettu!" />
            <TopicCompletionProgress />
            <div className={styles.actions}>
              <Link
                className={`${styles.action} ${styles.primaryAction}`}
                to="/course/phishing/safe-responses"
              >
                Seuraava aihe
              </Link>
            </div>
          </section>
        </CourseBook>
      </div>
    );
  }

  return (
    <div className={styles.root} data-course="phishing">
      <Navbar
        {...textSizeProps}
        backTo="/course/phishing"
        backLabel="Takaisin aiheisiin"
      />
      <CourseBook className={styles.main}>
        <div className={styles.workspace}>
          <header className={styles.intro}>
            <h1 ref={heading} tabIndex={-1}>
              Huomaatko huijauksen merkit?
            </h1>
            <p>
              Tutki sähköpostia ja etsi siitä varoitusmerkkejä. Valitse
              epäilyttävä kohta suoraan viestistä. Voit tutkia viestin eri
              osioita, kuten aihetta, lähettäjää, tekstiä ja liitettä. Kaikki
              valittavat kohdat eivät ole varoitusmerkkejä. Kun löydät
              varoitusmerkin, lue sen selitys ja valitse ”Ymmärsin, jatka” ennen
              seuraavaa havaintoa.
            </p>
            <p>
              Oikean pankin osoite on tässä esimerkissä{" "}
              <strong>tonttupankki.yksityinen</strong>. Valinnat eivät avaa
              linkkejä tai liitteitä. Voit kokeilla rauhassa ilman aikarajaa.
            </p>
            <div role="status" aria-live="polite">
              {isComplete && <CompletionBadge label="Aihe suoritettu!" />}
            </div>
          </header>
          <div className={styles.layout}>
            <section className={styles.email} aria-labelledby="email-title">
              <div className={styles.mailToolbar}>
                <span>Saapuneet</span>
              </div>
              <div className={styles.emailHeader}>
                <h2 id="email-title" className={styles.subject}>
                  {renderEmailPart("subject")}
                </h2>
                <div className={styles.senderRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    T
                  </span>
                  <div className={styles.senderDetails}>
                    <div className={styles.senderLabel}>Lähettäjä</div>
                    {renderEmailPart("sender")}
                    <p className={styles.recipient}>Vastaanottaja: sinä</p>
                  </div>
                </div>
              </div>
              <div className={styles.emailBody}>
                {(
                  [
                    "greeting",
                    "request",
                    "attachmentInstructions",
                    "link",
                    "fakeLink",
                    "secrecy",
                    "signature",
                  ] as const
                ).map((id) => (
                  <p key={id} className={styles.emailParagraph}>
                    {renderEmailPart(id)}
                  </p>
                ))}
              </div>
              <div className={styles.attachments}>
                <p className={styles.attachmentLabel}>1 liite</p>
                <div className={styles.attachmentFile}>
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="28"
                    viewBox="0 0 24 28"
                    fill="none"
                  >
                    <path
                      d="M4 1h10l6 6v20H4V1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 1v7h6M8 15h8M8 20h8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {renderEmailPart("attachment")}
                </div>
              </div>
            </section>
            <aside className={styles.panel} aria-labelledby="progress-title">
              <h2 id="progress-title">Sinun havaintosi</h2>
              <p className={styles.count}>
                Löydetty{" "}
                <strong>
                  {found.length}/{clues.length}
                </strong>{" "}
                varoitusmerkkiä
              </p>
              <progress
                className={styles.progress}
                value={found.length}
                max={clues.length}
                aria-label="Löydetyt varoitusmerkit"
              />
              {!complete && (
                <div
                  className={styles.feedback}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {feedback}
                </div>
              )}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.action}
                  disabled={complete}
                  onClick={() => {
                    const next = clues.find((clue) => !found.includes(clue.id));
                    if (next) setFeedback(`Vihje: ${next.hint}`);
                  }}
                >
                  Anna vihje
                </button>
              </div>
              {found.length > 0 && (
                <details className={styles.findingsReview}>
                  <summary>Kertaa löydetyt merkit ({found.length})</summary>
                  <ul className={styles.findings}>
                    {clues
                      .filter((clue) => found.includes(clue.id))
                      .map((clue) => (
                        <li key={clue.id}>
                          <details>
                            <summary>{clue.title}</summary>
                            <p>{clue.explanation}</p>
                          </details>
                        </li>
                      ))}
                  </ul>
                </details>
              )}
            </aside>
          </div>
        </div>
        {onReturnTheory && (
          <div className={`${styles.actions} ${styles.theoryReturn}`}>
            <button
              type="button"
              className={styles.action}
              onClick={onReturnTheory}
            >
              Palaa teoriaan
            </button>
          </div>
        )}
      </CourseBook>
      {activeClue && (
        <ClueExplanation
          title={activeClue.part.title}
          explanation={activeClue.part.explanation}
          anchor={activeClue.anchor}
          reviewed={found.includes(activeClue.part.id)}
          onDismiss={() => setActiveClue(null)}
          onConfirm={() => {
            const id = activeClue.part.id;
            if (!found.includes(id)) {
              const next = [...found, id];
              setFound(next);
              if (next.length === clues.length) onComplete();
            }
            setActiveClue(null);
          }}
        />
      )}
    </div>
  );
}
