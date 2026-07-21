import { test, expect } from "../fixtures/pageFixture";
import { config } from "../config";
import { logger, setLoggerTestInfo } from "../utils/logger";

test("Payment processing error validation", async ({
  homePage,
  cartPage,
  checkoutPage,
  paymentPage,
}) => {
  setLoggerTestInfo(test.info());

  try {
    await test.step("Navigate to Home Page and add product to cart", async () => {
      await homePage.navigateToHomePage();
      logger.info("Navigated to Home page");

      await homePage.verifyHomePageLoaded();
      logger.info("Home page loaded successfully");
      await homePage.addProductToCart("prod-001");
      await homePage.openCart();

      await cartPage.expectCartPageLoaded();
      logger.info("Cart page loaded successfully");
      await cartPage.clickCheckoutButton();

      await checkoutPage.expectCheckoutPageLoaded();
      logger.info("Checkout page loaded successfully");
      await checkoutPage.fillGuestDetails({
        name: "Jane Smith",
        email: config.email,
        phone: config.phone,
        street: "123 Main Street",
        city: "Springfield",
        state: "IL",
        zip: "62701",
      });
      await checkoutPage.continueToPayment();

      await paymentPage.expectPaymentPageLoaded();
      logger.info("Payment page loaded successfully");
      await paymentPage.fillPaymentDetails({
        name: "Jane Smith",
        cardNumber: config.cardNumber,
        expiry: config.expiryDate,
        cvv: config.cvv,
      });
      await paymentPage.placeOrder();

      await paymentPage.expectGeneralErrorVisible();
      logger.info("General payment error is visible");
    });
  } finally {
    setLoggerTestInfo(undefined);
  }
});
