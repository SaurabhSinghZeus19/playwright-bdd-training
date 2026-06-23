import { Page } from "playwright";
import { URLS, TIMEOUTS } from "../utils/constants";

export class FormPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto(
      URLS.FORM,
      {
        waitUntil: "commit",
        timeout: TIMEOUTS.DEFAULT
      }
    );

    await this.page.waitForSelector("#userName");
  }

  async enterName(fullName: string) {
    await this.page.locator("#userName").fill(fullName);
  }

  async enterEmail(email: string) {
    await this.page.locator("#userEmail").fill(email);
  }

  async enterCurrentAddress(currentAddress: string) {
    await this.page.locator("#currentAddress").fill(currentAddress);
  }

  async enterPermanentAddress(permanentAddress: string) {
    await this.page.locator("#permanentAddress").fill(permanentAddress);
  }

  async fillForm(
    fullName: string,
    email: string,
    currentAddress: string,
    permanentAddress: string
  ) {
    await this.enterName(fullName);
    await this.enterEmail(email);
    await this.enterCurrentAddress(currentAddress);
    await this.enterPermanentAddress(permanentAddress);
  }

  async submitForm() {
    await this.page.locator("#submit").click();
  }

  async verifySubmission() {
    await this.page.waitForSelector("#output");
    return await this.page.locator("#output").isVisible();
  }

  async isEmailValidationErrorDisplayed() {
    const className = await this.page
      .locator("#userEmail")
      .getAttribute("class");

    return className?.includes("field-error");
  }
}