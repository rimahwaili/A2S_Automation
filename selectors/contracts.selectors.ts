// tests/pages/contracts.selectors.ts

export const ContractsSelectors = {
  // Onglets
  tabs: {
    all: 'button.scope-filter#all',
    draft: 'button.scope-filter#draft',
    valid: 'button.scope-filter#valid',
    toRenew: 'button.scope-filter#to_renew',
    expired: 'button.scope-filter#expired',
    archived: 'button.scope-filter#archived',
    error: 'button.scope-filter#error',
  },

  // Filtres
  filters: {
    supplier: '#contract_0_supplier_id',
    number: '#contract_0_number',
    type: '#contract_0_kind',
    mainCategory: '#contract_0_main_category_id',
    formerNumbers: '#contract_0_former_numbers',
    categoryManager: '#contract_0_buyer_id',
    invoicingCountry: '#contract_0_invoicing_country_id',

    applyButton: '#filter_bar__-apply-filters_form_submit',
    clearButton: '#clear_filters',
  },

  // Boutons principaux
  actions: {
    exportButton: 'div.download-button a[href="/contracts/export"]',
    newContractButton: 'a[href="/contracts/new"]',
  },

  // Tableau
  table: {
    root: '#contracts_table',
    bodyRows: '#contracts_table tbody[data-singular-name="contract"] tr',
    numberCell: 'td[headers="contracts_number_th"] span[data-field="number"]',
  },

  // Pagination
  pagination: {
    root: 'nav[aria-label="Page Navigation"]',
    customPageInput: '#custom-page-input',
    customPageSubmit: '#custom-page-submit',
    activePage: 'nav[aria-label="Page Navigation"] li.active a',
  },

  // Liens dans une ligne
  rowActions: {
    view: 'a[data-action="show"]',
    edit: 'a[data-action="edit"]',
  },
} as const;
