import { Page } from "playwright";

import { URLS, TIMEOUTS } from "../utils/constants";

import { ERROR_MESSAGES } from "../utils/messages";

export class FormPage {
  constructor(private page: Page) {} 
  // Locators

  // nameInput input field
  private get nameInput() {     
    return this.page.locator("#userName");
  }
   // emailInput input field
  private get emailInput() {
    return this.page.locator("#userEmail");
  }
  // currentAddressInput input field
  private get currentAddressInput() {
    return this.page.locator("#currentAddress");
  }
   // permanentAddressInput input field
  private get permanentAddressInput() {
    return this.page.locator("#permanentAddress");
  }
   // submitButton input field
  private get submitButton() {
    return this.page.locator("#submit");
  }
  // outputSection input field 
  private get outputSection() {
    return this.page.locator("#output");
  } 
  // Navigation Actions
 
   // open form page and wait for it to load
  async navigate() {
    await this.page.goto(URLS.FORM, {
      waitUntil: "commit",    //  // waits for navigation to be committed
      timeout: TIMEOUTS.DEFAULT,
    });

    await this.nameInput.waitFor({   // waits for the nameInput input field to be visible
      state: "visible",

      timeout: TIMEOUTS.ELEMENT,
    });
  } 
  // Form Actions
 
 // enters full name
  async enterName(fullName: string) {
    await this.nameInput.fill(fullName);
  }
  // enter email address
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }
   // enter current address
  async enterCurrentAddress(currentAddress: string) {
    await this.currentAddressInput.fill(currentAddress);
  }
   // enter permanent address
  async enterPermanentAddress(permanentAddress: string) {
    await this.permanentAddressInput.fill(permanentAddress);
  }
 // fill the form using provided data
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
 // submkit form
  async submitForm() {
    await this.submitButton.click();
  }
  // Verification Methods
  
   // verify the submission is successful
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
     // verifies email validation error is displayed
  async verifyEmailValidationError() {
    const className = await this.emailInput.getAttribute("class");

    if (!className?.includes("field-error")) {
      throw new Error(ERROR_MESSAGES.EMAIL_VALIDATION_ERROR);
    }
  }
}
