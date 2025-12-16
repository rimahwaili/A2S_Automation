import { Locator, Page, expect } from '@playwright/test';
import { contractPageElements } from '../selectors/ContractEdit.selectors';

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

async getInvoicingCountry(): Promise<string> {
  const value = await this.getFieldValue(this.invoicingCountryField);
  console.log('invoicingCountryField:', value);
  return value;
}

async getDeclarationFrequency(): Promise<string> {
  const value = await this.getFieldValue(this.declarationFrequencyField);
  console.log('declarationFrequencyField:', value);
  return value;
}

async assertValidateButtonVisible() {
    await expect(this.validate).toBeVisible();
    await expect(this.validate).toBeEnabled();
  }

  async clickValidate() {
    await this.validate.click();
  }
}
