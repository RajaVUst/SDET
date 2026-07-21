import { Locator, Page, expect } from '@playwright/test';
import { attachScreenshot } from '../utils/AttachScreenshot';

export class CartPage {

    constructor(readonly page: Page) { }

    private cartPageHeaderText = (): Locator => this.page.getByRole('heading', { name: 'Shopping Cart' });
    private cartItemName = (): Locator => this.page.locator("//a[contains(@data-testid,'cart-item-name')]");
    private cartSubTotal = (): Locator => this.page.locator("[data-testid='cart-subtotal']");
    private cartTax = (): Locator => this.page.locator("[data-testid='cart-tax']");
    private cartTotal = (): Locator => this.page.locator("[data-testid='cart-total']");
    private proceedToCheckout = (): Locator => this.page.getByRole('button',{name:'Proceed to Checkout'});
    private addedProdutsCardsInCart = (): Locator => this.page.locator("//div[contains(@data-testid,'cart-item-prod')]");

    async verifyCartPageLoaded() {
        await expect(this.page.url()).toContain('/cart');
        await expect(this.cartPageHeaderText()).toBeVisible();
    }

    async verifyProductAddedToCart(product: string){
        await expect(this.cartItemName()).toHaveText(product);
    }

    async verifyOrderSummary(subTotal: string,tax: string,total: string){
        await expect(this.cartSubTotal()).toHaveText(subTotal);
        await expect(this.cartTax()).toHaveText(tax);
        await expect(this.cartTotal()).toHaveText(total);
    }

    async verifyNumberOfProductCardInCartToBe(productCardCount: string){
        await expect((await this.addedProdutsCardsInCart().count()).toString()).toBe(productCardCount);
        await attachScreenshot(this.page,'Cart Page Screenshot');
    }

    async clickProceedToCheckout(){
        await this.proceedToCheckout().click();
    }

}