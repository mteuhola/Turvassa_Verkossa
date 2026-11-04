import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CourseBook from "../../components/CourseBook";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import Navbar from "../../components/Navbar";
import type { TextSizeProps } from "../../components/TextSizeControl";
import CompletionBadge from "../../components/CompletionBadge";
import CompletionNotice from "../../components/CompletionNotice";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { investmentOffers } from "./investmentOffers";
import styles from "./InvestmentActivity.module.css";

const totalParts = investmentOffers.reduce(
  (sum, offer) => sum + offer.parts.length,
  0,
);
const categories = [
  {
    suspicious: true,
    label: "Epäilyttävä",
    description: "Tämä herättää epäilyksiä.",
  },
  {
    suspicious: false,
    label: "Ei epäilyttävä",
    description: "Tämä ei yksin ole varoitusmerkki.",
  },
];

export default function InvestmentActivity({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [round, setRound] = useState(0);
  const [sorted, setSorted] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const offer = investmentOffers[round];
  const partKey = (id: string) => `${offer.id}/${id}`;
  const remaining = offer.parts.filter(
    (part) => !sorted.includes(partKey(part.id)),
  );
  const complete = sorted.length === totalParts;

  function sort(id: string | null, suspicious: boolean) {
    const part = offer.parts.find((item) => item.id === id);
    if (!part || sorted.includes(partKey(part.id))) return;
    const correct = part.suspicious === suspicious;
    setFeedback(
      `${correct ? "Hyvä havainto!" : "Mieti vielä ja kokeile toista laatikkoa."} ${part.explanation}`,
    );
    setDragging(null);
    setOver(null);
    if (!correct) {
      setSelected(part.id);
      cardRefs.current.get(part.id)?.focus();
      return;
    }
    const next = [...sorted, partKey(part.id)];
    setSorted(next);
    setSelected(null);
    if (next.length === totalParts) onComplete();
    const nextPart = remaining.find((item) => item.id !== part.id);
    requestAnimationFrame(() => {
      if (nextPart) cardRefs.current.get(nextPart.id)?.focus();
      else if (next.length === totalParts) headingRef.current?.focus();
      else nextRef.current?.focus();
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
        <header className={styles.header}>
          <h1>Auta Raijaa arvioimaan sijoitustarjouksia</h1>
          <p>
            Raijan ystävä on kertonut hänelle saamastaan sijoitustarjouksesta.
            Raija muistaa siitä muutamia yksityiskohtia. Auta häntä pohtimaan,
            mitkä niistä herättävät epäilyksiä.
          </p>
          {isComplete && <CompletionBadge />}
        </header>
        <div className={styles.progress}>
          <span>
            Tarjous {round + 1}/{investmentOffers.length}
          </span>
          <span>
            {sorted.length}/{totalParts} kohtaa lajiteltu
          </span>
        </div>
        <progress
          value={sorted.length}
          max={totalParts}
          aria-label="Oikein lajitellut kohdat"
        />
        <section aria-labelledby="offer-heading">
          <h2 id="offer-heading" ref={headingRef} tabIndex={-1}>
            {offer.title}
          </h2>
          <p className={styles.context}>{offer.intro}</p>
          <h3>Raija muistaa nämä kohdat</h3>
          <p id="sorting-help" className={styles.instructions}>
            Vedä kukin kohta sopivaan laatikkoon. Voit myös klikata kohtaa ja sen
            jälkeen laatikkoa.
          </p>
          <div className={styles.memories} aria-label="Lajiteltavat kohdat">
            {remaining.map((part) => (
              <button
                key={part.id}
                ref={(node) => {
                  if (node) cardRefs.current.set(part.id, node);
                  else cardRefs.current.delete(part.id);
                }}
                type="button"
                className={styles.memory}
                draggable
                aria-pressed={selected === part.id}
                aria-describedby="sorting-help"
                data-dragging={dragging === part.id}
                onClick={() =>
                  setSelected(selected === part.id ? null : part.id)
                }
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
                <span>{part.text}</span>
                <span className={styles.cardAction}>
                  {selected === part.id
                    ? "Valittu. Valitse laatikko."
                    : "Vedä tai valitse"}
                </span>
              </button>
            ))}
            {remaining.length === 0 && (
              <p className={styles.empty}>
                Kaikki tämän tarjouksen kohdat on lajiteltu.
              </p>
            )}
          </div>
          <div className={styles.destinations}>
            {categories.map(({ suspicious, label, description }) => {
              const placed = offer.parts.filter(
                (part) =>
                  part.suspicious === suspicious &&
                  sorted.includes(partKey(part.id)),
              );
              return (
                <section
                  key={label}
                  className={styles.destination}
                  data-over={over === suspicious}
                  aria-label={label}
                  onDragOver={(event) => {
                    if (!dragging) return;
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "move";
                    setOver(suspicious);
                  }}
                  onDragLeave={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    )
                      setOver(null);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (dragging) sort(dragging, suspicious);
                  }}
                >
                  <button
                    className={styles.target}
                    type="button"
                    aria-disabled={!selected}
                    onClick={() => sort(selected, suspicious)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setSelected(null);
                    }}
                  >
                    <span className={styles.targetLabel}>{label}</span>
                    <span>{description}</span>
                    <span className={styles.targetHint}>
                      {selected
                        ? "Siirrä valittu kohta tähän"
                        : "Pudota tähän tai valitse ensin kohta"}
                    </span>
                  </button>
                  {placed.length > 0 && (
                    <ul className={styles.placed}>
                      {placed.map((part) => (
                        <li key={part.id}>
                          <p>{part.text}</p>
                          <details>
                            <summary>Miksi tämä kuuluu tähän?</summary>
                            <p>{part.explanation}</p>
                          </details>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
          <div
            className={styles.feedback}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback ||
              (selected
                ? "Kohta valittu. Valitse Epäilyttävä tai Ei epäilyttävä."
                : "Mitkä kohdat herättävät sinussa epäilyksiä?")}
          </div>
          <p className={styles.note}>
            Ei epäilyttävä tarkoittaa vain, ettei kyseinen kohta yksin ole
            varoitusmerkki. Se ei tee koko tarjouksesta luotettavaa.
          </p>
          {remaining.length === 0 && !complete && (
            <button
              ref={nextRef}
              className={styles.next}
              type="button"
              onClick={() => {
                setRound(round + 1);
                setSelected(null);
                setFeedback(
                  "Raijan ystävä on saanut myös tällaisen tarjouksen. Arvioi sen kohdat.",
                );
                requestAnimationFrame(() => headingRef.current?.focus());
              }}
            >
              Tutki seuraavaa tarjousta
            </button>
          )}
        </section>
        {complete && (
          <CompletionNotice>
            <h2>Autoit Raijaa tunnistamaan varoitusmerkit!</h2>
            <TopicCompletionProgress />
            <p>
              Lajittelit kaikki {totalParts} kohtaa. Raija osaa nyt keskustella
              ystävänsä kanssa siitä, mikä tarjouksissa herättää epäilyksiä.
            </p>
            <Link to="/course/financial-fraud/theory">
              Seuraava aihe: Teoria →
            </Link>
          </CompletionNotice>
        )}
        <footer className={styles.footer}>
          <button
            type="button"
            onClick={() => {
              setRound(0);
              setSorted([]);
              setSelected(null);
              setDragging(null);
              setOver(null);
              setFeedback(
                "Harjoitus aloitettu alusta. Aiemmin ansaittu suoritus säilyy.",
              );
              requestAnimationFrame(() => headingRef.current?.focus());
            }}
          >
            Aloita alusta
          </button>
          <p>
            Keskeneräiset lajittelut eivät tallennu. Aiemmin ansaittu suoritus
            säilyy.
          </p>
        </footer>
      </CourseBook>
    </div>
  );
}
