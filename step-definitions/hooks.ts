// perform setup and cleanup before and after each scenario

import { Before, After, Status } from "@cucumber/cucumber";
import { world } from "../utils/world";
//launch browser
Before(async function () {
  await world.launchBrowser();
});

// capture screenshot and close browser
After(async function ({ result }) {

  if (result?.status === Status.FAILED) {
    await world.page.screenshot({
      path: `reports/failed-${Date.now()}.png`,
      fullPage: true
    });
  }

  await world.closeBrowser();
});