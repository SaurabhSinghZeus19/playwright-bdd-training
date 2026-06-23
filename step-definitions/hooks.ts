import { Before, After, Status } from "@cucumber/cucumber";
import { world } from "../utils/world";

Before(async function () {
  await world.launchBrowser();
});

After(async function ({ result }) {

  if (result?.status === Status.FAILED) {
    await world.page.screenshot({
      path: `reports/failed-${Date.now()}.png`,
      fullPage: true
    });
  }

  await world.closeBrowser();
});