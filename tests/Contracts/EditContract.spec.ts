import { test,expect } from '@playwright/test';
import { ContractsPage } from '../../pages/ContractListPage';
import { ContractPage } from '../../pages/EditContractPage';
import { LoginPage } from '../../pages/LoginPage';
import { allure } from 'allure-playwright';


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
    allure.story('Move contract status from To renew into Error');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToRenewtab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
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
    allure.story('Move contract status from valid into Error');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToValidTab();
    const rows = await contractsPage.getAllVisibleRows();
 
    await contractsPage.openFirstContract(1);
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
    allure.story('Move contract status from expired into Error');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToExpiredTab();
    const rows = await contractsPage.getAllVisibleRows();
    await contractsPage.openFirstContract(1);
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
    allure.story('Move contract status from Valid into Archived');
    allure.severity('critical'); 

    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToValidTab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
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
    allure.story('Move contract status from to renew into Archived');
    allure.story('Move contract status from To Renew into Archived');
    allure.severity('critical'); 


    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToRenewtab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
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
    allure.story('Move contract status from Expired into Archived');
    allure.severity('critical'); 
    
    const contractPage = new ContractPage(page);
    const contractsPage = new ContractsPage(page);
    contractsPage.clickToExpiredTab();
    const rows = await contractsPage.getAllVisibleRows();

    await contractsPage.openFirstContract(1);
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