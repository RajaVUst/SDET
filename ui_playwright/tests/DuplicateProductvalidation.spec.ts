import { test } from "../fixtures/pageFixture";
import { logger } from "../utils/logger";

test("Duplicate product validation", async ({ homePage, cartPage }) => {
  logger.info("Starting Duplicate product validation test");
  await homePage.navigateToHomePage();
  logger.info("Navigated to Home page");
  await homePage.verifyHomePageLoaded();
  logger.info("Home page loaded successfully");
  await homePage.addProductToCart("prod-001");
  logger.info("Product added to cart");
  await homePage.addProductToCart("prod-001");
  await homePage.openCart();
  logger.info("Opened cart page");
  await cartPage.expectCartPageLoaded();
  await cartPage.expectProductQuantity(2);
  logger.info("Duplicate product validation test completed successfully");
});
