import { expect, Page } from "@playwright/test";

export class CheckoutPage {

    constructor(private page: Page) {}

    private continuePaymentButton = () =>
        this.page.getByTestId("continue-to-payment-button");

    private cardHolder = () =>
        this.page.getByTestId("payment-card-name");

    private cardNumber = () =>
        this.page.getByTestId("payment-card-number");

    private expiryDate = () =>
        this.page.getByTestId("payment-expiry");

    private cvv = () =>
        this.page.getByTestId("payment-cvv");

    private placeOrderButton = () =>
        this.page.getByTestId("place-order-button");


    private confirmationHeading = () =>
        this.page.getByTestId("confirmation-heading");

    private confirmationPage = () =>
        this.page.getByTestId("order-confirmation-page");

    private orderNumber = () =>
        this.page.getByTestId("order-number");


    async continueToPayment() {
        await this.continuePaymentButton().click();
    }

    async enterCardHolder(name: string) {
        await this.cardHolder().fill(name);
    }

    async enterCardNumber(number: string) {
        await this.cardNumber().fill(number);
    }

    async enterExpiryDate(expiry: string) {
        await this.expiryDate().fill(expiry);
    }

    async enterCVV(cvv: string) {
        await this.cvv().fill(cvv);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton().click();
    }

    async makePayment(
        holder: string,
        card: string,
        expiry: string,
        cvv: string
    ) {

        await this.enterCardHolder(holder);
        await this.enterCardNumber(card);
        await this.enterExpiryDate(expiry);
        await this.enterCVV(cvv);
        await this.clickPlaceOrder();
    }


    async verifyPaymentSuccessful() {
        await expect(this.confirmationHeading()).toContainText("Order Confirmed!");
    }

    async verifyConfirmationPage() {
        await expect(this.confirmationPage()).toContainText("Thank you");
    }

    async verifyOrderNumberGenerated() {
        await expect(this.orderNumber()).toBeVisible();
    }
}