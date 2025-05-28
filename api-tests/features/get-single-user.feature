Feature: Get Single User

  Scenario: Get specific user by ID
    Given I get the user with ID 2
    Then the response status code should be 200
    And the user first name should be "Janet"
