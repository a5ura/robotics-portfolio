# Test plan and execution

## Automated verification

- `npm test`: Node built-in runner; 22 cases covering valid/invalid email, missing/whitespace/non-string fields, length bounds, valid contact data, and theme resolution/toggling.
- `npm run validate`: JavaScript syntax, recommended HTML validation, unique IDs, local asset existence, and fragment targets.
- `npm run build`: explicit static file allowlist into `dist/`.
- `npm run test:browser`: 13 Playwright checks: page/sections/cards/portrait, navigation, required-field errors/focus, invalid email, honest successful form/no requests or stored message, persisted theme, axe dark, axe light, four mobile widths, keyboard skip link, reduced motion, disabled storage, and JavaScript errors.

For local Windows Chrome:

```powershell
npm run dev
# In another terminal:
$env:BROWSER_CHANNEL = 'chrome'
npm run test:browser
```

`TEST_URL` can select another origin, including the public site. In CI, Playwright Chromium is installed and `SITE_ROOT=dist` serves the actual output. Browser artifacts are uploaded even on failure. `test-results/` is ignored; the final local result is copied to `docs/verification/` as dated evidence.

## Executed on November 10, 2026

22 unit tests passed, 0 failed. HTML, JavaScript syntax, local assets/anchors, and static build passed. Local Chrome integration: 13 passed, 0 failed, including zero axe violations in each theme. Tested overflow widths: 320, 375, 390, 768px. Desktop and mobile screenshots were visually reviewed. The PDF is checked for exactly two pages and five stories, rendered, and visually reviewed.

Initial local browser attempts were blocked by Windows sandbox networking. The accessible preview ran on `127.0.0.1:4180` outside that sandbox; failed attempts are not counted as passing tests. The axe harness initially used an implicit browser context; it was corrected to use `browser.newContext()` before the passing run. A stale failed run overwrote temporary evidence and was stopped; the final evidence was regenerated. Initial HTML findings were corrected. The HTML validator was upgraded after npm audit findings; the updated dependency install reported zero vulnerabilities.

## Manual acceptance checklist

- [x] Visually inspect desktop and mobile screenshots for clipping and section order.
- [x] Check supplied profile, education, skills and professional links in source.
- [x] Confirm experience cards do not invent repositories, metrics, or confidential details.
- [x] Verify temporary image and form demonstration disclosures are visible.
- [ ] Student review on a physical phone and a second browser (Safari/Firefox not covered).
- [ ] Student screen-reader review; automated scans do not prove full WCAG conformance.
- [ ] Replace portrait and update alt/caption text before final submission.
- [ ] Recheck real inbox workflow using the direct email link in the student's mail application.

Public deployment verification and Actions results are recorded in the checkpoint summary; these are distinct from the local execution above.
