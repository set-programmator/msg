Feature: Product Sorting

  Scenario: Sort products by name
    Given I am logged in as a standard user: Username: 'standard_user', Password: 'secret_sauce'
    When I sort the products by name Z to A
    Then I should see the products sorted in alphabetical order
