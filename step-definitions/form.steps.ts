// step definitions call page object methods to perform and execute actions using Page object
import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { world } from "../utils/world";

Given("user is on form page", async function () {
  await world.formPage.navigatetoForm();
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

When("user enters invalid email {string}", async function (email: string) {
  await world.formPage.enterEmail(email);
  await world.formPage.submitForm();
});

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

Then("form should be submitted successfully", async function () {
  await world.formPage.verifySubmission();
});

Then("email field should show validation error", async function () {
  await world.formPage.verifyEmailValidationError();
});
