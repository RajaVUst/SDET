import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { TestInfo } from "@playwright/test";
import { AppLogger } from "../utils/logger";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

export class RemoveProductFlow {

    constructor(private home: HomePage, private product: ProductPage, private cart: CartPage, private log: AppLogger)
     {}
    
    async removeProduct(testInfo: TestInfo) {

        await this.home.open();
        await expect(this.home.header).toBeVisible();
        this.log.info("ADDING PRODUCT TO CART");
        await this.home.addProducts();
        this.log.info("OPENING CART");
        await this.home.openCart();
        await expect(this.cart.cartList).toBeVisible();

        this.log.info("REMOVING PRODUCT FROM CART");
        await testInfo.attach("Cart With Product", {
        body: await this.cart.page.screenshot(),
        contentType: "image/png",
        });

        await expect(await this.cart.getCartCount()).toBe("3");
        const firstItemPrice = await this.cart.getCartItemPrice("001");
       
        const firstNewTotal = Math.round(await this.cart.getCartTotal()*100-firstItemPrice*100-(firstItemPrice*100*0.085));
      
        await this.cart.remove();
        await expect(this.cart.page.getByText("$"+firstNewTotal/100)).toBeVisible();

        await expect(await this.cart.getCartCount()).toBe("2");
        const secondItemPrice = await this.cart.getCartItemPrice("002");
        const secondNewTotal = Math.round(await this.cart.getCartTotal()*100-secondItemPrice*100-(secondItemPrice*100*0.085)+599);
        await this.cart.remove();
        await expect(this.cart.page.getByText("$"+secondNewTotal/100)).toBeVisible();

        await expect(await this.cart.getCartCount()).toBe("1");
        await this.cart.remove();
        

        await testInfo.attach("Empty Cart", {
        body: await this.cart.page.screenshot(),
        contentType: "image/png",
        });
        await expect(this.cart.emptyCartHeader).toBeVisible();
        await expect(this.cart.checkoutBtn).not.toBeVisible();
       
        

    }

}