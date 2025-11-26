import { test, expect } from '@playwright/test';
import { SuppliersPage } from '../../pages/SuppliersPage';
import { LoginPage } from '../../pages/LoginPage';
import { allure } from 'allure-playwright';

test.describe('Suppliers Filters', () => {
  let suppliersPage: SuppliersPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    suppliersPage = new SuppliersPage(page);
    await suppliersPage.goto();
  });

  test('A2SQA2-2522 | @P1 @Supplier Filter by code - valid supplier', async () => {
    allure.label('feature', 'Supplier');
    allure.epic('Supplier');
    allure.story('Supplier - Filter by code - valid supplier');
    allure.severity('minor'); 

    await suppliersPage.filterByCode('45351');
    const results = await suppliersPage.getResultsCount();
    expect(results).toBeGreaterThan(0);
    const text = await suppliersPage.getFirstResultText();
    expect(text).toContain('ACIAL');
  });

  test('A2SQA2-XX | @P1 @Supplier  Filter by name - partial match', async () => {
    allure.label('feature', 'Supplier');
    allure.epic('Supplier');
    allure.story('Supplier - Filter by name - partial match');
    allure.severity('minor'); 

    await suppliersPage.filterByName('ACIAL');
    const first = await suppliersPage.getFirstResultText();
    expect(first).toContain('ACIAL');
  });

  test('A2SQA2-XX | @P1 @Supplier  Filter by country', async () => {
    allure.label('feature', 'Supplier');
    allure.epic('Supplier');
    allure.story('Supplier - Filter by country ');
    allure.severity('minor'); 

    await suppliersPage.filterByCountry('France');
    const first = await suppliersPage.getFirstResultText();
    expect(first).toContain('France');
  });

  test('A2SQA2-XX | @P1 @Supplier  Filter by category', async () => {

    allure.label('feature', 'Supplier');
    allure.epic('Supplier');
    allure.story('Supplier - Filter by category ');
     allure.severity('minor'); 

    await suppliersPage.filterByCategories('Guest amenities');
    const first = await suppliersPage.getFirstResultText();
    expect(first).toContain('Guest amenities');
  });

  test('A2SQA2-XX | @P1 @Supplier  Filter by active contracts', async () => {

    allure.label('feature', 'Supplier');
    allure.epic('Supplier');
    allure.story('Supplier - Filter by active contracts ');
    allure.severity('minor'); 

    await suppliersPage.filterByActiveContracts('true');
    const count = await suppliersPage.getResultsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('A2SQA2-XX | @P1 @Supplier  Reset filters restores full list', async () => {

    allure.label('feature', 'Supplier');
    allure.epic('Supplier');
    allure.story('Supplier - Reset filters restores full list');
    allure.severity('minor'); 

    await suppliersPage.filterByCode('703');
    await suppliersPage.resetFilters();
    const count = await suppliersPage.getResultsCount();
    expect(count).toBeGreaterThan(15);
  });
});
