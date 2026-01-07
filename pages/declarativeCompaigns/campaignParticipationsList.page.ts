import { Page, expect } from '@playwright/test';
import { CampaignParticipationsListSelectors as S } from '../../selectors/campaignParticipationsList.selectors';

export class CampaignParticipationsListPage {
  constructor(private readonly page: Page) {}

  /* -------------------------
     Generic Chosen handler
  -------------------------- */
  async selectFromChosen(chosenSelector: string, value: string) {
    const chosen = this.page.locator(chosenSelector);
    await chosen.click();
    await chosen.locator(S.chosenSearchInput).type(value, { delay: 150 });
    await chosen.locator(S.chosenResultItem).first().click();
  }

  /* -------------------------
     Filter actions
  -------------------------- */
  async filterBySupplier(name: string) {
    await this.selectFromChosen(S.supplierChosen, name);
  }

  async filterByLastUpdatedBy(user: string) {
    await this.selectFromChosen(S.lastUpdatedByChosen, user);
  }

  async filterByCountry(country: string) {
    await this.selectFromChosen(S.countryChosen, country);
  }

  async filterByPeriod(period: string) {
    await this.selectFromChosen(S.periodChosen, period);
  }

  async setYear(year: string) {
    await this.page.fill(S.yearInput, year);
  }

  async setToPeriod(value: string) {
    await this.page.fill(S.toPeriodInput, value);
  }

  async setToVariance(value: string) {
    await this.page.fill(S.toVarianceInput, value);
  }

  async setVarianceComparator(comparator: '>' | '<' | '=' | '>=' | '<=') {
    await this.page.selectOption(S.varianceComparator, comparator);
  }

  async applyFilters() {
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.page.click(S.applyFiltersBtn)
    ]);
  }

  async resetFilters() {
    await this.page.click(S.resetFiltersBtn);
  }

  async expectResultsVisible() {
    const count = await this.page.locator(S.rows).count();
    expect(count).toBeGreaterThan(0);
  }

  async expectSupplierName(name: string) {
    const cells = this.page.locator(S.supplierName);
    const count = await cells.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(cells.nth(i)).toHaveText(name);
    }
  }

  async expectCountry(country: string) {
    const cells = this.page.locator(S.country);
    const count = await cells.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(cells.nth(i)).toHaveText(country);
    }
  }

  async expectAccountingPeriod(period: string) {
    const cells = this.page.locator(S.accountingPeriod);
    const count = await cells.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(cells.nth(i)).toHaveText(period);
    }
  }

  async expectVarianceGreaterThan(value: number) {
    const cells = this.page.locator(S.toVariance);

    const count = await cells.count();
    for (let i = 0; i < count; i++) {
      const text = (await cells.nth(i).innerText()).replace('%', '').trim();

      if (text !== 'N/A') {
        expect(Number(text)).toBeGreaterThan(value);
      }
    }
  }

  async expectNoResults() {
    await expect(this.page.locator(S.rows)).toHaveCount(0);
  }


  async selectScope(scopeId: string) {
    const scopeButton = this.page.locator(S.scopeButtonById(scopeId));

    await expect(scopeButton).toBeVisible();

    // Click + wait for reload (XHR or page update)
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      scopeButton.click()
    ]);

    // Assert selected state
    await expect(scopeButton).toHaveClass(/selected/);
  }
}
