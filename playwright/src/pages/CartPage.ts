import { Locator, Page } from "@playwright/test";
import { expect } from "../fixtures/test.fixture";

export class CartPage {

    readonly cartHeading: Locator;
    readonly checkoutBtn: Locator

    constructor(private readonly page: Page) {
        this.cartHeading = page.getByRole("heading", {name: "Shopping Cart"})
        this.checkoutBtn = page.getByTestId("checkout-button")
    }

    async verifyCartPage(): Promise<void> {
        await expect(this.cartHeading).toBeVisible();
        await expect(this.checkoutBtn).toBeVisible();
    }

    async clickCheckout(): Promise<void>{
        await this.checkoutBtn.click();
    }
}