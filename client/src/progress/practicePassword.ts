export const practicePasswordStorageKey =
  "turvassa-verkossa-practice-password-v1";
export const passwordTopicPath = "/course/passwords/password-strength";

interface PracticePasswordRecord {
  version: 1;
  salt: string;
  digest: string;
  managerPassword?: string;
}

export function canSavePracticePassword({
  hasTyped,
  isExample,
  score,
}: {
  hasTyped: boolean;
  isExample: boolean;
  score: number | undefined;
}) {
  return hasTyped && !isExample && score === 4;
}

export function readPracticePassword(): PracticePasswordRecord | null {
  try {
    const record = JSON.parse(
      localStorage.getItem(practicePasswordStorageKey) ?? "null",
    );
    if (
      record?.version !== 1 ||
      typeof record.salt !== "string" ||
      typeof record.digest !== "string" ||
      !/^[a-f0-9]{32}$/.test(record.salt) ||
      !/^[a-f0-9]{64}$/.test(record.digest)
    )
      return null;
    return {
      version: 1,
      salt: record.salt,
      digest: record.digest,
      ...(typeof record.managerPassword === "string" &&
      record.managerPassword.length > 0 &&
      record.managerPassword.length <= 128
        ? { managerPassword: record.managerPassword }
        : {}),
    };
  } catch {
    return null;
  }
}

function hex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function digestPassword(password: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
}

/** The optional manager stores ONLY a fictional practice password in readable form. */
export async function savePracticePassword(
  password: string,
  method: "written" | "manager" = "written",
): Promise<void> {
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
  const digest = await digestPassword(password, salt);
  const record: PracticePasswordRecord = {
    version: 1,
    salt,
    digest,
    ...(method === "manager" ? { managerPassword: password } : {}),
  };
  localStorage.setItem(practicePasswordStorageKey, JSON.stringify(record));
}

/** The final module question can await this to check the learner's answer. */
export async function matchesPracticePassword(
  candidate: string,
): Promise<boolean> {
  const record = readPracticePassword();
  if (!record) return false;
  return (await digestPassword(candidate, record.salt)) === record.digest;
}

/** Old example-only badges no longer satisfy the new password task. */
export function reconcilePasswordCompletion(
  completed: string[],
  saved: boolean,
): string[] {
  const otherTopics = completed.filter((path) => path !== passwordTopicPath);
  return saved ? [...otherTopics, passwordTopicPath] : otherTopics;
}
