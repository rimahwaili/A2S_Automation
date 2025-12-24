export const loginSelectors = {
  // Inputs
  usernameInput: { role: 'textbox', name: 'Email' },
  passwordInput: '#user_0_password',

  // Buttons
  loginButton: { role: 'button', name: 'Log in' },

  // Toasts
  successToast: '.toast.toast--success[role="alert"]',
  errorToast: '.toast.toast--error[role="alert"]',
  toastHeader: '.toast__header',
  toastMessage: '.toast__message',

  warningMessage: '#warning',

  // URLs
  loginUrl: 'users/login',
  welcomeUrl: /\/welcome$/,

 //profile details
  avatarMenu: '.header__avatar-menu', 
  avatarMenuOpen: '.header__avatar-menu--open',
  avatarName: '.header__avatar-menu-name',
  avatarProfile: '.header__avatar-menu-profil',
  avatarInfoLink: '.header__avatar-menu-info',
  logoutLink: '.header__avatar-menu-action',

//reset password 
  pageTitle: 'h2:has-text("Welcome to AstoreSuite")',
  ResetpasswordInput: 'input[id^="user_"][id$="_password"]',
  confirmPasswordInput: 'input[id^="user_"][id$="_password_confirmation"]',
  acceptButton: '#cgu_required_accept_form_submit',
  termsLink: '.cgu-text a[href*="display_cgu"]',

} as const;
