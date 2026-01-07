export const CampaignParticipationsListSelectors = {
  // Buttons
  applyFiltersBtn: '#filter_bar__-apply-filters_form_submit',
  resetFiltersBtn: '#clear_filters',

  // Inputs
  toPeriodInput: '#declarative_campaign_participation_0_to_period',
  toVarianceInput: '#declarative_campaign_participation_0_to_variance',
  yearInput: '#declarative_campaign_participation_0_year',

  // Chosen containers
  supplierChosen: '#declarative_campaign_participation_0_supplier_id_chosen',
  lastUpdatedByChosen: '#declarative_campaign_participation_0_user2_id_chosen',
  countryChosen: '#declarative_campaign_participation_0_country_id_chosen',
  periodChosen: '#declarative_campaign_participation_0_period_chosen',

  // Chosen internals
  chosenSearchInput: 'input.chosen-search-input',
  chosenResultItem: '.chosen-results li',

  // Comparators
  varianceComparator: '#comp_to_variance',
  periodComparator: '#comp_to_period',
  
 // Table
  table: '#declarative_campaign_participations_table',
  tableBody: '#declarative_campaign_participations_table tbody',
  rows: '#declarative_campaign_participations_table tbody tr',

  // Common cells (by data-field)
  supplierCode: '[data-field="supplier_code"]',
  supplierName: '[data-field="supplier_name"]',
  declaredBy: '[data-field="declared_by"]',
  status: '[data-field="status"]',
  lastUpdatedBy: '[data-field="last_updated_by"]',
  currency: '[data-field="currency"]',
  toPeriod: '[data-field="to_period"]',
  toVariance: '[data-field="to_variance"]',
  accountingPeriod: '[data-field="accounting_period"]',
  country: '[data-field="country"] a',

  // Empty state
  noRows: '#declarative_campaign_participations_table tbody:empty',


  //scope

  scopeContainer: '.scope-filters',
  scopeButtonById: (id: string) => `.scope-filter#${id}`,
  selectedScope: '.scope-filter.selected',
  buttonText: '.button-text'
};
