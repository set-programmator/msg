Feature: Create User

  Scenario: Create a new user
    When I create a user with name "morpheus" and job "leader"
    Then the response status code should be 201
    And the response should include the name "morpheus" and job "leader"
