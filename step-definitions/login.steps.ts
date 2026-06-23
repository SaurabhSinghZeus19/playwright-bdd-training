import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { world } from "../utils/world";
import { users } from "../utils/testData";
import { TIMEOUTS } from "../utils/constants";
import { ERROR_MESSAGES } from "../utils/messages";

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
  const isLoggedIn = await world.loginPage.verifyDashboard();

  if (!isLoggedIn) {
    throw new Error(ERROR_MESSAGES.DASHBOARD_NAVIGATION);
  }
});

Then("error message should be displayed", async function () {
  const errorMessage = await world.loginPage.getErrorMessage();

  await errorMessage.waitFor();

  const text = await errorMessage.textContent();

  if (!text?.includes("Your password is invalid")) {
    throw new Error(ERROR_MESSAGES.INVALID_ERROR_MESSAGE);
  }
});

Given("user is logged in", async function () {
  await world.loginPage.navigate();

  await world.loginPage.enterUsername(
    users.validUser.username
  );

  await world.loginPage.enterPassword(
    users.validUser.password
  );

  await world.loginPage.clickLogin();

  await world.page.waitForURL("**/secure");
});

When("user clicks logout button", async function () {
  await world.loginPage.clickLogout();
});

Then("user should be redirected to login page", async function () {
  const isOnLoginPage =
    await world.loginPage.verifyLoginPage();

  if (!isOnLoginPage) {
    throw new Error(ERROR_MESSAGES.LOGIN_PAGE_REDIRECT);
  }
});

When(
  "user enters {string} and {string}",
  async function (username: string, password: string) {
    await world.loginPage.enterUsername(username);
    await world.loginPage.enterPassword(password);
  }
);

Then("login result should be {string}", async function (result: string) {
  if (result === "success") {
    const isLoggedIn =
      await world.loginPage.verifyDashboard();

    if (!isLoggedIn) {
      throw new Error(ERROR_MESSAGES.LOGIN_SUCCESS);
    }
  }

  if (result === "failure") {
    const errorMessage =
      await world.loginPage.getErrorMessage();

    await errorMessage.waitFor();

    const text = await errorMessage.textContent();

    if (!text?.includes("Your password is invalid!")) {
      throw new Error(ERROR_MESSAGES.INVALID_ERROR_MESSAGE);
    }
  }
});