# Week 11 execution evidence

## Actual GitHub-hosted workflow runs

| Run | Result | Details |
| --- | --- | --- |
| [42868682798](https://github.com/a5ura/robotics-portfolio/actions/runs/42868682798) | Failed | `npm ci`, `npm test`, validation and build passed; `npx playwright install --with-deps chromium` failed: `Playwright does not support chromium on ubuntu26.04-x64`. Browser verification and deployment skipped. |
| [42868833952](https://github.com/a5ura/robotics-portfolio/actions/runs/42868833952) | Success | Runner pinned to Ubuntu 24.04 in [commit dd9099f](https://github.com/a5ura/robotics-portfolio/commit/dd9099f65e51080a7aa0dd39d5d904c0d3db08d2). Test and deploy jobs passed. |
| [42899331317](https://github.com/a5ura/robotics-portfolio/actions/runs/42899331317) | Success | Latest inspected run: test and deploy jobs passed, including setup, unit tests, validation, build, Chromium installation and browser verification. |

Repository [verification record](https://github.com/a5ura/robotics-portfolio/blob/main/docs/verification/deployment-2026-11-10.json) reports 22 CI unit tests passed, 13 CI browser checks passed, HTTP 200 on the published site, and 13 deployed browser checks passed.

## Isolated broken-test demonstration

Executed in a separate copy of `utils.js` and `tests/utils.test.mjs` using Node.js 22. This demonstration **was not pushed to GitHub**.

| Stage | Test edit | Pass | Fail | Exit |
| --- | --- | ---: | ---: | ---: |
| Baseline | Original assertion | 22 | 0 | 0 |
| Deliberate failure | Expect `toggleTheme("dark")` to return `"dark"` (incorrect) | 21 | 1 | 1 |
| Correction | Restore expectation to `"light"` | 22 | 0 | 0 |

The hosted failed run was due to an incompatible runner, not a deliberately broken test. The local exercise verifies the test failure/fix cycle but does not independently demonstrate a GitHub-hosted failure caused by a broken assertion.

## Source files

- [Workflow configuration](https://github.com/a5ura/robotics-portfolio/blob/main/.github/workflows/pages.yml)
- [Test suite](https://github.com/a5ura/robotics-portfolio/blob/main/tests/utils.test.mjs)
- [Application utilities](https://github.com/a5ura/robotics-portfolio/blob/main/utils.js)
- [Test plan](https://github.com/a5ura/robotics-portfolio/blob/main/docs/TEST_PLAN.md)
