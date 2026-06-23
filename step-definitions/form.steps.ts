import { Given, When, Then, DataTable } from "@cucumber/cucumber";

import { world } from "../utils/world";
import { ERROR_MESSAGES } from "../utils/messages";

Given("user is on form page", async function () {
  await world.formPage.navigate();
});

When(
  "user fills the form with following data:",

  async function (dataTable: DataTable) {
    const data = dataTable.rowsHash();

    await world.formPage.fillForm(
      data.fullName,

      data.email,

      data.currentAddress,

      data.permanentAddress,
    );

    await world.formPage.submitForm();
  },
);

When(
  "user enters invalid email {string}",

  async function (email: string) {
    await world.formPage.enterEmail(email);

    await world.formPage.submitForm();
  },
);

When(
  "user enters form details {string} {string} {string} {string}",

  async function (
    fullName: string,

    email: string,

    currentAddress: string,

    permanentAddress: string,
  ) {
    await world.formPage.fillForm(
      fullName,

      email,

      currentAddress,

      permanentAddress,
    );
  },
);

When("user submits the form", async function () {
  await world.formPage.submitForm();
});

Then(
  "form should be submitted successfully",

  async function () {
    const isSubmitted = await world.formPage.verifySubmission();

    if (!isSubmitted) {
      throw new Error(ERROR_MESSAGES.FORM_SUBMISSION);
    }
  },
);

Then(
  "email field should show validation error",

  async function () {
    const isInvalid = await world.formPage.isEmailValidationErrorDisplayed();

    if (!isInvalid) {
      throw new Error(ERROR_MESSAGES.EMAIL_VALIDATION);
    }
  },
);
