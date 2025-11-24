export const contractPageElements = {
  actions:{
    editButton: 'a.astore-sharp-button[title="Edit"]',
    contractstatus: 'span.title-status[class*="status-"]',

  },
  buttons: {
    back: 'a.astore-main-button[href="/contracts/list"]',
    error: 'a.astore-main-button[href*="confirm_error"]',
    archive: 'a.archive-btn[href*="confirm_dates"][href*="contracts_archived"]',
    versioning: 'a.astore-main-button[href*="/contracts/version/"]',
    renew: 'a.torenew-button[href*="trans_name=renew"]',
    submit: 'a.detachment-submit[href*="general_confirmation"]',
  },
  modals: {
    error: '[data-window="error-modal"]',
    archive: '[data-window="confirm-dates-modal"]',
    renew: '[data-window="confirm-dates-modal"]',
    versioning: '[data-window="version-modal"]',
    submit: '[data-window="general-confirmation-modal"]',
  },
  errormodale: {
    modalTitle: 'text=Error confirmation',
    confirmAndSaveBtn: '#confirm_error__-confirm-and-save_form_submit',
    cancelBtn: '#cancel-button',
  }
};
