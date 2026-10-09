import assert from "node:assert/strict";
import test from "node:test";
import {
  investmentOffers,
  clueIds,
  discoverClue,
  allCluesFound,
} from "../src/pages/FinancialFraud/investmentOffers.ts";
import {
  parseProgress,
  completeTopic,
  applyProgress,
} from "../src/progress/courseProgress.ts";
test("three offers require all distinct warning signs, not repeated or neutral selections", () => {
  assert.equal(investmentOffers.length, 3);
  assert.equal(new Set(clueIds).size, 9);
  let found = [];
  for (const offer of investmentOffers) {
    assert.equal(offer.parts.filter((p) => p.suspicious).length, 3);
    const neutral = offer.parts.find((p) => !p.suspicious);
    assert.strictEqual(discoverClue(found, offer.id + "/" + neutral.id), found);
    for (const part of offer.parts.filter((p) => p.suspicious)) {
      assert.equal(allCluesFound(found), false);
      const id = offer.id + "/" + part.id;
      found = discoverClue(found, id);
      assert.strictEqual(discoverClue(found, id), found);
      assert.ok(part.explanation);
    }
  }
  assert.equal(allCluesFound(found), true);
  assert.equal(allCluesFound(Array(9).fill(clueIds[0])), false);
  assert.strictEqual(discoverClue(found, "unknown"), found);
});
test("legacy financial course progress migrates and deduplicates without awarding new activity", () => {
  const saved = parseProgress(
    JSON.stringify([
      "/course/romance-fraud/introduction",
      "/course/financial-fraud/introduction",
      "/course/romance-fraud/theory",
      "/course/romance-fraud/help-raija",
      "/course/romance-fraud/quiz",
      "/course/romance-fraud/unknown",
    ]),
  );
  assert.equal(saved.length, 4);
  const course = applyProgress(saved).find((c) => c.id === "financial-fraud");
  assert.equal(course.isComplete, false);
  assert.deepEqual(
    course.topics.map((t) => t.id),
    ["introduction", "investment-offers", "theory", "help-raija", "quiz"],
  );
  assert.equal(course.topics[1].isComplete, false);
  assert.equal(
    applyProgress(completeTopic(saved, course.topics[1].path)).find(
      (c) => c.id === course.id,
    ).isComplete,
    true,
  );
});
