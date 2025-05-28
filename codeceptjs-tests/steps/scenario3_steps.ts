const scenario3_steps = ({ I, assert }) => {
    // Scenario 3: Sorting products by name A to Z
    Given('I am logged in as a standard user: Username: {string}, Password: {string}', async (username: string, password: string) => {
        I.amOnPage('/');
        I.fillField('[data-test="username"]', username);
        I.fillField('[data-test="password"]', password);
        I.click('[data-test="login-button"]');
    });

    When('I sort the products by name Z to A', async () => {
        I.selectOption('select[data-test="product-sort-container"]', 'Name (Z to A)');
        I.waitForElement('.inventory_item_name', 5);
    });

    Then('I should see the products sorted in alphabetical order', async () => {
        const productNames = await I.grabTextFromAll('.inventory_item_name');
        const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
        assert.deepStrictEqual(productNames, sortedNames, 'Products are not sorted alphabetically (A to Z)');
        I.wait(3);
    });
}

export default scenario3_steps;