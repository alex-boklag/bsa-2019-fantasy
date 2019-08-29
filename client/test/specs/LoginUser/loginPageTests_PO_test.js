const LoginActions = require('./actions/Login_pa');
const assert = require('assert');
const credentials = require('./../testData.json');

const pageSteps = new LoginActions();

describe('Login page tests', () => {
  beforeEach(async () => {
    browser.maximizeWindow();
    return await browser.url(credentials.appUrl).catch((err) => console.log(err.message));
  });

  afterEach(async () => {
    await browser.reloadSession().catch((err) => console.log(err.message));
  });

  it('should login user with valid credentials', async () => {
    await pageSteps
      .enterEmail(credentials.email)
      .catch((err) => console.log(err.message));
    await pageSteps
      .enterPassword(credentials.password)
      .catch((err) => console.log(err.message));
    await pageSteps.clickLogin().catch((err) => console.log(err.message));
    await pageSteps.waitForLogo();
  });

  it('should show an error if user user tries to login with not registered email', async () => {
    await pageSteps
      .enterEmail(credentials.unregisteredEmail)
      .catch((err) => console.log(err.message));
    await pageSteps
      .enterPassword(credentials.password)
      .catch((err) => console.log(err.message));
    await pageSteps.clickLogin().catch((err) => console.log(err.message));
    return await pageSteps
      .getNotificationText()
      .then((res) =>
        assert.strictEqual(
          res,
          'Incorrect email.',
          `${res} not equal to Incorrect email.`,
        ),
      );
  });

  it('should show an error if user user tries to login with wrong password', async () => {
    await pageSteps
      .enterEmail(credentials.email)
      .catch((err) => console.log(err.message));
    await pageSteps
      .enterPassword(credentials.incorrectPassword)
      .catch((err) => console.log(err.message));
    await pageSteps.clickLogin().catch((err) => console.log(err.message));
    return await pageSteps
      .getNotificationText()
      .then((res) =>
        assert.strictEqual(res, 'Wrong password.', `${res} not equal to Wrong password.`),
      );
  });
});
