import type { TopicCourse } from "../pages/TopicSelection/topicCourses";
import CourseCompletionBadge from "./CourseCompletionBadge";
import styles from "./CourseProgress.module.css";

export default function CourseProgress({
  course,
  showCompletionBadge = true,
}: {
  course: TopicCourse;
  showCompletionBadge?: boolean;
}) {
  const completed = course.topics.filter((topic) => topic.isComplete).length;
  const total = course.topics.length;
  return (
    <span className={styles.summary}>
      <span className={styles.label}>
        {completed}/{total} aihetta suoritettu
        {total === 0 ? " · Aiheet tulossa" : ""}
      </span>
      <progress
        className={styles.meter}
        value={completed}
        max={total || 1}
        aria-label={`${course.title}: ${completed}/${total} aihetta suoritettu${total === 0 ? ", aiheet tulossa" : ""}`}
      />
      {showCompletionBadge && course.isComplete && <CourseCompletionBadge />}
    </span>
  );
}
