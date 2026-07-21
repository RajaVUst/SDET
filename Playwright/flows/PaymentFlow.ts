import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { TestInfo } from "@playwright/test";
import { AppLogger } from "../utils/logger";
import { PaymentPage } from "../pages/PaymentPage";
import { config } from "../utils/env";
import { UserData } from "../test-data/UserData"

import { expect } from "@playwright/test";
import { ConfirmationPage } from "../pages/ConfirmationPage";

export class PaymentFlow {

    constructor(private home: HomePage, private product: ProductPage, private cart: CartPage, private checkout: CheckoutPage,private payment: PaymentPage,private confirm: ConfirmationPage, private log: AppLogger)
     {}
    
    async buyProduct(testInfo: TestInfo) {
        await this.home.open();
         await expect(this.home.header).toBeVisible();
         this.log.info("ADDING PRODUCT TO CART");
        await this.home.addProduct();
        this.log.info("OPENING CART");
        await this.home.openCart();
        await testInfo.attach("Cart", {
        body: await this.cart.page.screenshot(),
        contentType: "image/png",
        });
        await expect(this.cart.cartList).toBeVisible();
        await this.cart.checkout();

        await expect(this.checkout.contactForm).toBeVisible();
        await expect(this.checkout.addressForm).toBeVisible();
        this.log.info("ENTERING CONTACT INFO");
        await this.checkout.fillContactInfo(UserData.FULL_NAME,UserData.EMAIL,UserData.PHONE);
        this.log.info("ENTERING ADDRESS INFO");
        await this.checkout.fillAddressInfo(UserData.STREET,UserData.CITY,UserData.STATE,UserData.ZIP,UserData.COUNTRY);

        await this.checkout.continueToPayment();

        await this.payment.fillPaymentDetails(config.cardName,config.cardNo,config.expiry,config.cvv);
        await expect(this.payment.orderItem).toBeVisible();
        await this.payment.placeOrder();
        await testInfo.attach("Order Confirmed", {
        body: await this.confirm.page.screenshot(),
        contentType: "image/png",
        });
        await expect(this.confirm.orderItem).toBeVisible();
        await expect(this.payment.confirmation).toBeVisible();
        await expect(this.confirm.orderNo).toBeVisible();
        await expect(this.confirm.confirmation).toBeVisible();
        
        

    }

}