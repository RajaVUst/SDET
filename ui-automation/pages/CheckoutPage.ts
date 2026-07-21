import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {logger } from "../utils/Logger";

export class CheckoutPage extends BasePage{
    readonly nameTextBox: Locator;
    readonly emailTextBox: Locator;
    readonly phoneTextBox: Locator;
    readonly addressTextBox: Locator;
    readonly cityTextBox: Locator;
    readonly stateDropDown: Locator;
    readonly zipTextBox: Locator;
    readonly paymentButton: Locator;

    constructor(page: Page){
        super(page);
        this.nameTextBox = page.getByTestId('guest-name-input');
        this.emailTextBox = page.getByTestId('guest-email-input');
        this.phoneTextBox = page.getByTestId('guest-phone-input');
        this.addressTextBox = page.getByTestId('shipping-street-input');
        this.cityTextBox = page.getByTestId('shipping-city-input');
        this.stateDropDown = page.getByTestId('shipping-state-select');
        this.zipTextBox = page.getByTestId('shipping-zip-input');
        this.paymentButton = page.getByTestId('continue-to-payment-button');
    }

    async fillDetails(checkout:{
        name: string,
        email: string,
        phone: string,
        address: string,
        city: string,
        state: string,
        zip: string
    }){
        logger.info("[CheckoutPage] Entering details");
        await this.fill(this.nameTextBox, checkout.name);
        await this.fill(this.emailTextBox, checkout.email);
        await this.fill(this.phoneTextBox, checkout.phone);
        await this.fill(this.addressTextBox, checkout.address);
        await this.fill(this.cityTextBox, checkout.city);
        await this.selectOption(this.stateDropDown, checkout.state);
        await this.fill(this.zipTextBox, checkout.zip);
    }

    async clickGoToPayment(){
        logger.info("[CheckoutPage] Navigating to PaymentPage");
        await this.click(this.paymentButton);
    }
}
