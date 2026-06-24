import { Page } from "playwright";

import { URLS, TIMEOUTS } from "../utils/constants";

import { ERROR_MESSAGES } from "../utils/messages";

export class LoginPage {
  constructor(private page: Page) {} 

    // Locators

  private get usernameInput() {           // username input field
    return this.page.locator("#username");
  }

  private get passwordInput() {           // password input field
    return this.page.locator("#password");
  }

  private get loginButton() {             // login button
    return this.page.locator('button[type="submit"]');
  }

  private get logoutButton() {            // logout button
    return this.page.locator('a[href="/logout"]');
  }

  private get errorMessage() {            // error message
    return this.page.locator("#flash");
  } 
  // Navigation Actions

  // open login pages and wait for the page to load
    async navigate() {
    await this.page.goto(URLS.LOGIN, {
      waitUntil: "commit", // waits for navigation to be committed

      timeout: TIMEOUTS.PAGE_LOAD,
    });

    await this.page.waitForLoadState("domcontentloaded");  // waits until the page is loaded

    await this.usernameInput.waitFor({    // waits for the username input field to be visible
      state: "visible",

      timeout: TIMEOUTS.ELEMENT,
    });
  } 
  // Login Actions

  // username input field
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {   // password input field
    await this.passwordInput.fill(password);
  }

  async clickLogin() {               // click login button
    await this.loginButton.click();
  }

  async login(username: string, password: string) { // perform complete login action
    await this.enterUsername(username);

    await this.enterPassword(password);

    await this.clickLogin();
  } 
  // Logout Actions


  async clickLogout() {
    await this.logoutButton.click();
  } 
  // Verification Methods

  // verify successful login by checking dashboard url
  async verifyDashboard() {       
    await this.page.waitForURL("**/secure");

    if (!this.page.url().includes("/secure")) {
      throw new Error(ERROR_MESSAGES.DASHBOARD_NAVIGATION);
    }
  }
  // verifies user is redirected to login page 
  async verifyLoginPage() {
    await this.page.waitForURL("**/login");

    if (!this.page.url().includes("/login")) {
      throw new Error(ERROR_MESSAGES.LOGIN_PAGE_REDIRECT);
    }
  }
  
  // verifies invalid login error message
  async verifyInvalidLoginMessage() {
    await this.errorMessage.waitFor();

    const text = await this.errorMessage.textContent();

    if (!text?.includes("Your password is invalid!")) {
      throw new Error(ERROR_MESSAGES.INVALID_ERROR_MESSAGE);
    }
  }

  //verify login result based on outcome
  async verifyLoginResult(result: string) {
    switch (result.toLowerCase()) {
      case "success":
        await this.verifyDashboard();

        break;

      case "failure":
        await this.verifyInvalidLoginMessage();

        break;

      default:
        throw new Error(`Invalid result type: ${result}`);
    }
  }
}
