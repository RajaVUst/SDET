import { expect, Page } from "@playwright/test";

export class CartPage {

    constructor(private page: Page) {}

    async openCart() {
        await this.page.getByTestId("cart-link").click();
    }

    async increaseQuantity(productId: string) {
        await this.page.getByTestId(`cart-qty-increase-${productId}`).click();
    }

    async removeProduct(productId: string) {
        await this.page.getByTestId(`cart-qty-decrease-${productId}`).click();
    }

    async refresh() {
        await this.page.reload();
    }

    async verifyOrderSummary() {
        await expect(this.page.getByTestId("order-summary")).toBeVisible();
        await expect(this.page.getByTestId("cart-total")).toBeVisible();
    }

    async proceedToCheckout() {
    await this.page
        .getByRole("button", {
            name: "Proceed to Checkout"
        })
        .click();
}
}

