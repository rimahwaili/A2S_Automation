export const ContactsSelectors = {
  // ==============================
  // 📋 TABLE
  // ==============================
  table: '#contacts_table',
  tableHeaders: '#contacts_table thead th',
  tableRows: '#contacts_table tbody tr',

  // Columns
  firstName: '[data-field="first_name"]',
  lastName: '[data-field="last_name"]',
  email: '[data-field="email"]',
  function: '[data-field="function"]',
  profile: 'td[headers="contacts_profile_th"]',
  active: 'td[headers="contacts_active_th"] i',

  // Icons
  activeIcon: 'i.bi-check-lg',
  inactiveIcon: 'i.bi-x-lg',

  // ==============================
  // 🧭 BUTTONS
  // ==============================
  showButton: 'a[data-action="show"]',
  editButton: 'a[data-action="edit"]',
  newContactButton:
    'button:has-text("New Contact"), button:has-text("Nouveau contact")',

  // ✅ Filter toggle button (the one that says “Add filters”)
  filterButton:
    '.filter-bar__opener, button:has-text("Add filters"), button:has-text("Filters added")',

  // Export
  exportButton: 'a[href="/contacts/export"]',
  exportMessage: '.toast.toast--success .toast__message',

  // ==============================
  // 🔍 FILTERS
  // ==============================
  applyFilterButton: 'form#contacts_filter_form button[type="submit"]',
  clearFilterButton: 'form#contacts_filter_form button[type="reset"]',

  // Text fields
  filterFirstName: '#contact_0_first_name',
  filterLastName: '#contact_0_last_name',
  filterEmail: '#contact_0_email',

  // SlimSelect dropdowns
  filterActiveDropdown: '#contacts_active_0_cell .ss-main',
  filterProfileDropdown: '#contacts_profile_0_cell .ss-main',
  filterFunctionDropdown: '#contacts_function_0_cell .ss-main',
  filterSuppliersDropdown: '#contacts_suppliers_0_cell .ss-main',
  filterClientsDropdown: '#contacts_clients_0_cell .ss-main',

  // SlimSelect options
  slimSelectOption: '.ss-list .ss-option',
};
