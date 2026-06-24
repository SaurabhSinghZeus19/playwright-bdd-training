Feature: Login functionality
  @smoke
  Scenario: Successful login with valid credentials
    Given user is on login page
    When user enters valid username and password
    And user clicks on login button
    Then user should be navigated to dashboard
  @invalid  
  Scenario: Invalid login attempt
    Given user is on login page
    When user enters invalid credentials
    And user clicks on login button 
    Then error message should be displayed
  
  @negative
  Scenario: Verify error message visibility
    Given user is on login page
    When user enters invalid credentials
    And user clicks on login button
    Then error message should be displayed
  @logout
  Scenario: Verify logout functionality
    Given user is logged in
    When user clicks logout button
    Then user should be redirected to login page
  @outline
  Scenario Outline: Login with multiple credentials
    Given user is on login page
    When user enters "<username>" and "<password>"
    And user clicks on login button
    Then login result should be "<result>"
Examples:
| username | password              | result  |
| tomsmith | SuperSecretPassword!  | success |
| tomsmith | wrongPassword         | failure |
    

