import { Locator, Page } from "@playwright/test";
import { expect } from "../fixtures/test.fixture";

export class PaymentPage {

    readonly paymentHeading: Locator;
    readonly holderName: Locator
    readonly cardNumber: Locator
    readonly expiry: Locator
    readonly cvv: Locator
    readonly placeOrderBtn: Locator
    readonly paymentError: Locator

    constructor(private readonly page: Page) {
        this.paymentHeading = page.getByRole("heading", {name: "Payment", exact: true})
        this.holderName = page.getByTestId("payment-card-name")
        this.cardNumber = page.getByTestId('payment-card-number')
        this.expiry = page.getByTestId("payment-expiry")
        this.cvv = page.getByTestId("payment-cvv")
        this.placeOrderBtn = page.getByTestId("place-order-button")
        this.paymentError = page.getByTestId("payment-general-error")
    }

    async verifyPaymentPage(): Promise<void> {
        await expect(this.paymentHeading).toBeVisible();
        await expect(this.placeOrderBtn).toBeVisible();
    }

    async fillCardDetails(holderName: string, cardNumber: string, expiry: string, cvv: string): Promise<void> {
        await this.holderName.fill(holderName)
        await this.cardNumber.fill(cardNumber)
        await this.expiry.fill(expiry)
        await this.cvv.fill(cvv)
    }

    async clickPlaceOrder(): Promise<void>{
        await this.placeOrderBtn.click();
    }

    async verifyPlaceOrder(): Promise<void> {
        await expect(this.paymentError).toBeVisible
        await expect(this.paymentError).toHaveText("Payment processing error. Please check your card details and try again.")
    }
}