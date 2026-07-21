# SDET - UI Final Capstone

## Project Overview
This project is for automated UI testing using Playwright. The project includes comprehensive test suites for payment validation, cart functionality, and accessibility testing.

## UST ID
**UST ID:** 304525

---

## Project Structure

```
SDET/
├── UI_Final_Capstone/          # Main test project directory
│   ├── config/                 # Configuration files
│   ├── fixtures/               # Test fixtures and setup
│   ├── pages/                  # Page Object Model (POM) classes
│   ├── tests/                  # Test specifications
│   ├── testData/               # Test data files
│   ├── utils/                  # Utility functions
│   ├── playwright.config.ts    # Playwright configuration
│   └── package.json            # Dependencies
├── .github/workflows/          # GitHub Actions workflows
└── README.md
```

---

## Pages Included

- **HomePage.ts** - Main application home page
- **LoginPage.ts** - User authentication page
- **SearchResultsPage.ts** - Search functionality page
- **CartPage.ts** - Shopping cart page
- **CheckoutPage.ts** - Payment and checkout page

---

## Test Suites

- **cartvalidation.spec.ts** - Cart functionality and validation tests
- **Paymentvalidation.spec.ts** - Payment processing and validation tests

---

## Getting Started

### Prerequisites
- Node.js 24 or higher
- npm or yarn

### Installation

```bash
cd UI_Final_Capstone
npm install
npx playwright install --with-deps chromium
```

### Running Tests

**Headless Mode (CI):**
```bash
npm test
```

**Headed Mode (Debug):**
```bash
npm run test:headed
```

---

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration. The workflow automatically:

1. Runs on push to `304525-chandana_finalcapstone` branch
2. Installs dependencies using `npm ci`
3. Executes Playwright tests with Allure reporting
4. Generates HTML and Allure reports
5. Uploads test artifacts for review

### View Test Results
After workflow completion, download artifacts from the GitHub Actions run:
- `playwright-artifacts` - Contains test reports and results

---

## Configuration

### Environment Variables

Key environment variables can be set in secrets:
- `BASE_URL` - Application base URL (default: chess-agent test site)
- `DEMO_USER_ID` - Demo user credentials for testing

Defaults are provided in the workflow file.

---

## Utilities

- **AccessibilityUtil.ts** - Accessibility testing utilities using Axe
- **logger.ts** - Logging functionality
- **MaskUtil.ts** - Data masking utilities

---

## Reporting

### Allure Reports
Test results are automatically generated using Allure:
- Located in `reports/allure-report/`
- Generated after test execution
- Shows detailed test execution metrics

### HTML Reports
Playwright HTML reports available in `playwright-report/`

---

## Best Practices

1. Use Page Object Model pattern for page interactions
2. Keep test data in `testData/` directory
3. Use fixtures for test setup and teardown
4. Log important test steps using `logger.ts`
5. Follow accessibility standards in UI tests

---

## Troubleshooting

**Issue: Tests not running in CI**
- Ensure `package-lock.json` is committed
- Verify Node.js version in workflow
- Check branch name in workflow trigger

**Issue: Missing test reports**
- Verify reports directory exists
- Check Allure installation: `npm install allure-commandline --save-dev`

---

## Support

For issues or questions, please contact the project maintainer.

---

**Last Updated:** July 21, 2026
