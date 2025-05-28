Feature: Locked Out User Login

  Scenario: Login fails for locked out user
    Given I am on the login page
    When I log in as a locked out user: Username: "locked_out_user", Password: "secret_sauce"
    Then I should see a login error message
