Feature: Get Users API

  Scenario: Get and print users with odd ID
    Given I get a list of users
    Then the response status code should be 200
    And I print users with odd IDs
