import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { credentials } from '../../utils/env';
import { allure } from 'allure-playwright';

test.describe('Reset Password:', () => {
  let forgotPassword: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgotPassword = new ForgotPasswordPage(page);
    await forgotPassword.goto();
  });

  test('A2SQA2-2525 | @P1 @Login Sent password Reset correctly with valid email', async ({ page }) => {
    
    allure.label('feature', 'Login');
    allure.epic('Login');
    allure.story('Sent password Reset correctly with valid email');

    await forgotPassword.resetPassword(credentials.username);
    await expect(page.locator('#success')).toBeVisible();
    await expect(page.locator('#success')).toHaveText(
    'An email with a link to reset your password has been sent.'
  );
  });


  test('A2SQA2-2527 | @P0 @Login Reset password when using  Inactif email', async ({ page }) => {

    allure.label('feature', 'Login');
    allure.epic('Login');
    allure.story('Reset password when using  Inactif email');
    await forgotPassword.resetPassword(credentials.inactive_username);
    await expect(page.locator('#warning')).toContainText('Your account has been deactivated');
  });

  test('A2SQA2-2526 | @P0 @Login Fails reset password when using wrong email', async ({ page }) => {
    allure.label('feature', 'Login');
    allure.epic('Login');
    allure.story('Fails reset password when using wrong email');
    await forgotPassword.resetPassword('adresse@inconnue.com');
   await expect(page.locator('#warning')).toContainText('No user is registered with this email');
  });


  test('A2SQA2-2528 | @P1 @Login Fails reset password when passwords are not identicals', async ({ page }) => {
    await forgotPassword.gotoResetLink();
    await forgotPassword.fillNewPassword('Test1234!', 'Test12345!');
    await expect(page.locator('//span[contains(text(),"non identiques")]')).toBeVisible();
  });

});
