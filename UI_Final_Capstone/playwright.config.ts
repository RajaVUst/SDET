import { defineConfig, devices } from '@playwright/test';
import { config } from './config/config';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  outputDir: 'test-results',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright'],
    ['json', { outputFile: 'reports/json/report.json' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }]
  ],

  use: {
    baseURL: config.baseUrl,

    headless: config.headless,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: config.timeout,

    navigationTimeout: config.timeout,

    ignoreHTTPSErrors: true
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});