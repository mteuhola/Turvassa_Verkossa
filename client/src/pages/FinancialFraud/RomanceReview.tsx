import { useEffect, useRef, useState } from "react";
import { romanceMessages } from "./romanceMessages";
import {
  concernLabels,
  guidance,
  passageConcerns,
  reflections,
  type Concern,
  type Evidence,
} from "./romanceConcerns";
import shared from "./InvestmentActivity.module.css";
import styles from "./RomanceActivity.module.css";

export default function RomanceReview({
  selections,
  onRetry,
  onFinish,
}: {
  selections: Record<number, number[]>;
  onRetry: () => void;
  onFinish: (evidence: Evidence[]) => void;
}) {
  const [chosen, setChosen] = useState<
    Array<{ message: number; part: number }>
  >([]);
  const [step, setStep] = useState<number | null>(null);
  const [concern, setConcern] = useState<Concern | null>(null);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const candidates = romanceMessages.flatMap((message, messageIndex) =>
    message.parts.flatMap((_, part) =>
      selections[messageIndex]?.includes(part)
        ? [{ message: messageIndex, part }]
        : [],
    ),
  );
  const [feedback, setFeedback] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const current = step === null ? undefined : chosen[step];
  const accepted = step !== null && evidence.length > step;

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [step]);

  function explain() {
    if (!current || !concern || accepted) return;
    if (passageConcerns[current.message][current.part].includes(concern)) {
      setEvidence([...evidence, { ...current, concern }]);
      setFeedback("");
    } else {
      setFeedback(
        `Tämä perustelu ei suoraan liity valitsemaasi kohtaan. ${guidance[concern]} Voit kokeilla toista perustelua.`,
      );
    }
  }

  if (current && step !== null) {
    return (
      <section className={shared.result}>
        <h2 ref={heading} tabIndex={-1}>
          Perustele havainto {step + 1}/{chosen.length}
        </h2>
        <p>{romanceMessages[current.message].title}</p>
        <details>
          <summary>Näytä Raijan viesti</summary>
          <blockquote>{romanceMessages[current.message].raija}</blockquote>
        </details>
        <blockquote className={styles.incoming}>
          {romanceMessages[current.message].parts[current.part]}
        </blockquote>
        <fieldset className={styles.reasons} disabled={accepted}>
          <legend>Mikä tässä huolestuttaa?</legend>
          <p>Valitse yksi perustelu. Yksi sopiva tulkinta riittää.</p>
          {(Object.keys(concernLabels) as Concern[]).map((id) => (
            <label key={id}>
              <input
                type="radio"
                name="concern"
                checked={concern === id}
                onChange={() => {
                  setConcern(id);
                  setFeedback("");
                }}
              />
              {concernLabels[id]}
            </label>
          ))}
        </fieldset>
        <p role="status" className={shared.feedback}>
          {feedback}
        </p>
        {accepted ? (
          <>
            <div className={styles.reflection} role="status">
              <h3>Raija pohtii</h3>
              <blockquote>{reflections[evidence[step].concern]}</blockquote>
            </div>
            <button
              type="button"
              className={shared.primary}
              onClick={() => {
                if (step === chosen.length - 1) onFinish(evidence);
                else {
                  setStep(step + 1);
                  setConcern(null);
                  setFeedback("");
                }
              }}
            >
              {step === chosen.length - 1
                ? "Katso yhteenveto ja päätä tehtävä"
                : "Seuraava havainto"}
            </button>
          </>
        ) : (
          <button
            type="button"
            className={shared.primary}
            disabled={!concern}
            onClick={explain}
          >
            Näytä Raijan pohdinta
          </button>
        )}
      </section>
    );
  }
  return (
    <section className={shared.result}>
      <h2 ref={heading} tabIndex={-1}>
        Valitse kohdat pohdintaan
      </h2>
      {candidates.length > 0 ? (
        <>
          <p>
            Valitse merkitsemistäsi kohdista 1-3 mielestäsi epäilyttävintä viestiä pohdintaan. Voit poistaa
            valinnan painamalla samaa kohtaa uudelleen.
          </p>
          <p role="status">
            Valittu {chosen.length}/3.
            {chosen.length === 3 &&
              " Jos haluat vaihtaa kohdan, poista ensin jokin valinnoistasi."}
          </p>
          <ul className={styles.passageChoices}>
            {candidates.map((candidate) => {
              const picked = chosen.some(
                (item) =>
                  item.message === candidate.message &&
                  item.part === candidate.part,
              );
              return (
                <li key={`${candidate.message}-${candidate.part}`}>
                  <button
                    type="button"
                    className={styles.evidenceChoice}
                    aria-pressed={picked}
                    disabled={!picked && chosen.length === 3}
                    onClick={() =>
                      setChosen(
                        picked
                          ? chosen.filter(
                              (item) =>
                                item.message !== candidate.message ||
                                item.part !== candidate.part,
                            )
                          : [...chosen, candidate],
                      )
                    }
                  >
                    {romanceMessages[candidate.message].parts[candidate.part]}
                    {picked && (
                      <span className={styles.choiceStatus}>
                        Valittu
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <p>
            Et valinnut kohtia pohdintaan. Palaa viesteihin ja valitse ainakin
            yksi kohta.
          </p>
          <button type="button" onClick={onRetry}>
            Palaa viesteihin
          </button>
        </>
      )}
      <button
        type="button"
        className={`${shared.primary} ${styles.reviewContinue}`}
        disabled={chosen.length === 0}
        onClick={() => setStep(0)}
      >
        Pohdi valittuja kohtia
      </button>
    </section>
  );
}
