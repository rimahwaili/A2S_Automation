import { test, expect } from '@playwright/test';
import { DeclarativeCampaignsPage } from '../../pages/declarativeCompaigns/DeclarativeCompainsPage';
import { LoginPage } from '../../pages/LoginPage';
import { NewDeclarativeCampaignPage } from '../../pages/declarativeCompaigns/NewDeclarativeCompaignsPage';
import { allure } from 'allure-playwright';


let declarativeCompaigns: DeclarativeCampaignsPage;
 test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await loginPage.checkAndClosePendoPopupIfPresent();

    declarativeCompaigns = new DeclarativeCampaignsPage(page);
    await declarativeCompaigns.goto();
  });

test.describe('Declarative Campaigns Tests', () => {


test('A2SQA2-2601 | @P0 Create and Launch declarative campaign', async ({ page }) => {

    allure.label('feature', 'Declarative Campaigns');
    allure.epic('Declarative Campaigns');
    allure.story('ative campaign');
    allure.severity('critical'); 

    const listPage = new DeclarativeCampaignsPage(page);
    const formPage = new NewDeclarativeCampaignPage(page);

    // 1️⃣ Open list
    await listPage.goto();

    // 2️⃣ Open creation form
    await listPage.createNewCampaign();
    await expect(page).toHaveURL(/\/declarative_campaigns\/new/);

    // 3️⃣ Fill form
    await formPage.assertLoaded();
    const period = DeclarativeCampaignsPage.getRandomPeriod();
    const year = DeclarativeCampaignsPage.getRandomYear();
    const country = DeclarativeCampaignsPage.getRandomCountry();
    const anticipated = DeclarativeCampaignsPage.getRandomBoolean();

    const { startDate, endDate } = DeclarativeCampaignsPage.getRandomDates(period, year);
    console.log({ anticipated, period, year, startDate, endDate, country });
    await formPage.setAnticipated(anticipated);
    
    await formPage.setYear(String(year));
    await formPage.setBeginningDate(startDate);
    await formPage.setEndingDate(endDate);
    await formPage.selectCountry(country);
    await listPage.selectPeriod(period);
    // 4️⃣ Save
    await formPage.save();

    // 5️⃣ Assert redirect
    await expect(page).toHaveURL(/\/declarative_campaigns/);


  if(await formPage.isDeclarativeCampaignAlreadyExists()){
      console.log('Declarative Campaign already exists.');
      await formPage.selectCountry(country);
      await formPage.save();
    } 
    // 6️⃣ Assert campaign appears in table
    await formPage.verifySuccessMessage('Declaration Campaign was successfully created.');
    // Check start date
    await formPage.verifyStartDate(startDate);
    // Check end date
     await formPage.verifyEndDate(endDate);
      //await formPage.verifySuccessMessage('Declaration Campaign was successfully launched.');
      
      await formPage.clickEnable();
      await formPage.launchCampaign();
      console.log('Declarative Campaign created successfully.');
  });

});