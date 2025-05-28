Feature: Cart Management and Purchase

  Scenario: Manage cart and complete purchase
    Given I am logged in as a standard user: Username: "standard_user", Password: "secret_sauce"
    When I add all items to the cart
    And I go to the cart page
    And I remove the third item from the cart by name
    Then I should see only the selected items in checkout overview
    And I should see the correct total count of items 5
    When I finish the purchase by entering this information: First Name: "John", Last Name: "Doe", Postal Code: "12345"
    Then I should see the order confirmation page
