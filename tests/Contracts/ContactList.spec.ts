// tests/contracts.spec.ts
import { test, expect } from '@playwright/test';
import { ContractsPage } from '../../pages/ContractListPage';

test('filtrer par numéro de contrat', async ({ page }) => {
  const contractsPage = new ContractsPage(page);

  await contractsPage.goto();
  await contractsPage.filterByNumber('GP2GP2614');

  await contractsPage.expectRowNumberContains(0, 'GP2GP2614');
});
