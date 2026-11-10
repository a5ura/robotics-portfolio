# Architecture and design

## Small static application

```text
GitHub Pages → index.html → styles.css + assets/
                          → script.js → utils.js
                                           ↑
                                  Node unit tests
Browser → localStorage (theme only)
Browser → direct professional links / user's mail application
Demo form → local validation → feedback (no network or persistence)
```

HTML owns content and semantic landmarks; CSS owns layout, responsive rules, theme tokens, and reduced-motion handling. `utils.js` exposes pure validation/theme functions. `script.js` binds those functions to the DOM, catches unavailable storage, and updates accessible feedback. Separating validation from event handlers applies the single-responsibility principle without claiming all SOLID principles.

`tools/serve.mjs` is a loopback-only development server. `tools/build.mjs` copies an explicit allowlist into `dist/`; dependencies, tests, source brief, docs, and Git metadata are excluded from the hosted application. All URLs for application assets are relative, supporting `/robotics-portfolio/` hosting. Google Fonts is an optional external typography request with sans-serif fallbacks; the rest of the interface does not need third-party scripts.

## Layout sketch

The design wireframe is embedded in the short PDF and exported as [layout-wireframe.png](layout-wireframe.png). Desktop progression: header → two-column hero → focus strip → About with portrait and education → three work cards → four skill categories → contact links and demonstration form → footer. Mobile stacks the same content; navigation stays visible. The focus strip is a visual continuation of the hero.

## Content provenance

Identity, education, skills and experience summaries come from the student's supplied brief. MaintainAI's public README was inspected on November 10, 2026: equipment tracking, maintenance history, semantic retrieval, stored-event fault analysis, and guided troubleshooting support the card description. The card interface and robot/vision drawings are explicitly conceptual illustrations. No employers, quantitative results, confidential details or invented repositories are shown.

## Deployment

GitHub Actions runs unit, HTML/static, and built-output browser checks before uploading only `dist/` and deploying through GitHub's Pages actions. Pull requests run verification without production deployment. `tools/github.mjs` uses existing local Git Credential Manager credentials in memory to create/configure the explicitly requested repository; it never writes or logs tokens.
