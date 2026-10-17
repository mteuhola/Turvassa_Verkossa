import {
  canSavePracticePassword,
  readPracticePassword,
  savePracticePassword,
} from "../../progress/practicePassword";
import CompletionBadge from "../../components/CompletionBadge";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { assessPassword, MAX_PASSWORD_LENGTH } from "./passwordStrength";
import styles from "./PasswordCourse.module.css";
import Theory from "../Theory/Theory";
import { courseIntroductions, passwordTheory } from "../Theory/theoryData";
import { topicCourses } from "../TopicSelection/topicCourses";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";

import {
  passwordExamples,
  allExamplesCorrect,
  isExampleCorrect,
} from "./passwordExamples";

const examples = passwordExamples.map((item) => ({
  ...item,
  assessment: assessPassword(item.value),
}));

function StrengthMeter({
  assessment,
}: {
  assessment: NonNullable<ReturnType<typeof assessPassword>>;
}) {
  return (
    <>
      <p className={styles.score}>
        Arvio: <strong>{assessment.label}</strong> ({assessment.score}/4)
      </p>
      <div className={styles.meter} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            data-filled={level <= assessment.score}
            data-score={assessment.score}
          />
        ))}
      </div>
    </>
  );
}

export default function PasswordCourse({
  mode = "practice",
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps &
  ActivityProgressProps & { mode?: "introduction" | "practice" }) {
  const [password, setPassword] = useState("");
  const [choices, setChoices] = useState<Record<number, number[]>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<
    Record<number, number[]>
  >({});
  const reviewComplete = allExamplesCorrect(checkedAnswers);
  const correctCount = examples.filter((item, index) =>
    isExampleCorrect(checkedAnswers[index], item.correctAnswers),
  ).length;
  const [visible, setVisible] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(
    () => readPracticePassword() !== null,
  );
  const [stage, setStage] = useState<
    "reading" | "examples" | "practice" | "complete"
  >("reading");
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStage = useRef(stage);
  useEffect(() => {
    if (previousStage.current !== stage) {
      heading.current?.focus();
      previousStage.current = stage;
    }
  }, [stage]);
  const [saveError, setSaveError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const assessment = useMemo(() => assessPassword(password), [password]);
  const tooLong = password.length > MAX_PASSWORD_LENGTH;

  const canSave = canSavePracticePassword({
    hasTyped,
    isExample: examples.some((item) => item.value === password),
    score: assessment?.score,
  });

  async function savePassword() {
    if (!canSave || isSaving) return;
    setIsSaving(true);
    setSaveError("");
    try {
      await savePracticePassword(password);
      setHasSaved(true);
      setPassword("");
      setVisible(false);
      setHasTyped(false);
      onComplete();
      setStage("complete");
    } catch {
      setSaveError(
        "Tallennus ei onnistunut. Tarkista, että selaimen tallennus on sallittu ja käytössä on suojattu yhteys. Voit yrittää uudelleen. Merkkiä ei myönnetty tästä yrityksestä.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (stage === "reading") {
    const course = topicCourses.find((item) => item.id === "passwords")!;
    const theoryProps = {
      ...textSizeProps,
      course,
      topic: {
        id: mode === "introduction" ? "introduction" : "password-strength",
        kind: "theory" as const,
        title: mode === "introduction" ? "Johdanto" : "Salasanojen ylläpito",
        description: "",
        path: `/course/passwords/${mode === "introduction" ? "introduction" : "password-strength"}`,
        content:
          mode === "introduction"
            ? courseIntroductions.passwords
            : passwordTheory,
        isComplete,
      },
      isComplete,
      onComplete,
      continuation: {
        label:
          mode === "introduction"
            ? "Tutustu esimerkkeihin"
            : "Siirry harjoitukseen",
        onContinue: () =>
          setStage(mode === "introduction" ? "examples" : "practice"),
      },
    };

    return <Theory {...theoryProps} />;
  }

  return (
    <div className={styles.root} data-course="passwords">
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/course/passwords">← Takaisin aiheisiin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={styles.main}>
        <header>
          <h1>
            {mode === "introduction"
              ? "Johdanto"
              : "Kokeile salasanan vahvuutta"}
          </h1>
        </header>
        <div className={styles.activity}>
          {stage === "examples" && (
            <section aria-labelledby="examples-title">
              <h2 id="examples-title" ref={heading} tabIndex={-1}>
                Tutustu esimerkkeihin
              </h2>
              <p>
                Valitse kaikki oikeat vaihtoehdot. Oikeita voi olla yksi, useita
                tai ei yhtään. Jos mikään ei ole oikein, jätä kaikki
                valitsematta ja paina ”Tarkista vastaus”. Saat merkin, kun
                vastaat kaikkiin viiteen oikein. Voit yrittää uudelleen.
              </p>
              <div className={styles.examples}>
                {examples.map((item, index) => (
                  <details key={item.name}>
                    <summary>
                      {item.name}
                      <span>{item.value}</span>
                      {isExampleCorrect(
                        checkedAnswers[index],
                        item.correctAnswers,
                      ) && <span>Vastattu oikein</span>}
                    </summary>
                    <div className={styles.exampleResult}>
                      {item.assessment && (
                        <StrengthMeter assessment={item.assessment} />
                      )}
                      <fieldset
                        className={styles.question}
                        disabled={isExampleCorrect(
                          checkedAnswers[index],
                          item.correctAnswers,
                        )}
                      >
                        <legend>{item.question}</legend>
                        {item.choices.map((choice, choiceIndex) => (
                          <label key={choice} className={styles.choice}>
                            <input
                              type="checkbox"
                              name={`example-${index}`}
                              value={choiceIndex}
                              checked={(choices[index] ?? []).includes(
                                choiceIndex,
                              )}
                              onChange={() => {
                                setChoices((current) => ({
                                  ...current,
                                  [index]: (current[index] ?? []).includes(
                                    choiceIndex,
                                  )
                                    ? current[index].filter(
                                        (value) => value !== choiceIndex,
                                      )
                                    : [...(current[index] ?? []), choiceIndex],
                                }));
                                setCheckedAnswers((current) => {
                                  const next = { ...current };
                                  delete next[index];
                                  return next;
                                });
                              }}
                            />
                            <span>{choice}</span>
                          </label>
                        ))}
                      </fieldset>
                      <button
                        type="button"
                        disabled={isExampleCorrect(
                          checkedAnswers[index],
                          item.correctAnswers,
                        )}
                        onClick={() =>
                          setCheckedAnswers((current) => ({
                            ...current,
                            [index]: [...(choices[index] ?? [])],
                          }))
                        }
                      >
                        Tarkista vastaus
                      </button>
                      <div role="status" aria-atomic="true">
                        {checkedAnswers[index] !== undefined && (
                          <p>
                            <strong>
                              {isExampleCorrect(
                                checkedAnswers[index],
                                item.correctAnswers,
                              )
                                ? "Oikein! "
                                : "Ei vielä oikein. Kokeile uudelleen. "}
                            </strong>
                            {item.lesson}
                          </p>
                        )}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
              <p id="review-progress" role="status">
                Oikeita vastauksia: {correctCount}/{examples.length}.
                {reviewComplete && " Kaikki oikein! Voit nyt lunastaa merkin."}
              </p>
              <div className={styles.actions}>
                <button
                  className={styles.primary}
                  type="button"
                  disabled={!reviewComplete}
                  aria-describedby="review-progress"
                  onClick={() => {
                    if (!reviewComplete) return;
                    onComplete();
                    setStage("complete");
                  }}
                >
                  Valmis!
                </button>
              </div>
            </section>
          )}
          {stage === "practice" && (
            <section aria-labelledby="practice-title">
              <h2 id="practice-title" ref={heading} tabIndex={-1}>
                Keksi oma harjoitussalasana
              </h2>
              <p id="privacy" className={styles.privacy}>
                <strong>Älä kirjoita tähän oikeaa salasanaasi.</strong> Keksi
                salasana vain tätä harjoitusta varten. Sitä ei lähetetä
                palvelimelle.
              </p>
              <label className={styles.label} htmlFor="practice-password">
                Harjoitussalasana
              </label>
              <input
                ref={input}
                id="practice-password"
                type={visible ? "text" : "password"}
                value={password}
                disabled={isSaving}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-describedby={`privacy length${tooLong ? " length-error" : ""}`}
                aria-invalid={tooLong}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setHasTyped(true);
                  setSaveError("");
                }}
              />
              <div className={styles.controls}>
                <button
                  type="button"
                  disabled={isSaving}
                  aria-pressed={visible}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? "Piilota salasana" : "Näytä salasana"}
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => {
                    setPassword("");
                    setHasTyped(false);
                    setSaveError("");
                    setVisible(false);
                    input.current?.focus();
                  }}
                >
                  Tyhjennä
                </button>
              </div>
              <p id="length" className={styles.small}>
                {Array.from(password).length} merkkiä · Voit käyttää myös
                välilyöntejä.
              </p>
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={styles.result}
              >
                {tooLong ? (
                  <p id="length-error">
                    Teksti on liian pitkä arvioitavaksi. Lyhennä sitä
                    kokeillaksesi uudelleen.
                  </p>
                ) : assessment ? (
                  <>
                    <StrengthMeter assessment={assessment} />
                    <ul>
                      {assessment.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>Kirjoita harjoitussalasana. Näet arvion tässä.</p>
                )}
              </div>
              <div className={styles.saveSection}>
                <p id="save-requirements">
                  Muokkaa salasanaa, kunnes arvio on 4/4. Tallenna se saadaksesi
                  harjoituksesta merkin. Paina salasana mieleesi: tarvitset sitä
                  kurssin lopussa.
                </p>
                {examples.some((item) => item.value === password) && (
                  <p role="status">
                    Keksi oma salasana. Julkista esimerkkiä ei voi tallentaa
                    omaksi.
                  </p>
                )}
                <button
                  className={styles.primary}
                  type="button"
                  disabled={!canSave || isSaving}
                  onClick={savePassword}
                  aria-describedby="save-requirements storage-note"
                >
                  {isSaving ? "Tallennetaan…" : "Tallenna harjoitussalasana"}
                </button>
                {saveError && <p role="alert">{saveError}</p>}
                <p id="storage-note" className={styles.small}>
                  Selaimeen tallennetaan vain tarkistustieto, ei salasanaa
                  luettavassa muodossa.
                  {hasSaved &&
                    " Uusi tallennus korvaa aiemman harjoitussalasanan."}
                </p>
              </div>
              <button
                type="button"
                className={styles.secondary}
                disabled={isSaving}
                onClick={() => {
                  setVisible(false);
                  setStage("reading");
                }}
              >
                Palaa teoriaan
              </button>
              <p className={styles.small}>
                Arvio ei takaa turvallisuutta. Mittari ei tunnista kaikkia
                suomalaisia sanoja, henkilötietoja tai vuotaneita salasanoja. Se
                ei tiedä, onko salasanaa käytetty muualla.
              </p>
            </section>
          )}
          {stage === "complete" && (
            <section aria-labelledby="complete-title">
              <h2 id="complete-title" ref={heading} tabIndex={-1}>
                {mode === "introduction"
                  ? "Johdanto suoritettu"
                  : "Harjoitussalasana tallennettu"}
              </h2>
              <CompletionBadge label="Aihe suoritettu!" />
              <p>
                {mode === "introduction"
                  ? "Seuraavaksi opit lisää hyvän salasanan ominaisuuksista ja luot oman harjoitussalasanan."
                  : "Tarvitset harjoitussalasanaasi kurssin lopussa. Voit nyt jatkaa muihin aiheisiin."}
              </p>
              <div className={styles.actions}>
                <Link
                  className={styles.primaryLink}
                  to={
                    mode === "introduction"
                      ? "/course/passwords/password-strength"
                      : "/course/passwords/help-sanna"
                  }
                >
                  Seuraava aihe
                </Link>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() =>
                    setStage(mode === "introduction" ? "reading" : "practice")
                  }
                >
                  {mode === "introduction"
                    ? "Kertaa johdanto"
                    : "Vaihda harjoitussalasana"}
                </button>
              </div>
              {mode === "practice" && (
                <section
                  className={styles.takeaway}
                  aria-labelledby="remember-title"
                >
                  <h2 id="remember-title">Muista oikeilla tileilläsi</h2>
                  <p>
                    Käytä pitkää ja yksilöllistä salasanaa jokaisessa
                    palvelussa. Salasananhallintaohjelma auttaa. Ota myös
                    monivaiheinen tunnistautuminen käyttöön: silloin
                    kirjautuminen vahvistetaan salasanan lisäksi esimerkiksi
                    puhelimella.
                  </p>
                </section>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
