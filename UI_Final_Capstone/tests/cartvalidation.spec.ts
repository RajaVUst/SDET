import { test, expect } from "../fixtures/testFixtures";
import { products } from "../testData/product";
import { logger } from "../utils/logger";
import { AccessibilityUtils } from "../utils/AccessibilityUtil";

test.describe("Shopping Cart", () => {
    test.beforeEach(async ({ page, homePage }) => {
        logger.info({page: "Home", step: "Launch", message: "Opening RetailMart"});
        await homePage.open();
        await homePage.loginAsCarol();
        await expect(page).toHaveURL("/");
        await expect(page.getByTestId("search-input")).toBeVisible();
        await expect(page.getByTestId("nav-actions")).toBeVisible();

    });

    test("Add multiple products and validate cart", async ({page,homePage,searchResultsPage,cartPage,evidence}) => {
        for (const product of products) {
            await homePage.search(product.name);
            await searchResultsPage.addProduct(product.id);
        }

        await cartPage.openCart();
        await expect(page).toHaveURL(/cart/);
        await expect(page.getByRole("heading", {name: /Shopping Cart/})).toBeVisible();
        const orderSummary = page.getByTestId("order-summary");
        await expect(orderSummary).toBeVisible();
        await expect(orderSummary).toContainText("Subtotal");
        await expect(orderSummary).toContainText("Tax");
        await expect(orderSummary).toContainText("Shipping");
        await expect(orderSummary).toContainText("Total");
        await expect(page.getByTestId("cart-total")).toBeVisible();
        await expect(page.getByRole("heading", { name: /Shopping Cart/ })).toContainText("3 items");

        for (const product of products) {
            await expect(page.getByText(product.name)).toBeVisible();
        }

        await cartPage.increaseQuantity(products[0].id);
        await expect(page.getByRole("heading", {name: /Shopping Cart/})).toContainText("4 items");
        await cartPage.removeProduct(products[1].id);
        await expect(page.getByRole("heading", {name: /Shopping Cart/})).toContainText("3 items");
        await page.reload();
        await expect(page.getByTestId("cart-total")).toBeVisible();
        const accessibility = await AccessibilityUtils.scan(page);
        evidence["Accessibility Report"] =accessibility;
        evidence["Cart Screenshot"] =await page.screenshot({ fullPage: true });
        evidence["Products Added"] =products;

    });

    test("Negative - Search unavailable product", async ({page,homePage}) => {
        await homePage.search("xyz123_invalid_product");
        await expect( page.getByText(/No products found/i)).toBeVisible();
    });

    test("Edge Case - Search with empty value", async ({ page}) => {
        await page.getByTestId("search-button").click();
        await expect(page.getByTestId("search-input")).toBeVisible();
        await expect(page).toHaveURL("/");

    });

});