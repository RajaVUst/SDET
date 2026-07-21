import { Locator , Page } from "@playwright/test"
import { BasePage } from "./BasePage";
import {logger } from "../utils/Logger";

export class PaymentPage extends BasePage{
    readonly cardHolderNameTextBox: Locator;
    readonly cardNumberTextBox: Locator;
    readonly expiryTextBox: Locator;
    readonly cvvTextBox: Locator;
    readonly placeOrderButton: Locator;
    readonly paymentFailure: Locator

    constructor(page: Page){
        super(page);
        this.cardHolderNameTextBox = page.getByTestId('payment-card-name');
        this.cardNumberTextBox = page.getByTestId('payment-card-number');
        this.expiryTextBox = page.getByTestId('payment-expiry');
        this.cvvTextBox = page.getByTestId('payment-cvv');
        this.placeOrderButton = page.getByTestId('place-order-button')
        this.paymentFailure = page.getByTestId('payment-general-error');
    }

    async fillPaymentDetails(payment:{
        cardHolderName: string,
        CardNumber: string ,
        Expiry: string,
        cvv: string
    }
    ){
        logger.info("[PaymentPage] Entering Payment Details");
        await this.fill(this.cardHolderNameTextBox, payment.cardHolderName);
        await this.fill(this.cardNumberTextBox, payment.CardNumber);
        await this.fill(this.expiryTextBox, payment.Expiry);
        await this.fill(this.cvvTextBox, payment.cvv);
    }

    async clickOnPlaceOrder(){
        logger.info("[PaymentPage] Clicking on place order");
        await this.click(this.placeOrderButton);
    }

    async paymentFailureMessage(): Promise<string>{
        logger.info("[PaymentPage] Verifying payment failure ");
        return (await this.paymentFailure.textContent()) ?? "";
    }

}