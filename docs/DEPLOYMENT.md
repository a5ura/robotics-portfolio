# GitHub Pages deployment

All source development and tests run locally on Windows. GitHub is used for version control, CI/CD and public static hosting only.

## Verified deployment - November 10, 2026

[Public repository](https://github.com/a5ura/robotics-portfolio) · [Live portfolio](https://a5ura.github.io/robotics-portfolio/) · [Successful Actions run](https://github.com/a5ura/robotics-portfolio/actions/runs/42868833952).

The public URL returned HTTP 200 and all 13 deployed Chrome checks passed. CI also passed 22 unit tests, static validation/build and 13 built-output Chromium checks before deployment. CI uses Ubuntu 24.04 because the initial `ubuntu-latest` image selected Ubuntu 26.04, unsupported by the pinned Playwright version. This was fixed locally and pushed before the successful run.

## Automated path used by this project

1. Inspect the remote repository and local Git status; never force-push or replace unrelated history.
2. Commit the tested local files on `main`.
3. Create public `a5ura/robotics-portfolio` only if absent, using the already authorized local account.
4. Push `main`; configure Pages to use `workflow` (GitHub Actions).
5. Wait for **Test and deploy portfolio** to complete. Resolve actual failures before declaring success.
6. Check the public URL returns HTTP 200 and run the browser suite against it.
7. Update the checkpoint summary and README with verified evidence and push those documentation changes.

`node tools/github.mjs inspect|publish|status` can use existing local Git Credential Manager authentication. It validates the identity as `a5ura`, never prints/stores tokens, and stops if credentials or scope are unavailable. `publish` is intended for this repository and `main` only; inspect repository contents and local history before invoking it on an existing repository.

## Manual fallback if authentication/administration is unavailable

Create the public repository at GitHub's **New repository** page as `a5ura/robotics-portfolio`, without initializing README, license, or .gitignore. If it already exists, inspect it before proceeding. Then, from this local workspace:

```powershell
git remote -v
# Only if origin is absent:
git remote add origin https://github.com/a5ura/robotics-portfolio.git
git push -u origin main
```

Use GitHub's login flow if requested; do not paste credentials into source. Open repository **Settings → Pages → Build and deployment → Source → GitHub Actions**. If needed, open **Actions → Test and deploy portfolio → Run workflow** on `main`. Wait for both test and deploy jobs. Check the expected URL, `https://a5ura.github.io/robotics-portfolio/`, and do not claim it is live until it loads with the expected page.
