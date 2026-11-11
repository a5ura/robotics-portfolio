# Week 11 CI/CD Workflow Lab — Portfolio Website

**Student:** Gowtham Kanneganti  
**Institution:** Bay Atlantic University  
**Course:** CMPS 510 — Principles and Concepts of Software Engineering  
**Instructor:** Dr. Tsige Tessema  
**Project:** Personal Portfolio Page (Project 7) / Robotics Engineering Portfolio  
**Evidence reviewed:** November 10, 2026

## 1. Objective and application under test
This lab applies continuous integration and continuous delivery to the existing [robotics-portfolio repository](https://github.com/a5ura/robotics-portfolio), replacing the earlier illustrative equipment-maintenance example. The application is a static, single-page HTML/CSS/JavaScript portfolio with responsive layouts, light/dark theme preference, navigation, and a demonstration contact form. It has no production application server or database; the form does not send or store messages.

## 2. Existing CI/CD configuration
The repository already contains a working workflow at [`.github/workflows/pages.yml`](https://github.com/a5ura/robotics-portfolio/blob/main/.github/workflows/pages.yml), titled **Test and deploy portfolio**. It triggers on pushes to `main`, pull requests, and manual dispatch. Its test job uses `ubuntu-24.04` and Node.js 24; the deployment job runs only after tests succeed on main-branch non-PR events.

| Stage | Command or mechanism | Purpose |
| --- | --- | --- |
| Dependency setup | `npm ci` | Reproducible installation from lockfile |
| Unit tests | `npm test` | 22 tests for email, form and theme utilities |
| Static validation | `npm run validate` | JavaScript syntax, HTML, local assets, unique IDs and anchor targets |
| Build | `npm run build` | Copy static allowlisted files into `dist/` |
| Browser checks | `npm run test:browser` | 13 Playwright checks against built site |
| Deployment | `actions/deploy-pages@v4` | Publish `dist/` to GitHub Pages after test job succeeds |

The workflow uploads browser verification artifacts even on failure. Failed checks prevent publication. Pull requests are tested without deployment.

## 3. Actual hosted build and deployment evidence
- **Initial failure:** [Actions run 42868682798](https://github.com/a5ura/robotics-portfolio/actions/runs/42868682798). Dependency installation, unit tests, validation and build succeeded; Playwright Chromium installation failed because the selected Ubuntu 26.04 runner was unsupported by the pinned Playwright version. Browser checks and deployment were skipped.
- **Corrected run:** [Actions run 42868833952](https://github.com/a5ura/robotics-portfolio/actions/runs/42868833952). [Commit dd9099f](https://github.com/a5ura/robotics-portfolio/commit/dd9099f65e51080a7aa0dd39d5d904c0d3db08d2) pinned Ubuntu 24.04. Both test and deploy jobs succeeded; repository evidence records 22 passing unit tests and 13 passing built-site browser checks.
- **Later verified run:** [Actions run 42899331317](https://github.com/a5ura/robotics-portfolio/actions/runs/42899331317) succeeded in both jobs, including setup, unit tests, validation, build, browser checks and GitHub Pages deployment.

The [deployment evidence](https://github.com/a5ura/robotics-portfolio/blob/main/docs/verification/deployment-2026-11-10.json) separately reports HTTP 200 and 13 successful browser checks against the published site.

## 4. Broken-test demonstration and repair
To address the checklist's deliberate broken-test item, an **isolated local copy** of the repository's actual `utils.js` and `tests/utils.test.mjs` was run using Node.js 22. No changes were pushed to the repository.

1. **Baseline:** 22 passed, 0 failed, exit code 0.
2. **Intentional failure:** Changed the expected value of `toggleTheme("dark")` from `"light"` to `"dark"` in the test assertion. Result: 21 passed, 1 failed, exit code 1.
3. **Repair:** Restored the correct expected value. Result: 22 passed, 0 failed, exit code 0.

This is a local failing-test exercise. The actual GitHub-hosted failure described above was a runner compatibility issue, not a deliberately broken unit test.

## 5. Deployment and infrastructure assumptions
GitHub hosts source control, GitHub-hosted Actions runners perform automated checks, and GitHub Pages serves the static `dist/` output. The CI runner requires access to npm packages and a supported Chromium installation. There is no production application server, persistent user database or email delivery service. A passing pipeline does not establish complete cross-browser compatibility or accessibility.

## 6. Monitoring and feedback plan
See [MONITORING_PLAN.md](MONITORING_PLAN.md). Proposed signals include Actions job health, public-site availability (HTTP 200 and expected content), JavaScript runtime errors, navigation and form-demo flows, theme persistence, mobile layout, keyboard interaction, reduced-motion behavior and accessibility scans. Review failed checks before deployment, preserve artifacts, and use recurring smoke tests to detect regressions.

## 7. Reflection
This lab shows how automated validation and a test-gated deployment can protect even a small static website. The hosted failure demonstrated why infrastructure compatibility matters; pinning the runner produced a successful recovery. The isolated broken-test exercise demonstrated that an incorrect assertion produces a nonzero test exit code and that restoring the correct assertion returns the suite to passing. Monitoring and feedback complement CI/CD by detecting issues after release.

**AI assistance disclosure:** The portfolio was scoped and directed by the student with AI-assisted implementation and testing, as explained in [DEVELOPMENT_PROCESS.md](https://github.com/a5ura/robotics-portfolio/blob/main/docs/DEVELOPMENT_PROCESS.md).
