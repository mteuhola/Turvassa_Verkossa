import assert from "node:assert/strict";
import test from "node:test";
import {
  passwordExamples,
  allExamplesCorrect,
  isExampleCorrect,
} from "../src/pages/PasswordCourse/passwordExamples.ts";

test("grading requires the exact set, regardless of order", () => {
  assert.equal(isExampleCorrect([2, 0], [0, 2]), true);
  assert.equal(isExampleCorrect([0], [0, 2]), false);
  assert.equal(isExampleCorrect([0, 1, 2], [0, 2]), false);
  assert.equal(isExampleCorrect([0, 0], [0, 2]), false);
  assert.equal(isExampleCorrect([1], [1]), true);
});

test("no correct choices requires an explicitly checked empty answer", () => {
  assert.equal(isExampleCorrect(undefined, []), false);
  assert.equal(isExampleCorrect([], []), true);
  assert.equal(isExampleCorrect([0], []), false);
});

test("badge requires all questions, including the no-correct-choice question", () => {
  assert.equal(allExamplesCorrect({}), false);
  const answers = {};
  passwordExamples.forEach((example, index) => {
    assert.ok(
      example.correctAnswers.every((choice) => example.choices[choice]),
    );
    answers[index] = example.correctAnswers;
    assert.equal(
      allExamplesCorrect(answers),
      index === passwordExamples.length - 1,
    );
  });
  for (const [index, example] of passwordExamples.entries()) {
    for (let mask = 0; mask < 2 ** example.choices.length; mask++) {
      const selected = example.choices.flatMap((_, choice) =>
        mask & (1 << choice) ? [choice] : [],
      );
      assert.equal(
        allExamplesCorrect({ ...answers, [index]: selected }),
        JSON.stringify(selected) === JSON.stringify(example.correctAnswers),
      );
    }
    const missing = { ...answers };
    delete missing[index];
    assert.equal(allExamplesCorrect(missing), false);
  }
});
