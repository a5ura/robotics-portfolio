import { resolveTheme, toggleTheme, validateContact } from "./utils.js";

const themeButton = document.querySelector("#theme-toggle");
const preference = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch {
  /* Storage may be disabled. */
}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.setAttribute(
    "aria-label",
    `Switch to ${isDark ? "light" : "dark"} theme`,
  );
  document.querySelector("#theme-label").textContent = isDark
    ? "Light mode"
    : "Dark mode";
}
applyTheme(resolveTheme(savedTheme, preference.matches));
themeButton.addEventListener("click", () => {
  savedTheme = toggleTheme(document.documentElement.dataset.theme);
  applyTheme(savedTheme);
  try {
    localStorage.setItem("portfolio-theme", savedTheme);
  } catch {
    /* Theme still works in memory. */
  }
});
preference.addEventListener("change", (event) => {
  if (!savedTheme) applyTheme(resolveTheme(null, event.matches));
});

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const fields = ["name", "email", "message"];
function showError(field, error = "") {
  document.querySelector(`#${field}-error`).textContent = error;
  form.elements[field].setAttribute("aria-invalid", String(Boolean(error)));
}
form.addEventListener("input", (event) => {
  status.textContent = "";
  if (
    fields.includes(event.target.name) &&
    event.target.getAttribute("aria-invalid") === "true"
  ) {
    const values = Object.fromEntries(new FormData(form));
    showError(event.target.name, validateContact(values)[event.target.name]);
  }
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "";
  const errors = validateContact(Object.fromEntries(new FormData(form)));
  fields.forEach((field) => showError(field, errors[field]));
  if (Object.keys(errors).length) {
    form.elements[Object.keys(errors)[0]].focus();
    return;
  }
  form.reset();
  status.textContent =
    "Thank you for trying the demo! Your message was not sent or stored. For a real conversation, please use the direct email link.";
  status.focus();
});
document.querySelector("#year").textContent = new Date().getFullYear();
