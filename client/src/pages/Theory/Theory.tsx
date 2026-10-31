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
  const pageHeading = useRef<HTMLParagraphElement>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const pages = topic.content.sections;
  const page = pages[pageIndex];
  const isLastPage = pageIndex >= pages.length - 1;
  const index = course.topics.findIndex((item) => item.path === topic.path);
  const nextTopic = course.topics[index + 1];

  useEffect(() => {
    window.scrollTo(0, 0);
    (pageHeading.current ?? heading.current)?.focus({ preventScroll: true });
  }, [topic.path, pageIndex]);

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
        <article className={styles.content} aria-label={topic.title}>
          <p ref={pageHeading} tabIndex={-1} className={styles.pageCount}>
            Sivu {pageIndex + 1} / {Math.max(1, pages.length)}
          </p>
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
            </section>
          )}
        </article>
        <footer className={styles.continue}>
          {pageIndex > 0 && (
            <button type="button" onClick={() => setPageIndex(pageIndex - 1)}>
              <span aria-hidden="true">← </span>Edellinen sivu
            </button>
          )}
          {isLastPage ? (
            <>
              <div>
                {!continuation && nextTopic && (
                  <p>
                    Seuraavaksi: <strong>{nextTopic.title}</strong>
                  </p>
                )}
                {!continuation && (
                  <p id="completion-help" className={styles.help}>
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
            </>
          ) : (
            <button type="button" onClick={() => setPageIndex(pageIndex + 1)}>
              Seuraava sivu<span aria-hidden="true"> →</span>
            </button>
          )}
        </footer>
      </CourseBook>
    </div>
  );
}
