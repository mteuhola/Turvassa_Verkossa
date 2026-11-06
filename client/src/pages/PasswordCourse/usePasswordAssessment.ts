import { useEffect, useState } from "react";
import {
  assessPassword,
  MAX_PASSWORD_LENGTH,
  type PasswordAssessment,
} from "./passwordStrength";

export function usePasswordAssessment(password: string) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{
    password: string;
    attempt: number;
    assessment: PasswordAssessment | null;
    error: boolean;
  } | null>(null);
  const valid = password.length > 0 && password.length <= MAX_PASSWORD_LENGTH;

  useEffect(() => {
    if (!valid) return;
    const controller = new AbortController();
    let active = true;
    let timeout: ReturnType<typeof setTimeout>;
    const debounce = setTimeout(async () => {
      timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const assessment = await assessPassword(password, controller.signal);
        if (active) setResult({ password, attempt, assessment, error: false });
      } catch {
        if (active)
          setResult({ password, attempt, assessment: null, error: true });
      } finally {
        clearTimeout(timeout);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(debounce);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [password, attempt, valid]);

  const current =
    valid && result?.password === password && result.attempt === attempt
      ? result
      : null;
  return {
    assessment: current?.assessment ?? null,
    loading: valid && !current,
    error: current?.error ?? false,
    retry: () => setAttempt((value) => value + 1),
  };
}
