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

        console.log(await this.cart.cartCount);
        // await expect(await this.cart.cartCount).toBe("3");
        await this.cart.remove();
        // await expect(await this.cart.cartCount).toBe("2");
        await this.cart.remove();
        // await expect(await this.cart.cartCount).toBe("1");
        await this.cart.remove();

        await testInfo.attach("Empty Cart", {
        body: await this.cart.page.screenshot(),
        contentType: "image/png",
        });
        await expect(this.cart.emptyCartHeader).toBeVisible();
        await expect(this.cart.checkoutBtn).not.toBeVisible();
       
        

    }

}