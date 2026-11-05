import { progressStorageKey } from "./courseProgress.ts";
import { practicePasswordStorageKey } from "./practicePassword.ts";
import { investmentDecisionStorageKey } from "./investmentDecision.ts";

/** Remove the verifier too: it otherwise restores the password badge on reload. */
export function resetStoredProgress(
  storage: Pick<Storage, "removeItem" | "setItem">,
) {
  storage.removeItem(practicePasswordStorageKey);
  storage.removeItem(investmentDecisionStorageKey);
  storage.removeItem("turvassa-verkossa-investment-decision-v2");
  storage.removeItem("turvassa-verkossa-investment-decision-v1");
  storage.setItem(progressStorageKey, "[]");
}
