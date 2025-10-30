import { Page, expect } from '@playwright/test';
import { translations } from '../utils/translations';
import { ContactsSelectors as sel } from '../selectors/contacts.selectors';

export class ContactsPage {
  private page: Page;
  lang: 'en' | 'fr' = 'en';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/contacts/index');
    await this.detectLanguage();
    await expect(this.page.locator(sel.table)).toBeVisible();
  }

  async detectLanguage() {
    const html = await this.page.content();
    if (html.includes('Liste des Contacts')) {
      this.lang = 'fr';
    } else {
      this.lang = 'en';
    }
    console.log(`Detected UI language: ${this.lang.toUpperCase()}`);
  }

  /** Verify translated column headers */
 async verifyTableHeaders() {
  const t = translations[this.lang];
  console.log(`🔎 Verifying table headers (${this.lang})`);

  const expectedHeaders = [
    { id: '#contacts_first_name_th', text: t.firstName },
    { id: '#contacts_last_name_th', text: t.lastName },
    { id: '#contacts_email_th', text: t.email },
    { id: '#contacts_function_th', text: t.function },
    { id: '#contacts_active_th', text: t.active },
    { id: '#contacts_profile_th', text: t.profile },
    { id: '#contacts_areas_th', text: t.areas },
    { id: '#contacts_tableactions_col_header', text: t.actions },
  ];

  for (const header of expectedHeaders) {
    const element = this.page.locator(header.id);
    await expect(element).toBeVisible();
    await expect(element).toHaveText(new RegExp(header.text, 'i'));
  }
}


  /** Check if the table contains at least one row */
  async verifyTableHasRows() {
    const rows = this.page.locator(sel.tableRows);
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    console.log(`📊 Found ${count} contact(s) in the table`);
    expect(count).toBeGreaterThan(0);
  }

  /** Verify that Show and Edit buttons are visible */
  async verifyButtonsVisible() {
    await expect(this.page.locator(sel.showButton).first()).toBeVisible();
    await expect(this.page.locator(sel.editButton).first()).toBeVisible();
    console.log('✅ "Show" and "Edit" buttons are visible');
  }

  /** Verify that both active and inactive icons appear */
  async verifyActiveAndInactiveIcons() {
    await expect(this.page.locator(sel.activeIcon).first()).toBeVisible();
    await expect(this.page.locator(sel.inactiveIcon).first()).toBeVisible();
    console.log('✅ Active and inactive icons are visible');
  }

  /** Extract data from a given table row */
  async getRowData(index: number) {
    const row = this.page.locator(sel.tableRows).nth(index);
    const data = {
      firstName: await row.locator('[data-field="first_name"]').textContent(),
      lastName: await row.locator('[data-field="last_name"]').textContent(),
      email: await row.locator('[data-field="email"]').textContent(),
    };
    console.log(`📥 Extracted data from row ${index + 1}:`, data);
    return data;
  }

  /** Open the details page for a specific contact */
  async openContactByName(name: string) {
    const row = this.page.locator(`#contacts_table span:has-text("${name}")`);
    await expect(row).toBeVisible();
    await row.locator('xpath=ancestor::tr//a[@data-action="show"]').click();
    console.log(`➡️ Opened contact details for "${name}"`);
  }

async verifyExportSuccessAlert() {
  console.log('📤 Vérification du message de succès après export...');
  const t = translations[this.lang];
  // Clic sur le bouton Export
  const exportButton = this.page.locator(sel.exportButton);
  await expect(exportButton).toBeVisible();
  await exportButton.click();
  // Vérifie la visibilité du toast message (issu de ContactsSelectors)
  const toastMessage = this.page.locator(sel.exportMessage);
  await expect(toastMessage).toBeVisible({ timeout: 5000 });
  // Vérifie le texte selon la langue
  const expectedText =
    this.lang === 'fr'
      ? /Un email avec votre liste de contacts vous sera envoyé prochainement, merci de vérifier votre boîte mail./i
      : /An email with your contacts list will be sent soon/i;
  await expect(toastMessage).toHaveText(expectedText);
  console.log(`✅ Message du toast vérifié (${this.lang.toUpperCase()})`);
}


async applyFilters(filters: {
  active?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profile?: string;
  function?: string;
  suppliers?: string;
  clients?: string;
}) {
  console.log('🧮 Application des filtres:', filters);

  const t = translations[this.lang];

  // 1️⃣ Ouvrir le panneau de filtres
  const filterButton = this.page.locator(sel.filterButton);
  await expect(filterButton).toBeVisible();
  await filterButton.click();

  // 2️⃣ Filtres textes
  if (filters.firstName) await this.page.locator(sel.filterFirstName).fill(filters.firstName);
  if (filters.lastName) await this.page.locator(sel.filterLastName).fill(filters.lastName);
  if (filters.email) await this.page.locator(sel.filterEmail).fill(filters.email);

  // 3️⃣ Dropdowns SlimSelect — avec traduction automatique
  if (filters.active) {
  const value =
    t.activeValues[filters.active as keyof typeof t.activeValues] || filters.active;
  await this.selectSlimSelectOption(sel.filterActiveDropdown, value);
}

if (filters.profile) {
  const value =
    t.profileValues[filters.profile as keyof typeof t.profileValues] || filters.profile;
  await this.selectSlimSelectOption(sel.filterProfileDropdown, value);
}

if (filters.function) {
  const value =
    t.functionValues[filters.function as keyof typeof t.functionValues] || filters.function;
  await this.selectSlimSelectOption(sel.filterFunctionDropdown, value);
}

  if (filters.suppliers)
    await this.selectSlimSelectOption(sel.filterSuppliersDropdown, filters.suppliers);

  if (filters.clients)
    await this.selectSlimSelectOption(sel.filterClientsDropdown, filters.clients);

  // 4️⃣ Cliquer sur "Appliquer"
  const applyButton = this.page.locator(sel.applyFilterButton);
  await expect(applyButton).toBeVisible();
  await applyButton.click();

  // 5️⃣ Attendre la mise à jour du tableau
  const tableRows = this.page.locator(sel.tableRows);
  await expect(tableRows.first()).toBeVisible({ timeout: 8000 });

  console.log('✅ Filtres appliqués avec succès');
}



/** Sélectionne une option dans un SlimSelect (compatible DOM global et multilingue) */
async selectSlimSelectOption(dropdownSelector: string, optionText: string) {
  const dropdown = this.page.locator(dropdownSelector);
  await expect(dropdown).toBeVisible({ timeout: 5000 });
  await dropdown.click();

  // Laisse SlimSelect injecter le menu dans le DOM
  await this.page.waitForTimeout(400);

  // Recherche flexible (insensible à la casse et espaces)
  const option = this.page.locator('.ss-option', { hasText: new RegExp(optionText.trim(), 'i') });

  // Clique sur la première option correspondante, même si invisible
  await option.first().click({ force: true });

  // Attendre un petit délai pour stabiliser
  await this.page.waitForTimeout(200);

  console.log(`🎯 Option "${optionText}" sélectionnée`);
}




async clearFilters() {
  const clearButton = this.page.locator(sel.clearFilterButton);
  if (await clearButton.isVisible()) {
    await clearButton.click();
    console.log(' Filtres réinitialisés');
  }
}
}
