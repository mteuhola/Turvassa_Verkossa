import CourseBook from "../../components/CourseBook";
import Navbar from "../../components/Navbar";
import { CharacterPortrait } from "../../components/CourseGuide";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TopicCompletionProgress from "../../components/TopicCompletionProgress";
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
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const pages = topic.content.sections;
  const isLastPage = pageIndex >= pages.length - 1;
  const index = course.topics.findIndex((item) => item.path === topic.path);
  const nextTopic = course.topics[index + 1];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [topic.path, finished]);

  function changePage(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= pages.length) return;
    setPageIndex(nextIndex);
  }

  function continueCourse() {
    if (continuation) {
      continuation.onContinue();
      return;
    }
    onComplete();
    setFinished(true);
    window.scrollTo(0, 0);
  }

  if (finished) {
    return (
      <div className={styles.root} data-course={course.id}>
        <Navbar
          {...textSizeProps}
          backTo={course.path}
          backLabel="Takaisin aiheisiin"
        />
        <CourseBook className={styles.main}>
          <header className={styles.header}>
            <h1 ref={heading} tabIndex={-1}>
              {topic.title}: suoritettu
            </h1>
            <CompletionBadge />
          </header>
          <TopicCompletionProgress />
          <div className={styles.continue}>
            <Link to={nextTopic?.path ?? course.path}>
              {nextTopic
                ? `Seuraava aihe: ${nextTopic.title}`
                : "Palaa aiheisiin"}{" "}
              →
            </Link>
          </div>
        </CourseBook>
      </div>
    );
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
        <div className={styles.pages}>
          {(pages.length ? pages : [undefined]).map((page, index) => (
            <article
              key={index}
              className={styles.content}
              aria-label={topic.title}
              aria-hidden={index !== pageIndex}
              inert={index !== pageIndex}
              data-active={index === pageIndex}
            >
              {page && (
                <section className={styles.section}>
                  {page.heading && <h2>{page.heading}</h2>}
                  {page.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                  {page.image && (
                    <figure className={styles.figure}>
                      <img src={page.image.src} alt={page.image.alt} />
                      {page.image.caption && (
                        <figcaption>{page.image.caption}</figcaption>
                      )}
                    </figure>
                  )}
                  {page.characterPortrait && (
                    <div className={styles.portrait}>
                      <CharacterPortrait courseId={course.id} complete />
                    </div>
                  )}
                </section>
              )}
            </article>
          ))}
        </div>
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
              aria-disabled={pageIndex === 0}
              onClick={() => changePage(pageIndex - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Seuraava sivu"
              title="Seuraava sivu"
              aria-disabled={isLastPage}
              onClick={() => changePage(pageIndex + 1)}
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
                    : "Kun valitset Valmis, tämä aihe merkitään suoritetuksi."}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={continueCourse}
              aria-describedby={continuation ? undefined : "completion-help"}
            >
              {continuation?.label ?? "Valmis"}
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </footer>
      </CourseBook>
    </div>
  );
}
