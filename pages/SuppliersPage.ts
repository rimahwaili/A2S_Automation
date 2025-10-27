import { Page, Locator } from '@playwright/test';

export class SuppliersPage {
  readonly page: Page;

  // --- Filter elements ---
  readonly filterPanel: Locator;
  readonly filterCode: Locator;
  readonly filterCodeChosen: Locator;
  readonly filterName: Locator;
  readonly filterCountry: Locator;
  readonly filterNominationDeclaration: Locator;
  readonly filterNominationControl: Locator;
  readonly filterActiveContracts: Locator;
  readonly filterActiveContacts: Locator;
  readonly filterPublicationCountry: Locator;
  readonly filterMainCategory: Locator;
  readonly filterCategories: Locator;
  readonly filterCoveredPerimeter: Locator;
  readonly filterRunningJobControl: Locator;
  readonly filterWaitingJobControl: Locator;

  // --- Buttons ---
  readonly applyButton: Locator;
  readonly resetButton: Locator;
  readonly exportButton: Locator;

  // --- Results table ---
  readonly resultsTable: Locator;
  readonly resultsRows: Locator;
  readonly firstRow: Locator;

  constructor(page: Page) {
    this.page = page;

    // --- Filters ---
    this.filterPanel = page.locator('.custom-filter-bar');

    this.filterCode = page.locator('#supplier_0_code');
    this.filterCodeChosen = page.locator('#supplier_0_code_chosen input');

    this.filterName = page.locator('#supplier_0_name');
    this.filterCountry = page.locator('#supplier_0_invoicing_countries_chosen input');

    this.filterNominationDeclaration = page.locator('#supplier_0_nomination_for_declaration_chosen input');
    this.filterNominationControl = page.locator('#supplier_0_nomination_for_control_chosen input');

    this.filterActiveContracts = page.locator('#supplier_0_has_active_contracts_chosen a');
    this.filterActiveContacts = page.locator('#supplier_0_has_active_contacts_chosen a');

    this.filterPublicationCountry = page.locator('#js_directory_countries_chosen input');
    this.filterMainCategory = page.locator('#supplier_0_category_id_chosen input');
    this.filterCategories = page.locator('#supplier_0_categories_chosen input');
    this.filterCoveredPerimeter = page.locator('#supplier_0_covered_perimeter_chosen input');

    this.filterRunningJobControl = page.locator('#supplier_0_running_job_control_generation_chosen a');
    this.filterWaitingJobControl = page.locator('#supplier_0_waiting_job_control_generation_chosen a');

    // --- Buttons ---
    this.applyButton = page.locator('#filter_bar__-apply-filters_form_submit');
    this.resetButton = page.locator('#clear_filters');
    this.exportButton = page.locator('.download-button a');

    // --- Results ---
    this.resultsTable = page.locator('#suppliers_table tbody');
    this.resultsRows = this.resultsTable.locator('tr');
    this.firstRow = this.resultsTable.locator('tr:first-child');
  }

  // --- Page navigation ---
  async goto() {
    await this.page.goto('/suppliers');
    await this.filterPanel.waitFor({ state: 'visible' });
  }

  // --- Filters interactions ---
  async filterByCode(code: string) {
    
    await this.page.locator('#supplier_0_code_chosen a').filter({ hasText: 'All' }).click(); 
    await this.page.locator('#supplier_0_code_chosen').getByRole('textbox', { name: 'Enter a value' }).waitFor({ state: 'visible' });
    await this.page.locator('#supplier_0_code_chosen').getByRole('textbox', { name: 'Enter a value' }).click();
   await this.page.keyboard.type(code, { delay: 100 });
    await this.page.locator('#supplier_0_code_chosen').getByRole('textbox', { name: 'Enter a value' }).press('Enter');
    await this.page.getByRole('listitem').filter({ hasText: code }).last().getByRole('emphasis').click();
    await this.page.getByRole('button', { name: 'Apply filters' }).click();
    
  }

  async filterByName(name: string) {
    await this.filterName.fill(name);
    await this.applyFilters();
  }

  async filterByCountry(country: string) {
    await this.page.locator('#supplier_0_invoicing_countries_chosen').click();
    await this.filterCountry.fill(country);
    await this.page.keyboard.type(country, { delay: 100 });
    await this.page.keyboard.press('Enter');
    this.page.waitForLoadState('networkidle'),
    await this.applyFilters();
  }

  async filterByNominationDeclaration(option: string) {
    await this.page.locator('#supplier_0_nomination_for_declaration_chosen').click();
    await this.page.locator(`.chosen-results li:has-text("${option}")`).click();
    await this.applyFilters();
  }

  async filterByNominationControl(option: string) {
    await this.page.locator('#supplier_0_nomination_for_control_chosen').click();
    await this.page.locator(`.chosen-results li:has-text("${option}")`).click();
    await this.applyFilters();
  }

  async filterByActiveContracts(value: 'true' | 'false') {
    await this.page.locator('#supplier_0_has_active_contracts_chosen').click();
    await this.page.locator(`.chosen-results li:has-text("${value}")`).click();
    await this.applyFilters();
  }

  async filterByActiveContacts(value: 'true' | 'false') {
    await this.page.locator('#supplier_0_has_active_contacts_chosen').click();
    await this.page.locator(`.chosen-results li:has-text("${value}")`).click();
    await this.applyFilters();
  }

  async filterByPublicationCountry(country: string) {
    await this.page.locator('#js_directory_countries_chosen').click();
    await this.filterPublicationCountry.fill(country);
    await this.page.keyboard.press('Enter');
    await this.applyFilters();
  }

  async filterByMainCategory(category: string) {
    await this.page.locator('#supplier_0_category_id_chosen').click();
    await this.filterMainCategory.fill(category);
    await this.page.keyboard.press('Enter');
    await this.applyFilters();
  }

  async filterByCategories(category: string) {
    await this.page.locator('#supplier_0_categories_chosen').click();
    await this.filterCategories.fill(category);
    await this.page.keyboard.press('Enter');
    await this.applyFilters();
  }

  async filterByCoveredPerimeter(country: string) {
    await this.page.locator('#supplier_0_covered_perimeter_chosen').click();
    await this.filterCoveredPerimeter.fill(country);
    await this.page.keyboard.press('Enter');
    await this.applyFilters();
  }

  async filterByRunningJobControl(value: 'true' | 'false') {
    await this.page.locator('#supplier_0_running_job_control_generation_chosen').click();
    await this.page.locator(`.chosen-results li:has-text("${value}")`).click();
    await this.applyFilters();
  }

  async filterByWaitingJobControl(value: 'true' | 'false') {
    await this.page.locator('#supplier_0_waiting_job_control_generation_chosen').click();
    await this.page.locator(`.chosen-results li:has-text("${value}")`).click();
    await this.applyFilters();
  }

  // --- Actions ---
  async applyFilters() {
    await this.applyButton.click();
    //await this.page.waitForLoadState('networkidle');
  }

  async resetFilters() {
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async exportSuppliers() {
    await this.exportButton.click();
  }

  // --- Results helpers ---
  async getResultsCount() {
    return await this.resultsRows.count();
  }

  async getFirstResultText() {
    return await this.firstRow.innerText();
  }
}
