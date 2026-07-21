import { test } from "../fixtures/baseFixtures";
import {expect } from "@playwright/test";

test("Validate tax calculation", async ({page, homePage, cartPage }) => {
    await page.goto("/");
    await homePage.clickAddToCartButton();
    await homePage.goToCartPage();
    await expect(page).toHaveURL(/.*cart/);
    const subTotal = await cartPage.getSubTotal();
    console.log("SubTotal: ", subTotal);
    const taxAmount = await cartPage.getTaxAmount();
    console.log("Tax Amount: ", taxAmount);
    const sum = subTotal + taxAmount;
    //console.log("Subtotal + Tax =", sum);
    //expect(sum).toBeGreaterThanOrEqual(0);
});