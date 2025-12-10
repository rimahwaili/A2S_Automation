import { defineConfig, devices } from '@playwright/test';
import { credentials } from './utils/env';

const isCI = !!process.env.CI;
const envName = process.env.ENV || 'recette';
const baseURL = credentials.baseUrl || (envName === 'preprod' 
    ? 'https://preprod.astoresuite.com/' 
    : 'https://rec.astoresuite.com/');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined, // undefined utilise le nombre de cores dispo
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['line'],
    ['allure-playwright'],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: envName,
      use: {
        baseURL,
      },
    },
    // Décommenter et personnaliser pour différents navigateurs/devices si besoin
    // {
    //   name: 'Desktop Chrome',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'Desktop Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
