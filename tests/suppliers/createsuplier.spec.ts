// tests/suppliers/suppliers.spec.ts
import { test, expect } from '@playwright/test';
import { CreateSuppliersPage } from '../../pages/CreateSuppliersPage';
import { SuppliersPage } from '../../pages/SuppliersPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Suppliers module', () => {
  let suppliersPage: SuppliersPage;
 let createSuppliersPage: CreateSuppliersPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    suppliersPage = new SuppliersPage(page);
    createSuppliersPage = new CreateSuppliersPage(page);

    await suppliersPage.goto();
  });

  test('A2SQA2-2546 | @P0 @supplier Create new supplier', async ({ page }) => {
    const random = Date.now();
    const supplierName = `Test Supplier Automation ${random}`;
    const supplierCode = supplierName;
    const vatNumber = 'FR123456789';

    // Step 1–2: Open new supplier form
    await createSuppliersPage.openNewSupplierForm();

    // Step 3: Fill header info
    await createSuppliersPage.fillHeaderInfo(supplierCode, supplierName, vatNumber);

    // Step 4: Contacts & Addresses
    await createSuppliersPage.openContactsTab();
    await createSuppliersPage.clickAddAddressRow();

    await createSuppliersPage.fillAddress({
      address1: '123 Main Street',
      address2: 'Building B',
      zipCode: '75001',
      city: 'Paris',
      country: 'France',
      functionSite: 'Billing',
      otherFunctionSite: 'Internal Services',
    });

    // Step 6: Submit
    await createSuppliersPage.submit();

    // Step 7: Check success
    await suppliersPage.expectOnListPage();

    await suppliersPage.filterByName(supplierName);
    const first = await suppliersPage.getFirstResultText();
    expect(first).toContain(supplierName);

    await createSuppliersPage.clickFirstRowShow();
    await createSuppliersPage.verifyAllTabsExist();
  });
});
