import {Page} from "@playwright/test";
import { AppLogger } from "../utils/logger";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";

export class PaymentFlow {
    private readonly cartPage: CartPage;
    private readonly checkoutPage: CheckoutPage
    private readonly paymentPage: PaymentPage

    constructor(private readonly page: Page, private readonly log:AppLogger) {
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page)
        this.paymentPage = new PaymentPage(page)
    }

    async movingToCheckout(): Promise<void> {
        this.log.info("Verifying cart page")
        await this.cartPage.verifyCartPage()
        this.log.info("Clicking checkout buttom")
        await this.cartPage.clickCheckout()
    }

    async movingToPayment(name: string, email: string, phone: string, address: string, city: string, state: string, zipCode: string): Promise<void> {
        this.log.info("Verifying Checkout page")
        await this.checkoutPage.verifyCheckoutPage()
        this.log.info("filling details")
        await this.checkoutPage.fillDetails(name, email, phone, address, city, state, zipCode)
        this.log.info("Clicking continue to payment button")
        await this.checkoutPage.clickContinue()
    }

    async paymentStatus(holderName: string, cardNumber: string, expiry: string, cvv: string): Promise<void> {
        this.log.info("Verifying payment page")
        await this.paymentPage.verifyPaymentPage()
        this.log.info("giving card details")
        await this.paymentPage.fillCardDetails(holderName, cardNumber, expiry, cvv)
        this.log.info("Clickoing place order button")
        await this.paymentPage.clickPlaceOrder()
        this.log.info("verifying payment status")
        await this.paymentPage.verifyPlaceOrder()
    }
}