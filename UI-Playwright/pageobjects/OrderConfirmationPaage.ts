import { Locator, Page, expect } from '@playwright/test';
import { attachScreenshot } from '../utils/AttachScreenshot';

export class OrderConfirmationPage {

    constructor(readonly page: Page) { }

    private orderConfirmationPageHeaderText = (): Locator => this.page.getByRole('heading', { name: 'Order Confirmed!' });
    private orderedItem = (): Locator => this.page.locator("//div[@data-testid='order-items']//p[contains(@class,'text-sm')]").first();
    

    async verifyOrderConfirmationLoaded() {
        await expect(this.orderConfirmationPageHeaderText()).toBeVisible();
        await expect(this.page.url()).toContain('/order-confirmation');
        
    }

    async verifyOrderedItem(productName: string){
        await expect(this.orderedItem()).toHaveText(productName);
        await attachScreenshot(this.page,`${productName} - Order Successful`);
    }

    
}