// step definitions call page object methods to perform and execute actions using Page object

import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { world } from "../utils/world";

import { users } from "../utils/testData";

import { TIMEOUTS } from "../utils/constants";

setDefaultTimeout(TIMEOUTS.DEFAULT);

Given("user is on login page", async function () {
  await world.loginPage.navigate();
});

When("user enters valid username and password", async function () {
  await world.loginPage.enterUsername(users.validUser.username);

  await world.loginPage.enterPassword(users.validUser.password);
});

When("user enters invalid credentials", async function () {
  await world.loginPage.enterUsername(users.invalidUser.username);

  await world.loginPage.enterPassword(users.invalidUser.password);
});

When("user clicks on login button", async function () {
  await world.loginPage.clickLogin();
});

Then("user should be navigated to dashboard", async function () {
  await world.loginPage.verifyDashboard();
});

Then("error message should be displayed", async function () {
  await world.loginPage.verifyInvalidLoginMessage();
});

Given("user is logged in", async function () {
  await world.loginPage.navigate();

  await world.loginPage.login(
    users.validUser.username,

    users.validUser.password,
  );

  await world.loginPage.verifyDashboard();
});

When("user clicks logout button", async function () {
  await world.loginPage.clickLogout();
});

Then("user should be redirected to login page", async function () {
  await world.loginPage.verifyLoginPage();
});

When(
  "user enters {string} and {string}",

  async function (username: string, password: string) {
    await world.loginPage.enterUsername(username);

    await world.loginPage.enterPassword(password);
  },
);

Then(
  "login result should be {string}",

  async function (result: string) {
    await world.loginPage.verifyLoginResult(result);
  },
);
