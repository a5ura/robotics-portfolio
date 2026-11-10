# Development Process and Individual Contributions

**Student:** Gowtham Kanneganti  
**Course:** CMPS 510 — Principles and Concepts of Software Engineering, Bay Atlantic University  
**Project:** Personal Portfolio Page (Project 7)  
**Review date:** November 10, 2026

## 1. Project purpose and my role

I selected the Personal Portfolio Page project on November 6, 2026. I wanted to meet the course requirement for a small, working website while building a useful starting point for my professional robotics engineering portfolio.

My primary contribution was determining **what to build, why it should work that way, and how to evaluate the result**. I chose the audience, supplied the professional information, defined the feature set and technical constraints, requested testing and deployment, reviewed portions of the implementation, and personally opened and tested the published website.

The initial source code, automated test scripts, and deployment setup were generated and executed with development-tool assistance. This document is a retrospective explanation of my decisions and the resulting engineering work; it is not a claim that I typed every line of code or personally ran every automated test.

## 2. Planning and requirements I provided

| Area | My input and decision | Result in the application |
| --- | --- | --- |
| Project selection | Selected the professor's Personal Portfolio Page option and kept the scope within the project charter. | A single-page static website with no accounts, database, or production backend. |
| Audience and purpose | Chose robotics recruiters, engineering collaborators, and the course instructor as intended visitors. | Professional introduction, project/experience highlights, skills, and contact details. |
| Personal content | Supplied my name, engineering focus, education, technical skills, and links to GitHub, LinkedIn, and email. | The About, education, technical toolkit, and contact sections. |
| Featured work | Chose MaintainAI, robotic server-disassembly experience, and computer-vision/inspection experience. | Three cards that distinguish a public software project from professional engineering experience. |
| Technology | Preferred plain HTML, CSS, and JavaScript over a larger frontend framework. | A small, understandable static implementation that GitHub Pages can host. |
| Interface | Requested a professional engineering aesthetic, responsive layout, and light/dark themes. | Desktop/mobile layouts and a theme preference stored in the browser. |
| Contact behavior | Specified name, email, and message fields, validation, and a thank-you message. | A demonstration form that does **not** send or store messages, plus a real email link. |
| Software engineering | Asked for user stories, acceptance criteria, a layout sketch, tests, documentation, version control, and CI/CD. | Supporting documents, test suites, and a GitHub Actions workflow. |

I used the professor's rubric as the acceptance baseline. The [requirements document](REQUIREMENTS.md) provides numbered functional and nonfunctional requirements, while the [short report](CMPS510_Portfolio_Short_Report.pdf) contains the five course user stories and a matching [wireframe](layout-wireframe.png).

### Scope decisions and trade-offs

- **Static site rather than a backend application:** The assignment does not require accounts or a server, so a static implementation keeps the solution focused and easier to deploy.
- **Demonstration form rather than message delivery:** A clear confirmation meets the course requirement without implying that a visitor's message reached an inbox.
- **Theme persistence only:** `localStorage` remembers the selected theme, not personal messages.
- **Software project versus engineering experience:** MaintainAI links to its real repository; the other two cards summarize professional experience without inventing public code or disclosing proprietary details.
- **Real photograph still required:** The temporary portrait is visibly identified as a placeholder and remains an outstanding final-submission item.

## 3. Implementation structure and code review

The implemented site follows a straightforward division of responsibilities:

| File | Responsibility | What to examine |
| --- | --- | --- |
| [`index.html`](../index.html) | Content, sections, navigation, and contact-form markup. | Section IDs, link destinations, labels, and accessibility attributes. |
| [`styles.css`](../styles.css) | Layout, responsive breakpoints, color themes, and visual states. | CSS variables, mobile rules, visible focus, and reduced-motion styling. |
| [`utils.js`](../utils.js) | Reusable email/form validation and theme functions. | Inputs, outputs, boundary checks, and functions without DOM dependencies. |
| [`script.js`](../script.js) | DOM event listeners, theme switching, field feedback, and submission confirmation. | How it calls `utils.js`, updates the page, and handles unavailable storage. |
| [`tests/utils.test.mjs`](../tests/utils.test.mjs) | Node.js unit tests for pure functions. | Accepted, rejected, and boundary cases. |
| [`tools/browser-tests.mjs`](../tools/browser-tests.mjs) | End-to-end browser checks with Playwright and axe-core. | User interactions, page assertions, and mobile/accessibility checks. |

I reviewed portions of the source code rather than performing a line-by-line audit. A useful architectural choice is the separation of validation logic in `utils.js` from the event-handling code in `script.js`: it permits unit testing without requiring a browser. The [architecture notes](ARCHITECTURE.md) describe the resulting design in more detail.

## 4. Test coverage: what each test checks

I required the project to include meaningful automated verification, not merely a website that renders once. The tables below explain the actual checks present in the repository. **They describe existing AI-assisted test scripts and their purpose; they do not imply I manually authored or individually executed all of them.**

### Unit tests — 22 cases

These tests use the Node.js test runner and target pure functions in `utils.js`. They can be run with `npm test`.

| Cases | Test inputs / situation | Expected outcome |
| --- | --- | --- |
| U01–U03 | Ordinary email, plus-addressed subdomain email, email with surrounding whitespace. | The email validator accepts all three. |
| U04–U13 | Empty value, missing `@`, missing username/domain, double `@`, internal whitespace, localhost-only address, repeated dot, invalid domain start, and `null`. | The email validator rejects each invalid input. |
| U14 | Form submitted with all required fields missing. | Name, email, and message errors are returned. |
| U15 | Required fields contain whitespace only. | Whitespace does not count as valid input. |
| U16 | Form contains valid name, email, and message. | No validation errors are returned. |
| U17 | Form contains a malformed email. | An email-specific error is returned. |
| U18 | Name, email, and message exceed the supported lengths. | All three length/boundary problems are rejected. |
| U19 | Form fields contain unexpected non-string values. | Inputs are safely rejected without crashing validation. |
| U20 | A stored explicit light/dark preference conflicts with system preference. | Stored preference takes priority. |
| U21 | The stored theme is missing or invalid. | The current system preference determines the theme. |
| U22 | Theme is toggled from light to dark and dark to light. | Both transitions return the expected value. |

The email check is intentionally a practical form validator, not a full RFC email-address parser. The field-length and non-string checks help cover boundary/error conditions as well as the normal success path.

### Browser/integration tests — 13 checks

These tests use Playwright to exercise the application as a visitor would and are defined in [`tools/browser-tests.mjs`](../tools/browser-tests.mjs).

| Case | Interaction or condition | Expected result |
| --- | --- | --- |
| I01 | Load the page and inspect mandatory sections. | Successful response; Home, About, Work, Skills, Contact, three cards, and portrait image exist. |
| I02 | Click each main navigation link. | URL anchors reach the matching sections. |
| I03 | Submit an empty form. | Required-field errors appear, invalid attributes are set, and focus moves to the name field. |
| I04 | Enter an invalid email. | Email-specific feedback appears. |
| I05 | Submit valid demonstration values. | Thank-you text appears; fields reset; no message is sent or stored. |
| I06 | Toggle the theme and reload. | Dark theme remains selected after reload. |
| I07 | Scan dark theme with axe-core. | No violations are reported for the configured rules. |
| I08 | Scan light theme with axe-core. | No violations are reported for the configured rules. |
| I09 | Test viewport widths 320, 375, 390, and 768 pixels. | No horizontal overflow at those widths. |
| I10 | Navigate using the keyboard skip link. | The link sends focus/navigation to the main-content anchor. |
| I11 | Enable reduced-motion preference. | Smooth scrolling is disabled. |
| I12 | Simulate blocked browser storage. | Theme and contact-form interactions still work. |
| I13 | Monitor page JavaScript errors. | No uncaught runtime errors are recorded. |

The stored [test plan](TEST_PLAN.md) reports **22 unit tests passed and 13 local Chrome checks passed**, with no failures in the final November 10 runs. It also reports 13 successful browser checks against the deployed site. Supporting records are in [`docs/verification/`](verification/). These are recorded automated results, not a substitute for personal usability review.

### My manual website testing and review

I personally opened and tested the deployed [portfolio](https://a5ura.github.io/robotics-portfolio/). I also inspected parts of the source code and reviewed the README, then requested improvements to make the documentation more representative of my project decisions and contributions. I confirmed that my local `main` branch was up to date with `origin/main` and that the working tree was clean.

I have not maintained a separate step-by-step personal test log, so I am not marking every automated assertion above as a test I performed manually. To strengthen the evidence before final submission, I can record a dated hands-on checklist for navigation, form validation, successful form confirmation, theme persistence, links, and mobile display, noting the browser/device and observed result of each check.

## 5. Version control, CI/CD, and deployment

I specified GitHub-based version control, automated checks, and free public hosting as part of the desired engineering workflow. The implementation uses the [GitHub Actions workflow](../.github/workflows/pages.yml) to:

1. Retrieve the repository and set up Node.js.
2. Install development dependencies.
3. Run unit tests and static validation.
4. Build the static site.
5. Install Playwright Chromium and test the built output.
6. Publish the build to GitHub Pages after successful checks on `main`.

Codex configured this workflow and performed authorized repository/deployment operations in the local development session; GitHub Actions executed the hosted jobs. I reviewed the resulting evidence and tested the public site. The recorded workflow also shows an initial browser-installation problem with the runner environment that was resolved by using Ubuntu 24.04.

**Evidence:** [Repository commits](https://github.com/a5ura/robotics-portfolio/commits/main/), [Actions history](https://github.com/a5ura/robotics-portfolio/actions), [checkpoint summary](CHECKPOINT_SUMMARY.md), and [deployment notes](DEPLOYMENT.md).

## 6. Reflection and next steps

The main engineering lesson from this project is that a small application can still follow a disciplined process: define requirements and boundaries, map them to visible functionality, separate logic for testability, test normal and error cases, and verify the deployed output instead of relying on a successful build alone.

I also see the distinction between **directing a software project**, **reviewing generated code**, and **personally authoring that code**. My hands-on contributions to date include the decisions, specifications, professional content, deployed-site testing, partial code review, and requested revisions described above. Future manual coding or test execution can be added to this record when completed and documented.

Remaining work includes replacing the portrait placeholder, recording a more specific personal manual-test checklist, reviewing on a physical phone and a second browser, and extending the engineering case studies with non-confidential evidence.

### Related learning resources

These videos address concepts used in the portfolio. They are related references, **not a claim that I followed each tutorial during development**.

- [Responsive CSS Grid Layout — Kevin Powell](https://www.youtube.com/watch?v=sKFW3wek21Q)
- [JavaScript Form Validation — Web Dev Simplified](https://www.youtube.com/watch?v=In0nB0ABaUk)
- [Dark/Light Theme Toggle with localStorage — codeSTACKr](https://www.youtube.com/watch?v=_raOFZAYXD4)

## 7. Development tools and disclosure

This is an individual project that I scoped and directed. The implementation uses HTML, CSS, JavaScript, Node.js, Playwright, Git, GitHub Actions, and GitHub Pages. I used **ChatGPT** to help organize the project specification and **OpenAI Codex Desktop** to assist with source-code generation, test automation, documentation, and deployment operations.

I supplied the direction and project content, reviewed selected code and documentation, and personally tested the published interface. I have not represented the generated application code or automated test scripts as wholly handwritten work. The [README](../README.md#development-approach-and-ai-assistance) contains the shorter disclosure required by the course charter.
