const I = actor();

import assert from 'assert';

let response: any;

// Scenario 1
Given('I get a list of users', async () => {
  response = await I.sendGetRequest('/users');
});

Then('the response status code should be {int}', (statusCode: number) => {
  assert.strictEqual(response.status, statusCode);
});

Then('I print users with odd IDs', () => {
  const oddUsers = response.data.data.filter((user: any) => user.id % 2 !== 0);
  console.log('Users with odd IDs:', oddUsers);
});

// Scenario 2: Get a single user by ID
Given('I get the user with ID {int}', async (userId: number) => {
  response = await I.sendGetRequest(`/users/${userId}`);
});

Then('the user first name should be {string}', (expectedName: string) => {
  assert.strictEqual(response.data.data.first_name, expectedName);
});

// Scenario 3: Create a new user
When('I create a user with name {string} and job {string}', async (name: string, job: string) => {
  response = await I.sendPostRequest('/users', { name, job });
});

Then('the response should include the name {string} and job {string}', (name: string, job: string) => {
  assert.strictEqual(response.data.name, name);
  assert.strictEqual(response.data.job, job);
});

// Scenario 4: Update an existing user
When('I update the user with ID {int} with name {string} and job {string}', async (userId: number, name: string, job: string) => {
  response = await I.sendPutRequest(`/users/${userId}`, { name, job });
});

Then('the update response should contain updated name {string} and job {string}', (name: string, job: string) => {
  assert.strictEqual(response.data.name, name);
  assert.strictEqual(response.data.job, job);
});

// Scenario 5: Delete a user
When('I delete the user with ID {int}', async (userId: number) => {
  response = await I.sendDeleteRequest(`/users/${userId}`);
});

Then('the delete response status code should be {int}', (statusCode: number) => {
  assert.strictEqual(response.status, statusCode);
});
