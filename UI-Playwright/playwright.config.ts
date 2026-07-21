import { defineConfig, devices } from '@playwright/test';
import { Env } from './utils/Env';

export default defineConfig({
  globalSetup: require.resolve('./global.setup'),
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000 
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [['line'], ['allure-playwright', { detail: false }]],
  use: {
    baseURL: Env.get('DEEPAK_BASE_URL'),
    trace: 'on-first-retry',
    video: 'retain-on-first-failure',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
