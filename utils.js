/** Practical email validation for this demonstration form, not an RFC mailbox parser. */
export function isValidEmail(value) {
  return (
    typeof value === "string" &&
    value.trim().length <= 254 &&
    /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value.trim())
  );
}
export function validateContact(values = {}) {
  const errors = {};
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const message =
    typeof values.message === "string" ? values.message.trim() : "";
  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Use 100 characters or fewer.";
  if (!email) errors.email = "Please enter your email.";
  else if (!isValidEmail(email))
    errors.email = "Enter a valid email, such as name@example.com.";
  if (!message) errors.message = "Please enter a message.";
  else if (message.length > 2000)
    errors.message = "Use 2,000 characters or fewer.";
  return errors;
}
export function resolveTheme(saved, prefersDark = false) {
  return saved === "light" || saved === "dark"
    ? saved
    : prefersDark
      ? "dark"
      : "light";
}
export function toggleTheme(current) {
  return current === "dark" ? "light" : "dark";
}
