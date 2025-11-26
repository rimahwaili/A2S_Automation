import { defineConfig, devices } from '@playwright/test';
import { credentials } from './utils/env';


export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }],["line"], ["allure-playwright"]],
   use: {
    baseURL: credentials.baseUrl || 'https://preprod.astoresuite.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    ignoreHTTPSErrors: true,

  },
  projects: [
    /*{
      name: 'recette',
      use: {
        baseURL: 'https://rec.astoresuite.com/',
      },
    },
    {
      name: 'preprod',
      use: {
        baseURL: 'https://preprod.astoresuite.com/',
      },
    },*/
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],


});
