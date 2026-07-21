import { Locator, Page, expect } from '@playwright/test';

export class PaymentPage {

    constructor(readonly page: Page) { }

    private paymentPageHeaderText = (): Locator => this.page.getByRole('heading', { name: 'Payment',exact: true });
    private cardHolderName = (): Locator => this.page.locator("[data-testid='payment-card-name']");
    private cardNumber = (): Locator => this.page.locator("[data-testid='payment-card-number']");
    private cardExpiry = (): Locator => this.page.locator("[data-testid='payment-expiry']");
    private cardCVV = (): Locator => this.page.locator("[data-testid='payment-cvv']");
    private placeOrder = (): Locator => this.page.locator("[data-testid='place-order-button']");

    async verifyPaymentPageLoaded() {
        await expect(this.page.url()).toContain('/payment');
        await expect(this.paymentPageHeaderText()).toBeVisible();
    }

    async fillPaymentDetails(cardHolderName: string,cardNumber: string,cardExpiry: string,cardCVV: string){
        await this.cardHolderName().fill(cardHolderName);
        await this.cardNumber().fill(cardNumber);
        await this.cardExpiry().fill(cardExpiry);
        await this.cardCVV().fill(cardCVV);
    }

    async verifyOrderTotal(total: string){
        await expect(this.placeOrder()).toContainText(total);
    }

    async clickPlaceOrder(){
        await this.placeOrder().click();
    }

}