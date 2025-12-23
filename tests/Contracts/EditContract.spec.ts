import { test,expect } from '@playwright/test';
import { ContractsPage } from '../../pages/ContractListPage';
import { ContractPage } from '../../pages/EditContractPage';
import { LoginPage } from '../../pages/LoginPage';
import { allure } from 'allure-playwright';

test.setTimeout(300_000);

 let contractsPage: ContractsPage;
 test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    contractsPage = new ContractsPage(page);
    await contractsPage.goto();
  });

test.describe('Move Contract into Error', () => {
  test(' 2SQA2-2562 | @P0 Move contract status from to renew into Error ', async ({ page }) => {

    
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Move contract status into Error');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToRenewtab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusToRenew = await contractPage.assertStatus('to renew');
    await contractPage.EditContract();
    await contractPage.clickError();
    await contractPage.confirmError();
    const isStatusEEor = await contractPage.assertStatus('Error');
  });

test(' 2SQA2-2560 | @P0 Move contract status from Valid into Error ', async ({ page }) => {

    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Move contract status into Error');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToValidTab();
    const rows = await contractsPage.getAllVisibleRows();
 
    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusToRenew = await contractPage.assertStatus('valid');
    await contractPage.EditContract();
    await contractPage.clickError();
    await contractPage.confirmError();
    const isStatusEEor = await contractPage.assertStatus('Error');
});

test(' 2SQA2-2561 | @P0 Move contract status from Expired into Error ', async ({ page }) => {

    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Move contract status into Error');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToExpiredTab();
    const rows = await contractsPage.getAllVisibleRows();
    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusToRenew = await contractPage.assertStatus('expired');
    await contractPage.EditContract();
    await contractPage.clickError();
    await contractPage.confirmError();
    const isStatusEEor = await contractPage.assertStatus('Error');
});

});

test.describe('Move Contract into Archived  ', () =>{
 test(' 2SQA2-2567 | @P0 Move contract status from valid into Archived', async ({ page }) => {

    
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Move contract status into Archived');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToValidTab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusvalid = await contractPage.assertStatus('valid');
    await contractPage.EditContract();

    await contractPage.clickArchive();
    await contractPage.fillStep1Data();
    await contractPage.setDeclarativeEndQuarter('4'); 
  await contractPage.setDeclarativeEndYear('2027');
  await contractPage.setActualEndDate('12/29/2027');
 await contractPage.endYearInput.first().click();
  await contractPage.confirmStep1();  
  await contractPage.confirmFinal();  
    const isStatusArchived = await contractPage.assertStatus('Archived');
  });

  test(' 2SQA2-2566 | @P0 Move contract status from To renew into Archived', async ({ page }) => {
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Move contract status into Archived');
    allure.severity('critical'); 


    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToRenewtab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusvalid = await contractPage.assertStatus('to renew');
    await contractPage.EditContract();

    await contractPage.clickArchive();
    await contractPage.fillStep1Data();
    await contractPage.setDeclarativeEndQuarter('4'); 
    await contractPage.setDeclarativeEndYear('2027');
    await contractPage.setActualEndDate('12/29/2027');
    await contractPage.endYearInput.first().click();  
    await contractPage.confirmStep1();  
    await contractPage.confirmFinal();  
    const isStatusArchived = await contractPage.assertStatus('Archived');
  });


  test(' 2SQA2-2568 | @P0 Move contract status from Expired into Archived', async ({ page }) => {

    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Move contract status into Archived');
    allure.severity('critical'); 
    
    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToExpiredTab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusvalid = await contractPage.assertStatus('expired');
    await contractPage.EditContract();

    await contractPage.clickArchive();
    await contractPage.fillStep1Data();
    await contractPage.setDeclarativeEndQuarter('4'); 
  await contractPage.setDeclarativeEndYear('2027');
  await contractPage.setActualEndDate('12/29/2027');
 
  await contractPage.confirmFinal();  
    const isStatusArchived = await contractPage.assertStatus('Archived');
  });

});

test.describe('Renew Contract ', () => {
  test(' A2SQA2-2572 | @P0 Renew Valid Contract', async ({ page }) => {
    
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Renew contract');
    allure.severity('critical'); 
    
    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToValidTab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusvalid = await contractPage.assertStatus('valid');
    await contractPage.EditContract();

    await contractPage.getDeclarationFrequency();
    await contractPage.getSupplier();
    await contractPage.getInvoicingCountry();

    await contractPage.clickRenew();
    await contractPage.setDeclarativeEndQuarter('4'); 
    await contractPage.setDeclarativeEndYear('2027');
    await contractPage.setActualEndDate('12/29/2027');
    await contractPage.confirmStep1();  
    

    const context = page.context();
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    contractPage.confirmFinal() ]);
    await newPage.waitForLoadState();

    const pages = page.context().pages();
    const firstPage = pages[0];
    const secondPage = pages[1];
    const isStatusArchived = await contractPage.assertStatus('archived');
    const titlePage1 = await contractPage.getContractTitle();
    await firstPage.bringToFront();
    console.log('Page 1:', titlePage1);
 
    const newcontractPage = new ContractPage(secondPage);

    await newcontractPage.EditContract();
    await newcontractPage.page.reload();

    const titlePage2 = await newcontractPage.getContractTitle();

   console.log('Page 2:', titlePage2);


    expect(titlePage2.includes(titlePage1.split(' - ')[1])).toBe(true);

    await newcontractPage.page.reload();
    await newcontractPage.assertStatus('draft');

  });

  test(' A2SQA2-2573 | @P0 Renew To Renew Contract', async ({ page }) => {

    
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Renew contract');
    allure.severity('critical'); 
    
    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToRenewtab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusvalid = await contractPage.assertStatus('To Renew');
    await contractPage.EditContract();

    await contractPage.getDeclarationFrequency();
    await contractPage.getSupplier();
    await contractPage.getInvoicingCountry();

    await contractPage.clickRenew();
    await contractPage.setDeclarativeEndQuarter('4'); 
    await contractPage.setDeclarativeEndYear('2027');
    await contractPage.setActualEndDate('12/29/2027');
    
    const context = page.context();
    //await contractPage.confirmStep1(); 
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    contractPage.confirmFinal() ]);
    await newPage.waitForLoadState();

    const pages = page.context().pages();
    const firstPage = pages[0];
    const secondPage = pages[1];
    const isStatusArchived = await contractPage.assertStatus('archived');
    const titlePage1 = await contractPage.getContractTitle();
    await firstPage.bringToFront();

    console.log('Page 1:', titlePage1);
 
    const newcontractPage = new ContractPage(secondPage);

    await newcontractPage.EditContract();
    await newcontractPage.page.reload();

    const titlePage2 = await newcontractPage.getContractTitle();

   console.log('Page 2:', titlePage2);

    // Compare titres
    expect(titlePage2.includes(titlePage1.split(' - ')[1])).toBe(true);

    // Vérifie statut Page 2
    await newcontractPage.page.reload();
    await newcontractPage.assertStatus('draft');

  });


test(' A2SQA2-2573 | @P0 Renew Expired Contract', async ({ page }) => {
   
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Renew contract');
    allure.severity('critical'); 
    
    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToExpiredTab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
    const contractid =  contractsPage.getContractId();
    await contractPage.waitForReady();
    const isStatusvalid = await contractPage.assertStatus('expired');
    await contractPage.EditContract();

    await contractPage.getDeclarationFrequency();
    await contractPage.getSupplier();
    await contractPage.getInvoicingCountry();


    await contractPage.clickRenew();
    await contractPage.setDeclarativeEndQuarter('4'); 
    await contractPage.setDeclarativeEndYear('2027');
    await contractPage.setActualEndDate('12/29/2027');

    const context = page.context();
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    contractPage.confirmFinal() ]);
    await newPage.waitForLoadState();

    const pages = page.context().pages();
    const firstPage = pages[0];
    const secondPage = pages[1];
    const isStatusArchived = await contractPage.assertStatus('archived');
    const titlePage1 = await contractPage.getContractTitle();
    await firstPage.bringToFront();

    console.log('contract id 1:', titlePage1);
 
    const newcontractPage = new ContractPage(secondPage);

    await newcontractPage.EditContract();
    await newcontractPage.page.reload();

    const titlePage2 = await newcontractPage.getContractTitle();

   console.log('contract id 2:', titlePage2);

    // Compare titres
    expect(titlePage2.includes(titlePage1.split(' - ')[1])).toBe(true);

    // Vérifie statut Page 2
    await newcontractPage.page.reload();
    await newcontractPage.assertStatus('draft');

  });


 });

test.describe('Versionning Contract ', () => {

  test('A2SQA2-2570 | @P0 Versionning Valid Contract', async ({ page }) => {
  allure.label('feature', 'Contract');
  allure.epic('Contract');
  allure.story('Versionning contract');
  allure.severity('critical');

  const contractsPage = new ContractsPage(page);
  const contractPage = new ContractPage(page);

  await contractsPage.clickToValidTab();
  await contractsPage.sortByStartDateMajorMinor();
  await contractsPage.openFirstContract(1);

  //const contractid = contractsPage.getContractId(); 
  await contractPage.waitForReady(); 
  const isStatusvalid = await contractPage.assertStatus('valid'); 
  await contractPage.EditContract();
  await contractPage.getDeclarationFrequency();
  await contractPage.getSupplier();
  await contractPage.getInvoicingCountry();

  await contractPage.clickVersioning();
  await contractPage.VersioningexpectVisible();
  await contractPage.VersioningexpectWarningText();

const [versionedPage] = await Promise.all([
  page.context().waitForEvent('page'),
  contractPage.submitVersioning(),
]);

// 🔁 RELOAD original page
await page.reload({ waitUntil: 'domcontentloaded' });
await contractPage.waitForReady();
await contractPage.assertStatus('error');

const oldTitle = await contractPage.getContractTitle();
const oldVersion = await contractPage.extractVersion(oldTitle);

// New version tab
const newContractPage = new ContractPage(versionedPage);
await versionedPage.bringToFront();

// 🔁 RELOAD new page
await versionedPage.reload({ waitUntil: 'domcontentloaded' });
await newContractPage.waitForReady();

await newContractPage.EditContract();

const titlePage2 = await newContractPage.getContractTitle();
const newVersion = await newContractPage.extractVersion(titlePage2);

// Warning text (optional)
const warningText = await newContractPage.getWarningText(versionedPage);

// Version assertion
newContractPage.assertMinorVersionIncrement(oldVersion, newVersion);
const contractnewid = newContractPage.getContractId(); 
// Status assertion
//await newContractPage.assertStatus('draft');
console.log('Polling for Validate button (max 3 minutes)...');

await newContractPage.waitUntilValidateEnabled(300_000);
});


test('A2SQA2-2569 | @P0 Versionning Expired Contract', async ({ page }) => {
  allure.label('feature', 'Contract');
  allure.epic('Contract');
  allure.story('Versionning contract');
  allure.severity('critical');

  const contractsPage = new ContractsPage(page);
  const contractPage = new ContractPage(page);

  await contractsPage.clickToExpiredTab();
  await contractsPage.sortByStartDateMajorMinor();
  await contractsPage.openFirstContract(1);

  const contractid = contractsPage.getContractId(); 
  await contractPage.waitForReady(); 
  const isStatusvalid = await contractPage.assertStatus('expired'); 
  await contractPage.EditContract();
  await contractPage.getDeclarationFrequency();
  await contractPage.getSupplier();
  await contractPage.getInvoicingCountry();

  await contractPage.clickVersioning();
  await contractPage.VersioningexpectVisible();
  await contractPage.VersioningexpectWarningText();

const [versionedPage] = await Promise.all([
  page.context().waitForEvent('page'),
  contractPage.submitVersioning(),
]);

// 🔁 RELOAD original page
await page.reload({ waitUntil: 'domcontentloaded' });
await contractPage.waitForReady();
await contractPage.assertStatus('error');

const oldTitle = await contractPage.getContractTitle();
const oldVersion = await contractPage.extractVersion(oldTitle);

// New version tab
const newContractPage = new ContractPage(versionedPage);
await versionedPage.bringToFront();

// 🔁 RELOAD new page
await versionedPage.reload({ waitUntil: 'domcontentloaded' });
await newContractPage.waitForReady();

await newContractPage.EditContract();

const titlePage2 = await newContractPage.getContractTitle();
const newVersion = await newContractPage.extractVersion(titlePage2);

// Warning text (optional)
const warningText = await newContractPage.getWarningText(versionedPage);

// Version assertion
newContractPage.assertMinorVersionIncrement(oldVersion, newVersion);
const contractnewid = newContractPage.getContractId(); 
// Status assertion
//await newContractPage.assertStatus('draft');
console.log('Polling for Validate button (max 3 minutes)...');

await newContractPage.waitUntilValidateEnabled(300_000);
});


test('A2SQA2-2571 | @P0 Versionning To renew Contract', async ({ page }) => {
  allure.label('feature', 'Contract');
  allure.epic('Contract');
  allure.story('Versionning contract');
  allure.severity('critical');

  const contractsPage = new ContractsPage(page);
  const contractPage = new ContractPage(page);

  await contractsPage.clickToRenewtab();
  await contractsPage.sortByStartDateMajorMinor();
  await contractsPage.openFirstContract(1);


  await contractPage.waitForReady(); 
  const isStatusvalid = await contractPage.assertStatus('to renew'); 
  await contractPage.EditContract();
  const contractid = contractPage.getContractId(); 
  await contractPage.getDeclarationFrequency();
  await contractPage.getSupplier();
  await contractPage.getInvoicingCountry();

  await contractPage.clickVersioning();
  await contractPage.VersioningexpectVisible();
  await contractPage.VersioningexpectWarningText();

const [versionedPage] = await Promise.all([
  page.context().waitForEvent('page'),
  contractPage.submitVersioning(),
]);

// 🔁 RELOAD original page
await page.reload({ waitUntil: 'domcontentloaded' });
await contractPage.waitForReady();
await contractPage.assertStatus('error');

const oldTitle = await contractPage.getContractTitle();
const oldVersion = await contractPage.extractVersion(oldTitle);

// New version tab
const newContractPage = new ContractPage(versionedPage);
await versionedPage.bringToFront();

// 🔁 RELOAD new page
await versionedPage.reload({ waitUntil: 'domcontentloaded' });
await newContractPage.waitForReady();

await newContractPage.EditContract();

const titlePage2 = await newContractPage.getContractTitle();
const newVersion = await newContractPage.extractVersion(titlePage2);

// Warning text (optional)
const warningText = await newContractPage.getWarningText(versionedPage);

// Version assertion
newContractPage.assertMinorVersionIncrement(oldVersion, newVersion);
const contractnewid = newContractPage.getContractId(); 
// Status assertion
//await newContractPage.assertStatus('draft');
console.log('Polling for Validate button (max 3 minutes)...');

await newContractPage.waitUntilValidateEnabled(300_000);



});
});