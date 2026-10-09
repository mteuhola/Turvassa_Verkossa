import { progressStorageKey } from "./courseProgress.ts";
import { practicePasswordStorageKey } from "./practicePassword.ts";

/** Remove the verifier too: it otherwise restores the password badge on reload. */
export function resetStoredProgress(
  storage: Pick<Storage, "removeItem" | "setItem">,
) {
  storage.removeItem(practicePasswordStorageKey);
  storage.setItem(progressStorageKey, "[]");
}
