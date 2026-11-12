import {
  topicCourses,
  type TopicCourse,
} from "../pages/TopicSelection/topicCourses.ts";
import { debugToolsEnabled } from "./debug";

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
  const quiz = course.topics.find((topic) => topic.kind === "quiz");
  return !!quiz && canEnterTopic(course, quiz.path);
}

export function canEnterTopic(course: TopicCourse, path: string) {
  const index = course.topics.findIndex((topic) => topic.path === path);
  return (
    index >= 0 &&
    (debugToolsEnabled ||
      course.topics.slice(0, index).every((topic) => topic.isComplete))
  );
}

export function parseProgress(stored: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(stored ?? "null");
    if (!Array.isArray(parsed)) return [];
    const completed = new Set<string>();
    for (const value of parsed) {
      if (typeof value !== "string") continue;
      const path = value
        .replace(/^\/course\/romance-fraud(?=\/|$)/, "/course/financial-fraud")
        .replace(
          /^\/course\/phishing\/suspicious-email$/,
          "/course/phishing/introduction",
        );
      if (topicPaths.has(path)) completed.add(path);
    }
    return [...completed];
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
