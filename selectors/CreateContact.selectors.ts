export const CreateContactSelectors = {
  // --- Login ---
  login: {
    username: '#username',
    password: '#password',
    submitButton: 'button[type="submit"]',
  },

  // --- Navigation ---
  navigation: {
    contactsMenu: 'a[href="/contacts/index"]',
    newContactButton: 'button[data-href="/contacts/new"]',
  },

  // --- Formulaire de contact ---
  form: {
    actifCheckbox: '#contact_0_active',
    prenomInput: '#contact_0_first_name',
    nomInput: '#contact_0_last_name',
    emailInput: '#contact_0_email',
    profilSelect: '#contact_0_profile',
    fonctionSelect: '#contact_0_function',
    telephoneInput: '#contact_0_phone',
    mobileInput: '#contact_0_mobile',
    adresseInput: '#contact_0_address',
    adresse2Input: '#contact_0_address2',
    codePostalInput: '#contact_0_zip_code',
    villeInput: '#contact_0_city',
    paysSelect: '#contact_0_country_address_id',
    langueSelect: '#contact_0_application_language',
    formatNombreSelect: '#contact_0_number_format',
    formatDateSelect: '#contact_0_date_format',
    deviseSelect: '#contact_0_currency_id',

    enregistrerButton: 'button[type="submit"][data-library="fanilla-button"]',
    annulerButton: 'button[type="button"][data-library="fanilla-button"]',
  },

  // --- Toasters ---
 toaster: {
  success: '.toast--success .toast__message',
  error: '.toast--error .toast__message',
},
};
