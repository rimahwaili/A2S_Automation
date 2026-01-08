import { Page, expect } from '@playwright/test';
import { CreateContractSelectors } from '../selectors/CreateContract.selectors';

export class CreateContractPage {
    
    private page: Page;
    constructor(page: Page) {
        this.page = page;
}

async selectSupplier(supplierName: string): Promise<void> {
  const chosen = this.page.locator('#contract_0_supplier_id_chosen');

  await chosen.locator('.chosen-single').click();
  const searchInput = chosen.locator('.chosen-search-input');
  await searchInput.type(supplierName);
  const result = chosen.locator(
    `.chosen-results li.active-result:has-text("${supplierName}")`
  );
  await result.waitFor({ state: 'visible' });
  await result.click();
}

async getRandomContractNumber(length: number = 8): Promise<string>  {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CON-${result}`;
}

async enterContractNumber(number: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.contractNumberInput, number);
}

async selectContractName(text: string): Promise<void> {
    await this.page.click(`${CreateContractSelectors.contractTitleSelect} .chosen-single`);
    await this.page.fill(`${CreateContractSelectors.contractTitleSelect} .chosen-search-input`, text);
    const option = this.page
        .locator(`${CreateContractSelectors.contractTitleSelect} .chosen-results li`)
        .getByText(text, { exact: true }); 

    if (await option.count() === 0) {
        throw new Error(`Option "${text}" non trouvée dans le dropdown.`);
    }
    await option.click();
}

async selectContractType(value: string): Promise<void> {
        await this.page.selectOption(CreateContractSelectors.contractTypeSelect, value);
}

async enterDescription(text: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.descriptionTextarea, text);
}

async selectCategories(values: string[] = []): Promise<void> {
    const dropdown = this.page.locator(CreateContractSelectors.categoriesSelect + '_chosen');

    await dropdown.locator('.chosen-choices').click();
    for (const value of values) {
        const searchInput = dropdown.locator('.chosen-search-input');
        await searchInput.fill(value);
        const option = dropdown.locator(`.chosen-results li:has-text("${value}")`);
        if ((await option.count()) === 0) {
            throw new Error(`Option "${value}" non trouvée dans le dropdown.`);
        }
        await option.first().click();
    }
}

async selectMainCategory(label: string): Promise<void> {
  const chosen = this.page.locator('#contract_0_main_category_id_chosen');
  await chosen.locator('.chosen-single').click();
  const searchInput = chosen.locator('.chosen-search-input');
  await searchInput.type(label);
  const option = chosen.locator('.chosen-results li.active-result', { hasText: label });
  await option.waitFor({ state: 'visible' });
  await option.click();
  await chosen.locator('.chosen-single span', { hasText: label }).waitFor({ state: 'visible' });
}

async chooseFrequencies(
  {
    serviceFrequency,
    declarationFrequency,
  }: {
    serviceFrequency?: string;
    declarationFrequency?: string;
  }
) {
  if (serviceFrequency) {
    const serviceMap: Record<string, string> = {
      'applied to all services': '1',
      'for each service': '2',
    };

    await this.page
      .locator('select[name$="[frequency_for_services]"]')
      .selectOption(serviceMap[serviceFrequency]);
  }

  if (declarationFrequency) {
    const declarationMap: Record<string, string> = {
      quarterly: '1',
      annually: '2',
      'bi-annually': '3',
    };

    await this.page
      .locator('select[name$="[declaration_frequency]"]')
      .selectOption(declarationMap[declarationFrequency]);
  }
}




async selectSilentExtension(value: string): Promise<void> {
        await this.page.selectOption(CreateContractSelectors.silentExtensionSelect, value);
}


async enterActualBeginningDate(date: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.actualBeginningDateInput, date);
}

async enterActualEndDate(date: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.actualEndDateInput, date);
}

async selectBeginningQuarter(value: string): Promise<void> {
        await this.page.selectOption(CreateContractSelectors.beginningQuarterSelect, value);
}

async enterBeginningYear(year: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.beginningYearInput, year);
}

async enterSigningDate(date: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.signingDateInput, date);
}

async enterTheoreticalEndDate(date: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.theoreticalEndDateInput, date);
}

async selectEndQuarter(value: string): Promise<void> {
        await this.page.selectOption(CreateContractSelectors.endQuarterSelect, value);
}

async enterEndYear(year: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.endYearInput, year);
}

async selectInvoicingCountry(value: string): Promise<void> { 
    await this.page.click(CreateContractSelectors.invoicingCountryChosen + ' a');
    const searchInput = this.page.locator(CreateContractSelectors.invoicingCountryChosen + ' input.chosen-search-input');
    await searchInput.type(value, { delay: 100 });
    const option = this.page.locator(`${CreateContractSelectors.invoicingCountryChosen} li.active-result:has-text("${value}")`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
}
  
async checkSelectedCurrency(expectedLabel: string): Promise<void> {
  const chosenSpan = this.page.locator('#contract_0_currency_id_chosen .chosen-single span');
  await expect(chosenSpan).toHaveText(expectedLabel, { timeout: 5000 });
}



async enterDurationMonths(duration: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.durationMonthsInput, duration);
    }

async selectCoveredCountries(countries: string[]): Promise<void> {
  const resultLocator = this.page.locator(
    '#contracts_countries_0_cell div.input-group.col-md-10 span'
  );

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    attempts++;

    // 🔹 Re-lire le texte au début de chaque itération
    let text = (await resultLocator.innerText())?.trim().replace(/\s+/g, ' ') ?? '';
    console.log(`Attempt ${attempts}: Current value = "${text}"`);

    if (text === 'World') {
      console.log('✅ Covered countries set to World');
      return; // sort de la boucle et de la fonction
    }

    // Ouvrir le modal
    const modalTrigger = this.page.locator(
      'a[title="country-list-modal"], a[href="/contracts/country_selection_modal"]'
    );
    await modalTrigger.waitFor({ state: 'visible' });
    await modalTrigger.click();

    // Sélectionner "World"
    const worldLabel = this.page.locator('label[for="area_checkbox_world"]');
    await worldLabel.waitFor({ state: 'visible' });
    await worldLabel.click();

    // Fermer le modal
    const closeButton = this.page.locator('.close-modal-button-box button').first();
    await closeButton.waitFor({ state: 'visible' });
    await closeButton.click();

    // Petite pause avant prochaine tentative
    await this.page.waitForTimeout(300);
  }

  throw new Error(`World not selected after ${maxAttempts} attempts`);
}

async selectDeclarationContacts(values: string[] = []): Promise<void> {
        await this.page.selectOption(CreateContractSelectors.declarationContactsSelect, values);
    }

async  selectPaymentTerm(term: string) {
  const chosenContainer = this.page.locator('#contract_0_contract_payment_term_id_chosen');
  await chosenContainer.locator('.chosen-single').click();
  const optionLocator = chosenContainer.locator(`.chosen-drop li:has-text("${term}")`);
  await optionLocator.waitFor({ state: 'visible' });
  await optionLocator.click();
}

async selectPaymentMode(value: string): Promise<void> {
    const chosenContainer = this.page.locator('#contract_0_contract_payment_mode_id_chosen');
    await chosenContainer.locator('.chosen-single').click();
    const optionLocator = chosenContainer.locator(`.chosen-drop li:has-text("${value}")`);
    await optionLocator.waitFor({ state: 'visible' });
    await optionLocator.click();
}


async selectCancellationTerm(value: string): Promise<void> {
  const chosenContainer = this.page.locator('#contract_0_contract_cancellation_term_id_chosen');
  await chosenContainer.locator('.chosen-single').click();
  const optionLocator = chosenContainer.locator(`.chosen-drop li:has-text("${value}")`);
  await optionLocator.waitFor({ state: 'visible' });
  await optionLocator.click();
}


async enterExpectedContractValue(value: string): Promise<void> {
        await this.page.fill(CreateContractSelectors.expectedContractValueInput, value);
    }

async submitForm() { 
    await this.page.click(CreateContractSelectors.submitButton); 
}

async expectSuccessMessage(message: string): Promise<void> {
    await expect(this.page.locator(CreateContractSelectors.successAlert)).toContainText(message);
}
}


