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
  loginUrl: '/users/login',
  welcomeUrl: /\/welcome$/,
} as const;
