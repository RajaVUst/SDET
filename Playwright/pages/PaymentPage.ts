import {Page} from "@playwright/test"
import { BasePage } from "./BasePage"
import { config } from "../utils/env";
import { expect } from "@playwright/test"

export class PaymentPage extends BasePage{
    constructor(page: Page)
    {super(page)}


    paymentTotal =  this.page.getByTestId("payment-total").textContent();
    private cardName = this.page.getByTestId("payment-card-name");
    private cardNo = this.page.getByTestId("payment-card-number");
    private expiry = this.page.getByTestId("payment-expiry");
    private cvv = this.page.getByTestId("payment-cvv");
    confirmation = this.page.getByTestId("confirmation-heading");
    orderItem = this.page.getByText("ProSound Wireless Headphones");


    private placeOrderBtn = this.page.getByTestId("place-order-button");

    async fillPaymentDetails(name: string, cardNumber: string, expiry: string, cvv: string){
        await this.cardName.fill(name);
        await this.cardNo.fill(cardNumber);
        await this.expiry.fill(expiry);
        await this.cvv.fill(cvv);
    }

    async placeOrder(){
        console.log(await this.paymentTotal);
        await this.placeOrderBtn.click();
    }


    
}