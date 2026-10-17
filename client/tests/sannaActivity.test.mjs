import assert from "node:assert/strict";
import test from "node:test";
import {
  entryNameProblem,
  isSannaPlanCorrect,
  sannaBestPractices,
  passwordProblem,
  canSignInAsSanna,
  generateSannaPassword,
  sannaOldPassword,
} from "../src/pages/PasswordCourse/sannaSimulation.ts";

test("Sanna plan requires exactly all good practices among ten options", () => {
  assert.equal(sannaBestPractices.length, 10);
  const correct = sannaBestPractices
    .filter((item) => item.correct)
    .map((item) => item.id);
  assert.equal(isSannaPlanCorrect(correct), true);
  assert.equal(isSannaPlanCorrect([...correct].reverse()), true);
  assert.equal(isSannaPlanCorrect([]), false);
  assert.equal(
    isSannaPlanCorrect(sannaBestPractices.map((item) => item.id)),
    false,
  );
  for (const id of correct)
    assert.equal(
      isSannaPlanCorrect(correct.filter((item) => item !== id)),
      false,
    );
  for (const item of sannaBestPractices.filter((item) => !item.correct))
    assert.equal(isSannaPlanCorrect([...correct, item.id]), false);
  assert.equal(isSannaPlanCorrect([...correct, correct[0]]), false);
});

test("manager names must be nonempty and distinct but allow freely chosen labels and editing", () => {
  assert.equal(entryNameProblem("email", "   ", {}), "empty");
  assert.equal(entryNameProblem("email", "x".repeat(61), {}), "empty");
  assert.equal(
    entryNameProblem("shop", " MY MAIL ", { email: "My mail" }),
    "duplicate",
  );
  assert.equal(
    entryNameProblem("email", "My mail", { email: "My mail" }),
    null,
  );
  assert.equal(
    entryNameProblem("club", "Sanna's weekly hobby", { email: "My mail" }),
    null,
  );
});

test("Sanna needs strong distinct replacements, but can edit an account's own password", () => {
  assert.equal(passwordProblem("email", sannaOldPassword, 4, {}), "weak");
  for (const score of [undefined, 0, 1, 2, 3]) {
    assert.equal(passwordProblem("email", "new password", score, {}), "weak");
  }
  assert.equal(
    passwordProblem("shop", "same password", 4, { email: "same password" }),
    "reused",
  );
  assert.equal(
    passwordProblem("email", "same password", 4, { email: "same password" }),
    null,
  );
  assert.equal(
    passwordProblem("club", "different password", 4, {
      email: "one",
      shop: "two",
    }),
    null,
  );
});

test("completion requires three changed accounts and the exact hobby club password", () => {
  const saved = {
    email: "email password",
    shop: "shop password",
    club: " club password ",
  };
  assert.equal(canSignInAsSanna(saved, saved.club), true);
  for (const candidate of ["", saved.email, saved.shop, saved.club.trim()]) {
    assert.equal(canSignInAsSanna(saved, candidate), false);
  }
  assert.equal(
    canSignInAsSanna({ club: "club password" }, "club password"),
    false,
  );
  assert.equal(
    canSignInAsSanna({ ...saved, email: saved.club }, saved.club),
    false,
  );
  assert.equal(
    canSignInAsSanna({ ...saved, email: sannaOldPassword }, saved.club),
    false,
  );
  assert.equal(canSignInAsSanna({}, ""), false);
});

test("practice generator produces fresh 20-character passwords", () => {
  const passwords = Array.from({ length: 10 }, () => generateSannaPassword());
  assert.equal(new Set(passwords).size, passwords.length);
  for (const password of passwords)
    assert.match(password, /^[A-Za-z0-9!?]{20}$/);
});
