// selectors/contactdetails.selectors.ts

export const ContactDetailsSelectors = {
  /** ===========================
   * 👁️ CONTACT DETAILS PAGE
   * =========================== */

  // === Main page container ===
  pageContainer: '#container[data-controller="contacts"][data-action="show"]',

  // === Header ===
  pageTitle: '.main-header-title h2.title:has-text("Contact Details")',

  // === Identity (basic info) ===
  contactName: '.identity',
  contactEmail: '[id^="contact_"][data-field="email"]',
  contactFunction: '[id^="contact_"][data-field="function"]',

  // === Tags / status ===
  contactProfile: '.tags .tag--light:not(.tag--success)', // e.g. Supplier
  contactStatus: '.tags .tag--light.tag--success', // e.g. Active

  // === Contact Settings ===
  contactSettingsSection: '#contacts_contact_settings_cont_937_cell, .panel:has-text("Contact Settings")',
  languageValue: '#contacts_application_language_937_cell .col-6:last-child, text=French',
  numberFormatValue: '#contacts_number_format_937_cell span[data-field="number_format"]',
  dateFormatValue: '#contacts_date_format_937_cell span[data-field="date_format"]',
  currencyValue: '#contacts_currency_937_cell span[data-field="currency"]',
  lastPasswordUpdateValue: '#contacts_password_last_changed_937_cell .col-6:last-child',

  // === Buttons ===
  changePasswordButton: 'a[data-action="change_password"]',
  sendResetLinkButton: 'a[data-action="sent_welcome_email"]',
  editContactButton: 'a[href*="/contacts/edit/"], a[data-action="edit"]',



  /** ===========================
   * 🔒 CHANGE PASSWORD MODAL
   * =========================== */

// === Change Password Modal ===
  passwordModal: '.modal-content:has(h5.modal-title:has-text("Change password"))',
  passwordPageTitle: 'h5.modal-title:has-text("Change password")',
  passwordInput: 'input#password[name="password"]',
  confirmPasswordInput: 'input#password_confirmation[name="password_confirmation"]',
  closeModalButton: '.modal-content:has(h5.modal-title:has-text("Change password")) .btn-close',
 
  // === Eye icons (visibility toggles) ===
  togglePasswordVisibility: 'button:has(svg[data-icon="eye"]), .password-toggle-button',

  // === Password requirements list ===
  passwordRequirementsList: '.password-rules, .password-requirements',
  passwordRequirementItems: '.password-validation__requirement-list li',
  requirementValidIcon: '.password-rules .bi-check-lg, .password-requirements .text-success',
  requirementInvalidIcon: '.password-rules .bi-x-lg, .password-requirements .text-danger',

  // === Error messages ===
  passwordMismatchError: '#password_confirmation_error:visible',
  passwordEmptyError: 'text=Please input password',
  passwordTooShortError: 'text=At least 8 characters',

  // === Apply / Submit button ===
  applyPasswordButton: 'input#submit_pw[type="submit"], button:has-text("Apply")',

  //=== success message ===
  toastContainer: '.toast-zone',
  toastSuccess: '.toast.show.toast--success',
  toastMessage: '.toast.show.toast--success .toast__message',
  toastCloseButton: '.toast.show.toast--success .toast__close button',

  
};
