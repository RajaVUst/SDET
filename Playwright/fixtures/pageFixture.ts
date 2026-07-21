import { test as base, expect } from "./app.fixture";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { PaymentPage } from "../pages/PaymentPage";
import { RemoveProductFlow } from "../flows/RemoveProductFlow";
import { AppLogger} from "../utils/logger";
import { ProductPage } from "../pages/ProductPage";
import { PaymentFlow } from "../flows/PaymentFlow";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ConfirmationPage} from "../pages/ConfirmationPage";

type MyFixtures = {
    homePage: HomePage;
    productPage: ProductPage;
    cartPage: CartPage;
    paymentPage: PaymentPage;
    removeProductFlow: RemoveProductFlow;
    buyProductFlow : PaymentFlow;
    log: AppLogger;
    checkoutPage: CheckoutPage;
    confirmationPage: ConfirmationPage;
};

export const test = base.extend<MyFixtures>({



    homePage: async ({ page }, use) => {

        await use(new HomePage(page));

    },
    productPage: async ({ page }, use) => {

        await use(new ProductPage(page));

    },
    cartPage: async ({ page }, use) => {

        await use(new CartPage(page));

    },

    checkoutPage: async ({ page }, use) => {

        await use(new CheckoutPage(page));

    },
    paymentPage: async ({ page }, use) => {

        await use(new PaymentPage(page));

    },
    confirmationPage: async ({ page }, use) => {

        await use(new ConfirmationPage(page));

    },
    
    removeProductFlow: async(
        {homePage,productPage,cartPage, log}, use) => {
        await use (new RemoveProductFlow(homePage,productPage,cartPage,log));
    },

    buyProductFlow: async(
        {homePage,productPage,cartPage,checkoutPage,paymentPage,confirmationPage, log}, use) => {
        await use (new PaymentFlow(homePage,productPage,cartPage,checkoutPage,paymentPage,confirmationPage, log));
    }



});

export { expect } from "@playwright/test";