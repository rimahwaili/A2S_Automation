import { test, expect } from '@playwright/test';
import { CreateContactPage } from '../../pages/CreateContact';
import { LoginPage } from '../../pages/LoginPage';
import { ContactsPage } from '../../pages/ContactsPage';
import { ContactDetailsPage } from '../../pages/ContactDetailsPage';
import { translations, getLang } from '../../utils/translations';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { allure } from 'allure-playwright';

// --- Détection ou configuration de la langue ---
const lang = getLang(); // 'fr' ou 'en' selon ta fonction utilitaire
const t = translations[lang as keyof typeof translations];

// --- Profils dynamiques (une traduction + 6 labels fixes) ---
const profils = [
  { name: t.profileValues.centralAdmin, jiraKey: 'A2SQA2-2278' },
  { name: t.profileValues.zoneAdmin, jiraKey: 'A2SQA2-2279' },
  { name: t.profileValues.support, jiraKey: 'A2SQA2-2280' },
  { name: t.profileValues.businessDev, jiraKey: 'A2SQA2-2281' },
  { name: t.profileValues.buyer, jiraKey: 'A2SQA2-2282' },
  { name: t.profileValues.client, jiraKey: 'A2SQA2-2283' },
  { name: t.profileValues.supplier, jiraKey: 'A2SQA2-2284' },
];

let createContactPage: CreateContactPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  const contactsPage = new ContactsPage(page);
  await contactsPage.goto();
});

// --- Création dynamique d’un test par profil ---
for (const profil of profils) {
  test.describe(`@P0 @Contacts : Profil [${profil.name}]`, () => {
    test(`${profil.jiraKey} | @P0 @Contact Should create Contact for: ${profil.name}`, async ({ page }) => {
    
      allure.label('feature', 'Contacts');
      allure.epic('Contacts');
      allure.story('contact - Create new contact');
      allure.severity('critical'); 

      createContactPage = new CreateContactPage(page);
      const random = Math.floor(1000 + Math.random() * 9000);
      const email = `${profil.name.replace(/\s+/g, '')}${random}@yopmail.com`;

      await createContactPage.closePendoBanner(page);
      await createContactPage.createContact('Test', 'Auto', email, profil.name);
      await createContactPage.verifySuccess();
      const contactsPage = new ContactsPage(page);
      await contactsPage.goto();

      await contactsPage.applyFilters({ email: email });
      const contactsDetailsPage = new ContactDetailsPage(page);

      await contactsPage.showContactDetails();
      await contactsDetailsPage.verifyPageLoaded();
      await contactsDetailsPage.verifyContactInformation();
      //if supplier or buyer we need to click on send link
      if (profil.name =="Supplier" || profil.name =="client") {
          await contactsDetailsPage.sendResetLink();
      }

      await contactsDetailsPage.openChangePasswordModal();

      await contactsDetailsPage.changeInvalidPassword('invalid','Valid@260994!!');
      await contactsDetailsPage.closeChangePasswordModal();
      await contactsDetailsPage.openChangePasswordModal();
      await contactsDetailsPage.changeValidPassword('Valid@260994!!');
      await contactsDetailsPage.verifyAndCloseSuccessToast(/Password changed/i);

      const loginPage = new LoginPage(page);
      await loginPage.logout();
      await loginPage.login(email,'Valid@260994!!');

      const forgotPassword = new ForgotPasswordPage(page);
      await forgotPassword.setNewPassword('Valid@260994!!');


    });
 });
 }