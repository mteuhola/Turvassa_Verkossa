import { resetStoredProgress } from "./resetProgress";
import {
  readPracticePassword,
  reconcilePasswordCompletion,
} from "./practicePassword";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  applyProgress,
  completeTopic,
  parseProgress,
  progressStorageKey,
} from "./courseProgress";

export function useCourseProgress() {
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return reconcilePasswordCompletion(
        parseProgress(localStorage.getItem(progressStorageKey)),
        readPracticePassword() !== null,
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(progressStorageKey, JSON.stringify(completed));
    } catch {
      // Completion still works for this session if browser storage is unavailable.
    }
  }, [completed]);

  const markComplete = useCallback((path: string) => {
    setCompleted((previous) => completeTopic(previous, path));
  }, []);
  const resetProgress = useCallback(() => {
    let persisted = true;
    try {
      resetStoredProgress(localStorage);
    } catch {
      persisted = false;
    }
    setCompleted([]);
    return persisted;
  }, []);
  const courses = useMemo(() => applyProgress(completed), [completed]);
  return { courses, markComplete, resetProgress };
}
