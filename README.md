# Gowtham Kanneganti | Robotics & AI Engineer

A professional single-page portfolio focused on robotics deployment, systems integration, industrial automation, computer vision, and applied AI. Also **Project 7: Personal Portfolio Page** for CMPS 510 at Bay Atlantic University, taught by Dr. Tsige Tessema.

Repository and deployment evidence: [checkpoint summary](docs/CHECKPOINT_SUMMARY.md). The deployment URL is added here after public verification.

![Portfolio desktop screenshot](docs/screenshots/portfolio-desktop.png)

[Mobile screenshot](docs/screenshots/portfolio-mobile.png) · [Two-page academic report](docs/CMPS510_Portfolio_Short_Report.pdf) · [Requirements](docs/REQUIREMENTS.md) · [Test plan](docs/TEST_PLAN.md)

## Features

- Professional introduction, About with a clearly labeled portrait placeholder, and education.
- Three distinct work cards: MaintainAI software project, server-disassembly engineering experience, and vision/inspection technical experience.
- Categorized skills and direct GitHub, LinkedIn and email links.
- Accessible demonstration contact form with required/email validation and visible thanks. **It sends and stores no messages.** Use the direct email link for real inquiries.
- Responsive light/dark themes, system-preference fallback, saved theme choice, visible keyboard focus, skip link, and reduced-motion support.
- Locally executed tests and a GitHub Actions verification/deployment workflow.

## Stack and local setup

Semantic HTML, CSS, JavaScript ES modules; no runtime framework or backend. Node.js 22+ (development used 24), npm, Node's test runner, Playwright, axe-core, and html-validate. All development was performed in the local Windows workspace using Codex Desktop.

```powershell
git clone https://github.com/a5ura/robotics-portfolio.git
Set-Location robotics-portfolio
npm ci
npm run dev
```

Open [the local preview](http://127.0.0.1:4173). Stop the server with Ctrl+C. Use HTTP rather than opening `index.html` as a file, because JavaScript uses modules. The website can be served by any static host; npm dependencies are only for development/testing.

## Tests and build

```powershell
npm test
npm run validate
npm run build
# With npm run dev active in another terminal:
$env:BROWSER_CHANNEL = 'chrome'
npm run test:browser
```

If Chrome is unavailable, run `npx playwright install chromium` and omit `BROWSER_CHANNEL`. The suite runs against `TEST_URL` or the local preview. For a built-output check, set `SITE_ROOT=dist` before starting the dev server. Development results: **22 unit / 13 browser checks passed**, zero failures in the final local execution; see the [test plan](docs/TEST_PLAN.md) for coverage and limits.

## Structure

```text
index.html / styles.css       Content and responsive themes
script.js / utils.js          DOM interactions and pure utilities
assets/                      Local SVG drawings / replaceable portrait
tests/                       Node unit tests
tools/                       Local server, validation, build, browser QA, report helper
docs/                        Requirements, architecture, tests, report, status, sketch, screenshots
.github/workflows/pages.yml   Test, static validation, browser checks, Pages deployment
```

## CI/CD

Pushes to `main` and pull requests run unit tests, HTML/static validation, a static build, and Playwright Chromium against the built site. Main-branch success uploads `dist/` and deploys with GitHub Pages using scoped `pages: write` and OIDC permissions. Pull requests do not deploy. Enable **Settings → Pages → Source → GitHub Actions**. The workflow supports manual dispatch. Public URLs are not treated as verified until checked; [deployment notes](docs/DEPLOYMENT.md) include recovery instructions.

## Academic deliverables and development process

Prepared November 10, 2026 for the November 15 checkpoint; final deadline November 28 at 11:59 PM Eastern. The [report](docs/CMPS510_Portfolio_Short_Report.pdf) contains exactly five user stories, testable acceptance criteria and a matching [layout sketch](docs/layout-wireframe.png). See the [delayed November 8 status update](docs/WEEK_10_11_STATUS_UPDATE.md) for the accurate project timeline. The source brief remains local and is excluded from Git.

## AI assistance and content

**OpenAI Codex assisted with design, implementation, test tooling, documentation, and PDF generation.** This work is not represented as entirely handwritten. Profile details came from the student's brief. The MaintainAI card was checked against its [repository README](https://github.com/a5ura/MaintainAI) on November 10, 2026. Engineering drawings and the small interface graphic are conceptual illustrations, not photographs or measured results.

## Known limitations / before final submission

- **A real photograph is outstanding.** Replace `assets/profile-placeholder.svg` with the student's image, update the image `src`/alt text and caption in `index.html`. The placeholder is isolated to one image file. Do not submit it as a real portrait.
- The form is a demonstration; no inbox delivery or message persistence exists.
- Automated axe scans and Chrome responsive checks do not establish complete WCAG compliance or compatibility across every browser. Physical-device, screen-reader, and second-browser review remain student actions.
- Google Fonts improves typography when reachable; local sans-serif fallbacks keep content usable without it.
- No résumé, employers, certifications, performance metrics, confidential details, optional video, or unverified project results were invented.
- To regenerate the report, use Python with `reportlab` and `pypdf` and run `python tools/create-report.py`; render and visually review both pages after edits. These packages are not application dependencies.
