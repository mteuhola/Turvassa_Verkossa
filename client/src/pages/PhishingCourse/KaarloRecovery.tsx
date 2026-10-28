import { useState } from "react";
import KaarloFeedback from "./KaarloFeedback";
import {
  isKaarloRecoveryCorrect,
  kaarloRecoveryChoices,
} from "./kaarloRecoveryChoices";
import styles from "./PhishingCourse.module.css";

export default function KaarloRecovery({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);

  return (
    <section aria-labelledby="kaarlo-recovery-title">
      <h2 id="kaarlo-recovery-title">Mitä klikkauksen jälkeen tapahtui?</h2>
      {!revealed ? (
        <>
          <p>
            Ennen kuin päätät, mitä tehdä, selvitä mitä Kaarlo teki sivulla.
          </p>
          <button
            type="button"
            className={`${styles.action} ${styles.primaryAction}`}
            onClick={() => setRevealed(true)}
          >
            Kysy: annoitko tietoja tai asensitko jotain?
          </button>
        </>
      ) : (
        <>
          <p role="status">
            Kaarlo: Kirjoitin sivulle sähköpostiosoitteeni ja kaupan salasanan.
            Käytän samaa salasanaa myös sähköpostissani. En ladannut tai asentanut mitään,
            mutta pankkikortin tietoni menin antamaan.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const correct = isKaarloRecoveryCorrect(selected);
              const wrong = kaarloRecoveryChoices.find(
                (item) => !item.correct && selected.includes(item.id),
              );
              const missing = kaarloRecoveryChoices.find(
                (item) => item.correct && !selected.includes(item.id),
              );
              setFeedback({
                correct,
                explanation: correct
                  ? "Hyvä toimintasuunnitelma!"
                  : (wrong?.explanation ??
                    missing?.explanation ??
                    "Tarkista valintasi."),
              });
            }}
          >
            <fieldset className={styles.recoveryQuestion}>
              <legend>Miten autat Kaarloa nyt?</legend>
              <p>Valitse kaikki tähän tilanteeseen sopivat toimintatavat.</p>
              {kaarloRecoveryChoices.map((item) => (
                <label key={item.id} className={styles.recoveryChoice}>
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() =>
                      setSelected((current) =>
                        current.includes(item.id)
                          ? current.filter((id) => id !== item.id)
                          : [...current, item.id],
                      )
                    }
                  />
                  <span>{item.text}</span>
                </label>
              ))}
            </fieldset>
            <button
              type="submit"
              className={`${styles.action} ${styles.primaryAction}`}
              disabled={selected.length === 0}
            >
              Tarkista toimintasuunnitelma
            </button>
          </form>
        </>
      )}
      {feedback && (
        <KaarloFeedback
          title={
            feedback.correct
              ? "Nyt tiedämme, miten toimia"
              : "Mietitään vielä toimintasuunnitelmaa"
          }
          explanation={feedback.explanation}
          response={
            feedback.correct
              ? "Kaarlo: En tajunnut, että kaupan salasana voisi avata myös sähköpostini. Vaihdan ne heti palvelujen omilla sivuilla. Ompa hyvä, että rohkenin kertomaan tästä!"
              : undefined
          }
          onDismiss={() => setFeedback(null)}
          onConfirm={() => {
            setFeedback(null);
            if (feedback.correct) onComplete();
          }}
          confirmLabel={
            feedback.correct ? "Jatka yhteenvetoon" : "Muuta valintoja"
          }
        />
      )}
    </section>
  );
}
