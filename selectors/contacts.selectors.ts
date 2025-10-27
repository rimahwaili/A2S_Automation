export const ContactsSelectors = {
  // Table
  table: '#contacts_table',
  tableHeaders: '#contacts_table thead th',
  tableRows: '#contacts_table tbody tr',

  // Colonnes
  firstName: '[data-field="first_name"]',
  lastName: '[data-field="last_name"]',
  email: '[data-field="email"]',
  function: '[data-field="function"]',
  profile: 'td[headers="contacts_profile_th"]',
  active: 'td[headers="contacts_active_th"] i',

  // Icônes
  activeIcon: 'i.bi-check-lg',
  inactiveIcon: 'i.bi-x-lg',

  // Boutons
  showButton: 'a[data-action="show"]',
  editButton: 'a[data-action="edit"]',
  newContactButton: 'button:has-text("New Contact"), button:has-text("Nouveau contact")',
  addFiltersButton: 'button:has-text("Add filters"), button:has-text("Ajouter des filtres")',

 //export button
 exportButton: 'a[href="/contacts/export"]',
  exportMessage: '.toast.toast--success .toast__message',

// Boutons de filtrage
  filterButton: 'button:has-text("Filtrer"), button:has-text("Filter")',
  applyFilterButton: 'form#contacts_filter_form button[type="submit"]',
  clearFilterButton: 'form#contacts_filter_form button[type="reset"]',

  // Champs texte
  filterFirstName: '#contact_0_first_name',
  filterLastName: '#contact_0_last_name',
  filterEmail: '#contact_0_email',

  // SlimSelect dropdowns
  filterActiveDropdown: '#contacts_active_0_cell .ss-main',
  filterProfileDropdown: '#contacts_profile_0_cell .ss-main',
  filterFunctionDropdown: '#contacts_function_0_cell .ss-main',
  filterSuppliersDropdown: '#contacts_suppliers_0_cell .ss-main',
  filterClientsDropdown: '#contacts_clients_0_cell .ss-main',

  // Options dans les listes SlimSelect
  slimSelectOption: '.ss-list .ss-option',
};
