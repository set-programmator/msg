const scenario1_steps = ({ I, assert }) => {

    // Scenario 1: Cart Management and Purchase
    Given('I am logged in as a standard user: Username: {string}, Password: {string}', async (username: string, password: string) => {
        I.amOnPage('/');
        I.fillField('[data-test="username"]', username);
        I.fillField('[data-test="password"]', password);
        I.click('[data-test="login-button"]');
    });

    When('I add all items to the cart', async () => {
        // Find all "Add to cart" buttons and click each
        const addToCartButtons = await I.grabNumberOfVisibleElements('//*[@data-test="inventory-item"]');
        for (let i = 1; i <= addToCartButtons; i++) {
            I.click(`//*[@data-test="inventory-item"][${i}]//button[text()="Add to cart"]`);
        }
    });

    When('I go to the cart page', () => {
        I.click('.shopping_cart_link');
        I.seeInCurrentUrl('/cart.html');
    });

    When('I remove the third item from the cart by name', async () => {
        I.click(`//*[@data-test="inventory-item"][3]//button[text()="Remove"]`);
    });

    Then('I should see only the selected items in checkout overview', async () => {
        // Example: 'removedItemName' should be stored somewhere
        const removedItemName = 'some removed item name'; // store this when removing item

        const items = await I.grabTextFromAll('.cart_item_label .inventory_item_name');

        items.forEach(item => {
            assert(!item.includes(removedItemName), `Item list should NOT include ${removedItemName}`);
        });
    });

    Then('I should see the correct total count of items {int}', async (expectedCount: number) => {
        const itemCount = await I.grabNumberOfVisibleElements('.cart_item');

        assert.strictEqual(itemCount, expectedCount, `Expected ${expectedCount} items in cart but found ${itemCount}`);
    });

    When(
        'I finish the purchase by entering this information: First Name: {string}, Last Name: {string}, Postal Code: {string}',
        (firstName: string, lastName: string, postalCode: string) => {
            I.click('#checkout');
            I.fillField('#first-name', firstName);
            I.fillField('#last-name', lastName);
            I.fillField('#postal-code', postalCode);
            I.click('#continue');
            I.click('#finish');
        });


    Then('I should see the order confirmation page', () => {
        I.see('Thank you for your order!');
    });

}

export default scenario1_steps;

