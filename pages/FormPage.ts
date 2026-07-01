import { Page } from "playwright";
import { URLS, TIMEOUTS } from "../utils/constants";
import { ERROR_MESSAGES } from "../utils/messages";

export class FormPage {
  private readonly page;
  constructor(page: Page) {
    this.page = page;
    console.log("I am in constructor");
  } /**
  @description Locators   
  nameInput input field
   */
  private get nameInput() {
    return this.page.locator("#userName");
  } /**
  @description emailInput input field
   */
  private get emailInput() {
    return this.page.locator("#userEmail");
  }
  /**
   * @description currentAddressInput input field
   */
  private get currentAddressInput() {
    return this.page.locator("#currentAddress");
  } /**
   * @description  permanentAddressInput input field
   */
  private get permanentAddressInput() {
    return this.page.locator("#permanentAddress");
  } /**
   * @description submitButton input field
   */
  private get submitButton() {
    return this.page.locator("#submit");
  } /**
   * @description outputSection input field
   */
  private get outputSection() {
    return this.page.locator("#output");
  } /**
   * @description Navigation Actions
   */
  /**
   * @description open form page and wait for it to load
   */
  async navigatetoForm() {
    await this.page.goto(URLS.FORM, {
      /**
       * @description waits for navigation to be committed
       */
      waitUntil: "commit",
      timeout: TIMEOUTS.DEFAULT,
    });
    await this.nameInput.waitFor({
      /**
       * @description waits for the nameInput input field to be visible
       */
      state: "visible",
      timeout: TIMEOUTS.ELEMENT,
    });
  } /**
   * @description Form Actions
   */

  /**
   * @description enters full name
   */
  async enterName(fullName: string) {
    await this.nameInput.fill(fullName);
  }
  /**
   * @description enter email address
   */
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }
  /**
   * @description enter current address
   */
  async enterCurrentAddress(currentAddress: string) {
    await this.currentAddressInput.fill(currentAddress);
  }
  /**
   * @description enter permanent address
   */
  async enterPermanentAddress(permanentAddress: string) {
    await this.permanentAddressInput.fill(permanentAddress);
  }
  /**
   * @description fill the form using provided data
   */
  async fillForm(
    fullName: string,
    email: string,
    currentAddress: string,
    permanentAddress: string,
  ) {
    await this.enterName(fullName);
    await this.enterEmail(email);
    await this.enterCurrentAddress(currentAddress);
    await this.enterPermanentAddress(permanentAddress);
  }
  /**
   * @description  submit form
   */
  async submitForm() {
    await this.submitButton.click();
  }

  /**
   * @description Verification Methods
   * verify the submission is successful
   */
  async verifySubmission() {
    await this.outputSection.waitFor({
      state: "visible",
      timeout: TIMEOUTS.ELEMENT,
    });
    const isVisible = await this.outputSection.isVisible();
    if (!isVisible) {
      throw new Error(ERROR_MESSAGES.FORM_SUBMISSION_FAILED);
    }
  }
  /**
   * @description verifies email validation error is displayed
   */
  async verifyEmailValidationError() {
    const className = await this.emailInput.getAttribute("class");

    if (!className?.includes("field-error")) {
      throw new Error(ERROR_MESSAGES.EMAIL_VALIDATION_ERROR);
    }
  }
}
