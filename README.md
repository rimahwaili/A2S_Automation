# A2S E2E Automation Tests 

This repository contains Playwright end-to-end tests executed in a GitHub Actions workflow that:
- builds a Docker image,
- runs Playwright tests (filtered with @P0),
- collects Allure results,
- publishes an Allure HTML report to GitHub Pages, and
- sends an email summary with pass/fail metrics.

This README documents the CI workflow, required secrets and environment variables, how to run tests locally, and troubleshooting tips.

## Quick overview of the workflow

Workflow name: `Playwright Tests 

Triggers:
- push to `main`
- pull_request
- workflow_dispatch (manual)

High-level steps:
1. Checkout repository
2. Build a Docker image named `playwright-tests`
3. Create `.env.recette` from repository secrets
4. Run Playwright tests inside the container (runs tests tagged `@P0`)
5. Generate Allure report from `allure-results`
6. Extract stats from the Allure summary and compute pass rate and badge colors
7. Upload the Allure report as an artifact
8. Publish the Allure report to GitHub Pages (branch `gh-pages`, under `run-<run_number>`)
9. Send an email summary with metrics and link to the published Allure report

## Required repository secrets

Add these repository secrets (Settings → Secrets & variables → Actions):

- BASE_URL — base URL of the application under test (e.g. https://recette.example.com)
- LOGIN_USERNAME — main username used by tests
- LOGIN_PASSWORD — main password used by tests
- LOGIN_INACTIF_USERNAME — optional inactive user username
- LOGIN_INACTIF_PASSWORD — optional inactive user password
- EMAIL_USER — SMTP username (used as "from" email)
- EMAIL_PASS — SMTP password or app-specific password (for Gmail use an App Password)
- (GITHUB_TOKEN is provided automatically by Actions; no manual secret required)

Note: Do not commit secrets into the repository. The workflow writes these values into `.env.recette` at run time.

## Environment variables (in workflow)

The job exports:
- NODE_ENV=recette
- TZ=Europe/Paris

The workflow writes `.env.recette` with the secrets listed above and mounts it into the Docker container at `/app/.env.recette`.

## How the Allure report is published

- After tests run, the workflow generates an Allure HTML report and publishes it to GitHub Pages using peaceiris/actions-gh-pages@v4.
- The report is published to branch `gh-pages` under directory `run-<github.run_number>`.
- Example report URL pattern (replace owner/repo):  
  https://<github-username>.github.io/<repo>/run-<run_number>/
- The workflow also uploads the HTML report as an Actions artifact named `allure-report`.

## Email notification

- The workflow uses dawidd6/action-send-mail@v3 to send a summary email.
- The SMTP server settings in the current workflow are configured for Gmail (smtp.gmail.com:465, secure).
- For Gmail, generate an App Password if your account has 2FA enabled; do not use your account password.

Email recipients (in the workflow example):
- rimah.waili@consulting-for.accor.com
- interceptor_a2s@astoresuite.com

The email includes metrics: Passed, Failed, Broken, Skipped, Total, Duration and a button linking to the published Allure report.

## Running tests locally

You can run the tests locally either with Docker (to match CI) or directly with Node/Playwright.

A. Using Docker (recommended to match CI)
1. Build the image:
   docker build -t playwright-tests .

2. Create a local `.env.recette` at repo root (example below).

3. Run tests (runs @P0 tests and produces `allure-results`):
   docker run --rm \
     -v $(pwd)/.env.recette:/app/.env.recette \
     -v $(pwd)/allure-results:/app/allure-results \
     playwright-tests npx playwright test --grep @P0 --reporter=line,allure-playwright

4. Generate Allure report locally (requires Allure commandline):
   docker run --rm -v $(pwd)/allure-results:/app/allure-results -v $(pwd)/allure-report:/app/allure-report playwright-tests npx allure generate /app/allure-results --clean -o /app/allure-report

B. Without Docker
1. Install deps:
   npm install
   npx playwright install

2. Run tests:
   npx playwright test --grep @P0 --reporter=line,allure-playwright

3. Generate Allure (you can install allure-commandline or use the Allure Docker image):
   npx allure generate ./allure-results --clean -o ./allure-report

Note: The CI uses `npx playwright test --grep @P0 --reporter=line,allure-playwright || true` so the job continues even when tests fail (Allure always generated and email sent).

## Example .env.recette (do NOT commit this file)

Create `.env.recette` at repository root (the workflow creates it automatically from secrets):

BASE_URL=https://recette.example.com
LOGIN_USERNAME=user@example.com
LOGIN_PASSWORD=secret
LOGIN_INACTIF_USERNAME=inactive@example.com
LOGIN_INACTIF_PASSWORD=inactive-secret

## Dockerfile requirements

Your Dockerfile should produce an image that can:
- run Node/npm and npx
- run Playwright tests (browsers installed)
- include allure-playwright reporter and optionally allure commandline tooling (or you can generate the report using the container's node + allure CLI)

A minimal recommended base (example snippet — adapt to your project):

FROM node:18-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Install Playwright browsers
RUN npx playwright install --with-deps
COPY . .
# (Optional) Install Allure commandline if needed, or rely on npx allure if in devDependencies
# e.g., RUN npm i -g allure-commandline@2.22.0

CMD ["npx", "playwright", "test"]

Adjust the Dockerfile to match your project's build & runtime needs.

## Tests selection and tagging

- The workflow runs tests filtered by --grep @P0. Use @P0 for highest priority tests you want executed in CI.
- Use other tags (e.g., @P1, @smoke) and run them as needed by changing the grep in the workflow.

## Troubleshooting

- "Summary file not found!" — means Allure HTML generation didn't produce `allure-report/widgets/summary.json`. Check `allure-results` for test results and that Allure generation succeeded.
- SMTP/auth errors when sending email — verify EMAIL_USER and EMAIL_PASS; for Gmail use an App Password, ensure less-secure apps is not required.
- Port or permission errors with Docker in Actions — the workflow runs on `ubuntu-latest` which supports Docker; make sure no privileged operations are required.
- If Playwright can't find browsers: ensure `npx playwright install` was run in the Docker image or on CI image.

## Customization

- To run more/less tests change the grep expression in the `Run Playwright tests` step.
- To publish to a different branch or path in Pages, edit the `peaceiris/actions-gh-pages` step.
- To send emails to different recipients, update the `to:` parameter of the mail action.

## Security notes

- Never commit `.env.recette` or other secret-containing files.
- Use repository secrets for credentials and tokens.
- Use minimal permissions for GitHub tokens where possible (the workflow sets `contents: write`).

## Contributing

- Open issues or PRs for improvements to the test suite or CI workflow.
- When modifying the workflow, test changes on a feature branch and validate artifacts (Allure results) are generated as expected.



