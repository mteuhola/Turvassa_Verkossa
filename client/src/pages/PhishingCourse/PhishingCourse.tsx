import CompletionNotice from "../../components/CompletionNotice";
import CompletionBadge from "../../components/CompletionBadge";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import { clues, emailParts } from "./phishingEmail";
import styles from "./PhishingCourse.module.css";
import ClueExplanation from "./ClueExplanation";

export default function PhishingCourse({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [found, setFound] = useState<string[]>([]);
  const [activeClue, setActiveClue] = useState<{
    part: (typeof emailParts)[number];
    anchor: HTMLElement;
  } | null>(null);
  const nextTopic = useRef<HTMLAnchorElement>(null);
  const [feedback, setFeedback] = useState(
    "Valitse viestistä kohta, jota pidät epäilyttävänä.",
  );
  const firstPart = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, []);
  const complete = found.length === clues.length;
  useEffect(() => {
    if (complete) {
      nextTopic.current?.focus();
      nextTopic.current?.scrollIntoView({ block: "center" });
    }
  }, [complete]);

  function inspect(part: (typeof emailParts)[number], anchor: HTMLElement) {
    if (activeClue) return;
    if (!part.suspicious) {
      setFeedback(`${part.title}: ${part.explanation}`);
    } else {
      setActiveClue({ part, anchor });
    }
  }

  function restart() {
    setFound([]);
    setFeedback("Uusi yritys. Valitse viestistä epäilyttävä kohta.");
    firstPart.current?.focus();
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
        ref={id === "subject" ? firstPart : undefined}
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
      <main className={styles.main}>
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
              Oikean pankin
              osoite on tässä esimerkissä{" "}
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
                <span className={styles.trainingBadge}>Harjoitusviesti</span>
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
              {complete && (
                <CompletionNotice labelledBy="complete-title">
                  <h3 id="complete-title">Kaikki merkit löytyivät!</h3>
                  <p>Johdanto suoritettu.</p>
                  <Link
                    ref={nextTopic}
                    className={`${styles.action} ${styles.primaryAction}`}
                    to="/course/phishing/safe-responses"
                  >
                    Jatka: Miten toimit epäilyttävän viestin kanssa?
                  </Link>
                  <p>
                    Hienoa työtä! Harjoittelit viestin tarkistamista. Oikeassa
                    huijausviestissä voi olla vain yksi näistä merkeistä tai
                    aivan erilaisia merkkejä.
                  </p>
                  <p>
                    <strong>Turvallinen lähestymistapa:</strong> Epäillessäsi
                    viestin aitoutta, älä vastaa, avaa liitettä tai klikkaa
                    viestissä olevia linkkejä. Tarkista asia pankin omasta sovelluksesta
                    tai tutusta puhelinnumerosta. Ilmoita viesti roskapostiksi
                    tai tietojenkalasteluksi.
                  </p>
                </CompletionNotice>
              )}
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
              <div
                className={styles.feedback}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {feedback}
              </div>
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
                <button
                  type="button"
                  className={styles.action}
                  onClick={restart}
                >
                  Aloita alusta
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
              <p className={styles.small}>
                Kun löydät kaikki varoitusmerkit, johdanto merkitään
                suoritetuksi. Uusi yritys ei poista johdannon suoritusta.
              </p>
            </aside>
          </div>
        </div>
      </main>
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
              setFeedback(`Havainto kirjattu: ${activeClue.part.title}.`);
              if (next.length === clues.length) onComplete();
            }
            setActiveClue(null);
          }}
        />
      )}
    </div>
  );
}
