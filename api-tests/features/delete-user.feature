Feature: Delete User

  Scenario: Delete a user
    When I delete the user with ID 2
    Then the delete response status code should be 204
