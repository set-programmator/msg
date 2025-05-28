Feature: Add one item to cart as a problem user

  Scenario: Add one item by name and validate in cart
    Given I am logged in as a problem user: Username: "problem_user", Password: "secret_sauce"
    When I click on the item named "Sauce Labs Bolt T-Shirt"
    And I add the item to the cart from the item page
    And I go to the cart page
    Then I should see "Sauce Labs Onesie" in the cart
