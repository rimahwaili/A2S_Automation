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

  // Pagination
  readonly pagination: Locator;
  readonly customPageInput: Locator;
  readonly customPageSubmit: Locator;
  readonly activePage: Locator;

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

    // Pagination
    this.pagination = page.locator(ContractsSelectors.pagination.root);
    this.customPageInput = page.locator(ContractsSelectors.pagination.customPageInput);
    this.customPageSubmit = page.locator(ContractsSelectors.pagination.customPageSubmit);
    this.activePage = page.locator(ContractsSelectors.pagination.activePage);
  }

  // --- Méthodes métier ---

  async goto() {
    await this.page.goto('/contracts');
    await expect(this.table).toBeVisible();
  }

  async selectValidTab() {
    await this.tabValid.click();
    await this.page.waitForLoadState('networkidle');
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
}
