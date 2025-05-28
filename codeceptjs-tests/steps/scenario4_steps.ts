const scenario4_steps = ({ I, assert }) => {
    // Scenario 4: Logging in as a locked out user
    Given('I am on the login page', () => {
        I.amOnPage('/');
    });

    When('I log in as a locked out user: Username: {string}, Password: {string}', (username: string, password: string) => {
        I.fillField('[data-test="username"]', username);
        I.fillField('[data-test="password"]', password);
        I.click('[data-test="login-button"]');
    });

    Then('I should see a login error message', async () => {
        I.seeElement('[data-test="error"]');
        const errorMsg = await I.grabTextFrom('[data-test="error"]');
        assert(
            errorMsg.includes('Sorry, this user has been locked out'),
            'Expected error message not found'
        );
    });
}

export default scenario4_steps;
