import { Page } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

export class retailFlow {
    readonly landingPage: LandingPage;
    readonly inventoryPage: InventoryPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;

    constructor(private readonly page: Page) {
        this.landingPage = new LandingPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }

    async openShopAndAddProduct(productId: string) {
        await this.landingPage.navigateToShop();
        await this.inventoryPage.addProductToCart(productId);
        await this.cartPage.openCart();
    }

    async payWithInvalidCard(productId: string) {
        await this.openShopAndAddProduct(productId);
        await this.checkoutPage.openCheckout();
        await this.checkoutPage.fillGuestDetails();
        await this.checkoutPage.continueToPayment();
        await this.checkoutPage.fillPaymentDetails('4000 0000 0002');
        await this.checkoutPage.placeOrder();
        await this.checkoutPage.fillPaymentDetails('4000 0000 0000 0002');
        await this.checkoutPage.placeOrder();
    }
}