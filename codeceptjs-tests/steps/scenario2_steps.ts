const scenario2_steps = ({ I, assert }) => {
    // Scenario 2: Adding an item to the cart from the item page
    Given('I am logged in as a problem user: Username: {string}, Password: {string}', async (username: string, password: string) => {
        I.amOnPage('/');
        I.fillField('[data-test="username"]', username);
        I.fillField('[data-test="password"]', password);
        I.click('[data-test="login-button"]');
    });

    When('I click on the item named {string}', async (itemName) => {
        const item = locate('//div[@data-test="inventory-item-name"]').withText(itemName);
        I.seeInCurrentUrl('/inventory.html');
        I.wait(1)
        I.click(item);
        I.wait(1)
    });

    When('I add the item to the cart from the item page', async () => {
        I.click('//button[@data-test="add-to-cart"]');
        I.wait(1)
    });

    When('I go to the cart page', async () => {
        I.click('.shopping_cart_link');
        I.seeInCurrentUrl('/cart.html');
        I.wait(1)
    });

    Then('I should see {string} in the cart', async (itemName) => {
        const items = await I.grabTextFromAll('.inventory_item_name');
        assert.ok(items.includes(itemName), `Cart does not include expected item: ${itemName}`);
        I.wait(1)
    });
}

export default scenario2_steps;