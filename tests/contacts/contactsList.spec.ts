import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ContactsPage } from '../../pages/ContactsPage';

 let contactsPage: ContactsPage;
 test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    contactsPage = new ContactsPage(page);
    await contactsPage.goto();
  });

test.describe('E2E Contacts List tests:', () => {
 
  test('@P1 Should display translated column headers', async () => {
    await contactsPage.verifyTableHeaders();
  });

  test('@P1 Should contain visible rows in the table', async () => {
    await contactsPage.verifyTableHasRows();
  });

  test('@P1 should display Show and Edit buttons', async () => {
    await contactsPage.verifyButtonsVisible();
  });

  test('@P1 Should display active and inactive icons', async () => {
    await contactsPage.verifyActiveAndInactiveIcons();
  });

  test('@P1 Should read contact data from first row', async () => {
    const data = await contactsPage.getRowData(0);
    console.log('🧩 Contact data:', data);
    expect(data.email).toContain('@');
  });

  test('@P1 should open contact detail page by name', async () => {
    await contactsPage.openContactByName('Loic');
    await expect(contactsPage.page).toHaveURL(/\/contacts\/show\//);
  });
});

//export   
  test.describe('Contacts Export Message', () => {
  test('@P1 Should display translated success message after export', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.verifyExportSuccessAlert();
  });
});


//filtrage 
test.describe('Contacts Filtering', () => {

  test('@P1 filtrage par prénom', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.applyFilters({ firstName: 'Laurent' });
  });

  test('@P1 filtrage par profil', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.applyFilters({ profile: 'Client' });
  });

  test('@P1 filtrage combiné prénom + profile', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.goto();
    await contactsPage.applyFilters({
      firstName: 'helene',
      profile: 'support',
    });

    await contactsPage.clearFilters();
  });
});


