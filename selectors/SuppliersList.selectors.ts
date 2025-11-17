export const SuppliersSelectors = {
  urls: {
    base: '/suppliers',
  },

  layout: {
    contentContainer: '#content',
    listContainer: '#container',
    suppliersListBlock: '#suppliers_list',
  },

  header: {
    title: 'h2.title.my-data-switch-container',
    titleCount: 'h2.title.my-data-switch-container .alert-title', // "All (1)"
  },

  navigation: {
    newSupplierButton: 'a.btn.btn-primary[href="/suppliers/new"]',
    exportButton: '.download-button a[href="/suppliers/export"]',
    customPageInput: '#custom-page-input',
    customPageSubmit: '#custom-page-submit',
  },

  filterBar: {
    root: '.custom-filter-bar',
    toggleCheckbox: '#suppliers-index',
    toggleLabel: 'label[for="suppliers-index"]',
    form: '#suppliers_filter_form',
    fieldset: '#suppliers_filter_form--suppliers-index',
    panelBody: '#suppliers_filter_form--suppliers-index .panel-body',

    // Code filter
    codeCell: '#suppliers_code_0_cell',
    codeLabel: '#suppliers_code_0',
    codeComparatorSelect: '#comp_code',
    codeSelect: '#supplier_0_code',

    // Name filter
    nameCell: '#suppliers_name_0_cell',
    nameLabel: '#suppliers_name_0',
    nameComparatorSelect: '#comp_name',
    nameInput: '#supplier_0_name',

    // Invoicing countries
    invoicingCountriesCell: '#suppliers_invoicing_countries_0_cell',
    invoicingCountriesComparator: '#comp_invoicing_countries',
    invoicingCountriesSelect: '#supplier_0_invoicing_countries',

    // Nomination for Declaration
    nominationForDeclarationCell: '#suppliers_nomination_for_declaration_0_cell',
    nominationForDeclarationComparator: '#comp_nomination_for_declaration',
    nominationForDeclarationSelect: '#supplier_0_nomination_for_declaration',

    // Nomination for Control
    nominationForControlCell: '#suppliers_nomination_for_control_0_cell',
    nominationForControlComparator: '#comp_nomination_for_control',
    nominationForControlSelect: '#supplier_0_nomination_for_control',

    // Has Active Contracts
    hasActiveContractsCell: '#suppliers_has_active_contracts_0_cell',
    hasActiveContractsComparator: '#comp_has_active_contracts',
    hasActiveContractsSelect: '#supplier_0_has_active_contracts',

    // Has Active Contacts
    hasActiveContactsCell: '#suppliers_has_active_contacts_0_cell',
    hasActiveContactsComparator: '#comp_has_active_contacts',
    hasActiveContactsSelect: '#supplier_0_has_active_contacts',

    // Publication Country
    publicationCountrySelect: '#js-directory-countries',

    // Main Category
    mainCategoryCell: '#suppliers_main_category_0_cell',
    mainCategoryComparator: '#comp_category_id',
    mainCategorySelect: '#supplier_0_category_id',

    // Categories
    categoriesCell: '#suppliers_categories_0_cell',
    categoriesComparator: '#comp_categories',
    categoriesSelect: '#supplier_0_categories',

    // Covered Perimeter
    coveredPerimeterCell: '#suppliers_covered_perimeter_0_cell',
    coveredPerimeterComparator: '#comp_covered_perimeter',
    coveredPerimeterSelect: '#supplier_0_covered_perimeter',

    // Running Job Control Generation
    runningJobCtrlGenCell: '#suppliers_running_job_control_generation_0_cell',
    runningJobCtrlGenComparator: '#comp_running_job_control_generation',
    runningJobCtrlGenSelect: '#supplier_0_running_job_control_generation',

    // Waiting Job Control Generation
    waitingJobCtrlGenCell: '#suppliers_waiting_job_control_generation_0_cell',
    waitingJobCtrlGenComparator: '#comp_waiting_job_control_generation',
    waitingJobCtrlGenSelect: '#supplier_0_waiting_job_control_generation',

    // Actions
    resetButton: '#clear_filters',
    applyFiltersButton: '#filter_bar__-apply-filters_form_submit',
  },

  table: {
    container: '#suppliers_table',
    headerRow: '#suppliers_table thead tr',
    bodyRows: '#suppliers_table tbody tr',
    firstRow: '#suppliers_table tbody tr:first-child',

    // Columns (generic)
    codeHeader: '#suppliers_code_th',
    nameHeader: '#suppliers_name_th',

    // First row cells
    firstRowActionsCell: '#suppliers_table tbody tr:first-child td.std_links',
    firstRowCodeCell: '#suppliers_table tbody tr:first-child [data-field="code"]',
    firstRowNameCell: '#suppliers_table tbody tr:first-child [data-field="name"]',

    // Actions in a row
    showLinkInRow: '.std_links a[data-action="show"]',
    editLinkInRow: '.std_links a[data-action="edit"]',
  },

  bulkValidation: {
    band: '#validate-form-band',
    submitBox: '#validate-form-band .submit-box',
    submitValidationsLink: '#submit-validations',
    entriesSelectedSpan: '#entries-selected',
    validationMessageSpan: '#validation-message',
    resendMailLink: '#resend-mail',
  },

  
};
