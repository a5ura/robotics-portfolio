# Development Process and Individual Contributions

**Student:** Gowtham Kanneganti

**Course:** CMPS 510 - Principles and Concepts of Software Engineering, Bay Atlantic University

**Project:** Personal Portfolio Page (Project 7)

**Documented:** November 10, 2026

This document distinguishes my project direction and personal review from implementation and operations performed with AI assistance. Personal activities below are based on my confirmed account supplied through the Codex session. Repository files, recorded results, and GitHub history support the technical work; they do not independently establish who typed a command or performed a manual browser check.

## A. Project Overview

I selected the Personal Portfolio Page project for my individual CMPS 510 assignment. The selection date of November 6 is recorded in the [Week 10-11 status update](WEEK_10_11_STATUS_UPDATE.md). The project serves two purposes: satisfying the academic requirements for a small working application and presenting my robotics and AI engineering background to recruiters and engineering collaborators.

I defined the professional focus around robotics deployment, systems integration, industrial automation, computer vision, and applied AI. The resulting [portfolio](https://a5ura.github.io/robotics-portfolio/) presents my supplied background, education, skills, one software project, and two areas of engineering experience. The [short academic report](CMPS510_Portfolio_Short_Report.pdf) records five user stories, acceptance criteria, and a layout diagram.

## B. Individual Contributions

### Project decisions and ownership

I selected the project, established its academic and professional goals, and identified the target audience. I chose HTML, CSS, and JavaScript as the preferred stack and selected the light/dark theme direction. I defined the expected contact-form behavior and requested automated testing, GitHub Actions, and GitHub Pages deployment.

These were project and requirements decisions. I did not manually write or modify the application source code, implement the tests, or configure the workflow by hand.

### Requirements definition

I supplied the professor's assignment requirements and grading rubric, along with my technical expectations. I worked with ChatGPT to organize this information into a detailed development prompt, then supplied that prompt to Codex Desktop and directed implementation through my local Windows workspace. The specification was organized with ChatGPT assistance; I do not claim to have independently authored every sentence.

### Professional content preparation

I provided my professional background, education, technical skills, featured projects, and engineering focus. I decided that the site should present a professional robotics portfolio while meeting the course requirements. The project distinguishes MaintainAI, a public software project, from the server-disassembly and vision/inspection experience summaries. The [architecture notes](ARCHITECTURE.md#content-provenance) describe content provenance and the use of conceptual illustrations.

### Personal manual review and verification

I opened the publicly deployed website and tested it through its user interface. I reviewed portions of the source code to understand the implementation, reviewed the GitHub README, identified where the documentation should better communicate my ownership, and requested and reviewed README improvements. I also confirmed that the local Git branch was synchronized with the remote repository and that the working tree was clean.

This is a record of the personal review I confirmed. It does not assert a specific browser, device, checklist, or exhaustive code review. Automated test execution and Git operations performed by Codex are distinct from my personal review; I did not manually execute every Git command.

## C. Requirements and Design Decisions

| Decision                   | My direction                                                                                     | Implemented approach and rationale                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Technology stack           | I chose HTML, CSS, and JavaScript as the preferred technologies.                                 | A static page keeps the assignment understandable and deployable on GitHub Pages without an application backend.                        |
| Sections and content       | I supplied the profile information, education, skills, featured work, and academic requirements. | Hero, About, work/experience cards, categorized skills, Contact, and footer give visitors a clear route from background to contact.     |
| Demonstration contact form | I defined required name, email, and message fields, validation, and a thank-you confirmation.    | The form explicitly sends and stores no messages; a direct email link supports real inquiries.                                          |
| Light/dark theme           | I selected a design direction with both appearances and a saved preference.                      | CSS theme tokens and JavaScript handle switching; localStorage stores only the theme choice.                                            |
| Responsive design          | I requested a mobile-friendly, readable portfolio.                                               | CSS adapts the layout while retaining the section order and visible navigation. Codex implemented the detailed styling and breakpoints. |
| Automated verification     | I requested unit and available browser tests.                                                    | Node tests cover form/theme utilities; Playwright and axe check browser behavior and selected accessibility rules.                      |
| CI/CD and hosting          | I requested GitHub Actions and GitHub Pages.                                                     | Codex configured test/build/browser checks before static deployment. I reviewed available results and accessed the deployed site.       |

The [requirements](REQUIREMENTS.md) define functional/nonfunctional requirements and acceptance criteria. The [architecture](ARCHITECTURE.md) explains the separation of HTML structure, CSS presentation, pure JavaScript utilities, and DOM interactions. This description reflects the implementation; it does not claim that I personally authored each implementation detail.

## D. AI-Assisted Development Workflow

1. I reviewed the academic project requirements.
2. I selected and defined the portfolio project and its professional audience.
3. I supplied professional information and technical requirements.
4. I used ChatGPT to help structure a detailed development prompt.
5. I provided the prompt to Codex Desktop in the local development session.
6. Codex generated the application and supporting files locally in `C:\Users\gowth\Documents\robotics-portfolio` under my direction.
7. Codex implemented and executed automated tests and performed authorized GitHub integration, CI/CD configuration, and deployment operations. GitHub hosted version control, CI/CD, and the public static site; source development took place locally.
8. I opened and tested the deployed website through its user interface.
9. I reviewed portions of the code and the project documentation, including available verification results.
10. I requested subsequent improvements to the README and development-process documentation to describe the contributions accurately. Codex prepared those documentation changes.

The original development prompt was provided through the Codex session and is not included as a tracked repository artifact. This document describes the workflow; it does not reconstruct or present a replacement as the original prompt.

## E. Tools and Technologies

| Tool or technology   | Purpose in this project                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML                 | Semantic page content, sections, navigation, links, and form fields.                                                                           |
| CSS                  | Typography, responsive layouts, light/dark appearance, focus styling, and reduced-motion support.                                              |
| JavaScript           | Contact-form validation/confirmation, theme switching, and browser interaction logic.                                                          |
| Git and GitHub       | Local change history, remote source control, reviewable commits, and access to workflow records.                                               |
| Node.js              | Local development server, built-in unit test runner, validation tooling, and static build tools; not a production application server.          |
| Playwright           | Automated browser interaction and layout checks; used with axe-core for selected accessibility checks.                                         |
| GitHub Actions       | Automated unit/static/build/browser verification and deployment jobs.                                                                          |
| GitHub Pages         | Public hosting for the static portfolio.                                                                                                       |
| ChatGPT              | Help organizing the supplied requirements into a structured development prompt.                                                                |
| OpenAI Codex Desktop | AI-assisted generation of source code, tests, documentation, academic deliverables, and authorized local/GitHub operations under my direction. |

## F. Testing and Verification

### Automated verification

Codex implemented and executed the automated checks through the authorized development environment. The November 10 [test plan](TEST_PLAN.md) and [checkpoint summary](CHECKPOINT_SUMMARY.md) record **22 unit tests passed, 0 failed**, **13 local Chrome checks passed, 0 failed**, and **13 deployed-site Chrome checks passed, 0 failed**. These are historical execution results, not a claim that I personally ran each test or that this documentation edit introduced another local application test run.

The [unit test file](../tests/utils.test.mjs) exercises email/form validation and theme utilities. The [browser suite](../tools/browser-tests.mjs) checks page content, navigation, form behavior, theme persistence, accessibility scans, mobile overflow, keyboard access, reduced motion, disabled storage, and runtime errors. Stored [local browser results](verification/local-chrome-2026-11-10.json), [deployed browser results](verification/deployed-chrome-2026-11-10.json), and [deployment evidence](verification/deployment-2026-11-10.json) support the recorded counts.

### CI/CD verification

Codex configured the [GitHub Actions workflow](../.github/workflows/pages.yml). [Run 42868833952](https://github.com/a5ura/robotics-portfolio/actions/runs/42868833952), for application commit `dd9099f65e51080a7aa0dd39d5d904c0d3db08d2`, completed successfully with test and deployment jobs. The recorded CI results include 22 passing unit tests, static validation/build, and 13 passing Chromium checks against the built output. The checkpoint documents the earlier unsupported-runner failure and its fix; skipped checks from that failed run are not counted as passes.

The [Actions history](https://github.com/a5ura/robotics-portfolio/actions) provides subsequent workflow results. These records show automated execution, not manual configuration or test execution by me.

### Personal verification

I specified the testing and deployment requirements, reviewed the available results, opened the public portfolio, tested its user interface, and reviewed portions of its source and documentation. This confirmation does not establish that I manually repeated every automated assertion. There is no separate personal manual-test log in the repository, and no additional manual browser/device checks are claimed here.

The stored [desktop screenshot](screenshots/portfolio-desktop.png) and [mobile screenshot](screenshots/portfolio-mobile.png) were produced through Codex's browser verification; they are supporting application artifacts, not evidence that I personally tested those devices or viewport sizes. Physical-phone, second-browser, screen-reader, and real email-client checks remain listed in the existing test plan. Automated scans do not establish complete accessibility or universal browser compatibility.

## G. Individual Contribution and Evidence Table

| Activity                             | My involvement                                                                                                            | AI assistance                                                                                                       | Supporting evidence                                                                                                                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project selection and goals          | I selected Project 7 and defined the academic/professional purpose and audience.                                          | ChatGPT helped organize the development instructions; Codex prepared documentation.                                 | Student-confirmed account; [status update](WEEK_10_11_STATUS_UPDATE.md); [requirements](REQUIREMENTS.md).                                                                                                                           |
| Requirements and design direction    | I supplied the rubric and requirements, preferred stack, theme direction, and form/testing/deployment expectations.       | ChatGPT structured the prompt; Codex translated it into files and implementation details.                           | Student-confirmed account; [requirements](REQUIREMENTS.md); [architecture](ARCHITECTURE.md). The prompt was supplied through the session, not archived in Git.                                                                      |
| Professional content                 | I provided background, education, skills, and featured work.                                                              | Codex incorporated and worded the supplied content and checked the MaintainAI description against its repository.   | [Content provenance](ARCHITECTURE.md#content-provenance); [portfolio source](../index.html).                                                                                                                                        |
| Source-code implementation           | I directed the work and later reviewed portions of the code; I did not manually write or modify the application source.   | Codex wrote the HTML, CSS, JavaScript, responsive themes, and form behavior.                                        | [Initial implementation commit](https://github.com/a5ura/robotics-portfolio/commit/411efa3); [source and history](https://github.com/a5ura/robotics-portfolio/commits/main/). Commit authorship alone does not prove manual coding. |
| Automated tests                      | I requested testing and reviewed available results.                                                                       | Codex generated and executed unit and integration checks.                                                           | [Unit tests](../tests/utils.test.mjs); [browser suite](../tools/browser-tests.mjs); [test plan](TEST_PLAN.md); [stored results](verification/local-chrome-2026-11-10.json).                                                         |
| CI/CD and deployment                 | I requested Actions/Pages and personally accessed and tested the resulting public site.                                   | Codex configured the workflow and performed authorized GitHub/deployment operations; Actions executed the pipeline. | [Workflow](../.github/workflows/pages.yml); [successful run](https://github.com/a5ura/robotics-portfolio/actions/runs/42868833952); [checkpoint](CHECKPOINT_SUMMARY.md).                                                            |
| Personal manual review               | I interacted with the deployed UI, reviewed portions of the source and README, and identified documentation improvements. | Codex supplied the application, automated evidence, and requested documentation revisions.                          | Student-confirmed account; no separate manual-test record is asserted. [Live portfolio](https://a5ura.github.io/robotics-portfolio/) and [README](../README.md) identify the reviewed materials.                                    |
| README and development documentation | I requested and reviewed README improvements and directed this clarification of contributions.                            | Codex prepared the requested text and documentation changes.                                                        | [README revision](https://github.com/a5ura/robotics-portfolio/commit/7097312); [subsequent revision](https://github.com/a5ura/robotics-portfolio/commit/94a8f0c); [README](../README.md); this document.                            |
| Repository synchronization           | I confirmed the synchronized branch and clean working tree from the available results.                                    | Codex executed the requested Git status and fast-forward pull operations locally.                                   | Student-confirmed account and Codex session command results; [commit history](https://github.com/a5ura/robotics-portfolio/commits/main/) shows source history, not a standalone record of every local status check.                 |
| Academic deliverables                | I supplied course expectations and requested the supporting materials.                                                    | Codex generated technical documentation and the academic report.                                                    | [Short report](CMPS510_Portfolio_Short_Report.pdf); [layout sketch](layout-wireframe.png); [checkpoint summary](CHECKPOINT_SUMMARY.md).                                                                                             |

## H. Lessons Learned and Future Improvements

The following are engineering takeaways from the documented workflow, rather than claims about personal mastery or unrecorded learning experiences:

- Defining requirements before implementation makes scope and acceptance criteria reviewable, including the distinction between a demonstration form and actual message delivery.
- Separating content, presentation, and interaction logic makes the static implementation easier to inspect and revise. Extracted utilities allow focused tests without browser setup.
- Automated tests provide repeatable evidence for validation and interaction behavior; their results complement personal review rather than proving every aspect of usability.
- CI/CD makes verification part of publication and exposes environment-specific failures, as illustrated by the recorded browser/runner compatibility fix.
- Reviewing AI-assisted source and documentation helps connect generated implementation details to the stated requirements. A partial review should not be presented as an exhaustive audit or manual authorship.
- Checking the deployed application separately from local execution verifies the hosted paths and delivered experience; a successful build alone is not evidence that the public site works.

Future work includes replacing the temporary portrait, completing the physical-device and additional browser/accessibility checks listed in the [test plan](TEST_PLAN.md), and expanding case studies with accurate, non-confidential details. Further source review can continue alongside those improvements. These are remaining actions, not completed contributions.

### Related Learning Resources

The following educational videos relate to frontend concepts demonstrated in this portfolio. They are listed as related learning resources, not as a record of tutorials I necessarily followed during implementation. Their inclusion does not change the contribution and AI-assistance account above. The same references appear in the small Development Resources section near the website footer.

| Video                                                                                    | Creator            | Related concept demonstrated in this project                                                                                                |
| ---------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Responsive CSS Grid Layout](https://www.youtube.com/watch?v=sKFW3wek21Q)                | Kevin Powell       | CSS Grid and responsive rules adapt the project and skills layouts to smaller screens in `styles.css`.                                      |
| [JavaScript Form Validation](https://www.youtube.com/watch?v=In0nB0ABaUk)                | Web Dev Simplified | `utils.js` checks required fields and email format; `script.js` displays inline feedback and a demo confirmation without sending a message. |
| [Dark/Light Theme Toggle with localStorage](https://www.youtube.com/watch?v=_raOFZAYXD4) | codeSTACKr         | Theme tokens in `styles.css` and interactions in `script.js` switch appearance and save the selected preference in localStorage.            |

## I. AI Assistance Disclosure

This is an individual, human-directed, AI-assisted project. I supplied project direction, requirements, professional content, and confirmed personal verification. ChatGPT helped organize the requirements into a development prompt. OpenAI Codex Desktop generated the application code, tests, technical documentation, and academic deliverables and performed authorized automated verification and deployment operations in the local development workflow.

I did not manually write or modify the application source code. I reviewed portions of it, tested the deployed website through its user interface, reviewed the README and available results, and requested documentation improvements. AI assistance is disclosed in the [README](../README.md#development-approach-and-ai-assistance); neither generated code nor AI-prepared documentation is represented as entirely handwritten by me.
