import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ContactsPage } from '../../pages/ContactsPage';
import { allure } from 'allure-playwright';

 let contactsPage: ContactsPage;
 test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    contactsPage = new ContactsPage(page);
    await contactsPage.goto();
  });

test.describe('Contacts List tests', () => {
 
  test('@P1 @Contact Display translated column headers', async () => {
    await contactsPage.verifyTableHeaders();
  });

  test('@P1 @Contact Check visible rows in the table', async () => {
    await contactsPage.verifyTableHasRows();
  });

  test('@P1 @Contact Display Show and Edit buttons', async () => {
    await contactsPage.verifyButtonsVisible();
  });

  test('@P1 @Contact  Display active and inactive icons', async () => {
    await contactsPage.verifyActiveAndInactiveIcons();
  });

  test('@P1 @Contact Read contact data from first row', async () => {
    const data = await contactsPage.getRowData(0);
    console.log('🧩 Contact data:', data);
    expect(data.email).toContain('@');
  });

});

//export   
  test.describe('Contacts Export Message', () => {
  test('@P1 @Contact Display translated success message after export', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.verifyExportSuccessAlert();
  });
});


//filtrage 
test.describe('Contacts Filtering', () => {

  test('@P1 @Contact Filter by Surname', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.applyFilters({ firstName: 'Laurent' });
  });

  test('@P1 @Contact Filter by Profil', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.applyFilters({ profile: 'Client' });
  });

  test('@P1 @Contact Filter by Email', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.applyFilters({ profile: 'Email' });
  });

  test('@P1 @Contact Filter by Surname + profil', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.applyFilters({
      firstName: 'helene',
      profile: 'support',
    });

    await contactsPage.clearFilters();
  });
});


