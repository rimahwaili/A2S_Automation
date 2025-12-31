import { test,expect } from '@playwright/test';
import { ContractsPage } from '../../pages/ContractListPage';
import { ContractPage } from '../../pages/EditContractPage';
import { LoginPage } from '../../pages/LoginPage';
import { allure } from 'allure-playwright';
import { CreateContractPage } from '../../pages/CreateContractPage';


 let contractsPage: ContractsPage;



test.describe('Create Contract ', () => {
let createContractPage: CreateContractPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await loginPage.checkAndClosePendoPopupIfPresent();
    contractsPage = new ContractsPage(page);
    await contractsPage.goto();
  });

 test(' A2SQA2-2582 | @P0 Create a Valid Contract with End date less than 6 months ', async ({ page }) => {
    
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Create a Valid contract with End date less than 6 months');
    allure.severity('critical'); 
    const contractsPage = new ContractsPage(page);

    const rows = await contractsPage.getAllVisibleRows();
    await contractsPage.clickNewContract();
    
    const  createContractPage = new  CreateContractPage(page);
     // Fill contract information
    await createContractPage.selectSupplier('9271');
     const contractId: string = await createContractPage.getRandomContractNumber(8); 
    await createContractPage.enterContractNumber(contractId);
    console.log("Generated Contract Number: " + contractId);
    await createContractPage.selectContractName('Contrat cadre');
    await createContractPage.selectContractType('P1');
    await createContractPage.enterDescription('This is a test contract.');
    await createContractPage.selectCategories(['E00007 Promotional gifts']);
    await createContractPage.selectMainCategory('E00007 Promotional gifts');
    // Fill contract dates
    await createContractPage.selectSilentExtension('0');
    await createContractPage.enterActualBeginningDate('12/16/2025');
    await createContractPage.enterActualEndDate('03/31/2026');
    await createContractPage.selectBeginningQuarter('1');
    await createContractPage.enterBeginningYear('2025');
    await createContractPage.enterSigningDate('12/15/2025');
    await createContractPage.enterTheoreticalEndDate('03/03/2026');
    await createContractPage.selectEndQuarter('1');
    await createContractPage.enterEndYear('2026');
    // Fill contract terms
    await createContractPage.selectInvoicingCountry('France'); 
    await createContractPage.checkSelectedCurrency('EUR'); 
    //await createContractPage.enterDurationMonths('12');
   await createContractPage.selectCoveredCountries(['world']); 
    //await createContractPage.selectDeclarationContacts(['1']);
    await createContractPage.selectPaymentTerm('30 days end of decade');
    await createContractPage.selectPaymentMode('Transfer');
    await createContractPage.selectCancellationTerm('6 months');
    await createContractPage.enterExpectedContractValue('100000');
    // Submit form (assuming there is a submit button)
    await createContractPage.submitForm();
    // Verify success message
    await createContractPage.expectSuccessMessage('Contract was successfully created.');
    //validate the contract
    const contractPage = new ContractPage(page);
    await contractPage.assertValidateButtonVisible();
    await contractPage.assertStatus('draft');
    await contractPage.clickValidate();
    await createContractPage.expectSuccessMessage('Contract was successfully updated');
    await contractPage.assertStatus('to renew');
});



 test(' A2SQA2-2583 | @P0 Create a Valid Contract with End date more than 6 months ', async ({ page }) => {
    
    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Create a Valid contract with End date more than 6 months');
    allure.severity('critical'); 
    const contractsPage = new ContractsPage(page);

    const rows = await contractsPage.getAllVisibleRows();
    await contractsPage.clickNewContract();
    
    const  createContractPage = new  CreateContractPage(page);
     // Fill contract information
    await createContractPage.selectSupplier('9271');
     const contractId: string = await createContractPage.getRandomContractNumber(8); 
    await createContractPage.enterContractNumber(contractId);
    console.log("Generated Contract Number: " + contractId);
    await createContractPage.selectContractName('Contrat cadre');
    await createContractPage.selectContractType('P1');
    await createContractPage.enterDescription('This is a test contract.');
    await createContractPage.selectCategories(['E00007 Promotional gifts']);
    await createContractPage.selectMainCategory('E00007 Promotional gifts');
    // Fill contract dates
    await createContractPage.selectSilentExtension('0');
    await createContractPage.enterActualBeginningDate('12/16/2025');
    await createContractPage.enterActualEndDate('12/31/2026');
    await createContractPage.selectBeginningQuarter('1');
    await createContractPage.enterBeginningYear('2025');
    await createContractPage.enterSigningDate('12/15/2025');
    await createContractPage.enterTheoreticalEndDate('12/31/2026');
    await createContractPage.selectEndQuarter('4');
    await createContractPage.enterEndYear('2026');
    // Fill contract terms
    await createContractPage.selectInvoicingCountry('France'); 
    await createContractPage.checkSelectedCurrency('EUR'); 
    //await createContractPage.enterDurationMonths('12');
   await createContractPage.selectCoveredCountries(['world']); 
    //await createContractPage.selectDeclarationContacts(['1']);
    await createContractPage.selectPaymentTerm('30 days end of decade');
    await createContractPage.selectPaymentMode('Transfer');
    await createContractPage.selectCancellationTerm('6 months');
    await createContractPage.enterExpectedContractValue('100000');
    // Submit form (assuming there is a submit button)
    await createContractPage.submitForm();
    // Verify success message
    await createContractPage.expectSuccessMessage('Contract was successfully created.');
    //validate the contract
    const contractPage = new ContractPage(page);
    await contractPage.assertValidateButtonVisible();
    await contractPage.assertStatus('draft');
    await contractPage.clickValidate();
    await createContractPage.expectSuccessMessage('Contract was successfully updated');
    await contractPage.assertStatus('valid');
});
});