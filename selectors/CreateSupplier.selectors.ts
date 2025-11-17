export const CreateSuppliersSelectors = {
  urls: {
    base: '/suppliers',
  },

  navigation: {
    newSupplierLink: {
      role: 'link',
      name: /new supplier/i,
    },
  },

TabsSelectors : {
  tabProfile: 'label[for="profile-radio"]',
  tabContacts: 'label[for="contact-radio"]',
  tabDirectoryInfo: 'label[for="other-radio"]',
  tabContracts: 'label[for="contract-radio"]',
  tabDocuments: '#js-document-tab',
  tabActivity: 'label[for="activity-radio"]'
},

  form: {
    codeTextbox: {
      role: 'textbox',
      name: 'Code: *',
    },
    nameTextbox: {
      role: 'textbox',
      name: 'Name: *',
    },
    vatNumberLabel: 'VAT Number',

    contactsTabText: 'Contacts (0) & Addresses',

    addAddressButton: '#add_addresses',

    address1Input: '#supplier_0_addresses_-1_address_1',
    address2Input: '#supplier_0_addresses_-1_address_2',
    zipCodeInput: '#supplier_0_addresses_-1_zip_code',
    cityInput: '#supplier_0_addresses_-1_city',

    countryChosen: '#supplier_0_addresses__1_country_id_chosen',
    functionSiteChosen: '#supplier_0_addresses__1_function_site_chosen',
    otherFunctionSiteInput: '#supplier_0_addresses_-1_other_function_site',

    submitButton: {
      role: 'button',
      name: /submit/i,
    },
  },

  list: {
    // Adapt if your table uses other selectors
    nameFilterInput: '#supplier_0_name',
    firstRowNameCell: '#suppliers_table tbody tr:first-child [data-field="name"]',
  },
  
  table: {
  showLinkInRow: '.std_links a[data-action="show"]',
  editLinkInRow: '.std_links a[data-action="edit"]',
}
};
