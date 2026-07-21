
import {Page} from "@playwright/test"
import { BasePage } from "./BasePage"
import { config } from "../utils/env";

export class HomePage extends BasePage{
    constructor(page: Page)
    {super(page)}

    private productCards = this.page.locator("[data-testid='product-grid']");
    private firstCardAdd = this.page.locator("[data-testid='add-to-cart-prod-001']");
    private secondCardAdd = this.page.locator("[data-testid='add-to-cart-prod-002']");
    private thirdCardAdd = this.page.locator("[data-testid='add-to-cart-prod-003']");
    private cart = this.page.getByTestId('cart-link');
    private laptopCardAdd = this.page.getByTestId("add-to-cart-prod-002")
    header = this.page.getByRole("heading",{name:"Shop Everything at RetailMart"});

    async open(){
        await this.page.goto(config.baseUrl);
    }

    async addProduct(){
        await this.firstCardAdd.click();
    }
    async addProducts(){
        await this.firstCardAdd.click();
        await this.secondCardAdd.click();
        await this.thirdCardAdd.click();
    }

    async openCart(){
        await this.cart.click();
    }

   
}