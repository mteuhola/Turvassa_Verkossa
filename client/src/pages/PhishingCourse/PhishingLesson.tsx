import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import CompletionBadge from "../../components/CompletionBadge";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import Theory from "../Theory/Theory";
import { courseIntroductions } from "../Theory/theoryData";
import { topicCourses } from "../TopicSelection/topicCourses";
import PhishingCourse from "./PhishingCourse";
import { phishingTheory } from "../Theory/theoryData";
import SafeActionSequence from "./SafeActionSequence";
import styles from "./PhishingCourse.module.css";

export default function PhishingLesson({
  mode,
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps &
  ActivityProgressProps & { mode: "introduction" | "safe-responses" }) {
  const [stage, setStage] = useState<"reading" | "activity">("reading");
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (stage === "activity") {
      window.scrollTo(0, 0);
      heading.current?.focus({ preventScroll: true });
    }
  }, [stage]);

  if (stage === "reading") {
    const course = topicCourses.find((item) => item.id === "phishing")!;
    const topic = course.topics.find((item) => item.id === mode)!;
    return (
      <Theory
        {...textSizeProps}
        course={course}
        topic={{
          ...topic,
          kind: "theory",
          content:
            mode === "introduction"
              ? courseIntroductions.phishing
              : phishingTheory,
        }}
        isComplete={isComplete}
        onComplete={onComplete}
        continuation={{
          label:
            mode === "introduction"
              ? "Tutki harjoitusviestiä"
              : "Harjoittele toimintatapoja",
          onContinue: () => setStage("activity"),
        }}
      />
    );
  }

  if (mode === "introduction") {
    return (
      <PhishingCourse
        {...textSizeProps}
        isComplete={isComplete}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className={styles.root} data-course="phishing">
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/course/phishing">← Takaisin aiheisiin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={`${styles.main} ${styles.responsePractice}`}>
        <h1 ref={heading} tabIndex={-1}>
          Rakenna turvallinen toimintaketju
        </h1>
        {isComplete && <CompletionBadge />}
        <SafeActionSequence onComplete={onComplete} />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.action}
            onClick={() => setStage("reading")}
          >
            Palaa teoriaan
          </button>
        </div>
      </main>
    </div>
  );
}
