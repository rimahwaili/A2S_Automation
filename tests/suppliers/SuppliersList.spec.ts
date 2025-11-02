import { test, expect } from '@playwright/test';
import { SuppliersPage } from '../../pages/SuppliersPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Suppliers Filters', () => {
  let suppliersPage: SuppliersPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    suppliersPage = new SuppliersPage(page);
    await suppliersPage.goto();
  });

  test('Filter by code - valid supplier', async () => {
    await suppliersPage.filterByCode('45351');
    const results = await suppliersPage.getResultsCount();
    expect(results).toBeGreaterThan(0);
    const text = await suppliersPage.getFirstResultText();
    expect(text).toContain('ACIAL');
  });

  test('Filter by name - partial match', async () => {
    await suppliersPage.filterByName('ACIAL');
    const first = await suppliersPage.getFirstResultText();
    expect(first).toContain('ACIAL');
  });

  test('Filter by country', async () => {
    await suppliersPage.filterByCountry('France');
    const first = await suppliersPage.getFirstResultText();
    expect(first).toContain('France');
  });

  test('Filter by category', async () => {
    await suppliersPage.filterByCategories('Guest amenities');
    const first = await suppliersPage.getFirstResultText();
    expect(first).toContain('Guest amenities');
  });

  test('Filter by active contracts', async () => {
    await suppliersPage.filterByActiveContracts('true');
    const count = await suppliersPage.getResultsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Reset filters restores full list', async () => {
    await suppliersPage.filterByCode('703');
    await suppliersPage.resetFilters();
    const count = await suppliersPage.getResultsCount();
    expect(count).toBeGreaterThan(15); // full dataset
  });
});
