import { Locator, Page, expect } from '@playwright/test';
import { contractPageElements } from '../selectors/ContractEdit.selectors';
import { Version } from '../helpers/versioning.helper';
import { CreateSuppliersPage } from './CreateSuppliersPage';
import { CreateSuppliersSelectors } from '../selectors/CreateSupplier.selectors';

export class ContractPage {
  readonly page: Page;

  // Boutons
  readonly backToListBtn: Locator;
  readonly errorBtn: Locator;
  readonly archiveBtn: Locator;
  readonly versioningBtn: Locator;
  readonly renewBtn: Locator;
  readonly submitBtn: Locator;

  // Modales
  readonly errorModal: Locator;
  readonly archiveModal: Locator;   
  readonly renewModal: Locator;     
  readonly versionModal: Locator;
  readonly submitModal: Locator;
  //actions
  readonly editButton: Locator;
  readonly contractstatus: Locator;


   //error modale
    readonly modalTitle: Locator;
    readonly confirmAndSaveBtn: Locator;
    readonly cancelBtn: Locator;

    //archive modale
    readonly modal: Locator;

    readonly endQuarterSelect: Locator;
    readonly endYearInput: Locator;
    readonly actualEndDateInput: Locator;

    readonly confirmStep1Btn: Locator;
    readonly confirmFinalBtn: Locator;

    readonly step2: Locator;
    //new contract
    readonly NewContractTitle: Locator;
    readonly NewContractStatus: Locator;
    readonly originalContract: Locator;

    readonly supplierField: Locator;
    readonly invoicingCountryField: Locator;
    readonly declarationFrequencyField: Locator;
    readonly validate: Locator;
    readonly saveDraftButton: Locator;

    //versioning
    readonly versioningModal: Locator;
    readonly versioningWarningText: Locator;
    readonly versioningSubmitButton: Locator;
// confirmation modal
    readonly confirmationModal: Locator; 
    readonly yesButton: Locator ;  
    readonly contactsTab: Locator;
      
  constructor(page: Page) {
    this.page = page;

    this.editButton = page.locator(contractPageElements.actions.editButton);
    this.contractstatus = page.locator(contractPageElements.actions.contractstatus);
    this.validate = this.page.locator(contractPageElements.buttons.validate);
    // ----- BUTTONS -----
    this.backToListBtn = page.locator(contractPageElements.buttons.back);
    this.errorBtn = page.locator(contractPageElements.buttons.error);
    this.archiveBtn = page.locator(contractPageElements.buttons.archive);
    this.versioningBtn = page.locator(contractPageElements.buttons.versioning);
    this.renewBtn = page.locator(contractPageElements.buttons.renew);
    this.submitBtn = page.locator(contractPageElements.buttons.submit);

    // ----- MODALS -----
    this.errorModal = page.locator(contractPageElements.modals.error);
    this.archiveModal = page.locator(contractPageElements.modals.archive);
    this.renewModal = page.locator(contractPageElements.modals.renew);
    this.versionModal = page.locator(contractPageElements.modals.versioning);
    this.submitModal = page.locator(contractPageElements.modals.submit);

    //error modale:
    this.modalTitle = page.locator(contractPageElements.errormodale.modalTitle);
    this.confirmAndSaveBtn = page.locator(contractPageElements.errormodale.confirmAndSaveBtn);
    this.cancelBtn = page.locator(contractPageElements.errormodale.cancelBtn);

    //archive modale:
    this.modal = page.locator('.modal-body');
    this.endQuarterSelect = this.modal.locator(contractPageElements.archivemodale.endQuarterSelect);
    this.endYearInput = this.modal.locator(contractPageElements.archivemodale.endYearInput);
    this.actualEndDateInput = this.modal.locator(contractPageElements.archivemodale.actualEndDateInput);
    this.confirmStep1Btn = this.modal.locator(contractPageElements.archivemodale.confirmStep1Btn);
    this.confirmFinalBtn = page.locator(contractPageElements.archivemodale.confirmFinalBtn);

    this.step2 = page.locator('.step-2');

    this.NewContractTitle = page.locator(contractPageElements.NewContractSelectors.workflowTitle);
    this.NewContractStatus = page.locator(contractPageElements.NewContractSelectors.status);
    this.originalContract = page.locator(contractPageElements.NewContractSelectors.originalContract);

    //contract details
    this.supplierField = page.locator(contractPageElements.contractdetails.supplierField);
    this.invoicingCountryField = page.locator(contractPageElements.contractdetails.invoicingCountryField);
    this.declarationFrequencyField = page.locator(contractPageElements.contractdetails.declarationFrequencyField);
  
    this.supplierField = page.locator(contractPageElements.contractdetails.supplierField);
    this.versioningModal = page.locator('.modal-body');
    this.versioningWarningText = this.modal.locator('.modal-text');
    this.versioningSubmitButton = this.modal.getByRole('link', { name: 'Submit' });
    this.saveDraftButton = page.locator(contractPageElements.buttons.saveDraft);
    // confirmation modal
    this.confirmationModal = page.locator('[data-window="general-confirmation-modal"]');
    this.yesButton = this.confirmationModal.getByRole('button', { name: 'Yes' });


    this.contactsTab = page.getByText(CreateSuppliersSelectors.form.contactsTabText);
  }

  // Naviguer vers un contrat donné
  async goto(contractId: number = 37266) {
    await this.page.goto(`/contracts/${contractId}`);
  }

  // La page est prête lorsqu’un bouton clé est visible
  async waitForReady() {
    await this.backToListBtn.waitFor();
  }

  // ----- ACTIONS -----

  async clickBackToList() {
    await this.backToListBtn.click();
  }
 async EditContract() {
    await this.editButton.click();
  }

  async clickError() {
    await this.errorBtn.click();
    await expect(this.errorModal).toBeVisible();
  }

  async confirmError() {
    await this.confirmAndSaveBtn.click();
  }

async assertStatusVerification(expectedStatus: string) {
  const actualStatus = (await this.contractstatus.textContent())?.trim() ?? '';
  if (actualStatus.toLowerCase() !== expectedStatus.toLowerCase()) {
    throw new Error(`Expected status "${expectedStatus}", but got "${actualStatus}"`);
  }
}


  async clickArchive() {
    await this.archiveBtn.click();
    await expect(this.modal).toBeVisible();
  }

  async clickVersioning() {
    await this.versioningBtn.click();
    await expect(this.versionModal).toBeVisible();
  }

  async clickRenew() {
    await this.renewBtn.click();
    //await expect(this.renewModal).toBeVisible();
  }

  async clickSubmit() {
    await this.submitBtn.click();
    await expect(this.submitModal).toBeVisible();
  }
async fillStep1Data() {
  // Wait for the modal
  await this.modal.waitFor({ state: "visible" });

  // Wait for JS to finish initialization
  await this.page.waitForTimeout(300);
  await this.modal.click(); 
}

 async VersioningexpectVisible() {
    await expect(this.versionModal).toBeVisible();
  }

  async VersioningexpectWarningText() {
    await expect(this.versioningWarningText).toContainText(
      'do you confirm this action'
    );
  }

  async submitVersioning() {
    await Promise.all([
      this.versioningSubmitButton.click(),
    ]);
  }

 async setDeclarativeEndQuarter(value: string) {
  await this.endQuarterSelect.first().click({ force: true });
  await this.endQuarterSelect.first().selectOption(value, { force: true });
}

async setDeclarativeEndYear(year: string) {
  await this.endYearInput.first().fill(year, { force: true });
}

async setActualEndDate(date: string) {
  await this.actualEndDateInput.first().fill(date, { force: true });
}

async confirmStep1() {
  await this.confirmStep1Btn.click();
}

async confirmFinal() {
    await this.confirmFinalBtn.click();
    await expect(this.modal).toBeHidden();
  }

async getContractTitle(): Promise<string> {
    return await this.NewContractTitle.evaluate(el => {
      const span = el.querySelector('span.title-status');
      if (span) span.remove();
      return el.textContent?.trim() ?? '';
    });
  }

  async getContractStatus(): Promise<string> {
    return await this.NewContractStatus.textContent() ?? '';
  }

async  extractVersion(text: string): Promise<Version> {
  const match = text.match(/(\d+)\.(\d+)/);
  expect(match).not.toBeNull();

  return {
    major: Number(match![1]),
    minor: Number(match![2]),
  };
}

async  assertMinorVersionIncrement(
  previous: Version,
  current: Version
): Promise<void> {
  expect(current.major).toBe(previous.major);
  expect(current.minor).toBe(previous.minor + 1);
}

async getWarningText(page: Page): Promise<string> {
  const warning = page.locator('#flash .alert-warning');
  if (await warning.count() === 0) {
    return '';
  }
  if (!(await warning.isVisible())) {
    return '';
  }
  const text = (await warning.textContent())?.trim() ?? '';
  console.log('warning message:', text);

  return text;
}

  async assertStatus(expectedStatus: string) {
    const status = await this.getContractStatus();
    expect(status.trim().toLowerCase()).toBe(expectedStatus.toLowerCase());
  }

  async  getOriginalContract(page: Page): Promise<string> {
  const contractLink = this.originalContract;
  const contractName = await contractLink.textContent();

  if (!contractName) {
    throw new Error('Original contract not found or empty');
  }
  console.log('Original contract:', contractName);
  return contractName.trim();
}

// getFieldValue accepts a Locator
async getFieldValue(field: Locator): Promise<string> {
  const hasValueAttr = (await field.getAttribute('value')) !== null;
  if (hasValueAttr) {
    return (await field.inputValue()).trim();
  }
  return (await field.innerText()).trim();
}

// Await before logging; return the awaited value (still matches Promise<string>)
async getSupplier(): Promise<string> {
  const value = await this.getFieldValue(this.supplierField);
  console.log('supplier:', value);
  return value;
}

async clickSaveDraft() {
    await this.saveDraftButton.click();
  }

async getInvoicingCountry(): Promise<string> {
  const value = await this.getFieldValue(this.invoicingCountryField);
  console.log('invoicingCountryField:', value);
  return value;
}

async getDeclarationFrequency(): Promise<string> {
  const value = await this.getFieldValue(this.declarationFrequencyField);
  console.log('Declaration frequency:', value);
  return value;
}

async assertValidateButtonVisible() {
    await expect(this.validate).toBeVisible();
    await expect(this.validate).toBeEnabled();
  }

  async clickValidate() {
    await this.validate.click();
  }

  async expectValidateEnabled() {
  await expect(this.validate).toBeEnabled();
}

async getContractId(): Promise<string | undefined> {
  const currentUrl = this.page.url();
  const match = currentUrl.match(/\/contracts\/(?:edit|show)\/(\d+)/);
  const contractId = match?.[1];
  console.log('Contract ID:', contractId);
  return contractId;
}
async waitUntilValidateEnabled(maxWaitMs = 180_000) {
  const interval = 10_000; // 10 seconds
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    console.log('Page reloaded, checking Validate link...');

    const validateButton = this.page.locator('a.astore-main-button.modal-btn:has-text("Validate")');

    if (await validateButton.count() > 0 && await validateButton.isVisible()) {
      console.log('Validate link is visible! Clicking...');
      await validateButton.click();

      // Define modal and yes button AFTER clicking the link
      const confirmationModal = this.page.locator('#js-confirmation-modal-section');
      const yesButton = confirmationModal.locator('button.js-confirm-with-params:has-text("Yes")');

      // Wait for modal and button to appear
      await confirmationModal.waitFor({ state: 'visible', timeout: 15000 });
      console.log('Confirmation modal is visible');

      await yesButton.waitFor({ state: 'visible', timeout: 10000 });
      await yesButton.click();
      console.log('Clicked Yes button in modal');

      return;
    }

    console.log('Validate link not ready yet, waiting for next reload...');
    await this.page.waitForTimeout(interval);
  }

  throw new Error('Validate link did not become ready within timeout');
}

 async clickInvoicingTab() {
    const invoicingTab = this.page.locator('.scope-filter[data-scope-id="2"]');
    console.log('➡ Clicking "Invoicing Information" tab...');
    await invoicingTab.click();
  }

  async tabHasError(): Promise<boolean> {
    const invoicingTab = this.page.locator('.scope-filter[data-scope-id="2"]');
    const errorTitle = await invoicingTab.getAttribute('data-error-title');
    console.log(`ℹ️ Tab error title: ${errorTitle}`);
    return !!errorTitle;
  }

async  ensureInvoicingContactSelected(): Promise<number> {
  console.log('➡ Ensuring we are on the contract page');

  if (!this.page.url().match(/\/contracts\/edit\/\d+/)) {
    console.log('⏳ Waiting for contract page navigation...');
    await this.page.waitForURL(/\/contracts\/edit\/\d+/, { timeout: 15000 });
  }

  console.log('✅ Contract page loaded');
  const invoicingTab = this.page.locator('.scope-filter[data-scope-id="2"]');
  await invoicingTab.waitFor({ state: 'attached', timeout: 5000 });
  await invoicingTab.click({ force: true });
  console.log('✅ Invoicing tab clicked');

  //await expect(invoicingTab).toHaveClass(/active-scope/, { timeout: 5000 });
  const contacts = this.page.locator(
    'li[data-field="invoicing_contacts"] a'
  );
  const count = await contacts.count();

  if (count === 0) {
    console.log('⚠️ No invoicing contacts found');
  }
else{
  const emails = await contacts.allTextContents();
  console.log(`✅ Invoicing contacts found: ${emails.join(', ')}`);
}
  return count;

}


async getSupplierInfo(): Promise<{url: string} | null> {
    const supplierLink = this.page.locator('span[data-field="supplier"] a');
    if (await supplierLink.count() === 0) {
      console.log('⚠ No supplier link found');
      return null;
    }

    const url = (await supplierLink.getAttribute('href')) || '';
    const name = (await supplierLink.textContent())?.trim() || '';

    console.log('Supplier URL:', url);
    console.log('Supplier Name:', name);

    return { url};
  }

async goToSupplier(): Promise<void> {
  const info = await this.getSupplierInfo();
  if (!info?.url) {
    console.log('⚠ Cannot navigate — supplier link not found');
    return;
  }
  const supplierPage = await this.page.context().newPage();
  const supplierId = info.url.split('/').pop();
  console.log('url edited:',`/suppliers/edit/${supplierId}`);

  await supplierPage.goto(
  `/suppliers/edit/${supplierId}`);

  console.log('✅ Supplier page loaded in new tab');
  this.openTab(supplierPage, 'contact-radio');
  await this.editFirstSupplierContact(supplierPage);
}


async openTab(page: Page, id: string) {
  await page.evaluate((id) => {
    const label = document.querySelector<HTMLLabelElement>(`.tabs-box label[for="${id}"]`);
    if (!label) throw new Error(`Tab ${id} not found`);
    label.click();
  }, id);
  console.log(`✅ Opened tab with id: ${id}`);
  
}


async checkFirstContactInvoicing(): Promise<boolean> {
  // Sélectionne la première ligne du tableau des contacts
  const firstContactRow = this.page.locator("table:has-text(\"Supplier's Contacts\") tbody tr").first();

  // Sélectionne la cellule "Invoicing" (ici la 7e colonne, index 6)
  const invoicingCell = firstContactRow.locator("td").nth(6);

  // Récupère le texte de la cellule
  const cellText = await invoicingCell.textContent();

  // Vérifie si la cellule contient le check (✓)
  const isChecked = cellText?.trim() === '✓';

  console.log(`✅ Premier contact invoicing checked ? ${isChecked}`);
  return isChecked;
}


async editFirstSupplierContact(page:Page): Promise<void> {

const tbody = page.locator('tbody[aria-live="polite"]');

  // Récupérer toutes les lignes de contacts
  const rows = tbody.locator('tr[id^="nested_contact_module_"]');
  const rowCount = await rows.count();
  console.log('Rows found:', rowCount);
  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const contactType = await row
      .locator('td.nested_contact_kind span')
      .innerText();
    console.log('contact type:', contactType);

    if (contactType.trim() === 'Supplier') {
      const invoicingCheckbox = row.locator(
        'td.nested_financial input[type="checkbox"]'
      );
      await invoicingCheckbox.scrollIntoViewIfNeeded();

      if (!(await invoicingCheckbox.isChecked())) {
        await invoicingCheckbox.check();
        console.log(`✅ Checked Invoicing for Supplier row ${i + 1}`);
      } else {
        console.log(`ℹ️ Invoicing already checked for Supplier row ${i + 1}`);
      }

      break;
    }
  }

}

}