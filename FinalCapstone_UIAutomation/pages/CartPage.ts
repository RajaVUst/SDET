import { Page } from "@playwright/test";
import { xp } from "../locators/xp";

export class CartPage {
    constructor(public readonly page: Page) {}

    async openCart() {
        await xp.CartLink(this.page).click();
    }

    async increaseQuantity(productId: string, times: number = 1) {
        for (let i = 0; i < times; i++) {
            await this.page.getByTestId(`cart-qty-increase-${productId}`).click();
        }
    }

    async expectFreeShippingMessage(expectedText: string | RegExp) {
        const locator = this.page.getByText(expectedText);
        await locator.waitFor({ state: 'visible' });
        await locator.scrollIntoViewIfNeeded();
    }
}