import { Locator, Page } from "@playwright/test";
import { config } from "../config/config";

export class LoginPage {

    constructor(private page: Page) {}

    private loginLink = (): Locator =>
        this.page.getByTestId("nav-login-link");

    private demoUser = (userId: string): Locator =>
        this.page.getByTestId(userId);

    private submitButton = (): Locator =>
        this.page.getByTestId("login-submit-button");

    async signInAsCarol(): Promise<void> {
        await this.loginLink().click();
        await this.demoUser(config.demoUserId).click();
        await this.submitButton().click();
    }
}