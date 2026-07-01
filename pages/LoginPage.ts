import { Page } from "playwright";

import { URLS, TIMEOUTS } from "../utils/constants";

import { ERROR_MESSAGES } from "../utils/messages";

export class LoginPage {
  constructor(private page: Page) {}

  /**
   * @description username input field
   */
  private get usernameInput() {
    return this.page.locator("#username");
  }
  /**
   * @description password input field
   */
  private get passwordInput() {
    return this.page.locator("#password");
  }
  /**
   * @description login button
   */
  private get loginButton() {
    return this.page.locator('button[type="submit"]');
  }
  /**
   * @description logout button
   */
  private get logoutButton() {
    return this.page.locator('a[href="/logout"]');
  }
  /**
   * @description error message
   */
  private get errorMessage() {
    return this.page.locator("#flash");
  }

  /**
   * @description open login pages and wait for the page to load
   */
  async navigate() {
    await this.page.goto(URLS.LOGIN, {
      /**
       * @description waits for navigation to be committed
       */
      waitUntil: "commit",

      timeout: TIMEOUTS.PAGE_LOAD,
    });
    /**
     * @description waits until the page is loaded
     */
    await this.page.waitForLoadState("domcontentloaded");
    /**
     * @description waits for the username input field to be visible
     */
    await this.usernameInput.waitFor({
      state: "visible",

      timeout: TIMEOUTS.ELEMENT,
    });
  }

  /**
   * @description username input field
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }
  /**
   * @description  password input field
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  /**
   * @description  click login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }
  /**
   * @description perform complete login action
   */
  async login(username: string, password: string) {
    await this.enterUsername(username);

    await this.enterPassword(password);

    await this.clickLogin();
  }

  /**
   * @description Logout Actions
   */

  async clickLogout() {
    await this.logoutButton.click();
  }
  /**
   * @description  verify successful login by checking dashboard url
   */

  async verifyDashboard() {
    await this.page.waitForURL("**/secure");

    if (!this.page.url().includes("/secure")) {
      throw new Error(ERROR_MESSAGES.DASHBOARD_NAVIGATION);
    }
  }
  /**
   * @description verifies user is redirected to login page
   */
  async verifyLoginPage() {
    await this.page.waitForURL("**/login");

    if (!this.page.url().includes("/login")) {
      throw new Error(ERROR_MESSAGES.LOGIN_PAGE_REDIRECT);
    }
  }
  /**
   * @description verifies invalid login error message
   */

  async verifyInvalidLoginMessage() {
    await this.errorMessage.waitFor();

    const text = await this.errorMessage.textContent();

    if (!text?.includes("Your password is invalid!")) {
      throw new Error(ERROR_MESSAGES.INVALID_ERROR_MESSAGE);
    }
  }
  /**
   * @description verify login result based on outcome
   */

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
