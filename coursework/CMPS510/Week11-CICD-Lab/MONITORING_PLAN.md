# Monitoring and feedback plan — proposed

The deployed portfolio is a static GitHub Pages site. It has no backend, database, or email delivery. These are **proposed** ongoing checks, not a claim that a live monitoring service is configured.

| Signal | Verification | Response |
| --- | --- | --- |
| CI/CD health | Check GitHub Actions test/deploy status for every push | Investigate failed step and preserve logs; block release |
| Public availability | Check https://a5ura.github.io/robotics-portfolio/ for HTTP 200 and expected page content | Investigate deployment and Pages status |
| Client-side errors | Run Playwright smoke checks and collect uncaught JavaScript errors | Fix regression and rerun pipeline |
| User interactions | Verify navigation, contact-form demo validation/confirmation and theme persistence | Fix failing UI behavior; note form does not deliver messages |
| Responsive experience | Recheck 320, 375, 390, 768px widths for overflow | Correct layout regressions |
| Accessibility | Repeat keyboard, reduced-motion and axe-core checks in both themes | Review violations; supplement with manual testing |
| Feedback | Review issues and manually test a physical phone/second browser | Prioritize defects and track fixes |

**Infrastructure assumptions:** GitHub Actions runner Ubuntu 24.04; Node.js 24; npm package access; Playwright Chromium; static `dist/` output; GitHub Pages hosting. No production database, API or email service is implied.
