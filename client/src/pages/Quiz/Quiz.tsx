import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import CompletionBadge from "../../components/CompletionBadge";
import CompletionNotice from "../../components/CompletionNotice";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import {
  matchesPracticePassword,
  readPracticePassword,
  passwordTopicPath,
} from "../../progress/practicePassword";
import type { TopicCourse } from "../TopicSelection/topicCourses";
import { type CourseQuiz, isChoiceAnswerCorrect } from "./quizData";
import styles from "./Quiz.module.css";

interface QuizProps extends TextSizeProps, ActivityProgressProps {
  course: TopicCourse;
  quiz: CourseQuiz;
}

export default function Quiz({
  course,
  quiz,
  isComplete,
  onComplete,
  ...textSizeProps
}: QuizProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(false);
  const [checking, setChecking] = useState(false);
  const [finished, setFinished] = useState(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const question = quiz.questions[index];
  const missingPracticePassword =
    question?.type === "practice-password" && !readPracticePassword();
  const total = quiz.questions.length;
  const answered = finished ? total : index + (correct ? 1 : 0);

  function choose(id: string) {
    setSelected((previous) =>
      question.type === "single"
        ? [id]
        : previous.includes(id)
          ? previous.filter((item) => item !== id)
          : [...previous, id],
    );
    setFeedback("");
  }

  async function checkAnswer() {
    if (checking || correct || !question) return;
    setChecking(true);
    try {
      if (question.type === "practice-password" && !readPracticePassword()) {
        setFeedback(
          "Tallenna ensin harjoitussalasana salasanaharjoituksessa. Palaa sitten tietovisaan.",
        );
        return;
      }
      const matches =
        question.type === "practice-password"
          ? await matchesPracticePassword(password)
          : isChoiceAnswerCorrect(question, selected);
      setCorrect(matches);
      setFeedback(
        matches
          ? `Oikein! ${question.explanation}`
          : question.type === "practice-password"
            ? "Salasana ei vastaa tallentamaasi harjoitussalasanaa. Tarkista isot ja pienet kirjaimet sekä välilyönnit. Voit yrittää uudelleen."
            : `Ei vielä aivan. ${question.explanation} Muuta valintojasi ja kokeile uudelleen.`,
      );
      if (matches && question.type === "practice-password") {
        setPassword("");
        setVisible(false);
      }
    } catch {
      setFeedback(
        "Vastauksen tarkistus ei onnistunut. Tarkista selaimen tallennus ja suojattu yhteys, ja yritä uudelleen.",
      );
    } finally {
      setChecking(false);
    }
  }

  function advance() {
    if (!correct) return;
    if (index === total - 1) {
      setFinished(true);
      onComplete();
    } else {
      setIndex(index + 1);
      setSelected([]);
      setCorrect(false);
      setFeedback("");
      questionHeading.current?.focus();
    }
  }

  function restart() {
    setIndex(0);
    setSelected([]);
    setPassword("");
    setVisible(false);
    setCorrect(false);
    setFeedback("");
    setFinished(false);
  }

  return (
    <div className={styles.root} data-course={course.id}>
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to={course.path}>← Takaisin aiheisiin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={styles.main}>
        <header>
          <h1>{course.title}: tietovisa</h1>
          <p>
            Kokeillaan, mitä jäi mieleen. Saat jokaisesta vastauksesta
            palautetta, ja voit yrittää uudelleen. Kun kaikki vastaukset ovat
            oikein, saat tietovisasta merkin.
          </p>
          {isComplete && <CompletionBadge label="Tietovisa suoritettu" />}
        </header>
        <div className={styles.progress}>
          <p>
            Oikein vastattu: {answered}/{total}
          </p>
          <progress
            value={answered}
            max={total || 1}
            aria-label="Oikein vastatut kysymykset"
          />
        </div>
        {finished ? (
          <div role="status">
            <CompletionNotice badgeLabel="Tietovisa suoritettu">
              <h2>Valmista tuli, kaikki oikein!</h2>
              <p>
                Voit jatkaa muihin aiheisiin tai kokeilla tietovisaa uudelleen.
                Ansaitsemasi merkki säilyy.
              </p>
              <div className={styles.actions}>
                <Link to={course.path}>Palaa aiheisiin →</Link>
                <button type="button" onClick={restart}>
                  Kertaa tietovisa
                </button>
              </div>
            </CompletionNotice>
          </div>
        ) : question ? (
          <section className={styles.card} aria-labelledby="question-heading">
            <h2 id="question-heading" ref={questionHeading} tabIndex={-1}>
              Kysymys {index + 1}/{total}
            </h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void checkAnswer();
              }}
            >
              {question.type === "practice-password" ? (
                <div>
                  <h3>{question.prompt}</h3>
                  <p id="password-help">
                    Kirjoita salasanaharjoituksessa tallentamasi keksitty
                    salasana. Älä kirjoita oikean tilisi salasanaa.
                  </p>
                  {missingPracticePassword ? (
                    <p className={styles.feedback}>
                      Et ole vielä tallentanut harjoitussalasanaa tässä
                      selaimessa.{" "}
                      <Link to={passwordTopicPath}>
                        Siirry salasanaharjoitukseen
                      </Link>{" "}
                      ja palaa sen jälkeen tietovisaan.
                    </p>
                  ) : (
                    <>
                      <label
                        className={styles.passwordLabel}
                        htmlFor="quiz-password"
                      >
                        Harjoitussalasana
                      </label>
                      <input
                        id="quiz-password"
                        className={styles.password}
                        type={visible ? "text" : "password"}
                        value={password}
                        maxLength={128}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-describedby="password-help"
                        disabled={checking || correct}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setFeedback("");
                        }}
                      />
                      <button
                        type="button"
                        className={styles.reveal}
                        aria-pressed={visible}
                        disabled={checking || correct}
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? "Piilota salasana" : "Näytä salasana"}
                      </button>
                      <p>
                        <Link to={passwordTopicPath}>
                          Unohditko harjoitussalasanan? Luo ja tallenna uusi.
                        </Link>{" "}
                        Palatessasi aloitat tietovisan alusta.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <fieldset
                  disabled={checking || correct}
                  className={styles.options}
                  aria-describedby="answer-instructions"
                >
                  <legend>{question.prompt}</legend>
                  <p id="answer-instructions" className={styles.instructions}>
                    {question.type === "single"
                      ? "Valitse yksi vastaus."
                      : "Valitse kaikki oikeat vastaukset."}
                  </p>
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className={styles.option}
                      data-selected={selected.includes(option.id)}
                    >
                      <input
                        type={question.type === "single" ? "radio" : "checkbox"}
                        name={question.id}
                        value={option.id}
                        checked={selected.includes(option.id)}
                        onChange={() => choose(option.id)}
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              <div role="status" aria-live="polite" aria-atomic="true">
                {feedback && (
                  <p className={styles.feedback} data-correct={correct}>
                    {feedback}
                  </p>
                )}
              </div>
              <div className={styles.actions}>
                {!correct && (
                  <button
                    className={styles.primary}
                    type="submit"
                    disabled={
                      checking ||
                      missingPracticePassword ||
                      (question.type === "practice-password"
                        ? password.length === 0
                        : selected.length === 0)
                    }
                  >
                    {checking ? "Tarkistetaan…" : "Tarkista vastaus"}
                  </button>
                )}
                {correct && (
                  <button
                    className={styles.primary}
                    type="button"
                    onClick={advance}
                  >
                    {index === total - 1
                      ? "Valmis – ota merkki vastaan"
                      : "Seuraava kysymys →"}
                  </button>
                )}
              </div>
            </form>
          </section>
        ) : (
          <p>Tähän tietovisaan ei ole vielä lisätty kysymyksiä.</p>
        )}
        <p className={styles.small}>
          Keskeneräiset vastaukset eivät tallennu. Suoritusmerkki säilyy tässä
          selaimessa, jos tallennus on sallittu.
        </p>
      </main>
    </div>
  );
}
