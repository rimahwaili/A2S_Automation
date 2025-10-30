import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../utils/env';
import { loginSelectors } from '../../selectors/login.selectors';
import { translations, getLang } from '../../utils/translations';


const lang = getLang(); // détecte depuis process.env.LANG
const t = translations[lang];


test.describe('Login Tests', () => {
  test('A2SQA2-2522 | @P0 @Login Should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.detectLanguage();
    const t = translations[loginPage.lang];

    await loginPage.login(credentials.username, credentials.password);

    const toast = page.locator(loginSelectors.successToast);
    await expect(toast).toBeVisible();
     await expect(toast.locator(loginSelectors.toastHeader)).toContainText(/Succès|Success/i);
  await expect(toast.locator(loginSelectors.toastMessage)).toContainText(credentials.username);
  });

  test('A2SQA2-2523 | @P0 @Login Should fail when login with inactif credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
     await loginPage.detectLanguage();
    const t = translations[loginPage.lang];

    await loginPage.login(credentials.inactive_username, credentials.inactive_password);

    await expect(page.locator(loginSelectors.warningMessage)).toBeVisible();
  });

  test('A2SQA2-2524 | @P0 @Login should fail when login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
     await loginPage.detectLanguage();
    const t = translations[loginPage.lang];

    await loginPage.login("wrong@gmail.com", "testwrong");

    await expect(page.locator(loginSelectors.warningMessage)).toBeVisible();
  });

});
