import { Locator , Page } from "@playwright/test"
import { BasePage } from "./BasePage";
import {logger } from "../utils/Logger";

export class HomePage extends BasePage{
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;

    constructor(page: Page){
        super(page);
        this.addToCartButton = page.getByTestId('add-to-cart-prod-001');
        this.cartButton = page.getByTestId('cart-link');
    }

    async clickAddToCartButton(){
        logger.info("[HomePage] Adding product to cart");
        await this.click(this.addToCartButton);
    }

    async goToCartPage(){
        logger.info("[HomePage] Navigating to cart Page");
        await this.click(this.cartButton);
    }
}