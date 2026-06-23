# Debugging and Troubleshooting Document

# Framework:- Playwright + Cucumber BDD Automation Framework

-------------------------------------------------------------------------------------------------------------------------

# Case 1 - Timeout Error
 
## Steps to Reproduce:- 
1. Open "utils/constants.ts"
2. Change:- ELEMENT: 30000 to ELEMENT:- 1
3. Run:- npm run bdd
 
### Root Cause
- Element timeout was set too low, causing the framework to stop waiting before the element became available.
 
#### Failure Log / Report Snippet
 
2) Invalid login attempt # features/login.feature:9
       Given user is on login page # step-definitions/login.steps.ts:9
           page.waitForSelector: Timeout 1ms exceeded.
           Call log:
             - waiting for locator('#username') to be visible
           
               at LoginPage.navigate (/mnt/c/Users/saurabh.singh/playwright-bdd-training/pages/LoginPage.ts:15:21)
               at async World.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/step-definitions/login.steps.ts:10:3)
 
##### Screenshot
reports\Timeouterror.png
 
-------------------------------------------------------------------------------------------------------------------------
# Case 2 – Incorrect Locator

## Category:- Failure Simulation

### Steps to Reproduce:- 
1. Open "FormPage.ts"
2. Change:- #userName to:- #wrongUserName
3. Execute:- npm run bdd

#### Root Cause
- The locator does not match any element present in the DOM.
##### Failure Log / Report Snippet
1) Submit form with valid data # features/form.feature:4
       Given user is on form page # step-definitions/form.steps.ts:6
           page.waitForSelector: Timeout 30000ms exceeded.
           Call log:
             - waiting for locator('#wrongUserName') to be visible
           
               at FormPage.navigate (/mnt/c/Users/saurabh.singh/playwright-bdd-training/pages/FormPage.ts:16:21)
               at async World.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/step-definitions/form.steps.ts:7:3)

###### Screenshot
reports\Incorrectlocator.png
-------------------------------------------------------------------------------------------------------------------------
# Case 3 – Assertion Failure

## Category:- Failure Simulation

### Steps to Reproduce:- 
1. Open "login.steps.ts"
2. Change expected error message text to an incorrect value.
3. Execute:- npm run bdd

#### Root Cause

The expected value does not match the actual application response.

##### Failure Log / Report Snippet
Failed scenarios:
  1) Invalid login attempt # features/login.feature:9
       Then error message should be displayed # step-definitions/login.steps.ts:35
           Error: Expected error message not displayed
               at World.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/step-definitions/login.steps.ts:43:11)


###### Screenshot
reports\Assertionfailure.png
-------------------------------------------------------------------------------------------------------------------------
# Case 4 – Navigation Failure

## Category:- Failure Simulation

### Steps to Reproduce:- 
1. Open "constant.ts"
2. Change login URL to an invalid URL.
3. Execute:- npm run bdd

#### Root Cause

Application navigation failed because an invalid URL was provided.

##### Failure Log / Report Snippet
1) Successful login with valid credentials # features/login.feature:3
       Given user is on login page # step-definitions/login.steps.ts:9
           page.waitForSelector: Timeout 30000ms exceeded.
           Call log:
             - waiting for locator('#username') to be visible
           
               at LoginPage.navigate (/mnt/c/Users/saurabh.singh/playwright-bdd-training/pages/LoginPage.ts:15:21)
               at async World.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/step-definitions/login.steps.ts:10:3)
###### Screenshot
reports\Navigationfailure.png
-------------------------------------------------------------------------------------------------------------------------
# Case 5 – Element Not Found

## Category:- Failure Simulation

### Steps to Reproduce:-
1. Open "FormPage.ts"
2. Change submit button locator to an invalid locator.
3. Execute:- npx cucumber-js --tags "@datatable"

#### Root Cause

The automation script attempted to interact with an element that does not exist on the page.

##### Failure Log / Report Snippet
Failed scenarios:
  1) Submit form with valid data # features/form.feature:4
       When user fills the form with following data: # step-definitions/form.steps.ts:10
         | fullName         | Saurabh Singh    |
         | email            | saurabh@test.com |
         | currentAddress   | Mumbai           |
         | permanentAddress | Navi Mumbai      |
           locator.click: Timeout 30000ms exceeded.
           Call log:
             - waiting for locator('#finish')
           
               at FormPage.submitForm (/mnt/c/Users/saurabh.singh/playwright-bdd-training/pages/FormPage.ts:48:40)
               at World.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/step-definitions/form.steps.ts:26:26)

###### Screenshot
reports\Elementfailure.png
-------------------------------------------------------------------------------------------------------------------------
# Case 6 – Page Load Timeout

## Category:- Timeout Simulation

### Steps to Reproduce:- 
1. Open "constants.ts"
2. Set:- PAGE_LOAD: 1
3. Execute:- npm run bdd

#### Root Cause

Configured page load timeout is too low for the application to load.

##### Failure Log / Report Snippet
 1) Successful login with valid credentials # features/login.feature:3
       Given user is on login page # step-definitions/login.steps.ts:9
           page.goto: Timeout 1ms exceeded.
           Call log:
             - navigating to "https://the-internet.herokuapp.com/login", waiting until "commit"
           
               at LoginPage.navigate (/mnt/c/Users/saurabh.singh/playwright-bdd-training/pages/LoginPage.ts:10:21)
               at World.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/step-definitions/login.steps.ts:10:25)

###### Screenshot
reports\Pageloadtimeout.png
-------------------------------------------------------------------------------------------------------------------------
# Case 7 – Element Wait Timeout

## Category:- Timeout Simulation

### Steps to Reproduce:-
1. Open "constants.ts"
2. Set: 
   ELEMENT: 1
3. Execute:- npm run bdd

#### Root Cause

Configured element wait timeout is too low for the element to become available.

##### Failure Log / Report Snippet
1) Successful login with valid credentials # features/login.feature:3
       Given user is on login page # step-definitions/login.steps.ts:9
           page.waitForSelector: Timeout 1ms exceeded.
           Call log:
             - waiting for locator('#username') to be visible
           
               at LoginPage.navigate (/mnt/c/Users/saurabh.singh/playwright-bdd-training/pages/LoginPage.ts:15:21)
               at async World.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/step-definitions/login.steps.ts:10:3)

###### Screenshot
reports\Elementtimeout.png
-------------------------------------------------------------------------------------------------------------------------
# Case 8 – Step Execution Timeout

## Category:- Timeout Simulation

### Steps to Reproduce:- 
1. Open "login.steps.ts"
2. Add:- await new Promise(resolve =>setTimeout(resolve, 70000));
3. Execute:- npm run bdd

#### Root Cause

Step execution exceeded the configured Cucumber timeout limit.

##### Failure Log / Report Snippet
1) Successful login with valid credentials # features/login.feature:3
       And user clicks on login button # step-definitions/login.steps.ts:23
           Error: function timed out, ensure the promise resolves within 5000 milliseconds
               at Timeout.<anonymous> (/mnt/c/Users/saurabh.singh/playwright-bdd-training/node_modules/@cucumber/cucumber/src/time.ts:50:14)
               at listOnTimeout (node:internal/timers:605:17)
               at processTimers (node:internal/timers:541:7)


###### Screenshot
reports\Steptimeout.png
-------------------------------------------------------------------------------------------------------------------------


