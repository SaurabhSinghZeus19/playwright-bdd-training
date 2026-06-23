import { Page } from "playwright";
    import { URLS } from "../utils/constants";
    import { TIMEOUTS } from "../utils/constants";

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    console.log("Opening URL");
    await this.page.goto(URLS.LOGIN, {
      waitUntil: "commit",
      timeout: TIMEOUTS.PAGE_LOAD,
    });
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForSelector("#username", {
      state: "visible",
      timeout: TIMEOUTS.ELEMENT,
    });
    console.log("Current URL:", this.page.url());
    console.log("URL Opened");
  }
  async enterUsername(username: string) {
    console.log("Before username fill URL:", this.page.url());
    await this.page.locator("#username").fill(username);
  }
  async enterPassword(password: string) {
    await this.page.locator("#password").fill(password);
  }
  async clickLogin() {
    await this.page.locator('button[type="submit"]').click();
  }
  async clickLogout() {
    await this.page.locator('a[href="/logout"]').click();
  }
  async getErrorMessage() {
    return this.page.locator("#flash");
  }
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyDashboard() {
    await this.page.waitForURL("**/secure");
    return this.page.url().includes("/secure");
  }

  async verifyLoginPage() {
    await this.page.waitForURL("**/login");
    return this.page.url().includes("/login");
  }
}
