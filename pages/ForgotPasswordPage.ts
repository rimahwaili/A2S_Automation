import { Page , Locator, expect } from '@playwright/test';
import { credentials } from '../utils/env';
import { loginSelectors as sel} from '../selectors/login.selectors';

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
  }

  async goto() {
    await this.page.goto(credentials.baseUrl +'users/forgot_password');
    await expect(this.usernameInput).toBeVisible();
    await expect(this.usernameInput).toHaveValue('');
    
  }

  async gotoresetPassword(email: string) {
    await this.page.click('//a[@href=\'/users/forgot_password\']');
    await this.resetPassword(email);
  }

  async resetPassword(email: string) {
  const emailLocator = await this.page.locator('input[name="email"]').count() > 0
    ? 'input[name="email"]'
    : '#user_0_email'; // fallback si le premier n'existe pas

  await this.page.fill(emailLocator, email);
  await this.page.click('button[type="submit"]');
  }

  async gotoResetLink() {
    // simule l'ouverture du lien envoyé par mail (dans un vrai test : stub backend)
    await this.page.goto('https://rec.astoresuite.com/users/forgot_password');
  }

  async fillNewPassword(password: string, confirm: string) {
  await this.page.fill('input[type="password"][name$="[password]"]', password);
  await this.page.fill('input[type="password"][name$="[password_confirmation]"]', confirm);
  await this.page.locator('#cgu_required_accept_form_submit').click();
}

 async setNewPassword(password: string) {
  console.log(`🔐 Setting new password (${password.length} chars)...`);

  const resetInput = this.page.locator(sel.ResetpasswordInput);
  const confirmInput = this.page.locator(sel.confirmPasswordInput);
  const acceptBtn = this.page.locator(sel.acceptButton);

  // Scroll into view if needed
  await resetInput.scrollIntoViewIfNeeded();
  await resetInput.fill(password);

  await confirmInput.scrollIntoViewIfNeeded();
  await confirmInput.fill(password);

  await acceptBtn.scrollIntoViewIfNeeded();
  await expect(acceptBtn).toBeEnabled();
  await acceptBtn.click();

  console.log('✅ Password set and form submitted');
}
}
