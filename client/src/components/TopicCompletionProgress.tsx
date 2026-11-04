import { useContext } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { CourseProgressContext } from "../progress/CourseProgressContext";
import CourseProgress from "./CourseProgress";
import styles from "./TopicCompletionProgress.module.css";

/** Reads the same live progress as course selection, including the latest completion. */
export default function TopicCompletionProgress() {
  const courses = useContext(CourseProgressContext);
  const { pathname } = useLocation();
  const course = courses.find((item) =>
    item.topics.some((topic) => matchPath(topic.path, pathname)),
  );
  if (!course) return null;

  return (
    <div
      className={styles.summary}
      role="group"
      aria-label="Kurssin edistyminen"
    >
      <p className={styles.title}>Kurssin edistyminen: {course.title}</p>
      <CourseProgress course={course} showCompletionBadge={false} />
    </div>
  );
}
