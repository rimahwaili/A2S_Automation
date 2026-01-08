import { Page, expect } from '@playwright/test';
import { CreateContactSelectors } from '../selectors/CreateContact.selectors';
import { translations } from '../utils/translations';

export class CreateContactPage {
  private page: Page;
  lang: 'en' | 'fr' = 'en';


  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/contacts/index');
    await this.detectLanguage();
    await expect(this.page.locator(CreateContactSelectors.navigation.newContactButton)).toBeVisible();
  }

async detectLanguage() {
  const html = await this.page.content();
  // Recherche des mots-clés dans le HTML
  if (html.match(/Liste des Contacts|Prénom/i)) {
    this.lang = 'fr';
  } else if (html.match(/name/i)) {
    this.lang = 'en';
  } else {
    this.lang = 'en'; 
  }
  console.log(`Detected UI language: ${this.lang.toUpperCase()}`);
}

async  closePendoBanner(page: Page) {
  const pendoBanner = page.locator('#pendo-guide-container');
  const closeButton = page.locator('#pendo-close-guide-f679c337');

  if (await pendoBanner.isVisible({ timeout: 5000 }).catch(() => false)) {
    await closeButton.click();
    // Optional: wait for the banner to disappear
    await expect(pendoBanner).toHaveCount(0);
    console.log('Pendo banner closed ✅');
  } else {
    console.log('No Pendo banner found');
  }
}

async createContact(firstName: string, lastName: string, email: string, profil: string) {
    await this.page.click(CreateContactSelectors.navigation.newContactButton);
    await this.page.fill(CreateContactSelectors.form.prenomInput, firstName);
    await this.page.fill(CreateContactSelectors.form.nomInput, lastName);
    await this.page.fill(CreateContactSelectors.form.emailInput, email);
    await this.selectProfil(profil);
    await this.page.click(CreateContactSelectors.form.enregistrerButton);
  }

  
async selectProfil(profil: string) {
  // --- cibler le select du profil UNIQUEMENT ---
  const select = this.page.locator('#contacts_profile_0_cell .ss-main');
  await select.waitFor({ state: 'visible' });
  await select.scrollIntoViewIfNeeded();
  await select.click();

  // --- sélectionner l’option correspondante ---
  const option = this.page.locator(`.ss-option:has-text("${profil}")`);
  await option.waitFor({ state: 'visible' });
  await option.scrollIntoViewIfNeeded();
  await option.click();
}

async verifySuccess() {
    const t = translations[this.lang];
    const toaster = this.page.locator(CreateContactSelectors.toaster.success);
    await expect(toaster).toHaveText(t.toaster_success_create);
  }
}
