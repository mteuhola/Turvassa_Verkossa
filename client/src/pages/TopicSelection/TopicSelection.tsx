import CourseBook from "../../components/CourseBook";
import Navbar from "../../components/Navbar";
import CompletionBadge from "../../components/CompletionBadge";
import CourseProgress from "../../components/CourseProgress";
import CourseGuide from "../../components/CourseGuide";
import { Link } from "react-router-dom";
import type { TextSizeProps } from "../../components/TextSizeControl";
import type { TopicCourse } from "./topicCourses";
import { canEnterQuiz } from "../../progress/courseProgress";
import styles from "./TopicSelection.module.css";

interface TopicSelectionProps extends TextSizeProps {
  course: TopicCourse;
}

export default function TopicSelection({
  course,
  ...textSizeProps
}: TopicSelectionProps) {
  return (
    <div className={styles.root} data-course={course.id}>
      <Navbar {...textSizeProps} backTo="/" backLabel="Takaisin kursseihin" />
      <CourseBook className={styles.main}>
        <header className={styles.header}>
          <h1>{course.title}</h1>
        </header>
        <CourseGuide courseId={course.id} />
        <section aria-labelledby="topics-title">
          <div className={styles.sectionHeading}>
            <h2 id="topics-title">Kurssin aiheet</h2>
            <CourseProgress course={course} />
          </div>
          {course.topics.length > 0 ? (
            <ol className={styles.topics}>
              {course.topics.map((topic, index) => {
                const locked = topic.kind === "quiz" && !canEnterQuiz(course);
                const content = (
                  <>
                    <span className={styles.number} aria-hidden="true">
                      {index + 1}
                    </span>
                    <div className={styles.content}>
                      <h3>{topic.title}</h3>
                      {topic.isComplete && <CompletionBadge />}
                      <p>{topic.description}</p>
                      {locked && (
                        <p>
                          Tietovisa avautuu, kun olet suorittanut kurssin muut
                          aiheet.
                        </p>
                      )}
                    </div>
                    <span className={styles.start}>
                      {locked
                        ? "Lukittu"
                        : topic.isComplete
                          ? "Kertaa"
                          : "Aloita"}{" "}
                      {!locked && <span aria-hidden="true">→</span>}
                    </span>
                  </>
                );
                return (
                  <li key={topic.id}>
                    {locked ? (
                      <div
                        className={`${styles.topic} ${styles.locked}`}
                        aria-disabled="true"
                      >
                        {content}
                      </div>
                    ) : (
                      <Link to={topic.path} className={styles.topic}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className={styles.empty}>
              <h3>Kurssin aiheet ovat tulossa</h3>
              <p>
                Harjoitukset eivät ole vielä valmiina. Voit sillä välin kokeilla
                toista kurssia.
              </p>
              <Link to="/">Palaa kurssivalintaan →</Link>
            </div>
          )}
        </section>
      </CourseBook>
    </div>
  );
}
