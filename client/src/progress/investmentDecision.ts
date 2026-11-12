import {
  investmentCaseId,
  offerParts,
  type Recommendation,
} from "../pages/FinancialFraud/investmentOffers";
export const investmentDecisionStorageKey =
  "turvassa-verkossa-investment-decision-v3";
/** Preserve the learner's own sorting with their final recommendation. */
interface InvestmentDecision {
  version: 3;
  caseId: typeof investmentCaseId;
  recommendation: Recommendation;
  placements: Record<string, boolean>;
}
export function readInvestmentDecision(): InvestmentDecision | null {
  try {
    const value = JSON.parse(
      localStorage.getItem(investmentDecisionStorageKey) ?? "null",
    );
    if (
      value?.version !== 3 ||
      value.caseId !== investmentCaseId ||
      !["invest", "wait"].includes(value.recommendation) ||
      !value.placements ||
      typeof value.placements !== "object" ||
      Array.isArray(value.placements) ||
      Object.keys(value.placements).length !== offerParts.length ||
      !offerParts.every(
        (part) => typeof value.placements[part.id] === "boolean",
      )
    )
      return null;
    return {
      version: 3,
      caseId: investmentCaseId,
      recommendation: value.recommendation,
      placements: value.placements,
    };
  } catch {
    return null;
  }
}
export function saveInvestmentDecision(decision: InvestmentDecision): boolean {
  try {
    localStorage.setItem(
      investmentDecisionStorageKey,
      JSON.stringify(decision),
    );
    return true;
  } catch {
    return false;
  }
}
