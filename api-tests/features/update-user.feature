Feature: Update User

  Scenario: Update an existing user
    When I update the user with ID 2 with name "neo" and job "the one"
    Then the response status code should be 200
    And the update response should contain updated name "neo" and job "the one"
