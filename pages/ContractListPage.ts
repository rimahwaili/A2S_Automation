// tests/pages/contracts-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { ContractsSelectors } from '../selectors/contracts.selectors';

export class ContractsPage {
  readonly page: Page;

  // Onglets
  readonly tabAll: Locator;
  readonly tabDraft: Locator;
  readonly tabValid: Locator;
  readonly tabToRenew: Locator;
  readonly tabExpired: Locator;
  readonly tabArchived: Locator;
  readonly tabError: Locator;

  // Filtres
  readonly supplierSelect: Locator;
  readonly numberInput: Locator;
  readonly typeSelect: Locator;
  readonly mainCategorySelect: Locator;
  readonly formerNumbersInput: Locator;
  readonly categoryManagerSelect: Locator;
  readonly invoicingCountrySelect: Locator;
  readonly applyFiltersButton: Locator;
  readonly clearFiltersButton: Locator;

  // Actions
  readonly exportButton: Locator;
  readonly newContractButton: Locator;

  // Tableau
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly numberCell: Locator;
  readonly statusCell: Locator ;

  // Pagination
  readonly pagination: Locator;
  readonly customPageInput: Locator;
  readonly customPageSubmit: Locator;
  readonly activePage: Locator;

  // Headers for sorting 
  readonly startDateHeader: Locator;
  readonly majorVersionHeader: Locator;
  readonly minorVersionHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Onglets
    this.tabAll = page.locator(ContractsSelectors.tabs.all);
    this.tabDraft = page.locator(ContractsSelectors.tabs.draft);
    this.tabValid = page.locator(ContractsSelectors.tabs.valid);
    this.tabToRenew = page.locator(ContractsSelectors.tabs.toRenew);
    this.tabExpired = page.locator(ContractsSelectors.tabs.expired);
    this.tabArchived = page.locator(ContractsSelectors.tabs.archived);
    this.tabError = page.locator(ContractsSelectors.tabs.error);

    // Filtres
    this.supplierSelect = page.locator(ContractsSelectors.filters.supplier);
    this.numberInput = page.locator(ContractsSelectors.filters.number);
    this.typeSelect = page.locator(ContractsSelectors.filters.type);
    this.mainCategorySelect = page.locator(ContractsSelectors.filters.mainCategory);
    this.formerNumbersInput = page.locator(ContractsSelectors.filters.formerNumbers);
    this.categoryManagerSelect = page.locator(ContractsSelectors.filters.categoryManager);
    this.invoicingCountrySelect = page.locator(ContractsSelectors.filters.invoicingCountry);
    this.applyFiltersButton = page.locator(ContractsSelectors.filters.applyButton);
    this.clearFiltersButton = page.locator(ContractsSelectors.filters.clearButton);

    // Actions
    this.exportButton = page.locator(ContractsSelectors.actions.exportButton);
    this.newContractButton = page.locator(ContractsSelectors.actions.newContractButton);

    // Tableau
    this.table = page.locator(ContractsSelectors.table.root);
    this.tableRows = page.locator(ContractsSelectors.table.bodyRows);
    this.numberCell = page.locator(ContractsSelectors.table.numberCell);
    this.statusCell = page.locator(ContractsSelectors.table.statusCell);

    // Pagination
    this.pagination = page.locator(ContractsSelectors.pagination.root);
    this.customPageInput = page.locator(ContractsSelectors.pagination.customPageInput);
    this.customPageSubmit = page.locator(ContractsSelectors.pagination.customPageSubmit);
    this.activePage = page.locator(ContractsSelectors.pagination.activePage);

    // Headers for sorting
    this.startDateHeader = page.locator('#contracts_actual_beginning_date_th');
    this.majorVersionHeader = page.locator('#contracts_major_version_th');
    this.minorVersionHeader = page.locator('#contracts_minor_version_th');
  }

  // --- Méthodes métier ---



  async goto() {
    await this.page.goto('/contracts');
    //await expect(this.table).toBeVisible();
  }

  async clickToValidTab() {
    await this.tabValid.click();
    // Re-query table after click (fresh locator)
    const table = this.page.locator('#contracts_table');
    await table.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickToExpiredTab() {
    await this.tabExpired.click();
    // Re-query table after click (fresh locator)
    const table = this.page.locator('#contracts_table');
    await table.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickToRenewtab() {
  await this.tabToRenew.click({ force: true });

  // Re-query table after click (fresh locator)
  const table = this.page.locator('#contracts_table');
  await table.waitFor({ state: 'visible', timeout: 10000 });

}



 async sortByStartDateMajorMinor() {
    await this.startDateHeader.click();
    await this.startDateHeader.click();

   /* await this.majorVersionHeader.click({
      modifiers: ['Shift'],
    });

    await this.minorVersionHeader.click({
      modifiers: ['Shift'],
    });*/
  }


async getAllVisibleRows() {
  const visibleRows: { row: Locator; number: string; status: string }[] = [];

  const rowCount = await this.tableRows.count();

  for (let i = 0; i < rowCount; i++) {
    const row = this.tableRows.nth(i);

    if (!(await row.isVisible())) {
      continue;
    }
    const numberCell = row.locator(this.numberCell);
    const statusCell = row.locator(this.statusCell);

    const number = (await numberCell.textContent())?.trim() ?? '';
    const status = (await statusCell.textContent())?.trim().toLowerCase() ?? '';
    visibleRows.push({ row, number, status });
  }

  return visibleRows;
}

  async isActive(tab: Locator) {
    return tab.evaluate(el => el.classList.contains('active'));
  }

  getAllTabs() {
    return [
      this.tabAll,
      this.tabDraft,
      this.tabValid,
      this.tabToRenew,
      this.tabExpired,
      this.tabArchived,
      this.tabError
    ];
  }

  async filterByNumber(number: string) {
    await this.numberInput.fill(number);
    await this.applyFiltersButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clearFilters() {
    await this.clearFiltersButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToPage(pageNumber: number) {
    await this.customPageInput.fill(pageNumber.toString());
    await this.customPageSubmit.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openFirstContract(rowIndex = 0) {
    const row = this.tableRows.nth(rowIndex);
    await row.locator(ContractsSelectors.rowActions.view).click();

  }
async getContractId(): Promise<string | undefined> {
  const currentUrl = this.page.url();
  const match = currentUrl.match(/\/contracts\/(?:edit|show)\/(\d+)/);
  const contractId = match?.[1];
  console.log('Contract ID:', contractId);
  return contractId;
}

  async expectAllRowsToHaveStatus(status: string) {
    const count = await this.tableRows.count();
    for (let i = 0; i < count; i++) {
      await expect(this.tableRows.nth(i)).toHaveAttribute('data-contract-status', status);
    }
  }

  async expectRowNumberContains(rowIndex: number, expected: string) {
    const numberCell = this.tableRows
      .nth(rowIndex)
      .locator(ContractsSelectors.table.numberCell);
    await expect(numberCell).toContainText(expected);
  }

  async clickNewContract(): Promise<void> {
    await this.page.click(ContractsSelectors.actions.newContractButton);
}
}
