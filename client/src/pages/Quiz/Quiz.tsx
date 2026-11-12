import CourseBook from "../../components/CourseBook";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
import Navbar from "../../components/Navbar";
import { useRef, useState } from "react";
import { toggleSelection } from "../../selection";
import { Link } from "react-router-dom";
import type { TextSizeProps } from "../../components/TextSizeControl";
import PracticePasswordManager from "../../components/PracticePasswordManager";
import CompletionNotice from "../../components/CompletionNotice";
import CourseCompletionBadge from "../../components/CourseCompletionBadge";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import {
  canEnterQuiz,
  unfinishedQuizPrerequisites,
} from "../../progress/courseProgress";
import {
  matchesPracticePassword,
  readPracticePassword,
  passwordTopicPath,
} from "../../progress/practicePassword";
import type { TopicCourse } from "../TopicSelection/topicCourses";
import {
  type CourseQuiz,
  createQuizQuestions,
  isChoiceAnswerCorrect,
} from "./quizData";
import styles from "./Quiz.module.css";
import QuizNotifications from "./QuizNotifications";

interface QuizProps extends TextSizeProps, ActivityProgressProps {
  course: TopicCourse;
  quiz: CourseQuiz;
}

export default function Quiz(props: QuizProps) {
  if (canEnterQuiz(props.course)) {
    return <QuizActivity key={props.course.id} {...props} />;
  }
  return (
    <div className={styles.root} data-course={props.course.id}>
      <Navbar
        {...props}
        backTo={props.course.path}
        backLabel="Takaisin aiheisiin"
      />
      <CourseBook className={styles.main}>
        <h1>{props.course.title}: tietovisa</h1>
        <h2>Suorita ensin muut aiheet</h2>
        <p>
          Tietovisa avautuu, kun olet suorittanut kaikki tämän kurssin muut
          aiheet. Voit jatkaa tästä:
        </p>
        <ul>
          {unfinishedQuizPrerequisites(props.course).map((topic) => (
            <li key={topic.path}>
              <Link to={topic.path}>{topic.title}</Link>
            </li>
          ))}
        </ul>
        <Link to={props.course.path}>Palaa kurssin aiheisiin</Link>
      </CourseBook>
    </div>
  );
}

function QuizActivity({
  course,
  quiz,
  isComplete,
  onComplete,
  ...textSizeProps
}: QuizProps) {
  const [questions] = useState(() => createQuizQuestions(quiz));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(false);
  const [checking, setChecking] = useState(false);
  const [finished, setFinished] = useState(false);
  const [celebrateCompletion, setCelebrateCompletion] = useState(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const question = questions[index];
  const missingPracticePassword =
    question?.type === "practice-password" && !readPracticePassword();
  const total = questions.length;
  const answered = finished ? total : index + (correct ? 1 : 0);
  const showNotifications = course.id === "phishing" && !finished;

  function choose(id: string) {
    setSelected((previous) =>
      question.type === "single" ? [id] : toggleSelection(previous, id),
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
      setCelebrateCompletion(
        !isComplete && unfinishedQuizPrerequisites(course).length === 0,
      );
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

  return (
    <div className={styles.root} data-course={course.id}>
      <Navbar
        {...textSizeProps}
        backTo={course.path}
        backLabel="Takaisin aiheisiin"
        className={showNotifications ? styles.quizNav : undefined}
      >
        {showNotifications && (
          <QuizNotifications
            isLastQuestion={total > 0 && index === total - 1}
          />
        )}
      </Navbar>
      <CourseBook className={styles.main}>
        <header>
          <h1>{course.title}: tietovisa</h1>
          <p>
            Kokeillaan, mitä jäi mieleen. Saat jokaisesta vastauksesta
            palautetta, ja voit yrittää uudelleen. Kun kaikki vastaukset ovat
            oikein, kurssi merkitään suoritetuksi!
          </p>
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
          celebrateCompletion ? (
            <section
              className={styles.celebration}
              aria-labelledby="course-completed"
            >
              <CourseCompletionBadge />
              <h2
                id="course-completed"
                tabIndex={-1}
                ref={(node) => {
                  node?.focus();
                }}
              >
                Hienoa, suoritit koko kurssin!
              </h2>
              <TopicCompletionProgress />
              <p>
                <strong>{course.title}</strong>
              </p>
              <p>
                Kaikki aiheet ja tietovisa on nyt suoritettu. Voit palata
                kertaamaan milloin tahansa.
              </p>
              <div className={styles.actions}>
                <Link className={styles.courseLink} to="/">
                  Takaisin kursseihin →
                </Link>
              </div>
            </section>
          ) : (
            <div role="status">
              <CompletionNotice badgeLabel="Tietovisa suoritettu">
                <h2>Valmista tuli, kaikki oikein!</h2>
                <TopicCompletionProgress />
                <p>Voit jatkaa muihin aiheisiin.</p>
                <div className={styles.actions}>
                  <Link to={course.path}>Palaa aiheisiin</Link>
                </div>
              </CompletionNotice>
            </div>
          )
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
                    Käytä kirjoittamaasi muistiinpanoa tai avaa harjoituksen
                    salasanojen hallintaohjelma.
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
                      <PracticePasswordManager
                        disabled={checking || correct}
                        onFill={(saved) => {
                          setPassword(saved);
                          setVisible(false);
                          setFeedback(
                            "Harjoitussalasana täytetty. Paina Tarkista vastaus.",
                          );
                        }}
                      />
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
                    {index === total - 1 ? "Valmis!" : "Seuraava kysymys →"}
                  </button>
                )}
              </div>
            </form>
          </section>
        ) : (
          <p>Tähän tietovisaan ei ole vielä lisätty kysymyksiä.</p>
        )}
        <p className={styles.small}>Keskeneräiset vastaukset eivät tallennu.</p>
      </CourseBook>
    </div>
  );
}
