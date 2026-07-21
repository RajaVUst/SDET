import { Locator, Page , expect } from '@playwright/test';

export class Header {

    constructor(readonly page: Page){}

    private retailMartLogo = () : Locator => this.page.getByRole('link',{name:'RM RetailMart'});
    private cart = () : Locator => this.page.locator("[data-testid='cart-link']");
    private cartBadge = () : Locator => this.page.locator('[data-testid="cart-count"]');

    async VerifyRetailMartLogoLoaded(){
       await expect(this.retailMartLogo()).toBeVisible();
    }

    async clickCart(){
        await this.cart().click();
    }

    async verifyCartBadgeCountIs(count: string){
        await expect(this.cartBadge()).toHaveText(count);
    }

}