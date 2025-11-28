Feature: Login

  @P0 @Login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I log in with valid credentials
    Then a success notification should be displayed

  @P0 @Login
  Scenario: Login with inactive user
    Given I am on the login page
    When I log in with an inactive account
    Then an error message should be displayed

  @P0 @Login
  Scenario: Login with invalid credentials
    Given I am on the login page
    When I log in with wrong credentials
    Then an error message should be displayed
