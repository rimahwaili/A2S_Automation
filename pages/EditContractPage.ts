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
  readonly archiveModal: Locator;   // archive = confirm-dates
  readonly renewModal: Locator;     // renew = same modal
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

  constructor(page: Page) {
    this.page = page;

    this.editButton = page.locator(contractPageElements.actions.editButton);
    this.contractstatus = page.locator(contractPageElements.actions.contractstatus);
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
this.endQuarterSelect = this.modal.locator('select[name$="[end_quarter]"]');
this.endYearInput = this.modal.locator('input[name$="[end_year]"]');
this.actualEndDateInput = this.modal.locator('input[name$="[actual_end_date]"][type="text"]');
this.confirmStep1Btn = this.modal.locator('#confirm-dates-to-step-2');
    this.confirmFinalBtn = page.locator('#confirm-dates');

    this.step2 = page.locator('.step-2');

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

async assertStatus(expectedStatus: string) {
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
    await expect(this.renewModal).toBeVisible();
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

  // The confirm button is disabled until fields are enabled by JS.
  // Force user interaction to trigger enable logic.
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
}
