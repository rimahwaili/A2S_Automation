// pages/SuppliersPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { CreateSuppliersSelectors } from '../selectors/CreateSupplier.selectors';
import { SuppliersSelectors } from '../selectors/SuppliersList.selectors';

type AddressData = {
  address1: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  functionSite: string;
  otherFunctionSite?: string;
};

export class CreateSuppliersPage {
  readonly page: Page;

  // Locators
  readonly newSupplierLink: Locator;

  readonly codeTextbox: Locator;
  readonly nameTextbox: Locator;
  readonly vatNumberInput: Locator;

  readonly contactsTab: Locator;
  readonly addAddressButton: Locator;

  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly zipCodeInput: Locator;
  readonly cityInput: Locator;

  readonly countryChosenButton: Locator;
  readonly countryChosenSearch: Locator;

  readonly functionSiteChosenButton: Locator;
  readonly functionSiteChosenSearch: Locator;

  readonly otherFunctionSiteInput: Locator;

  readonly submitButton: Locator;
  readonly nameFilterInput: Locator;
  readonly firstResultCell: Locator;

  readonly tabProfile!: Locator;
  readonly tabContacts!: Locator;
  readonly tabDirectoryInfo!: Locator;
  readonly tabContracts!: Locator;
  readonly tabDocuments!: Locator;
  readonly tabActivity!: Locator;

  readonly firstRowShowLink!: Locator;
  readonly firstRowEditLink!: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstRowShowLink = page.locator(SuppliersSelectors.table.showLinkInRow);
    this.firstRowEditLink = page.locator(SuppliersSelectors.table.editLinkInRow);
    
    this.tabProfile = page.locator(CreateSuppliersSelectors.TabsSelectors.tabProfile);
    this.tabContacts = page.locator(CreateSuppliersSelectors.TabsSelectors.tabContacts);
    this.tabDirectoryInfo = page.locator(CreateSuppliersSelectors.TabsSelectors.tabDirectoryInfo);
    this.tabContracts = page.locator(CreateSuppliersSelectors.TabsSelectors.tabContracts);
    this.tabDocuments = page.locator(CreateSuppliersSelectors.TabsSelectors.tabDocuments);
    this.tabActivity = page.locator(CreateSuppliersSelectors.TabsSelectors.tabActivity);

    // navigation
    this.newSupplierLink = page.getByRole(
      CreateSuppliersSelectors.navigation.newSupplierLink.role as any,
      { name: CreateSuppliersSelectors.navigation.newSupplierLink.name }
    );

    // form
    this.codeTextbox = page.getByRole(
      CreateSuppliersSelectors.form.codeTextbox.role as any,
      { name: CreateSuppliersSelectors.form.codeTextbox.name }
    );

    this.nameTextbox = page.getByRole(
      CreateSuppliersSelectors.form.nameTextbox.role as any,
      { name: CreateSuppliersSelectors.form.nameTextbox.name }
    );

    this.vatNumberInput = page.getByLabel(CreateSuppliersSelectors.form.vatNumberLabel);

    this.contactsTab = page.getByText(CreateSuppliersSelectors.form.contactsTabText);

    this.addAddressButton = page.locator(CreateSuppliersSelectors.form.addAddressButton);

    this.address1Input = page.locator(CreateSuppliersSelectors.form.address1Input);
    this.address2Input = page.locator(CreateSuppliersSelectors.form.address2Input);
    this.zipCodeInput = page.locator(CreateSuppliersSelectors.form.zipCodeInput);
    this.cityInput = page.locator(CreateSuppliersSelectors.form.cityInput);

    this.countryChosenButton = page.locator(
      `${CreateSuppliersSelectors.form.countryChosen} .chosen-single`
    );
    this.countryChosenSearch = page.locator(
      `${CreateSuppliersSelectors.form.countryChosen} .chosen-search-input`
    );

    this.functionSiteChosenButton = page.locator(
      `${CreateSuppliersSelectors.form.functionSiteChosen} .chosen-single`
    );
    this.functionSiteChosenSearch = page.locator(
      `${CreateSuppliersSelectors.form.functionSiteChosen} .chosen-search-input`
    );

    this.otherFunctionSiteInput = page.locator(
      CreateSuppliersSelectors.form.otherFunctionSiteInput
    );

    this.submitButton = page.getByRole(
      CreateSuppliersSelectors.form.submitButton.role as any,
      { name: CreateSuppliersSelectors.form.submitButton.name }
    );

    // list
    this.nameFilterInput = page.locator(CreateSuppliersSelectors.list.nameFilterInput);
    this.firstResultCell = page.locator(CreateSuppliersSelectors.list.firstRowNameCell);
  }

  async goto() {
    await this.page.goto(CreateSuppliersSelectors.urls.base);
  }

  async openNewSupplierForm() {
    await this.newSupplierLink.click();
  }

  async fillHeaderInfo(code: string, name: string, vatNumber: string) {
    await this.codeTextbox.click();
    await this.codeTextbox.fill(code);

    await this.nameTextbox.click();
    await this.nameTextbox.fill(name);

    await this.vatNumberInput.fill(vatNumber);
  }

  async openContactsTab() {
    await this.contactsTab.click();
  }

  async clickAddAddressRow() {
    await this.addAddressButton.click();
  }

  async fillAddress(data: AddressData) {
    await this.address1Input.fill(data.address1);

    if (data.address2) {
      await this.address2Input.fill(data.address2);
    }

    await this.zipCodeInput.fill(data.zipCode);
    await this.cityInput.fill(data.city);

    // country via Chosen
    await this.countryChosenButton.click();
    await this.countryChosenSearch.fill(data.country);
    await this.page.locator('.chosen-results li', { hasText: data.country }).click();

    // function site via Chosen
    await this.functionSiteChosenButton.click();
    await this.functionSiteChosenSearch.fill(data.functionSite);
    await this.page
      .locator('.chosen-results li', { hasText: data.functionSite })
      .click();

    if (data.otherFunctionSite) {
      await this.otherFunctionSiteInput.fill(data.otherFunctionSite);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
  

  async filterByName(name: string) {
    await this.nameFilterInput.fill(name);
    await this.nameFilterInput.press('Enter');
  }

  async getFirstResultText() {
    return this.firstResultCell.innerText();
  }
  async clickFirstRowShow() {
  await this.firstRowShowLink.click();
}

async verifyAllTabsExist() {
  await expect(this.tabProfile).toBeVisible();
  await expect(this.tabContacts).toBeVisible();
  await expect(this.tabDirectoryInfo).toBeVisible();
  await expect(this.tabContracts).toBeVisible();
  await expect(this.tabDocuments).toBeVisible();
  await expect(this.tabActivity).toBeVisible();
}

}
