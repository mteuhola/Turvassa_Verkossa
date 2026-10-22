import assert from "node:assert/strict";
import test from "node:test";
import {
  entryNameProblem,
  createSannaLoginTask,
  sannaAccounts,
  isSannaPlanCorrect,
  sannaBestPractices,
  passwordProblem,
  canSignInAsSanna,
  generateSannaPassword,
  sannaOldPassword,
} from "../src/pages/PasswordCourse/sannaSimulation.ts";

test("Sanna plan requires exactly all good practices among the available options", () => {
  assert.ok(sannaBestPractices.length >= 10);
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
  assert.equal(
    canSignInAsSanna(saved, saved.club, "club", () => 4),
    true,
  );
  for (const candidate of ["", saved.email, saved.shop, saved.club.trim()]) {
    assert.equal(
      canSignInAsSanna(saved, candidate, "club", () => 4),
      false,
    );
  }
  assert.equal(
    canSignInAsSanna(
      { club: "club password" },
      "club password",
      "club",
      () => 4,
    ),
    false,
  );
  assert.equal(
    canSignInAsSanna(
      { ...saved, email: saved.club },
      saved.club,
      "club",
      () => 4,
    ),
    false,
  );
  assert.equal(
    canSignInAsSanna(
      { ...saved, email: sannaOldPassword },
      saved.club,
      "club",
      () => 4,
    ),
    false,
  );
  assert.equal(
    canSignInAsSanna({}, "", "club", () => 4),
    false,
  );
});

test("practice generator produces fresh 20-character passwords", () => {
  const passwords = Array.from({ length: 10 }, () => generateSannaPassword());
  assert.equal(new Set(passwords).size, passwords.length);
  for (const password of passwords)
    assert.match(password, /^[A-Za-z0-9!?]{20}$/);
});

test("each requested service accepts only its own password", () => {
  const saved = {
    email: "mail password",
    shop: "shop password",
    club: "club password",
  };
  for (const target of sannaAccounts) {
    for (const entry of sannaAccounts) {
      assert.equal(
        canSignInAsSanna(saved, saved[entry.id], target.id, () => 4),
        target.id === entry.id,
      );
    }
  }
});

test("login target and entry order are randomized independently without changing the source", () => {
  const original = sannaAccounts.map((item) => item.id);
  for (let targetIndex = 0; targetIndex < 3; targetIndex++) {
    const positions = new Set();
    const orders = new Set();
    for (const firstSwap of [0, 0.4, 0.9]) {
      for (const secondSwap of [0, 0.9]) {
        const values = [(targetIndex + 0.5) / 3, firstSwap, secondSwap];
        const task = createSannaLoginTask(() => values.shift());
        assert.equal(task.target.id, original[targetIndex]);
        assert.deepEqual(
          task.entries.map((item) => item.id).sort(),
          [...original].sort(),
        );
        positions.add(
          task.entries.findIndex((item) => item.id === task.target.id),
        );
        orders.add(task.entries.map((item) => item.id).join(","));
      }
    }
    assert.equal(positions.size, 3);
    assert.equal(orders.size, 6);
  }
  assert.deepEqual(
    sannaAccounts.map((item) => item.id),
    original,
  );
});

test("sign-in refuses any saved password below 4, even for a different account", () => {
  const saved = { email: "mail", shop: "shop", club: "club" };
  for (const weak of Object.values(saved)) {
    for (const score of [undefined, 0, 1, 2, 3]) {
      assert.equal(
        canSignInAsSanna(saved, saved.club, "club", (password) =>
          password === weak ? score : 4,
        ),
        false,
      );
    }
  }
});
