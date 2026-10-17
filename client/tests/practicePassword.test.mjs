import assert from "node:assert/strict";
import { test, beforeEach } from "node:test";
import {
  canSavePracticePassword,
  readPracticePassword,
  savePracticePassword,
  matchesPracticePassword,
  reconcilePasswordCompletion,
  practicePasswordStorageKey,
  passwordTopicPath,
} from "../src/progress/practicePassword.ts";
const values = new Map();
const storage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
};
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: storage,
});
beforeEach(() => {
  values.clear();
  storage.setItem = (key, value) => values.set(key, value);
});

test("save needs no example review, but requires typed input, a non-example, and exactly 4/4", () => {
  const ready = {
    hasTyped: true,
    isExample: false,
    score: 4,
  };
  assert.equal(canSavePracticePassword(ready), true);
  for (const change of [
    { hasTyped: false },
    { isExample: true },
    { score: 3 },
    { score: undefined },
  ]) {
    assert.equal(canSavePracticePassword({ ...ready, ...change }), false);
  }
});

test("saving stores a verifier and matches the exact password for the final question", async () => {
  const password = " järvi Viulu! pilvi 42 ";
  await savePracticePassword(password);
  assert.ok(readPracticePassword());
  assert.equal(
    values.get(practicePasswordStorageKey).includes(password),
    false,
  );
  assert.equal(await matchesPracticePassword(password), true);
  assert.equal(await matchesPracticePassword(password.trim()), false);
  assert.equal(await matchesPracticePassword(password.toLowerCase()), false);
});

test("saving a replacement changes the answer and uses a fresh salt", async () => {
  await savePracticePassword("first practice password");
  const first = readPracticePassword();
  await savePracticePassword("second practice password");
  assert.notEqual(first.salt, readPracticePassword().salt);
  assert.equal(await matchesPracticePassword("first practice password"), false);
  assert.equal(await matchesPracticePassword("second practice password"), true);
});

test("missing or corrupted saved data does not match", async () => {
  for (const value of [
    "bad JSON",
    "null",
    "{}",
    '{"version":1,"salt":"x","digest":"y"}',
  ]) {
    values.set(practicePasswordStorageKey, value);
    assert.equal(readPracticePassword(), null);
    assert.equal(await matchesPracticePassword("anything"), false);
  }
});

test("storage failure rejects saving and preserves the existing answer", async () => {
  await savePracticePassword("old practice password");
  storage.setItem = () => {
    throw new Error("Storage blocked");
  };
  await assert.rejects(savePracticePassword("new practice password"));
  assert.equal(await matchesPracticePassword("old practice password"), true);
});

test("old example-only completion is removed without affecting other topics", () => {
  const phishing = "/course/phishing/suspicious-email";
  assert.deepEqual(
    reconcilePasswordCompletion([passwordTopicPath, phishing], false),
    [phishing],
  );
  assert.deepEqual(reconcilePasswordCompletion([phishing], true), [
    phishing,
    passwordTopicPath,
  ]);
});
