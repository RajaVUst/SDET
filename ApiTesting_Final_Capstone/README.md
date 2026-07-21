# Final Practice API + UI Tests

Project overview: FinalPractice automated tests (API + UI). Replace the placeholder below with your name and UST ID.

- Author: YOUR NAME — UST ID: USTXXXXX

## What this repo contains

- Maven-based API tests (Rest-Assured + JUnit 5) under `src/test/java`
- A minimal Playwright UI test setup under `tests/` (Node) to satisfy CI UI test requirement
- CI pipeline workflow at `.github/workflows/ci.yml` that runs both suites and publishes Allure artifacts

## How to run locally

Run API tests (Maven):

```bash
mvn -B test
```

Run Playwright UI tests (Node):

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

Generate Allure report from Java tests (if you have Allure CLI installed):

```bash
mvn -B allure:report
# or generate from allure-results produced by Playwright:
# npm i -g allure-commandline --save-dev
# allure generate ./allure-results -o ./allure-report --clean
# allure open ./allure-report
```

## CI pipeline

The CI workflow runs on push/pr and does the following:

- Checkout, set up JDK and Node
- Run Maven API tests
- If Playwright config exists (we added a minimal one), it installs node deps, installs browsers, and runs Playwright tests
- Generates the Maven Allure report and uploads both Maven report and Playwright `allure-results` as pipeline artifacts

When you submit your project for evaluation:

- Make sure to replace the `Author` line above with your name and UST ID
- Push the branch to GitHub and open the Actions run; copy the pipeline run link for your viva
- Download the Allure artifacts from the successful workflow run as your Test Execution Report

## Notes

- The Playwright setup here is minimal to ensure CI executes UI tests — expand UI tests as needed.
- If you prefer to combine Allure results into a single HTML report, install the Allure CLI locally or on CI and generate the report from the combined `allure-results` directories.
