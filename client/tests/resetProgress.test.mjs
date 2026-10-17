import assert from "node:assert/strict";
import test from "node:test";
import { resetStoredProgress } from "../src/progress/resetProgress.ts";
import {
  parseProgress,
  progressStorageKey,
} from "../src/progress/courseProgress.ts";
import {
  practicePasswordStorageKey,
  reconcilePasswordCompletion,
} from "../src/progress/practicePassword.ts";

test("reset clears completion and verifier without changing unrelated browser settings", () => {
  const values = new Map([
    [
      progressStorageKey,
      JSON.stringify([
        "/course/passwords/password-strength",
        "/course/phishing/quiz",
      ]),
    ],
    [
      practicePasswordStorageKey,
      JSON.stringify({
        managerPassword: "fictional practice password",
        salt: "salt",
        digest: "verifier",
      }),
    ],
    ["turvassa-verkossa-text-size", "150"],
    ["unrelated-key", "keep"],
  ]);
  const storage = {
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  };
  resetStoredProgress(storage);
  assert.equal(values.has(practicePasswordStorageKey), false);
  assert.deepEqual(
    reconcilePasswordCompletion(
      parseProgress(values.get(progressStorageKey)),
      values.has(practicePasswordStorageKey),
    ),
    [],
  );
  assert.equal(values.get("turvassa-verkossa-text-size"), "150");
  assert.equal(values.get("unrelated-key"), "keep");
  resetStoredProgress(storage);
  assert.equal(values.get(progressStorageKey), "[]");
});
test("reset reports storage failures instead of claiming persistent success", () => {
  assert.throws(
    () =>
      resetStoredProgress({
        removeItem() {
          throw Error("blocked");
        },
        setItem() {},
      }),
    /blocked/,
  );
});
