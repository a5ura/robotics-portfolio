# CMPS 510 — Week 11 CI/CD Workflow Lab

**Student:** Gowtham Kanneganti  
**Institution:** Bay Atlantic University  
**Course:** CMPS 510 — Principles and Concepts of Software Engineering  
**Project:** Personal Portfolio Page (Project 7) / Robotics Engineering Portfolio  
**Evidence date:** November 10, 2026

This folder contains the revised Week 11 submission based on this repository's **actual** CI/CD pipeline, rather than the earlier illustrative equipment-maintenance project.

## Downloadable submission files
- [Lab report](LAB_REPORT.md) — complete text version of the revised PDF report, readable/downloadable from GitHub
- [Submission evidence summary](SUBMISSION_EVIDENCE.txt) — paste into the course's Submission Evidence field
- [Monitoring plan](MONITORING_PLAN.md) — deployment assumptions and proposed feedback signals
- [Execution evidence](EXECUTION_EVIDENCE.md) — documented GitHub runs and local broken-test demonstration

## Original implementation and supporting artifacts
- [CI workflow](../../../.github/workflows/pages.yml) (root-relative path: [workflow](https://github.com/a5ura/robotics-portfolio/blob/main/.github/workflows/pages.yml))
- [Unit tests](https://github.com/a5ura/robotics-portfolio/blob/main/tests/utils.test.mjs)
- [Test plan](https://github.com/a5ura/robotics-portfolio/blob/main/docs/TEST_PLAN.md)
- [Deployment notes](https://github.com/a5ura/robotics-portfolio/blob/main/docs/DEPLOYMENT.md)
- [Hosted Actions history](https://github.com/a5ura/robotics-portfolio/actions)

**Evidence qualification:** A deliberately incorrect unit-test assertion was exercised and repaired in an isolated local copy (22 passing → 21 passing/1 failing → 22 passing). The actual hosted CI failure was due to Playwright/Ubuntu incompatibility, not a deliberately broken test. No intentional failing test was committed to GitHub.

**Scope:** These are submission documents only. The website application and CI configuration have not been changed by adding this folder.
