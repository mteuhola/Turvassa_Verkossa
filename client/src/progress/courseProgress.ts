import {
  topicCourses,
  type TopicCourse,
} from "../pages/TopicSelection/topicCourses.ts";

export const progressStorageKey = "turvassa-verkossa-progress-v1";
const topicPaths = new Set(
  topicCourses.flatMap((course) => course.topics.map((topic) => topic.path)),
);

export interface ActivityProgressProps {
  isComplete: boolean;
  onComplete: () => void;
}

export function unfinishedQuizPrerequisites(course: TopicCourse) {
  return course.topics.filter(
    (topic) => topic.kind !== "quiz" && !topic.isComplete,
  );
}

export function canEnterQuiz(course: TopicCourse) {
  return (
    course.topics.some((topic) => topic.kind === "quiz") &&
    unfinishedQuizPrerequisites(course).length === 0
  );
}

export function parseProgress(stored: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(stored ?? "null");
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed
          .map((path: unknown) =>
            typeof path === "string"
              ? path
                  .replace(
                    /^\/course\/romance-fraud(?=\/|$)/,
                    "/course/financial-fraud",
                  )
                  .replace(
                    /^\/course\/phishing\/suspicious-email$/,
                    "/course/phishing/introduction",
                  )
              : path,
          )
          .filter(
            (path): path is string =>
              typeof path === "string" && topicPaths.has(path),
          ),
      ),
    ];
  } catch {
    return [];
  }
}

export function completeTopic(completed: string[], path: string): string[] {
  if (!topicPaths.has(path) || completed.includes(path)) return completed;
  return [...completed, path];
}

export function applyProgress(
  completed: string[],
  catalog: TopicCourse[] = topicCourses,
): TopicCourse[] {
  const completedPaths = new Set(completed);
  return catalog.map((course) => {
    const topics = course.topics.map((topic) => ({
      ...topic,
      isComplete: completedPaths.has(topic.path),
    }));
    return {
      ...course,
      topics,
      isComplete:
        topics.length > 0 && topics.every((topic) => topic.isComplete),
    };
  });
}
