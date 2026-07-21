import { Locator, Page , expect } from '@playwright/test';

export class ProductCard {

    constructor(readonly page: Page){}

    private addToCart = (productName: string) : Locator => this.page.locator(`//a[contains(@data-testid,'product-name') and normalize-space()='${productName}']/ancestor::div[contains(@data-testid,'product-card')]//button`);

    async addProductToCart(product: string, count: string){
        let quantity = parseInt(count, 10);
        while (quantity > 0) {
            await this.addToCart(product).click();
            quantity--;
        }
    }


}