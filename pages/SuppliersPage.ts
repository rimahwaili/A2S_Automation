// pages/SuppliersPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { SuppliersSelectors } from '../selectors/SuppliersList.selectors';

export class SuppliersPage {
  readonly page: Page;

  // Layout
  readonly contentContainer: Locator;
  readonly listContainer: Locator;
  readonly suppliersListBlock: Locator;

  // Header
  readonly title: Locator;
  readonly titleCount: Locator;

  // Navigation
  readonly newSupplierButton: Locator;
  readonly exportButton: Locator;
  readonly customPageInput: Locator;
  readonly customPageSubmit: Locator;

  // Filter bar
  readonly filterRoot: Locator;
  readonly filterForm: Locator;

  // Filters
  readonly filterCodeSelect: Locator;
  readonly filterNameInput: Locator;
  readonly filterInvoicingCountriesSelect: Locator;
  readonly filterNominationDeclarationSelect: Locator;
  readonly filterNominationControlSelect: Locator;
  readonly filterActiveContractsSelect: Locator;
  readonly filterActiveContactsSelect: Locator;
  readonly filterPublicationCountrySelect: Locator;
  readonly filterMainCategorySelect: Locator;
  readonly filterCategoriesSelect: Locator;
  readonly filterCoveredPerimeterSelect: Locator;
  readonly filterRunningJobCtrlGenSelect: Locator;
  readonly filterWaitingJobCtrlGenSelect: Locator;

  // Filter buttons
  readonly filterApplyButton: Locator;
  readonly filterResetButton: Locator;

  // Table
  readonly tableContainer: Locator;
  readonly tableRows: Locator;
  readonly firstRow: Locator;
  readonly firstRowNameCell: Locator;

  constructor(page: Page) {
    this.page = page;

    // Layout
    this.contentContainer = page.locator(SuppliersSelectors.layout.contentContainer);
    this.listContainer = page.locator(SuppliersSelectors.layout.listContainer);
    this.suppliersListBlock = page.locator(SuppliersSelectors.layout.suppliersListBlock);

    // Header
    this.title = page.locator(SuppliersSelectors.header.title);
    this.titleCount = page.locator(SuppliersSelectors.header.titleCount);

    // Navigation
    this.newSupplierButton = page.locator(SuppliersSelectors.navigation.newSupplierButton);
    this.exportButton = page.locator(SuppliersSelectors.navigation.exportButton);
    this.customPageInput = page.locator(SuppliersSelectors.navigation.customPageInput);
    this.customPageSubmit = page.locator(SuppliersSelectors.navigation.customPageSubmit);

    // Filter bar
    this.filterRoot = page.locator(SuppliersSelectors.filterBar.root);
    this.filterForm = page.locator(SuppliersSelectors.filterBar.form);

    // Filters (base selects / inputs)
    this.filterCodeSelect = page.locator(SuppliersSelectors.filterBar.codeSelect);
    this.filterNameInput = page.locator(SuppliersSelectors.filterBar.nameInput);
    this.filterInvoicingCountriesSelect = page.locator(SuppliersSelectors.filterBar.invoicingCountriesSelect);
    this.filterNominationDeclarationSelect = page.locator(SuppliersSelectors.filterBar.nominationForDeclarationSelect);
    this.filterNominationControlSelect = page.locator(SuppliersSelectors.filterBar.nominationForControlSelect);
    this.filterActiveContractsSelect = page.locator(SuppliersSelectors.filterBar.hasActiveContractsSelect);
    this.filterActiveContactsSelect = page.locator(SuppliersSelectors.filterBar.hasActiveContactsSelect);
    this.filterPublicationCountrySelect = page.locator(SuppliersSelectors.filterBar.publicationCountrySelect);
    this.filterMainCategorySelect = page.locator(SuppliersSelectors.filterBar.mainCategorySelect);
    this.filterCategoriesSelect = page.locator(SuppliersSelectors.filterBar.categoriesSelect);
    this.filterCoveredPerimeterSelect = page.locator(SuppliersSelectors.filterBar.coveredPerimeterSelect);
    this.filterRunningJobCtrlGenSelect = page.locator(SuppliersSelectors.filterBar.runningJobCtrlGenSelect);
    this.filterWaitingJobCtrlGenSelect = page.locator(SuppliersSelectors.filterBar.waitingJobCtrlGenSelect);

    // Filter buttons
    this.filterApplyButton = page.locator(SuppliersSelectors.filterBar.applyFiltersButton);
    this.filterResetButton = page.locator(SuppliersSelectors.filterBar.resetButton);

    // Table
    this.tableContainer = page.locator(SuppliersSelectors.table.container);
    this.tableRows = page.locator(SuppliersSelectors.table.bodyRows);
    this.firstRow = page.locator(SuppliersSelectors.table.firstRow);
    this.firstRowNameCell = page.locator(SuppliersSelectors.table.firstRowNameCell);
  }

  // ---------------
  // Navigation
  // ---------------
  async goto() {
    await this.page.goto(SuppliersSelectors.urls.base);
    await this.filterRoot.waitFor({ state: 'visible' });
  }

  async expectOnListPage() {
    await expect(this.page).toHaveURL(/\/suppliers/);
    await expect(this.tableContainer).toBeVisible();
  }

  async filterByCode(code: string) {
    const chosenContainer = this.page.locator('#supplier_0_code_chosen');
    await chosenContainer.locator('a').click(); 
    const searchInput = chosenContainer.getByRole('textbox', { name: 'Enter a value' });
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(code);
    await searchInput.press('Enter');
    const item = this.page.getByRole('listitem').filter({ hasText: code }).last();
    if (await item.count()) {
      await item.click();
    }
    await this.applyFilters();
  }

  async filterByName(name: string) {
    await this.filterNameInput.fill(name);
    await this.applyFilters();
  }

  async filterByCountry(country: string) {
    const chosenContainer = this.page.locator('#supplier_0_invoicing_countries_chosen');
    await chosenContainer.click();

    const searchInput = chosenContainer.locator('input');
    await searchInput.fill(country);
    await this.page.keyboard.press('Enter');

    await this.applyFilters();
  }

  async filterByCategories(category: string) {
    const chosenContainer = this.page.locator('#supplier_0_categories_chosen');
    await chosenContainer.click();

    const searchInput = chosenContainer.locator('input');
    await searchInput.fill(category);
    await this.page.keyboard.press('Enter');

    await this.applyFilters();
  }

  async filterByActiveContracts(value: 'true' | 'false') {
    const chosenContainer = this.page.locator('#supplier_0_has_active_contracts_chosen');
    await chosenContainer.click();
    await this.page.locator('.chosen-results li', { hasText: value }).click();
    await this.applyFilters();
  }


  async filterByNominationDeclaration(option: string) {
    const chosenContainer = this.page.locator('#supplier_0_nomination_for_declaration_chosen');
    await chosenContainer.click();
    await this.page.locator('.chosen-results li', { hasText: option }).click();
    await this.applyFilters();
  }

  async filterByNominationControl(option: string) {
    const chosenContainer = this.page.locator('#supplier_0_nomination_for_control_chosen');
    await chosenContainer.click();
    await this.page.locator('.chosen-results li', { hasText: option }).click();
    await this.applyFilters();
  }

  async filterByActiveContacts(value: 'true' | 'false') {
    const chosenContainer = this.page.locator('#supplier_0_has_active_contacts_chosen');
    await chosenContainer.click();
    await this.page.locator('.chosen-results li', { hasText: value }).click();
    await this.applyFilters();
  }

  async filterByPublicationCountry(country: string) {
    const chosenContainer = this.page.locator('#js-directory-countries_chosen');
    await chosenContainer.click();

    const searchInput = chosenContainer.locator('input');
    await searchInput.fill(country);
    await this.page.keyboard.press('Enter');

    await this.applyFilters();
  }

  async filterByMainCategory(category: string) {
    const chosenContainer = this.page.locator('#supplier_0_category_id_chosen');
    await chosenContainer.click();

    const searchInput = chosenContainer.locator('input');
    await searchInput.fill(category);
    await this.page.keyboard.press('Enter');

    await this.applyFilters();
  }

  async filterByCoveredPerimeter(country: string) {
    const chosenContainer = this.page.locator('#supplier_0_covered_perimeter_chosen');
    await chosenContainer.click();

    const searchInput = chosenContainer.locator('input');
    await searchInput.fill(country);
    await this.page.keyboard.press('Enter');

    await this.applyFilters();
  }

  async filterByRunningJobControl(value: 'true' | 'false') {
    const chosenContainer = this.page.locator('#supplier_0_running_job_control_generation_chosen');
    await chosenContainer.click();
    await this.page.locator('.chosen-results li', { hasText: value }).click();
    await this.applyFilters();
  }

  async filterByWaitingJobControl(value: 'true' | 'false') {
    const chosenContainer = this.page.locator('#supplier_0_waiting_job_control_generation_chosen');
    await chosenContainer.click();
    await this.page.locator('.chosen-results li', { hasText: value }).click();
    await this.applyFilters();
  }

 
  async applyFilters() {
    await this.filterApplyButton.click();

  }

  async resetFilters() {
    await this.filterResetButton.click();

  }

  async exportSuppliers() {
    await this.exportButton.click();
  }

  async getResultsCount() {
    return this.tableRows.count();
  }

  async getFirstResultText() {
    return this.firstRowNameCell.innerText();
  }

  async clickFirstRowShow() {
  await this.firstRow.first().click();
}

async clickFirstRowEdit() {
  await this.firstRowNameCell.first().click();
}
}
