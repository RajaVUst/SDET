import { test, expect } from "../fixtures/testFixtures";
import { products } from "../testData/product";
import { payment } from "../testData/payment";
import { logger } from "../utils/logger";
import { MaskUtil } from "../utils/MaskUtil";

test.describe("Payment Validation", () => {

    test.beforeEach(async ({page,homePage,loginPage}) => {
        logger.info({page: "Home",step: "Launch",message: "Opening RetailMart"});
        await homePage.open();
        await loginPage.signInAsCarol();
        await expect(page).toHaveURL("/");
        await expect(page.getByTestId("search-input")).toBeVisible();

    });

    test("Successful Payment Validation", async ({page,homePage,searchResultsPage,cartPage,checkoutPage,evidence}) => {
        logger.info({page: "Payment", step: "Add Products",message: "Adding products to cart" });
        for (const product of products) {
            await homePage.search(product.name);
            await searchResultsPage.addProduct(product.id);
        }

        await cartPage.openCart();
        await expect(page).toHaveURL(/cart/);
        const orderSummary = page.getByTestId("order-summary");
        await expect(orderSummary).toBeVisible();
        await expect(orderSummary).toContainText("Subtotal");
        await expect(orderSummary).toContainText("Tax");
        await expect(orderSummary).toContainText("Shipping");
        await expect(orderSummary).toContainText("Total");
        await expect(page.getByTestId("checkout-button")).toBeEnabled();
        await cartPage.proceedToCheckout();
        await checkoutPage.continueToPayment();
        logger.info({page: "Checkout",step: "Payment",message: "Entering payment details"
        });
        await checkoutPage.makePayment(
            payment.cardHolderName,
            payment.cardNumber,
            payment.expiryDate,
            payment.cvv
        );

        // Confirmation Assertions
        await checkoutPage.verifyPaymentSuccessful();
        await checkoutPage.verifyConfirmationPage();
        await checkoutPage.verifyOrderNumberGenerated();
        await expect(page.getByTestId("confirmation-heading")).toContainText("Order Confirmed!");
        await expect( page.getByTestId("order-confirmation-page")).toContainText("Thank you");
        await expect(page.getByTestId("order-number")).toBeVisible();
        evidence["Payment Screenshot"] =await page.screenshot({ fullPage: true })
        evidence["Masked Card"] =MaskUtil.maskText(payment.cardNumber);

    });

    test("Negative - Card Declined", async ({
        page,
        homePage,
        searchResultsPage,
        cartPage,
        checkoutPage
    }) => {

        await homePage.search(products[0].name);
        await searchResultsPage.addProduct(products[0].id);
        await cartPage.openCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.continueToPayment();
        await checkoutPage.makePayment(
            payment.cardHolderName,
            "4000000000000002",
            payment.expiryDate,
            payment.cvv
        );
        await expect(page.getByText(/declined/i)).toBeVisible();
    });

    test("Edge Case - Empty Payment Details", async ({
        page,
        homePage,
        searchResultsPage,
        cartPage,
        checkoutPage
    }) => {

        await homePage.search(products[0].name);
        await searchResultsPage.addProduct(products[0].id);
        await cartPage.openCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.continueToPayment();
        await checkoutPage.clickPlaceOrder();
        await expect(page.getByTestId("payment-error-cardName")).toBeVisible();
        await expect(page.getByTestId("payment-error-cardNumber")).toBeVisible()
        await expect(page.getByTestId("payment-error-expiry")).toBeVisible();
        await expect(page.getByTestId("payment-error-cvv")).toBeVisible();

    });

});