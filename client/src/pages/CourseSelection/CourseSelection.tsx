import { Link } from "react-router-dom";
import CourseProgress from "../../components/CourseProgress";
import { LockIcon, EmailIcon, MaskIcon } from "../../components/icons";
import type { TopicCourse } from "../TopicSelection/topicCourses";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import styles from "./CourseSelection.module.css";

const courseDetails: Record<string, { description: string; duration: string }> =
  {
    passwords: {
      description:
        "Kokeile, millainen salasana on helppo muistaa mutta vaikea arvata.",
      duration: "Noin 10 minuuttia",
    },
    phishing: {
      description:
        "Harjoittele tunnistamaan huijausviestit ja epäilyttävät linkit.",
      duration: "Noin 12 minuuttia",
    },
    "romance-fraud": {
      description:
        "Opi tunnistamaan verkossa tapahtuvaa tunnemanipulaatiota, ja huomaamaan, jos jokin on liian hyvää ollakseen totta.",
      duration: "Noin 15 minuuttia",
    },
  };

export default function CourseSelection({
  progressCourses,
  ...textSizeProps
}: TextSizeProps & { progressCourses: TopicCourse[] }) {
  return (
    <div className={styles.root}>
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <span className={styles.logoText}>Turvassa Verkossa</span>
        <div className="nav-actions">
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1>Tervetuloa oppimaan!</h1>
          <p>
            Täällä voit harjoitella turvallista verkon käyttöä tuttujen arjen tilanteiden
            avulla. Et tarvitse ennakkotietoja, ja voit edetä omaan tahtiisi.
          </p>
        </header>
        <section aria-labelledby="courses-title">
          <div className={styles.sectionHeading}>
            <h2 id="courses-title">Valitse kurssi, josta haluat aloittaa.</h2>
          </div>
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
                      {course.id === "passwords" && (
                        <LockIcon color="currentColor" />
                      )}
                      {course.id === "phishing" && (
                        <EmailIcon color="currentColor" />
                      )}
                      {course.id === "romance-fraud" && (
                        <MaskIcon color="currentColor" />
                      )}
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
        <footer className={styles.footer}>
          <p>
            Voit kokeilla tehtäviä niin monta kertaa kuin haluat ja palata
            kursseihin myöhemmin.
          </p>
        </footer>
      </main>
    </div>
  );
}
