import { Page, Locator, expect } from '@playwright/test';


 const periods = ['Y', 'S1', 'S2', 'Q1', 'Q2', 'Q3', 'Q4'] as const;
 type Period = typeof periods[number];

export class NewDeclarativeCampaignPage {
   
  selectPeriod(period: string) {
    throw new Error('Method not implemented.');
  }
  readonly page: Page;

  readonly anticipatedCheckbox: Locator;
  readonly beginningDateInput: Locator;
  readonly endingDateInput: Locator;
  readonly periodChosen: Locator;
  readonly yearInput: Locator;
  readonly countryChosen: Locator;
  readonly saveButton: Locator;
  readonly anticipatedSwitch: Locator;
  readonly enableButton: Locator;
  readonly successMessage: Locator;
  readonly startDate: Locator;
  readonly endDate: Locator;
 readonly  launchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enableButton = page.locator('#dc_enable');
    // selectors
    this.anticipatedCheckbox = page.locator('#declarative_campaign_0_anticipated');
    this.anticipatedSwitch = page.locator('label.switch[for="declarative_campaign_0_anticipated"]');
    
    this.beginningDateInput = page.locator('#declarative_campaign_0_beginning_date');
    this.endingDateInput = page.locator('#declarative_campaign_0_ending_date');
    this.periodChosen = page.locator('#declarative_campaign_0_period_chosen');
    this.yearInput = page.locator('#declarative_campaign_0_year');
    this.countryChosen = page.locator('#declarative_campaign_0_country_id_chosen');
    this.saveButton = page.getByRole('button', {name: /save|create/i,});
    this.successMessage = page.locator('#flash .alert.alert-success.notice');
    this.startDate = page.locator('.start-date-box .date-value');
    this.endDate = page.locator('.end-date-box .date-value');
    this.launchButton = page.locator('a.astore-main-button', { hasText: 'Launch campaign' });}


    async assertLoaded() {await expect(this.beginningDateInput).toBeVisible();}

    async setAnticipated(value: boolean) {
    // Wait for switch to be visible
    await expect(this.anticipatedSwitch).toBeVisible();

   // Get the current state from the hidden checkbox
   const isChecked = await this.anticipatedCheckbox.isChecked();

   // Only click if the state is different
   if (isChecked !== value) {
    await this.anticipatedSwitch.click();
    // Confirm the checkbox is updated
    await expect(this.anticipatedCheckbox).toHaveJSProperty('checked', value);
  }
}
  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifySuccessMessage(expectedMessage: string) {
    await expect(this.successMessage).toHaveText(expectedMessage);
  }

  async verifyStartDate(expectedDate: string) {
  // Convert expected MM/DD/YYYY to YYYY-MM-DD
  const [month, day, year] = expectedDate.split('/');
  const formatted = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;

  await expect(this.startDate).toHaveText(new RegExp(`\\s*${formatted}\\s*`));
}



async verifyEndDate(expectedDate: string) {
  const [month, day, year] = expectedDate.split('/');
  const formatted = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;

  await expect(this.endDate).toHaveText(new RegExp(`\\s*${formatted}\\s*`));
}

  async launchCampaign() {
    await Promise.all([
      this.page.waitForNavigation(), // optional if launch reloads page
      this.launchButton.click()
    ]);
  }
  async setBeginningDate(date: string) {
    await this.beginningDateInput.fill(date);
    await this.beginningDateInput.blur();
  }

  async setEndingDate(date: string) {
    await this.endingDateInput.fill(date);
    await this.endingDateInput.blur();
  }

async getRandomPeriod(): Promise<"Y" | "S1" | "S2" | "Q1" | "Q2" | "Q3" | "Q4"> {
  return periods[Math.floor(Math.random() * periods.length)];
}

  async setYear(year: string) {
    await this.yearInput.fill(year);
  }

async selectCountry(country: string) {
  await this.countryChosen.click(); // open the dropdown

  // Narrow the search to the input inside this dropdown
  const search = this.countryChosen.locator('.chosen-search-input');
  await search.type(country);

  const option = this.countryChosen.locator('.chosen-results li.active-result', { hasText: country });
  await option.first().waitFor({ state: 'visible' });
  await option.first().click();
}

 async clickEnable() {
    await this.enableButton.click();
  }

  async save() {
    await this.saveButton.click();
  }


  async  isDeclarativeCampaignAlreadyExists(): Promise<boolean> {
  const error = this.page.locator(
    'li[data-object="declarative_campaign"][data-attribute="base"]'
  );
  return await error.isVisible();
}
}
