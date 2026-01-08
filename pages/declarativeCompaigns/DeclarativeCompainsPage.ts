import { Page, Locator, expect } from '@playwright/test';


type Period = 'Y' | 'S1' | 'S2' | 'Q1' | 'Q2' | 'Q3' | 'Q4';
export class DeclarativeCampaignsPage {
    readonly page: Page;

    // ===== TABLE =====
    readonly table: Locator;
    readonly rows: Locator;

    // ===== FILTERS =====
    readonly nameFilter: Locator;
    readonly statusFilter: Locator;
    readonly applyFiltersBtn: Locator;
    readonly clearFiltersBtn: Locator;

    // ===== ACTIONS =====
    readonly newCampaignBtn: Locator;
    readonly seeAllDeclarationsLink: Locator;
    readonly anticipatedCheckbox: Locator;
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    readonly periodSelect: Locator;
    readonly yearInput: Locator;
  constructor(page: Page) {
    this.page = page;

    // Table
    this.table = page.locator('#declarative_campaigns_table');
    this.rows = this.table.locator('tbody tr');

    // Filters (generic + defensive)
    this.nameFilter = page.getByLabel('Name');
    this.statusFilter = page.getByLabel('Status');
    this.applyFiltersBtn = page.getByRole('button', {name: /filter|search|apply/i,});
    this.clearFiltersBtn = page.getByRole('button', {name: /clear|reset/i,});
    // Actions
    this.newCampaignBtn = page.getByRole('link', {name: /new declaration campaign/i,});
    this.seeAllDeclarationsLink = page.getByRole('link', {name: /see all declarations/i,});
    this.anticipatedCheckbox = page.locator('#anticipated_checkbox'); // adjust selector
    this.startDateInput = page.locator('#start_date'); // adjust selector
    this.endDateInput = page.locator('#end_date'); // adjust selector
    this.periodSelect = page.locator('#period_select'); // adjust selector
    this.yearInput = page.locator('#year_input'); // adjust selector
  }

  // ===== NAVIGATION =====
  async goto() {
    await this.page.goto('/declarative_campaigns');
    await expect(this.rows.first()).toBeVisible();
  }

  static formatDate(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
  async setAnticipated(value: boolean) {
    const checked = await this.anticipatedCheckbox.isChecked();
    if (checked !== value) {
      await this.anticipatedCheckbox.click();
    }
  }

  async setBeginningDate(date: string) {
    await this.startDateInput.fill(date);
  }

  async setEndingDate(date: string) {
    await this.endDateInput.fill(date);
  }

  async setYear(year: string) {
    await this.yearInput.fill(year);
  }

async selectPeriod(period: 'Y' | 'S1' | 'S2' | 'Q1' | 'Q2' | 'Q3' | 'Q4') {
  const chosenId = '#declarative_campaign_0_period_chosen';

  // 1️⃣ Cliquer sur le select Chosen (le vrai bouton)
  await this.page.locator(`${chosenId} .chosen-single`).click();

  // 2️⃣ Attendre que les options soient injectées
  const option = this.page.locator(
    `.chosen-results li:has-text("${period}")`
  );

  await option.waitFor({ state: 'visible' });

  // 3️⃣ Cliquer sur l’option
  await option.click();
}



 static getRandomPeriod(): 'Y' | 'S1' | 'S2' | 'Q1' | 'Q2' | 'Q3' | 'Q4' {
  const periods = ['Y', 'S1', 'S2', 'Q1', 'Q2', 'Q3', 'Q4'] as const;
  return periods[Math.floor(Math.random() * periods.length)];
}

static getRandomDates(period: 'Y' | 'S1' | 'S2' | 'Q1' | 'Q2' | 'Q3' | 'Q4', year: number) {
  switch (period) {
    case 'Y': return { startDate: `01/01/${year}`, endDate: `12/31/${year}` };
    case 'S1': return { startDate: `01/01/${year}`, endDate: `06/30/${year}` };
    case 'S2': return { startDate: `07/01/${year}`, endDate: `12/31/${year}` };
    case 'Q1': return { startDate: `01/01/${year}`, endDate: `03/31/${year}` };
    case 'Q2': return { startDate: `04/01/${year}`, endDate: `06/30/${year}` };
    case 'Q3': return { startDate: `07/01/${year}`, endDate: `09/30/${year}` };
    case 'Q4': return { startDate: `10/01/${year}`, endDate: `12/31/${year}` };
    default:
      throw new Error(`Invalid period: ${period}`);
  }
}

  static getRandomYear(): number {
    return 2026 + Math.floor(Math.random() * 3); // 2025-2027
  }

  static getRandomCountry(): string {
    const countries = ['France',
      'Peru',
      'United States',
      'Brazil',
      'Canada',
      'Mexico',
      'Chile',
      'Colombia',
      'Saudi Arabia',
      'United Arab Emirates',
      'Germany',
      'Italy',
      'Spain',
      'Portugal',
      'Switzerland',
      'Netherlands',
      'Poland',
      'Romania',
      'Morocco',
      'Hungary'];
    return countries[Math.floor(Math.random() * countries.length)];
  }

  static getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  async rowByText(text: string): Promise<Locator> {
    return this.rows.filter({ hasText: text });
  }
  // ===== FILTERS =====
  async filterByName(name: string) {
    await this.nameFilter.fill(name);
    await this.applyFiltersBtn.click();
  }

  async filterByStatus(status: 'Draft' | 'Ready') {
    await this.statusFilter.selectOption({ label: status });
    await this.applyFiltersBtn.click();
  }

  async clearFilters() {
    await this.clearFiltersBtn.click();
  }
  

  // ===== ROW HELPERS =====
  rowByName(name: string): Locator {
    return this.rows.filter({
      has: this.page.locator('[data-field="name"]', {
        hasText: name,
      }),
    });
  }

  // ===== CELL GETTERS =====
  async getStatus(row: Locator): Promise<string> {
    return (await row.locator('[data-field="status"]').innerText()).trim();
  }

  async getParticipations(row: Locator): Promise<number> {
    return Number(
      await row
        .locator('[data-field="participations_total"]')
        .innerText()
    );
  }

  // ===== ROW ACTIONS =====
  async clickShow(row: Locator) {
    await row.locator('a[data-action="show"]').click();
  }

  async clickEdit(row: Locator) {
    await row.locator('a[data-action="edit"]').click();
  }

  // ===== GLOBAL ACTIONS =====
  async createNewCampaign() {
    await this.newCampaignBtn.click();
    await expect(this.page).toHaveURL(/\/declarative_campaigns\/new/);
  }

  async seeAllDeclarations() {
    await this.seeAllDeclarationsLink.click();
    await expect(this.page).toHaveURL(/\/declarative_campaign_participations\/list/);
  }

  async regenerateCampaign(campaignId: number) {
    await this.page.locator(`#declarative_campaigns_${campaignId} .regen-link a`).click();
  }



}
