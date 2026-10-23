import assert from "node:assert/strict";
import test from "node:test";
import { topicCourses } from "../src/pages/TopicSelection/topicCourses.ts";
import {
  applyProgress,
  completeTopic,
  parseProgress,
} from "../src/progress/courseProgress.ts";

test("every course begins with a theory introduction and has a following topic", () => {
  for (const course of topicCourses) {
    const introduction = course.topics[0];
    assert.equal(introduction.title, "Johdanto");
    assert.equal(introduction.kind, "theory");
    assert.equal(introduction.path, course.path + "/introduction");
    assert.ok(introduction.content.sections.length);
    assert.ok(
      introduction.content.sections.every(
        (section) => section.paragraphs.length,
      ),
    );
    assert.ok(course.topics[1]);
    assert.equal(course.topics.at(-1).kind, "quiz");
  }
});

test("old completion records keep badges but require the new introduction", () => {
  for (const course of topicCourses) {
    const oldPaths = course.topics.slice(1).map((topic) => topic.path);
    const restored = parseProgress(JSON.stringify(oldPaths));
    const partial = applyProgress(restored).find(
      (item) => item.id === course.id,
    );
    assert.equal(partial.isComplete, false);
    assert.equal(partial.topics[0].isComplete, false);
    assert.ok(partial.topics.slice(1).every((topic) => topic.isComplete));
    const completed = completeTopic(restored, course.topics[0].path);
    assert.equal(
      applyProgress(completed).find((item) => item.id === course.id).isComplete,
      true,
    );
    assert.deepEqual(parseProgress(JSON.stringify(completed)), completed);
    assert.strictEqual(
      completeTopic(completed, course.topics[0].path),
      completed,
    );
  }
});

test("help topics follow the requested activities and count toward completion", () => {
  const expected = [
    ["passwords", ["introduction", "password-strength", "help-sanna", "quiz"]],
    [
      "phishing",
      ["introduction", "suspicious-email", "theory", "help-kaarlo", "quiz"],
    ],
    [
      "financial-fraud",
      ["introduction", "investment-offers", "theory", "help-raija", "quiz"],
    ],
  ];
  for (const [id, order] of expected) {
    const course = topicCourses.find((item) => item.id === id);
    assert.deepEqual(
      course.topics.map((topic) => topic.id),
      order,
    );
    const help = course.topics.find((topic) => topic.id.startsWith("help-"));
    assert.equal(help.kind, "theory");
    assert.ok(help.content.characterName);
    const oldPaths = course.topics
      .filter((topic) => topic !== help)
      .map((topic) => topic.path);
    const before = applyProgress(oldPaths).find((item) => item.id === id);
    assert.equal(before.isComplete, false);
    const completed = completeTopic(oldPaths, help.path);
    assert.equal(
      applyProgress(completed).find((item) => item.id === id).isComplete,
      true,
    );
    assert.deepEqual(parseProgress(JSON.stringify(completed)), completed);
  }
});

test("password course merges reading and activities into four independently earned topics", () => {
  const course = topicCourses.find((item) => item.id === "passwords");
  assert.equal(course.topics.length, 4);
  assert.equal(course.topics[0].flow, "password-introduction");
  const introduction = course.topics[0].path;
  const practice = course.topics[1].path;
  const completed = completeTopic([], introduction);
  const progress = applyProgress(completed).find(
    (item) => item.id === "passwords",
  );
  assert.equal(progress.topics[0].isComplete, true);
  assert.equal(progress.topics[1].isComplete, false);
  assert.equal(progress.isComplete, false);
  assert.deepEqual(
    parseProgress(
      JSON.stringify([introduction, "/course/passwords/theory", practice]),
    ),
    [introduction, practice],
  );
  assert.deepEqual(
    parseProgress(JSON.stringify(["/course/passwords/theory"])),
    [],
  );
});
