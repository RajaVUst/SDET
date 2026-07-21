import { Page } from "@playwright/test";
import { config } from "../config/config";

export class HomePage {

    constructor(private page: Page) {}

    async open() {
        await this.page.goto("/");
    }

    async loginAsCarol() {
        await this.page.getByTestId("nav-login-link").click();
        await this.page.getByTestId(config.demoUserId).click();
        await this.page.getByTestId("login-submit-button").click();
    }

    async search(product: string) {
        await this.page.getByTestId("search-input").fill(product);
        await this.page.getByTestId("search-button").click();
    }
}