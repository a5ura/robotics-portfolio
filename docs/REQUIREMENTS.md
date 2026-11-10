# Requirements

Prepared November 10, 2026. Project 7, CMPS 510, Bay Atlantic University.

## Objective and stakeholders

Give recruiters and engineering collaborators a credible overview of Gowtham Kanneganti's robotics background and provide a working academic portfolio for Dr. Tsige Tessema. The student maintains the site; visitors browse it without accounts.

## Scope and exclusions

One responsive static page, three work/experience cards, profile placeholder, education, skills, professional links, demo contact form, and persisted theme preference. No message delivery/storage, backend application, database, accounts, telemetry, confidential work details, or invented achievements. The local HTTP server is a development tool only.

## Requirements, acceptance, and traceability

| ID | Requirement / acceptance criterion | Verification |
| --- | --- | --- |
| FR-01 | Hero and About present the supplied identity, education and labeled temporary portrait. | Browser: mandatory sections; manual content review |
| FR-02 | Exactly three work cards distinguish software from experience. Only MaintainAI has a repository link. | Browser: mandatory sections; content review |
| FR-03 | Navigation reaches About, Work, Skills and Contact; footer has professional links. | Browser: all main navigation; link review |
| FR-04 | Form requires trimmed name, email and message; rejects malformed email and excessive lengths. | Unit: email, required fields, valid input, bounds; browser: empty / invalid form |
| FR-05 | Valid submission displays thanks and says nothing was sent/stored; resets inputs without requests. | Browser: successful demo; source review |
| FR-06 | Theme toggle changes appearance and accessible label; localStorage preserves a valid preference. | Unit: theme resolution/toggle; browser: persistence / blocked storage |
| NFR-01 | Readable responsive layout with no horizontal overflow at 320, 375, 390 and 768px. | Browser: mobile widths; screenshot review |
| NFR-02 | Semantic landmarks, labels, visible focus, skip link, live feedback and reduced-motion support. | HTML validation; axe light/dark; browser: keyboard / reduced motion; manual checklist |
| NFR-03 | No application runtime dependencies; separate HTML, CSS and JS; relative asset paths work under Pages subpath. | Build, static validation, deployed browser verification |
| NFR-04 | Tests and validation gate Pages deployment; public code/site URLs recorded only after verification. | GitHub Actions; public HTTP/browser checks |
| NFR-05 | README screenshot; exactly five stories with criteria and matching diagram in a 1-2 page report. | PDF page/text checks and visual inspection; docs review |

## Submission constraints

November 15 checkpoint; final submission November 28, 2026 at 11:59 PM Eastern. A real photograph must replace the labeled temporary image before final submission. AI assistance must be disclosed. Optional video is outside V1.
