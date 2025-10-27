import { Page , Locator, expect } from '@playwright/test';
import { credentials } from '../utils/env';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private forgetpasswordbutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.locator('#user_0_password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.forgetpasswordbutton = page.getByRole('link', { name: 'Forgot your password ?' });
;

  }

  async goto() {
    await this.page.goto(credentials.baseUrl +'/users/forgot_password');
    await expect(this.usernameInput).toBeVisible();
    await expect(this.usernameInput).toHaveValue('');
    
  }

  async resetPassword(email: string) {
    
    await this.page.fill('input[name="email"]', email);
    await this.page.click('button[type="submit"]');
  }

  async gotoResetLink() {
    // simule l'ouverture du lien envoyé par mail (dans un vrai test : stub backend)
    await this.page.goto('https://rec.astoresuite.com/users/forgot_password');
  }

  async fillNewPassword(password: string, confirm: string) {
    await this.page.fill('input[name="password"]', password);
    await this.page.fill('input[name="confirmPassword"]', confirm);
    await this.page.click('button[type="submit"]');
  }
}
