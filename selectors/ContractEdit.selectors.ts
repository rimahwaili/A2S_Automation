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
    validate: '#contracts_validated_from_draft',
    saveDraft: '#edit_as_tabs_save-the-draft_form_submit',
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
  },

  archivemodale: {
    endQuarterSelect: 'select[name$="[end_quarter]"]',
    endYearInput: 'input[name$="[end_year]"]',
    actualEndDateInput: 'input[name$="[actual_end_date]"][type="text"]',
    confirmStep1Btn:'#confirm-dates-to-step-2',
    confirmFinalBtn:'#confirm-dates',
  },

  NewContractSelectors : {
    workflowTitle: 'h2.workflow-title',
    status: 'span.title-status',
    originalContract:'a[data-original-title="Edit"]',
    warningMessage: '.warning-message.hidden-element',
},
contractdetails : {
    supplierField : '//label[contains(.,"Supplier")]/following-sibling::*[1]',
    invoicingCountryField : '//label[contains(.,"Invoicing country")]/following-sibling::*[1]',
    declarationFrequencyField : 'span[id^="contract_"]:not([id^="contract_service_"])[id$="_declaration_frequency"]',

}

};
