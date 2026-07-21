import { test as base, expect } from "./evidenceFixture";

import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { logger } from "../utils/logger";
import { LoginPage } from "../pages/LoginPage";

type PageFixtures = {
    homePage: HomePage;
    loginPage:LoginPage
    searchResultsPage: SearchResultsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        logger.initialize();
        logger.info({
            page: "Framework",
            step: "Initialize",
            message: "Starting Test Execution"
        });
        await use(new HomePage(page));
    
    },
      loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }

});

export { expect };