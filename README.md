Playwright + Cucumber BDD Automation Framework

Project Overview

This project is a Behavior Driven Development (BDD) automation framework built using Playwright, Cucumber, and TypeScript.

The framework follows the Page Object Model (POM) design pattern and includes reusable components, centralized configuration management, hooks implementation, reporting, test data management, and failure handling mechanisms.

---

Tech Stack

- Playwright

- Cucumber

- TypeScript

- Node.js

---

Framework Features

BDD Implementation

- Feature files written using Gherkin syntax

- Step Definition implementation using Cucumber

- Scenario Outline support

- Data Table support

Page Object Model (POM)

- LoginPage implementation

- FormPage implementation

- Reusable page methods

- Separation of test logic and page actions

Reusability Improvements

- Shared World Context

- Centralized URLs configuration

- Centralized Timeout configuration

- Centralized Error Messages

- Reusable Test Data

- Reusable Page Objects

Hooks Implementation

- Before Hook

- After Hook

- Automatic Browser Launch

- Automatic Browser Closure

- Screenshot Capture on Failure

Reporting

- Cucumber JSON Report

- Cucumber HTML Report

---

Project Structure

playwright-bdd-training

│

├── features

│   ├── login.feature

│   └── form.feature

│

├── step-definitions

│   ├── hooks.ts

│   ├── login.steps.ts

│   └── form.steps.ts

│

├── pages

│   ├── LoginPage.ts

│   └── FormPage.ts

│

├── utils

│   ├── constants.ts

│   ├── messages.ts

│   ├── testData.ts

│   └── world.ts

│

├── reports

│   ├── cucumber-report.json

│   └── cucumber-report.html

│

├── package.json

└── README.md

---

Test Scenarios Covered

Login Module

- Successful Login

- Invalid Login

- Error Message Validation

- Logout Functionality

- Scenario Outline for Multiple Credentials

Form Module

- Form Submission Using Data Table

- Email Validation

- Form Submission Using Scenario Outline

---

Reusable Components Implemented

World Context

Shared browser, page, and page object instances are maintained through a reusable world context.

world.page

world.loginPage

world.formPage

Constants

Application URLs and timeout values are managed centrally.

URLS

TIMEOUTS

Error Messages

Reusable error messages are maintained in a dedicated file.

ERROR_MESSAGES

Test Data

Reusable test data is stored separately from test logic.

users.validUser

users.invalidUser

---

Execution Commands

Execute Test Suite

npm run bdd

Generate JSON Report

npm run bdd:report

---

Reporting

After execution, reports are generated inside:

reports/

Generated Reports:

cucumber-report.json

cucumber-report.html

The HTML report provides:

- Feature Summary

- Scenario Summary

- Step Execution Details

- Execution Statistics

- Pass/Fail Results

---

Debugging Report

The Report includes documented failure simulations covering:

- Navigation Failure

- Element Not Found

- Assertion Failure

- Incorrect Locator

- Timeout Error

Each case includes:

- Steps to Reproduce

- Root Cause Analysis

- Failure Log

- Screenshot Evidence

---

Final Results

Total Scenarios : 11

Total Steps     : 63

Status          : Passed


