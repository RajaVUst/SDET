import { Page } from "@playwright/test";

export class SearchResultsPage {

    constructor(private page: Page) {}

    async addProduct(productId: string) {
        await this.page.getByTestId(`add-to-cart-${productId}`).click();
    }
}