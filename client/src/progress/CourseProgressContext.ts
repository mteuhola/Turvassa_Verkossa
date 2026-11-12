import { createContext } from "react";
import type { TopicCourse } from "../pages/TopicSelection/topicCourses";

export const CourseProgressContext = createContext<TopicCourse[]>([]);
