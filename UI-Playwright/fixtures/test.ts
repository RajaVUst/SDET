import { test as base } from '@playwright/test';
import { Header } from '../pageobjects/components/Header';
import { HomePage } from '../pageobjects/HomePage';
import { CategoryPage } from '../pageobjects/CategoryPage';
import { CartPage } from '../pageobjects/CartPage';
import { CheckoutPage } from '../pageobjects/CheckoutPage';
import { ProductCard } from '../pageobjects/components/ProductCard';
import { PaymentPage } from '../pageobjects/PaymentPage';
import { OrderConfirmationPage } from '../pageobjects/OrderConfirmationPaage';


type MyFixtures = {
    header: Header,
    homePage: HomePage,
    categoryPage: CategoryPage,
    productCard: ProductCard,
    cartPage: CartPage,
    checkoutPage: CheckoutPage,
    paymentPage: PaymentPage,
    orderConfirmationPage: OrderConfirmationPage
};

export const test = base.extend<MyFixtures>({
     header: async ({ page }, use) => {
         await use(new Header(page));
     },
     homePage: async ({ page }, use) => {
         await use(new HomePage(page));
     },
     categoryPage: async ({ page }, use) => {
         await use(new CategoryPage(page));
     },
     productCard: async ({ page }, use) => {
         await use(new ProductCard(page));
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
     orderConfirmationPage: async ({ page }, use) => {
         await use(new OrderConfirmationPage(page));
     }
});

export { expect } from '@playwright/test';