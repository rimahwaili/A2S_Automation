import { test, expect } from '@playwright/test';
import { SuppliersPage } from '../../pages/SuppliersPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Suppliers module', () => {

   let suppliersPage: SuppliersPage;
test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login();
      suppliersPage = new SuppliersPage(page);
      await suppliersPage.goto();
    });


  test('Create new supplier', async ({ page }) => {
    // Step 1: Go to Suppliers page
    await page.goto('/suppliers');

    // Step 2: Click on "+ NEW SUPPLIER"
    await page.getByRole('button', { name: /new supplier/i }).click();
    
    await page.getByRole('link', { name: 'New Supplier' }).click();

    await page.getByRole('textbox', { name: 'Code: *' }).click();
    await page.getByRole('textbox', { name: 'Code: *' }).fill('supplier_test_auto_');
    await page.getByRole('textbox', { name: 'Code: *' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Code: *' }).fill('supplier_test_auto_1');
    await page.getByRole('textbox', { name: 'Name: *' }).click();

    await page.locator('div').filter({ hasText: 'DATA ContactsContacts' }).nth(1).click();
    await page.locator('div').filter({ hasText: 'DATA ContactsContacts' }).nth(1).click();

    await page.getByText('Contacts (0) & Addresses').click();
    await page.getByText('Contacts (0) & Addresses').click();
    await page.getByText('Directory Information').click();

    // Step 3: Fill required fields
    await page.getByLabel('Code*').fill('SUP999');
    await page.getByLabel('Name*').fill('Test Supplier Automation');
    await page.getByLabel('Legal name*').fill('Supplier Auto SARL');
    await page.getByLabel('Status').selectOption({ label: 'Not Logged' });
    await page.getByLabel('Type').selectOption({ label: 'Industrial' });
    await page.getByLabel('Invoicing Currency').selectOption({ label: 'EUR' });

    // Step 4: Add minimal admin info
    await page.getByLabel('VAT Number').fill('FR123456789');

    // Step 5: Go to contacts tab
    await page.getByRole('tab', { name: /Contacts/i }).click();
    await page.getByRole('button', { name: /Add/i }).click();
    await page.getByLabel('Address 1').fill('1 Rue du Test');
    await page.getByLabel('City').fill('Paris');
    await page.getByLabel('ZIP code').fill('75001');
    await page.getByLabel('Country').selectOption({ label: 'France' });
/*
    // Step 6: Submit form
    await page.getByRole('button', { name: /Submit/i }).click();

    // Step 7: Check success
    await expect(page).toHaveURL(/suppliers/);
    await expect(page.getByText('Test Supplier Automation')).toBeVisible();*/
  });

});
