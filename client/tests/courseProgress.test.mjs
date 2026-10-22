import assert from "node:assert/strict";
import test from "node:test";
import {
  applyProgress,
  canEnterQuiz,
  unfinishedQuizPrerequisites,
  completeTopic,
  parseProgress,
} from "../src/progress/courseProgress.ts";
import { topicCourses } from "../src/pages/TopicSelection/topicCourses.ts";
const password = "/course/passwords/password-strength";
const phishing = "/course/phishing/suspicious-email";

test("every course quiz requires all its other topics, even with an old quiz badge", () => {
  for (const course of topicCourses) {
    const prerequisites = course.topics.filter(
      (topic) => topic.kind !== "quiz",
    );
    assert.equal(canEnterQuiz(course), false);
    const ready = {
      ...course,
      topics: course.topics.map((topic) => ({
        ...topic,
        isComplete: topic.kind !== "quiz",
      })),
    };
    assert.equal(canEnterQuiz(ready), true);
    assert.deepEqual(unfinishedQuizPrerequisites(ready), []);
    for (const missing of prerequisites) {
      const locked = {
        ...course,
        topics: course.topics.map((topic) => ({
          ...topic,
          isComplete: topic.path !== missing.path,
        })),
      };
      assert.equal(canEnterQuiz(locked), false);
      assert.deepEqual(
        unfinishedQuizPrerequisites(locked).map((topic) => topic.path),
        [missing.path],
      );
    }
  }
  assert.equal(canEnterQuiz({ ...topicCourses[0], topics: [] }), false);
});

test("fresh courses and topics are incomplete, including empty courses", () => {
  const courses = applyProgress([]);
  assert.ok(courses.every((course) => !course.isComplete));
  assert.ok(
    courses
      .flatMap((course) => course.topics)
      .every((topic) => !topic.isComplete),
  );
  assert.equal(
    applyProgress([], [{ ...topicCourses[0], topics: [] }])[0].isComplete,
    false,
  );
});

test("completion updates only the correct topic and course", () => {
  const courses = applyProgress(completeTopic([], password));
  assert.equal(
    courses[0].topics.find((topic) => topic.path === password).isComplete,
    true,
  );
  assert.equal(courses[0].isComplete, false); // The final quiz remains incomplete.
  assert.equal(courses[1].isComplete, false);
  assert.equal(courses[1].topics[0].isComplete, false);
  assert.equal(
    topicCourses[0].topics.find((topic) => topic.path === password).isComplete,
    false,
    "catalog must not be mutated",
  );
});

test("repeating a topic never duplicates or removes completion", () => {
  const completed = completeTopic(completeTopic([], password), phishing);
  assert.strictEqual(completeTopic(completed, password), completed);
  assert.strictEqual(completeTopic(completed, "/unknown"), completed);
  assert.equal(
    applyProgress(completed).filter((course) => course.isComplete).length,
    0,
  );
});

test("browser storage roundtrip restores earned badges", () => {
  const completed = completeTopic(completeTopic([], password), phishing);
  assert.deepEqual(
    applyProgress(parseProgress(JSON.stringify(completed))),
    applyProgress(completed),
  );
});

test("invalid storage and unknown topics do not award completion", () => {
  for (const stored of [
    null,
    "broken JSON",
    "null",
    "{}",
    "true",
    '[1, false, {"isComplete":true}]',
  ]) {
    assert.deepEqual(parseProgress(stored), []);
  }
  assert.deepEqual(
    parseProgress(JSON.stringify([password, password, "/unknown", false])),
    [password],
  );
});

test("a course with multiple topics needs all of them; new topics update its total", () => {
  const catalog = [
    {
      ...topicCourses[0],
      topics: [
        topicCourses[0].topics.find((topic) => topic.path === password),
        {
          ...topicCourses[1].topics.find((topic) => topic.path === phishing),
          path: "/course/passwords/second-topic",
        },
      ],
    },
  ];
  const partial = applyProgress([password], catalog)[0];
  assert.equal(partial.topics.filter((topic) => topic.isComplete).length, 1);
  assert.equal(partial.topics.length, 2);
  assert.equal(partial.isComplete, false);
  assert.equal(
    applyProgress([password, "/course/passwords/second-topic"], catalog)[0]
      .isComplete,
    true,
  );
});
