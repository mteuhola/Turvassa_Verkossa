import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";

// Match Vite's raw-text imports when running these tests directly in Node.
registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith(".txt?raw")) {
      const text = readFileSync(new URL(url), "utf8");
      return {
        format: "module",
        source: `export default ${JSON.stringify(text)}`,
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});

const { assessPassword, MAX_PASSWORD_LENGTH } =
  await import("../src/pages/PasswordCourse/passwordStrength.ts");

test("Finnish passwords from the text file receive weak ratings", () => {
  const passwords = readFileSync(
    new URL("../common_finnish_passwords.txt", import.meta.url),
    "utf8",
  )
    .split(/\r?\n/)
    .map((word) => word.trim())
    .filter(Boolean);
  assert.ok(passwords.length > 0);
  for (const password of passwords) {
    assert.ok(
      assessPassword(password).score <= 2,
      `Expected weak rating for fixture: ${password}`,
    );
  }
});

test("empty and oversized input have no strength rating", () => {
  assert.equal(assessPassword(""), null);
  assert.equal(assessPassword("x".repeat(MAX_PASSWORD_LENGTH + 1)), null);
  assert.ok(assessPassword("x".repeat(MAX_PASSWORD_LENGTH)));
});

test("common passwords and predictable substitutions stay weak", () => {
  for (const password of [
    "password",
    "P@ssw0rd!",
    "salasana",
    "Salasana123!",
    "12345678",
    "qwerty",
  ]) {
    assert.ok(
      assessPassword(password).score <= 2,
      `Expected weak rating for fixture: ${password}`,
    );
  }
});

test("length alone does not make repetition strong", () => {
  const repeated = assessPassword("abc".repeat(16));
  assert.ok(repeated.score <= 2);
  assert.ok(repeated.tips.some((tip) => tip.includes("toistaminen")));
});

test("a multiword example scores higher than predictable examples", () => {
  const phrase = assessPassword("majakka sammal viulu pilvi");
  assert.ok(phrase.score >= 3);
  assert.ok(phrase.score > assessPassword("Salasana123!").score);
});

test("Unicode input and spaces are accepted without throwing", () => {
  for (const password of ["järvi yö tähti metsä", "🔒🌲 harjoitus", "     "]) {
    const result = assessPassword(password);
    assert.ok(result.score >= 0 && result.score <= 4);
    assert.ok(result.tips.length > 0);
  }
});

test("Sanna completion rechecks all saved passwords using the real estimator", async () => {
  const { canSignInAsSanna, passwordProblem } =
    await import("../src/pages/PasswordCourse/sannaSimulation.ts");
  const score = (password) => assessPassword(password)?.score;
  const saved = {
    email: "majakka sieni viulu pilvi",
    shop: "Q7!nR2?zL8!vT4?bP6!x",
    club: "J9?mC3!wK5?yH8!dF2?r",
  };
  assert.equal(canSignInAsSanna(saved, saved.club, "club", score), true);
  for (const weak of ["salasana", "Salasana123!", "x".repeat(129)]) {
    assert.equal(passwordProblem("email", weak, score(weak), saved), "weak");
    assert.equal(
      canSignInAsSanna({ ...saved, email: weak }, saved.club, "club", score),
      false,
    );
  }
});
