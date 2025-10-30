import { test, expect } from '@playwright/test';
import { CreateContactPage } from '../../pages/CreateContact';
import { LoginPage } from '../../pages/LoginPage';
import { ContactsPage } from '../../pages/ContactsPage';
import { translations, getLang } from '../../utils/translations';

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
      createContactPage = new CreateContactPage(page);

      const random = Math.floor(1000 + Math.random() * 9000);
      const email = `${profil.name.replace(/\s+/g, '')}${random}@yopmail.com`;

      await createContactPage.createContact('Test', 'Auto', email, profil.name);
      await createContactPage.verifySuccess();
    });
  });
}
