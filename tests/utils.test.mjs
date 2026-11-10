import test from "node:test";
import assert from "node:assert/strict";
import {
  isValidEmail,
  validateContact,
  resolveTheme,
  toggleTheme,
} from "../utils.js";

for (const email of [
  "name@example.com",
  "user+robotics@sub.example.org",
  "  user@example.com  ",
]) {
  test(`accepts valid email: ${email.trim()}`, () =>
    assert.equal(isValidEmail(email), true));
}
for (const email of [
  "",
  "person",
  "@example.com",
  "a@",
  "a@@example.com",
  "a b@example.com",
  "a@localhost",
  "a@example..com",
  "a@.com",
  null,
]) {
  test(`rejects invalid email: ${email}`, () =>
    assert.equal(isValidEmail(email), false));
}
test("all required fields are checked", () =>
  assert.deepEqual(Object.keys(validateContact()), [
    "name",
    "email",
    "message",
  ]));
test("whitespace does not satisfy required fields", () =>
  assert.equal(
    Object.keys(validateContact({ name: "  ", email: " ", message: "\n" }))
      .length,
    3,
  ));
test("valid contact input returns no errors", () =>
  assert.deepEqual(
    validateContact({
      name: "Gowtham",
      email: "g@example.com",
      message: "Hello robotics.",
    }),
    {},
  ));
test("invalid contact email returns field feedback", () =>
  assert.ok(
    validateContact({ name: "A", email: "broken", message: "Hello" }).email,
  ));
test("field lengths are bounded", () => {
  const errors = validateContact({
    name: "x".repeat(101),
    email: `${"x".repeat(250)}@example.com`,
    message: "x".repeat(2001),
  });
  assert.deepEqual(Object.keys(errors), ["name", "email", "message"]);
});
test("non-string fields are rejected safely", () =>
  assert.equal(
    Object.keys(validateContact({ name: 7, email: [], message: {} })).length,
    3,
  ));
test("explicit theme overrides system preference", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
});
test("missing or invalid theme follows system preference", () => {
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme("invalid", false), "light");
  assert.equal(resolveTheme(), "light");
});
test("theme toggles both directions", () => {
  assert.equal(toggleTheme("dark"), "light");
  assert.equal(toggleTheme("light"), "dark");
});
