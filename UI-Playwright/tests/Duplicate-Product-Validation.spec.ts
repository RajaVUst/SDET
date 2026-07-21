import { test } from '../fixtures/test';
import { TestData } from '../utils/TestData';
import { Logger } from "../utils/Logger";

const productData = TestData.get("product");

test('Duplicate Product Validation Test', async ({ header, homePage, categoryPage, productCard, cartPage }) => {

    const product = productData.duplicateProduct;

    Logger.info("Duplicate Product Validation Test Starts..");
    await homePage.open();
    await homePage.VerifyHomePageLoaded();
    await header.VerifyRetailMartLogoLoaded();
    await homePage.clickShopNow();
    await categoryPage.verifyCategoryPageLoaded();
    await categoryPage.selectCategory(product.category);
    Logger.info(`Adding ${product.name} with Quantity  ${product.count}`);
    await productCard.addProductToCart(product.name,product.count);
    await header.verifyCartBadgeCountIs(product.count);
    await header.clickCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyProductAddedToCart(product.name);
    Logger.info('Validing Cart Items and Checking For Any Duplicate Product Cards');
    await cartPage.verifyNumberOfProductCardInCartToBe(product.cartCardCount)
    await cartPage.verifyOrderSummary(product.subTotal, product.tax, product.total);
    Logger.info('Cart Validation Successfull and No Duplicate Product Cards Found');
    
})