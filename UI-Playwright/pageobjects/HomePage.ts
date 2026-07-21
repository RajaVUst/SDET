import { Locator, Page, expect } from '@playwright/test';

export class HomePage {

    constructor(readonly page: Page) { }

    private homePageHeaderText = (): Locator => this.page.getByRole('heading', { name: 'Shop Everything at RetailMart' });
    private shopNow = (): Locator => this.page.getByRole('link', { name: 'Shop Now' });

    async open() {
        await this.page.goto('/');
    }

    async clickShopNow(){
        await this.shopNow().click();
    }

    async VerifyHomePageLoaded() {
        await expect(this.homePageHeaderText()).toBeVisible();
        await expect(this.shopNow()).toBeVisible();
    }

}