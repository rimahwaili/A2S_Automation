import { test,expect } from '@playwright/test';
import { ContractsPage } from '../../pages/ContractListPage';
import { ContractPage } from '../../pages/EditContractPage';
import { LoginPage } from '../../pages/LoginPage';
import { allure } from 'allure-playwright';
import { CreateContractPage } from '../../pages/CreateContractPage';
import { DeclarativeCampaignsPage } from '../../pages/declarativeCompaigns/DeclarativeCompainsPage';
import { CampaignParticipationsListPage } from '../../pages/declarativeCompaigns/campaignParticipationsList.page';
import { DeclarationScope } from '../../enums/declarationScope.enum';

test.setTimeout(300_000);
let contractsPage: ContractsPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await loginPage.checkAndClosePendoPopupIfPresent();
    contractsPage = new ContractsPage(page);
    await contractsPage.goto();
  });

test.describe('Create a valid Contract ', () => {
let createContractPage: CreateContractPage;

 test(' A2SQA2-2582 | @P0 Create a Valid Contract with End date less than 6 months ', async ({ page }) => {

    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('Create a Valid Contract with End date less than 6 months');
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
    await createContractPage.submitForm();
    await createContractPage.expectSuccessMessage('Contract was successfully created.');
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
    allure.story('Create a Valid Contract with End date more than 6 months');
    allure.severity('critical'); 

    const contractsPage = new ContractsPage(page);
    const rows = await contractsPage.getAllVisibleRows();
    await contractsPage.clickNewContract();
    const  createContractPage = new  CreateContractPage(page);
    await createContractPage.selectSupplier('9271');
     const contractId: string = await createContractPage.getRandomContractNumber(8); 
    await createContractPage.enterContractNumber(contractId);
    
    console.log("Generated Contract Number: " + contractId);
    await createContractPage.selectContractName('Contrat cadre');
    await createContractPage.selectContractType('P1');
    await createContractPage.enterDescription('This is a test contract.');
    await createContractPage.selectCategories(['E00007 Promotional gifts']);
    await createContractPage.selectMainCategory('E00007 Promotional gifts');

    await createContractPage.selectSilentExtension('0');
    await createContractPage.enterActualBeginningDate('12/16/2025');
    await createContractPage.enterActualEndDate('12/31/2026');
    await createContractPage.selectBeginningQuarter('1');
    await createContractPage.enterBeginningYear('2025');
    await createContractPage.enterSigningDate('12/15/2025');
    await createContractPage.enterTheoreticalEndDate('12/31/2026');
    await createContractPage.selectEndQuarter('4');
    await createContractPage.enterEndYear('2026');

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

    const contractPage = new ContractPage(page);
    await contractPage.assertValidateButtonVisible();
    await contractPage.assertStatus('draft');
    await contractPage.clickValidate();
    await createContractPage.expectSuccessMessage('Contract was successfully updated');
    await contractPage.assertStatus('valid');
});
});
test.describe('Create a valid Contract with diffrent services', () => {
let createContractPage: CreateContractPage;
let contractPage: ContractPage;
test(' A2SQA2-2603 | @P0 contract creation with service CA/TO ', async ({ page }) => {

    allure.label('feature', 'Contract');
    allure.epic('Contract');
    allure.story('contract creation with service CA/TO');
    allure.severity('critical'); 
    const contractsPage = new ContractsPage(page);
    const contractPage = new ContractPage(page);

    const rows = await contractsPage.getAllVisibleRows();
    await contractsPage.clickNewContract();
    const  createContractPage = new  CreateContractPage(page);

    await createContractPage.selectSupplier('9271');
    const contractId: string = await createContractPage.getRandomContractNumber(8); 
    await createContractPage.enterContractNumber(contractId);
    console.log("Generated Contract Number: " + contractId);
    await createContractPage.selectContractName('Contrat cadre');
    await createContractPage.selectContractType('P1');
    await createContractPage.enterDescription('This is a test contract.');
    await createContractPage.selectCategories(['E00007 Promotional gifts']);
    await createContractPage.selectMainCategory('E00007 Promotional gifts');
    await createContractPage.chooseFrequencies({serviceFrequency: 'for each service',declarationFrequency: 'quarterly',});
    await createContractPage.selectSilentExtension('0');
    await createContractPage.enterActualBeginningDate('01/01/2025');
    await createContractPage.enterActualEndDate('12/31/2026');
    await createContractPage.selectBeginningQuarter('1');
    await createContractPage.enterBeginningYear('2025');
    await createContractPage.enterSigningDate('01/01/2025');
    await createContractPage.enterTheoreticalEndDate('12/31/2026');
    await createContractPage.selectEndQuarter('4');
    await createContractPage.enterEndYear('2026');
    await createContractPage.selectInvoicingCountry('France'); 
    await createContractPage.checkSelectedCurrency('EUR'); 
    await createContractPage.selectCoveredCountries(['world']); 
    await createContractPage.selectPaymentTerm('30 days end of decade');
    await createContractPage.selectPaymentMode('Transfer');
    await createContractPage.selectCancellationTerm('6 months');
    await createContractPage.enterExpectedContractValue('100000');
    await createContractPage.submitForm();
    await createContractPage.expectSuccessMessage('Contract was successfully created.');
    await contractPage.clickScopeTabByText('Services');
    await contractPage.addNewService('Mobilisation Fee', {description: 'Initial setup fee',maxAmount: '5000',vat: '20',});
    await contractPage.editSubService('Self And Assoc');
    await contractPage.setUnitAndValue('TO','10');
    await contractPage.checkSubserviceValue('Mobilisation Fee', '10');
    await contractPage.clickValidate();  
   
    const listPage = new DeclarativeCampaignsPage(page);
    await listPage.goto();
    await listPage.seeAllDeclarations();
    const campaignParticipationsListPage = new CampaignParticipationsListPage(page);
    await campaignParticipationsListPage.selectScope(DeclarationScope.NOT_CONNECTED);

    await campaignParticipationsListPage.filterBySupplier('9271');
    await campaignParticipationsListPage.filterByCountry('France');
    await campaignParticipationsListPage.setYear('2025');
    await campaignParticipationsListPage.applyFilters();
    
    /* await createContractPage.expectSuccessMessage('Contract was successfully updated');
    await contractPage.assertStatus('valid');*/

    //await createContractPage.addServiceLineItem('Consulting Services', '50000', 'Service description for Consulting Services');
    //await createContractPage.expectSuccessMessage('Line item was successfully added.');
/*
    const contractPage = new ContractPage(page);
    await contractPage.assertValidateButtonVisible();
    await contractPage.assertStatus('draft');
    await contractPage.clickValidate();
    await createContractPage.expectSuccessMessage('Contract was successfully updated');
    await contractPage.assertStatus('to renew');*/


});
});