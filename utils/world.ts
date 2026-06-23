import { Browser, BrowserContext, Page, chromium } from "playwright";
import { LoginPage } from "../pages/LoginPage";
import { FormPage } from "../pages/FormPage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    formPage!: FormPage;

    async launchBrowser() {
        this.browser = await chromium.launch({
            headless: false
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        this.loginPage = new LoginPage(this.page);
        this.formPage = new FormPage(this.page);
    }
    async closeBrowser(){
        await this.browser.close();
    }
}
export const world = new CustomWorld();