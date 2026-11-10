import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const url = process.env.TEST_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch(
  process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {},
);
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "light",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, status: "passed" });
    console.log(`PASS ${name}`);
  } catch (e) {
    results.push({ name, status: "failed", error: e.message });
    console.error(`FAIL ${name}: ${e.message}`);
  }
}
await mkdir("test-results", { recursive: true });
await mkdir("docs/screenshots", { recursive: true });
try {
  await check("Page loads with mandatory sections", async () => {
    const response = await page.goto(url);
    assert.equal(response.status(), 200);
    for (const id of ["home", "about", "work", "skills", "contact"])
      assert.equal(await page.locator(`#${id}`).count(), 1);
    assert.equal(await page.locator(".project-card").count(), 3);
    assert.equal(
      await page
        .locator(".profile img")
        .evaluate((el) => el.complete && el.naturalWidth > 0),
      true,
    );
  });
  await check("All main navigation links reach their sections", async () => {
    for (const id of ["about", "work", "skills", "contact"]) {
      await page.locator(`nav a[href="#${id}"]`).click();
      await page.waitForURL(`**/#${id}`);
      assert.equal(new URL(page.url()).hash, `#${id}`);
    }
  });
  await check(
    "Empty form gives accessible errors and focuses name",
    async () => {
      await page.getByRole("button", { name: "Submit demo" }).click();
      assert.match(
        await page.locator("#name-error").textContent(),
        /enter your name/,
      );
      assert.equal(await page.locator('[aria-invalid="true"]').count(), 3);
      assert.equal(
        await page
          .locator("#name")
          .evaluate((el) => el === document.activeElement),
        true,
      );
    },
  );
  await check("Invalid email is rejected", async () => {
    await page.locator("#name").fill("Demo Visitor");
    await page.locator("#email").fill("bad-email");
    await page.locator("#message").fill("Hello!");
    await page.getByRole("button", { name: "Submit demo" }).click();
    assert.match(
      await page.locator("#email-error").textContent(),
      /valid email/,
    );
  });
  await check(
    "Successful demo thanks visitor with no request or stored message",
    async () => {
      const requests = [];
      const listener = (req) => requests.push(req.url());
      page.on("request", listener);
      await page.locator("#email").fill("visitor@example.com");
      await page.getByRole("button", { name: "Submit demo" }).click();
      assert.match(
        await page.locator("#form-status").textContent(),
        /Thank you/,
      );
      assert.match(
        await page.locator("#form-status").textContent(),
        /not sent or stored/,
      );
      assert.equal(await page.locator("#message").inputValue(), "");
      assert.equal(
        await page
          .evaluate(() =>
            JSON.stringify({ ...localStorage, ...sessionStorage }),
          )
          .then((s) => s.includes("visitor@example.com")),
        false,
      );
      assert.deepEqual(requests, []);
      page.off("request", listener);
    },
  );
  await check("Theme switch persists after reload", async () => {
    await page.locator("#theme-toggle").click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    await page.screenshot({
      path: "test-results/desktop-dark.png",
      fullPage: true,
    });
  });
  await check(
    "Dark theme has no automated accessibility violations",
    async () => {
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      await writeFile(
        "test-results/axe-dark.json",
        JSON.stringify(result.violations, null, 2),
      );
      assert.deepEqual(
        result.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`,
        ),
        [],
      );
    },
  );
  await page.locator("#theme-toggle").click();
  await check(
    "Light theme has no automated accessibility violations",
    async () => {
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      await writeFile(
        "test-results/axe-light.json",
        JSON.stringify(result.violations, null, 2),
      );
      assert.deepEqual(
        result.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`,
        ),
        [],
      );
    },
  );
  await page.goto(url);
  await page.screenshot({
    path: "docs/screenshots/portfolio-desktop.png",
    fullPage: true,
  });
  await check("Mobile widths have no horizontal overflow", async () => {
    for (const width of [320, 375, 390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `Overflow at ${width}px`,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: "docs/screenshots/portfolio-mobile.png",
      fullPage: true,
    });
  });
  await check("Keyboard skip link works", async () => {
    await page.goto(url);
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator(".skip-link")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(new URL(page.url()).hash, "#main");
  });
  await check("Reduced motion disables smooth scrolling", async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator("html")
        .evaluate((el) => getComputedStyle(el).scrollBehavior),
      "auto",
    );
  });
  await check("Blocked localStorage does not break theme or form", async () => {
    const isolated = await browser.newContext({ colorScheme: "light" });
    const p = await isolated.newPage();
    const failures = [];
    p.on("pageerror", (e) => failures.push(e.message));
    await p.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new DOMException("Disabled", "SecurityError");
        },
      });
    });
    await p.goto(url);
    await p.locator("#theme-toggle").click();
    assert.equal(await p.locator("html").getAttribute("data-theme"), "dark");
    await p.locator("#name").fill("Visitor");
    await p.locator("#email").fill("visitor@example.com");
    await p.locator("#message").fill("Hello");
    await p.getByRole("button", { name: "Submit demo" }).click();
    assert.match(await p.locator("#form-status").textContent(), /Thank you/);
    assert.deepEqual(failures, []);
    await isolated.close();
  });
  await check("No JavaScript runtime errors", async () =>
    assert.deepEqual(errors, []),
  );
} finally {
  await writeFile(
    "test-results/browser-summary.json",
    JSON.stringify(
      {
        url,
        results,
        passed: results.filter((r) => r.status === "passed").length,
        failed: results.filter((r) => r.status === "failed").length,
      },
      null,
      2,
    ),
  );
  await browser.close();
}
if (results.some((r) => r.status === "failed")) process.exitCode = 1;
