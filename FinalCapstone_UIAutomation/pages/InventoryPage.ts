import { Page } from "@playwright/test";
import { xp } from "../locators/xp";

export class InventoryPage {
    constructor(private readonly page: Page) {}

    async addProductToCart(productId: string) {
        await xp.AddToCartButton(this.page, productId).click();
    }
}