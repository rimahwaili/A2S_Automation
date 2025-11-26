import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../utils/env';
import { loginSelectors } from '../../selectors/login.selectors';
import { translations, getLang } from '../../utils/translations';
import { allure } from 'allure-playwright';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';


const lang = getLang(); // détecte depuis process.env.LANG
const t = translations[lang];

let forgotPassword: ForgotPasswordPage;

test.describe('Login Tests', () => {
  test('A2SQA2-2522 | @P0 @Login Login with valid credentials', async ({ page }) => {
  forgotPassword = new ForgotPasswordPage(page);
    allure.label('feature', 'Login');
    allure.epic('Login');
    allure.story('Login with valid credentials');
    allure.severity('critical'); 
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.detectLanguage();
    const t = translations[loginPage.lang];

    await loginPage.login(credentials.username, credentials.password);
    const currentUrl = page.url();

    if (currentUrl.includes('users/cgu_required')) {
    await forgotPassword.fillNewPassword('Tuesday@260994!!', 'Tuesday@260994!!');
  }
    const toast = page.locator(loginSelectors.successToast);
    await expect(toast).toBeVisible();
     await expect(toast.locator(loginSelectors.toastHeader)).toContainText(/Succès|Success/i);
  await expect(toast.locator(loginSelectors.toastMessage)).toContainText(credentials.username);
  });

  test('A2SQA2-2523 | @P0 @Login Login with inactif credentials', async ({ page }) => {
    allure.label('feature', 'Login');
    allure.epic('Login');
    allure.story('Login with inactif credentials');
    allure.severity('normal'); 

    const loginPage = new LoginPage(page);
    await loginPage.goto();
     await loginPage.detectLanguage();
    const t = translations[loginPage.lang];

    await loginPage.login(credentials.inactive_username, credentials.inactive_password);

    await expect(page.locator(loginSelectors.warningMessage)).toBeVisible();
  });

  test('A2SQA2-2524 | @P0 @Login Login with invalid credentials', async ({ page }) => {

    allure.label('feature', 'Login');
    allure.epic('Login');
    allure.story('Login with invalid credentials');
    allure.severity('critical'); 

    const loginPage = new LoginPage(page);
    await loginPage.goto();
     await loginPage.detectLanguage();
    const t = translations[loginPage.lang];

    await loginPage.login("wrong@gmail.com", "testwrong");

    await expect(page.locator(loginSelectors.warningMessage)).toBeVisible();
  });

});
