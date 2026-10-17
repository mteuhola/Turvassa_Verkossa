import { CharacterPortrait } from "../../components/CourseGuide";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompletionBadge from "../../components/CompletionBadge";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import type { CourseTopic, TopicCourse } from "../TopicSelection/topicCourses";
import styles from "./Theory.module.css";

interface TheoryProps extends TextSizeProps, ActivityProgressProps {
  course: TopicCourse;
  topic: Extract<CourseTopic, { kind: "theory" }>;
  continuation?: { label: string; onContinue: () => void };
}

export default function Theory({
  course,
  topic,
  isComplete,
  onComplete,
  continuation,
  ...textSizeProps
}: TheoryProps) {
  const navigate = useNavigate();
  const heading = useRef<HTMLHeadingElement>(null);
  const index = course.topics.findIndex((item) => item.path === topic.path);
  const nextTopic = course.topics[index + 1];

  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, [topic.path]);

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
          {topic.content.sections.map((section, sectionIndex) => (
            <section className={styles.section} key={sectionIndex}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
              {section.image && (
                <figure className={styles.figure}>
                  <img src={section.image.src} alt={section.image.alt} />
                  {section.image.caption && (
                    <figcaption>{section.image.caption}</figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}
        </article>
        <footer className={styles.continue}>
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
        </footer>
      </main>
    </div>
  );
}
