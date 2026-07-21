
import {Page} from "@playwright/test"
import { BasePage } from "./BasePage"
import { config } from "../utils/env";

export class CartPage extends BasePage{
    constructor(page: Page)
    {super(page)}

    

    cartCount = this.page.getByTestId("cart-count").textContent();
    // cartTotal = this.page.getByTestId("cart-total").textContent();
    cartList = this.page.getByTestId("cart-items-list");
    private removeBtn = this.page.getByRole("button",{name:"Remove"});
    emptyCartHeader = this.page.getByRole("heading",{name:"Your cart is empty"});
    checkoutBtn = this.page.getByRole("button",{name:"Proceed to Checkout"});
    
    // priceText = this.page.getByTestId('cart-item-price-prod-001').textContent();



    
    async remove() {
        await this.removeBtn.first().click();
        
    }

    async checkout(){
        await this.checkoutBtn.click();
    }

    async getCartCount(): Promise<string | null> {
        return await this.page.getByTestId("cart-count").textContent();
    }


}