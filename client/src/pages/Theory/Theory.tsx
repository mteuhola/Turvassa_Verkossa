import TheoryBook, { type TheoryBookHandle } from "./TheoryBook";
import CourseBook from "../../components/CourseBook";
import Navbar from "../../components/Navbar";
import { CharacterPortrait } from "../../components/CourseGuide";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompletionBadge from "../../components/CompletionBadge";
import type { TextSizeProps } from "../../components/TextSizeControl";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import type { CourseTopic, TopicCourse } from "../TopicSelection/topicCourses";
import styles from "./Theory.module.css";

interface TheoryProps extends TextSizeProps, ActivityProgressProps {
  course: TopicCourse;
  topic: Extract<CourseTopic, { kind: "theory" }>;
  continuation?: { label: string; onContinue: () => void };
}

export default function Theory(props: TheoryProps) {
  return <TheoryPages key={props.topic.path} {...props} />;
}

function TheoryPages({
  course,
  topic,
  isComplete,
  onComplete,
  continuation,
  ...textSizeProps
}: TheoryProps) {
  const navigate = useNavigate();
  const heading = useRef<HTMLHeadingElement>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const pages = topic.content.sections;
  const book = useRef<TheoryBookHandle>(null);
  const [turning, setTurning] = useState(false);
  const isLastPage = pageIndex >= pages.length - 1;
  const index = course.topics.findIndex((item) => item.path === topic.path);
  const nextTopic = course.topics[index + 1];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [topic.path]);

  function turnPage(nextIndex: number) {
    if (turning || nextIndex < 0 || nextIndex >= pages.length) return;
    book.current?.turnTo(nextIndex);
  }

  function continueCourse() {
    if (continuation) {
      continuation.onContinue();
      return;
    }
    onComplete();
    navigate(nextTopic?.path ?? course.path);
    window.scrollTo(0, 0);
  }

  return (
    <div className={styles.root} data-course={course.id}>
      <Navbar
        {...textSizeProps}
        backTo={course.path}
        backLabel="Takaisin aiheisiin"
      />
      <CourseBook className={styles.main}>
        <header className={styles.header}>
          <p className={styles.course}>{course.title}</p>
          <h1 ref={heading} tabIndex={-1}>
            {topic.title}
          </h1>
          {isComplete && <CompletionBadge />}
        </header>
        {topic.content.characterName && (
          <div className={styles.character}>
            <div className={styles.portrait}>
              <CharacterPortrait courseId={course.id} />
            </div>
            <p>
              {topic.content.characterName} on kuvitteellinen harjoituskaveri.
              Pohdi tilannetta omaan tahtiisi.
            </p>
          </div>
        )}
        <TheoryBook
          ref={book}
          content={topic.content}
          title={topic.title}
          pageIndex={pageIndex}
          onPageChange={setPageIndex}
          onTurningChange={setTurning}
        />
        <footer className={styles.continue}>
          <div
            className={styles.pageNavigation}
            role="group"
            aria-label="Teorian sivut"
          >
            <button
              type="button"
              aria-label="Edellinen sivu"
              title="Edellinen sivu"
              aria-disabled={pageIndex === 0 || turning}
              onClick={() => turnPage(pageIndex - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Seuraava sivu"
              title="Seuraava sivu"
              aria-disabled={isLastPage || turning}
              onClick={() => turnPage(pageIndex + 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
            <span className={styles.pageCount} role="status" aria-live="polite">
              Sivu {pageIndex + 1} / {Math.max(1, pages.length)}
            </span>
          </div>
          <div
            className={styles.completion}
            data-visible={isLastPage}
            aria-hidden={!isLastPage}
            inert={!isLastPage}
          >
            <div>
              {!continuation && nextTopic && (
                <p>
                  Seuraavaksi: <strong>{nextTopic.title}</strong>
                </p>
              )}
              {!continuation && (
                <p id={"completion-help"} className={styles.help}>
                  {isComplete
                    ? "Olet jo suorittanut tämän aiheen. Voit jatkaa eteenpäin."
                    : "Kun jatkat, tämä aihe merkitään suoritetuksi."}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={continueCourse}
              aria-describedby={continuation ? undefined : "completion-help"}
            >
              {continuation?.label ??
                (nextTopic ? "Seuraava aihe" : "Valmis - palaa aiheisiin")}
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </footer>
      </CourseBook>
    </div>
  );
}
