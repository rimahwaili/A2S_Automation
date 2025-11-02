import { ContactDetailsSelectors as sel } from '../selectors/contactDetails.selectors';
import { expect, Page } from '@playwright/test';

export class ContactDetailsPage {

    constructor(private page: Page) {}

   
  async verifyPageLoaded() {
    await expect(this.page.locator(sel.pageContainer)).toBeVisible({ timeout: 8000 });
    await expect(this.page.locator(sel.pageTitle)).toHaveText(/Contact Details/i);
    console.log('✅ Contact Details page is visible');
  }

  async verifyContactInformation() {
    await expect(this.page.locator(sel.contactName)).toBeVisible();
    await expect(this.page.locator(sel.contactEmail)).toBeVisible();
    await expect(this.page.locator(sel.contactStatus)).toBeVisible();
    await expect(this.page.locator(sel.contactProfile)).toBeVisible();
    console.log('✅ Contact basic information verified');
  }

  async verifySettingsSection() {
    await expect(this.page.locator(sel.contactSettingsSection)).toBeVisible();
    await expect(this.page.locator(sel.languageValue)).toBeVisible();
    await expect(this.page.locator(sel.dateFormatValue)).toBeVisible();
    console.log('✅ Contact settings verified');
  }

   async sendResetLink() {
    await expect(this.page.locator(sel.sendResetLinkButton)).toBeVisible();
    await this.page.locator(sel.sendResetLinkButton).click();
    console.log('✅ Send Reset Password Link');
    await expect(this.page.locator(sel.toastSuccess)).toBeVisible({ timeout: 5000 });
    
   }


  async openChangePasswordModal() {
    await expect(this.page.locator(sel.changePasswordButton)).toBeVisible();
    await this.page.locator(sel.changePasswordButton).click();
    await expect(this.page.locator(sel.passwordPageTitle)).toBeVisible({ timeout: 5000 });
    console.log('✅ Change Password modal opened');
  }

  async changeValidPassword(password: string) {
    console.log(`🧩 Setting valid password: ${password}`);

    await this.page.locator(sel.passwordInput).fill(password);
    await this.page.locator(sel.passwordInput).press('Enter');
    await this.page.locator(sel.confirmPasswordInput).fill(password);
    await this.page.locator(sel.confirmPasswordInput).press('Enter');
    await expect(this.page.locator(sel.applyPasswordButton)).toBeEnabled();

    await this.page.locator(sel.applyPasswordButton).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.locator(sel.passwordModal)).toBeHidden({ timeout: 5000 });

    console.log('✅ Password changed successfully');
  }

  async changeInvalidPassword(password: string, confirmPassword: string) {
    console.log(`⚠️ Testing invalid password: ${password} / ${confirmPassword}`);

    await this.page.locator(sel.passwordInput).fill(password);
    await this.page.locator(sel.confirmPasswordInput).fill(confirmPassword);
    await expect(this.page.locator(sel.passwordMismatchError)).toBeVisible({
      timeout: 5000,
    });

    console.log('❌ Password mismatch validation triggered');
  }


  async closeChangePasswordModal() {
    await this.page.locator(sel.closeModalButton).click();
    await expect(this.page.locator(sel.passwordModal)).toBeHidden();
    console.log('✅ Change Password modal closed');
  }


   async verifyAndCloseSuccessToast(expectedText: string | RegExp) {
    const toast = this.page.locator(sel.toastSuccess);
    const message = this.page.locator(sel.toastMessage);

    console.log('🔎 Waiting for success toast...');
    await expect(toast).toBeVisible({ timeout: 8000 });
    await expect(message).toHaveText(expectedText, { timeout: 8000 });

    console.log('✅ Success toast verified:', await message.textContent());
     const closeBtn = this.page.locator(sel.toastCloseButton);
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await expect(closeBtn).toBeHidden({ timeout: 5000 });
      console.log('✅ Toast closed');
    } else {
      console.log('ℹ️ Toast already closed');
    }
  }

}
