import { Page, Locator } from '@playwright/test';
import { credentials } from '../utils/env';
import { loginSelectors } from '../selectors/login.selectors';

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  public lang: 'fr' | 'en' = 'en'; // langue détectée

  constructor(page: Page) {
    this.page = page;

    // Get elements using role and name
    this.usernameInput = page.getByRole(loginSelectors.usernameInput.role, {
      name: loginSelectors.usernameInput.name,
    });

    this.passwordInput = page.locator(loginSelectors.passwordInput);

    this.loginButton = page.getByRole(loginSelectors.loginButton.role, {
      name: loginSelectors.loginButton.name,
    });
  }

async detectLanguage() {
  const html = await this.page.content();

  // Recherche des mots-clés dans le HTML
  if (html.match(/courriel|adresse\s*e[- ]?mail|mot\s*de\s*passe|connexion/i)) {
    this.lang = 'fr';
  } else if (html.match(/email|password|login/i)) {
    this.lang = 'en';
  } else {
    this.lang = 'en'; // fallback par défaut
  }

  console.log(`Detected UI language: ${this.lang.toUpperCase()}`);
}

  async goto() {
    await this.page.goto(`${credentials.baseUrl}${loginSelectors.loginUrl}`);
  }


  
  async login(
    username: string = credentials.username,
    password: string = credentials.password
  ) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // ✅ Fixed: successToast is a string selector, not an object
  async getSuccessToast() {
    return this.page.locator(loginSelectors.successToast);
  }

  async getToastMessage() {
    return this.page.locator(loginSelectors.toastMessage);
  }
}
