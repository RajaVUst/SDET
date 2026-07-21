import { Locator, Page } from "@playwright/test";


export class BasePage {

    constructor(protected page: Page) {}

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async getText(locator: Locator) {
        return await locator.textContent();
    }

    async isVisible(locator: Locator) {
        return await locator.isVisible();
    }

    async press(locator: Locator, key: string) {
        await locator.press(key);
    }

    async selectOption(locator: Locator, value: string) {
        await locator.selectOption(value);
    }
}