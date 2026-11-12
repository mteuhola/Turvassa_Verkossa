import Navbar from "../../components/Navbar";
import FeedbackForm from "../../components/FeedbackForm";
import DebugProgressReset from "../../components/DebugProgressReset";
import { debugToolsEnabled } from "../../progress/debug";
import { Link } from "react-router-dom";
import CourseProgress from "../../components/CourseProgress";
import { CourseIcon } from "../../components/icons";
import type { TopicCourse } from "../TopicSelection/topicCourses";
import type { TextSizeProps } from "../../components/TextSizeControl";
import styles from "./CourseSelection.module.css";

const courseDetails: Record<string, { description: string; duration: string }> =
  {
    passwords: {
      description:
        "Kokeile, millainen salasana on helppo muistaa mutta vaikea arvata.",
      duration: "Noin 15 minuuttia",
    },
    phishing: {
      description:
        "Harjoittele tunnistamaan huijausviestit ja epäilyttävät linkit.",
      duration: "Noin 15 minuuttia",
    },
    "financial-fraud": {
      description:
        "Harjoittele tunnistamaan epäilyttävät sijoitustarjoukset ja verkossa esitetyt rahapyynnöt.",
      duration: "Noin 20 minuuttia",
    },
  };

export default function CourseSelection({
  progressCourses,
  onResetProgress,
  ...textSizeProps
}: TextSizeProps & {
  progressCourses: TopicCourse[];
  onResetProgress: () => boolean;
}) {
  return (
    <div className={styles.root}>
      <Navbar {...textSizeProps} />
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1>Tervetuloa oppimaan!</h1>
          <p>
            Täällä voit harjoitella turvallista verkon käyttöä. Voit edetä omaan
            tahtiisi.
          </p>
        </header>
        <section aria-labelledby="courses-title">
          <div className={styles.sectionHeading}></div>
          <ul className={styles.courses}>
            {progressCourses.map((course) => {
              const details = courseDetails[course.id];
              const started = course.topics.some((topic) => topic.isComplete);
              return (
                <li key={course.id} data-course={course.id}>
                  <Link
                    to={course.path}
                    className={styles.course}
                    aria-labelledby={`${course.id}-title`}
                  >
                    <span className={styles.courseIcon} aria-hidden="true">
                      <CourseIcon courseId={course.id} />
                    </span>
                    <div className={styles.content}>
                      <h3 id={`${course.id}-title`}>{course.title}</h3>
                      {details && <p>{details.description}</p>}
                      <span className={styles.meta}>
                        {details && <span>{details.duration}</span>}
                        <span>
                          {course.topics.length}{" "}
                          {course.topics.length === 1 ? "aihe" : "aihetta"}
                        </span>
                      </span>
                    </div>
                    <div className={styles.courseAction}>
                      <CourseProgress course={course} />
                      <span className={styles.open}>
                        {course.isComplete
                          ? "Kertaa kurssia"
                          : started
                            ? "Jatka kurssia"
                            : "Avaa kurssi"}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <FeedbackForm />
        {debugToolsEnabled && <DebugProgressReset onReset={onResetProgress} />}
      </main>
    </div>
  );
}
