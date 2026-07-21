import { test } from "../fixtures/baseFixtures";
import {expect } from "@playwright/test";
import { checkout } from "../test-data/checkout";
import { payment } from "../test-data/payment";

test("Validate tax calculation", async ({page, homePage, cartPage, checkoutPage, paymentPage}) => {
    await page.goto("/");
    await homePage.clickAddToCartButton();
    await homePage.goToCartPage();
    await expect(page).toHaveURL(/.*cart/);
    await cartPage.clickOnCheckout();
    await expect(page).toHaveURL(/.*checkout/);
    await checkoutPage.fillDetails(checkout);
    await checkoutPage.clickGoToPayment();
    await expect(page).toHaveURL(/.*payment/);
    const paymentDetails = {
        cardHolderName: payment.CardHoldername,
        CardNumber: payment.CardNumber,
        Expiry: payment.Expiry,
        cvv: payment.CVV,
    };
    await paymentPage.fillPaymentDetails(paymentDetails);
    await paymentPage.clickOnPlaceOrder();
    const paymentFailureMes = await paymentPage.paymentFailureMessage();
    console.log("Message: ", paymentFailureMes);
    await expect(page).toHaveURL(/.*payment/);

});