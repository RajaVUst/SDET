import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {logger } from "../utils/Logger";

export class CartPage extends BasePage {
    readonly subTotal: Locator;
    readonly taxAmount: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page){
        super(page);
        this.subTotal = page.getByTestId('cart-subtotal');
        this.taxAmount = page.getByTestId('cart-tax');
        this.checkoutButton = page.getByTestId('checkout-button')
    }

    async getSubTotal(): Promise<string>{
        return (await this.subTotal.textContent()) ?? "";
    }

    async getTaxAmount(): Promise<string>{
        return (await this.taxAmount.textContent()) ?? "";
    }

    async clickOnCheckout(){
        logger.info("[CartPage] Navigating to checkout page");
        await this.click(this.checkoutButton);
    }
}