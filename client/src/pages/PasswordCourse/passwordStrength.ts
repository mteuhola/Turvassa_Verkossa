export const MAX_PASSWORD_LENGTH = 128;
export type PasswordAssessment = {
  score: number;
  label: string;
  tips: string[];
};
export async function assessPassword(
  password: string,
  signal: AbortSignal,
): Promise<PasswordAssessment> {
  const response = await fetch("/api/password-strength", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error("Password assessment failed");
  const result = await response.json();
  if (
    !result ||
    !Number.isInteger(result.score) ||
    result.score < 0 ||
    result.score > 4 ||
    typeof result.label !== "string" ||
    !Array.isArray(result.tips) ||
    !result.tips.every((tip: unknown) => typeof tip === "string")
  ) {
    throw new Error("Invalid password assessment");
  }
  return result;
}
