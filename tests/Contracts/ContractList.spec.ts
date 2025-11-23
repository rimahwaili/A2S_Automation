// tests/contracts.spec.ts
import { test, expect } from '@playwright/test';
import { ContractsPage } from '../../pages/ContractListPage';
import { LoginPage } from '../../pages/LoginPage';


 let contractsPage: ContractsPage;
 test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    contractsPage = new ContractsPage(page);
    await contractsPage.goto();
  });

  
test.describe('Contracts List', () => {


  test('@P1 @Contract All tabs should be visible and enabled', async ({ page }) => {
    const contractsPage = new ContractsPage(page);
    await contractsPage.goto();

    for (const tab of contractsPage.getAllTabs()) {
      await expect(tab).toBeVisible();
      await expect(tab).toBeEnabled();
    }
  });

  test('@P1 @Contract Each tab should become active when clicked', async ({ page }) => {
    const contractsPage = new ContractsPage(page);
    await contractsPage.goto();

    for (const tab of contractsPage.getAllTabs()) {
      await contractsPage.clickTab(tab);
      //await contractsPage.selectFirstContract();

    }
  });

  test('@P1 @Contract filtrer par numéro de contrat', async ({ page }) => {

  const contractsPage = new ContractsPage(page);

  await contractsPage.goto();
  await contractsPage.filterByNumber('GP2GP2614');

  await contractsPage.expectRowNumberContains(0, 'GP2GP2614');
});

});