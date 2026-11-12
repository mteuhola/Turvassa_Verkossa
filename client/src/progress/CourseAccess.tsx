import type { ReactNode } from "react";
import { matchPath, Navigate, useLocation } from "react-router-dom";
import type { TopicCourse } from "../pages/TopicSelection/topicCourses";
import { canEnterTopic } from "./courseProgress";
import { CourseProgressContext } from "./CourseProgressContext";

export default function CourseAccess({
  courses,
  children,
}: {
  courses: TopicCourse[];
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  for (const course of courses) {
    const topic = course.topics.find((item) => matchPath(item.path, pathname));
    if (topic && !canEnterTopic(course, topic.path)) {
      return <Navigate to={course.path} replace />;
    }
  }
  return (
    <CourseProgressContext value={courses}>{children}</CourseProgressContext>
  );
}
