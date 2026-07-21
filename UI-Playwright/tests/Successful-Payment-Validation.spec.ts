import { test } from '../fixtures/test';
import { TestData } from '../utils/TestData';
import { Env } from "../utils/Env";
import { Logger } from "../utils/Logger";


const userData = TestData.get("user");
const productData = TestData.get("product");

test('Successful Payment Validation Test', async ({ header, homePage, categoryPage, productCard, cartPage, checkoutPage, paymentPage, orderConfirmationPage }) => {
    
    const user = userData.user;
    const product = productData.product;

    Logger.info("Successful Payment Validation Test Starts..");
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
    await cartPage.verifyOrderSummary(product.subTotal, product.tax, product.total);
    await cartPage.clickProceedToCheckout();
    await checkoutPage.verifyCheckoutPageLoaded();
    Logger.info(`Filling Contact Information..`);
    await checkoutPage.fillContactInformation(user.fullName, Env.get('DEEPAK_USER_EMAIL'), Env.get('DEEPAK_USER_PHONE_NUMBER'));
    Logger.info(`Filling Shipping Information..`);
    await checkoutPage.fillShippingAddress(user.address, user.city, user.state, user.zipCode, user.country);
    await checkoutPage.clickContinueToPayment();
    await paymentPage.verifyPaymentPageLoaded();
    Logger.info(`Filling Payment Details..`);
    await paymentPage.fillPaymentDetails(Env.get('DEEPAK_CARD_HOLDER_NAME'), Env.get('DEEPAK_CARD_NUMBER'), Env.get('DEEPAK_CARD_EXPIRY'), Env.get('DEEPAK_CARD_CVV'));
    await paymentPage.verifyOrderTotal(product.total);
    Logger.info(`Placing Order..`);
    await paymentPage.clickPlaceOrder();
    await orderConfirmationPage.verifyOrderConfirmationLoaded();
    await orderConfirmationPage.verifyOrderedItem(product.name);
    Logger.info(`Payment Successful and Ordered Placed Successfully`);

})