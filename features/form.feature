Feature: Form Submission

  @form @datatable
  Scenario: Submit form with valid data
    Given user is on form page
    When user fills the form with following data:
      | fullName         | Saurabh Singh      |
      | email            | saurabh@test.com   |
      | currentAddress   | Mumbai             |
      | permanentAddress | Navi Mumbai        |
    Then form should be submitted successfully

  @form @negative
  Scenario: Verify email validation
    Given user is on form page
    When user enters invalid email "invalidemail"
    Then email field should show validation error

  @form @outline
  Scenario Outline: Submit form with multiple users
    Given user is on form page
    When user enters form details "<fullName>" "<email>" "<currentAddress>" "<permanentAddress>"
    And user submits the form
    Then form should be submitted successfully

    Examples:
      | fullName      | email              | currentAddress | permanentAddress |
      | Saurabh Singh | saurabh@test.com   | Mumbai         | Navi Mumbai      |
      | Rahul Sharma  | rahul@test.com     | Pune           | Mumbai           |
      | Priya Patel   | priya@test.com     | Ahmedabad      | Surat            |