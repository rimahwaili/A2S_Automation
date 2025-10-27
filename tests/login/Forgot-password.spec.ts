import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { credentials } from '../../utils/env';

test.describe('Mot de passe oublié:', () => {
  let forgotPassword: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgotPassword = new ForgotPasswordPage(page);
    await forgotPassword.goto();
  });

  test('A2SQA2-2525 | @P0 @Login Should sent password Reset correctly with valid email', async ({ page }) => {
    await forgotPassword.resetPassword(credentials.username);
    await expect(page.locator('#success')).toBeVisible();
    await expect(page.locator('#success')).toHaveText(
    'An email with a link to reset your password has been sent.'
  );
  });


  test('A2SQA2-2527 | @P0 @Login Should not reset password when using  Inactif email', async ({ page }) => {
    await forgotPassword.resetPassword(credentials.inactive_username);
    await expect(page.locator('#warning')).toContainText('Your account has been deactivated');
  });

  test('A2SQA2-2526 | @P0 @Login Should not reset password when using wrong email', async ({ page }) => {
    await forgotPassword.resetPassword('adresse@inconnue.com');
   await expect(page.locator('#warning')).toContainText('No user is registered with this email');
  });

/*
  test('A2SQA2-2528 | @P0 @Login Should not reset password when passwords are not identicals', async ({ page }) => {
    await forgotPassword.gotoResetLink();
    await forgotPassword.fillNewPassword('Test1234!', 'Test12345!');
    await expect(page.locator('//span[contains(text(),"non identiques")]')).toBeVisible();
  });
*/
});
