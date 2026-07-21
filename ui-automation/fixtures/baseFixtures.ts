import { test as base, expect } from "@playwright/test";

import { env } from "../utils/env";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage"; 

type Pages = {
    homePage: HomePage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage;
};

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    paymentPage: async ({ page }, use) => {     
        await use(new PaymentPage(page));
    }

});